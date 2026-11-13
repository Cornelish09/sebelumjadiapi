import {fireFrame} from './fireTimeline'

// Satu Canvas 2D kecil, partikel dibatasi dan digambar tanpa shadowBlur.
export function createAtmosphere(canvas:HTMLCanvasElement){
  const context=canvas.getContext('2d');if(!context)return {draw:()=>{},resize:()=>{}}
  let width=1,height=1,last=0,elapsed=0
  const count=(navigator.hardwareConcurrency||8)<=4?24:50
  const particles=Array.from({length:count},(_,i)=>({x:((i*73)%101)/101,y:((i*41)%97)/97,depth:.3+(i%7)/10,size:.6+(i%4)*.3}))
  const resize=()=>{width=canvas.clientWidth;height=canvas.clientHeight;const ratio=Math.min(devicePixelRatio||1,1.2);canvas.width=width*ratio;canvas.height=height*ratio;context.setTransform(ratio,0,0,ratio,0,0)}
  const draw=(progress:number,time:number)=>{
    const dt=last?Math.max(0,Math.min(time-last,.05)):1/60;last=time;elapsed+=dt
    const state=fireFrame(progress);context.clearRect(0,0,width,height)
    for(const [i,p] of particles.entries()){
      const speed=.004*(1-state.fire)-.016*state.fire
      p.y=(p.y+dt*speed*p.depth+1)%1
      const x=(p.x+Math.sin(elapsed*.15+i)*.018*p.depth+1)%1
      const y=p.y
      const alpha=(state.life*.18+state.fire*.55+state.ash*.12)*p.depth
      const color=[212,214,166].map((base,k)=>Math.round((base+([229,148,73][k]-base)*state.fire)*(1-state.ash)+[177,176,162][k]*state.ash))
      context.fillStyle=`rgba(${color.join(',')},${alpha})`
      context.beginPath();context.arc(x*width,y*height,p.size*p.depth,0,Math.PI*2);context.fill()
    }
  }
  resize();return {draw,resize}
}
