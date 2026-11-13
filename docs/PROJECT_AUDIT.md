# Catatan pembacaan proyek #SebelumJadiApi

Tanggal audit: 9 November 2026. Ruang lingkup: memahami proyek dan mencocokkannya dengan dokumen akademik, tanpa menambah fitur atau mengubah kode aplikasi.

## Cakupan dan batas pemeriksaan

- Dibaca: AGENTS.md, seluruh 28 bagian master (0–27), PROJECT_STATUS, DECISION_LOG, CODEX_START_HERE, README, README_PACK, seluruh source TS/TSX/CSS/JSON, konfigurasi, HTML, dan metadata aset.
- Proposal UTS dibaca seluruh 47 halaman PDF, termasuk tabel, pengukuran, penutup, dan daftar pustaka. Materi tutor dibaca seluruh 7 slide. Semua halaman dirender untuk pemeriksaan susunan visual; isi teks dibaca dari ekstraksi per halaman.
- Dua PDF di references/academic identik berdasarkan SHA-256 dengan dua file Downloads yang ditunjuk pengguna.
- Tidak ditemukan file PPT/PPTX di proyek. Materi presentasi yang tersedia adalah PDF tutor 7 slide; tidak menganggap ada PPT lain yang sudah dibaca.
- Gambar konsep, tekstur sumber dan hasil WebP, ketiga screenshot referensi, serta aset bawaan scaffold diperiksa. Gambar konsep bukan bukti tampilan aplikasi saat berjalan.
- package-lock diperiksa sebagai JSON dan dicocokkan dengan manifest serta dependency terpasang. Kode pihak ketiga di node_modules, isi internal Git, dan berkas hasil kompilasi bukan bahan yang dibaca baris demi baris.
- Audit ini belum mencakup pengoperasian browser, screenshot aplikasi aktual, profiling GPU/FPS perangkat, pengujian touch/keyboard, ataupun verifikasi eksternal sumber faktual dan hak penggunaan. Lulus kompilasi tidak membuktikan hal-hal tersebut.
- Isi PDF merupakan referensi akademik. Contoh prompt di dokumen proyek dan instruksi pengerjaan di slide tidak dijalankan otomatis sebagai permintaan pengguna saat ini.

## Pemahaman tujuan

#SebelumJadiApi adalah prototipe akademik Digital PR tentang pencegahan karhutla untuk Gen Z. Campaign hub menyatukan informasi yang tersebar menjadi perjalanan awareness → engagement → participation → action, kemudian membuka keterlibatan lanjutan melalui MoNa. Proyek tidak memiliki bukti persetujuan atau afiliasi resmi WWF.

Proposal menempatkan hub secara konseptual di website WWF; implementasi lokal merupakan prototipe independen. Penambahan item di AKSI → Kampanye, tepat di bawah Nature X Youth, berasal dari blueprint/brief desain. Itu belum menjadi integrasi dengan website WWF sebenarnya.

Pohon 3D, partikel, audio, meditasi, serta interaksi risiko merupakan pengembangan kreatif pada master. Materi tutor tidak mewajibkan teknologi tersebut atau backend produksi. Nilai akademik tetap terletak pada strategi komunikasi, konsistensi proposal, partisipasi, dan evaluasi.

## Pemetaan proposal dan kondisi implementasi

Nomor halaman di bawah adalah urutan halaman PDF, bukan nomor cetak; cover menyebabkan selisih dan daftar isi juga perlu diperiksa bila dipakai sebagai penunjuk.

| Bagian wajib | Isi dan fungsi dalam proposal | Bukti kode sekarang |
|---|---|---|
| Why It Matters | Fakta dan dampak pada ekosistem, satwa, masyarakat, iklim; awareness | Nama dan ID di chapters.ts; belum ada section |
| Before the Fire | Faktor risiko, gambut, proses sebelum kebakaran; pemahaman | Nama dan ID saja; belum ada simulasi gambut |
| Make It Personal | Cerita masyarakat/ranger/pegiat; kedekatan emosional | Nama dan ID saja; belum ada cerita |
| Take Action | Learn, Check, Share, Join, Invite; partisipasi sesuai kapasitas | Nama dan ID saja; belum ada alur aksi |
| Show Your Action | Challenge Instagram/TikTok dan Wall of Action; engagement/advocacy | Nama dan ID saja; belum ada demo UGC |
| Stay in the Movement | Hubungan lanjutan dengan MoNa | Nama dan ID saja; belum ada CTA |

Tabel 3.1 berada di halaman PDF 19. Penjelasan keenam bagian berlanjut sampai halaman 22. Before the Fire menjadi pembeda utama kampanye; visual pohon harus mendukung pemahaman pencegahan tersebut.

## Materi sosial, engagement, dan evaluasi yang harus tetap terbawa

Proposal bagian 3.2 (halaman PDF 24–30) menetapkan:

- Instagram dan TikTok sebagai kanal terpadu menuju website.
- Tiga pilar: Kenapa Bisa Jadi Api?, Dari Lapangan, Kamu Bisa Apa?.
- Video 30–60 detik, hook 3 detik pertama, satu pesan utama, 3 video per minggu dipakai di kedua platform dengan penyesuaian caption/interaksi.
- Instagram: carousel 5–7 slide, 2 carousel per minggu, Story hampir setiap hari, polling/kuis/pertanyaan, highlight kampanye dan collab.
- Rancangan pengelolaan komunitas: respons maksimal 24 jam hari kerja, jawaban berbasis sumber, penanganan kritik/misinformasi, dan rangkuman pertanyaan mingguan. Ini rencana operasional proposal, belum layanan yang tersedia pada prototipe.
- Contoh brief carousel 6 slide 4:5 dan video 35–45 detik 9:16 menggunakan analogi spons untuk gambut. Klaim ilmiah dalam contoh tetap memerlukan pemeriksaan sumber sebelum masuk UI.

Bagian 3.3 (halaman PDF 30–42) mencakup baseline-target-evaluation, GA4/UTM untuk kontribusi sosial dan CTA, Search Console untuk pencarian, serta native analytics Instagram/TikTok. Target mencakup pertumbuhan 20%, Instagram ER minimal 0,40%, TikTok ER minimal 5,5%, social referral minimal 3%, conversion minimal 5%, 100 UGC/penggunaan hashtag, dan 100 aksi terukur. Ini target proposal, bukan hasil kampanye. Proposal membedakan like rate Instagram dan observable ER TikTok dari engagement yang lengkap.

Matriks evaluasi: berhasil bila target tercapai minimal 100%, perlu optimasi 80–99%, belum berhasil di bawah 80%. Indikator yang lebih baik bila turun, seperti bounce rate, memerlukan definisi penghitungan pencapaian sebelum matriks diterapkan. Klik CTA dan penyelesaian aksi tidak boleh disamakan tanpa definisi event.

Materi tutor menetapkan Week 12 website, Week 13 minimal dua sosmed, Week 14 community engagement, dan UAS distribusi/evaluasi. Mockup dan simulasi diperbolehkan dengan disclaimer. Executive summary 3–5 halaman memuat permasalahan, solusi, kesimpulan, link hasil; dikumpulkan maksimal H-1 presentasi lewat Drive kelas. Belum ada hasil Figma, mockup sosial, engagement, atau executive summary yang ditemukan dalam proyek.

## Arsitektur yang sudah ada

Alur aplikasi: main.tsx → App → SiteHeader + ImmersiveIntro → LivingTreeExperience → TreeCanvas (lazy) → TreeScene → TreeModel, EnergyFlow, CameraRig, TreeLighting, ForestEnvironment, ForestDetails; Disclaimer ditampilkan setelah main.

- React 19.3.1, TypeScript 6.0.3, Vite 8.3.6, Three.js 0.187.0, R3F 9.8.2 terpasang. Drei 10.7.9 terpasang tetapi tidak ditemukan penggunaannya dalam source.
- Pohon dibuat secara prosedural menggunakan spline CatmullRomCurve3, akar, batang dan percabangan bertingkat. Daun menggunakan instancing; jumlah nominal daun 355 ranting × 44 = 15.620.
- Tekstur bark dimuat dari public/assets/textures/bark. Normal map 1024 × 1024 dibuat di CPU lewat canvas saat inisialisasi.
- EnergyFlow menggunakan satu Points dengan shader dan data lintasan dalam Float32 DataTexture; 9.500 partikel mengikuti permukaan kurva akar/batang/cabang. Jalur tiap cabang terpisah, sehingga tidak otomatis berarti satu partikel menelusuri seluruh jaringan akar hingga tajuk.
- Lingkungan mencakup tanah prosedural, 12 pohon latar berinstansi, 1.800 daun lantai, pakis, titik kanopi, fog, dan bidang sinar.
- Kamera memiliki parallax teredam, amplitudo terbatas, serta framing berbeda untuk lebar di bawah 700 px.
- useSceneActivity menggabungkan preferensi reduced motion, jeda manual, intersection visibility, dan document visibility. Canvas berganti always/demand; animasi menggunakan refs/uniforms.
- Ada Suspense, error boundary, fallback teks, dan penanganan context lost. Belum ada gambar fallback atau retry eksplisit.
- TreeScene mencatat metrik lokal ke dataset canvas pada mode dev dan menurunkan DPR sekali bila rata-rata FPS di bawah 42. Belum ada bukti angka pengukuran tersimpan atau pilihan Low/Balanced/High untuk pengguna.
- GSAP, Zustand, routing, audio, test runner, backend, autentikasi, dan database belum diimplementasikan. Ini tidak otomatis merupakan masalah; beberapa memang menunggu fase berikutnya.

## Kondisi milestone

PROJECT_STATUS masih mencatat Phase 0 belum dimulai dan build belum pernah dijalankan. README masih bawaan Vite; README_PACK masih menyatakan paket belum berisi source website. Ketiganya tertinggal dari isi repo.

Penilaian berdasarkan source: fondasi Phase 0 sudah ada, Tree Core Phase 1 sebagian besar sudah memiliki implementasi, dan partikel/atmosfer Phase 2 sudah dikerjakan. Fase-fase itu belum dapat dinyatakan lulus acceptance karena kontrol kualitas, QA browser/mobile dan profiling belum dibuktikan. Jangan menafsirkan keberadaan kode sebagai persetujuan gate.

Phase 3 state sehat → risiko → terbakar → reset belum ada. Phase 4 narasi bertahap, skip/replay, audio dan hotspot belum ada. Phase 5 keenam section belum ada. Phase 6 meditations hanya memiliki .gitkeep. Phase 7 QA belum lengkap. Phase 8 handoff akademik belum ditemukan.

## Hal yang perlu diselaraskan sebelum dilanjutkan

1. Durasi: tabel pelaksanaan sosial di halaman PDF 29–30 sampai minggu 8; measurement/evaluasi di halaman 30 dan 40–41 menggunakan enam minggu. Master sudah mencatat konflik ini. Belum ada keputusan memilih salah satu.
2. Data website audit halaman 15 dan baseline halaman 31 berbeda; proposal menjelaskan periode berbeda. Jangan mencampur atau membandingkan langsung.
3. Instagram: Bab I menyebut 742 dan 810 likes (halaman 8); measurement memakai 742 dan 284 (halaman 33–34). Gambar measurement kedua juga berbeda. Pastikan identitas unggahan dan periode sebelum menyebutnya sebagai pasangan baseline yang sama.
4. TikTok: Bab I mencatat 5.957 followers (halaman 7), measurement sekitar 5.966 (halaman 36). Sampel awal enam unggahan dan audit 18 konten unik juga berbeda. Ini perlu diberi tanggal dan cakupan, bukan langsung dianggap satu dataset atau pasti salah.
5. Daftar pustaka halaman 46–47 belum memuat semua rujukan di tubuh proposal, termasuk DataIndonesia/Jakpat, Rival IQ dan @wirilett. Referensi gambar klaim 99% pada bagian strategi juga perlu dirapikan: narasi menunjuk Gambar 1.2, sedangkan pembahasan unggahan Instagram 19 September berada pada Gambar 1.4.
6. Bab IV menyebut pilar Jawab Kamu, sedangkan tabel pilar 3.3 hanya memuat tiga pilar lain. Tentukan apakah ini format respons lintas pilar atau pilar tambahan ketika laporan direvisi.
7. Header hero kini serif Georgia; master mengusulkan display condensed bold. Palet scene #07100e juga memberi nuansa hijau gelap. Penyimpangan arah visual ini belum dijelaskan di decision log; tidak diubah pada audit pembacaan ini.
8. Provenance tekstur menjelaskan ImageGen, prompt, tanggal dan sumber lokal. Itu membantu jejak asal; registry seluruh aset/lisensi belum tersedia. Metadata tersebut bukan bukti izin resmi WWF ataupun verifikasi hak seluruh aset.
9. Fallback menyatakan cerita pencegahan tetap bisa dibaca, tetapi saat ini belum ada artikel/section pencegahan selain copy pembuka. Klaim fallback perlu diselaraskan dengan konten aktual saat implementasi berikutnya.
10. State, hotspot, audio dan kontrol yang belum ada harus tetap dicatat sebagai rencana; jangan menampilkannya sebagai fitur selesai dalam demo/laporan.

## Hasil verifikasi pada audit ini

| Perintah | Hasil |
|---|---|
| npm run lint | Lulus, exit 0 |
| npm run typecheck | Lulus, exit 0 |
| npm run build | Lulus, exit 0; peringatan ukuran chunk |
| npm ls --depth=0 | Lulus; dependency utama terpasang |
| Test unit/E2E | Tidak ada script/test suite proyek yang ditemukan; tidak dijalankan |

Build: CSS 4,76 kB (gzip 1,79 kB), JS utama 225,95 kB (gzip 71,14 kB), TreeCanvas 935,90 kB (gzip 248,92 kB). Vite memperingatkan chunk di atas 500 kB. Ini ukuran build, bukan ukuran keseluruhan unduhan maupun hasil profiling FPS.

Working tree sejak awal telah berisi perubahan dan file untracked. Audit ini tidak melakukan commit, reset, atau penimpaan kode pengguna. Build memperbarui dist dan cache kompilasi; bahan ekstraksi/render pembacaan disimpan di tmp/pdfs. Dokumen audit ini merupakan satu-satunya tambahan dokumentasi final; PROJECT_STATUS dan DECISION_LOG tidak diubah karena belum ada implementasi atau keputusan ruang lingkup baru.

## Urutan lanjutan yang disarankan

Mulai dari menyelaraskan status/README dengan kenyataan, lalu menguji dan menutup acceptance Phase 1–2: visual desktop/mobile, jeda/reduced motion, context failure, kualitas grafis, dan profil FPS/p95. Setelah core stabil, kerjakan Phase 3–4 sebagai demo utuh masuk → pohon hidup → hotspot → risiko → pencegahan. Baru kemudian Phase 5 keenam section, fitur tambahan dan handoff akademik. Tidak perlu membangun ulang proyek dari scaffold.

Cara mengulang pemeriksaan teknis: jalankan npm run lint, npm run typecheck, npm run build dari root. Untuk QA interaksi berikutnya, jalankan npm run dev lalu uji lewat browser; audit ini belum mencatat hasil QA tersebut.
