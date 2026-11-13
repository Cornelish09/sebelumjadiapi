// Ambang personal mengikuti awal dissolve, bukan menunggu section memenuhi layar.
export function jejakChapter(fireTop:number,personalTop:number,height:number):'why'|'fire'|'personal'{
 return personalTop<height*.88?'personal':fireTop<height*.5?'fire':'why'
}
