/**
 * Menghasilkan poligon 16 titik konsisten agar CSS clip-path bertransisi mulus
 * dari posisi hotspot (cx%, cy%) menjadi bukaan penuh kanvas 2.5D.
 */
const VERTICES = 16

const formatPoints = (points: Array<[number, number]>) =>
  `polygon(${points.map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(', ')})`

export function hotspotSeedClip(cx: number, cy: number, radius = 1.8): string {
  const pts: Array<[number, number]> = []
  for (let i = 0; i < VERTICES; i++) {
    const angle = (Math.PI * 2 * i) / VERTICES
    const wobble = 1 + 0.16 * Math.sin(angle * 3 + cx * 0.1)
    pts.push([cx + Math.cos(angle) * radius * wobble, cy + Math.sin(angle) * radius * wobble])
  }
  return formatPoints(pts)
}

export function openMorphClip(cx: number, cy: number, variant = 0): string {
  const pts: Array<[number, number]> = []
  for (let i = 0; i < VERTICES; i++) {
    const angle = (Math.PI * 2 * i) / VERTICES
    // Jari-jari besar >130% memastikan seluruh kanvas 16:9 tertutup rapat tanpa celah
    const organic = 148 + 14 * Math.cos(angle * 2 + variant * 1.1)
    const x = Math.max(-24, Math.min(124, cx + Math.cos(angle) * organic))
    const y = Math.max(-24, Math.min(124, cy + Math.sin(angle) * organic))
    pts.push([x, y])
  }
  return formatPoints(pts)
}
