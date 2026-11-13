export interface MeditationEpisode {id:string;number:string;emotion:string;title:string;audio:string;background:string;accent:string;position:string}
export const meditationEpisodes:readonly MeditationEpisode[]=[
 {id:'peace',number:'01',emotion:'PEACE',title:'Sebelum Semuanya Berubah',audio:'/assets/audio/meditations/peace/peace audio.mp3',background:'/assets/images/meditations/peace-bg.webp',accent:'#b7c59a',position:'50% 50%'},
 {id:'awareness',number:'02',emotion:'AWARENESS',title:'Yang Tak Terlihat Sebelum Api',audio:'/assets/audio/meditations/awareness/awareness audio.mp3',background:'/assets/images/meditations/awareness-bg.webp',accent:'#b6a47e',position:'50% 50%'},
 {id:'sorrow',number:'03',emotion:'SORROW',title:'Ketika Hutan Kehilangan Suaranya',audio:'/assets/audio/meditations/sorrow/sorrow audio.mp3',background:'/assets/images/meditations/sorrow-bg.webp',accent:'#a8aec4',position:'50% 50%'},
 {id:'anger',number:'04',emotion:'ANGER',title:'Yang Seharusnya Tak Terjadi',audio:'/assets/audio/meditations/anger/anger audio.mp3',background:'/assets/images/meditations/anger-bg.webp',accent:'#bc947b',position:'50% 50%'},
 {id:'hope',number:'05',emotion:'HOPE',title:'Kita Masih Punya Waktu',audio:'/assets/audio/meditations/hope/hope.mp3',background:'/assets/images/meditations/hope-bg.webp',accent:'#c6bb93',position:'50% 50%'},
]

