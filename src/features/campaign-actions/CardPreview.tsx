import { useState, type CSSProperties } from 'react'
import { downloadPng, makeCard, type CardDetails, type CardFormat } from './cardImage'
import { holdDepth, releaseDepth, resetDepth, setDepth } from './depthMotion'
import './campaignActions.css'

export function CardPreview({ details, format, cardId }: { details: CardDetails; format: CardFormat; cardId?: string }) {
  const { progress, design } = details
  const frame = design?.type === 'keeper' ? design.frame : undefined
  const foreground = design?.foreground
  const content = <>
    <div>
      <div className="ca-preview-label">{details.label}</div>
      {design?.type === 'fact' && design.annotation && <div className="ca-preview-annotation">{design.annotation}</div>}
    </div>
    <div className="ca-preview-copy">
      <h3 tabIndex={-1}>{details.title}</h3>
      {details.body && <p>{details.body}</p>}
      {details.byline && <p className="ca-preview-byline">{details.byline}</p>}
      {progress !== undefined && <div className="ca-mini-meter" aria-label={`${progress} dari 5 misi selesai`}>
        {Array.from({ length: 5 }, (_, index) => <i key={index} data-filled={index < progress} />)}
      </div>}
    </div>
    <div className="ca-preview-foot">{details.source && <small>{details.source}</small>}<span>#SebelumJadiApi</span></div>
  </>
  return <div
    className={`ca-card-stage ca-card-stage-${format}`}
    onPointerMove={setDepth}
    onPointerDown={holdDepth}
    onPointerUp={releaseDepth}
    onPointerCancel={releaseDepth}
    onPointerLeave={resetDepth}
  >
    <article
      className={`ca-preview ca-preview-${format} ca-preview-3d`}
      data-design={design?.type}
      data-card={cardId}
      style={{ '--card-accent': design?.accent } as CSSProperties}
    >
      <div className="ca-card-rim" aria-hidden="true" />
      <div key={`${design?.type}-${cardId ?? details.image}`} className="ca-card-scene">
        <div className="ca-card-backdrop" aria-hidden="true">
          <img src={details.image} alt="" loading="lazy" decoding="async" />
        </div>
        {foreground && <img className="ca-card-object" src={foreground} alt="" loading="lazy" decoding="async" />}
      </div>
      <div className="ca-card-glass" aria-hidden="true" />
      <div className="ca-depth-content">{content}</div>
      {frame && <img className="ca-preview-frame" src={frame} alt="" decoding="async" />}
    </article>
  </div>
}

export function CardExport({ details, format, label, filename, share = false, disabled = false, onDone }: {
  details: CardDetails
  format: CardFormat
  label: string
  filename: string
  share?: boolean
  disabled?: boolean
  onDone?: () => void
}) {
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const exportImage = async () => {
    setBusy(true)
    setStatus('')
    try {
      const blob = await makeCard(details, format)
      if (share) {
        const file = new File([blob], `${filename}.png`, { type: 'image/png' })
        if (navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({ files: [file] })
            setStatus('Kartu dibuka di aplikasi berbagi.')
            onDone?.()
            return
          } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
              setStatus('Berbagi dibatalkan.')
              return
            }
          }
        }
      }
      downloadPng(blob, filename)
      setStatus(share ? 'Kartu diunduh. Unggah PNG ini ke Story.' : 'Kartu diunduh.')
      onDone?.()
    } catch {
      setStatus('Kartu gagal disiapkan. Coba lagi.')
    } finally { setBusy(false) }
  }
  return <div className="ca-export">
    <button className="ca-button" type="button" disabled={disabled || busy} onClick={() => void exportImage()}>{busy ? 'Menyiapkan kartu…' : label}</button>
    <small role="status">{status}</small>
  </div>
}
