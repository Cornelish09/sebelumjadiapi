import { useEffect, useRef } from 'react'

// Canvas 2D tetap bekerja tanpa WebGL. Gerak berhenti saat tidak terlihat.
export function MeditationAtmosphere({ accent, mood }: { accent: string; mood: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const el = canvas.current, ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const speed = mood === 'sorrow' ? .22 : mood === 'hope' ? 1.2 : mood === 'awareness' ? .65 : .85
    let raf = 0, last = 0, time = 0, w = 1, h = 1, visible = true
    const pointer = { x: 0, y: 0 }, smooth = { x: 0, y: 0 }
    const draw = (now: number) => {
      raf = 0
      if (document.hidden || !visible) { last = 0; return }
      const dt = last ? Math.min((now - last) / 1000, .05) : 0
      last = now
      if (!media.matches) {
        time += dt * speed
        smooth.x += (pointer.x - smooth.x) * (1 - Math.exp(-dt * 1.2))
        smooth.y += (pointer.y - smooth.y) * (1 - Math.exp(-dt * 1.2))
      }
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = accent
      for (let i = 0; i < 42; i++) {
        const depth = (i % 3 + 1) / 3
        const x = (((Math.sin(i * 127.1) * 43758.5 % 1 + 1) % 1) * w + Math.sin(time * .06 + i) * 18 - smooth.x * depth * 15 + w) % w
        const y = ((i * .618 % 1) * h - time * (1 + depth * 3) - smooth.y * depth * 10 + h * 100) % h
        ctx.globalAlpha = (.08 + .14 * depth) * (Math.sin(time * .2 + i) * .25 + .75)
        ctx.beginPath(); ctx.arc(x, y, .45 + depth * .7, 0, Math.PI * 2); ctx.fill()
      }
      if (!media.matches) raf = requestAnimationFrame(draw)
    }
    const resume = () => { if (!raf && !document.hidden && visible) raf = requestAnimationFrame(draw) }
    const resize = () => {
      w = el.clientWidth; h = el.clientHeight
      const dpr = Math.min(devicePixelRatio, 1.5)
      el.width = w * dpr; el.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      resume()
    }
    const observer = new ResizeObserver(resize); observer.observe(el)
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume() }); intersection.observe(el)
    const move = (e: PointerEvent) => { pointer.x = e.clientX / w - .5; pointer.y = e.clientY / h - .5 }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('visibilitychange', resume)
    media.addEventListener('change', resume)
    resume()
    return () => {
      cancelAnimationFrame(raf); observer.disconnect(); intersection.disconnect()
      window.removeEventListener('pointermove', move)
      document.removeEventListener('visibilitychange', resume)
      media.removeEventListener('change', resume)
    }
  }, [accent, mood])
  return <canvas className="meditations-dust" ref={canvas} aria-hidden="true" />
}
