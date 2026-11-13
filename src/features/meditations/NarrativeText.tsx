import { useLayoutEffect, useRef } from 'react'
import { audioEngine } from '../audio/AudioEngine'
import type { TimedCue } from './narrativeTimeline'

// Satu node teks. Fade mengikuti waktu audio, sehingga Pause benar-benar membekukan tampilannya.
export function NarrativeText({ cue, playing, seekVersion }: { cue: TimedCue | null; playing: boolean; seekVersion: number }) {
  const paragraph = useRef<HTMLParagraphElement>(null)
  useLayoutEffect(() => {
    const el = paragraph.current
    if (!el || !cue) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    const paint = () => {
      const time = audioEngine.currentTime(), fade = Math.min(.6, (cue.end - cue.start) / 3)
      const opacity = Math.max(0, Math.min(1, (time - cue.start) / fade, (cue.end - time) / fade))
      el.style.opacity = String(reduced.matches ? 1 : opacity)
      el.style.transform = reduced.matches ? 'none' : `translateY(${(1 - opacity) * (time < (cue.start + cue.end) / 2 ? 7 : -5)}px)`
      if (playing) raf = requestAnimationFrame(paint)
    }
    paint()
    return () => cancelAnimationFrame(raf)
  }, [cue, playing, seekVersion])
  return <p ref={paragraph} className="narrative-text" data-cue-id={cue?.id}>{cue?.text || '\u00a0'}</p>
}
