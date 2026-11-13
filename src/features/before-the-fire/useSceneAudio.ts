import {useEffect,useRef,useSyncExternalStore} from 'react'
import gsap from 'gsap'
import {audioEngine} from '../audio/AudioEngine'
import {beforeFireAssets} from '../../content/beforeTheFire'

const source=encodeURI(beforeFireAssets.music)
// Musik mengikuti visibilitas section. Jika autoplay ditolak, interaksi di section mencoba lagi.
export function useSceneAudio(root:React.RefObject<HTMLElement|null>,active:number){
  const visible=useRef(false),level=useRef({gain:.7})
  const playing=useSyncExternalStore(audioEngine.subscribe,()=>audioEngine.snapshot().src===source&&audioEngine.snapshot().playing,()=>false)
  useEffect(()=>{
    const el=root.current;if(!el)return
    const start=()=>{
      if(!visible.current)return
      const state=audioEngine.snapshot()
      if(state.src!==source)void audioEngine.playAtmosphere(source)
      else if(!state.playing&&!state.loading)void audioEngine.play()
    }
    const update=()=>{if(!visible.current){if(audioEngine.snapshot().src===source)audioEngine.pause()}else start()}
    const interact=(event:Event)=>{if(event.target instanceof Element&&event.target.closest('a'))return;start()}
    const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;update()},{threshold:.08})
    observer.observe(el);document.addEventListener('visibilitychange',update)
    el.addEventListener('pointerdown',interact,{passive:true});el.addEventListener('keydown',interact)
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);el.removeEventListener('pointerdown',interact);el.removeEventListener('keydown',interact);audioEngine.stopAtmosphere(source)}
  },[root])
  useEffect(()=>{
    if(!playing)return
    const tween=gsap.to(level.current,{gain:[.7,.53,.56,.9,.06][active]??.6,duration:active===4?2.2:.9,ease:'power1.inOut',onUpdate:()=>audioEngine.atmosphereIntensity(source,level.current.gain)})
    return()=>{tween.kill()}
  },[active,playing])
}
