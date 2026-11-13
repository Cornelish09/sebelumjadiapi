// Batasi translasi agar zoom tidak membuka pinggiran kosong di viewport.
export function focusCamera(x:number,y:number,scale=1.8){
  const edge=(scale-1)*50
  const limit=(value:number)=>Math.max(-edge,Math.min(edge,value))
  return {scale,x:limit((50-x)*scale),y:limit((50-y)*scale)}
}
