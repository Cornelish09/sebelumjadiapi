# QA energi hero 2.5D — 9 November 2026

## Implementasi

Gambar dan empat layer hero dipertahankan. Tidak ada depth map atau data kontur awal. Dibuat 28 spline UV yang dikalibrasi ke tree-layer.webp; overlay pemeriksaan ada di tmp/hero-qa/path-calibration.png. Koordinat model procedural lama tidak dipakai.

Spline di-resample berdasarkan panjang busur, disimpan dalam texture koordinat UV16, lalu dibaca vertex shader. Transform sampling pohon dan proyeksi balik energi memakai heroProjection.ts yang sama. Mask alpha pohon membatasi cahaya; mask foreground dan canopy menutup partikel yang berada di belakang dedaunan. Ini interpretasi artistik, bukan simulasi biologi atau depth capture.

Energi permukaan dan partikel udara memakai pass GPU terpisah. Satu render loop; tidak ada elemen DOM atau React state per partikel/per frame. Respons cursor mengintegrasikan clock tiap jalur dengan damping, sehingga peningkatan laju tidak melompat posisinya. Touch mempertahankan respons singkat setelah jari dilepas; input touch fisik belum diuji.

## Budget

| Preset | Partikel utama desktop | Utama mobile | Sampel jejak per partikel |
|---|---:|---:|---:|
| Low | 650 | 293 | 1 |
| Balanced (default) | 2200 | 990 | 2 |
| High | 4200 | 1890 | 3 |

Atmosfer: 16/40/64 titik desktop, dibatasi maksimum 20 pada mobile. Tiga draw call untuk komposit, energi, dan atmosfer. Dua jendela pengukuran buruk berturut-turut menurunkan tier; jumlah partikel/atmosfer/glow dikurangi sebelum DPR. Batas DPR bergantung preset dan lebar layar. Efek bisa dimatikan melalui Mode ringan.

## Bukti dan batas uji

- Lint, typecheck, dan production build lulus. Modul renderer hasil build sekitar 21,7 kB sebelum gzip.
- Pengujian logika langsung pada source: presisi UV16; 28 jalur; respons 30/60/120 Hz; pause; decay; pembatasan mobile; degradasi partikel sebelum DPR. Semua lulus.
- Browser localhost:5173, IAB Chromium di komputer pengguna. Desktop viewport 1440×900: Balanced 2200 partikel utama, sampel 59 FPS/p95 16,8 ms; High 4200, sampel 58–59 FPS/p95 16,8–17,4 ms. Ini sampel jendela 4 detik, bukan bukti stabilitas 60 FPS universal. Model GPU tidak direkam.
- Mobile viewport 390×844 (lebar konten 375 karena scrollbar): Balanced 990 dan Low 293, sampel 60 FPS/p95 16,8 ms; tidak ada overflow horizontal. Ini emulasi viewport, bukan perangkat mobile fisik.
- Kursor diuji di akar/batang, cabang, kiri-bawah dan kanan-atas mendekati batas parallax. Mask diuji agar cahaya tidak muncul pada celah background. Screenshot sebelum/sesudah diperiksa: tekstur, komposisi, tipografi dan pencahayaan sumber tetap dipertahankan.
- Pause lewat keyboard terverifikasi menghentikan scene time. Pergantian High saat pause tetap menggambar frame statis, tidak membuat canvas kosong.
- Reduced motion diuji melalui override development ?motion=reduce yang menjalankan jalur reduced yang sama; dua screenshot pada waktu berbeda identik. Preferensi OS dibaca lewat matchMedia; setting OS tidak diubah saat QA.
- Mode ringan: 17 objek WebGL yang dipantau dilepas menjadi 0 lewat pemeriksaan isProgram/isBuffer/isTexture/isShader. Aktivasi kembali menghasilkan 17, tanpa pertumbuhan pada siklus yang diuji. Ini pemeriksaan resource milik renderer, bukan profiling heap/VRAM jangka panjang.
- Penghentian offscreen terverifikasi pada viewport pendek 390×300: hero bottom -86,5 px, data-motion paused, scene time berhenti. Probe tab lain di IAB tetap melaporkan document.hidden false; karena itu penghentian tab tidak aktif belum teruji secara terpisah, walaupun gate document.hidden tersedia di kode.
- Pemeriksaan console setelah timestamp reload QA akhir tidak menemukan error baru. Resource aktif tetap 17 setelah pergantian kualitas/aktivasi efek.

Artefak: tmp/hero-qa/before-energy.jpg, after-energy-desktop.jpg, after-energy-mobile.jpg, energy-left-limit.jpg, energy-right-limit.jpg, energy-reduced.jpg. Kesalahan React saat HMR mengubah jumlah hook terjadi selama pengembangan dan hilang setelah full reload; pemeriksaan error akhir menggunakan timestamp setelah reload versi QA.

Tidak ada fitur api, backend, quiz, meditasi atau section lain yang dikerjakan.
