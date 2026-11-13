import { useState } from 'react'
import { CopyButton } from '../campaign-actions/Controls'
import { holdDepth, releaseDepth, resetDepth, setDepth } from '../campaign-actions/depthMotion'
import { campaignUrl } from '../campaign-actions/links'
import { completeMission } from '../campaign-actions/progress'
import { whatsappUrl } from './shareActions'

const tones = ['Santai', 'Serius', 'Lucu'] as const
type Tone = typeof tones[number]

function inviteMessage(name: string, tone: Tone, count: number) {
  const who = name ? ` ${name}` : ''
  const progress = count > 0 ? ` Aku barusan kelarin ${count} misinya.` : ''
  const messages = {
    Santai: `Eh${who}, lagi selo nggak? Barusan aku baca soal gambut di #SebelumJadiApi — jujur baru ngeh ternyata bara api gambut bisa diem-diem menjalar di bawah tanah padahal atasnya kelihatan aman.${progress} Coba intip bentar deh, penasaran aja menurutmu gimana.`,
    Serius: `Halo${who}, ada waktu 2 menit sebentar? Akhir-akhir ini aku kepikiran pola kabar karhutla yang sering bikin panik duluan sebelum jelas faktanya. Di #SebelumJadiApi ada panduan ngecek titik panas langsung lewat peta SiPongi+ biar kita nggak ikut nyebar info mentah.${progress} Kalau sempet coba cek deh, ntar kita obrolin.`,
    Lucu: `Woy${who}, tahan dulu jarimu sebelum nge-forward info kebakaran ke grup keluarga 😄. Seriusan, barusan aku iseng nyobain tebak-tebakan fakta vs mitos di #SebelumJadiApi — ternyata banyak soal gambut yang selama ini sering kita salah kira.${progress} Coba tes deh, jangan sampe skor kamu kalah sama aku.`,
  }
  return messages[tone]
}

export function InviteMission({ count }: { count: number }) {
  const [name, setName] = useState('')
  const [tone, setTone] = useState<Tone>('Santai')
  const trimmedName = name.trim()
  const message = inviteMessage(trimmedName, tone, count)
  const draft = (source: string) => `${message}\n\n${campaignUrl(source, 'invite')}`
  const done = () => completeMission('invite')

  return <div className="action-invite">
    <p className="invite-lead">Poster sebagus apa pun sering cuma lewat di timeline, tapi pesan dari teman sendiri hampir selalu dibuka. Pilih nada obrolanmu, lalu lempar ke satu orang di chat atau grup.</p>
    <div className="invite-grid">
      <div className="invite-compose">
        <label className="ca-field">Nama teman
          <input value={name} onChange={event => setName(event.target.value)} maxLength={32} placeholder="Misal : nayezz" />
        </label>
        <div className="invite-tones">
          <span id="invite-tone-label">Gaya bicara</span>
          <div className="ca-segmented" role="group" aria-labelledby="invite-tone-label">
            {tones.map(item => <button key={item} type="button" aria-pressed={item === tone} onClick={() => setTone(item)}>{item}</button>)}
          </div>
        </div>
        <div className="ca-tools invite-actions">
          <a className="ca-button ca-primary" href={whatsappUrl(draft('whatsapp'))} target="_blank" rel="noreferrer" onClick={done}>Kirim via WhatsApp ↗</a>
          <CopyButton text={draft('copy')} onCopied={done}>Salin Pesan</CopyButton>
        </div>
      </div>
      <div className="invite-preview-stage"
        onPointerMove={setDepth}
        onPointerDown={holdDepth}
        onPointerUp={releaseDepth}
        onPointerCancel={releaseDepth}
        onPointerLeave={resetDepth}
      >
        <div className="invite-preview" aria-label="Pratinjau pesan undangan">
          <div className="invite-preview-head">
            <span className="invite-recipient">
              <i aria-hidden="true">{(trimmedName[0] || 'T').toUpperCase()}</i>
              <span>Untuk {trimmedName || 'Temanmu'}</span>
            </span>
            <span className="invite-tone-pill">{tone}</span>
          </div>
          <blockquote>{message}</blockquote>
          <div className="invite-link-card" aria-hidden="true">
            <strong>#SebelumJadiApi</strong>
            <span>sebelumjadiapi.my.id · Sebelum api, ada kehidupan</span>
          </div>
          <span className="invite-preview-meta" aria-hidden="true">Siap kirim · ✓✓</span>
        </div>
      </div>
    </div>
  </div>
}
