import { useState } from 'react'
import { deliverMessage } from '../take-action/shareActions'
import { scrollToChapter } from './links'

export function PendingLink({ label, url, hideArrow = false, onClick }: { label: string; url: string | null; hideArrow?: boolean; onClick?: () => void }) {
  const [opened, setOpened] = useState(false)
  const text = hideArrow ? label : `${label} ↗`
  if (url) return <a className="ca-button" href={url} target="_blank" rel="noreferrer" onClick={onClick}>{text}</a>
  return <span className="ca-pending">
    <button type="button" className="ca-button" aria-expanded={opened} onClick={() => setOpened(!opened)}>{text}</button>
    {opened && <small role="status">Tautan menyusul.</small>}
  </span>
}

export function ChapterLink({ id, children, primary = false }: { id: string; children: string; primary?: boolean }) {
  return <a className={`ca-button${primary ? ' ca-primary' : ''}`} href={`#${id}`} onClick={event => {
    event.preventDefault()
    scrollToChapter(id)
  }}>{children}</a>
}

export function CopyButton({ text, children, onCopied }: { text: string; children: string; onCopied?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'manual'>('idle')
  const copy = async () => {
    const result = await deliverMessage(text, 'copy', {
      copy: value => navigator.clipboard?.writeText(value) ?? Promise.reject(new Error('Clipboard unavailable')),
    })
    if (result === 'copied') {
      setStatus('copied')
      onCopied?.()
    } else setStatus('manual')
  }
  return <div className="ca-copy">
    <button type="button" className="ca-button" onClick={() => void copy()}>{children}</button>
    <small role="status">{status === 'copied' ? 'Disalin.' : ''}</small>
    {status === 'manual' && <textarea aria-label="Teks untuk disalin" readOnly value={text} onFocus={event => event.currentTarget.select()} />}
  </div>
}

