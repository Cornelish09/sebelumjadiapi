# SEBELUMJADIAPI — MASTER PROJECT BLUEPRINT

> **Project codename:** `SEBELUMJADIAPI`  
> **Document version:** 1.0 — baseline perencanaan, 9 November 2026  
> **Product type:** prototipe akademik Digital Public Relations / immersive campaign microsite  
> **Reference organization:** WWF Indonesia (`https://www.wwf.id/id`)  
> **Audience:** Gen Z, publik umum, mahasiswa  
> **Primary language:** Bahasa Indonesia; English hanya jika terjemahan telah ditinjau  
> **Owner of design/build:** developer proyek; deployment dan klaim afiliasi resmi memerlukan persetujuan organisasi  
> **Development posture:** frontend-first, no complicated backend, content-driven, accessible and progressively enhanced.

---

## 0. BACA INI DAHULU — KONTRAK PROYEK

### 0.1 Satu kalimat produk

**#SebelumJadiApi adalah prototipe kampanye Digital PR interaktif tentang pencegahan kebakaran hutan dan lahan (karhutla), yang mengubah informasi WWF Indonesia menjadi pengalaman edukasi sinematik berbasis cerita, pohon 3D interaktif, visualisasi kondisi gambut, audio atmosferik, hotspot, keputusan pengguna, serta ajakan partisipasi.**

### 0.2 Prioritas yang tidak boleh dibalik

1. **Kesesuaian dengan dua PDF acuan akademik**: semua enam bagian Campaign Hub tetap lengkap, tujuan PR tetap jelas.
2. **Ketepatan pesan**: pencegahan karhutla, bukan sekadar eksplorasi kehancuran atau menampilkan api.
3. **UI/UX orisinal dan berkualitas**: hitam dominan, fotografi/visual ekologis, pohon hidup dan partikel cahaya, immersive cinematic editorial, bukan template dashboard AI generik.
4. **Interaksi sungguhan**: kontrol kamera/parallax, hotspot, audio opt-in, transisi keadaan pohon, kuis, CTA; tanpa backend wajib.
5. **Performa + aksesibilitas**: target terasa mulus; ada fallback bila perangkat tidak kuat; tidak menjanjikan nol frame drop di semua perangkat.
6. **Kode mudah dibaca dan dirawat**: pembagian folder per domain/fitur, konten terpisah, komentar sewajarnya dalam Bahasa Indonesia, panduan bagi orang nonteknis.
7. **Aset legal, data bersumber, status akademik transparan**: jangan menyamar sebagai situs WWF resmi.

### 0.3 Definisi selesai

Proyek dianggap selesai sebagai **prototype akademik** bila pengunjung dapat melalui alur **masuk → memahami penyebab/risiko → terhubung dengan cerita manusia → memilih aksi → melihat partisipasi → diarahkan pada gerakan berkelanjutan**, dan semua kontrol yang terlihat penting benar-benar melakukan sesuatu (atau terang-terangan diberi label simulasi/tautan keluar).

**Bukan target:** membangun situs resmi baru untuk WWF, melakukan transaksi/donasi, memaksakan akun/login, membuat platform GIS operasional, membangun AI prediksi tanpa data yang tervalidasi, atau meluncurkan kampanye nyata atas nama WWF.

---

## 1. ACUAN WAJIB, JEJAK SUMBER, DAN BATAS KLAIM

### 1.1 Sumber primer yang diberikan pengguna

| Kode | Dokumen | Lokasi paling relevan | Status |
|---|---|---|---|
| S1 | `UTS PR Digital - NGO - WWF Indonesia.pdf` | Bab I (masalah komunikasi), Bab III §3.1–3.1.1 dan Tabel 3.1 (halaman cetak 14–22), §3.2 (kanal sosmed), §3.3 (measurement), Bab IV | **Wajib** |
| S2 | `Tutor Digi PR - Mock Up Website dan Sosmed.pdf` | Slide 2 (Week 12–14), 3 (Executive Summary), 4–6 (mockup, disclaimer, tools) | **Wajib** |
| S3 | Screenshot WWF Indonesia dari pengguna | homepage + dropdown `AKSI`, kategori `Kampanye`, posisi `Nature X Youth` | Referensi **entry flow visual** |
| S4 | Screenshot Of the Oak dari pengguna | pohon interaktif, titik hotspot, panel informasi, scroll prompt | Referensi **mekanisme pengalaman**, bukan aset untuk disalin |
| S5 | Diskusi visi pengguna | hitam dominan, 3D, tree-of-life visual, partikel mengalir, audio, meditasi, teks muncul satu per satu, pohon hidup → berisiko → terbakar, dokumentasi rapi | **Persyaratan kreatif** |

Jika menggunakan paket ZIP pendamping, dua PDF asli ada di `references/academic/` dan screenshot acuan ada di `references/screenshots/`. File ini **referensi penelitian/design**, bukan aset yang boleh dipakai mentah-mentah pada website publik.

### 1.2 Ketentuan dari S2 (jangan diubah)

- **Week 12:** mockup website organisasi sesuai ide yang sudah dibahas pada proposal UTS.
- **Week 13:** mockup konten untuk **minimal dua media sosial**, sesuai ide proposal UTS. Proyek ini memilih Instagram dan TikTok sesuai S1.
- **Week 14:** mockup program community engagement digital, misalnya kuis/challenge; boleh bersifat simulasi, **disclaimer wajib**.
- **UAS:** distribusi serta evaluasi mockup website dan media sosial.
- **Executive Summary:** **3–5 halaman**, berisi *Permasalahan, Solusi, Kesimpulan, Link Hasil Eksekusi*, dikumpulkan **maksimal H-1 sebelum presentasi** melalui Google Drive kelas.
- Jangan mengusulkan fitur yang sudah dijalankan organisasi sebagai seolah-olah hal baru; nilai tambah di sini adalah penyatuan alur, penjelasan interaktif, partisipasi, dan pengalaman baru.
- Materi tutor memperbolehkan Figma, Wix, Canva; **tidak mewajibkan backend maupun coding produksi**.

### 1.3 Tujuan dan struktur dari S1 (jangan diubah)

- Masalah: informasi karhutla tersebar; format teknis; komunikasi cenderung satu arah; kesempatan dialog/partisipasi belum optimal menurut audit proposal.
- Sasaran: Gen Z.
- Tema kampanye: **`#SebelumJadiApi`**, dengan pesan **"Karhutla tidak dimulai ketika hutan sudah terbakar. Ia dimulai jauh sebelumnya."**
- Format solusi: **dedicated campaign page / campaign hub** yang secara konseptual terintegrasi dengan website WWF, **bukan redesign seluruh situs WWF**.
- Website berfungsi sebagai pusat informasi; Instagram dan TikTok untuk awareness, dialog, penjangkauan, lalu membawa orang menuju website.
- Alur PR: **awareness → engagement → participation → action**, dengan gerakan berkelanjutan melalui MoNa.
- Enam section WAJIB dari **Tabel 3.1 S1**: `Why It Matters`, `Before the Fire`, `Make It Personal`, `Take Action`, `Show Your Action`, `Stay in the Movement`.

### 1.4 Titik yang belum diputuskan / perlu verifikasi sebelum mengklaim

- Dokumen S1 memiliki **ketidakkonsistenan durasi**: tahapan media sosial sampai Minggu 8, tetapi bagian pengukuran menggunakan enam minggu. **Jangan otomatis menyatukan; tandai untuk konsultasi.**
- Estimasi traffic website WWF di bagian audit dan baseline measurement berasal dari pengukuran berbeda. **Jangan campur metrik atau menyatakan angka sebagai kondisi live saat ini.**
- Angka KPI di S1 (misal pertumbuhan 20%, conversion 5%, target 100 UGC) adalah **sasaran proposal**, bukan capaian yang terbukti.
- Konten cerita ranger/masyarakat dan foto satwa memerlukan sumber asli, izin, dan atribusi; jangan mengarang testimoni yang tampak faktual.
- Belum ada instruksi eksplisit bahwa tugas harus berupa website full-coded. **Coded prototype ini adalah peningkatan mandiri yang sengaja dipilih developer.**

### 1.5 Rujukan teknis publik untuk tim dev (cek versi saat implementasi)

- WWF brand guidelines: `https://wwf-brand.azurewebsites.net/brand-guidelines/brand-elements/` — fondasi hitam/putih; warna pendamping fleksibel; logo tidak boleh dimodifikasi.
- GSAP ScrollTrigger: `https://gsap.com/docs/v3/Plugins/ScrollTrigger/`
- GSAP matchMedia: `https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/`
- React Three Fiber: `https://r3f.docs.pmnd.rs/getting-started/introduction`
- React Three Fiber performance: `https://r3f.docs.pmnd.rs/advanced/scaling-performance`
- Three.js InstancedMesh: `https://threejs.org/docs/pages/InstancedMesh.html`
- Three.js responsive rendering: `https://threejs.org/manual/pages/responsive.html`
- WWF Indonesia: `https://www.wwf.id/id`
- MoNa: `https://membership.wwf.id/id`
- Acuan visual, **tidak untuk dicopy**: `https://oftheoak.co.uk/`.

---

## 2. PRODUK DAN STRATEGI DUA JALUR

### Jalur A — Figma/mockup akademik (prioritas deliverable Week 12)

1. Screenshot halaman asli WWF sebagai **konteks**; tidak perlu membuat ulang seluruhnya.
2. Screenshot dropdown `AKSI` yang sesuai screenshot pengguna.
3. Pada kolom **Kampanye**, tambahkan item baru **`#SebelumJadiApi` tepat di bawah `Nature X Youth`**.
4. Buat hotspot Figma pada item tersebut, hubungkan ke frame kampanye.
5. Tambahkan frame kampanye utama, beberapa state interaksi (pohon hidup / risiko / terbakar, panel hotspot), dan tampilan mobile.
6. Item menu WWF lain boleh berupa navigasi keluar ke situs resmi jika memungkinkan; jangan memalsukan navigasi yang dianggap berfungsi. Untuk presentasi, jelaskan bahwa di luar campaign hub adalah out of scope.
7. Cantumkan disclaimer prototipe akademik pada frame masuk dan footer.

**Catatan:** screenshot/susunan ulang tampilan WWF hanya untuk demonstrasi akademik yang jelas diberi label, bukan publikasi seolah-olah merepresentasikan situs resmi.

### Jalur B — Website asli yang berjalan di browser (prioritas teknis developer)

- **Core 3D scene dulu**, baru integrasikan ke full campaign hub, lalu handoff ke Figma melalui screenshots/video/keyframes jika dibutuhkan.
- Harus berjalan **localhost** dan dapat dipublikasi sebagai **prototype independen** apabila sudah lolos pemeriksaan legal, teknis, aksesibilitas, dan disclaimer.
- Tidak ada ketergantungan pada API WWF atau sistem internal mereka.
- Coded site **bukan klon pixel-perfect Of the Oak**; ia punya konsep dan aset orisinal, serta identitas visual terinspirasi brand WWF.

### Posisi AFTERFIRE

`AFTERFIRE` adalah ide cadangan / referensi kedalaman storytelling dan dampak ekologi. **Bukan nama proyek utama.** Fokus judul dan pesan tetap `#SebelumJadiApi` serta **pencegahan**, bukan prediksi kebakaran.

---

## 3. TUJUAN, AUDIENS, PESAN, DAN BRAND POSITIONING

### Goals

- Mengubah pengetahuan yang tersebar menjadi alur edukasi yang mudah diikuti.
- Membantu Gen Z membedakan **penyebab/faktor risiko → upaya pencegahan → tindakan yang realistis dilakukan**.
- Menyediakan media dialog dan ajakan partisipasi yang masuk akal tanpa mendorong orang menangani api sendiri.
- Memberi pengalaman belajar yang berkesan melalui visual 3D, audio, interaksi, dan narasi berbasis sumber.
- Menjaga kredibilitas WWF sebagai **organisasi acuan**, tanpa mengklaim proyek ini dibuat atau disetujui WWF.

### Pengguna dan perangkat

- **Utama:** Gen Z Indonesia, desktop/laptop dan smartphone.
- **Sekunder:** dosen/asdos sebagai evaluator; publik umum.
- **Kebutuhan akses:** pengguna tanpa mouse, pengguna dengan motion sensitivity, pengguna yang mematikan audio, dan perangkat tanpa WebGL.

### Pesan inti (editorial)

1. "Sebelum api terlihat, risiko dapat terbentuk lebih dahulu."
2. "Gambut, habitat, dan manusia saling terhubung."
3. "Mencegah bukan pekerjaan yang dilakukan setelah hutan terbakar."
4. "Ada tindakan nyata yang relevan dengan kapasitas publik."

**Larangan:** narasi menyalahkan satu individu pengguna sebagai penyebab karhutla hanya karena kursor menyentuh pohon; menggambarkan faktor kebakaran sebagai satu sebab tunggal; mengklaim interaksi virtual = prediksi ekologis.

---

## 4. ART DIRECTION — DEEP BLACK, WWF-ALIGNED, ANTI-GENERIC

### 4.1 Creative statement

**`BLACK FOREST / BEFORE THE IGNITION`**: sebuah dunia gelap yang hening, pohon ekologis orisinal hidup melalui rangkaian partikel cahaya, lalu perlahan memperlihatkan perubahan kondisi lingkungan saat pengguna mengeksplorasi risiko. Tipografi editorial dan informasi ilmiah tetap paling mudah dibaca.

### 4.2 Palet kerja (proposal, BUKAN kode warna resmi WWF)

| Token | Hex | Penggunaan |
|---|---|---|
| `bg.base` | `#070808` | Latar mayoritas pengalaman, **hitam dominan** |
| `bg.elevated` | `#101312` | Panel, overlay, navigation |
| `bg.paper` | `#F4F2EC` | Bagian khusus agar kontras bercerita lebih kuat |
| `text.primary` | `#F8F8F4` | Heading dan body di latar gelap |
| `text.muted` | `#A8B2AA` | Meta dan deskripsi sekunder |
| `brand.yellow` | `#E5C93D` | Aksen navigasi terinspirasi WWF screenshot |
| `brand.orange` | `#D98230` | Aksen tombol / penanda tindakan |
| `nature.green` | `#426B4D` | Keadaan pohon sehat |
| `nature.glow` | `#B8DCAD` | Partikel biologis bercahaya |
| `risk.amber` | `#E0A54C` | Keadaan rawan (warning) |
| `fire.ember` | `#F06A37` | Bara dan risiko visual (jangan dominan) |
| `fire.char` | `#34201B` | Tekstur sisa pembakaran |
| `ui.stroke` | `#303532` | Divider dan border halus |

**Ketentuan:** menggunakan hitam dan putih sebagai fondasi WWF; kuning/oranye mengikuti nuansa screenshot pengguna, tetapi warna kerja ini **bukan klaim palet resmi**. Uji contrast ratio sebelum dipakai untuk teks.

### 4.3 Tipografi dan komposisi

- Gunakan **display condensed bold** untuk judul kampanye yang punya kekuatan visual; satu **sans-serif terbaca** untuk body; maksimal 2 keluarga font utama.
- Lisensi font harus jelas; jangan mengekstrak font proprietary dari website WWF atau Of the Oak.
- Hero boleh pakai teks skala besar, tetapi body tetap mudah dibaca dan tidak bergerak terus-menerus.
- Lebih banyak ruang negatif; tidak pakai grid tiga kartu seragam untuk semua bagian.
- Foto/3D menjadi objek narasi, bukan wallpaper di balik tulisan.
- Hitam dipakai sebagai **kedalaman suasana**, bukan alasan mengurangi keterbacaan.

### 4.4 Anti-AI-slop contract

**HINDARI:** generik `hero kiri + ilustrasi 3D kanan + 3 benefit cards`; neon/glow di semua sudut; glassmorphism generik; animasi masuk seragam pada setiap konten; random floating icons; headline klise tanpa riset; fake statistics; icon pack tanpa kesatuan gaya; image AI yang diklaim dokumentasi nyata.

**WAJIB:** composition deliberate, narrative pacing, art direction konsisten, motion bercerita, satu visual signature kuat, konteks sumber setiap fakta, test desktop + mobile, empty/loading/error/fallback state jelas.

### 4.5 Inspirasi, bukan penyalinan

- Mekanisme inspirasi: *Of the Oak* (pohon utama, node interaktif, panel detail, scroll discovery).
- Nuansa inspirasi: pohon bercahaya biologis berpartikel mengalir seperti imajinasi "pohon jiwa".
- **Jangan menyalin** karakter/setting/pohon Eywa atau Omatikaya, siluet persis, model, musik, gambar, layout, teks, scene, maupun aset dari *Avatar* atau *Of the Oak*.
- Buat desain **orisinal** bernama sementara **`Pohon Penjaga / The Living Witness`**, dari spesies atau kombinasi bentuk pohon tropis yang dikaji dan diberi label stylized; bukan mengklaim spesies biologis tertentu bila model tidak akurat.

---

## 5. PENGALAMAN UTAMA — THE LIVING WITNESS TREE

### 5.1 Konsep signature

Satu pohon besar di pusat scene 3D gelap. Akar, batang, cabang, daun, serta partikel bioluminescent membentuk **peta kehidupan**. Pengunjung mendengar ambience jika mengaktifkannya, mengikuti kalimat naratif satu per satu, menggerakkan kursor secara halus, dan menjelajahi hotspot untuk memahami hubungan pohon, gambut, satwa, lingkungan, dan upaya pencegahan.

**Bukan** game aksi kebakaran; ini instalasi edukasi yang mengundang eksplorasi.

### 5.2 Scene states (wajib)

| State | Visual | Audio | Konten / arti |
|---|---|---|---|
| `HEALTHY` | Daun hijau gelap, energi partikel mengalir dari akar ke cabang, kabut rendah, cahaya tenang | Hutan hidup, serangga/angin lembut (opt-in) | Ekosistem dan relasinya |
| `AT_RISK` | Daun lebih kusam, beberapa aliran energi melemah, suasana amber, tekstur gambut mengering (ilustrasi) | Ambience berubah, penanda halus | Faktor risiko sebelum api |
| `BURNING` | Bara dan nyala selektif muncul, daun/tajuk berubah secara terkendali, asap terbatas, tanpa flash agresif | Layer crackle jika audio aktif | Skenario dampak, **simulasi ilustratif** |
| `RECOVERY/RESET` | Scene kembali sehat melalui kontrol reset/rewind; tidak mengklaim regenerasi alami berlangsung seketika | Crossfade kembali ambience | Fasilitas mengulang penjelasan, **bukan simulasi waktu pemulihan** |

### 5.3 Aturan interaksi kursor dan sentuhan

- Gerak pointer → **camera parallax halus** + sedikit sway dari cabang/partikel; tidak memutar pohon terlalu ekstrem.
- Hover area hotspot → node bercahaya, label ringkas terlihat, cursor state berubah; **keyboard focus dan tap harus bisa memicu hal yang sama**.
- Permintaan kreatif pengguna “pohon terbakar saat cursor menyentuh bagian tertentu” **harus tersedia sebagai interaksi khas desktop**: ketika cursor memasuki `risk hotspot` dan berhenti sejenak (mis. 300–500 ms untuk mencegah salah picu), jalankan visual `HEALTHY → AT_RISK → BURNING` secara sinematik. Ini adalah **skenario ilustratif yang dipicu hover**, bukan klaim bahwa sentuhan memicu kebakaran nyata. Pada perangkat touch/keyboard, tombol/focus + aktivasi menghasilkan transisi setara. Sediakan mode alternatif `click-to-explore`, `Reset`, `Pause Motion`, dan jangan trigger ulang tanpa cooldown.
- Bila pointer keluar dari area aktif, state tidak boleh berkedip/perulang tiba-tiba; gunakan debouncing/cooldown.
- Pengguna bisa `Replay`, `Reset`, `Skip Intro`, `Pause Motion`, `Mute`, dan memilih kualitas grafik.
- Semua interaksi memiliki feedback visual + status ARIA ketika sesuai.

### 5.4 Flowing energy particles

- Partikel cahaya **mengikuti kurva akar/batang/cabang**, tidak random bergerak seperti salju.
- Gunakan `CatmullRomCurve3` / data spline sebagai lintasan ide; sampling kurva dan shader GPU/instancing bila perlu.
- Kecepatan bertingkat: lambat saat `HEALTHY`, tersendat saat `AT_RISK`, sebagian berubah menjadi bara saat `BURNING`.
- Partikel muncul natural, beragam ukuran/alpha, tidak menghapus bentuk pohon.
- Tidak semua partikel diberi mesh sendiri; hindari ratusan draw call.
- Boleh menerapkan visualisasi energi imajinatif, **jelas sebagai metafora artistik, bukan proses biologis yang benar-benar terukur**.

### 5.5 Hotspots (minimum implementasi 5)

| ID | Area / tema | Konten | Hubungan dengan bagian wajib |
|---|---|---|---|
| `forest` | Kanopi — kehidupan hutan | Peran tajuk dan relasi ekosistem | Why It Matters |
| `wildlife` | Cabang — habitat satwa | Gambar satwa dari sumber sah; ancaman habitat sesuai fakta | Why It Matters / Make It Personal |
| `peat` | Akar — tanah gambut | Kondisi dan risiko gambut, ilustrasi penampang | Before the Fire |
| `people` | Sekitar akar — masyarakat | Cerita bersumber tentang pencegahan dan asap | Make It Personal |
| `prevention` | Titik cahaya — aksi pencegahan | Learn, Check, Share, Join, Invite | Take Action |

**Perilaku hotspot:** klik/focus → kamera/panel bergerak elegan; ada judul, paragraf singkat, ilustrasi dengan kredit, sumber, `Back`/`Close`, dan indikasi bahwa bagian ini interaktif.

### 5.6 Teks muncul satu per satu (narrative sequence)

- Ada subtitle yang terstruktur sebagai array chapter/line, bukan string hardcode dalam komponen.
- Transisi teks: opacity/translate/blur kecil, bukan typewriter berlebihan.
- Teks boleh mengikuti scroll atau tombol `Lanjut`; pembaca selalu bisa melewati sequence.
- Jangan mengunci pembaca di intro lebih dari yang perlu, apalagi saat `prefers-reduced-motion` aktif.
- Contoh **copy konseptual, tidak mengandung fakta statistik**:
  1. “Sebelum api terlihat…”
  2. “ada perubahan yang sering tak kita sadari.”
  3. “Di bawah tanah, ada cerita yang jarang terdengar.”
  4. “Apa yang bisa kita lakukan, sebelum jadi api?”
- Setiap bab narasi punya tujuan PR, durasi maksimum yang nyaman, dan transisi ke kontrol eksplorasi.

---

## 6. AUDIO EXPERIENCE + MEDITATIONS (INOVASI TAMBAHAN)

### Prinsip global audio

- **Default: OFF**. Audio baru diputar setelah tindakan eksplisit pengguna (`Enable Sound`).
- Kontrol suara selalu terlihat: toggle, volume, pause. Tidak ada musik tiba-tiba.
- Pilih rekaman **asli atau berlisensi**; simpan metadata lisensi dan atribusi.
- Pengguna yang mematikan suara tetap mendapat informasi melalui teks/caption. Jangan membuat audio sebagai satu-satunya jalur informasi.
- Hindari bass berlebihan, jumpscare, suara ledakan keras, dan crossfade agresif.
- Perpindahan scene menggunakan crossfade audio; tab tidak aktif → turunkan/pause audio sesuai aturan preferensi.

### Folder khusus `meditations/` (WAJIB dipisah)

`Meditations` adalah pengalaman opsional ala *nature listening*, **bukan isi wajib dari S1**. Namanya boleh `Dengar Hutan` pada UI agar relevan bagi Gen Z.

**Tiga mode awal (opsional sebagai konten demo):**

1. `Hutan yang Bernapas` — 60–120 detik suasana alam, teks tenang tentang kehidupan ekosistem.
2. `Dengarkan Gambut` — audio + ilustrasi gambut, menekankan bahwa kondisi tanah penting bagi risiko karhutla.
3. `Sebelum Asap` — meditasi singkat diakhiri ajakan memahami tindakan pencegahan.

**Aturan mode:** play/pause, mute, exit, subtitle/transkrip penuh, no forced autoplay, tidak menjanjikan efek psikologis atau terapeutik. Konten yang meniru suara alam harus jujur tentang rekaman asli vs audio desain sintetis.

---

## 7. ARSITEKTUR INFORMASI — ENAM SECTION WAJIB + PENGALAMAN TAMBAHAN

> Semua enam section S1 harus tampil dalam informasi kampanye, meskipun UI memungkinkan eksplorasi nonlinier melalui hotspot.

| Urutan naratif | Section | Fungsi komunikasi menurut S1 | UI yang direncanakan |
|---|---|---|---|
| Prelude | Immersive Tree Opening | Pengantar kreatif tambahan | `LivingWitnessScene`, audio opt-in, sequential copy |
| 01 | **Why It Matters** | Awareness tentang dampak | Data cards editorial, story panel, forest/habitat nodes, sumber |
| 02 | **Before the Fire** | Penyebab, faktor risiko, gambut, proses pra-kebakaran | `PeatlandExplainer`, slider kondisi, risk state, guided explainer |
| 03 | **Make It Personal** | Kedekatan emosional dengan masyarakat/ranger | Documentary carousel, profil sumber, audio-caption, human story |
| 04 | **Take Action** | Aksi pencegahan yang sesuai kapasitas audiens | Interactive decision flow, pilihan `Learn / Check / Share / Join / Invite` |
| 05 | **Show Your Action** | UGC, advocacy, engagement | `WallOfAction` demo + aturan partisipasi/tagar |
| 06 | **Stay in the Movement** | Hubungan jangka panjang | CTA ke MoNa / kanal resmi + penutup sinematik |
| Bonus A | `Dengar Hutan / Meditations` | Pendalaman pengalaman dan empati | Soundscape interaktif mandiri |
| Bonus B | `Forest Explorer / Tree Hotspots` | Edukasi interaktif lintas section | Overlay 3D; tiap node mengarah ke section wajib |
| Bonus C | `Sources & Method` | Transparansi informasi | Daftar sumber + label simulasi + disclaimer |

**Ketentuan IA:** bonus tidak boleh memindahkan enam section wajib ke tempat tersembunyi atau membuatnya tidak bisa diakses tanpa animasi 3D.

---

## 8. SPESIFIKASI FITUR PER SECTION (ACCEPTANCE + CONTENT)

### 8.1 Why It Matters — `features/why-it-matters/`

**Harus ada:** dampak karhutla terhadap lingkungan, satwa, masyarakat, dan iklim; fakta ringkas terverifikasi; sumber dan periode data; hubungan dengan tujuan pencegahan.

**UI:** data editorial, reveal perubahan visual yang halus, hotspot satwa, kartu fakta yang bisa diklik untuk membuka sumber. Boleh ada statistik, **jangan hardcode angka tanpa metadata data**.

**Acceptance:** pengguna nonteknis bisa menyebut minimal dua dampak; ada tautan sumber; teks terbaca tanpa animasi.

### 8.2 Before the Fire — `features/before-the-fire/`

**Harus ada:** penyebab/faktor risiko; pentingnya gambut; proses kondisi sebelum kebakaran; cara mencegah.

**UI:** `PeatlandCrossSection`, `MoistureStateSlider` (ilustratif), `WhatChangesPanel`, visual risk warning. Tampilkan tiga state minimal: basah → mengering → berisiko. Skenario API hanya menunjukkan dampak, bukan prediksi.

**Acceptance:** pengunjung paham hubungan kondisi gambut dengan kerentanan (sesuai sumber); label ilustrasi selalu terlihat; semua kontrol berfungsi di desktop, keyboard, dan touch.

### 8.3 Make It Personal — `features/make-it-personal/`

**Harus ada:** cerita manusia dari sumber yang dapat diperiksa; dampak terhadap kehidupan sehari-hari; tone empatik dan tidak eksploitatif.

**UI:** horizontal cinematic story carousel, foto berizin, kutipan teratribusi; fallback demo dengan teks `ilustrasi naratif` bila belum ada sumber autentik.

**Acceptance:** tidak ada kesan testimoni rekaan berasal dari ranger WWF; carousel keyboard-friendly, tidak otomatis bergeser saat orang membaca; kontrol manual tersedia.

### 8.4 Take Action — `features/take-action/`

**Harus ada:** lima jalur aksi eksplisit dari S1 — `Learn`, `Check`, `Share`, `Join`, `Invite` — yang masuk akal untuk Gen Z.

**UI:** `DecisionLab`: kartu skenario hipotetis, pilihan pengguna, feedback dengan alasan + sumber, tombol `Share fact` atau `Explore official information`.

**Safety:** tidak memberi instruksi menangani kebakaran langsung bagi publik. Untuk keadaan darurat, rujuk lembaga resmi yang relevan dan nomor yang diverifikasi jika akan ditampilkan.

**Acceptance:** tiap aksi menghasilkan feedback jelas; quiz tidak menyebut jawaban pengguna sebagai diagnosis risiko lingkungan; share hanya membagikan tautan atau teks terverifikasi.

### 8.5 Show Your Action — `features/show-your-action/`

**Harus ada:** konsep partisipasi publik/UGC melalui `#SebelumJadiApi`, koneksi Instagram/TikTok, `Wall of Action` yang terkurasi sesuai proposal.

**UI:** masonry/story carousel dengan konten **demo berlabel**; CTA ke kampanye simulasi atau kanal resmi sesuai status; area aturan partisipasi, etika konten, dan moderasi.

**Acceptance:** tidak mengklaim pengguna asli sudah berpartisipasi; tidak mengarang jumlah UGC; tidak menampilkan foto/username asli tanpa hak; tidak membuat tombol `Upload` seolah menyimpan data kalau backend belum ada.

### 8.6 Stay in the Movement — `features/stay-in-movement/`

**Harus ada:** CTA keterlibatan lanjutan menuju **MoNa (Members of Nature)** atau kegiatan WWF yang relevan, sesuai S1.

**UI:** finale: pohon 3D menjadi tenang, teks ajakan, tombol `Kenali MoNa` (tautan eksternal diverifikasi), `Explore again`, `Bagikan Kampanye`.

**Acceptance:** CTA eksternal benar; disclaimer terlihat; `Explore again` me-reset experience tanpa reload paksa bila memungkinkan.

### 8.7 Bonus — `Meditations`, `Forest Explorer`, `Source Explorer`

Semua fitur bonus harus memiliki fallback tanpa audio / WebGL, tidak menggantikan bagian wajib, dan berfungsi sebagai peningkatan pemahaman atau pengalaman; bukan sekadar dekorasi.

---
## 9. USER JOURNEY DAN KONTROL NAVIGASI

### 9.1 Jalur utama (harus bisa didemonstrasikan)

```text
Referensi homepage WWF (hanya Figma/screenshot)
└─ AKSI > Kampanye > Nature X Youth > #SebelumJadiApi (item baru)
   └─ Campaign Hub / Immersive Entry
      ├─ [Mulai Jelajah] / [Aktifkan Suara] / [Lewati Intro]
      ├─ Living Witness Tree (3D + hotspot)
      │  ├─ [Eksplorasi habitat]
      │  ├─ [Lihat kondisi gambut]
      │  ├─ [Dengarkan hutan]
      │  └─ [Lihat skenario risiko]
      ├─ Why It Matters
      ├─ Before the Fire
      ├─ Make It Personal
      ├─ Take Action
      ├─ Show Your Action
      └─ Stay in the Movement
         ├─ [Kenali MoNa] (external)
         ├─ [Bagikan tautan prototype]
         └─ [Jelajahi lagi]
```

### 9.2 Navigasi global

- Brand label `#SebelumJadiApi` terlihat, dengan keterangan proyek akademik pada posisi yang wajar.
- Menu: `Cerita`, `Sebelum Api`, `Jejak Kehidupan`, `Ambil Aksi`, `Gerakan`.
- Kontrol global: `Sound`, `Motion`, `Graphics quality`, `Sources`.
- Pada desktop: navigasi minimal, sticky seperlunya, progress chapter indikator boleh.
- Pada mobile: menu drawer yang jelas, tombol cukup besar, tanpa mengandalkan hover.
- `Escape` menutup dialog; `Tab` menjalankan kontrol; `Enter/Space` mengaktifkan hotspot.
- Browser Back tidak membuat pengalaman hilang atau canvas stuck.

### 9.3 Struktur visual prioritas

- **Prelude:** sedikit teks, paling artistik, fokus pohon 3D.
- **Why It Matters:** editorial dan data, lapang, tidak semua konten berupa card.
- **Before the Fire:** paling interaktif dan edukatif; jangan dikalahkan oleh prelude.
- **Make It Personal:** karusel dokumenter terkontrol, penghargaan pada subjek manusia.
- **Take Action:** transisi dari rasa kagum → pilihan nyata.
- **Show Your Action:** partisipasi, bukan leaderboard palsu.
- **Stay in the Movement:** ending tenang, CTA jelas, harapan tanpa klaim berlebihan.

---

## 10. MOTION DESIGN BLUEPRINT

| Motion | Trigger | Tujuan | Batasan |
|---|---|---|---|
| Intro opacity / masked reveal | Pengunjung masuk | Pembukaan naratif | Ada skip; durasi tidak berlebihan |
| Tree breathing/sway | Loop saat terlihat | Memberi kesan hidup | Amplitudo kecil, stabil |
| Energy flowing along splines | Loop saat terlihat | Memperlihatkan koneksi kehidupan | Batch GPU, pause saat tidak terlihat |
| Mouse parallax | Pointer bergerak | Kedalaman interaktif | Damping + clamp, tidak ubah React state setiap frame |
| Hotspot glow/pulse | Focus/hover | Affordance interaksi | Tidak memakai animasi terus menerus untuk semua titik |
| Tree state morph | Kontrol state / risk hotspot | Menjelaskan skenario | Teks interpretasi ilmiah tetap ada |
| Fire glow/embers | `BURNING` | Dramatisasi dampak | Hindari flashes, seizure risk, dan volumetric effects berlebihan |
| Caption-by-caption | Scroll/Next | Keterbacaan cerita | Manual mode + akses teks lengkap |
| Documentary carousel | Panah/swipe/tombol | Memahami cerita manusia | Tidak auto-advance selagi sedang dibaca |
| Finale transition | Akhir journey | Mengikat pesan | Ajakan jelas, bukan modal pengganggu |

**Hierarki gerakan:** 1 motion signature yang besar pada pohon, 2–3 motion pendukung, dan mikrointeraksi. Hindari membuat semua konten bergerak hanya agar terlihat canggih.

### Motion state protocol

```text
idle → intro → explore → focus_hotspot → compare_risk → conclusion
                ↘ meditations (opsional) ↗
```

- Simpan state terpusat sesuai kebutuhan (mis. Zustand), jangan menyebarkan boolean yang saling bertentangan.
- Animasi yang berubah saat user klik harus dapat dihentikan/diulang.
- Cleanup GSAP timelime, event listener, audio object, dan disposals Three.js saat komponen unmount.
- Perubahan viewport/`prefers-reduced-motion` harus mengubah interaksi secara benar, bukan sekadar menyembunyikan elemen.

---

## 11. STACK TEKNOLOGI — REKOMENDASI RESMI PROYEK

**Rute teknis yang dipilih untuk POC visual:**

| Layer | Teknologi | Status | Mengapa |
|---|---|---|---|
| Dev server/build | **Vite** | Default | Cepat untuk iterasi frontend dan scene WebGL |
| UI | **React 19 + TypeScript** | Default | Organisasi komponen, typing, kontrol interaksi |
| 3D | **Three.js + React Three Fiber 9** | Default | Scene 3D dalam React; versi utama cocok dengan React 19 menurut docs R3F |
| 3D helpers | **@react-three/drei** | Default | Orbit/control helpers, HTML anchor, loaders, asset preloading |
| Motion | **GSAP + ScrollTrigger** | Default | Scroll-driven storytelling dan transisi DOM |
| State | **Zustand** | Jika perlu | Simpan `treeState`, `audioEnabled`, `qualityPreset`, `activeHotspot` |
| CSS | **CSS Modules + CSS variables** | Default | Mudah dibaca dan mencegah konflik gaya |
| Sound | **HTMLAudioElement / Web Audio API** | Default | Opt-in soundscape, crossfade; tidak perlu Howler dulu |
| Routing | **React Router** | Jika perlu | Untuk halaman `meditations` / sumber terpisah |
| Validation | **Vitest, Testing Library** | Setelah POC | Logika dan komponen interaktif |
| Browser E2E | **Playwright** | Setelah POC | Klik, screenshot, keyboard, mobile, integrasi |
| Model authoring | **Blender → glTF/GLB** | Jika asset custom | Model pohon orisinal |
| Source data | **Local JSON/TS** | Default | Tidak butuh database untuk mockup |
| Hosting | Static hosting dengan SPA fallback | Nanti | Deploy hanya setelah QA/legal review |

**Tidak perlu untuk POC awal:** Next.js, Laravel, server Python, PostgreSQL, Supabase, login, microservices, ML model, CMS berat, IoT, WebSocket, atau API live berbayar. Jangan tambah hanya karena terlihat canggih.

**Perhatian versi:** library cepat berubah; Codex harus memeriksa dokumentasi kompatibilitas dan `npm` dependency tree terkini saat setup. Jangan asal `--force` bila versi React/R3F/Drei tidak kompatibel.

### 11.1 Garis batas JS/React vs Three.js

- **React DOM:** teks, tombol, heading, artikel, peta sumber, panel info, caption, CTA, disclaimer, audio control, carousel, quiz.
- **R3F Canvas:** pohon, akar, tajuk, material, partikel, kabut, cahaya, transformasi kamera, visual fire.
- **Shared state:** hanya parameter eksplorasi lintas UI dan scene (`healthy`, `risk`, `burning`, hotspot aktif, intensitas audio).
- **Frame loop:** mutation ke refs/uniforms GPU; **jangan** `setState()` per frame untuk posisi pointer atau partikel.
- **GSAP:** timeline DOM/scroll; jangan membuat dua animation loop berebut property transform yang sama.

### 11.2 Performa mulai dari strategi 3D sederhana

1. POC pertama gunakan geometry sederhana dan rough material agar interaksi terbukti.
2. Tambahkan model custom yang sudah dioptimasi; hindari aset puluhan MB untuk above-the-fold.
3. Partikel menggunakan `Points`, `BufferGeometry`, shaders, atau instancing, **bukan mesh individual untuk setiap butiran**.
4. Gunakan texture compression jika pipeline mendukung, mipmaps yang benar, lazy-loading, dan asset preloading terukur.
5. Batasi pixel ratio secara adaptif, buat preset `Low / Balanced / High`.
6. Canvas/WebGL pause atau throttle saat dokumen/tab tidak terlihat.
7. Profiling GPU/CPU dengan browser devtools; jangan mengoptimalkan hanya berdasarkan perkiraan.
8. Sediakan fallback still image/short optimized loop untuk perangkat tanpa WebGL.

---

## 12. STRUKTUR FOLDER — RAPI, BERDASARKAN FITUR, MUDAH HANDOFF

**Ini struktur target.** Pada tahap awal Codex cukup membuat folder yang sedang dibutuhkan; folder kosong boleh ditambahkan `.gitkeep`. Jangan membuat ratusan file kosong dengan kode palsu.

```text
sebelumjadiapi/
├── AGENTS.md                         # aturan penting yang dibaca Codex
├── README.md                         # cara menjalankan untuk pemula (Indonesia)
├── package.json
├── package-lock.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .gitignore
├── .env.example                     # hanya jika benar-benar butuh env
│
├── references/                       # masukan asli / hanya untuk review
│   ├── academic/                    # PDF UTS + tutorial asdos
│   └── screenshots/                 # WWF entry + Of the Oak reference
│
├── docs/
│   ├── SEBELUMJADIAPI_MASTER.md      # sumber keputusan (dokumen ini)
│   ├── PROJECT_STATUS.md             # status milestone, blockers, next actions
│   ├── DESIGN_SYSTEM.md              # token visual, typography, grids
│   ├── MOTION_SPEC.md                # trigger, sequence, timings, reduced motion
│   ├── CONTENT_SOURCE_REGISTRY.md    # data/foto/audio: asal, izin, tanggal
│   ├── DECISION_LOG.md               # keputusan/perubahan scope
│   ├── QA_CHECKLIST.md               # pemeriksaan sebelum presentasi
│   └── HANDOFF_NON_TECHNICAL.md      # instruksi pemula bagi penerima proyek
│
├── figma/
│   ├── FIGMA_HANDOFF.md              # URL prototype dan node terpilih
│   └── reference-shots/             # screenshot entry WWF untuk demo akademik
│
├── public/
│   ├── assets/
│   │   ├── models/
│   │   │   └── trees/                 # living-witness.glb, LOD, asset licenses
│   │   ├── textures/
│   │   │   ├── forest/
│   │   │   ├── peat/
│   │   │   └── fire/
│   │   ├── images/
│   │   │   ├── editorial/
│   │   │   ├── wildlife/
│   │   │   ├── people/
│   │   │   └── fallback/
│   │   ├── audio/
│   │   │   ├── forest/                # ambience asli/berlisensi
│   │   │   ├── meditations/          # track dipisah, transcripts di content
│   │   │   └── sfx/                  # klik halus, bara, transition
│   │   └── icons/
│   └── favicon.svg
│
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   ├── AppProviders.tsx
│   │   ├── routes.tsx                 # ketika routing dibutuhkan
│   │   └── appStore.ts                # shared state minimal
│   │
│   ├── pages/
│   │   ├── CampaignPage.tsx           # menyusun 6 section wajib
│   │   ├── MeditationPage.tsx         # jika menjadi route terpisah
│   │   └── NotFoundPage.tsx
│   │
│   ├── features/
│   │   ├── immersive-intro/
│   │   │   ├── ImmersiveIntro.tsx
│   │   │   ├── IntroNarrative.tsx
│   │   │   ├── IntroControls.tsx
│   │   │   └── immersiveIntro.module.css
│   │   │
│   │   ├── living-tree/
│   │   │   ├── LivingTreeExperience.tsx
│   │   │   ├── components/
│   │   │   │   ├── TreeCanvas.tsx
│   │   │   │   ├── LivingTreeModel.tsx
│   │   │   │   ├── BranchParticles.tsx
│   │   │   │   ├── TreeLighting.tsx
│   │   │   │   ├── TreeEnvironment.tsx
│   │   │   │   ├── FireEffects.tsx
│   │   │   │   ├── CameraRig.tsx
│   │   │   │   └── TreeFallback.tsx
│   │   │   ├── hotspots/
│   │   │   │   ├── TreeHotspots.tsx
│   │   │   │   ├── HotspotButton.tsx
│   │   │   │   ├── HotspotDetailPanel.tsx
│   │   │   │   └── hotspotData.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useTreeMotion.ts
│   │   │   │   ├── useTreeState.ts
│   │   │   │   └── useGraphicsQuality.ts
│   │   │   ├── shaders/                # hanya setelah POC membutuhkannya
│   │   │   ├── config/
│   │   │   │   ├── treeSceneConfig.ts
│   │   │   │   └── treeStates.ts
│   │   │   └── livingTree.module.css
│   │   │
│   │   ├── meditations/              # FOLDER KHUSUS sesuai permintaan
│   │   │   ├── MeditationsExperience.tsx
│   │   │   ├── MeditationPlayer.tsx
│   │   │   ├── MeditationSelector.tsx
│   │   │   ├── MeditationTranscript.tsx
│   │   │   ├── hooks/useMeditationAudio.ts
│   │   │   └── meditations.module.css
│   │   │
│   │   ├── why-it-matters/
│   │   │   ├── WhyItMatters.tsx
│   │   │   ├── ImpactStory.tsx
│   │   │   └── whyItMatters.module.css
│   │   │
│   │   ├── before-the-fire/
│   │   │   ├── BeforeTheFire.tsx
│   │   │   ├── PeatlandCrossSection.tsx
│   │   │   ├── MoistureStateControl.tsx
│   │   │   └── beforeTheFire.module.css
│   │   │
│   │   ├── make-it-personal/
│   │   │   ├── MakeItPersonal.tsx
│   │   │   ├── DocumentaryCarousel.tsx
│   │   │   └── makeItPersonal.module.css
│   │   │
│   │   ├── take-action/
│   │   │   ├── TakeAction.tsx
│   │   │   ├── DecisionLab.tsx
│   │   │   ├── ActionResult.tsx
│   │   │   └── takeAction.module.css
│   │   │
│   │   ├── show-your-action/
│   │   │   ├── ShowYourAction.tsx
│   │   │   ├── WallOfAction.tsx
│   │   │   └── showYourAction.module.css
│   │   │
│   │   └── stay-in-movement/
│   │       ├── StayInMovement.tsx
│   │       ├── FinaleCTA.tsx
│   │       └── stayInMovement.module.css
│   │
│   ├── components/
│   │   ├── layout/                    # Header, Footer, SectionContainer
│   │   ├── navigation/                # ChapterNav, MobileMenu, ProgressIndicator
│   │   ├── ui/                        # Button, Modal, CarouselArrows, Switch
│   │   ├── audio/                     # SoundToggle, GlobalAudioManager
│   │   ├── accessibility/             # MotionToggle, SkipLink, FocusTrap
│   │   ├── feedback/                  # LoadingState, ErrorPanel, QualityPrompt
│   │   └── legal/                     # Disclaimer, SourceBadge, CreditLine
│   │
│   ├── content/
│   │   ├── campaign.json              # Judul, pesan inti, CTA
│   │   ├── introNarrative.json         # Teks yang muncul satu per satu
│   │   ├── factCards.json              # Fakta + source IDs
│   │   ├── hotspots.json               # Hotspot data dan label sumber
│   │   ├── stories.json                # Cerita lapangan (nyata/ilustratif)
│   │   ├── actions.json                # Learn / Check / Share / Join / Invite
│   │   ├── decisionScenarios.json      # Skenario edukasi
│   │   ├── wallOfAction.demo.json      # HANYA konten simulasi berlabel
│   │   ├── meditations.json            # Track, durasi, transcript, kredit
│   │   ├── sources.json                # Registry sumber untuk UI
│   │   └── translations/               # jika Bahasa Inggris diaktifkan
│   │
│   ├── styles/
│   │   ├── tokens.css                  # warna, font, spacing, z-index
│   │   ├── globals.css
│   │   ├── typography.css
│   │   └── motion.css                  # fallback reduced motion
│   │
│   ├── hooks/
│   │   ├── useReducedMotion.ts
│   │   ├── useMediaQuery.ts
│   │   └── useVisibilityPause.ts
│   │
│   ├── lib/
│   │   ├── audio/
│   │   ├── motion/
│   │   ├── graphics/
│   │   ├── content/
│   │   └── analytics/                  # demo event log, tidak fake GA4
│   │
│   ├── types/
│   │   ├── hotspot.ts
│   │   ├── source.ts
│   │   ├── meditation.ts
│   │   └── campaign.ts
│   └── test/
│       ├── setup.ts
│       └── fixtures/
│
├── tests/
│   ├── e2e/
│   ├── accessibility/
│   └── visual/
│
└── scripts/
    ├── asset-audit.mjs             # ukuran file, nama, missing assets
    └── verify-sources.mjs          # validasi field sumber/dataset
```

### Prinsip pembagian file (wajib untuk Codex)

1. **Feature = folder**. Meditations, Living Tree, Before the Fire, dan enam section wajib terpisah.
2. **UI/content/3D/shader dipisah.** Tidak ada `App.tsx` ribuan baris.
3. **Data editorial berada di `src/content/`** agar nonprogrammer dapat mengganti teks tanpa menyentuh shader/GSAP.
4. **Reusable hanya jika benar-benar digunakan bersama.** Jangan memasukkan semua komponen ke folder `components` tanpa pembagian.
5. **Satu sumber konfigurasi untuk setiap hal global** (warna, kualitas grafik, keyframe pokok, data hotspot, jenis state).
6. **File/folder pakai bahasa Inggris singkat dan konsisten**; komentar dan README boleh Bahasa Indonesia yang mudah dipahami.
7. **Tidak ada aset tanpa asal/lisensi**; content source registry harus diisi sebelum publikasi.
8. **Hindari overengineering**: jangan mulai dengan microservices, 12 global stores, custom engine baru, atau inventaris komponen yang belum dipakai.
9. **Pisahkan konten ilustrasi dari konten faktual** dengan tipe dan label yang jelas.
10. **Jangan merusak section yang sudah disetujui** saat menambah animasi atau section baru.

---

## 13. DATA, KONTEN, DAN SUMBER — SATU FAKTA SATU JEJAK

### 13.1 Format konten fakta (contoh skema, bukan data faktual)

```json
{
  "id": "fact-001",
  "title": "Judul fakta",
  "summary": "Tulis pernyataan faktual yang sudah diperiksa",
  "sourceId": "source-official-001",
  "observedPeriod": "YYYY-MM hingga YYYY-MM",
  "publishedAt": "YYYY-MM-DD",
  "dataStatus": "verified",
  "visualization": "caption-with-source"
}
```

`dataStatus` dapat berupa `verified`, `illustrative`, atau `pending_review`. `pending_review` **tidak boleh** tampil sebagai angka meyakinkan di UI.

### 13.2 Format sumber

```json
{
  "id": "source-official-001",
  "title": "Judul publikasi resmi",
  "organization": "Nama penerbit",
  "url": "https://example.org/original-source",
  "publishedAt": "YYYY-MM-DD",
  "accessedAt": "YYYY-MM-DD",
  "licenseOrUsage": "verify-before-publication",
  "notes": "Konfirmasi definisi statistik dan wilayah"
}
```

### 13.3 Format cerita dan media

- `storyType`: `verified_real_story` atau `illustrative_scenario`.
- Untuk cerita nyata: nama/kutipan/organisasi/tanggal/link/sumber hak penggunaan.
- Untuk ilustrasi: label terlihat **"Skenario ilustratif, bukan testimoni nyata"**.
- Untuk media: `author`, `sourceUrl`, `license`, `usagePermission`, `altText`, `lastChecked`.
- Tidak ada grafik/peta yang menggunakan angka dari screenshot tanpa sumber primer yang terverifikasi.

### 13.4 Demo interaksi vs data aktual

- **Hotspot ekologis:** penjelasan umum bersumber, bukan data posisi hewan per individu.
- **Wall of Action:** mockup berlabel, bukan feed hidup atau representasi UGC asli.
- **Tree states:** ilustrasi artistik (bukan engine prediksi karhutla).
- **Kuis:** edukasi, bukan alat penilaian keselamatan publik.
- **Analytics:** boleh log interaksi lokal selama testing, jangan mengaku sebagai hasil kampanye masyarakat.

---

## 14. PRIVASI, COPYRIGHT, ETIKA, DAN DISCLAIMER

### 14.1 Disclaimer wajib (ditampilkan di website dan mockup)

> **Prototipe akademik.** #SebelumJadiApi merupakan rancangan Digital Public Relations yang dikembangkan untuk pembelajaran. Website dan visual interaktif ini bukan kanal resmi WWF Indonesia, tidak mewakili pernyataan atau persetujuan WWF, dan sebagian demonstrasi interaksi/konten dapat bersifat ilustratif. Informasi faktual disertai sumber.

Simpan teks finalnya dalam `src/content/campaign.json` agar footer dan modal memakai satu sumber.

### 14.2 Ketentuan merek dan hak cipta

- Jangan menggambar ulang atau memodifikasi logo Panda WWF, termasuk memisahkan unsur yang seharusnya menjadi satu lock-up.
- Jangan menyatakan ada kemitraan resmi, persetujuan WWF, atau akses ke data internal tanpa bukti.
- Gunakan screenshot WWF hanya sebagai konteks demonstrasi akademik yang dilabeli; jangan menjadikannya halaman publik yang berpura-pura official.
- Jangan menggunakan model 3D, audio, kode, gambar, atau design *Of the Oak*, *Avatar*, Eywa/Omatikaya secara tidak sah; ciptakan aset dan bentuk pohon sendiri.
- Jangan pakai musik film atau audio web orang lain tanpa lisensi. Audio sendiri/berlisensi saja.
- Jangan menampilkan satwa langka dengan koordinat sensitif; gunakan data agregat/rentang lokasi jika aman.
- Untuk external link, tampilkan domain tujuan dengan jelas; gunakan `rel="noopener noreferrer"` jika `target="_blank"`.

### 14.3 Privasi minimum

Tidak ada login/database pada tahap ini; tidak mengumpulkan nama, nomor telepon, lokasi presisi, atau email tanpa kebutuhan dan persetujuan. Bila nanti memasang analytics, jelaskan pelacakan dan ikuti aturan privasi yang berlaku.

---

## 15. PERFORMANCE ENGINEERING — "FULL POWER" TANPA MENGABAIKAN PERANGKAT

### 15.1 Target kualitas (bukan jaminan universal)

| Aspek | Target awal / sikap |
|---|---|
| Frame rate | **60 FPS sebagai target pada laptop referensi**; ukur p95 frame time, bukan sekadar angka sesaat |
| Input | Kamera/pointer terasa responsif dan tidak tersendat saat scroll/click |
| High-motion | Pengguna dapat mematikan/mengurangi gerakan |
| Assets | Ukuran 3D dan texture ditetapkan berdasarkan pengujian, bukan preset tinggi secara default |
| Idle/unseen | Tidak terus membakar GPU ketika tab tidak terlihat atau section 3D offscreen |
| Mobile | Kontrol touch lengkap; otomatis pilih kualitas lebih rendah bila diperlukan |
| WebGL failure | Pengguna tetap bisa membaca semua enam section wajib |
| Audio | Tidak autoplay; media kecil/streamed seperlunya |
| Load states | Ada progress indicator yang jujur dan fallback jika model gagal |
| Browser QA | Desktop Chromium/Firefox, mobile Android/iOS representatif bila tersedia |

**Tidak boleh menulis "no lag 100%" di dokumentasi.** Sebaliknya, tunjukkan hasil profiling dari perangkat uji nyata.

### 15.2 Quality presets

- **Low:** foto atau low-poly tree, partikel terbatas, tanpa heavy postprocessing, DPR lebih rendah, text/quiz lengkap.
- **Balanced (default):** tree 3D medium detail, partikel efisien, pencahayaan sederhana, batas pixel ratio moderat.
- **High:** model detail lebih tinggi dan efek tambahan setelah profil kinerja lolos.
- **Reduced Motion:** minim transisi, gambar statis/dissolve singkat, kontrol hotspot biasa, bukan lock-scroll.

**Scene performance rules:** draw calls terukur, frustum culling, reuse material/geometry, instancing untuk objek berulang, hapus event listeners/RAF saat unmount, tidak ada multiple WebGL canvases tanpa alasan.

### 15.3 Budget review per milestone

Saat setiap milestone selesai, catat:

```text
- perangkat / GPU / browser:
- scene state yang diuji:
- FPS median dan p95 frame time:
- draw calls / triangles / texture memory (jika tersedia):
- ukuran main bundle:
- ukuran GLB + textures:
- issue mobilitas/aksesibilitas:
- keputusan perbaikan:
```

---

## 16. AKSESIBILITAS DAN INTERAKSI MULTIMODAL

- Semua hotspot punya padanan **DOM button** dengan accessible name, dapat ditab, dan fokus jelas. Jangan hanya bisa raycasting dengan mouse.
- Teks tetap tersedia tanpa audio. Audio scene punya caption/transkrip.
- Hover punya padanan tap/click; tidak semua smartphone memakai mouse.
- `Skip intro`, `Pause motion`, `Mute`, `Graphics preset` selalu dapat ditemukan.
- Gunakan elemen HTML semantik untuk informasi penting, bukan teks yang dirender ke texture 3D.
- Kontrol tidak terlalu kecil; pastikan kontras teks dan fokus visible.
- Kalau animasi api menggunakan flicker, batasi intensitas/frekuensi dan sediakan reduced motion.
- Tidak ada scroll hijacking agresif; pengguna selalu dapat kembali/navigasi bebas.
- Pengguna dengan WebGL nonaktif tetap dapat menyelesaikan quiz dan membaca konten.

---

## 17. RENCANA IMPLEMENTASI BERGATE — CODEX TIDAK BOLEH MELONCAT

> Prinsip: **visual paling sulit dikerjakan dulu**, tetapi source requirements dibekukan. Tiap fase menghasilkan sesuatu yang bisa diperiksa, bukan kode kosong.

### PHASE 0 — Audit + bootstrap project

**Output:** proyek Vite React TypeScript hidup, folder inti rapi, README awal, token hitam dominan, route root dan baseline accessibility.

**Wajib:** install dependencies versi kompatibel, `npm run dev` jalan, lint/typecheck/build sukses. Jangan desain section lain sebelum framework bersih.

### PHASE 1 — Tree Core POC (prioritas pertama)

**Output:** viewport dark, satu pohon original 3D (boleh placeholder geometry awal), kamera damped cursor-follow, fallback static.

**Acceptance:** pohon tampak jelas, scroll dan pointer tidak bikin freeze, kontrol kualitas dan reduced motion dasar tersedia.

### PHASE 2 — Life particles + atmosphere

**Output:** partikel energi **mengalir mengikuti akar/batang/cabang**, kabut/cahaya lapis tipis, motion tidak random tak bermakna.

**Acceptance:** partikel hidup, tidak memerlukan satu mesh per particle, ada low quality preset, tracking FPS dicatat.

### PHASE 3 — Tree state change + cinematic fire

**Output:** `HEALTHY → AT_RISK → BURNING → RESET`, animasi bahan/warna/partikel/bara yang halus, ilustrative disclaimer.

**Acceptance:** desktop mouse dan mobile tap mendukung; tidak ada flickering destruktif; reset/rewind berhasil; reduced motion punya fallback.

### PHASE 4 — Story + Sound + Hotspot (vertical slice selesai)

**Output:** narasi satu per satu, `Skip intro`, audio opt-in/crossfade, minimal tiga hotspot awal (peat, wildlife, prevention), panel info dan sumber.

**Acceptance:** semua tombol fungsi, keyboard dan mobile dapat membuka panel, audio tidak autoplay, data bukan klaim palsu.

**GATE VERTICAL SLICE:** demo 2–3 menit bisa menunjukkan "masuk → pohon hidup → hotspot → risiko → pencegahan". Profil performa dan capture screenshot/video dilakukan di sini.

### PHASE 5 — Enam section wajib kampanye

**Output:** keenam folder memiliki konten dan interaksi; tidak ada fitur yang hilang demi visual.

**Order internal:** `Before the Fire` → `Why It Matters` → `Make It Personal` → `Take Action` → `Show Your Action` → `Stay in the Movement`.

**Acceptance:** pencocokan checklist PDF S1 secara satu-ke-satu; seluruh section bisa dipakai tanpa WebGL dan audio.

### PHASE 6 — Meditations + Explorer enhancement

**Output:** folder meditations mandiri, player, transkrip, soundscape legal, navigasi ke/dari campaign; hotspot lengkap lima node dan story layering.

**Acceptance:** tidak pernah autoplay, tidak mengganggu alur utama, tidak mengklaim hasil terapeutik, fokus UI tetap pencegahan.

### PHASE 7 — UI polish, mobile, performance, sources

**Output:** polish panel, carousel, hover/touch, responsivitas, QA aksesibilitas, pengecekan asset credits dan sumber. Penutupan memory leak.

**Acceptance:** build, typecheck, lint, E2E pokok, keyboard walkthrough, mobile walkthrough, kontrol sound/motion, fallback.

### PHASE 8 — Figma, social mockups, dokumen akademik

**Output:** entry WWF Figma screenshot → menu AKSI → item #SebelumJadiApi → frame/site kampanye; screenshot/keyframe state; konten mockup Instagram + TikTok; rancangan engagement; executive summary 3–5 halaman jika diminta sesuai S2.

**Acceptance:** disclaimer di semua mockup, link eksekusi dapat dibuka, branding tidak mengaku official WWF, isi konsisten dengan proposal UTS.

---

## 18. DEFINITION OF DONE PER KOMPONEN

Sebuah komponen dikatakan selesai bila:

1. **UI** sesuai art direction dan responsif.
2. **Fungsi** terbukti bekerja pada user action nyata.
3. **Konten** memiliki sumber atau label ilustrasi.
4. **Loading/empty/error/fallback** tidak rusak.
5. **Aksesibilitas** keyboard, focus, alt/caption, reduce motion diperiksa.
6. **Kinerja** tidak memburuk drastis dari milestone sebelumnya; angka uji dicatat.
7. **Kode** dipisah per fungsi, tidak ada rahasia di repo, tidak ada file monolitik tanpa alasan.
8. **Dokumentasi** README/update PROJECT_STATUS berisi cara penggunaan dan batasan.
9. **QA** minimal test dasar berhasil.
10. **Aset** memiliki asal/lisensi dan ukuran wajar.

### Acceptance khusus UI cinematic

- Jika pengguna scroll dengan mouse/touchpad, tidak ada scroll jerking atau timeline tersangkut.
- Jika pointer masuk/keluar hotspot cepat, scene tidak blink antara dua state tanpa kontrol.
- Jika sound toggle ditekan berulang cepat, tidak ada dua audio layer duplikat yang terus bermain.
- Jika browser resize, camera framing dan hotspot tidak meleset drastis.
- Jika asset 3D gagal dimuat, pesan dan content HTML tetap muncul.
- Jika pengguna baru membuka website langsung pada bagian bawah/tautan anchor, aplikasi tetap navigable.

---

## 19. PEDOMAN PENULISAN KODE UNTUK CODEX

### 19.1 Kode harus mudah diajarkan, bukan sekadar pendek

- Nama komponen jelas: `PeatlandCrossSection`, bukan `BoxX17`.
- Fungsi kecil dengan satu tanggung jawab dan TypeScript types yang cukup.
- Komentar Bahasa Indonesia **menjelaskan alasan yang tidak obvious**, bukan setiap baris.
- Hindari magic numbers: kamera, intensitas efek, jumlah partikel, warna, timing berada di config.
- HTML teks tidak diselipkan dalam scene shaders; UI data di `src/content/`.
- Jangan menambahkan library tanpa menerangkan manfaatnya pada `docs/DECISION_LOG.md`.
- Jangan menghapus fitur wajib untuk memperbaiki tampilan; perbaiki secara bertahap.
- Jangan mengorbankan aksesibilitas untuk efek pointer.
- Tidak boleh memalsukan data, hasil pengujian, jumlah partisipasi, persetujuan WWF, maupun fitur yang belum dibuat.

### 19.2 Target kualitas repository

- Jalur dev: `npm install`, `npm run dev`.
- Jalur verifikasi: `npm run lint`, `npm run typecheck`, `npm run build` (+ test bila sudah disiapkan).
- README menyediakan screenshot, fitur yang sudah/ belum aktif, daftar folder penting, cara ubah teks, gambar, audio, hotspot, dan bagaimana menjalankan di Windows.
- Minimal satu `PROJECT_STATUS.md` dicatat setiap fase.
- Semua feature tersedia secara independen sehingga mudah diuji dan dipelihara.

### 19.3 Cara Codex mengerjakan setiap tugas

1. Baca `AGENTS.md`, lalu dokumen master ini. Bila perlu mengecek kutipan atau keputusan akademik, baca juga kedua PDF di `references/academic/`.
2. Identifikasi fase dan acceptance criteria.
3. Audit file existing; jangan overwrite desain yang sudah bagus tanpa alasan.
4. Implementasikan **satu milestone utuh** (bukan seluruh roadmap dalam satu prompt).
5. Jalankan typecheck/lint/build; perbaiki error yang benar-benar ada.
6. Laporkan file yang ditambah/diubah, fitur berjalan, hasil test, screenshot/test evidence bila tersedia.
7. Catat tradeoff, tech debt, dan todo di `PROJECT_STATUS.md`.
8. Hentikan penambahan fitur baru sampai fase yang sedang dijalankan lolos.

---

## 20. SETUP WINDOWS — DARI FOLDER KOSONG KE PROYEK

> Petunjuk ini untuk **Windows PowerShell**. Node.js versi LTS dan npm wajib sudah terpasang; cek `node -v` dan `npm -v`. Jalankan dari lokasi kerja yang ingin digunakan. Jangan mengetik simbol `$` sebagai bagian perintah.

### 20.1 Buat proyek Vite React TS

```powershell
# Pilih lokasi penyimpanan proyek, contoh folder Documents
cd "$HOME\Documents"

# Scaffold dasar React + TypeScript
npm create vite@latest sebelumjadiapi -- --template react-ts
cd sebelumjadiapi
npm install

# Framework 3D dan animasi, pastikan versinya kompatibel saat install
npm install three @react-three/fiber @react-three/drei gsap zustand
npm install -D @types/three

# Mulai development
npm run dev
```

**Hentikan dahulu setelah aplikasi Vite hidup** sebelum memasang semua paket tambahan. React Router, test library, dan fitur advanced cukup dipasang ketika milestone membutuhkannya.

### 20.2 Susun folder bertahap

1. Buat folder `docs/` dan salin `SEBELUMJADIAPI_MASTER.md` ke dalamnya.
2. Letakkan `AGENTS.md` di root.
3. Buat `src/features/living-tree/`, `src/features/immersive-intro/`, `src/features/meditations/`, dan `src/content/`.
4. Siapkan `src/styles/tokens.css`, `globals.css`, `typography.css`.
5. Siapkan `public/assets/models/trees/`, `public/assets/audio/forest/`, `public/assets/images/fallback/`.
6. Setelah POC berhasil, baru buat folder lengkap enam section lain dan dokumen QA.

Contoh perintah PowerShell yang aman untuk beberapa folder awal:

```powershell
New-Item -ItemType Directory -Force -Path `
  "docs", `
  "src/features/living-tree/components", `
  "src/features/living-tree/hotspots", `
  "src/features/immersive-intro", `
  "src/features/meditations", `
  "src/content", `
  "src/styles", `
  "public/assets/models/trees", `
  "public/assets/audio/forest", `
  "public/assets/audio/meditations", `
  "public/assets/images/fallback"
```

### 20.3 Jalankan kembali nanti

```powershell
cd "$HOME\Documents\sebelumjadiapi"
npm install
npm run dev
```

Jika `npm run typecheck` belum ada pada template Vite, tambahkan script yang sesuai `tsconfig`; **jangan klaim telah dijalankan bila belum ditambahkan**.

### 20.4 Git

```powershell
git init
git add .
git commit -m "chore: initialize SebelumJadiApi immersive campaign prototype"
```

**Jangan commit:** `.env` berisi rahasia, data pribadi, audio tidak berlisensi, model hasil ekstraksi dari situs lain, dan aset yang tidak berhak didistribusikan.

---

## 21. CODEX — PROMPT PERTAMA YANG SIAP DIEKSEKUSI

> Buka folder proyek `sebelumjadiapi` di VS Code / Codex. Salin dokumen ini ke `docs/SEBELUMJADIAPI_MASTER.md`, `AGENTS.md` ke root, lalu kirim instruksi berikut ke Codex.

```text
Kamu bertindak sebagai Senior Creative Frontend Engineer, Technical Artist (Three.js/R3F),
Motion Designer (GSAP), Accessibility Engineer, dan Code Quality Reviewer.

Baca dan ikuti:
1. AGENTS.md
2. docs/SEBELUMJADIAPI_MASTER.md

Proyek ini adalah prototype akademik Digital PR WWF Indonesia #SebelumJadiApi,
BUKAN situs resmi WWF. Fokus komunikasi: PENCEGAHAN karhutla dan Gen Z.
Keenam section wajib dari proposal UTS tidak boleh dihapus/diubah tujuannya.

Untuk eksekusi PERTAMA ini, kerjakan HANYA PHASE 0:
- Audit environment dan package manager.
- Scaffold Vite + React + TypeScript jika belum ada.
- Siapkan struktur folder minimal sesuai master.
- Siapkan art direction hitam dominan sebagai CSS variables.
- Buat homepage skeleton yang bisa dijalankan dan menampilkan placeholder
  Live Witness Tree tanpa memalsukan scene 3D jadi sudah jadi.
- Tambahkan README Indonesia yang bisa dipahami orang nonteknis.
- Siapkan docs/PROJECT_STATUS.md dan keputusan teknis yang diambil.
- Pastikan aplikasi bisa menjalankan lint dan build. Jangan tambah backend.

JANGAN dahulu membuat full campaign hub, api, partikel, atau model 3D kompleks.
JANGAN clone Of the Oak atau memakai aset Avatar tanpa izin.
JANGAN membuat statistik atau testimoni fiktif sebagai fakta.
Jelaskan file apa yang dibuat, fungsi setiap file, cara menjalankan,
serta checklist verifikasi yang benar-benar telah diuji.
```

### Prompt fase berikutnya (setelah fase 0 lolos)

```text
Lanjut PHASE 1 di docs/SEBELUMJADIAPI_MASTER.md: Tree Core POC.
Pertahankan struktur yang sudah ada. Buat satu scene pohon 3D orisinal
(boleh geometry placeholder awal), kamera halus yang merespons pointer,
background hitam sinematik, DOM overlays terpisah, reduced motion/fallback,
dan pengaturan kualitas dasar. BUKAN copy Of the Oak.
Jangan kerjakan phase 2 sebelum POC, lint, build, dan pengujian interaksi lolos.
Perbarui docs/PROJECT_STATUS.md.
```

---

## 22. FIGMA BRIDGE DAN PRESENTASI (DILAKUKAN SETELAH VISUAL CORE SIAP)

### 22.1 Figma frames minimum

1. `WWF_Entry_Home` — screenshot konteks, ditandai `reference/mockup`.
2. `WWF_Aksi_Dropdown` — menu dengan `#SebelumJadiApi` **di bawah `Nature X Youth`**.
3. `Campaign_Intro_Healthy`.
4. `Campaign_Intro_Risk`.
5. `Campaign_Intro_Burning`.
6. `Campaign_Hotspot_Open`.
7. `Campaign_BeforeTheFire`.
8. `Campaign_TakeAction`.
9. `Campaign_Community`.
10. `Campaign_Mobile`.

Frame tidak perlu seluruhnya dibuat sebagai website WWF baru. Screenshot/keyframe dari coded experience bisa menjadi bukti visual di Figma, dengan koneksi/prototype yang jelas.

### 22.2 Alur demo untuk dosen (ringkas)

- **Masalah:** informasi karhutla tersebar dan konten cenderung satu arah dalam audit UTS.
- **Kebaruan solusi:** satu campaign hub yang memperkuat penjelasan sebelum api, mengubah informasi menjadi interaksi, dan memberi jalur aksi publik.
- **Demo:** buka WWF entry mockup → dropdown AKSI → klik kampanye → pahami pohon hidup → buka hotspot gambut → lihat skenario risiko → pilih satu aksi → akhiri dengan MoNa.
- **Keterkaitan tugas:** Week 12 website, Week 13 Instagram/TikTok, Week 14 engagement, UAS distribusi/evaluasi sesuai instruksi tutor.
- **Disclaimer:** jelas prototipe akademik; tidak mengaku afiliasi resmi, bukan prediksi kebakaran.

### 22.3 Mockup sosial dan community engagement

- **Instagram:** carousel edukasi + Reels pendek yang mengarah ke campaign hub (mengikuti tiga pilar konten S1).
- **TikTok:** video singkat dengan hook, pertanyaan/dialog, lalu ajak eksplorasi kampanye (mengikuti strategi S1).
- **Week 14:** `#SebelumJadiApi Challenge` atau quiz `Apa yang Terjadi Sebelum Api?` sebagai **mockup**; bukan klaim event WWF sungguhan.
- Semua mockup menyertakan disclaimer, dan dilarang memalsukan metrik atau komentar publik.

---

## 23. QC MATRIX — CEK SEBELUM DIANGGAP BERHASIL

| Pemeriksaan | Harus dibuktikan dengan |
|---|---|
| Enam bagian proposal ada | Screenshot dan navigasi menuju setiap section |
| Intro mirip kualitas interaksi referensi, bukan copy | Screen capture scene sendiri + bukti asset orisinal |
| Pohon hidup dan partikel berjalan | Demo realtime, bukan video yang pura-pura interaktif |
| Pohon `HEALTHY → AT_RISK → BURNING → RESET` | Interaksi desktop/touch + label simulasi |
| Sound opt-in | Tes browser baru: diam sampai klik `Enable Sound` |
| Meditations dipisah dan berfungsi | Folder terpisah + transkrip + audio control |
| Hotspot terbuka | Klik/tap/keyboard memunculkan detail + sumber |
| Fitur edukasi pencegahan | Penjelasan gambut, tindakan, rujukan sumber |
| Storytelling personal tidak palsu | Bukti sumber/label ilustratif |
| Wall of Action jujur | `Demo` label terlihat |
| MoNa/link WWF valid | External links diverifikasi saat final |
| Visual bebas asset bajakan | Asset license register lengkap |
| Mobile dan fallback berfungsi | Rekaman/screenshot plus hasil tes |
| Performa diprofilkan | Device/browser + FPS/p95 frame time, bukan klaim 100% |
| Kode mudah diserahterimakan | README + HANDOFF + folder per feature |
| Tugas Digital PR lengkap | Figma + mockup 2 sosmed + mockup engagement + executive summary bila diminta |

---

## 24. ROADMAP LANJUTAN (SETELAH KEBUTUHAN WAJIB TERPENUHI)

Fitur di bawah ini **tidak wajib dan tidak boleh menunda kualitas enam section**:

- **Morphing habitat layers:** kamera dari kanopi turun ke penampang gambut dengan transisi kontinu.
- **Forest memory timeline:** geser waktu untuk membandingkan informasi terverifikasi, jika dataset valid dan lisensi jelas.
- **Spatial sound:** positional audio lembut untuk titik hotspot (harus punya mode mono/transkrip).
- **Narrative branching:** pilihan eksplorasi memengaruhi urutan konten, tanpa mengubah fakta.
- **Community action constellation:** gambarkan aksi publik sebagai visual jaringan **hanya jika data partisipasi nyata tersedia dan sah**; kalau belum, label demonstrasi.
- **Guided/Free Explore modes:** pengalaman pemula vs pengguna eksploratif.
- **Motion analytics lokal untuk usability testing:** track interaksi tanpa data pribadi; tidak mengaku performance kampanye live.
- **Downloadable learning card:** kartu ringkasan edukasi dengan sumber yang dapat dibagikan.
- **Field stories map:** map agregat non-sensitif untuk lokasi kisah, jika sumber dan izin telah diverifikasi.
- **Public feedback form:** hanya bila ada pihak yang benar-benar dapat memoderasi, membalas, serta melindungi data pengunjung; jika tidak, jangan membuat formulir palsu.

---

## 25. HANDOFF BAGI ORANG NONTEKNIS

Di `docs/HANDOFF_NON_TECHNICAL.md`, jelaskan dengan **bahasa Indonesia sangat mudah**:

- Proyek ini untuk apa dan bukan apa.
- Cara membuka website lokal menggunakan `npm install` + `npm run dev` (screenshot proses).
- Bagaimana mengganti teks di `src/content/`, mengganti gambar di `public/assets/images/`, dan cara update kredit sumber.
- Bagaimana mengubah urutan chapter tanpa menyentuh komponen 3D.
- Cara mengoperasikan demo: intro, sound toggle, hotspot, kondisi pohon, meditations, quiz, CTA.
- Cara menangani kesalahan umum: node/npm belum ada; port dipakai; 3D tidak tampil; suara mati; cache model.
- Cara membuka Figma prototype dan menjelaskan kenapa website WWF hanya entry mockup.
- Daftar konten **wajib disertai sumber** dan yang **hanya demonstrasi**.
- Apa yang belum bisa dilakukan; tidak mengklaim ada backend/live campaign jika belum dibuat.

**Buat panduan agar penerima bisa belajar dan menjelaskan proyek secara benar, bukan sekadar menghafal skrip teknis.**

---

## 26. KEPUTUSAN TERKUNCI vs MASIH TERBUKA

### Terkunci untuk rencana v1

- Nama utama `#SebelumJadiApi` dan target Gen Z.
- Format dedicated Campaign Hub/microsite, **bukan redesign seluruh WWF**.
- Enam bagian wajib S1.
- Figma entry mockup WWF via menu AKSI → Kampanye → di bawah Nature X Youth.
- Visual hitam dominan, WWF-aligned, original.
- Tree-centric immersive POC, partikel kehidupan, audio opt-in, sequential narrative, clickable hotspots, tree-state animation.
- Folder khusus Meditations dan per feature lain.
- Frontend-first tanpa backend rumit, React + TS + R3F + GSAP sebagai rekomendasi awal.
- Disclaimer akademik dan provenance data wajib.

### Masih terbuka (jangan dipalsukan sebagai final)

- Model pohon 3D final, jenis spesies, lisensi foto/sound.
- Sumber dan jumlah statistik karhutla yang benar-benar dipakai di UI.
- Jadwal final kampanye 6 vs 8 minggu dalam proposal.
- Lisensi/izin penggunaan aset visual WWF untuk rilis publik.
- Apakah prototype Figma saja sudah mencukupi penilaian (materi tutor mengizinkan), meskipun developer memilih coded version.
- Apakah beberapa fitur bonus (`Forest memory`, spatial audio, extra maps) benar-benar menambah pemahaman pengguna.
- Parameter final kualitas render harus diperoleh dari profiling.

---

## 27. PESAN TERAKHIR UNTUK CODEX — NORTH STAR

> **"Bangun pengalaman alam yang layak dijelajahi, bukan template website yang diberi efek api. Jaga agar konten pencegahan mudah dipahami, enam bagian kampanye utuh, desain orisinal, kode rapi, data jujur, dan setiap interaksi punya alasan. Satu scene yang luar biasa dan stabil lebih bernilai daripada sepuluh efek yang patah-patah."**

**Proyek master:** `SEBELUMJADIAPI`  
**Kontrol revisi:** setiap perubahan ruang lingkup dicatat di `docs/DECISION_LOG.md`, dan status aktual di `docs/PROJECT_STATUS.md`.
