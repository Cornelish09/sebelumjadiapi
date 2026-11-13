import assert from 'node:assert/strict'
import {preventionScenarios as scenarios} from '../src/content/preventionLab.ts'
import {initialLabState,labReducer} from '../src/features/prevention-lab/labState.ts'
assert.equal(scenarios.length,3)
for(let mask=0;mask<27;mask++){
 let state=initialLabState(),n=mask
 for(let i=0;i<3;i++){
  assert.equal(scenarios[i].options.length,3)
  assert.equal(new Set(scenarios[i].options).size,3)
  assert.ok(scenarios[i].correct>=0&&scenarios[i].correct<3)
  assert.equal(labReducer(state,{type:'next'}).step,i,'Belum memilih tidak boleh menghabiskan skenario')
  const answer=n%3;n=Math.floor(n/3)
  state=labReducer(state,{type:'answer',option:answer})
  assert.equal(state.answers[i],answer)
  state=labReducer(state,{type:'next'})
  assert.equal(state.step,i+1,'Jawaban salah tetap dapat lanjut')
 }
 assert.equal(state.step,3)
 const answers=[...state.answers]
 for(let i=2;i>=0;i--){state=labReducer(state,{type:'back'});assert.equal(state.step,i);assert.deepEqual(state.answers,answers)}
 state=labReducer(state,{type:'answer',option:scenarios[0].correct});assert.equal(state.answers[0],scenarios[0].correct)
}
assert.deepEqual(labReducer(initialLabState(),{type:'answer',option:9}),initialLabState())
console.log('PASS: 27 answer paths, correct/wrong advancement, completion, back/review, changing answers, input bounds')
