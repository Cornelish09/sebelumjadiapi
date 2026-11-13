import { lazy,Suspense,useEffect,useSyncExternalStore } from 'react'
import { SiteHeader } from '../components/layout/SiteHeader'
import { ImmersiveIntro } from '../features/immersive-intro/ImmersiveIntro'
const JejakKehidupanPage=lazy(()=>import('../features/jejak-kehidupan/JejakKehidupanPage').then(m=>({default:m.JejakKehidupanPage})))
const MeditationsPage=lazy(()=>import('../features/meditations/MeditationsPage').then(m=>({default:m.MeditationsPage})))
import { audioEngine,homeTracks } from '../features/audio/AudioEngine'
import './siteNavigation.css'
export type SiteRoute='home'|'meditations'|'jejak-kehidupan'
const subscribe=(fn:()=>void)=>{window.addEventListener('hashchange',fn);return()=>window.removeEventListener('hashchange',fn)}
const routeSnapshot=():SiteRoute=>window.location.hash.startsWith('#/meditations')?'meditations':window.location.hash.startsWith('#/jejak-kehidupan')?'jejak-kehidupan':'home'
export default function App(){
 const route=useSyncExternalStore(subscribe,routeSnapshot,()=> 'home' as SiteRoute)
 useEffect(()=>{
  if(route!=='home')return
  audioEngine.enterHome()
  const unlock=(event:Event)=>{
   if(event.target instanceof Element && event.target.closest('a'))return
   audioEngine.resumeHome()
  }
  document.addEventListener('pointerdown',unlock)
  document.addEventListener('keydown',unlock)
  return()=>{document.removeEventListener('pointerdown',unlock);document.removeEventListener('keydown',unlock);if(homeTracks.includes(audioEngine.snapshot().src))void audioEngine.stop()}
 },[route])
 useEffect(()=>{document.addEventListener('visibilitychange',audioEngine.suspend);window.addEventListener('pagehide',audioEngine.checkpointHome);return()=>{document.removeEventListener('visibilitychange',audioEngine.suspend);window.removeEventListener('pagehide',audioEngine.checkpointHome);void audioEngine.stop()}},[])
 return <div className="site-shell">
  <a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();document.getElementById('main-content')?.focus()}}>Lewati ke konten utama</a>
  <SiteHeader route={route}/>
  <main id="main-content" tabIndex={-1}>
   <Suspense fallback={<p role="status" style={{minHeight:'100svh',padding:'140px 6vw',color:'#ddd8ca'}}>Memuat halaman…</p>}>{route==='home'?<ImmersiveIntro/>:route==='meditations'?<MeditationsPage/>:<JejakKehidupanPage/>}</Suspense>
  </main>
 </div>
}
