# Before the Fire — hasil implementasi

## File dan aset
- `src/features/before-the-fire/BeforeTheFire.tsx`, `beforeTheFire.css`: panggung, lima tahap, kontrol glass oval di kiri dan fallback statis; tanpa tombol audio.
- `useBeforeFireScene.ts`: lifecycle GSAP/ScrollTrigger, pointer dengan damping, observer dan cleanup.
- `createForestRenderer.ts`, `forest.frag.glsl`, `foreground.frag.glsl`: compositor dua pass, parallax cutout, morph/reveal, batas DPR/piksel. Satwa berada di belakang foliage.
- `wildlifePlacement.ts`: bidang kontak tanah bersama dan ukuran lima pose responsif, dipakai compositor dan fallback.
- `createAtmosphere.ts`: partikel debu/bara/abu berbasis delta time.
- `fireTimeline.ts`: kontrak perpindahan state hutan dan lima pose, target navigasi, serta cross-dissolve maksimal dua pose bertetangga. Dapat dibalik lewat scroll.
- `PeatlandExplainer.tsx`: SVG penampang dan slider kondisi basah/mengering/kering; tanpa kadar air atau angka risiko palsu.
- `useSceneAudio.ts`, `AudioEngine.ts`: satu elemen audio, loop atmosfer, gain independen, percobaan otomatis/retry interaksi sesuai kebijakan browser, pause keluar dan cleanup yang tidak menghentikan halaman baru.
- `src/content/beforeTheFire.ts`: aset, narasi, titik tahap dan sumber.
- `JejakKehidupanPage.tsx`: lazy load section dan footer akhir. `WhyItMatters.tsx`, `WhyReflection.tsx`, `src/content/whyItMatters.ts`: penyambungan section yang kini tersedia.
- `public/assets/images/before-the-fire/`: tiga belas WebP orisinal dan provenance; sembilan cutout memiliki alpha nyata. Lima pose orangutan berjumlah 875.956 byte; tidak memakai pose duduk Why It Matters. Kanopi memakai aset orisinal hero sebelumnya. Konversi teknis satwa: `scripts/prepare-before-fire-wildlife.py`.
- Aset tambahan: `public/assets/images/before-the-fire/orangutan-drying.webp`, `orangutan-risk.webp`, `orangutan-burning.webp` (masing-masing 1000×750 RGBA). Dibuat dengan tool ImageGen bawaan, bukan CLI/API eksternal. Prompt lengkap: [wildlife-prompts.json](../public/assets/images/before-the-fire/wildlife-prompts.json). Referensi identitas: `orangutan-grounded.webp`; prompt mengunci subjek, arah kamera, cahaya hutan dan tanah, lalu mengubah pose gelisah → lemas → terkulai.
- `public/assets/audio/before-the-fire/`: soundtrack atmosfer sintetis 46 detik dan provenance. Reproduksi melalui `scripts/create-before-fire-audio.py` dan FFmpeg.

## Sumber
- FAO, penjelasan ekologi gambut: https://www.fao.org/peatlands/overview/en/
- UNEP, konteks kebakaran gambut Indonesia: https://www.unep.org/en/news-and-stories/story/fighting-fires-indonesias-peatlands
Tidak menggunakan angka historis sebagai data saat ini. Urutan visual berlabel skenario ilustratif.

## Verifikasi
- `npm run lint`, `npm run typecheck`, `npm run build`: lulus.
- `node scripts/check-before-fire.mjs`: awal hidup, akhir gosong tanpa layer hijau/satwa hidup/api aktif, pose kehilangan hanya fase 05, bobot pose selalu berjumlah satu tanpa interval hilang, maksimal dua pose bertetangga selama dissolve, target tombol sesuai pose penuh, penempatan lima pose pada lima ukuran viewport, batas blend, seek mundur, loop dan volume audio, posisi Home, cleanup lintas halaman dan satu instance Audio.
- `node scripts/check-forest-story.mjs` dan `node tmp/meditations-qa/check-audio.mjs`: lulus.
- Gambar: semua decode; dimensi backplate sama 1672×941; pasangan tree 1122×1402; pasangan foreground 1672×941; alpha 0–255 pada cutout. Penyelarasan visual ditinjau dari hasil ImageGen, bukan jaminan pixel-perfect.
- MP3: FFprobe 46,000 detik; 737.323 byte.
- Belum diverifikasi: kompilasi shader pada GPU browser, pin/scrub dan interaksi browser nyata, mobile fisik, reduced motion OS, kualitas bunyi lewat pendengaran manusia, FPS. Akses localhost ditolak gerbang izin tersimpan; tidak memakai browser/port lain untuk melewati penolakan. Screenshot browser lama tidak dipakai sebagai bukti fitur ini.

## Pemeriksaan langsung berikutnya
Masuk Jejak Kehidupan, gulir ke Before the Fire. Periksa scroll maju/mundur dan kelima tombol oval di atas; garis progress harus tidak ada dan bagian bawah visual satwa terbuka. Arahkan kursor ke hutan pada fase kering/abu, diamkan agar reveal memudar, lalu coba Lihat kondisi awal. Pastikan lima pose berubah bertahap, kontak kaki/serasah dan occlusion foreground terlihat wajar; pose kehilangan hanya muncul pada akhir. Periksa musik saat memasuki section (atau setelah interaksi jika diblokir browser), lanjutkan hingga akhir, pindah Home/Meditations dan pastikan tidak ada tumpang tindih. Buka Di bawah permukaan, gunakan Tab dan panah pada slider, lalu Escape. Ulangi di mobile dan reduced motion; periksa fallback ketika WebGL dinonaktifkan. Revisi 10 November dicoba ulang melalui browser internal pada localhost:5173, tetapi masih ditolak oleh kebijakan izin tersimpan; belum memperoleh pemeriksaan browser langsung.
