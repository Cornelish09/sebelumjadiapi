import { useState } from 'react'
import { actionRows, type MissionId } from '../../content/takeAction'
import { ChapterLink } from '../campaign-actions/Controls'
import { ForestLayers } from '../campaign-actions/DepthScene'
import { resetDepth, setDepth } from '../campaign-actions/depthMotion'
import { useMissionProgress } from '../campaign-actions/progress'
import { CheckMission, JoinMission, LearnMission, ShareMission } from './MissionPanels'
import { InviteMission } from './InviteMission'
import { PeatMeter } from './PeatMeter'
import './takeAction.css'

export function TakeAction() {
  const [open, setOpen] = useState<MissionId | null>(null)
  const completed = useMissionProgress()
  const count = completed.length
  const panels = {
    learn: <LearnMission />,
    check: <CheckMission />,
    share: <ShareMission />,
    join: <JoinMission />,
    invite: <InviteMission count={count} />,
  }
  return <section id="take-action" className="ca-section take-action" aria-labelledby="action-title">
    <div className="ca-wrap">
      <header className="ca-heading action-heading">
        <p className="ca-kicker">04 / Take Action</p>
        <h2 id="action-title" tabIndex={-1}>Kamu nggak perlu memadamkan api. Cukup mulai dari sini.</h2>
        <p>5 misi kecil. Tiap misi selesai di bawah 2 menit.</p>
      </header>
      <div className="action-grid">
        <PeatMeter count={count} />
        <div className="action-missions">
          {actionRows.map((mission, index) => {
            const active = open === mission.id
            const done = completed.includes(mission.id)
            return <article className="action-mission" key={mission.id} data-open={active} data-done={done} onPointerMove={setDepth} onPointerLeave={resetDepth}>
              <h3><button
                type="button" className="action-mission-toggle" aria-expanded={active}
                aria-controls={`mission-panel-${mission.id}`}
                onClick={() => setOpen(active ? null : mission.id)}
              >
                <span className="ca-depth action-mission-photo">
                  {mission.id === 'join' || mission.id === 'invite'
                    ? <span className="ca-layers" aria-hidden="true">
                        <img className="ca-layer-back" src={mission.image} alt="" loading="lazy" decoding="async" />
                        <span className="ca-layer-shade" />
                      </span>
                    : <ForestLayers image={mission.image} />}
                </span>
                <span className="action-mission-text">
                  <span className="ca-kicker">0{index + 1} / {mission.label}{done && <span className="sr-only">, selesai</span>}</span>
                  <span className="action-mission-title">{mission.title}</span>
                </span>
                <span className="action-mission-meta"><small>{mission.time}</small><span>{active ? 'Tutup' : mission.cta}</span></span>
                <span className="action-mission-mark" aria-hidden="true">{done ? '✓' : active ? '−' : '+'}</span>
              </button></h3>
              <div id={`mission-panel-${mission.id}`} className="action-panel" hidden={!active}>{panels[mission.id]}</div>
            </article>
          })}
          {count > 0 && <div className="ca-tools action-next">
            <ChapterLink id="show-your-action">Lanjut ke Show Your Action ↓</ChapterLink>
            {count === 5 && <ChapterLink id="peat-keeper-card" primary>Ambil Kartu Penjaga Gambut ↓</ChapterLink>}
          </div>}
        </div>
      </div>
    </div>
  </section>
}
