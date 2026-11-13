import {useEffect, useRef, useState, useSyncExternalStore} from 'react'
import {storyFrame, unit} from './storyTimeline'

const staticQuery='(prefers-reduced-motion: reduce), (max-height: 650px), (max-width: 700px) and (max-height: 740px)'
const subscribeStatic=(fn:()=>void)=>{const media=matchMedia(staticQuery);media.addEventListener('change',fn);return()=>media.removeEventListener('change',fn)}

// Hanya opacity/transform untuk dua layer aktif; tidak ada mask polygon saat scroll.
export function useForestStory() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const staticMode=useSyncExternalStore(subscribeStatic,()=>matchMedia(staticQuery).matches,()=>false)
  useEffect(() => {
    const el = root.current, view = stage.current
    if (!el || !view) return
    const media = matchMedia(staticQuery)
    const layers = Array.from(view.querySelectorAll<HTMLElement>('[data-story-layer]'))
    const animal = view.querySelector<HTMLElement>('[data-animal-bridge]')
    const progress = view.querySelector<HTMLElement>('.forest-story-progress')
    let raf = 0, lastTime = 0, visible = false, current = -1
    let top = 0, travel = 1, target = 0, position = 0
    const shown = new Set<number>()
    const paint = (now: number) => {
      raf = 0
      if (!visible || document.hidden || media.matches) {lastTime = 0; return}
      const dt = lastTime ? Math.min((now - lastTime) / 1000, .05) : 1 / 60
      lastTime = now
      position += (target - position) * (1 - Math.exp(-dt * 18))
      if (Math.abs(position - target) < .00015) position = target
      const frame = storyFrame(position)
      if (current !== frame.active) {current = frame.active; setActive(current)}
      const nextShown = new Set([frame.base, frame.base + 1])
      shown.forEach(i => {if (!nextShown.has(i)) {layers[i].style.visibility = 'hidden'; layers[i].style.willChange = 'auto'}})
      nextShown.forEach(i => {
        const layer = layers[i]
        const shift = (frame.p - i)
        layer.style.visibility = 'visible'
        layer.style.willChange = 'opacity, transform'
        layer.style.opacity = i === frame.base ? '1' : String(frame.blend)
        layer.style.setProperty('--story-shift', shift.toFixed(4))
        // Gerak kedalaman 2.5D tanpa rasterisasi mask layar penuh.
        layer.style.transform = `translate3d(${shift * -1.4}%,0,0) scale(1.045)`
      })
      shown.clear(); nextShown.forEach(i => shown.add(i))
      if (animal) {
        animal.style.opacity = String(frame.animal)
        animal.style.transform = `translate3d(calc(${(1 - frame.animal) * 4.5}% + var(--story-px, 0) * 14px), calc(var(--story-py, 0) * 8px), 0)`
      }
      if (progress) progress.style.transform = `scaleX(${position})`
      if (position !== target) raf = requestAnimationFrame(paint)
      else lastTime = 0
    }
    const start = () => {if (!raf && visible && !document.hidden && !media.matches) raf = requestAnimationFrame(paint)}
    const readScroll = () => {target = unit((scrollY - top) / travel); start()}
    const measure = () => {
      top = scrollY + el.getBoundingClientRect().top
      travel = Math.max(1, el.offsetHeight - view.offsetHeight)
      target = unit((scrollY - top) / travel)
      position = target
      start()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {measure(); start()}
      else {cancelAnimationFrame(raf); raf = 0; lastTime = 0}
    })
    const resize = new ResizeObserver(measure)
    observer.observe(el); resize.observe(el)
    addEventListener('scroll', readScroll, {passive:true})
    addEventListener('resize', measure)
    media.addEventListener('change', measure)
    document.addEventListener('visibilitychange', readScroll)
    measure()
    return () => {
      cancelAnimationFrame(raf); observer.disconnect(); resize.disconnect()
      removeEventListener('scroll', readScroll); removeEventListener('resize', measure)
      media.removeEventListener('change', measure)
      document.removeEventListener('visibilitychange', readScroll)
    }
  }, [])
  const go = (index:number) => {
    const el = root.current
    if (!el) return
    const staticMode = matchMedia(staticQuery).matches
    if (staticMode) {document.getElementById(`forest-story-${index}`)?.scrollIntoView({behavior:'instant'}); return}
    const top = scrollY + el.getBoundingClientRect().top
    window.scrollTo({top:top + Math.max(0, el.offsetHeight - (stage.current?.offsetHeight ?? innerHeight)) * unit(index / 3), behavior:'smooth'})
  }
  return {root, stage, active, go, staticMode}
}
