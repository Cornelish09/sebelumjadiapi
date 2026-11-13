import type { SceneFrame } from '../parallax/ParallaxController'
import { HERO_OVERSCAN } from '../layers/heroProjection'

// Respons dekat pointer naik/turun perlahan; pulsa bergerak di sepanjang spline.
export class EnergyResponse {
  times = new Float32Array(32)
  strengths = new Float32Array(32)
  step(dt: number, frame: SceneFrame, moving: boolean, paths: readonly {samples: readonly (readonly [number,number])[]}[], cover: readonly [number,number], origin: readonly [number,number], aspect: number, time: number) {
    if (!moving) return
    const delta = Math.min(dt,.05)
    const y=(frame.lightY-.5)*cover[1]/HERO_OVERSCAN+origin[1]
    const crown=Math.max(0,Math.min(1,(y-.6)/.35))
    const x=(frame.lightX-.5)*cover[0]/HERO_OVERSCAN+origin[0]+frame.x*cover[0]*.007+Math.sin(time*.32+y*10)*.0003*crown*crown*(3-2*crown)
    const py=y-frame.y*cover[1]*.004
    paths.forEach((path,i)=>{
      let distance=Infinity
      for(let k=0;k<path.samples.length;k+=4) {
        const p=path.samples[k]
        distance=Math.min(distance,Math.hypot((p[0]-x)*HERO_OVERSCAN/cover[0]*aspect,(p[1]-py)*HERO_OVERSCAN/cover[1]))
      }
      const target=Math.exp(-distance*distance/0.015)*frame.presence
      this.strengths[i]+=(target-this.strengths[i])*(1-Math.exp(-2.4*delta))
      this.times[i]+=delta*(1+this.strengths[i]*.42)
    })
  }
}
