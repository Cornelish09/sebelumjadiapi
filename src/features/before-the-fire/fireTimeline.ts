const clamp=(v:number)=>Math.max(0,Math.min(1,v))
export const smoothRange=(a:number,b:number,value:number)=>{const t=clamp((value-a)/(b-a));return t*t*(3-2*t)}
const phaseStarts=[0,.23,.44,.65,.89] as const
export const fireSeekStops=[0,.28,.49,.72,1] as const
// Hanya dua pose bertetangga yang di-dissolve. Akhir fase menahan pose penuh.
export function wildlifeFrame(value:number){
  const p=clamp(value)
  let to=0
  for(let i=1;i<phaseStarts.length;i++)if(p>=phaseStarts[i])to=i
  return {from:Math.max(0,to-1),to,blend:to===0?0:smoothRange(phaseStarts[to],phaseStarts[to]+.045,p)}
}
export function fireFrame(value:number){
  const p=clamp(value)
  const from=p<.32?0:p<.7?1:2
  const blend=from===0?smoothRange(.1,.32,p):from===1?smoothRange(.44,.7,p):smoothRange(.76,.94,p)
  const beat=p<.23?0:p<.44?1:p<.65?2:p<.89?3:4
  return {p,from,to:from+1,blend,beat,animal:wildlifeFrame(p),damage:smoothRange(.28,.72,p),fire:smoothRange(.43,.64,p)*(1-smoothRange(.76,.94,p)),ash:smoothRange(.72,.96,p),life:1-smoothRange(.18,.55,p)}
}
