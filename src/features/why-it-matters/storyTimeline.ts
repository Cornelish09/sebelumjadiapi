// Perhitungan murni: waktu narasi dan visibilitas objek selalu cocok dengan tahapnya.
export const unit = (value:number) => Math.max(0, Math.min(1, value))
const smooth = (value:number) => {const t=unit(value); return t*t*(3-2*t)}
export function storyFrame(progress:number) {
  const p = unit(progress)*3
  const base = Math.min(2, Math.floor(p))
  const blend = smooth((p-base-.65)/.35)
  const active = Math.min(3, Math.floor(p+.12))
  // Orangutan hanya pada tahap 02, dengan masuk/keluar pendek di dalam tahap itu.
  const animal = active===1 ? smooth((p-.88)/.12)*(1-smooth((p-1.72)/.16)) : 0
  return {p, base, blend, active, animal}
}
