import { useState, type FormEvent } from 'react'
import { campaignHashtag, campaignLinks, fieldActionPosts, pledges } from '../../content/campaignParticipation'
import { CardExport } from '../campaign-actions/CardPreview'
import { ChapterLink, PendingLink } from '../campaign-actions/Controls'
import { campaignUrl } from '../campaign-actions/links'
import { addPledge, usePledges } from '../campaign-actions/progress'
import { PledgeCard } from './PledgeCard'
import './showYourAction.css'

export function ShowYourAction() {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [pledgeId, setPledgeId] = useState<string>(pledges[0].id)
  const [status, setStatus] = useState('')
  const entries = usePledges()
  const pledge = pledges.find(({ id }) => id === pledgeId) ?? pledges[0]
  const promise = pledge.text
  const valid = Boolean(name.trim() && city.trim())
  const byline = [name.trim(), city.trim()].filter(Boolean).join(' · ')
  const details = {
    label: 'Kartu Janji',
    title: promise,
    byline,
    image: pledge.image,
    artwork: { foreground: pledge.foreground, accent: pledge.accent },
  }
  const xLink = new URL('https://x.com/intent/post')
  xLink.searchParams.set('text', `${byline ? byline + ': ' : ''}${promise} ${campaignHashtag}`)
  xLink.searchParams.set('url', campaignUrl('x', 'kartu-janji'))

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!valid) { setStatus('Isi nama panggilan dan asal kota.'); return }
    const result = addPledge({ name: name.trim(), city: city.trim(), promise })
    setStatus({
      saved: 'Janji ditambahkan ke Wall of Action bersama.',
      session: 'Janji ditambahkan untuk sesi ini.',
      duplicate: 'Janji ini sudah ada di dinding.',
    }[result])
  }

  return <section id="show-your-action" className="ca-section show-action" aria-labelledby="show-title">
    <div className="ca-wrap">
      <header className="ca-heading show-heading">
        <p className="ca-kicker">05 / Show Your Action</p>
        <h2 id="show-title" tabIndex={-1}>Aksi Nyata dari Balik Layar.</h2>
        <p>Buat kartu janjimu, bagikan, dan tambahkan janji ke Wall of Action bersama.</p>
      </header>
      <div className="show-studio">
        <form className="show-form" onSubmit={save}>
          <h3>Buat Kartu Janji</h3>
          <div className="ca-fields">
            <label>Nama panggilan atau inisial
              <input required maxLength={24} autoComplete="nickname" placeholder="Mis. Rai" value={name} onChange={event => setName(event.target.value)} />
            </label>
            <label>Asal kota
              <input required maxLength={30} autoComplete="address-level2" placeholder="Mis. Palangka Raya" value={city} onChange={event => setCity(event.target.value)} />
            </label>
            <label>Pilihan janji
              <select value={pledgeId} onChange={event => setPledgeId(event.target.value)}>
                {pledges.map(({ id, label }) => <option value={id} key={id}>{label}</option>)}
              </select>
            </label>
          </div>
          <button className="ca-button ca-primary show-submit" type="submit">Simpan janji</button>
          <p className="ca-feedback" role="status">{status}</p>
          <div className="ca-tools show-share">
            <CardExport details={details} format="story" filename="kartu-janji-sebelumjadiapi" label="Bagikan ke IG Story" share disabled={!valid} />
            {valid ? <a className="ca-button" href={xLink.href} target="_blank" rel="noreferrer">Bagikan ke X ↗</a> : <button className="ca-button" type="button" disabled>Bagikan ke X ↗</button>}
          </div>
        </form>
        <PledgeCard pledge={pledge} byline={byline} />
        <aside className="show-side" aria-labelledby="wall-title">
          <div className="show-wall">
            <h3 id="wall-title">Wall of Action</h3>
            <p className="show-count" role="status"><strong>{entries.length}</strong> janji bersama</p>
            {entries.length ? <ul className="show-wall-list">
              {entries.map(entry => <li key={entry.id}>
                <span className="show-initial" aria-hidden="true">{Array.from(entry.name)[0]?.toUpperCase()}</span>
                <div><strong>{entry.name}</strong><span> · {entry.city}</span><p>{entry.promise}</p></div>
              </li>)}
            </ul> : <p className="show-empty">Janji pertamamu akan tampil di sini.</p>}
          </div>
          <div className="show-social">
            <PendingLink label="Instagram" url={campaignLinks.instagram} />
            <PendingLink label="TikTok" url={campaignLinks.tiktok} />
          </div>
        </aside>
      </div>
      <div className="show-continuation">
        <div className="show-field-head">
          <div>
            <p className="ca-kicker">Sorotan Lapangan · @wwf_id</p>
            <h3>Catatan langsung dari lapangan</h3>
          </div>
          <ChapterLink id="stay-in-the-movement" primary>Lanjut ke Stay in the Movement ↓</ChapterLink>
        </div>
        <div className="show-field-grid">
          {fieldActionPosts.map(post => (
            <article className="show-field-item" key={post.id}>
              <div className="show-field-card">
                <iframe
                  className="show-field-iframe"
                  src={post.embedUrl}
                  title={post.caption}
                  loading="lazy"
                  scrolling="no"
                />
              </div>
              <p className="show-field-caption">
                <a href={post.url} target="_blank" rel="noreferrer">{post.caption}</a>
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
}
