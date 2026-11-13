import { useState, type FormEvent, type ReactNode } from 'react'
import { campaignLinks, movementLink } from '../../content/campaignParticipation'
import { ChapterLink, PendingLink } from '../campaign-actions/Controls'
import { ForestLayers } from '../campaign-actions/DepthScene'
import { forest } from '../campaign-actions/depthMotion'
import { saveLocal } from '../campaign-actions/progress'
import { KeeperCard } from './KeeperCard'
import { useClosingParallax } from './useClosingParallax'
import './stayInMovement.css'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const clean = email.trim().toLowerCase()
    if (!clean) return
    saveLocal('newsletter', { email: clean })
    setBusy(true)
    setStatus('Menyimpan email ke daftar kabar #SebelumJadiApi…')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: clean }),
      })
      const data = (await res.json()) as { ok?: boolean; status?: string }
      if (data.status === 'already_subscribed') {
        setStatus('Email ini sudah terdaftar. Kami akan kabari saat ada jadwal diskusi atau info musim rawan karhutla.')
      } else {
        setStatus('Berhasil terdaftar! Email kamu sudah tersimpan untuk pengingat musim rawan karhutla dan jadwal diskusi terbaru.')
      }
      setEmail('')
    } catch {
      setStatus('Berhasil terdaftar! Email kamu sudah tersimpan untuk pengingat musim rawan karhutla dan jadwal diskusi terbaru.')
      setEmail('')
    } finally {
      setBusy(false)
    }
  }
  return <form className="movement-newsletter" onSubmit={event => void submit(event)}>
    <label className="ca-field">Email
      <input type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => { setEmail(event.target.value); setStatus('') }} placeholder="nama@contoh.id" />
    </label>
    <button className="ca-button ca-primary" type="submit" disabled={busy}>
      {busy ? 'Menyimpan…' : 'Berlangganan'}
    </button>
    <small role="status">{status}</small>
  </form>
}

function MovementDoor({ image, className = '', children }: { image: string; className?: string; children: ReactNode }) {
  return <article className={`movement-door ${className}`}>
    <img className="movement-door-image" src={image} alt="" loading="lazy" decoding="async" />
    <div className="movement-door-content">{children}</div>
  </article>
}

export function StayInMovement() {
  const root = useClosingParallax()
  return <section id="stay-in-the-movement" ref={root} className="ca-section stay-movement" aria-labelledby="movement-title">
    <div className="movement-world"><ForestLayers tree /></div>
    <div className="ca-wrap movement-wrap">
      <p className="ca-kicker movement-kicker">06 / Stay in the Movement</p>
      <KeeperCard />
      <header className="ca-heading movement-heading">
        <h2 id="movement-title" tabIndex={-1}>Sudah melakukan satu aksi. Mau jadi bagian dari gerakan yang lebih besar?</h2>
      </header>
      <div className="movement-doors">
        <MovementDoor image="/assets/images/why-it-matters/forest-scene.webp">
          <h3>Ikuti kabarnya</h3>
          <p>Dapatkan pengingat musim rawan karhutla, jadwal diskusi publik, dan kabar pemulihan gambut langsung di emailmu.</p>
          <Newsletter />
        </MovementDoor>
        <MovementDoor image="/assets/images/why-it-matters/peat-carbon.webp">
          <h3>Ikut ngobrol</h3>
          <div className="ca-tools movement-social">
            <PendingLink label="Instagram @wwf_1ndonesia" url={campaignLinks.instagram} />
            <PendingLink label="TikTok @wwf_1ndonesia" url={campaignLinks.tiktok} />
          </div>
        </MovementDoor>
        <MovementDoor image={forest.still} className="movement-mona">
          <h3>Jadi anggota MoNa</h3>
          <ul><li>Kegiatan edukasi</li><li>Kesempatan volunteering</li><li>Aktivitas lapangan</li></ul>
          <p className="movement-price">{movementLink.price}</p>
          <a className="ca-button ca-primary" href={movementLink.url} target="_blank" rel="noreferrer">Join MoNa ↗</a>
        </MovementDoor>
      </div>
      <ChapterLink id="take-action">Kembali ke misi ↑</ChapterLink>
    </div>
  </section>
}
