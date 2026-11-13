import { useEffect, useMemo, useRef, useState } from 'react'
import type { EpisodeTranscript } from '../../content/meditationTranscripts'
import type { MeditationEpisode } from '../../content/meditations'
import { useSiteAudio } from '../audio/useSiteAudio'
import { MeditationPlayer } from './MeditationPlayer'
import { NarrativeText } from './NarrativeText'
import { EpisodeEnding } from './EpisodeEnding'
import { verifiedCues } from './narrativeTimeline'
import { useNarrativeCue } from './useNarrativeCue'

export function MeditationSession({ episode, transcript, onNext, nextEmotion }: {
  episode: MeditationEpisode; transcript: EpisodeTranscript; onNext: () => void; nextEmotion: string
}) {
  const audio = useSiteAudio(), ready = decodeURI(audio.src) === episode.audio
  const [reading, setReading] = useState(false), [page, setPage] = useState(0)
  const reader = useRef<HTMLDivElement>(null)
  const session = useRef<HTMLDivElement>(null)
  useEffect(() => { if (reading) reader.current?.focus({ preventScroll: true }) }, [reading])
  const cues = useMemo(() => verifiedCues(transcript, episode.audio, ready ? audio.duration : 0), [transcript, episode.audio, ready, audio.duration])
  const cue = useNarrativeCue(cues, ready && audio.playing)
  const started = ready && audio.hasStarted, compact = started || reading
  const ended = ready && audio.ended
  const manualCue = transcript.cues[page]
  const closeReading = () => {
    setReading(false)
    session.current?.querySelector<HTMLButtonElement>('.meditation-play')?.focus({ preventScroll: true })
  }
  return <div ref={session} className={`meditation-session ${compact ? 'is-listening' : 'is-intro'}`} data-session-state={ended ? 'ended' : reading ? 'reading' : started ? 'listening' : 'intro'}>
    <div className="meditation-intro" aria-hidden={compact}>
      <h1 id={compact ? undefined : 'episode-title'}>{episode.title}</h1>
      <p className="episode-intro">{transcript.intro}</p>
    </div>
    {compact && <h1 id="episode-title" className="sr-only">{episode.title}</h1>}
    {compact && <div className="narrative-stage" aria-label={reading ? 'Mode baca naskah manual' : 'Narasi episode'}>
      {reading ? <div className="script-reader" ref={reader} tabIndex={-1} aria-label="Baca naskah secara manual">
        <p className="narrative-mode">BACA NASKAH <span>· manual</span></p>
        <p className="narrative-text manual-text" key={manualCue.id}>{manualCue.text}</p>
        <div className="script-controls"><button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} aria-label="Potongan sebelumnya">←</button>
          <span>{String(page + 1).padStart(2, '0')} / {transcript.cues.length}</span>
          <button onClick={() => setPage(p => Math.min(transcript.cues.length - 1, p + 1))} disabled={page === transcript.cues.length - 1} aria-label="Potongan berikutnya">→</button>
        </div>
        <button className="quiet-link" onClick={closeReading}>Tutup naskah</button>
      </div> : ended ? <EpisodeEnding tribute={episode.id === 'hope'} nextEmotion={nextEmotion} onNext={onNext} />
        : cues.length ? <NarrativeText cue={cue} playing={audio.playing} seekVersion={audio.seekVersion} />
          : <div className="transcript-pending"><p>Transkrip belum diselaraskan</p><button className="quiet-link" onClick={() => setReading(true)}>Baca naskah ↗</button></div>}
    </div>}
    <MeditationPlayer audio={audio} ready={ready} compact={compact} title={episode.title} onSeek={() => setReading(false)} />
    {!compact && transcript.timingStatus === 'UNALIGNED' && <button className="quiet-link intro-script-link" onClick={() => setReading(true)}>Baca naskah</button>}
  </div>
}


