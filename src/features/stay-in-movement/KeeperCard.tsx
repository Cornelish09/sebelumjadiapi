import { useState } from 'react'
import { keeperTemplates } from '../../content/keeperTemplates'
import { CardExport, CardPreview } from '../campaign-actions/CardPreview'
import type { CardDetails } from '../campaign-actions/cardImage'
import { useMissionProgress, usePledges } from '../campaign-actions/progress'

const frames = import.meta.glob<string>('../../assets/keeper-frames/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

export function KeeperCard() {
  const count = useMissionProgress().length
  const pledges = usePledges()
  const [draft, setDraft] = useState<string | null>(null)
  const [selected, setSelected] = useState<string>(keeperTemplates[0].id)
  const name = draft ?? pledges[0]?.name ?? ''
  const template = keeperTemplates.find(item => item.id === selected) ?? keeperTemplates[0]
  const frame = frames[`../../assets/keeper-frames/${template.id}.png`]
  const storyFrame = frames[`../../assets/keeper-frames/${template.id}-story.png`]
  const details: CardDetails = {
    label: template.role,
    title: name.trim() || 'Nama kamu',
    body: template.story,
    image: template.image,
    design: { type: 'keeper', accent: template.accent, foreground: template.foreground, frame },
  }
  const downloadable = count > 0 && Boolean(name.trim())
  return <div id="peat-keeper-card" className="movement-keeper" tabIndex={-1}>
    <CardPreview details={details} format="landscape" cardId={template.id} />
    <div className="movement-card-controls">
      <label className="ca-field">Nama pada kartu
        <input value={name} maxLength={24} autoComplete="nickname" onChange={event => setDraft(event.target.value)} placeholder="Nama panggilan atau inisial" />
      </label>
      <fieldset className="keeper-templates">
        <legend>Template kartu</legend>
        <div className="keeper-template-options">
          {keeperTemplates.map(item => <label key={item.id} className="keeper-template">
            <input className="sr-only" type="radio" name="keeper-template" value={item.id} checked={template.id === item.id} onChange={() => setSelected(item.id)} />
            <span>
              <img src={item.image} alt="" loading="lazy" decoding="async" />
              {item.label}
            </span>
          </label>)}
        </div>
      </fieldset>
      {count === 0 && <p className="ca-muted">Selesaikan satu misi di atas untuk mengunduh kartu.</p>}
      <div className="ca-tools">
        <CardExport details={details} format="landscape" label="Unduh kartu" filename={`kartu-penjaga-gambut-${template.id}`} disabled={!downloadable} />
        <CardExport details={{ ...details, design: { type: 'keeper', accent: template.accent, foreground: template.foreground, frame: storyFrame } }}
          format="story" label="Bagikan ke Story" filename={`penjaga-gambut-${template.id}-story`} share disabled={!downloadable} />
      </div>
    </div>
  </div>
}
