import assert from 'node:assert/strict'
import {deliverMessage,whatsappUrl} from '../src/features/take-action/shareActions.ts'
import {actionRows,actionSources,factCards,programs,provinces,quiz,verificationChecklist} from '../src/content/takeAction.ts'
import {campaignUrl} from '../src/features/campaign-actions/links.ts'
import {addPledge,completeMission,saveLocal,setVerificationCheck} from '../src/features/campaign-actions/progress.ts'

assert.deepEqual(actionRows.map(x=>x.id),['learn','check','share','join','invite'])
assert.equal(quiz.length,5)
assert.deepEqual(quiz.map(item=>item.fact),[true,false,true,false,true])
assert.equal(new Set(provinces).size,38)
assert.equal(verificationChecklist.length,3)
assert.equal(factCards.length,3)
assert.equal(new Set(factCards.map(item=>item.image)).size,3)
assert.equal(new URL(actionSources.sipongi.url).pathname,'/peta')
assert.equal(programs.length,3)
assert.ok(programs.every(item=>!item.title.includes('MoNa')))
assert.ok(Object.values(actionSources).every(source=>new URL(source.url).protocol==='https:'&&source.verifiedOn&&source.period))

const shareLink=campaignUrl('whatsapp','fakta-air')
const url=new URL(shareLink)
assert.equal(url.hash,'#/jejak-kehidupan')
assert.equal(url.searchParams.get('utm_source'),'whatsapp')
assert.equal(url.searchParams.get('utm_content'),'fakta-air')
for(const text of [`Gambut yang mengering lebih rentan terbakar. ${shareLink}`, `Rai, mau ikut misi? ${shareLink}`]){
 let copied='',shared=''
 const env={copy:async t=>{copied=t},share:async data=>{shared=data.text}}
 assert.equal(await deliverMessage(text,'copy',env),'copied');assert.equal(copied,text)
 assert.equal(await deliverMessage(text,'share',env),'shared');assert.equal(shared,text)
 assert.equal(await deliverMessage(text,'share',{copy:env.copy}),'copied')
 assert.equal(await deliverMessage(text,'share',{copy:env.copy,share:async()=>{throw new Error('API denied')}}),'copied')
 assert.equal(await deliverMessage(text,'copy',{copy:async()=>{throw new Error('Clipboard denied')}}),'manual')
 assert.equal(await deliverMessage(text,'share',{copy:env.copy,share:async()=>{throw new DOMException('Cancelled','AbortError')}}),'cancelled')
 assert.equal(new URL(whatsappUrl(text)).searchParams.get('text'),text)
}

const store=new Map()
globalThis.window=new EventTarget()
Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{
  getItem:key=>store.get(key)??null,
  setItem:(key,value)=>store.set(key,value),
}})
completeMission('share')
completeMission('learn')
completeMission('share')
assert.deepEqual(JSON.parse(store.get('sebelumjadiapi-actions-v1:missions')),['share','learn'])
store.set('sebelumjadiapi-actions-v1:missions', JSON.stringify(['learn','check']))
setVerificationCheck(2,false)
assert.deepEqual(JSON.parse(store.get('sebelumjadiapi-actions-v1:verification')),[true,true,false])
setVerificationCheck(2,true)
assert.deepEqual(JSON.parse(store.get('sebelumjadiapi-actions-v1:verification')),[true,true,true])
setVerificationCheck(0,false)
assert.deepEqual(JSON.parse(store.get('sebelumjadiapi-actions-v1:verification')),[false,true,true])
const pledge={name:'Rai',city:'Palangka Raya',promise:'Aku dukung gambut tetap basah.'}
assert.equal(addPledge(pledge),'saved')
assert.equal(addPledge({...pledge,name:'RAI'}),'duplicate')
assert.equal(JSON.parse(store.get('sebelumjadiapi-actions-v1:pledges')).length,1)
Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{
  getItem:()=>{throw Error('Storage denied')},
  setItem:()=>{throw Error('Storage denied')},
}})
assert.equal(saveLocal('newsletter',{email:'demo@example.invalid'}),false)
assert.equal(addPledge(pledge),'session')
assert.equal(addPledge(pledge),'duplicate')

console.log('PASS: five missions, sourced content, public UTM links, sharing, local progress, pledge deduplication and in-memory fallback')
