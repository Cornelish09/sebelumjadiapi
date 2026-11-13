import { useState, type CSSProperties } from 'react'
import { whyVisuals } from '../../content/whyItMatters'
import { useForestParallax } from './useForestParallax'
export function WhyIntro(){
 const scene=useForestParallax(),[failed,setFailed]=useState(false)
 return <section className="why-intro" aria-labelledby="why-title">
  <div className="why-intro-scene" ref={scene} style={{backgroundImage:`url("${whyVisuals.fallback}")`} as CSSProperties} aria-hidden="true">
   {!failed&&<img className="why-intro-photo" src={whyVisuals.scene} alt="" fetchPriority="high" onError={()=>setFailed(true)}/>}
   <div className="why-intro-shade"/><img className="why-near-leaves" src={whyVisuals.foreground} alt=""/>
  </div>
  <div className="why-intro-copy"><p className="why-kicker">01 / Jejak Kehidupan</p><p className="why-page-title">Why It Matters</p>
   <h1 id="why-title">Yang terancam<br/>bukan cuma <em>pepohonan.</em></h1>
   <p>Dari tanah yang menyimpan air sampai kehidupan yang berlindung di antara dahan, hutan menyatukan banyak hal yang sering tidak kita lihat.</p>
   <p className="why-intro-last">Ketika kebakaran terjadi, dampaknya tidak berhenti pada pohon yang hangus.</p>
  </div>
 </section>
}
