export function campaignUrl(source: string, content: string) {
  const url = new URL('https://sebelumjadiapi.my.id/')
  url.search = new URLSearchParams({
    utm_source: source,
    utm_medium: 'share',
    utm_campaign: 'sebelumjadiapi',
    utm_content: content,
  }).toString()
  url.hash = '/jejak-kehidupan'
  return url.href
}

export function scrollToChapter(id: string) {
  const section = document.getElementById(id)
  section?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  const focusTarget = section?.querySelector<HTMLElement>('h2, h3[tabindex="-1"]') ?? section
  focusTarget?.focus({ preventScroll: true })
}

