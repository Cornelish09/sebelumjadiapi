import {lazy,Suspense,useEffect} from 'react'
import {WhyItMatters} from '../why-it-matters/WhyItMatters'
import {JejakAudio} from './JejakAudio'
import {MakeItPersonal} from '../make-it-personal/MakeItPersonal'
import {PreventionLab} from '../prevention-lab/PreventionLab'
import {TakeAction} from '../take-action/TakeAction'
import {SipongiMap} from '../take-action/SipongiMap'
import {ShowYourAction} from '../show-your-action/ShowYourAction'
import {StayInMovement} from '../stay-in-movement/StayInMovement'
import campaign from '../../content/campaign.json'
const BeforeTheFire=lazy(()=>import('../before-the-fire/BeforeTheFire'))
// Enam bab kampanye berurutan, dengan Prevention Lab sebagai tambahan.
export function JejakKehidupanPage(){useEffect(()=>{window.scrollTo(0,0)},[]);return <>
  <JejakAudio/><WhyItMatters/>
  <Suspense fallback={<p style={{padding:'80px 6vw',color:'#c5ceba'}}>Memuat Before the Fire…</p>}><BeforeTheFire/></Suspense>
  <MakeItPersonal/><PreventionLab/><TakeAction/><SipongiMap/><ShowYourAction/><StayInMovement/>
  <footer className="why-footer why-page"><span>#SebelumJadiApi</span><p>{campaign.disclaimer}</p></footer>
</>}
