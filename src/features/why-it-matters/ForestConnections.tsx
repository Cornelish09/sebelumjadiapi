import {useMemo, useRef, useState} from 'react'
import {
  ecosystemNodes,
  ecosystemWebEdges,
  ecosystemWorldVisual,
  type EcosystemNode,
  type EcosystemNodeId,
} from '../../content/ecosystemWeb'
import {resetDepth, setDepth} from '../campaign-actions/depthMotion'
import {SourceLink} from './SourceLink'
import {focusCamera} from './focusCamera'
import {hotspotSeedClip, openMorphClip} from './morphClip'
import './forestConnections.css'

type DetailTab = 'story' | 'signs'
type SimulationMode = 'intact' | 'disrupted'

function nodePos(node: EcosystemNode, mode: SimulationMode) {
  return {
    x: mode === 'disrupted' ? node.brokenX : node.x,
    y: mode === 'disrupted' ? node.brokenY : node.y,
  }
}

export function ForestConnections() {
  const [active, setActive] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<EcosystemNodeId | null>(null)
  const [tab, setTab] = useState<DetailTab>('story')
  const [simMode, setSimMode] = useState<SimulationMode>('intact')
  const [visited, setVisited] = useState<EcosystemNodeId[]>([])
  const sceneRef = useRef<HTMLDivElement>(null)

  const isDisrupted = simMode === 'disrupted'
  const selected = active === null ? null : ecosystemNodes[active]
  const nextIndex = active === null ? 0 : (active + 1) % ecosystemNodes.length
  const nextNode = ecosystemNodes[nextIndex]
  const prevNode = active !== null && active > 0 ? ecosystemNodes[active - 1] : null

  const selectedCoords = selected ? nodePos(selected, simMode) : null
  const camera = selectedCoords
    ? focusCamera(selectedCoords.x, selectedCoords.y, 1.72)
    : {scale: 1, x: 0, y: 0}

  const openStep = (index: number) => {
    const node = ecosystemNodes[index]
    if (!node) return
    setActive(index)
    setVisited(prev => (prev.includes(node.id) ? prev : [...prev, node.id]))
  }

  const close = () => {
    sceneRef.current
      ?.querySelector<HTMLButtonElement>(`#forest-spot-${selected?.id}`)
      ?.focus({preventScroll: true})
    setActive(null)
  }

  const switchMode = (nextMode: SimulationMode) => {
    setSimMode(nextMode)
  }

  const highlightId = selected?.id ?? hoveredId

  const edgeGeometries = useMemo(() => {
    const byId = new Map(ecosystemNodes.map(n => [n.id, n]))
    return ecosystemWebEdges.map((edge, idx) => {
      const aNode = byId.get(edge.from)!
      const bNode = byId.get(edge.to)!
      const a = nodePos(aNode, simMode)
      const b = nodePos(bNode, simMode)
      const mx = (a.x + b.x) / 2
      const my = (a.y + b.y) / 2
      const dx = b.x - a.x
      const dy = b.y - a.y
      const bend = idx % 2 === 0 ? 6 : -6
      const cx = mx - dy * (bend / 100)
      const cy = my + dx * (bend / 100)
      const d = `M ${a.x} ${a.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`
      return {...edge, d}
    })
  }, [simMode])

  return (
    <section
      className={`why-connections why-section ${isDisrupted ? 'is-disrupted' : 'is-intact'}`}
      id="forest-connections"
      tabIndex={-1}
      aria-labelledby="forest-connections-title"
    >
      <div className="why-connections-header">
        <div className="why-header-copy">
          <h2 className="why-connections-title" id="forest-connections-title">
            Jelajahi keterhubungan hutan
          </h2>
          <p className="why-connections-lead">
            {isDisrupted
              ? 'Saat satu bagian rusak, dampaknya merembet dari atas pohon hingga ke gambut.'
              : 'Dari pucuk pohon sampai air di bawah tanah, semuanya saling menjaga.'}
          </p>
        </div>

        <div className="why-sim-switch" role="group" aria-label="Pilih kondisi hutan">
          <button
            type="button"
            className={!isDisrupted ? 'is-active' : ''}
            aria-pressed={!isDisrupted}
            onClick={() => switchMode('intact')}
          >
            Saat Hutan Utuh
          </button>
          <button
            type="button"
            className={isDisrupted ? 'is-active is-warning' : ''}
            aria-pressed={isDisrupted}
            onClick={() => switchMode('disrupted')}
          >
            Jika Satu Bagian Rusak
          </button>
        </div>
      </div>

      <div
        className="why-explore-layout"
        onKeyDown={e => {
          if (e.key === 'Escape' && selected) close()
        }}
      >
        {/* Kiri: Kanvas 16:9 dengan visual khusus kondisi utuh & kondisi rusak */}
        <div
          className={`why-hotspot-scene ${selected ? 'has-focus' : ''}`}
          ref={sceneRef}
          onPointerMove={setDepth}
          onPointerLeave={resetDepth}
        >
          <div
            className="why-hotspot-world"
            style={{
              transform: `translate3d(${camera.x}%,${camera.y}%,0) scale(${camera.scale})`,
            }}
          >
            <img
              className={`why-world-img ${!isDisrupted ? 'is-active' : ''}`}
              src={ecosystemWorldVisual.image}
              alt={!isDisrupted ? ecosystemWorldVisual.alt : ''}
              loading="lazy"
              decoding="async"
            />
            <img
              className={`why-world-img why-world-img--broken ${isDisrupted ? 'is-active' : ''}`}
              src={ecosystemWorldVisual.brokenImage}
              alt={isDisrupted ? ecosystemWorldVisual.brokenAlt : ''}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="why-hotspot-wash" aria-hidden="true" />

          <svg
            className="why-eco-web"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {edgeGeometries.map(edge => {
              const linked =
                highlightId !== null && (edge.from === highlightId || edge.to === highlightId)
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={edge.d}
                  className={`why-eco-edge ${linked ? 'is-lit' : ''} ${
                    isDisrupted ? 'is-stressed' : ''
                  }`}
                />
              )
            })}
          </svg>

          {ecosystemNodes.map((spot, i) => {
            const isSelected = active === i
            const isVisited = visited.includes(spot.id)
            const pos = nodePos(spot, simMode)
            const isLabelLeft = pos.x > 70
            const isNeighbor =
              hoveredId !== null &&
              edgeGeometries.some(
                e =>
                  (e.from === hoveredId && e.to === spot.id) ||
                  (e.to === hoveredId && e.from === spot.id),
              )
            return (
              <button
                key={spot.id}
                id={`forest-spot-${spot.id}`}
                type="button"
                className={`why-hotspot ${isSelected ? 'is-selected' : ''} ${
                  isVisited ? 'is-visited' : ''
                } ${isNeighbor ? 'is-neighbor' : ''} ${isLabelLeft ? 'is-label-left' : ''}`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                aria-label={`${spot.number} ${spot.label}`}
                aria-expanded={isSelected}
                aria-controls="forest-info-panel"
                onClick={() => openStep(i)}
                onMouseEnter={() => setHoveredId(spot.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(spot.id)}
                onBlur={() => setHoveredId(null)}
              >
                <span className="why-hotspot-dot" />
                <span className="why-hotspot-label">
                  <em>{spot.number}</em>
                  {spot.label}
                </span>
              </button>
            )
          })}

          {ecosystemNodes.map((spot, i) => {
            const isVisible = active === i
            const pos = nodePos(spot, simMode)
            const backSrc = isDisrupted ? spot.brokenBackImage : spot.backImage
            const frontSrc = isDisrupted ? spot.brokenFrontImage : spot.frontImage
            const frontAlt = isDisrupted ? spot.brokenFrontAlt : spot.frontAlt
            return (
              <div
                key={spot.id}
                className={`why-morph-layer ${isVisible ? 'is-visible' : ''}`}
                style={{
                  clipPath: isVisible
                    ? openMorphClip(pos.x, pos.y, i)
                    : hotspotSeedClip(pos.x, pos.y, 1.4),
                }}
                aria-hidden={!isVisible}
              >
                <div className="why-morph-back-wrap">
                  <img
                    className="why-morph-back"
                    src={backSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="why-morph-atmosphere" />

                <div className="why-morph-front-wrap">
                  <img
                    className={`why-morph-front why-morph-front--${spot.id}`}
                    src={frontSrc}
                    alt={isVisible ? frontAlt : ''}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            )
          })}

          {selected && (
            <div className="why-scene-topbar">
              <button type="button" className="why-focus-reset" onClick={close}>
                ← Lihat seluruh hutan
              </button>
            </div>
          )}
        </div>

        {/* Kanan: Kartu Timbul dengan Tinggi Terkunci Sama Persis dengan Frame Kiri */}
        <aside
          className="why-info-panel"
          id="forest-info-panel"
          aria-label="Penjelasan keterhubungan hutan"
        >
          <div className="why-story-progress" aria-hidden="true">
            {ecosystemNodes.map((node, i) => (
              <span
                key={node.id}
                className={`why-story-bar ${
                  active !== null && i <= active ? 'is-filled' : ''
                } ${active === i ? 'is-current' : ''}`}
              />
            ))}
          </div>

          {selected ? (
            <div className="why-panel-copy" key={`${selected.id}-${simMode}`}>
              <div className="why-panel-top">
                <p className="why-kicker">
                  {selected.number} / {selected.label}
                </p>
                <button
                  type="button"
                  className="why-close-btn"
                  onClick={close}
                  aria-label="Tutup penjelasan"
                >
                  ×
                </button>
              </div>

              <h3>{isDisrupted ? selected.brokenTitle : selected.title}</h3>
              <p className="why-panel-lead">
                {isDisrupted ? selected.brokenLead : selected.lead}
              </p>

              <div className="why-detail-tabs" role="tablist" aria-label="Pilih keterangan">
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'story'}
                  className={tab === 'story' ? 'is-active' : ''}
                  onClick={() => setTab('story')}
                >
                  {isDisrupted ? 'Rantai Kerusakan' : 'Cara Menjaga Hutan'}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === 'signs'}
                  className={tab === 'signs' ? 'is-active' : ''}
                  onClick={() => setTab('signs')}
                >
                  {isDisrupted ? 'Tanda Kerusakan' : 'Ciri Hutan Sehat'}
                </button>
              </div>

              <div className="why-detail-card" role="tabpanel">
                {tab === 'story' ? (
                  <>
                    <p>{isDisrupted ? selected.detailBroken : selected.detailIntact}</p>
                    <p className="why-bridge-line">
                      {isDisrupted ? selected.brokenBridgeText : selected.bridgeText}
                    </p>
                  </>
                ) : (
                  <ul className="why-indicator-list">
                    {(isDisrupted ? selected.brokenIndicators : selected.indicators).map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="why-panel-footer">
                <div className="why-source-row">
                  <SourceLink id={selected.sourceId} />
                </div>

                <div className="why-sequential-controls">
                  {prevNode ? (
                    <button
                      type="button"
                      className="why-btn-prev"
                      onClick={() => openStep(active! - 1)}
                    >
                      ← {prevNode.number}
                    </button>
                  ) : (
                    <button type="button" className="why-btn-prev" onClick={close}>
                      ← Ringkasan
                    </button>
                  )}

                  <button
                    type="button"
                    className="why-btn-next"
                    onClick={() => openStep(nextIndex)}
                  >
                    {active === ecosystemNodes.length - 1
                      ? 'Ulangi dari 01 Tajuk Pohon ↻'
                      : `Lanjut ke ${nextNode.number} ${nextNode.label} →`}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="why-panel-empty">
              <h3>
                {isDisrupted
                  ? 'Satu bagian rusak, tiga bagian lain ikut runtuh.'
                  : 'Empat bagian hutan yang saling menjaga.'}
              </h3>

              <ol className="why-overview-steps">
                {ecosystemNodes.map((node, i) => (
                  <li key={node.id}>
                    <button type="button" onClick={() => openStep(i)}>
                      <span className="why-step-num">{node.number}</span>
                      <span className="why-step-text">
                        <strong>{node.label}</strong>
                        <small>{isDisrupted ? node.brokenRole : node.shortRole}</small>
                      </span>
                      <span className="why-step-arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="why-panel-footer">
                <button
                  type="button"
                  className="why-btn-next why-btn-start"
                  onClick={() => openStep(0)}
                >
                  {isDisrupted
                    ? 'Telusuri dari 01 Tajuk Pohon →'
                    : 'Mulai dari 01 Tajuk Pohon →'}
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Dok Bawah: 4 Kartu Timbul Stabil */}
      <div className="why-connection-index" aria-label="Urutan bagian hutan">
        {ecosystemNodes.map((spot, i) => {
          const isCurrent = active === i
          const isDone = visited.includes(spot.id)
          return (
            <button
              key={spot.id}
              type="button"
              className={`why-step-card ${isCurrent ? 'is-current' : ''} ${
                isDone ? 'is-done' : ''
              }`}
              onClick={() => openStep(i)}
              aria-pressed={isCurrent}
            >
              <div className="why-index-top">
                <span className="why-index-num">{spot.number}</span>
                {isDone && (
                  <span className="why-index-check" aria-label="Sudah dilihat">
                    ✓
                  </span>
                )}
              </div>
              <div className="why-index-title">
                <strong>{spot.label}</strong>
                <small>{isDisrupted ? spot.brokenRole : spot.shortRole}</small>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
