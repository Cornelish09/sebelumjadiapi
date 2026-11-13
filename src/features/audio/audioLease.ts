// StrictMode melepas lalu memasang efek kembali dalam satu giliran.
// Hanya pelepasan terakhir yang boleh menghentikan audio milik halaman.
export function createAudioLease(cleanup:()=>void){
  let generation=0
  return ()=>{
    const owned=++generation
    return ()=>{queueMicrotask(()=>{if(owned===generation)cleanup()})}
  }
}
