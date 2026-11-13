import type { CSSProperties } from 'react'
import { resetDepth, setDepth } from '../campaign-actions/depthMotion'

const peat = '/assets/images/campaign-actions/peat-monolith.webp'
const messages = ['Gambut masih kering.', 'Mulai lembap.', 'Mulai lembap.', 'Hampir basah.', 'Hampir basah.', 'Gambutmu basah penuh.']

export function PeatMeter({ count }: { count: number }) {
  return <aside className="action-meter" aria-label="Simulasi progres gambut" onPointerMove={setDepth} onPointerLeave={resetDepth}>
    <div className="action-meter-heading">
      <span>Meteran Gambut <small>· Simulasi</small></span>
      <strong>{count}<small> / 5</small></strong>
    </div>
    <div className="action-peat" aria-hidden="true" data-wet={count > 0} style={{ '--water': count * 12 + '%' } as CSSProperties}>
      <img src={peat} alt="" loading="lazy" decoding="async" />
      <div className="action-water-mask"><div className="action-water" /></div>
      <div className="action-water-ticks">{[5, 4, 3, 2, 1].map(level => <i key={level} data-filled={level <= count} />)}</div>
      {count > 0 && <span key={count} className="action-droplet" />}
    </div>
    <div className="ca-mini-meter" role="progressbar" aria-label="Misi selesai" aria-valuemin={0} aria-valuemax={5} aria-valuenow={count}>
      {[1, 2, 3, 4, 5].map(level => <i key={level} data-filled={level <= count} />)}
    </div>
    <p role="status">{messages[count]}</p>
  </aside>
}
