export const beforeFireAssets = {
  scenes: ['forest-alive.webp','forest-drying.webp','forest-burning.webp','forest-ash.webp'].map(file=>`/assets/images/before-the-fire/${file}`),
  treeAlive:'/assets/images/before-the-fire/tree-alive.webp',
  treeAsh:'/assets/images/before-the-fire/tree-ash.webp',
  foregroundAlive:'/assets/images/before-the-fire/foreground-alive.webp',
  foregroundAsh:'/assets/images/before-the-fire/foreground-ash.webp',
  canopy:'/assets/hero/canopy-layer.webp',
  wildlife:['orangutan-grounded.webp','orangutan-drying.webp','orangutan-risk.webp','orangutan-burning.webp','orangutan-loss.webp'].map(file=>`/assets/images/before-the-fire/${file}`),
  music:'/assets/audio/before-the-fire/forest-tension.mp3',
}
export const beforeFireSources = {
  water:{name:'FAO',url:'https://www.fao.org/peatlands/overview/en/',period:'Penjelasan ekologis umum',verifiedOn:'2026-11-09'},
  risk:{name:'UNEP',url:'https://www.unep.org/en/news-and-stories/story/fighting-fires-indonesias-peatlands',period:'Konteks gambut Indonesia; bukan data kejadian saat ini',verifiedOn:'2026-11-09'},
}
export const beforeFireBeats = [
  {at:0,label:'Hidup',title:'Sebelum api, ada kehidupan.',body:'Air menjaga gambut tetap basah. Di atasnya, hutan menjadi tempat berlindung dan sumber kehidupan.',source:'water' as const},
  {at:.23,label:'Mengering',title:'Perubahan dimulai di bawah kaki.',body:'Drainase mengurangi air di lahan gambut. Saat mengering, bahan organik yang tersimpan menjadi lebih mudah terbakar.',source:'risk' as const},
  {at:.44,label:'Berisiko',title:'Kering tidak berarti langsung terbakar.',body:'Tetapi kerentanannya meningkat. Sumber penyalaan, termasuk pembakaran untuk membuka lahan, dapat mengubah risiko menjadi kebakaran.',source:'risk' as const},
  {at:.65,label:'Terbakar',title:'Satu nyala. Dampaknya meluas.',body:'Pada gambut, api dapat merambat di bawah permukaan dan membara lama. Yang terlihat di atas tanah bukan seluruh kebakarannya.',source:'risk' as const},
  {at:.89,label:'Kehilangan',title:'Api padam. Kehilangan tinggal.',body:'Pencegahan harus dimulai sebelum ada nyala: menjaga gambut tetap basah dan menghindari pembakaran untuk membuka lahan.',source:'water' as const},
]
