import { useEffect, useRef, useState } from 'react'
import { ParallaxController } from '../parallax/ParallaxController'
import type { QualityPreset } from '../performance/HeroPerformanceController'

export function useHeroScene(moving: boolean, lightweight: boolean, quality: QualityPreset) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const motion = useRef(moving)
  useEffect(() => { motion.current = moving }, [moving])
  const preset = useRef(quality)
  useEffect(() => { preset.current = quality }, [quality])

  useEffect(() => {
    const element = canvas.current
    if (!element || lightweight) return
    let disposed = false, raf = 0, last = 0, time = 0, settling = true
    let scene: Awaited<ReturnType<typeof import('../layers/createHeroRenderer').createHeroRenderer>> | undefined
    const controller = new ParallaxController()
    const render = (now: number) => {
      if (disposed || !scene) return
      const elapsedDelta = last ? (now - last) / 1000 : 1 / 60
      const dt = Math.min(elapsedDelta, 0.05)
      last = now
      if(scene.setQuality(preset.current)) settling=true
      if (motion.current || settling) {
        if (motion.current) time += dt
        scene.render(time, controller.step(dt), motion.current, elapsedDelta)
        settling = false
      }
      // Saat jeda/di luar layar hanya periksa kembali 4x per detik, tanpa render GPU.
      if (motion.current) raf = requestAnimationFrame(render)
      else timer = window.setTimeout(() => { last = 0; raf = requestAnimationFrame(render) }, 250)
    }
    let timer = 0
    let touchTimer = 0
    const point = (event: PointerEvent) => {
      if (!motion.current) return
      clearTimeout(touchTimer)
      const bounds = element.getBoundingClientRect()
      controller.point((event.clientX - bounds.left) / bounds.width, (event.clientY - bounds.top) / bounds.height)
    }
    const leave = (event: PointerEvent) => { if(event.pointerType!=='touch') controller.leave() }
    const release = (event: PointerEvent) => {
      if (event.pointerType === 'touch') touchTimer=window.setTimeout(()=>controller.leave(),1100)
    }
    const lost = (event: Event) => { event.preventDefault(); setFailed(true); scene?.dispose(); scene = undefined }
    const resize = new ResizeObserver(([entry]) => {
      scene?.resize(entry.contentRect.width, entry.contentRect.height)
      settling = true
    })
    element.addEventListener('pointermove', point)
    element.addEventListener('pointerdown', point)
    element.addEventListener('pointerleave', leave)
    element.addEventListener('pointerup', release)
    element.addEventListener('pointercancel', release)
    element.addEventListener('webglcontextlost', lost)
    import('../layers/createHeroRenderer').then(async ({ createHeroRenderer }) => {
      if (disposed) return
      const next = await createHeroRenderer(element)
      if (disposed) { next.dispose(); return }
      scene = next
      scene.resize(element.clientWidth, element.clientHeight)
      resize.observe(element)
      // Render sebelum canvas dibuka agar tidak ada kilatan hitam.
      scene.render(0, controller.frame, motion.current, 1 / 60)
      setReady(true)
      raf = requestAnimationFrame(render)
    }).catch(() => { if (!disposed) setFailed(true) })
    return () => {
      disposed = true; cancelAnimationFrame(raf); clearTimeout(timer); clearTimeout(touchTimer)
      resize.disconnect()
      element.removeEventListener('pointermove', point)
      element.removeEventListener('pointerdown', point)
      element.removeEventListener('pointerleave', leave)
      element.removeEventListener('pointerup', release)
      element.removeEventListener('pointercancel', release)
      element.removeEventListener('webglcontextlost', lost)
      scene?.dispose()
    }
  }, [lightweight])
  return { canvas, ready: ready && !failed && !lightweight, failed }
}
