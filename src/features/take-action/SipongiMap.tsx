import { actionSources } from '../../content/takeAction'
import './sipongiMap.css'

export function SipongiMap() {
  const source = actionSources.sipongi
  return <section id="peta-hotspot" className="ca-section sipongi-map" aria-labelledby="sipongi-title">
    <div className="ca-wrap">
      <header className="sipongi-heading">
        <div>
          <h2 id="sipongi-title" tabIndex={-1}>Peta Hotspot SiPongi+</h2>
          <p>Pilih wilayah dan tanggal untuk melihat titik panas yang terdeteksi satelit.</p>
        </div>
        <a className="ca-button" href={source.url} target="_blank" rel="noreferrer">Buka Peta Hotspot Resmi ↗</a>
      </header>
      <iframe title="Peta hotspot resmi SiPongi+" src={source.url} loading="lazy" referrerPolicy="no-referrer" />
      <p className="sipongi-credit">Sumber peta dan data <a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></p>
    </div>
  </section>
}
