import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'
import {fireFrame,fireSeekStops} from '../src/features/before-the-fire/fireTimeline.ts'
import {wildlifePlacement} from '../src/features/before-the-fire/wildlifePlacement.ts'
import {createAudioLease} from '../src/features/audio/audioLease.ts'
const alive=fireFrame(0),ash=fireFrame(1)
assert.equal(alive.blend,0);assert.equal(alive.damage,0);assert.equal(alive.life,1)
assert.equal(ash.to,3);assert.equal(ash.blend,1);assert.equal(ash.damage,1);assert.equal(ash.life,0);assert.equal(ash.fire,0)
assert.deepEqual(alive.animal,{from:0,to:0,blend:0});assert.deepEqual(ash.animal,{from:3,to:4,blend:1})
for(let i=0;i<=1000;i++){
 const f=fireFrame(i/1000)
 assert.ok(f.from>=0&&f.to<=3)
 for(const key of ['blend','damage','life','fire','ash'])assert.ok(f[key]>=0&&f[key]<=1)
 const pose=f.animal
 assert.ok(pose.from>=0&&pose.to<=4&&pose.to-pose.from<=1)
 assert.ok(pose.blend>=0&&pose.blend<=1)
 const weights=Array.from({length:5},(_,n)=>(n===pose.from?1-pose.blend:0)+(n===pose.to?pose.blend:0))
 assert.ok(Math.abs(weights.reduce((a,b)=>a+b,0)-1)<1e-9,'Satwa tidak boleh menghilang di antara fase')
 assert.ok(weights.filter(v=>v>0).length<=2,'Dissolve hanya dua pose berdekatan')
 if(f.beat!==4)assert.equal(weights[4],0,'Pose kehilangan hanya boleh muncul pada fase 05')
}
for(const [i,stop] of fireSeekStops.entries()){
 const f=fireFrame(stop)
 assert.equal(f.beat,i);assert.equal(f.animal.to,i)
 assert.equal(f.animal.blend,i===0?0:1,'Klik fase harus mencapai pose penuh yang sesuai')
}
for(const [w,h] of [[1440,900],[1920,1080],[390,844],[320,844],[320,1600]]){
 const placement=wildlifePlacement(w,h,[4/3,4/3,1.5,1.4,4/3])
 assert.equal(placement.length,5)
 for(const rect of placement){
  assert.equal(rect[1],.08,'Bidang kontak tanah harus tetap sama')
  assert.ok(rect[0]>=0&&rect[0]+rect[2]<=.981,'Satwa tidak boleh keluar viewport')
  assert.ok(rect[2]<=.421,'Satwa tidak boleh menjadi maskot raksasa pada mobile')
 }
}
for(const p of [1,.2,.72,0,.5,.1,1])assert.deepEqual(fireFrame(p),fireFrame(p),'Seek tidak bergantung arah scroll')
class FakeAudio extends EventTarget{
 static instances=[];paused=true;currentTime=0;duration=120;volume=0;src='';loop=false
 constructor(){super();FakeAudio.instances.push(this)}
 load(){this.currentTime=0;queueMicrotask(()=>this.dispatchEvent(new Event('loadedmetadata')))}
 play(){this.paused=false;this.dispatchEvent(new Event('playing'));return Promise.resolve()}
 pause(){this.paused=true;this.dispatchEvent(new Event('pause'))}
 removeAttribute(){this.src=''}
}
globalThis.Audio=FakeAudio;globalThis.sessionStorage={getItem:()=>null,setItem:()=>{}};globalThis.document={hidden:false}
globalThis.requestAnimationFrame=fn=>setTimeout(()=>fn(performance.now()+1000),0)
const code=ts.transpileModule(fs.readFileSync('src/features/audio/AudioEngine.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText
const {audioEngine:engine,homeTracks}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'))
const tick=()=>new Promise(resolve=>setTimeout(resolve,15))
const audio=FakeAudio.instances[0],source='/assets/audio/before-the-fire/forest-tension.mp3'
engine.enterHome();await tick();audio.currentTime=21;audio.dispatchEvent(new Event('timeupdate'))
await engine.playAtmosphere(source);assert.equal(audio.loop,true);assert.equal(engine.snapshot().playing,true)
await tick()
audio.currentTime=5;audio.dispatchEvent(new Event('timeupdate'));assert.equal(audio.volume,.27)
engine.atmosphereIntensity(source,.1);assert.ok(Math.abs(audio.volume-.027)<1e-8)
engine.pause();assert.equal(audio.paused,true);await engine.play();assert.equal(audio.paused,false)
engine.selectEpisode('/episode.mp3');await tick();assert.equal(audio.loop,false);await engine.play();audio.currentTime=10;audio.dispatchEvent(new Event('timeupdate'));assert.equal(audio.volume,.24)
engine.enterHome();await tick();assert.equal(audio.loop,false);assert.equal(engine.snapshot().src,homeTracks[0]);assert.equal(audio.currentTime,21)
engine.stopAtmosphere(source);await tick();assert.equal(audio.paused,false,'Cleanup Before the Fire tidak boleh menghentikan Home')
const pending=engine.playAtmosphere(source);engine.selectEpisode('/latest.mp3');await pending;await tick();assert.equal(engine.snapshot().src,'/latest.mp3');assert.equal(audio.loop,false)
assert.equal(FakeAudio.instances.length,1)
await engine.playAtmosphere('/assets/audio/jejak kehidupan/Before The Fire_The Last Breath.mp3',false);await tick()
assert.equal(audio.loop,false);engine.seek(35);assert.equal(audio.currentTime,35)
await engine.playAtmosphere(source);await tick();engine.seek(7)
await engine.playAtmosphere('/assets/audio/jejak kehidupan/Before The Fire_The Last Breath.mp3',false);await tick();assert.equal(audio.currentTime,35)
await engine.playAtmosphere(source);await tick();assert.equal(audio.currentTime,7)
engine.pause();assert.equal(audio.paused,true);await engine.play();assert.equal(audio.paused,false)
// Navigasi harus memanggil play sebelum handler klik berakhir, meski sumber lama berbunyi.
let inGesture=true,calledInGesture=false
const originalPlay=audio.play.bind(audio)
audio.play=()=>{calledInGesture=inGesture;return originalPlay()}
const navigation=engine.playAtmosphere('/assets/audio/jejak kehidupan/Why It Matters.mp3',true,true)
assert.equal(engine.snapshot().src,encodeURI('/assets/audio/jejak kehidupan/Why It Matters.mp3'))
assert.equal(calledInGesture,true,'Play tidak boleh menunggu fade-out/effect sesudah klik')
inGesture=false;await navigation;await tick();assert.equal(audio.paused,false)
const whySource='/assets/audio/jejak kehidupan/Why It Matters.mp3'
const acquireJejak=createAudioLease(()=>engine.stopAtmosphere(whySource))
const probeCleanup=acquireJejak();probeCleanup()
// Setup kedua melihat sumber masih playing; tidak memanggil play lagi.
assert.equal(engine.snapshot().playing,true)
const realCleanup=acquireJejak();await tick()
assert.equal(audio.paused,false,'StrictMode tidak boleh membuat Why diam sampai visibilitychange')
realCleanup();await tick();assert.equal(audio.paused,true,'Keluar halaman tetap menjeda audio')
engine.dispose()
console.log('PASS: five continuous wildlife poses, direct phase seek, reverse seek, placement bounds, final ash, scene loop, volume isolation, Home resume, stale cleanup and one audio instance')
