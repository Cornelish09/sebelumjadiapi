import { useEffect, useRef } from 'react'

// Gerak kecil berbasis pegas, tanpa Canvas/WebGL baru. Seluruh teks berada di HTML.
export function useForestParallax() {
  const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const el=ref.current;if(!el)return
    const media=matchMedia('(prefers-reduced-motion: reduce)')
    let raf=0,last=0,x=0,y=0,tx=0,ty=0,visible=true
    const frame=(now:number)=>{
      raf=0
      if(media.matches||document.hidden||!visible){last=0;return}
      const dt=last?Math.min((now-last)/1000,.05):.016;last=now
      x+=(tx-x)*(1-Math.exp(-dt*3));y+=(ty-y)*(1-Math.exp(-dt*3))
      el.style.setProperty('--forest-x',`${x.toFixed(3)}px`);el.style.setProperty('--forest-y',`${y.toFixed(3)}px`)
      if(Math.abs(tx-x)+Math.abs(ty-y)>.02)raf=requestAnimationFrame(frame)
    }
    const start=()=>{if(!raf)raf=requestAnimationFrame(frame)}
    const move=(e:PointerEvent)=>{if(e.pointerType==='touch')return;const r=el.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*10;ty=((e.clientY-r.top)/r.height-.5)*7;start()}
    const leave=()=>{tx=0;ty=0;start()}
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start()});observer.observe(el)
    const preference=()=>{if(media.matches){el.style.setProperty('--forest-x','0px');el.style.setProperty('--forest-y','0px')}else start()}
    el.addEventListener('pointermove',move,{passive:true});el.addEventListener('pointerleave',leave)
    document.addEventListener('visibilitychange',start);media.addEventListener('change',preference)
    return()=>{cancelAnimationFrame(raf);observer.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',start);media.removeEventListener('change',preference)}
  },[])
  return ref
}
