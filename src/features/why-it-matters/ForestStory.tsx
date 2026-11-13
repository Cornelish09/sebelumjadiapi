import {useRef, useState} from 'react'
import {animalStoryImage, forestStory} from '../../content/forestStory'
import {whyVisuals} from '../../content/whyItMatters'
import {SourceLink} from './SourceLink'
import {useForestStory} from './useForestStory'
import './forestStory.css'

export function ForestStory() {
  const {root, stage, active, go, staticMode} = useForestStory()
  const [detail, setDetail] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const onStageMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stage.current
    if (!el || staticMode) return
    const rect = el.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2
    const py = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2
    el.style.setProperty('--story-px', px.toFixed(3))
    el.style.setProperty('--story-py', py.toFixed(3))
  }
  const onStageLeave = () => {
    const el = stage.current
    if (!el) return
    el.style.setProperty('--story-px', '0')
    el.style.setProperty('--story-py', '0')
  }
  return <section className="forest-story" id="forest-story" ref={root} tabIndex={-1} aria-label="Empat cerita tentang dampak kebakaran hutan">
    <div className="forest-story-stage" ref={stage} onPointerMove={onStageMove} onPointerLeave={onStageLeave}>
      <div className="forest-story-images" aria-hidden="true">
        {forestStory.map((item,i)=><div data-story-layer key={item.label} className={`forest-story-image forest-story-theme-${item.theme}`} style={{visibility:i===0?'visible':'hidden'}}>
          <img className="forest-story-back" src={item.image} alt="" decoding="async" loading="eager" onError={e=>{if(!e.currentTarget.src.endsWith(whyVisuals.fallback))e.currentTarget.src=whyVisuals.fallback}}/>
          <img className="forest-story-mid" src={item.midImage} alt="" decoding="async" loading="eager"/>
          <div className={`forest-story-fx forest-story-fx-${item.theme}`}>
            <span className="forest-story-fx-a"/>
            <span className="forest-story-fx-b"/>
            <span className="forest-story-fx-c"/>
          </div>
          {i===1&&<img className="forest-story-animal" data-animal-bridge src={animalStoryImage} alt="" aria-hidden="true" decoding="async"/>}
          <img className="forest-story-front" src={item.frontImage} alt="" decoding="async" loading="eager"/>
        </div>)}
      </div>
      <div className="forest-story-shade" aria-hidden="true"/>
      <div className="forest-story-top"><span>Why It Matters</span></div>
      {forestStory.map((item,i)=><div id={`forest-story-${i}`} className={`forest-story-copy ${active===i?'is-current':''}`} key={item.label}>
        {staticMode&&<img className="forest-story-static-image" src={item.image} alt="" aria-hidden="true" loading="lazy"/>}
        {staticMode&&i===1&&<img className="forest-story-static-animal" src={animalStoryImage} alt="" aria-hidden="true"/>}
        <div className="forest-story-reading" aria-hidden={!staticMode&&active!==i||undefined} inert={!staticMode&&active!==i||undefined}>
          <p className="forest-story-label"><span>0{i+1}</span> {item.label}</p>
          <h2>{item.title}</h2><p className="forest-story-body">{item.text}</p>
          {i===3&&<p className="forest-story-soil-label">Gambut · lapisan bahan organik penyimpan karbon</p>}
          <div className="forest-story-links"><SourceLink id={item.source}/><button className="forest-story-hotspot" onClick={()=>{setDetail(i);dialog.current?.showModal()}}>Lihat lebih dekat <span aria-hidden="true">↗</span></button></div>
        </div>
      </div>)}
      <nav className="forest-story-navigation" aria-label="Tahap cerita"><div className="forest-story-track"><div className="forest-story-progress"/>{forestStory.map((item,i)=><button key={item.label} aria-label={`Ke cerita ${i+1}: ${item.label}`} aria-current={!staticMode&&active===i?'step':undefined} onClick={()=>go(i)}><span>0{i+1}</span><span>{item.label}</span></button>)}</div></nav>
    </div>
    <dialog className="forest-context-dialog" aria-labelledby="forest-context-title" ref={dialog} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}>
      <button className="forest-context-close" onClick={()=>dialog.current?.close()} aria-label="Tutup penjelasan">×</button>
      <h2 id="forest-context-title">{forestStory[detail].label}</h2><p>{forestStory[detail].detail}</p><SourceLink id={forestStory[detail].detailSource}/>
    </dialog>
  </section>
}
