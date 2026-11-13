import {useEffect,useRef,useState} from 'react'
import gsap from 'gsap'
import {beforeFireSources} from '../../content/beforeTheFire'

const conditions=['Basah','Mengering','Kering']
export function PeatlandExplainer(){
  const dialog=useRef<HTMLDialogElement>(null),water=useRef<SVGGElement>(null)
  const shift=useRef<((value:number)=>void)|null>(null)
  const [level,setLevel]=useState(0)
  useEffect(()=>{
    if(!water.current)return
    const tween=gsap.quickTo(water.current,'y',{duration:.6,ease:'power2.out'})
    shift.current=value=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)gsap.set(water.current,{y:value});else tween(value)}
    return()=>{tween.tween.kill();shift.current=null}
  },[])
  return <><button className="btf-peat-button" onClick={()=>dialog.current?.showModal()}>Di bawah permukaan <span aria-hidden="true">↗</span></button>
    <dialog className="btf-peat-dialog" aria-labelledby="btf-peat-title" ref={dialog}>
      <button className="btf-peat-close" onClick={()=>dialog.current?.close()} aria-label="Tutup penampang gambut">×</button>
      <div className="btf-peat-layout"><div><p className="btf-beat-label">Ilustrasi kondisi gambut</p><h3 id="btf-peat-title">Air yang hilang.<br/>Risiko yang bertambah.</h3><p>Gambut menyimpan sisa tumbuhan yang belum terurai sepenuhnya. Drainase mengurangi air, sehingga bahan organiknya lebih mudah terbakar.</p><p>Kering meningkatkan kerentanan. Kebakaran tetap memerlukan sumber penyalaan.</p><a className="btf-source" href={beforeFireSources.risk.url} target="_blank" rel="noreferrer">UNEP · Baca sumber ↗</a></div>
      <div><svg viewBox="0 0 900 530" role="img" aria-label={`Penampang gambut dalam kondisi ${conditions[level].toLowerCase()}; garis air turun ketika kondisi makin kering.`}>
        <defs><pattern id="btf-peat-grain" width="90" height="45" patternUnits="userSpaceOnUse"><path d="M0 15Q20 8 44 18T90 14M0 37Q28 29 61 40T100 35" fill="none" stroke="#a48251" strokeWidth="1" opacity=".2"/></pattern><clipPath id="btf-soil-clip"><path d="M15 180Q190 165 320 185T610 176T885 181V510H15Z"/></clipPath></defs>
        <path d="M15 180Q190 165 320 185T610 176T885 181V510H15Z" fill="#342b20"/>
        <path d="M15 260Q140 242 320 268T610 254T885 260V510H15Z" fill="#28251d"/>
        <path d="M15 370Q240 350 400 378T700 364T885 370V510H15Z" fill="#1e221b"/>
        <path d="M15 180Q190 165 320 185T610 176T885 181" fill="none" stroke="#718154" strokeWidth="9"/>
        <rect x="15" y="190" width="870" height="320" fill="url(#btf-peat-grain)"/>
        <g fill="none" stroke="#9a8055" strokeWidth="3" opacity=".8"><path d="M380 75L390 180Q365 220 320 240L275 270M390 175Q420 230 470 253L500 300M390 180Q380 265 400 330M320 240L320 300M470 253L430 290M650 150L645 185Q615 230 580 247M645 185L680 260L725 290M645 185L640 310"/></g>
        <g clipPath="url(#btf-soil-clip)"><g ref={water}><path d="M15 230Q120 221 230 230T450 230T670 230T885 230V650H15Z" fill="#4d8586" opacity=".22"/><path d="M15 230Q120 221 230 230T450 230T670 230T885 230" fill="none" stroke="#8bbeb6" strokeWidth="2" strokeDasharray="7 8"/></g></g>
        <g fill="#b9bea6" fontFamily="system-ui" fontSize="16"><text x="35" y="154">Permukaan tanah</text><text x="35" y="315">Sisa tumbuhan & akar</text><text x="35" y="462">Lapisan bahan organik</text></g>
      </svg><label className="btf-moisture-label" htmlFor="btf-moisture">Kondisi gambut <strong>{conditions[level]}</strong></label><input id="btf-moisture" type="range" min="0" max="2" step="1" value={level} aria-valuetext={conditions[level]} onChange={e=>{const next=Number(e.target.value);setLevel(next);shift.current?.(next*85)}}/><div className="btf-moisture-scale">{conditions.map(c=><span key={c}>{c}</span>)}</div></div></div>
    </dialog></>
}
