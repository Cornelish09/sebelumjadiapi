# Why It Matters — implementasi dan pemeriksaan

Tanggal: 9 November 2026. Alamat: http://localhost:5173/#/jejak-kehidupan

## Lingkup

Bagian pertama Jejak Kehidupan sesuai master 8.1 dan proposal PDF halaman 19. Lima bagian berikutnya belum diimplementasikan. Home dan Meditations tidak didesain ulang.

## File

- `src/app/App.tsx`: memasang halaman Jejak pada route yang sudah ada.
- `src/features/jejak-kehidupan/JejakKehidupanPage.tsx`: halaman dan reset scroll.
- `src/content/whyItMatters.ts`: kontrak sumber, konten empat koneksi/dampak, koordinat hotspot, visual, status data angka dan bab berikutnya.
- `src/features/why-it-matters/WhyItMatters.tsx`: komposisi halaman.
- `WhyIntro.tsx`, `useForestParallax.ts`: intro dan gerakan dengan damping; berhenti saat settle, tersembunyi atau di luar viewport.
- `ForestConnections.tsx`, `SourceLink.tsx`: hotspot, panel dan sumber.
- `ImpactEditorial.tsx`: empat tab dampak dengan kontrol keyboard dan cross-dissolve gambar.
- `SourcedFacts.tsx`, `WhyReflection.tsx`: sumber dan refleksi akhir.
- `whyItMatters.css`: tampilan responsif serta reduced motion.
- `public/assets/images/why-it-matters/forest-scene.webp` dan `provenance.json`: visual hutan orisinal. WebP 1672×941, 387.300 byte. Ilustrasi artistik, bukan foto kejadian tertentu.

## Sumber yang diperiksa

Semua merupakan penjelasan umum; tidak digunakan sebagai statistik tahunan Indonesia.

| Penerbit | Sumber | Digunakan untuk |
| --- | --- | --- |
| FAO | https://www.fao.org/sustainable-forest-management-toolbox/modules/watershed-management/en | Vegetasi, tanah dan siklus air |
| FAO | https://www.fao.org/one-health/highlights/wildfires-and-one-health/en | Habitat, akses makanan/air, erosi dan sedimen |
| WHO | https://www.who.int/news-room/fact-sheets/detail/wildfires-and-health | Asap, kualitas udara dan dampak masyarakat |
| UNEP | https://www.unep.org/en/news-and-stories/story/why-peatlands-matter | Simpanan karbon gambut dan emisi |

Angka luas kebakaran belum ditampilkan. Konfigurasi memisahkan status kesiapan angka agar data belum terverifikasi tidak masuk tampilan sebagai fakta.

## Pemeriksaan

- Desktop dan viewport 390×844: intro, gambar dan header terbaca, tanpa overflow horizontal atau aset gagal dimuat.
- Empat hotspot: klik dan Enter memperbarui panel; Escape dan tombol tutup mengembalikan fokus tanpa membuka ulang panel.
- Empat tab dampak: klik, panah, Home dan End mengganti konten dan gambar; panel memiliki label tab aktif.
- Disclosure data membuka alasan belum tersedianya angka. Anchor intro dan tombol kembali menggulir tanpa mengganti hash route.
- Navigasi Home → Meditations → Jejak berhasil. Halaman Jejak tidak memasang canvas atau audio tambahan. Tes regresi mesin audio `node tmp/meditations-qa/check-audio.mjs` lulus.
- Log browser pada pemeriksaan Jejak tidak menunjukkan error.
- Fallback gambar dan reduced motion tersedia dalam kode. Belum diuji dengan perangkat fisik, pergantian preferensi OS, atau profiling FPS perangkat kelas bawah.
- Screenshot: `tmp/why-qa/intro-desktop.png`, `tmp/why-qa/hotspots-desktop.png`.

## Cara memeriksa ulang

Buka alamat halaman, pilih setiap titik dan tab dampak, gunakan Tab/Enter/Escape serta tombol panah pada tab. Periksa sumber, gulir ke refleksi, lalu gunakan tombol kembali. Ulangi dengan viewport ponsel. Jalankan lint, typecheck dan build dari root proyek.

## Revisi pinned/morph (hasil terbaru)

Kode baru:
- `src/content/forestStory.ts`: empat cerita utama, hubungan antartahap dan sumbernya.
- `src/features/why-it-matters/ForestStory.tsx`: panggung sticky, navigasi tahap, progress, konteks tambahan.
- `useForestStory.ts`: RAF saat scroll/resize, observer offscreen, cleanup, mask/pan/skala dan jembatan satwa.
- `storyTimeline.ts`: perhitungan tahap yang dapat diuji tanpa DOM.
- `forestStory.css`: komposisi desktop/mobile, fallback mask dan reduced motion.
- `scripts/check-forest-story.mjs`: pengujian batas, seek maju/mundur dan satu rentang visual satwa.
- `public/assets/images/why-it-matters/orangutan-bridge.webp` dan `orangutan-provenance.json`: cutout orisinal dengan alpha terverifikasi, 236.818 byte.

File diperbarui: `WhyItMatters.tsx` (mengganti tab editorial utama dengan storytelling), `WhyIntro.tsx` (entry cerita), `ForestConnections.tsx` (menghapus copy pengisi), `WhyReflection.tsx` (pertanyaan menuju bab selanjutnya), `PROJECT_STATUS.md`, `DECISION_LOG.md` dan dokumen ini. Modul ImpactEditorial lama tidak dipasang di alur baru. Home, routing, audio dan Meditations tidak diubah pada revisi ini.

Morph yang diimplementasikan: mask polygon organik 32 titik mengembang dan berubah kontur mengikuti posisi scroll, cross-dissolve, komposisi pan/zoom dan foreground beda kedalaman. Orangutan adalah cutout terpisah pada satu jembatan habitat → udara, bukan morph anatomi atau rekonstruksi 3D. Efek dapat dibalik dengan scroll mundur. Reduced motion menghapus mask/transform/animasi satwa, dan browser tanpa clip-path mendapat dissolve. Tidak ada engine/dependensi baru atau loop animasi idle.

Pemeriksaan revisi: tes timeline, alpha transparan dan keberadaan aset lulus; regresi mesin audio lulus. Typecheck, lint dan build dicatat pada PROJECT_STATUS. **QA visual browser versi ini belum dilakukan**: origin localhost ditolak pengaturan izin tersimpan, bahkan setelah pengguna memberikan izin eksplisit di chat. Screenshot dan QA browser pada bagian sebelumnya hanya berlaku untuk versi lama. Belum ada klaim kestabilan FPS, uji mobile fisik, uji preferensi OS atau rendering morph lintas browser. Before the Fire tetap hanya pengantar; tidak ada tautan palsu menuju bagian yang belum dibangun.

## Perbaikan setelah laporan framing

File utama: `useForestStory.ts` (scroll compositor dan caching ukuran), `storyTimeline.ts` (orangutan hanya tahap 02), `ForestStory.tsx` dan `forestStory.css` (narasi tanpa scroll bersarang, judul besar, dialog konteks, fallback statis), `ForestConnections.tsx`, `forestConnections.css`, `focusCamera.ts` (zoom fokus dan reveal), `WhyIntro.tsx`, `WhyReflection.tsx`, `WhyItMatters.tsx` (perapian caption/cue/panah), `src/content/forestStory.ts` (visual dan konteks baru), `scripts/check-forest-story.mjs` (regresi tahap/kamera).

Aset baru: `community-air.webp` (1600×900; 144.700 byte), `peat-carbon.webp` (1600×900; 308.754 byte), serta `story-visuals-provenance.json`. Metadata orangutan diperbarui untuk penempatan tahap 02.

Profil struktur render: empat layer + mask polygon yang dihitung setiap frame diganti maksimal dua layer compositor dengan opacity/transform; tidak ada pengukuran layout pada loop paint, tidak ada React state update untuk frame dalam tahap yang sama, dan RAF berhenti ketika settle. Ini adalah audit kode/struktur, bukan pengukuran FPS perangkat pengguna. Native scrollbar dokumen tidak disembunyikan; yang dihapus adalah overflow di kolom narasi.

Pengujian logika mencakup langsung pilih tahap 02, tidak ada orangutan pada tahap 03/04, scroll maju/mundur dan batas kamera agar tidak menampilkan pinggiran kosong. Regresi audio tetap lulus. QA browser masih TERBLOKIR: izin situs aplikasi telah diperbarui pengguna, tetapi alat tetap mengembalikan penolakan izin tersimpan. Tidak membuat screenshot palsu atau memakai bukti visual versi lama untuk revisi ini.
