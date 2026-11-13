import {useEffect,useRef,useState} from 'react'
import {personalStories as stories,personalPhoto as photo,personalSource as source} from '../../content/makeItPersonal'
import './makeItPersonal.css'
export function MakeItPersonal(){
 const [active,setActive]=useState(0),[entered,setEntered]=useState(false)
 const root=useRef<HTMLElement>(null)
 useEffect(()=>{const el=root.current;if(!el)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setEntered(true);observer.disconnect()}},{threshold:.12});observer.observe(el);return()=>observer.disconnect()},[])
 const go=(n:number)=>setActive((n+stories.length)%stories.length)
 return <section ref={root} id="make-it-personal" className={`personal-section ${entered?'has-entered':''}`} aria-labelledby="personal-title"><div className="personal-stage">
 <figure className="personal-photo"><img src={photo.src} alt={photo.alt} aria-describedby="personal-photo-caption" loading="lazy" decoding="async"/></figure><div className="personal-entry" aria-hidden="true"/>
 <div className="personal-content"><header><p>03 / Make It Personal</p><h2 id="personal-title">Bagi sebagian orang,<br/>asap bukan sekadar berita.</h2></header>
 <nav aria-label="Perspektif dampak karhutla">{stories.map((s,i)=><button key={s.label} aria-current={active===i?'step':undefined} onClick={()=>go(i)}>{s.label}</button>)}</nav>
 <div className="personal-narratives" aria-live="polite" aria-atomic="true">{stories.map((s,i)=><article key={s.label} className={active===i?'is-active':''} aria-hidden={active!==i} inert={active!==i}><h3>{s.title}</h3><p>{s.body}</p><a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></article>)}</div>
 <div className="personal-arrows"><button onClick={()=>go(active-1)} aria-label="Perspektif sebelumnya">←</button><span>{active+1} / 3</span><button onClick={()=>go(active+1)} aria-label="Perspektif berikutnya">→</button><a href="#personal-reflection" onClick={e=>{e.preventDefault();document.getElementById('personal-reflection')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}}>Lanjutkan ↓</a></div></div>
 <div className="personal-credits"><p id="personal-photo-caption">{photo.caption}</p><p><a href={photo.sourceUrl} target="_blank" rel="noreferrer">Foto: {photo.author} ↗</a> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a></p></div></div>
 <div id="personal-reflection" className="personal-reflection"><p>Kalau risikonya sudah kita ketahui, apa yang bisa dilakukan sebelum api muncul?</p><a className="personal-lab-link" href="#prevention-lab" onClick={e=>{e.preventDefault();document.getElementById('prevention-lab')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}}>The Prevention Lab ↓</a></div></section>
}
