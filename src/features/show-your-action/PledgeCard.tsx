import type { CSSProperties } from 'react'
import { campaignHashtag, type pledges } from '../../content/campaignParticipation'
import { holdDepth, releaseDepth, resetDepth, setDepth } from '../campaign-actions/depthMotion'

export function PledgeCard({ pledge, byline }: { pledge: typeof pledges[number]; byline: string }) {
  return <div
    className="show-preview"
    onPointerMove={setDepth}
    onPointerDown={holdDepth}
    onPointerUp={releaseDepth}
    onPointerCancel={releaseDepth}
    onPointerLeave={resetDepth}
  >
    <article className="ca-preview-story pledge-card" style={{ '--pledge-accent': pledge.accent } as CSSProperties} aria-label="Pratinjau Kartu Janji">
      <div className="pledge-rim" aria-hidden="true" />
      <div key={pledge.id} className="pledge-scene">
        <div className="pledge-landscape" aria-hidden="true">
          <img src={pledge.image} alt="" loading="lazy" decoding="async" />
        </div>
        <img className="pledge-object" src={pledge.foreground} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="pledge-glass" aria-hidden="true" />
      <div className="pledge-copy">
        <p className="pledge-label">Kartu Janji</p>
        <h3>{pledge.text}</h3>
        {byline && <p className="pledge-byline">{byline}</p>}
      </div>
      <p className="pledge-tag">{campaignHashtag}</p>
    </article>
  </div>
}
