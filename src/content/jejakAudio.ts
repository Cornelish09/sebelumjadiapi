export const jejakAudio={
  why:{src:'/assets/audio/jejak kehidupan/Why It Matters.mp3',duration:167.616,loop:true},
  fire:{src:'/assets/audio/jejak kehidupan/Before The Fire_The Last Breath.mp3',duration:99.096,loop:false},
}
// Tiga track berurutan khusus untuk 03 Make It Personal hingga akhir halaman Jejak Kehidupan.
export const jejakPersonalTracks=[
  {src:'/assets/audio/jejak kehidupan/Motunui Forest Flow.mp3',duration:179.376},
  {src:'/assets/audio/jejak kehidupan/Swaying Motunui Woods.mp3',duration:157.656},
  {src:'/assets/audio/jejak kehidupan/Nusantara Forest - Harmoni Rimba.mp3',duration:179.016},
] as const
// Durasi asli dibaca dengan Mutagen; batas fase belum diverifikasi lewat pendengaran.
export const fireAudioCalibration:{status:'pending'|'verified';cues:readonly number[]|null}={status:'pending',cues:null}
