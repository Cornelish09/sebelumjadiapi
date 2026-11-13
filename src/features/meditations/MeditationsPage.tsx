import { useEffect, useState, type CSSProperties } from 'react'
import { meditationEpisodes } from '../../content/meditations'
import { episodeTranscripts } from '../../content/meditationTranscripts'
import { audioEngine } from '../audio/AudioEngine'
import { MeditationAtmosphere } from './MeditationAtmosphere'
import { MeditationSession } from './MeditationSession'
import './meditations.css'

export function MeditationsPage() {
  const [selected, setSelected] = useState(0), [expanded, setExpanded] = useState(false)
  const episode = meditationEpisodes[selected]
  const transcript = episodeTranscripts.find(item => item.id === episode.id)!
  useEffect(() => {
    audioEngine.selectEpisode(episode.audio)
    return () => { if(audioEngine.snapshot().src===encodeURI(episode.audio))void audioEngine.stop() }
  }, [episode.audio])
  const choose = (index: number) => { setSelected(index); setExpanded(false) }
  return <section className="meditations-page" aria-labelledby="episode-title" style={{ '--episode-accent': episode.accent } as CSSProperties}>
    <div className="meditations-forest" aria-hidden="true">{meditationEpisodes.map((e, i) =>
      <img key={e.id} src={e.background} alt="" style={{ objectPosition: e.position }} className={i === selected ? 'is-active' : ''} decoding="async" />)}</div>
    <div className="meditations-overlay" aria-hidden="true" />
    <MeditationAtmosphere accent={episode.accent} mood={episode.id} />
    <aside className={`episode-sidebar ${expanded ? 'is-expanded' : ''}`} aria-label="Pilih episode">
      <button className="episode-toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="episode-list">{expanded ? 'Tutup episode' : 'Pilih episode'} <span>↗</span></button>
      <ol id="episode-list">{meditationEpisodes.map((e, i) => <li key={e.id}>
        <button onClick={() => choose(i)} aria-current={i === selected ? 'true' : undefined} aria-label={`${e.number} ${e.emotion} — ${e.title}`}>
          <span className="episode-number">{e.number}</span><span className="episode-label"><strong>{e.emotion}</strong><span>{e.title}</span></span><span className="episode-marker" />
        </button></li>)}</ol>
    </aside>
    <MeditationSession key={episode.id} episode={episode} transcript={transcript} onNext={() => choose((selected + 1) % meditationEpisodes.length)} nextEmotion={meditationEpisodes[(selected + 1) % meditationEpisodes.length].emotion} />
    <p className="meditations-footer"><span>{episode.number} / 05</span></p>
  </section>
}
