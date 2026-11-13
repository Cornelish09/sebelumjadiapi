import {useRef,useState} from 'react'
import {forestConnections} from '../../content/whyItMatters'
import {SourceLink} from './SourceLink'
const impactOrder=[1,2,0,3]
export function ImpactEditorial(){
 const [selected,setSelected]=useState(0),[failures,setFailures]=useState<string[]>([])
 const tabs=useRef<HTMLDivElement>(null)
 const impact=forestConnections[impactOrder[selected]]
 const choose=(index:number)=>{setSelected(index);tabs.current?.querySelectorAll<HTMLButtonElement>('[role=tab]')[index]?.focus()}
 return <section className="why-impact why-section" aria-labelledby="impact-title">
  <div className="why-section-heading"><p className="why-kicker">Ketika keterhubungan itu terganggu</p><h2 id="impact-title">Ketika hutan terbakar,<br/>apa yang ikut hilang?</h2></div>
  <div className="why-impact-tabs" role="tablist" aria-label="Dimensi dampak" ref={tabs} onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();choose((selected+(e.key==='ArrowRight'?1:3))%4)}else if(e.key==='Home'){e.preventDefault();choose(0)}else if(e.key==='End'){e.preventDefault();choose(3)}}}>
   {impactOrder.map((index,i)=><button role="tab" id={`impact-tab-${i}`} aria-selected={selected===i} tabIndex={selected===i?0:-1} aria-controls="impact-panel" key={index} onClick={()=>setSelected(i)}><span>0{i+1}</span>{forestConnections[index].impactLabel}</button>)}
  </div>
  <div id="impact-panel" role="tabpanel" aria-labelledby={`impact-tab-${selected}`} tabIndex={0} className="why-impact-panel">
   <figure className="why-impact-photo">{impactOrder.map((index,i)=>{const item=forestConnections[index];return <div key={index} className={selected===i?'is-active':''} style={{backgroundImage:'url("/assets/images/meditations/peace-bg.webp")'}}>{!failures.includes(item.id)&&<img src={item.image} style={{objectPosition:item.imagePosition}} alt="" loading="lazy" onError={()=>setFailures(prev=>prev.includes(item.id)?prev:[...prev,item.id])}/>}</div>})}<figcaption>Interpretasi artistik · bukan foto kejadian karhutla</figcaption></figure>
   <div className="why-impact-copy" key={impact.id}><p className="why-kicker">{impact.impactLabel}</p><h3>{impact.impactTitle}</h3><p>{impact.impactBody}</p><SourceLink id={impact.id==='ecosystem'?'habitat':impact.sourceId}/><span className="why-impact-counter">0{selected+1} <span>/ 04</span></span></div>
  </div>
 </section>
}
