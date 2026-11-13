import assert from 'node:assert/strict'
import fs from 'node:fs'
import {jejakChapter} from '../src/features/jejak-kehidupan/jejakChapter.ts'
import {personalStories,personalPhoto} from '../src/content/makeItPersonal.ts'
assert.equal(personalStories.length,3)
assert.equal(jejakChapter(Infinity,Infinity,900),'why')
assert.equal(jejakChapter(-100,1000,900),'fire')
assert.equal(jejakChapter(-100,790,900),'personal')
assert.equal(jejakChapter(-100,1000,900),'fire','Reverse scroll returns to soundtrack chapter')
assert.ok(fs.existsSync('public'+personalPhoto.src))
const credits=JSON.parse(fs.readFileSync('public/assets/images/make-it-personal/credits.json','utf8'))
assert.equal(credits.length,1);assert.equal(credits[0].author,'Nafisathallah');assert.equal(credits[0].license,'CC BY-SA 4.0')
console.log('PASS: three perspectives, local photo and license metadata, silent personal boundary and reverse chapter')

assert.ok(!JSON.stringify(personalPhoto).includes('2015'))
