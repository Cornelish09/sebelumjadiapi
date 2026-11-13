import campaign from '../../content/campaign.json'
import type { SiteRoute } from '../../app/App'
import {audioEngine} from '../../features/audio/AudioEngine'
import {jejakAudio} from '../../content/jejakAudio'
export function SiteHeader({route}:{route:SiteRoute}) {
 return <header className="site-header"><div className="site-brand"><img className="site-brand-logo" src="/assets/hero/wwf%20logo.png" alt="WWF" width="48" height="48" /><span className="wordmark">{campaign.name}</span></div><nav className="primary-nav" aria-label="Navigasi utama">{([['home','HOME'],['meditations','MEDITATIONS'],['jejak-kehidupan','JEJAK KEHIDUPAN']] as const).map(([id,label])=><a key={id} href={`#/${id}`} aria-current={route===id?'page':undefined} onClick={event=>{if(id==='jejak-kehidupan'&&route!==id&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey){void audioEngine.playAtmosphere(jejakAudio.why.src,true,true)}}}>{label}</a>)}</nav></header>
}
