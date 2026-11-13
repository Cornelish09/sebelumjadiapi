import assert from 'node:assert/strict'
import {createAudioLease} from '../src/features/audio/audioLease.ts'
let stops=0
const acquire=createAudioLease(()=>stops++)
const releaseProbe=acquire()
releaseProbe()
const releaseMounted=acquire()
await Promise.resolve()
assert.equal(stops,0,'Cleanup percobaan StrictMode tidak boleh menghentikan audio setelah remount')
releaseMounted()
await Promise.resolve()
assert.equal(stops,1,'Unmount sebenarnya harus tetap menghentikan audio')
console.log('PASS: StrictMode setup → cleanup → setup keeps audio; real unmount cleans up')
