export interface CardDetails {
  label: string
  title: string
  body?: string
  byline?: string
  source?: string
  image: string
  progress?: number
  artwork?: { foreground: string; accent: string }
  design?:
    | { type: 'fact'; accent: string; annotation?: string; foreground?: string }
    | { type: 'keeper'; accent: string; frame?: string; foreground?: string }
}

export type CardFormat = 'feed' | 'story' | 'landscape'
const sizes = { feed: [1080, 1350], story: [1080, 1920], landscape: [1200, 630] } as const

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Aset kartu gagal dimuat'))
    img.src = url
  })
}

function cover(ctx: CanvasRenderingContext2D, image: HTMLImageElement, w: number, h: number, horizontal = .5) {
  const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight)
  const width = image.naturalWidth * scale
  const height = image.naturalHeight * scale
  ctx.drawImage(image, (w - width) * horizontal, (h - height) / 2, width, height)
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}

function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, lineHeight: number) {
  const lines = wrap(ctx, text, width)
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight, width))
  return y + lines.length * lineHeight
}

function drawPledge(
  ctx: CanvasRenderingContext2D,
  details: CardDetails,
  subject: HTMLImageElement,
  accent: string,
  w: number,
  h: number,
) {
  const shade = ctx.createLinearGradient(0, 0, 0, h)
  shade.addColorStop(0, '#07110de8')
  shade.addColorStop(.35, '#080f0ca8')
  shade.addColorStop(.72, '#0a110c26')
  shade.addColorStop(1, '#09110ed2')
  ctx.fillStyle = shade
  ctx.fillRect(0, 0, w, h)

  const subjectWidth = w * .84
  const subjectHeight = subjectWidth * subject.naturalHeight / subject.naturalWidth
  ctx.drawImage(subject, w * .13, h * .89 - subjectHeight, subjectWidth, subjectHeight)

  const inset = w * .022
  const pad = w * .10
  const lineWidth = w - 2 * pad
  ctx.beginPath()
  ctx.roundRect(inset, inset, w - 2 * inset, h - 2 * inset, w * .056)
  ctx.strokeStyle = '#ecfce275'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.fillStyle = accent
  ctx.font = '36px system-ui'
  ctx.fillText(details.label.toLocaleUpperCase('id'), pad, h * .115, lineWidth)
  ctx.fillStyle = '#fff9e9'
  ctx.font = '112px Georgia'
  const nextLine = drawText(ctx, details.title, pad, h * .228, lineWidth, 114)
  if (details.byline) {
    ctx.fillStyle = '#f2efdf'
    ctx.font = '36px system-ui'
    drawText(ctx, details.byline, pad, nextLine - 31, lineWidth, 46)
  }
  ctx.fillStyle = accent
  ctx.font = '36px system-ui'
  ctx.fillText('#SebelumJadiApi', pad, h * .925, lineWidth)
}

function containFit(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
  alignX = .5,
  alignY = .5,
) {
  const scale = Math.min(boxW / image.naturalWidth, boxH / image.naturalHeight)
  const width = image.naturalWidth * scale
  const height = image.naturalHeight * scale
  ctx.save()
  ctx.shadowColor = 'rgba(0, 0, 0, 0.52)'
  ctx.shadowBlur = 28
  ctx.shadowOffsetY = 14
  ctx.drawImage(image, boxX + (boxW - width) * alignX, boxY + (boxH - height) * alignY, width, height)
  ctx.restore()
}

function drawStandardCard(
  ctx: CanvasRenderingContext2D,
  details: CardDetails,
  format: CardFormat,
  front: HTMLImageElement | undefined,
  w: number,
  h: number,
) {
  const fact = details.design?.type === 'fact' ? details.design : undefined
  const keeper = details.design?.type === 'keeper' ? details.design : undefined
  const accent = details.design?.accent ?? '#d4e2b4'

  if (front) {
    if (fact) {
      const topPad = format === 'story' ? h * .14 : h * .12
      const boxH = format === 'story' ? h * .38 : h * .40
      containFit(ctx, front, w * .08, topPad, w * .84, boxH, .5, .5)
    } else if (keeper) {
      if (format === 'landscape') {
        containFit(ctx, front, w * .48, h * .07, w * .48, h * .86, .85, .5)
      } else {
        containFit(ctx, front, w * .09, h * .14, w * .82, h * .38, .5, .5)
      }
    }
  }

  const shade = ctx.createLinearGradient(0, 0, fact || format === 'story' ? 0 : w * .72, h)
  shade.addColorStop(0, fact ? '#050a0796' : '#050a07ee')
  shade.addColorStop(.32, fact ? '#07100b1a' : '#07100bcb')
  shade.addColorStop(.62, fact ? '#080f0de8' : '#07100b60')
  shade.addColorStop(1, '#060a08f2')
  ctx.fillStyle = shade
  ctx.fillRect(0, 0, w, h)

  const pad = Math.round(w * .075)
  const lineWidth = format === 'landscape' ? Math.round(w * .54) : w - pad * 2
  const inset = pad * .55
  ctx.beginPath()
  ctx.roundRect(inset, inset, w - inset * 2, h - inset * 2, 38)
  ctx.strokeStyle = '#eae5d068'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.fillStyle = accent
  ctx.font = '30px system-ui'
  ctx.fillText(details.label.toLocaleUpperCase('id'), pad, pad + 22, lineWidth)
  if (fact?.annotation) {
    ctx.fillStyle = '#edede5'
    ctx.font = '24px system-ui'
    ctx.fillText(fact.annotation, pad, pad + 59, lineWidth)
  }
  ctx.fillStyle = '#f5efdf'
  ctx.font = `${format === 'landscape' ? 62 : 73}px Georgia`
  const textTop = format === 'landscape' ? 210 : Math.round(h * (fact ? .56 : .49))
  let bodyTop = drawText(ctx, details.title, pad, textTop, lineWidth, format === 'landscape' ? 72 : 80) + 6
  ctx.fillStyle = '#e5e7da'
  ctx.font = `${format === 'landscape' ? 29 : 33}px system-ui`
  if (details.body) bodyTop = drawText(ctx, details.body, pad, bodyTop, lineWidth, format === 'landscape' ? 41 : 46)
  if (details.byline) drawText(ctx, details.byline, pad, bodyTop, lineWidth, 46)
  ctx.fillStyle = '#e7e2cb'
  ctx.font = '26px system-ui'
  if (details.source) ctx.fillText(details.source, pad, h - pad - 49, lineWidth)
  ctx.fillStyle = accent
  ctx.fillText('#SebelumJadiApi', pad, h - pad - 7, lineWidth)
}

export async function makeCard(details: CardDetails, format: CardFormat) {
  const [w, h] = sizes[format]
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas tidak tersedia')
  const { artwork, design } = details
  const frameUrl = design?.type === 'keeper' ? design.frame : undefined
  const frontUrl = artwork?.foreground ?? design?.foreground
  const [background, front, frame] = await Promise.all([
    loadImage(details.image),
    frontUrl ? loadImage(frontUrl) : Promise.resolve(undefined),
    frameUrl ? loadImage(frameUrl) : Promise.resolve(undefined),
  ])
  cover(ctx, background, w, h, design?.type === 'keeper' && format === 'story' ? .65 : .5)
  if (artwork && front) {
    drawPledge(ctx, details, front, artwork.accent, w, h)
  } else {
    drawStandardCard(ctx, details, format, front, w, h)
  }
  if (frame) ctx.drawImage(frame, 0, 0, w, h)
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Kartu gagal dirender')), 'image/png'))
}

export function downloadPng(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${name}.png`
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

