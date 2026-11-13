import {useEffect,useRef,useState} from 'react'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {fireFrame,fireSeekStops} from './fireTimeline'
import type {ForestRenderer} from './createForestRenderer'
import {createAtmosphere} from './createAtmosphere'
import {wildlifePlacement} from './wildlifePlacement'

gsap.registerPlugin(ScrollTrigger)
export function useBeforeFireScene(staticMode:boolean){
  const root=useRef<HTMLElement>(null),stage=useRef<HTMLDivElement>(null),canvas=useRef<HTMLCanvasElement>(null),particles=useRef<HTMLCanvasElement>(null)
  const [active,setActive]=useState(0),[ready,setReady]=useState(false),[compare,setCompare]=useState(false)
  const model=useRef({progress:0,compare:false})
  const seekRef=useRef<(index:number)=>void>(()=>{})
  useEffect(()=>{model.current.compare=compare},[compare])
  useEffect(()=>{
    const section=root.current,view=stage.current,surface=canvas.current,air=particles.current
    if(!section)return
    if(staticMode){
      const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.staticPhase))},{threshold:.45})
      section.querySelectorAll('[data-static-phase]').forEach(el=>observer.observe(el))
      seekRef.current=index=>section.querySelector(`[data-static-phase="${index}"]`)?.scrollIntoView({behavior:'instant'})
      return()=>observer.disconnect()
    }
    if(!view||!surface||!air)return
    let renderer:ForestRenderer|undefined,disposed=false,initializing=false,visible=false,raf=0,last=0,lastScene=0,lastProgress=-1,current=-1
    let rect=view.getBoundingClientRect(),x=.65,y=.5,tx=.65,ty=.5,reveal=0,comparison=0,pointerInside=false,lastPointer=0
    const atmosphere=createAtmosphere(air)
    const fallback=Array.from(view.querySelectorAll<HTMLElement>('[data-fire-fallback]'))
    const fallbackLayers=Array.from(view.querySelectorAll<HTMLElement>('[data-fire-layer]'))
    const wildlife=Array.from(view.querySelectorAll<HTMLImageElement>('[data-fire-wildlife]'))
    const smoke=view.querySelector<HTMLElement>('[data-fire-smoke]')
    const paint=(now:number)=>{
      raf=0
      if(disposed||!visible||document.hidden){last=0;return}
      const dt=last?Math.min((now-last)/1000,.05):.016;last=now
      const damping=1-Math.exp(-dt*5)
      const goal=model.current.compare ? 1 : pointerInside&&now-lastPointer<1400 ? .8 : 0
      const comparisonGoal=model.current.compare?1:0
      x+=(tx-x)*damping;y+=(ty-y)*damping;reveal+=(goal-reveal)*damping;comparison+=(comparisonGoal-comparison)*damping
      const frame=fireFrame(model.current.progress)
      if(frame.beat!==current){current=frame.beat;setActive(current)}
      const moving=Math.abs(lastProgress-frame.p)>.00005||Math.abs(tx-x)+Math.abs(ty-y)>.001||Math.abs(goal-reveal)>.005||Math.abs(comparisonGoal-comparison)>.005
      if(renderer&&(moving||now-lastScene>100)){
        renderer.draw({progress:frame.p,x,y,reveal,time:now/1000,compare:comparison});lastScene=now
      }
      if(!renderer){
        fallback.forEach((layer,i)=>{layer.style.opacity=model.current.compare?(i===0?'1':'0'):i===frame.from?'1':i===frame.to?String(frame.blend):'0'})
        fallbackLayers.forEach(layer=>{const alive=layer.dataset.fireLayer==='alive';layer.style.opacity=String(model.current.compare?(alive?1:0):(alive?1-frame.damage:frame.damage))})
        wildlife.forEach((layer,i)=>{
          const weight=(i===frame.animal.from?1-frame.animal.blend:0)+(i===frame.animal.to?frame.animal.blend:0)
          layer.style.opacity=String(model.current.compare?(i===0?1:0):weight)
        })
      }
      if(smoke)smoke.style.opacity=String(.035+frame.fire*.19+(1-frame.life)*.06)
      atmosphere.draw(frame.p,now/1000);lastProgress=frame.p
      raf=requestAnimationFrame(paint)
    }
    const start=()=>{if(!raf&&visible&&!document.hidden)raf=requestAnimationFrame(paint)}
    const stop=()=>{cancelAnimationFrame(raf);raf=0;last=0}
    const initialize=()=>{
      if(initializing)return;initializing=true
      void import('./createForestRenderer').then(module=>module.createForestRenderer(surface)).then(next=>{
        if(disposed){next.dispose();return}
        renderer=next;renderer.resize();renderer.draw({progress:model.current.progress,x,y,reveal:0,time:performance.now()/1000});setReady(true);start()
      }).catch(()=>{if(!disposed)setReady(false)})
    }
    const near=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)initialize()},{rootMargin:'700px'})
    near.observe(section)
    const inView=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;view.dataset.motion=visible&&!document.hidden?'active':'paused';if(visible){rect=view.getBoundingClientRect();start()}else stop()})
    inView.observe(section)
    const resize=()=>{
      rect=view.getBoundingClientRect();renderer?.resize();atmosphere.resize()
      const positions=wildlifePlacement(rect.width,rect.height,wildlife.map(el=>el.naturalWidth?el.naturalWidth/el.naturalHeight:4/3))
      wildlife.forEach((el,i)=>{const box=positions[i];el.style.left=`${box[0]*100}%`;el.style.bottom=`${box[1]*100}%`;el.style.width=`${box[2]*100}%`;el.style.height=`${box[3]*100}%`;el.style.transform='none'})
      start()
    }
    const size=new ResizeObserver(resize);size.observe(view)
    wildlife.forEach(el=>el.addEventListener('load',resize))
    const move=(event:PointerEvent)=>{
      if(event.pointerType==='touch')return
      const target=event.target as Element
      pointerInside=!target.closest('button,a,.btf-copy')
      lastPointer=performance.now()
      tx=Math.max(.02,Math.min(.98,(event.clientX-rect.left)/rect.width));ty=1-Math.max(.02,Math.min(.98,(event.clientY-rect.top)/rect.height));start()
    }
    const leave=()=>{pointerInside=false;tx=.65;ty=.5}
    const visibility=()=>{view.dataset.motion=visible&&!document.hidden?'active':'paused';if(document.hidden)stop();else start()}
    const lost=(event:Event)=>{event.preventDefault();renderer?.dispose();renderer=undefined;setReady(false);start()}
    const context=gsap.context(()=>{
      const tween=gsap.fromTo(model.current,{progress:0},{progress:1,ease:'none',duration:1,scrollTrigger:{trigger:section,start:'top top',end:()=>`+=${Math.max(innerHeight*5.2,3200)}`,pin:view,pinSpacing:true,scrub:.65,anticipatePin:1,invalidateOnRefresh:true,onToggle:()=>{rect=view.getBoundingClientRect();start()},onRefresh:()=>{rect=view.getBoundingClientRect();resize()}}})
      seekRef.current=index=>{
        const trigger=tween.scrollTrigger
        if(trigger)window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*fireSeekStops[index],behavior:'smooth'})
      }
    },section)
    view.addEventListener('pointermove',move,{passive:true});view.addEventListener('pointerleave',leave)
    surface.addEventListener('webglcontextlost',lost);document.addEventListener('visibilitychange',visibility)
    return()=>{disposed=true;stop();near.disconnect();inView.disconnect();size.disconnect();context.revert();renderer?.dispose();wildlife.forEach(el=>el.removeEventListener('load',resize));view.removeEventListener('pointermove',move);view.removeEventListener('pointerleave',leave);surface.removeEventListener('webglcontextlost',lost);document.removeEventListener('visibilitychange',visibility)}
  },[staticMode])
  return {root,stage,canvas,particles,active,ready,compare,setCompare,seek:(i:number)=>{setCompare(false);seekRef.current(i)}}
}
