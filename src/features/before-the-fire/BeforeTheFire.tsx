import {useSyncExternalStore} from 'react'
import {beforeFireAssets as assets,beforeFireBeats as beats,beforeFireSources as sources} from '../../content/beforeTheFire'
import {useBeforeFireScene} from './useBeforeFireScene'
import {PeatlandExplainer} from './PeatlandExplainer'
import './beforeTheFire.css'
const query='(prefers-reduced-motion: reduce), (max-height: 620px), (max-width: 700px) and (max-height: 760px)'
const subscribe=(fn:()=>void)=>{const media=matchMedia(query);media.addEventListener('change',fn);return()=>media.removeEventListener('change',fn)}
function Source({index}:{index:number}){const source=sources[beats[index].source];return <a className="btf-source" href={source.url} target="_blank" rel="noreferrer">{source.name} · Baca sumber <span aria-hidden="true">↗</span><span className="sr-only"> (tab baru)</span></a>}
function PhaseNavigation({active,seek}:{active:number;seek:(index:number)=>void}){return <nav className="btf-phase-nav" aria-label="Fase Before the Fire">{beats.map((beat,i)=><button onClick={()=>seek(i)} key={beat.label} aria-label={`Fase ${i+1}: ${beat.label}`} aria-current={active===i?'step':undefined}><span aria-hidden="true">0{i+1}</span>{beat.label}</button>)}</nav>}
function FireSequence({staticMode}:{staticMode:boolean}){
 const {root,stage,canvas,particles,active,ready,compare,setCompare,seek}=useBeforeFireScene(staticMode)
 return <section id="before-the-fire" className={`btf-section ${staticMode?'btf-static':''}`} ref={root} aria-labelledby="btf-title">
 {!staticMode?<div className="btf-stage" ref={stage} data-motion="paused" data-renderer={ready?'webgl':'css-fallback'}>
 <div className={`btf-fallback ${ready?'is-replaced':''}`} aria-hidden="true">
 {assets.scenes.map((src,i)=><img key={src} src={src} alt="" data-fire-fallback style={{opacity:i===0?1:0}} loading="lazy"/>)}
 <img className="btf-fallback-tree" src={assets.treeAlive} data-fire-layer="alive" alt="" loading="lazy"/>
 <img className="btf-fallback-tree" src={assets.treeAsh} data-fire-layer="ash" alt="" style={{opacity:0}} loading="lazy"/>
 {assets.wildlife.map((src,i)=><img key={src} className="btf-ground-animal" src={src} data-fire-wildlife={i} alt="" style={{opacity:i===0?1:0}} loading="lazy"/>)}
 <img src={assets.foregroundAlive} data-fire-layer="alive" alt="" loading="lazy"/><img src={assets.foregroundAsh} data-fire-layer="ash" alt="" style={{opacity:0}} loading="lazy"/>
 </div><canvas className={`btf-world ${ready?'is-ready':''}`} ref={canvas} aria-hidden="true"/><div className="btf-smoke" data-fire-smoke aria-hidden="true"><div/><div/></div><canvas className="btf-particles" ref={particles} aria-hidden="true"/><div className="btf-shade" aria-hidden="true"/>
 <header className="btf-scene-header"><div><span className="btf-chapter">02 / Jejak Kehidupan</span><h2 id="btf-title">Before the Fire</h2></div><span className="btf-scenario">Skenario ilustratif</span></header><PhaseNavigation active={active} seek={seek}/>
 {beats.map((beat,i)=><div className={`btf-copy ${active===i?'is-active':''}`} key={beat.label} aria-hidden={active!==i} inert={active!==i}><p className="btf-beat-label">0{i+1} <span>{beat.label}</span></p><h3>{beat.title}</h3><p className="btf-body">{beat.body}</p><Source index={i}/></div>)}
 <div className="btf-controls">{active>0&&<button className="btf-compare" onClick={()=>setCompare(!compare)} aria-pressed={compare}>{compare?'Kembali ke kondisi kini':'Lihat kondisi awal'} <span aria-hidden="true">↗</span></button>}<PeatlandExplainer/></div>
 </div>:<div className="btf-static-sequence"><header className="btf-static-header"><p>02 / Jejak Kehidupan</p><h2 id="btf-title">Before the Fire</h2><span>Skenario ilustratif</span><PhaseNavigation active={active} seek={seek}/><PeatlandExplainer/></header>
 {beats.map((beat,i)=><article className="btf-static-beat" key={beat.label} data-static-phase={i}><img src={assets.scenes[[0,1,1,2,3][i]]} alt="" loading="lazy"/><img className={`btf-static-animal ${i===4?'btf-animal-loss':''}`} src={assets.wildlife[i]} alt="" loading="lazy"/><div><p className="btf-beat-label">0{i+1} · {beat.label}</p><h3>{beat.title}</h3><p>{beat.body}</p><Source index={i}/></div></article>)}
 </div>}
 <div className="btf-afterword"><p className="btf-afterword-label">Sebelum jadi api.</p><h3>Menjaga airnya.<br/>Menghindari nyalanya.</h3><p>Perlindungan gambut mencakup pembasahan kembali dan pencegahan degradasi. Membuka lahan dengan api dapat memicu kebakaran yang meluas.</p><div><a className="btf-source" href={sources.water.url} target="_blank" rel="noreferrer">FAO · Perlindungan gambut ↗</a><button onClick={()=>seek(0)}>Kembali ke hutan yang hidup <span aria-hidden="true">↑</span></button><a className="btf-source" href="#make-it-personal" onClick={e=>{e.preventDefault();document.getElementById('make-it-personal')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}}>Make It Personal ↓</a></div></div>
 </section>
}
export default function BeforeTheFire(){const staticMode=useSyncExternalStore(subscribe,()=>matchMedia(query).matches,()=>false);return <FireSequence key={staticMode?'static':'animated'} staticMode={staticMode}/>}
