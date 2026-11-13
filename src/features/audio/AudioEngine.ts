export interface AudioState { playing:boolean; loading:boolean; error:string; duration:number; current:number; src:string; homeIndex:number; hasStarted:boolean; ended:boolean; volume:number; seekVersion:number }
export const homeTracks=[
  'Motunui Forest - Island Pulse 1.mp3',
  ...Array.from({length:4},(_,i)=>`Landing page ${i+1}.mp3`),
  'Motunui Forest - Island Pulse 2.mp3',
].map(name=>encodeURI(`/assets/audio/forest/${name}`))
const HOME_SESSION_KEY='sebelumjadiapi-home-audio-v1' 

// Satu elemen audio untuk seluruh situs; pergantian halaman tidak membuat player baru.
export class AudioEngine {
  private audio=new Audio()
  private listeners=new Set<()=>void>()
  private revision=0
  private playlist=false
  private homeEnabled=false
  private homePosition=0
  private homeBag:number[]=[]
  private pendingStart=0
  private gain=.24
  private atmosphere=false
  private atmosphereGain=1
  private atmospherePositions=new Map<string,number>()
  private atmosphereSource=''
  private atmosphereSequence:string[]=[]
  private rememberAtmosphere(){if(this.atmosphere&&this.state.src===this.atmosphereSource)this.atmospherePositions.set(this.state.src,this.audio.currentTime)}
  // Level Home berlaku untuk seluruh track, terpisah dari volume Meditations.
  private readonly homeGain=.65
  private fading=false
  private state:AudioState={playing:false,loading:false,error:'',duration:0,current:0,src:'',homeIndex:0,hasStarted:false,ended:false,volume:.24,seekVersion:0}
  private handlers: [string,EventListener][]=[]
  constructor() {
    this.audio.preload='metadata'
    try {
      const saved=JSON.parse(sessionStorage.getItem(HOME_SESSION_KEY)||'null')
      if(saved && Number.isInteger(saved.index) && saved.index>=0 && saved.index<homeTracks.length && Number.isFinite(saved.time) && saved.time>=0){
        this.state={...this.state,homeIndex:saved.index};this.homePosition=saved.time
        if(Array.isArray(saved.bag))this.homeBag=[...new Set<number>(saved.bag.filter((i:unknown)=>typeof i==='number'&&Number.isInteger(i)&&i>0&&i<homeTracks.length-1))]
      }
    }catch{/* Penyimpanan sesi bisa diblokir browser; posisi tetap tersimpan di memori. */}
    const on=(name:string,fn:()=>void)=>{this.audio.addEventListener(name,fn);this.handlers.push([name,fn])}
    on('loadedmetadata',()=>{
      if(this.pendingStart>0 && Number.isFinite(this.audio.duration))this.audio.currentTime=Math.min(this.pendingStart,Math.max(0,this.audio.duration-.01))
      this.pendingStart=0
      this.emit({duration:Number.isFinite(this.audio.duration)?this.audio.duration:0,current:this.audio.currentTime,loading:false})
    })
    on('timeupdate',()=>{this.updateGain();this.emit({current:this.audio.currentTime});this.rememberHome()})
    on('playing',()=>{if(!this.audio.paused)this.emit({playing:true,hasStarted:true,ended:false,loading:false,error:''})})
    on('pause',()=>this.emit({playing:false}))
    on('waiting',()=>this.emit({loading:true}))
    on('canplay',()=>this.emit({loading:false}))
    on('seeked',()=>this.emit({current:this.audio.currentTime,ended:false}))
    on('error',()=>this.emit({playing:false,loading:false,error:'Audio tidak dapat dimuat. Coba putar kembali.'}))
    on('ended',()=>{
      if(this.playlist && this.homeEnabled && homeTracks.includes(this.state.src)) {const next=this.nextHomeTrack();this.homePosition=0;this.emit({homeIndex:next});this.saveHomeSession();void this.select(homeTracks[next],true)}
      else if(this.atmosphere && this.atmosphereSequence.length>0 && this.atmosphereSequence.includes(this.state.src)) {
        const currentIndex=this.atmosphereSequence.indexOf(this.state.src)
        const nextSrc=this.atmosphereSequence[(currentIndex+1)%this.atmosphereSequence.length]
        this.atmospherePositions.set(this.state.src,0)
        this.atmosphereSource=nextSrc
        void this.select(nextSrc,true,0,false,true)
      }
      else this.emit({playing:false,ended:true,current:this.audio.duration||0})
    })
  }
  private nextHomeTrack(){
    // Hai bản Motunui mở đầu phiên; sau đó chỉ xáo bốn track Landing.
    if(this.state.homeIndex===0)return homeTracks.length-1
    if(!this.homeBag.length){
      this.homeBag=Array.from({length:homeTracks.length-2},(_,i)=>i+1)
      for(let i=this.homeBag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[this.homeBag[i],this.homeBag[j]]=[this.homeBag[j],this.homeBag[i]]}
      if(this.homeBag[0]===this.state.homeIndex)[this.homeBag[0],this.homeBag[1]]=[this.homeBag[1],this.homeBag[0]]
    }
    return this.homeBag.shift()!
  }
  private saveHomeSession(){try{sessionStorage.setItem(HOME_SESSION_KEY,JSON.stringify({index:this.state.homeIndex,time:this.homePosition,bag:this.homeBag}))}catch{/* Fallback memori untuk sesi ini. */}}
  private rememberHome(){if(this.playlist&&homeTracks.includes(this.state.src)){this.homePosition=this.audio.currentTime;this.saveHomeSession()}}
  private emit(next:Partial<AudioState>) {this.state={...this.state,...next};this.listeners.forEach(fn=>fn())}
  subscribe=(fn:()=>void)=>{this.listeners.add(fn);return()=>{this.listeners.delete(fn)}}
  snapshot=()=>this.state
  currentTime=()=>this.audio.currentTime
  checkpointHome=()=>this.rememberHome()
  private updateGain() {
    if(this.fading)return
    const time=this.audio.currentTime,d=this.audio.duration
    const edge=(this.playlist||this.atmosphereSequence.length>1)&&Number.isFinite(d)?Math.min(1,time/1.8,Math.max(0,(d-time)/1.8)):Math.min(1,time/1.2)
    const gain=this.playlist ? this.homeGain : this.atmosphere ? .27*this.atmosphereGain : this.gain
    this.audio.volume=Math.max(0,Math.min(gain,gain*edge))
  }
  private async fadeOut(token:number) {
    this.fading=true
    const start=performance.now(),volume=this.audio.volume
    await new Promise<void>(resolve=>{
      const step=(now:number)=>{
        if(token!==this.revision){resolve();return}
        const progress=Math.min(1,(now-start)/220)
        this.audio.volume=volume*(1-progress)
        if(progress<1)requestAnimationFrame(step);else resolve()
      };requestAnimationFrame(step)
    })
  }
  private async select(src:string,autoplay:boolean,resumeAt=0,loop=false,fromGesture=false) {
    const token=++this.revision
    if(!this.audio.paused&&!fromGesture) await this.fadeOut(token)
    if(token!==this.revision)return
    this.rememberAtmosphere()
    this.audio.pause();this.pendingStart=resumeAt;this.audio.loop=loop;this.audio.src=src;this.audio.load();this.audio.volume=0
    this.fading=false
    this.emit({src,current:0,duration:0,error:'',loading:true,playing:false,hasStarted:false,ended:false})
    if(autoplay)await this.play()
  }
  enterHome(){this.atmosphere=false;this.atmosphereSequence=[];this.homeEnabled=true;this.playlist=true;void this.select(homeTracks[this.state.homeIndex],this.homeEnabled,this.homePosition)}
  resumeHome(){if(this.playlist&&homeTracks.includes(this.state.src)&&this.audio.paused&&!document.hidden)void this.play()}
  selectEpisode(src:string){this.rememberHome();this.atmosphere=false;this.atmosphereSequence=[];this.playlist=false;void this.select(encodeURI(src),false)}
  playAtmosphere(src:string,loop=true,fromGesture=false){this.rememberHome();this.rememberAtmosphere();this.atmosphere=true;this.atmosphereGain=1;this.atmosphereSequence=[];this.playlist=false;const encoded=encodeURI(src);this.atmosphereSource=encoded;return this.select(encoded,true,this.atmospherePositions.get(encoded)||0,loop,fromGesture)}
  playAtmosphereSequence(srcs:readonly string[],startIndex=0,fromGesture=false){const list=srcs.map(s=>encodeURI(s));if(!list.length)return Promise.resolve();this.rememberHome();this.rememberAtmosphere();this.atmosphere=true;this.atmosphereGain=1;this.playlist=false;this.atmosphereSequence=list;const encoded=list[((startIndex%list.length)+list.length)%list.length];this.atmosphereSource=encoded;return this.select(encoded,true,this.atmospherePositions.get(encoded)||0,false,fromGesture)}
  atmosphereIntensity(src:string,value:number){if(this.atmosphere&&this.state.src===encodeURI(src)){this.atmosphereGain=Math.max(0,Math.min(1,value));this.updateGain()}}
  stopAtmosphere(src:string){if(this.atmosphere&&this.state.src===encodeURI(src)){this.rememberAtmosphere();this.atmosphere=false;this.atmosphereSequence=[];void this.stop()}}
  async play() {
    const token=++this.revision
    this.fading=false
    this.emit({error:''})
    try{if(this.state.ended)this.seek(0);this.updateGain();if(this.atmosphere)this.audio.volume=0;await this.audio.play();if(this.atmosphere&&token===this.revision){this.fading=true;const start=performance.now();const ramp=(now:number)=>{if(token!==this.revision)return;const p=Math.min(1,(now-start)/900);this.audio.volume=.27*this.atmosphereGain*p;if(p<1)requestAnimationFrame(ramp);else this.fading=false};requestAnimationFrame(ramp)}}catch{if(token===this.revision)this.emit({playing:false,loading:false,error:'Pemutaran belum diizinkan. Interaksi di halaman akan mencoba kembali.'})}
  }
  pause(){this.rememberHome();this.revision++;this.fading=false;this.audio.pause()}
  async toggleHome(){this.homeEnabled=!this.homeEnabled;if(this.homeEnabled){if(!this.playlist)this.enterHome();else await this.play()}else await this.stop(false)}
  async stop(clearPlaylist=true){this.rememberHome();const token=++this.revision;if(clearPlaylist)this.playlist=false;await this.fadeOut(token);if(token===this.revision){this.audio.pause();this.fading=false;this.emit({loading:false})}}
  seek(time:number){if(Number.isFinite(time)&&Number.isFinite(this.audio.duration)){this.audio.currentTime=Math.max(0,Math.min(time,this.audio.duration));this.emit({current:this.audio.currentTime,ended:false,seekVersion:this.state.seekVersion+1})}}
  volume(value:number){if(!Number.isFinite(value))return;this.gain=Math.max(0,Math.min(.7,value));this.updateGain();this.emit({volume:this.gain})}
  suspend=()=>{
    if(document.hidden){
      if(!isBackgroundExempt(this.state.src)){
        this.pause()
        this.emit({playing:false,loading:false})
      }
    }else{
      this.resumeHome()
    }
  }
  dispose(){this.rememberHome();this.revision++;this.audio.pause();this.audio.removeAttribute('src');this.audio.load();this.handlers.forEach(([name,fn])=>this.audio.removeEventListener(name,fn));this.listeners.clear()}
}
function isBackgroundExempt(src: string): boolean {
  if (!src) return false
  try {
    const decoded = decodeURI(src)
    return (
      decoded.includes('/assets/audio/forest/') ||
      decoded.includes('/assets/audio/jejak kehidupan/') ||
      decoded.includes('/assets/audio/before-the-fire/')
    )
  } catch {
    return (
      src.includes('/assets/audio/forest/') ||
      src.includes('/assets/audio/jejak%20kehidupan/') ||
      src.includes('/assets/audio/jejak kehidupan/') ||
      src.includes('/assets/audio/before-the-fire/')
    )
  }
}

export const audioEngine=new AudioEngine()
if(import.meta.hot)import.meta.hot.dispose(()=>audioEngine.dispose())

