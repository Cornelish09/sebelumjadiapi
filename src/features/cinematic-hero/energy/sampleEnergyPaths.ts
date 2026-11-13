import { energyPaths, type ImagePoint } from './energyPaths'

export const PATH_SAMPLES = 128
export const PATH_ROWS = 32

// Catmull–Rom dengan resampling panjang busur: laju tidak meloncat di antar-simpul.
function interpolate(points: readonly ImagePoint[], t: number): ImagePoint {
  const i = Math.min(points.length - 2, Math.floor(t * (points.length - 1)))
  const u = t * (points.length - 1) - i
  const a = points[Math.max(0,i-1)], b = points[i], c = points[i+1], d = points[Math.min(points.length-1,i+2)]
  return [0,1].map(axis => .5 * ((2*b[axis])+(-a[axis]+c[axis])*u+(2*a[axis]-5*b[axis]+4*c[axis]-d[axis])*u*u+(-a[axis]+3*b[axis]-3*c[axis]+d[axis])*u*u*u)) as unknown as ImagePoint
}

export function samplePath(points: readonly ImagePoint[], count = PATH_SAMPLES) {
  const dense = Array.from({length:513},(_,i)=>interpolate(points,i/512))
  const lengths = [0]
  for (let i=1;i<dense.length;i++) lengths.push(lengths[i-1]+Math.hypot((dense[i][0]-dense[i-1][0])*1672/941,dense[i][1]-dense[i-1][1]))
  const length = lengths[lengths.length-1]
  let cursor = 1
  const samples = Array.from({length:count},(_,i): ImagePoint => {
    const target = i/(count-1)*length
    while(cursor<lengths.length-1 && lengths[cursor]<target) cursor++
    const f = (target-lengths[cursor-1])/(lengths[cursor]-lengths[cursor-1] || 1)
    const a=dense[cursor-1], b=dense[cursor]
    return [a[0]+(b[0]-a[0])*f, 1-(a[1]+(b[1]-a[1])*f)]
  })
  return {samples,length}
}

export function buildEnergyPathTexture() {
  const data = new Uint8Array(PATH_SAMPLES*PATH_ROWS*4)
  const paths = energyPaths.map(path=>({...path,...samplePath(path.points)}))
  paths.forEach((path,row)=>path.samples.forEach((point,i)=>{
    const x=Math.round(Math.max(0,Math.min(1,point[0]))*65535), y=Math.round(Math.max(0,Math.min(1,point[1]))*65535)
    data.set([x>>8,x&255,y>>8,y&255],(row*PATH_SAMPLES+i)*4)
  }))
  return {data,paths}
}
