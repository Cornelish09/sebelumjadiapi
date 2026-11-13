// Bidang satwa menempel pada tanah; dimensinya mengikuti tinggi scene, bukan lebar layar.
export function wildlifePlacement(width:number,height:number,aspects:readonly number[]=[4/3,4/3,4/3,4/3,4/3]){
  const sizes=aspects.map((aspect,i)=>{
    const h=Math.min([.19,.19,.185,.175,.165][i]??.19,(i===4?.42:.4)*width/(height*aspect))
    return {h,w:h*height*aspect/width}
  })
  const center=Math.min(width<700 ? .76 : .72,.98-Math.max(...sizes.map(size=>size.w))/2)
  return sizes.map(({w,h})=>[center-w/2,.08,w,h])
}
