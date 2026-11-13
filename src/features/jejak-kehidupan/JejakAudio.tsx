import {useEffect,useRef,useState} from 'react'
import {audioEngine} from '../audio/AudioEngine'
import {jejakAudio,jejakPersonalTracks} from '../../content/jejakAudio'
import {createAudioLease} from '../audio/audioLease'
import {jejakChapter} from './jejakChapter'

const personalSources=jejakPersonalTracks.map(track=>track.src)
const personalEncoded=personalSources.map(src=>encodeURI(src))

export function JejakAudio(){
  const [chapter,setChapter]=useState<'why'|'fire'|'personal'>('why')
  const current=useRef(chapter)
  const personalIndex=useRef(0)
  const lease=useRef(createAudioLease(()=>{
    for(const track of [...Object.values(jejakAudio),...jejakPersonalTracks])audioEngine.stopAtmosphere(track.src)
  }))
  useEffect(()=>audioEngine.subscribe(()=>{
    const idx=personalEncoded.indexOf(audioEngine.snapshot().src)
    if(idx!==-1)personalIndex.current=idx
  }),[])
  useEffect(()=>{
    let raf=0
    const update=()=>{raf=0;const personal=document.getElementById('make-it-personal');const fire=document.getElementById('before-the-fire');const next=jejakChapter(fire?.getBoundingClientRect().top??Infinity,personal?.getBoundingClientRect().top??Infinity,innerHeight);if(next!==current.current){current.current=next;setChapter(next)}}
    const scroll=()=>{if(!raf)raf=requestAnimationFrame(update)}
    const observer=new MutationObserver(scroll);observer.observe(document.body,{childList:true,subtree:true})
    window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update()
    return()=>{cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll)}
  },[])
  useEffect(()=>{
    const isPersonal=chapter==='personal'
    const singleTrack=isPersonal?null:jejakAudio[chapter]
    const singleSrc=singleTrack?encodeURI(singleTrack.src):''
    const start=()=>{
      const state=audioEngine.snapshot()
      if(isPersonal){
        if(!personalEncoded.includes(state.src))void audioEngine.playAtmosphereSequence(personalSources,personalIndex.current)
        else if(!state.playing&&!state.loading&&!state.ended)void audioEngine.play()
        return
      }
      if(singleTrack&&state.src!==singleSrc)void audioEngine.playAtmosphere(singleTrack.src,singleTrack.loop)
      else if(!state.playing&&!state.loading&&!state.ended)void audioEngine.play()
    }
    start()
    const visibility=()=>{if(!document.hidden)start()}
    const retry=()=>{const state=audioEngine.snapshot();if(state.error)start()}
    document.addEventListener('visibilitychange',visibility);document.addEventListener('pointerdown',retry);document.addEventListener('keydown',retry)
    return()=>{document.removeEventListener('visibilitychange',visibility);document.removeEventListener('pointerdown',retry);document.removeEventListener('keydown',retry)}
  },[chapter])
  useEffect(()=>lease.current(),[])
  return null
}
