import { useEffect, useState } from 'react'

// Penutup visual sesudah audio Hope selesai; tidak mengubah cue narasi atau autoplay.
export function EpisodeEnding({ tribute, nextEmotion, onNext }: {
  tribute: boolean; nextEmotion: string; onNext: () => void
}) {
  const [complete, setComplete] = useState(!tribute)
  useEffect(() => {
    if (!tribute) return
    const timer = window.setTimeout(() => setComplete(true), 6000)
    return () => window.clearTimeout(timer)
  }, [tribute])
  if (!complete) return <div className="indonesia-tribute" role="status">
    <span className="indonesia-flag" role="img" aria-label="Bendera Indonesia"><span /><span /></span>
    <p>Pray For Indonesia</p>
  </div>
  return <div className="episode-ending ending-reveal"><p>Episode selesai</p>
    <button className="next-episode" onClick={onNext} aria-label={`Pilih episode ${nextEmotion}`}>
      {nextEmotion === 'PEACE' ? 'Kembali ke' : 'Berikutnya'} · {nextEmotion} ↗
    </button>
  </div>
}
