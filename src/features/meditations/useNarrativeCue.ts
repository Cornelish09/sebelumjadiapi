import { useMemo, useSyncExternalStore } from 'react'
import { audioEngine } from '../audio/AudioEngine'
import { cueAtTime, type TimedCue } from './narrativeTimeline'

export function useNarrativeCue(cues: readonly TimedCue[], active: boolean) {
  const clock = useMemo(() => ({
    snapshot: () => cueAtTime(cues, audioEngine.currentTime()),
    subscribe: (notify: () => void) => {
      let raf = 0, previous = cueAtTime(cues, audioEngine.currentTime())
      const update = () => {
        const next = cueAtTime(cues, audioEngine.currentTime())
        if (next !== previous) { previous = next; notify() }
      }
      const tick = () => { update(); raf = requestAnimationFrame(tick) }
      const unsubscribe = audioEngine.subscribe(update)
      if (active && cues.length) raf = requestAnimationFrame(tick)
      return () => { cancelAnimationFrame(raf); unsubscribe() }
    },
  }), [cues, active])
  return useSyncExternalStore(clock.subscribe, clock.snapshot, () => null)
}
