import type { AudioState } from '../audio/AudioEngine'
import { audioEngine } from '../audio/AudioEngine'
import { formatTime } from '../audio/useSiteAudio'

export function MeditationPlayer({ audio, ready, compact, title, onSeek }: {
  audio: AudioState; ready: boolean; compact: boolean; title: string; onSeek: () => void
}) {
  const playing = ready && audio.playing
  const ended = ready && audio.ended
  return <div className={`meditation-player ${compact ? 'is-compact' : ''}`} aria-label="Pemutar episode">
    {compact && <p className="mini-track-title">{title}</p>}
    <div className="player-transport">
      <button className="meditation-play" aria-label={playing ? 'Jeda episode' : ended ? 'Putar ulang episode' : 'Putar episode'}
        onClick={() => audio.playing ? audioEngine.pause() : void audioEngine.play()} disabled={!ready}>
        {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="1.5" /></svg>
          : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7V5Z" fill="currentColor" /></svg>}
      </button>
      <div className="seek-row">
        <time>{ready ? formatTime(audio.current) : '0:00'}</time>
        <input type="range" min="0" max={ready ? audio.duration || 1 : 1} step=".1"
          value={ready ? Math.min(audio.current, audio.duration || 1) : 0}
          onChange={e => { onSeek(); audioEngine.seek(+e.target.value) }} aria-label="Posisi audio episode"
          aria-valuetext={`${formatTime(audio.current)} dari ${formatTime(audio.duration)}`} disabled={!ready || !audio.duration} />
        <time>{ready && audio.duration ? formatTime(audio.duration) : '—:—'}</time>
      </div>
      <label className="volume-row"><span className="sr-only">Volume</span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 8h3l4-4v12l-4-4H3V8Zm10-2c3 2 3 6 0 8" fill="none" stroke="currentColor" /></svg>
        <input type="range" min="0" max=".7" step=".01" value={audio.volume} onChange={e => audioEngine.volume(+e.target.value)} aria-label="Volume audio" />
      </label>
    </div>
    <p className="audio-status" role="status">{audio.error || (audio.loading ? 'Memuat audio…' : '')}</p>
  </div>
}
