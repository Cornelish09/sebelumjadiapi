import { useEffect, useMemo, useRef, useState } from 'react'
import { actionSources, factCards, programs, quiz, verificationChecklist } from '../../content/takeAction'
import { campaignLinks } from '../../content/campaignParticipation'
import { DepthScene } from '../campaign-actions/DepthScene'
import { ChapterLink, CopyButton, PendingLink } from '../campaign-actions/Controls'
import { CardExport, CardPreview } from '../campaign-actions/CardPreview'
import { downloadPng, makeCard } from '../campaign-actions/cardImage'
import { holdDepth, releaseDepth, resetDepth, setDepth } from '../campaign-actions/depthMotion'
import { campaignUrl } from '../campaign-actions/links'
import { completeMission, setVerificationCheck, useVerificationChecks } from '../campaign-actions/progress'
import { whatsappUrl } from './shareActions'

function Source({ source }: { source: { url: string; label: string } }) {
  return <a className="ca-source" href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>
}

export function LearnMission() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const start = useRef<{ x: number; y: number } | null>(null)
  const item = quiz[index]
  const answer = answers[index]

  function choose(value: boolean) {
    if (answer === undefined && item) setAnswers(previous => previous.length === index ? [...previous, value] : previous)
  }

  if (!item) {
    const score = answers.filter((value, i) => value === quiz[i].fact).length
    return <div className="action-score">
      <strong>{score}/{quiz.length} benar</strong>
      <button className="ca-button" type="button" onClick={() => { setAnswers([]); setIndex(0) }}>Ulangi kuis</button>
    </div>
  }

  return <div className="action-quiz">
    <div
      className="action-quiz-plate"
      data-answer={answer === undefined ? undefined : answer ? 'fact' : 'myth'}
      onPointerDown={event => {
        if (answer !== undefined || event.button !== 0) return
        start.current = { x: event.clientX, y: event.clientY }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={event => {
        if (!start.current) return
        const dx = Math.max(-90, Math.min(90, event.clientX - start.current.x))
        event.currentTarget.style.setProperty('--swipe-x', dx + 'px')
        event.currentTarget.style.setProperty('--swipe-angle', dx / 20 + 'deg')
      }}
      onPointerCancel={event => {
        start.current = null
        event.currentTarget.style.removeProperty('--swipe-x')
        event.currentTarget.style.removeProperty('--swipe-angle')
      }}
      onPointerUp={event => {
        const origin = start.current
        start.current = null
        event.currentTarget.style.removeProperty('--swipe-x')
        event.currentTarget.style.removeProperty('--swipe-angle')
        if (!origin) return
        const dx = event.clientX - origin.x
        const dy = event.clientY - origin.y
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) choose(dx > 0)
      }}
    >
      <DepthScene key={index} className="action-quiz-scene" image="/assets/images/why-it-matters/peat-carbon.webp">
        <span className="ca-kicker">{index + 1} / {quiz.length}</span>
        <p>{item.statement}</p>
      </DepthScene>
    </div>
    {answer === undefined ? <>
      <p className="ca-muted">Geser kiri untuk Mitos, kanan untuk Fakta.</p>
      <div className="ca-tools">
        <button className="ca-button" type="button" onClick={() => choose(false)}>← Mitos</button>
        <button className="ca-button ca-primary" type="button" onClick={() => choose(true)}>Fakta →</button>
      </div>
    </> : <div className="action-explanation">
      <div role="status">
        <strong>{answer === item.fact ? 'Tepat' : 'Belum tepat'} · {item.fact ? 'Fakta' : 'Mitos'}</strong>
        <p>{item.reason}</p>
      </div>
      <div className="ca-tools"><Source source={item.source} />{'related' in item && <Source source={item.related} />}</div>
      <button className="ca-button ca-primary" type="button" onClick={() => {
        if (index + 1 === quiz.length) completeMission('learn')
        setIndex(index + 1)
      }}>{index + 1 === quiz.length ? 'Lihat skor' : 'Pernyataan berikutnya →'}</button>
    </div>}
  </div>
}

export function CheckMission() {
  const checks = useVerificationChecks()
  const [activeIdx, setActiveIdx] = useState(0)
  const current = verificationChecklist[activeIdx] ?? verificationChecklist[0]
  const checkedCount = checks.filter(Boolean).length
  const allChecked = checkedCount === verificationChecklist.length

  const inspectPoint = (index: number) => {
    setActiveIdx(index)
    if (!checks[index]) setVerificationCheck(index, true)
  }

  const handleNextPoint = () => {
    if (!checks[activeIdx]) {
      setVerificationCheck(activeIdx, true)
    }
    const nextUnchecked = verificationChecklist.findIndex((_, i) => i !== activeIdx && !checks[i])
    if (nextUnchecked !== -1) {
      setActiveIdx(nextUnchecked)
      setVerificationCheck(nextUnchecked, true)
    } else {
      const next = (activeIdx + 1) % verificationChecklist.length
      setActiveIdx(next)
    }
  }

  return <div className="action-check">
    <p className="check-lead">
      Jangan buru-buru meneruskan kiriman panik di grup. Klik <strong>3 titik pada postingan viral</strong> ini buat membedah faktanya.
    </p>

    <div className="check-studio">
      <div
        className="check-viral-stage"
        onPointerMove={setDepth}
        onPointerDown={holdDepth}
        onPointerUp={releaseDepth}
        onPointerCancel={releaseDepth}
        onPointerLeave={resetDepth}
      >
        <div className="check-viral-card" data-verified={allChecked}>
          <div className="check-viral-layers" aria-hidden="true">
            <img className="check-layer-back" src="/assets/images/campaign-actions/check-viral-back.webp" alt="" loading="lazy" decoding="async" />
            <img className="check-layer-mid" src="/assets/images/campaign-actions/check-viral-mid.webp" alt="" loading="lazy" decoding="async" />
            <img className="check-layer-front" src="/assets/images/campaign-actions/check-viral-front.webp" alt="" loading="lazy" decoding="async" />
            <span className="check-layer-vignette" />
            <span className="check-layer-sheen" />
          </div>

          <header className="check-viral-top">
            <div className="check-viral-author">
              <span className="check-viral-avatar" aria-hidden="true">!</span>
              <div>
                <strong>@kabar_viral_terkini</strong>
                <small>Terusan berantai · Tanpa rujukan resmi</small>
              </div>
            </div>
            <span className="check-viral-badge" data-done={allChecked}>
              {allChecked ? '3/3 Terbedah ✓' : `${checkedCount}/3 Dicek`}
            </span>
          </header>

          <div className="check-viral-pins" role="group" aria-label="Titik bedah postingan viral">
            {verificationChecklist.map((item, idx) => {
              const isSelected = activeIdx === idx
              const isDone = checks[idx]
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`check-pin ${isSelected ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  aria-pressed={isSelected}
                  onClick={() => inspectPoint(idx)}
                >
                  <span className="check-pin-dot">{isDone ? '✓' : idx + 1}</span>
                  <span className="check-pin-text">{item.pinLabel}</span>
                </button>
              )
            })}
          </div>

          <footer className="check-viral-caption">
            <span className="check-viral-tag">CONTOH KIRIMAN VIRAL</span>
            <p>“DARURAT! 500 titik panas kepung Kalimantan sore ini, wajib sebarkan sekarang!”</p>
          </footer>
        </div>
      </div>

      <div className="check-inspector">
        <div className="ca-segmented check-tabs" role="group" aria-label="Pilih titik pemeriksaan">
          {verificationChecklist.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activeIdx === idx}
              onClick={() => inspectPoint(idx)}
            >
              {checks[idx] ? `✓ ${item.pinLabel}` : item.pinLabel}
            </button>
          ))}
        </div>

        <article className="check-verdict-card" aria-live="polite">
          <div className="check-claim-box">
            <span>Klaim di kiriman</span>
            <p>{current.claim}</p>
          </div>

          <div className="check-fact-box">
            <span className="check-fact-kicker">Fakta sebenarnya</span>
            <h4>{current.verdict}</h4>
            <p>{current.text}</p>
          </div>

          <div className="check-verdict-foot">
            {!allChecked ? (
              <button className="ca-button ca-primary" type="button" onClick={handleNextPoint}>
                {checks[activeIdx] ? 'Cek titik berikutnya →' : 'Tandai sudah dicek & lanjut →'}
              </button>
            ) : (
              <span className="check-complete-pill" role="status">
                ✓ Semua titik sudah dibedah — misi Cek Sebelum Percaya selesai!
              </span>
            )}
          </div>
        </article>

        <div className="ca-tools check-links">
          <a className="ca-button" href={actionSources.sipongi.url} target="_blank" rel="noreferrer">Buka Peta SiPongi+ ↗</a>
          <PendingLink label="Contoh informasi di Instagram" url={campaignLinks.checkPost} />
          <ChapterLink id="peta-hotspot">Lihat peta di halaman ini ↓</ChapterLink>
        </div>
      </div>
    </div>
  </div>
}

export function ShareMission() {
  const [selected, setSelected] = useState(0)
  const [waBusy, setWaBusy] = useState(false)
  const [waStatus, setWaStatus] = useState('')
  const cache = useRef(new Map<string, Blob>())
  const fact = factCards[selected]
  const details = useMemo(() => ({
    label: fact.label,
    title: fact.title,
    body: fact.detail,
    source: fact.source.label,
    image: fact.image,
    design: {
      type: 'fact' as const,
      accent: fact.accent,
      foreground: fact.foreground,
      annotation: fact.id === 'hotspots' ? 'Ilustrasi deteksi satelit' : undefined,
    },
  }), [fact])

  useEffect(() => {
    let cancelled = false
    if (cache.current.has(fact.id)) return
    void makeCard(details, 'feed').then(blob => {
      if (!cancelled) cache.current.set(fact.id, blob)
    }).catch(() => {})
    return () => { cancelled = true }
  }, [details, fact.id])

  const done = () => completeMission('share')
  const url = campaignUrl('copy', `fakta-${fact.id}`)
  const message = `${fact.title}\n${fact.detail}\n\nSumber: ${fact.source.url}\n${campaignUrl('whatsapp', `fakta-${fact.id}`)}`

  const shareWhatsApp = async () => {
    setWaBusy(true)
    setWaStatus('')
    try {
      const cached = cache.current.get(fact.id)
      const blob = cached ?? await makeCard(details, 'feed')
      cache.current.set(fact.id, blob)
      const file = new File([blob], `fakta-${fact.id}-sebelumjadiapi.png`, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ title: fact.title, text: message, files: [file] })
          setWaStatus('Kartu dan pesan dibagikan ke WhatsApp.')
          done()
          return
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            setWaStatus('Berbagi dibatalkan.')
            return
          }
        }
      }
      window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
      let copied = false
      if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
          copied = true
        } catch {
          copied = false
        }
      }
      downloadPng(blob, `fakta-${fact.id}-sebelumjadiapi`)
      setWaStatus(copied
        ? 'Gambar kartu disalin & diunduh — tempel (Ctrl+V) atau lampirkan di WhatsApp.'
        : 'Gambar kartu diunduh — tinggal lampirkan PNG ini di chat WhatsApp.')
      done()
    } catch {
      window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
      setWaStatus('Tautan dibuka di WhatsApp.')
      done()
    } finally {
      setWaBusy(false)
    }
  }

  return <div className="action-share">
    <CardPreview details={details} format="feed" cardId={fact.id} />
    <div className="action-share-controls">
      <div className="ca-segmented" role="group" aria-label="Pilih kartu fakta">
        {factCards.map((card, index) => <button key={card.id} type="button" aria-pressed={selected === index} onClick={() => { setSelected(index); setWaStatus('') }}>{card.label}</button>)}
      </div>
      <Source source={fact.source} />
      <div className="ca-tools">
        <CardExport details={details} format="feed" label="Unduh 4:5 (Feed)" filename={`fakta-${fact.id}-feed`} onDone={done} />
        <CardExport details={details} format="story" label="Unduh 9:16 (Story)" filename={`fakta-${fact.id}-story`} onDone={done} />
        <button className="ca-button ca-primary" type="button" disabled={waBusy} onClick={() => void shareWhatsApp()}>
          {waBusy ? 'Menyiapkan kartu…' : 'Kirim ke WhatsApp ↗'}
        </button>
        <CopyButton key={fact.id} text={url} onCopied={done}>Salin Tautan</CopyButton>
      </div>
      <p className="ca-muted ca-wa-hint" role="status">{waStatus}</p>
    </div>
  </div>
}

export function JoinMission() {
  const [index, setIndex] = useState(0)
  const program = programs[index]
  return <div className="action-join">
    <p className="join-lead">Nggak perlu nunggu seragam relawan atau berangkat ke pedalaman. Mulai dari lingkaranmu sendiri — entah turun mengedukasi adik kelas, gabung gerakan kota, atau nimbrung di forum diskusi.</p>
    <div className="ca-segmented join-tabs" role="group" aria-label="Pilih jalur kegiatan">
      {programs.map((item, i) => <button key={item.title} type="button" aria-pressed={i === index} onClick={() => setIndex(i)}>0{i + 1} · {item.tab}</button>)}
    </div>
    <div
      key={program.title}
      className="ca-depth action-program"
      onPointerMove={setDepth}
      onPointerDown={holdDepth}
      onPointerUp={releaseDepth}
      onPointerCancel={releaseDepth}
      onPointerLeave={resetDepth}
    >
      <span className="ca-layers" aria-hidden="true">
        <img className="ca-layer-back action-program-photo" src={program.image} alt="" loading="lazy" decoding="async" />
        <span className="ca-layer-light" />
        <span className="ca-layer-shade" />
      </span>
      <div className="ca-depth-content">
        <p className="ca-kicker">{program.label}</p>
        <h4>{program.title}</h4>
        <p>{program.detail}</p>
        <div className="action-program-foot">
          {program.url ? <a className="ca-button ca-primary" href={program.url} target="_blank" rel="noreferrer" onClick={() => completeMission('join')}>Lihat program ↗</a>
            : <PendingLink label="Lihat jadwal webinar" url={campaignLinks.webinar} hideArrow onClick={() => completeMission('join')} />}
          {program.credit && <small className="action-program-credit">{program.credit}</small>}
        </div>
      </div>
    </div>
    <div className="action-carousel" aria-label="Navigasi program relawan dan komunitas">
      <button className="ca-button" type="button" aria-label="Program sebelumnya" onClick={() => setIndex((index + programs.length - 1) % programs.length)}>← Sebelumnya</button>
      <span aria-live="polite">{index + 1} / {programs.length}</span>
      <button className="ca-button" type="button" aria-label="Program berikutnya" onClick={() => setIndex((index + 1) % programs.length)}>Berikutnya →</button>
    </div>
  </div>
}


