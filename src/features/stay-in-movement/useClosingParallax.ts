import {useEffect,useRef} from 'react'
// Parallax dibatasi beberapa piksel, tanpa loop diam atau render ketika offscreen.
export function useClosingParallax(){
 const root=useRef<HTMLElement>(null)
 useEffect(()=>{
  const el=root.current;if(!el)return
  const media=matchMedia('(prefers-reduced-motion: reduce)')
  let visible=false,raf=0,last=0,x=0,y=0,tx=0,ty=0
  const paint=(now:number)=>{raf=0;if(!visible||document.hidden||media.matches)return;const dt=last?Math.min((now-last)/1000,.05):.016;last=now;const damping=1-Math.exp(-dt*4);x+=(tx-x)*damping;y+=(ty-y)*damping;el.style.setProperty('--depth-x',String(x));el.style.setProperty('--depth-y',String(y));if(Math.abs(tx-x)+Math.abs(ty-y)>.01)raf=requestAnimationFrame(paint);else last=0}
  const start=()=>{if(!raf&&visible&&!document.hidden&&!media.matches)raf=requestAnimationFrame(paint)}
  const move=(event:PointerEvent)=>{if(event.pointerType==='touch')return;const r=el.getBoundingClientRect();tx=(event.clientX-r.left)/r.width*2-1;ty=(event.clientY-r.top)/r.height*2-1;start()}
  const leave=()=>{tx=0;ty=0;start()}
  const update=()=>{cancelAnimationFrame(raf);raf=0;last=0;if(media.matches){x=0;y=0;el.style.removeProperty('--depth-x');el.style.removeProperty('--depth-y')}else start()}
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});observer.observe(el)
  el.addEventListener('pointermove',move,{passive:true});el.addEventListener('pointerleave',leave);document.addEventListener('visibilitychange',update);media.addEventListener('change',update)
  return()=>{cancelAnimationFrame(raf);observer.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',update);media.removeEventListener('change',update)}
 },[])
 return root
}
