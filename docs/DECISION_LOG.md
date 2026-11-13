# DECISION LOG — SEBELUMJADIAPI

| Date | Decision | Source | Status |
|---|---|---|---|
| 2026-11-09 | Dedicated campaign hub, not full WWF redesign | S1 UTS proposal | Active |
| 2026-11-09 | Six sections from Table 3.1 remain mandatory | S1 UTS proposal | Active |
| 2026-11-09 | Figma entry flow uses WWF screenshot and new menu item beneath Nature X Youth | User design brief | Active |
| 2026-11-09 | Original 3D tree experience with black-dominant palette | User creative brief | Superseded: hero cinematic 2.5D, lihat keputusan terbaru |
| 2026-11-09 | First deliverable coded vertical slice; backend deferred | User brief | Active |
| 2026-11-09 | Meditations as additional optional feature, not replacement for S1 | User brief + S1 | Active |
| 2026-11-13 | Background audio persistence for `forest`, `jejak kehidupan`, and `before-the-fire` | User brief | Active |

## Unresolved

- Campaign timing discrepancy in UTS proposal: 6 weeks vs 8-week phases.
- Final legal/brand clearance if demo is made public.
- Source data and media asset licenses.
- Final level of Figma mockup interactivity needed for grading.

## Background Audio Persistence — 13 November 2026
Sesuai instruksi spesifik pengguna, audio dari folder `forest`, `jejak kehidupan`, dan `before-the-fire` tetap menyala tanpa jeda saat pengguna beralih tab (misalnya ke Instagram, TikTok), meminimalkan jendela, atau melakukan Alt+Tab. Folder selain ketiga kategori tersebut (khususnya `meditations`) tetap menerapkan jeda saat tab tidak terlihat (`document.hidden`). Tidak ada fitur, teks, visual, atau kompresi aset yang diubah.

## Keputusan hero terbaru — 9 November 2026

Permintaan eksplisit pengguna menggantikan arahan hero procedural 3D pada master: hero utama kini cinematic 2.5D berbasis LANDING SCREEN.png, dengan hutan hasil inpainting, pohon dan foliage ber-alpha, parallax teredam, interactive lighting dan atmosfer. Source procedural lama tidak lagi diimpor oleh hero aktif. Tidak ada orbit 360 derajat. HTML tetap terpisah dari shader. Enam section dan status akademik tetap berlaku; persetujuan WWF tidak diasumsikan.

## Penyederhanaan hero — 9 November 2026
Permintaan eksplisit terbaru pengguna menggantikan kewajiban label/disclaimer pada tampilan hero, footer, tombol jeda dan pilihan kualitas dalam master. Elemen tersebut dilepas dari UI tanpa mengubah proyek menjadi kanal resmi WWF. Hero memakai satu kualitas medium yang lebih lembut; reduced motion OS dan penghentian render ketika tersembunyi tetap berlaku. Jalur redundan dikurangi dan cahaya kiri atas dibuat responsif terhadap pointer.

## Koreksi sumber cahaya — 9 November 2026
Pengguna menolak bercak shadow shader. Pengurangan hotspot dilakukan pada aset background melalui edit/inpainting, tanpa mengubah layer pohon atau jalur UV. Shader tidak lagi menggelapkan area kiri; hanya menambahkan pantulan positif saat kursor mendekat.

## Home, Meditations, dan Jejak Kehidupan — 9 November 2026
Permintaan eksplisit pengguna membuka milestone audio dan Meditations sekarang, menggantikan urutan milestone awal pada master. Navigasi tepat tiga menu memakai hash route. Hero 2.5D beserta renderer, aset dan interaksinya dipertahankan. Home memakai playlist empat file asli secara berurutan dan opt-in. Satu elemen audio dipakai bersama dengan Meditations; pergantian halaman/episode menghentikan sumber sebelumnya.

Meditations memiliki lima episode tetap, player dari metadata asli, sidebar hover/focus dan toggle touch, serta lima background ImageGen orisinal dengan overlay dan cross-dissolve. Konfigurasi episode terpusat di src/content/meditations.ts; aset di public/assets/images/meditations/. Label audio netral karena jenis mix/narator belum diverifikasi dengan mendengarkan keseluruhan file. Jejak Kehidupan HOLD: hanya placeholder, konsep cursor hutan sehat/terbakar dicatat untuk masa depan, belum diimplementasikan. Enam section kampanye tetap kewajiban lanjutan, bukan digantikan halaman ini.

## Narasi Meditations — 9 November 2026
Sesuai permintaan pengguna, deskripsi lama dan label player berulang dilepas. Intro kini membaca field intro dari sumber JSON pengguna. Intro berpindah menjadi mini player hanya sesudah event playing, bukan sekadar klik. Layar teks menggunakan satu cue aktif yang dicari dari currentTime media; pause menghentikan fade dan gerak, seek memilih interval secara langsung, dan akhir episode menawarkan pilihan berikutnya tanpa autoplay.

Tidak ada waktu cue yang dikarang. Seluruh 254 cue sumber masih UNALIGNED dengan start/end null; kecocokan teks JSON dengan DOCX telah diuji. Audit ASR lokal memproses lima MP3 penuh dan mendeteksi narasi Indonesia, namun hasilnya belum ditinjau sebagai forced alignment final. Peace menunjukkan versi ringkas yang berbeda dari naskah panjang DOCX. Mode produksi memakai status singkat dan Baca naskah manual sampai kecocokan audio, durasi, metadata peninjauan, dan seluruh cue valid. Hasil ASR mentah tidak diimpor oleh renderer. Hero Home, playlist empat track, dan status HOLD Jejak Kehidupan dipertahankan.

## Otomatisasi cue narasi
Atas instruksi eksplisit pengguna, data hasil faster-whisper word timestamps dapat aktif dengan status AUTO_ALIGNED setelah validasi struktural. Status ini berbeda dari VERIFIED yang memerlukan metadata peninjauan manusia; tanggal/reviewer tidak dibuat-buat. Intro tanpa nomor/emosi/headphone. Audio, aset hero Home dan Jejak Kehidupan tidak diganti.

## Home tanpa tombol sound — 9 November 2026
Permintaan eksplisit pengguna menggantikan kontrol opt-in Home dalam rencana sebelumnya: tombol Sound ON/OFF dihapus; playlist dicoba otomatis ketika memasuki Home. Jika autoplay ditolak browser, interaksi pointer/keyboard di Home mencoba kembali tanpa menampilkan kontrol baru. Listener dilepas dan audio berhenti saat meninggalkan Home; retry tidak dapat memulai sumber Meditations. Saat tab disembunyikan, audio dijeda; kembali terlihat hanya melanjutkan otomatis jika sumber aktif masih Home. Kebijakan autoplay browser tetap berlaku.
Scroll cue SEBELUM JADI API di bawah lead dihapus. Lead kini: Apa yang bisa kita jaga sebelum jadi api?

Volume Home dinaikkan dari 0,24 menjadi 0,65 untuk keempat track sesuai permintaan pengguna; level Meditations tetap independen. Fade awal/akhir dipertahankan.

Koreksi teks editorial pengguna diprioritaskan terhadap ejaan ASR. Overlay koreksi terpisah melindungi hasil peninjauan naskah dari regenerasi; koreksi tidak mengganti audio atau membuat ulang waktu cue.
Penutup visual khusus Hope ditambahkan sesuai permintaan pengguna: Pray For Indonesia dengan bendera, enam detik sebelum Episode selesai. Tidak menambah audio atau mengubah timestamp narasi.
Permintaan terbaru mengganti urutan Home 1→2→3→4: pembuka Motunui Forest - Island Pulse 1, lalu lima lagu lain acak. Posisi disimpan per sesi tab sehingga berpindah situs/halaman dapat dilanjutkan; sesi tab baru memulai pembuka. Volume Home 65% dipertahankan.
Revisi urutan Home: Motunui Forest - Island Pulse 1 wajib dilanjutkan Motunui Forest - Island Pulse 2. Setelah kedua pembuka selesai, empat file Landing page diputar acak tanpa pengulangan beruntun. Penyimpanan posisi sesi dan volume tetap berlaku.
Atas permintaan pengguna, header menampilkan aset logo WWF yang disediakan pengguna di sebelah kiri #SebelumJadiApi. Logo asli tidak dimodifikasi; status proyek akademik dan tidak adanya klaim afiliasi resmi tetap berlaku.

## Why It Matters di Jejak Kehidupan — 9 November 2026
Brief eksplisit terbaru menggantikan status HOLD Jejak hanya untuk bagian Why It Matters (master 8.1). Lima bagian lain tetap rencana. Implementasi memakai CSS/React dengan gambar orisinal, hotspot dan sumber primer; tidak menambah backend atau renderer WebGL. Before the Fire ditampilkan sebagai bab mendatang tanpa kontrol palsu. Angka luas kebakaran hanya boleh ditambahkan setelah periode, wilayah dan definisinya diverifikasi. Status akademik dan logo asli dipertahankan; tidak ada klaim persetujuan WWF.

## Scrollytelling menggantikan panel utama Why It Matters
Permintaan eksplisit terbaru mengutamakan storytelling pinned, perubahan komposisi/mask organik, dan satu jembatan satwa. Implementasi tab editorial lama tidak lagi dipasang pada halaman utama; modulnya tetap tersedia tanpa mengubah Home/Meditations. Hotspot menjadi eksplorasi tambahan. Visual satwa generatif dilabeli interpretasi artistik. Before the Fire hanya diperkenalkan lewat pertanyaan dan status bab mendatang.

## Prioritas kelancaran dan koreksi visual pengguna
Permintaan terbaru menggantikan morph polygon scroll dengan compositing dua layer yang lebih ringan. Zoom dan reveal tetap tersedia pada hotspot, dipicu aktivasi pengguna. Orangutan kini bagian cerita 02, bukan jembatan ke 03. Visual manusia/asap serta gambut/karbon dibuat khusus. Caption penyangkalan visual di UI dihapus sesuai instruksi eksplisit pengguna yang mengungguli ketentuan label visual berulang; provenance edukatif tetap disimpan sebagai metadata proyek. Sumber dan footer status akademik dipertahankan. Panah scroll/cue dan scrollbar kolom narasi dilepas.

Keputusan tampilan sumber dan eksplorasi: daftar sumber tersendiri tidak lagi dipasang karena rujukan tersedia per materi. Eksplorasi hutan selalu terbuka, sesuai instruksi pengguna terbaru; menggantikan keputusan disclosure opsional sebelumnya. Data sumber tetap dipelihara di konfigurasi konten.

## Before the Fire: puncak visual skenario — 9 November 2026
Instruksi terbaru menggantikan status rencana section kedua dengan implementasi sekarang. Urutan sehat → kering → risiko penyalaan → api → gosong adalah skenario ilustratif, bukan jalur yang selalu terjadi. Akhir kehilangan total hanya berlaku pada visual skenario ini. GSAP/ScrollTrigger ditambahkan sesuai permintaan; tidak menambah engine 3D. WebGL kecil dibutuhkan untuk reveal kondisi awal dan penggabungan cutout tanpa mengulang mask CSS besar yang sebelumnya menyebabkan keluhan framing. Sumber fakta per materi, penampang gambut kualitatif dan opt-in audio dipertahankan. Empat section berikutnya tetap menunggu lingkup tersendiri.

## Satwa menapak dan kontrol kiri — 10 November 2026
Permintaan terbaru mengganti pose duduk yang terlihat ditempel dengan cutout fotorealistis bertumpu pada tanah, serta pose terbaring utuh tanpa luka/darah pada fase Kehilangan. Keduanya gambar generatif orisinal untuk skenario yang sudah berlabel, bukan dokumentasi satwa nyata. Foreground menutupi bagian bawah satwa; gerak mengikuti bidang akar, bukan parallax DOM terpisah.
Tombol scene berada di kiri dengan bentuk glass oval. Dengarkan suasananya dihapus. Aturan audio opt-in dengan tombol tersendiri dalam keputusan sebelumnya digantikan musik yang mengikuti section, mencoba otomatis sesuai kebijakan browser dan mencoba kembali saat interaksi pengguna. Mesin audio tunggal, jeda saat tersembunyi/keluar, dan isolasi Home/Meditations tetap berlaku. Tidak ada izin WWF yang diasumsikan.

## Rangkaian satwa pada lima fase — 10 November 2026
Pengguna meminta satwa juga terlihat pada Mengering, Berisiko dan Terbakar. Ini menggantikan keputusan sebelumnya yang memudarkan satwa hidup sebelum api. Dipakai tiga pose orisinal tambahan dengan identitas dan kontak tanah yang sama, menuju pose kehilangan non-grafis yang sudah ada. Seluruh urutan tetap skenario ilustratif; tidak menyatakan semua satwa mengalami urutan biologis ini. Pergantian pose memakai dissolve singkat mengikuti posisi scroll, dengan dua pose aktif maksimal dan pose penuh ketika navigasi langsung selesai.
Lima kontrol fase dipindah ke area atas di bawah judul, berbentuk oval yang dapat diklik. Garis progress dihapus sesuai instruksi eksplisit terbaru. Tidak mengubah Why It Matters, Home, Meditations, sumber fakta atau perilaku audio yang sudah disetujui.

Audio Jejak terbaru menggantikan soundtrack sintetis dan autoplay section: kontrol Sound on/off diminta kembali. Tidak membuat cue sebelum kalibrasi audio aktual; guided dan seek fase masih pending.

Instruksi terbaru menggantikan opt-in Jejak: tanpa tombol sound, playback otomatis sesuai bab dengan fallback kebijakan browser. Posisi ambience disimpan untuk kembali ke bab sebelumnya.

Cleanup audio harus memeriksa kepemilikan sumber. Penghentian global saat memasuki Jejak dihapus karena membatalkan playback dari efek anak.

Navigasi eksplisit ke Jejak memprioritaskan play dalam gesture pengguna: transisi sumber Home/Meditations dilakukan segera dengan fade-in; transisi antar bab Jejak tetap fade-out/fade-in. Tidak menambah tombol atau instance audio.

Cleanup Jejak memakai lease lifecycle agar StrictMode tidak membatalkan playback. Tidak mematikan StrictMode dan tidak memakai polling/retry berulang untuk menutupi race.

Brief terbaru membuka step 03 Make It Personal. Pilihan editorial memakai satu dokumentasi kota Pekanbaru dan tiga perspektif fakta WHO, tanpa mengarang profil masyarakat/ranger. Foto maksimum tiga bukan kewajiban tiga. Tidak membangun The Prevention Lab; pertanyaan akhir hanya jembatan. Bab personal sunyi, menggantikan kelanjutan soundtrack Before di seluruh sisa halaman.

Permintaan eksplisit terbaru membatasi dokumentasi Make It Personal ke 2026, menggantikan pilihan arsip 2015. Digunakan foto Medan Oktober 2026 dengan kredit CC BY-SA 4.0; tidak mengganti tanggal pada foto lama.

Instruksi terbaru membuka The Prevention Lab sebagai penguat kampanye di antara step 03 dan step 04. Menggunakan gradient ringan dan konten resmi terverifikasi; tidak mengubah enam bagian wajib. Take Action hanya titik transisi, tidak diimplementasikan. Audio tetap mengikuti mode sunyi Make It Personal.

Permintaan terbaru mengesampingkan palet hijau untuk Prevention Lab: gunakan hitam netral, gading dan emas terbatas. Revisi ini hanya mengubah presentasi/naskah fitur Lab, tanpa fitur atau sumber baru.

Instruksi terbaru menggantikan pengantar dan disclaimer UI Lab dengan label Simulasi keputusan yang menjelaskan jenis interaksi. Metadata edukasi dan sumber tetap berlaku. Tidak menambah navigasi Take Action karena section tersebut belum tersedia.

Pengguna menolak judul penutup lama; instruksi terbaru menggantikan copy Pencegahan dimulai sebelum ada nyala dengan Kurangi risiko kebakaran dari sumbernya. Tidak mengubah isi skenario, sumber atau navigasi.

Instruksi terbaru membuka step 04 Take Action sesudah Lab. Join merujuk informasi relawan/MoNa resmi tanpa mengarang rekrutmen atau kemitraan. Copy/share memakai sumber publik agar penerima tidak mendapat tautan localhost. Step 05 hanya penanda; footer tetap akhir.

Instruksi terbaru membuka implementasi akhir step 05 dan 06. Wall of Action memakai tiga contoh editorial berlabel Simulasi konten kampanye, tanpa peserta/unggahan/metrik palsu. Posting dilakukan pengguna di platform, bukan dikirim prototipe. Finale menuju MoNa resmi dan tidak menambah audio; aset sehat memakai gambar orisinal yang telah ada. Keenam section wajib tetap utuh, Lab tetap tambahan.

Instruksi eksplisit terbaru menghapus tiga teks UI Show Your Action: penjelasan tautan platform, badge Simulasi konten kampanye, dan paragraf konsep kurasi. Ini menggantikan kewajiban badge/paragraf UI sebelumnya. Isi setiap contoh tetap diawali Contoh konten, tanpa identitas atau klaim unggahan asli.

Permintaan terbaru mengganti headline finale menjadi Jangan berhenti di scroll terakhir. Subteks dan CTA MoNa dipertahankan.

10 November 2026: pengguna secara eksplisit meminta hosting dan publikasi seluruh website. Dipublikasikan melalui Sites dengan audience public; identitas project disimpan di .openai/hosting.json. Sumber publikasi disiapkan terpisah dari dokumen kerja, cache/model dan data audit. Pemisahan kode per halaman mengurangi unduhan awal tanpa mengubah desain.

## Revisi interaksi empat bagian Jejak — 12 November 2026

Brief Overview Take Action dan instruksi terbaru memperbarui Prevention Lab, Take Action, Show Your Action dan Stay in the Movement. Meteran menggambarkan progres misi dan diberi label simulasi. Wall of Action menghitung janji yang dibuat di browser tersebut. Formulir email berfungsi sebagai demo penyimpanan lokal. Tautan sosial dan webinar yang belum diberikan memakai tombol dengan status “Tautan menyusul.” MoNa berada di bagian penutup. Revisi ini ditinjau di lokal dan menunggu persetujuan pengguna sebelum push atau hosting.

Revisi visual berikutnya menempatkan interaksi 3D pada Kartu Janji di bagian 05. Cek fakta, menjaga air gambut, dan berbagi informasi masing-masing memakai ilustrasi baru yang berbeda. Bagian 06 mempertahankan visual hutan penutup dan memakai foto statis di setiap kartu dengan tepi kaca serta bayangan. Tautan yang masih menunggu tetap menampilkan status saat dipilih.

Permintaan eksplisit pengguna (12 November 2026): menerapkan arsitektur kartu 2.5D berlapis + kemiringan 3D lembut + kilap kaca saat hover/hold pada kartu Bagikan Satu Fakta (Air, Bara, Hotspot) dan Kartu Penjaga Gambut (lima template: Kanopi, Arus, Serat, Fajar, Rintik); mengganti tampilan hitungan misi/tanggal pada Kartu Penjaga Gambut dengan peran dan narasi cerita tiap template; menyertakan file gambar PNG kartu saat berbagi ke WhatsApp (Web Share API Level 2 pada perangkat pendukung serta salin/unduh PNG otomatis pada desktop); menyelaraskan gaya bahasa komunikasi publik pada Bagikan Satu Fakta, Ikut Kegiatan, dan Tantang Temanmu (placeholder "Mis. Cornelish atau Inayah"); mengganti foto AI Volunteer dan foto Earth Hour sebelumnya dengan dua foto dokumentasi resmi langsung dari halaman wwf.id/id/id/volunteer dan wwf.id/id/act/campaign/earth-hour (dengan kredit WWF Indonesia dan Dika Yudha Rio serta catatan di provenance.json bahwa pemakaian ini berdasarkan permintaan eksplisit tugas akademik tanpa klaim afiliasi atau izin komersial tertulis dari WWF); serta mengaktifkan tautan resmi Instagram dan TikTok kampanye (`@wwf_1ndonesia`) pada bagian 05 dan 06.

Permintaan eksplisit pengguna (lanjutan 12 November 2026):
1. Menghapus baris `"Demo lokal. Email tidak dikirim."` di bagian 06 (`Ikuti kabarnya`) agar pengalaman berlangganan terasa utuh tanpa catatan demo lokal di UI.
2. Menghapus teks teknis `"Konversi WebP; crop responsif dan overlay tampilan, tanpa edit generatif."` di tampilan `03 / Make It Personal` sambil mempertahankan keterangan lokasi, fotografer, dan lisensi CC BY-SA 4.0 serta metadata teknis proyek.
3. Membangun ulang penuh sub-bagian **"Jelajahi keterhubungan hutan"** (`01 / Why It Matters`): memisahkan total materi dari `ForestStory` agar tidak mengulang narasi dampak kebakaran yang sudah dibahas di atasnya, menghadirkan 4 bagian yang saling menjaga secara berurutan (`01 Tajuk Pohon` → `02 Burung Rangkong` → `03 Akar & Jamur Tanah` → `04 Air Gambut`) bersumber FAO, serta menciptakan 18 aset visual WebP baru (9 aset kondisi utuh + 9 aset kondisi rusak di `public/assets/images/why-it-matters/ecosystem/`). Atas umpan balik lanjutan pengguna (12 November 2026): (a) menghapus seluruh kotak keterangan bawah di atas kanvas foto dan mengunci rasio 16:9 serta titik koordinat kondisi utuh `(23,28)`, `(61.5,16.5)`, `(27,66)`, `(54,86)` dan kondisi rusak `(35,20)`, `(82.5,21)`, `(20,68)`, `(58,84)` dengan spesifisitas CSS penuh agar titik dan label tidak pernah saling menimpa atau bergeser saat di-hover; (b) mengunci tinggi kartu kanan (`.why-info-panel`) sama persis dengan tinggi kanvas foto 16:9 (`height: 0; min-height: 100%; max-height: 100%`) dan memberi `flex: 1; min-height: 0; overflow-y: auto` pada `.why-detail-card`, menghapus perubahan teks hover dinamis, serta mematikan seluruh animasi `pulseRing`/`why-breathe` dan efek `translateY`/`scale` saat hover/hold agar kartu dan frame tidak pernah berdenyut atau membesar-mengecil; (c) membedakan penuh visual panggung, *cutout* 2.5D, serta seluruh narasi *storytelling* (`brokenRole`, `brokenTitle`, `brokenLead`, `detailBroken`, `brokenBridgeText`, `brokenIndicators`) antara mode **Saat Hutan Utuh** dan **Jika Satu Bagian Rusak**; (d) mengganti aksen hijau bertitik dengan warna *charcoal* gelap netral dan gading hangat (`#eeebdf`) pada permukaan kartu timbul datar (*elevated cards*, bukan 3D); (e) menghapus seluruh tulisan `"Lapisan 01/02..."`, istilah kaku seperti `"Koridor terbang..."`, dan kalimat ber-strip (`—`), serta menyederhanakan subjudul di bawah judul utama; (f) merapikan `src/features/why-it-matters/SourceLink.tsx` menjadi satu baris tanpa teks `(tab baru)`; dan (g) di `04 / Take Action`, menghubungkan tombol **Lihat jadwal webinar** ke `https://www.instagram.com/wwf_id?dlrf=MWRyN21qbzJlZHRocw==` tanpa panah `↗`, menghubungkan tombol **Contoh informasi di Instagram** (`campaignLinks.checkPost`) ke unggahan resmi `@wwf_id` (`https://www.instagram.com/p/DfZwRZ3kwrM/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==`), serta mengubah placeholder nama teman pada **Tantang Temanmu** menjadi `"Misal : nayezz"`. Target publikasi statis diarahkan ke proyek Netlify `benevolent-conkies-27cf08.netlify.app` yang terhubung ke `sebelumjadiapi.my.id`.
4. Mengganti khusus visual latar belakang keempat tahap cerita utama `01 / Why It Matters` (`ForestStory`) menjadi komposisi 2.5D tiga bidang (`back`, `mid`, `front` + parallax pointer & scroll) beserta animasi atmosferik per tahap tanpa mengubah satu huruf pun pada teks, judul, sumber, maupun navigasi cerita: (a) `01 Tanah dan air` menampilkan daerah tangkapan hujan, aliran sungai hutan, serta tebing akar/lumut penyaring air dengan animasi aliran sungai dan kabut lembah (menghilangkan gambar lama yang memuat orangutan pada tahap air); (b) `02 Satwa dan habitat` menampilkan lanskap hutan pascakebakaran yang hangus berasap dengan satu orangutan penyintas di bidang depan tanpa duplikasi orangutan kecil di latar belakang; (c) `03 Manusia dan udara` menampilkan perahu warga di Sungai Kapuas yang diselimuti kabut asap lintas wilayah dengan animasi kabut asap bergerak; dan (d) `04 Iklim dan karbon` menampilkan penampang rawa gambut dan simpanan karbon akar bawah permukaan dengan animasi kilau muka air tanah serta gelembung karbon mikro.
5. Di bagian `05 / Show Your Action` (area aksi lapangan), menampilkan 3 kartu berjejer ke samping kanan yang memanggil langsung (*live embed* via endpoint `/p/{shortcode}/embed/` tanpa mengunduh aset lokal) tiga unggahan resmi Instagram `@wwf_id` (`Dfl2ALSlBIr`, `DfZwRZ3kwrM`, `DfOU2JFE5wo`) disertai keterangan satu kalimat singkat di bawah tiap kartu.
6. Atas permintaan eksplisit pengguna (12 November 2026), mengaktifkan sistem penyimpanan bersama (*shared real-case*) untuk **Wall of Action** di bagian `05 / Show Your Action` agar janji yang dibuat oleh pengguna dapat dilihat secara nyata oleh pengguna lain lintas akun, browser, dan perangkat melalui endpoint `/api/pledges` (middleware Vite + Netlify Function + Netlify Blobs store `site:wall/pledges`). Ini memperbarui pembatasan penyimpanan lokal per-perangkat sebelumnya khusus untuk fitur Wall of Action sesuai instruksi eksplisit terbaru.
7. Atas permintaan eksplisit pengguna (12 November 2026), membangun ulang visual 2.5D tahap `01 Tanah dan air` dan `04 Iklim dan karbon` pada `01 / Why It Matters` (`ForestStory`) menggunakan aset baru yang belum pernah dipakai di bagian lain dengan objek utama yang ditonjolkan di bidang depan (`stage-01-front.webp`: tebing tanah, akar banir, lumut, dan aliran air terjun yang tersaring; `stage-04-front.webp`: penampang *split-level* kubah gambut dengan akar banir dan kantong semar di atas muka air serta lapisan gambut purba dan kantong karbon berpendar di bawah air), tanpa mengubah `02 Satwa dan habitat`, `03 Manusia dan udara`, maupun komponen atau kualitas aset lainnya.
8. Atas permintaan eksplisit pengguna (12 November 2026), merombak penuh visualisasi 2.5D mode **Jika Satu Bagian Rusak** pada bagian **Jelajahi keterhubungan hutan** khususnya untuk **02 Burung Rangkong**, **03 Akar & Jamur Tanah**, dan **04 Air Gambut** dengan 6 aset 16:9 baru yang memisahkan warna latar (dingin/gelap *soft-focus*) dan objek depan (hangat/kontras tinggi) agar visualisasi yang dibahas langsung menonjol dan tidak menyatu, sekaligus meringkas seluruh teks penjelasan di kartu sebelah kanan (`01 Tajuk Pohon` hingga `04 Air Gambut`, baik saat hutan utuh maupun saat rusak) menjadi kalimat pendek *to the point* agar tidak terlalu padat.
9. Atas permintaan eksplisit pengguna (12 November 2026): (a) mengubah misi **02 / CHECK — Cek Sebelum Percaya** (`MissionPanels.tsx`) menjadi simulasi interaktif 2.5D **"Bedah Postingan Viral"** (tiga titik bedah fakta: Sumber, Waktu, dan Arti Hotspot di atas kartu 2.5D berlapis `check-viral-back/mid/front.webp`) dengan bahasa singkat, bersih, dan tidak kaku; serta (b) mengaktifkan penyimpanan cloud bersama (`/api/newsletter` via Netlify Blobs `site:wall/newsletter`) dan umpan balik konfirmasi yang jelas pada formulir email **Ikuti kabarnya** di `06 / Stay in the Movement` (`StayInMovement.tsx`).
10. Atas permintaan eksplisit pengguna (12 November 2026), menggantikan mode sunyi dari `03 / Make It Personal` hingga akhir (`06 / Stay in the Movement`) dengan tepat 3 lagu berurutan (`1. Motunui Forest Flow.mp3`, `2. Swaying Motunui Woods.mp3`, `3. Nusantara Forest - Harmoni Rimba.mp3`) tanpa menambahkan musik lain pada rentang tersebut. Perubahan belum di-push ke production sesuai instruksi sebelumnya.
