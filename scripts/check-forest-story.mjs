import assert from 'node:assert/strict'
import {storyFrame} from '../src/features/why-it-matters/storyTimeline.ts'
import {focusCamera} from '../src/features/why-it-matters/focusCamera.ts'
for(const [position,active] of [[0,0],[1/3,1],[2/3,2],[1,3],[-1,0],[2,3]]) assert.equal(storyFrame(position).active,active)
assert.equal(storyFrame(1).blend,1)
assert.equal(storyFrame(0).blend,0)
for(let i=0;i<=600;i++){
 const frame=storyFrame(i/600)
 assert.ok(frame.active>=0&&frame.active<=3)
 assert.ok(frame.blend>=0&&frame.blend<=1)
 if(frame.active!==1) assert.equal(frame.animal,0,'Orangutan tidak boleh bocor ke tahap 01, 03, atau 04')
}
assert.equal(storyFrame(1/3).animal,1,'Orangutan harus terlihat saat langsung memilih tahap 02')
assert.equal(storyFrame(2/3).animal,0,'Tahap 03 harus menampilkan manusia dan udara saja')
for(const x of [0,21,24,59,85,100]) for(const y of [0,20,28,40,76,100]){
 const camera=focusCamera(x,y)
 const margin=(camera.scale-1)*50
 assert.ok(Math.abs(camera.x)<=margin&&Math.abs(camera.y)<=margin,'Zoom tidak boleh membuka pinggiran kosong')
}
assert.ok(focusCamera(85,28).x<0,'Kamera menuju satwa di sisi kanan')
assert.ok(focusCamera(24,76).y<0,'Kamera menuju akar di bawah')
// Hasil tidak bergantung arah scroll atau state pada frame sebelumnya.
const samples=[.9,.12,.7,.333,1,0,.7]
assert.deepEqual(samples.map(storyFrame).at(-1),storyFrame(.7))
console.log('PASS: four stages, reverse seek, bounds, orangutan only in stage 02, camera direction and zoom edges')
