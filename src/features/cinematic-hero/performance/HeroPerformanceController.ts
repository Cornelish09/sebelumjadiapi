// Satu kualitas medium. Penyesuaian DPR hanya untuk menjaga perangkat tetap nyaman.
export type QualityPreset = 'balanced'
export class HeroPerformanceController {
  effective: QualityPreset = 'balanced'
  requested: QualityPreset = 'balanced'
  private seconds = 0
  private frameTimes: number[] = []
  private slowWindows = 0
  private windows = 0
  private dprScale = 1
  setPreset(preset: QualityPreset) { this.requested = this.effective = preset }
  budget(width: number) {
    const mobile=width<700
    return {particles:mobile?720:1600,ambient:mobile?14:26,trails:2,glow:.6,
      dpr:Math.max(1,Math.min(1.5,mobile?1.25:2)*this.dprScale)}
  }
  record(dt: number) {
    this.seconds+=dt; this.frameTimes.push(dt*1000)
    if(this.seconds<4)return null
    const sorted=this.frameTimes.sort((a,b)=>a-b),fps=this.frameTimes.length/this.seconds
    const metrics={fps:Math.round(fps),p95Ms:sorted[Math.min(sorted.length-1,Math.floor(sorted.length*.95))],effective:this.effective,changed:false}
    this.windows++;this.slowWindows=fps<45?this.slowWindows+1:0
    if(this.slowWindows>=2 && this.dprScale>.7){this.dprScale-=.15;metrics.changed=true;this.slowWindows=0}
    this.seconds=0;this.frameTimes=[]
    return {...metrics,windows:this.windows}
  }
}
