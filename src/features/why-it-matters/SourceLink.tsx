import {factSources} from '../../content/whyItMatters'

export function SourceLink({id}: {id: string}) {
  const s = factSources.find(item => item.id === id)!
  return (
    <a
      className="why-source-link"
      href={s.sourceUrl}
      target="_blank"
      rel="noreferrer"
      title={s.title}
      aria-label={`Baca sumber ${s.publisher}: ${s.title}`}
    >
      <span>{s.publisher} · Baca sumber</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}
