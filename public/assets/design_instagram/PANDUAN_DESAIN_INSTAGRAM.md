# PANDUAN ASET & ELEMEN DESAIN INSTAGRAM #SebelumJadiApi
*Proyek Digital Public Relations WWF Indonesia — Kampanye Edukasi & Konservasi Rawa Gambut*

---

## 1. Struktur Folder Aset (`public/assets/design_instagram/`)

Semua aset dikelompokkan ke dalam 4 folder utama beresolusi tinggi, siap pakai untuk Canva, Figma, Adobe Photoshop, Illustrator, Premiere Pro, maupun CapCut:

```
public/assets/design_instagram/
├── asset_hewan/          -> Foto satwa kunci ekosistem rawa gambut & hutan hujan
├── aset_lingkungan/      -> Lanskap sinematik, sungai air hitam, kanopi, & kubah gambut
├── aset_frame/           -> Bingkai PNG transparan (Feeds 1080x1350, Square 1080x1080, Reels 1080x1920)
└── aset_lainnya/         -> Badge kampanye, stiker aksi, indikator swipe, overlay bara & asap
```

---

## 2. Standar Ukuran Instagram yang Disediakan

| Format Konten | Rasio Aspek | Resolusi Pixel | Keunggulan & Rekomendasi |
|---|---|---|---|
| **IG Feeds Portrait (Paling Direkomendasikan)** | **4 : 5** | **1080 × 1350 px** | Menempati layar HP paling luas di timeline, visual lebih besar, engagement tertinggi. |
| **IG Feeds Square (Klasik)** | **1 : 1** | **1080 × 1080 px** | Grid rapi di profil Instagram, cocok untuk katalog satwa / foto profil. |
| **IG Reels & Stories (Vertikal)** | **9 : 16** | **1080 × 1920 px** | Full-screen immersive dengan safe zone (aman dari tertutup UI like, komentar, & caption). |

---

## 3. Koleksi Bingkai Desain (`aset_frame/`)

Semua bingkai memiliki **area tengah transparan** sehingga kamu tinggal meletakkan foto di layer bawah dan bingkai di layer atas:

1. **`frame_01_feed_portrait_minimal_dark.png`** (1080 × 1350 px)
   - Bingkai estetik modern gelap WWF dengan koordinat GPS ekosistem gambut, crop marks teknis di tiap sudut, dan footer `#SebelumJadiApi`.
2. **`frame_02_feed_square_editorial.png`** (1080 × 1080 px)
   - Bingkai editorial katalog satwa dengan tab judul `DOKUMENTASI SPESIES PENJAGA GAMBUT` dan strip status perlindungan di bagian bawah.
3. **`frame_03_reels_story_vertical.png`** (1080 × 1920 px)
   - Bingkai khusus Reels/Story dengan safe margin atas-bawah, badge `CATATAN PENJAGA GAMBUT`, dan kartu kutipan darurat karhutla.
4. **`frame_07_polaroid_field_specimen.png`** (1080 × 1350 px)
   - Kartu polaroid jurnal konservasi lapangan dengan area catatan kaki untuk mencantumkan data observasi satwa atau cerita warga.
5. **`frame_08_split_before_after.png`** (1080 × 1350 px)
   - Bingkai ganda perbandingan: Jendela atas untuk hutan gambut basah alami vs jendela bawah untuk skenario ancaman api dan kekeringan.

---

## 4. Cara Bikin Feeds Carousel yang "Menyambung" (Seamless Puzzle Feed)

Untuk membuat carousel multi-slide yang gambarnya saling terhubung ketika di-swipe ke samping:

1. **Slide 01 (Pembuka)**: Gunakan **`frame_04_carousel_puzzle_slide_01.png`**
   - Menampilkan label `SLIDE 01 / 05: EKOSISTEM` dan garis horizon emas yang menembus batas sisi kanan slide.
2. **Slide 02 (Isi & Kontinuitas)**: Gunakan **`frame_05_carousel_puzzle_slide_02.png`**
   - Garis emas masuk tepat dari sisi kiri dan tembus ke sisi kanan tanpa putus, dilengkapi kotak kutipan fakta kubah gambut di bagian tengah.
3. **Slide 03 / Terakhir (Call to Action)**: Gunakan **`frame_06_carousel_puzzle_slide_03.png`**
   - Garis penghubung berhenti pada simpul aksi nyata mengajak audiens mengunjungi `sebelumjadiapi.my.id` untuk ikrar janji penjaga gambut.

> **Tips Desain Seamless di Canva / Photoshop:**
> Buat satu artboard panjang berukuran **3240 × 1350 px** (untuk 3 slide 1080×1350) atau **5400 × 1350 px** (untuk 5 slide). Letakkan foto panorama melintang di tengah, lalu potong (slice) per 1080 px!

---

## 5. Koleksi Foto Satwa & Lanskap

### A. Satwa Kunci Gambut (`asset_hewan/`)
- **Gajah Sumatra** (`gajah_sumatra_rawa_gambut.jpg` & `.webp`) — Satwa penjelajah koridor gambut.
- **Harimau Sumatra** (`harimau_sumatra_kanopi_gambut.jpg` & `.webp`) — Predator puncak pelindung ekosistem.
- **Bekantan Kalimantan** (`bekantan_sungai_air_hitam.jpg` & `.webp`) — Primata endemik pemakan tunas pohon rawa.
- **Burung Rangkong Badak & Gading** (`burung_rangkong_badak_close_up.jpg`, `burung_rangkong_gading.png`) — Petani hutan penyebar biji pohon besar.
- **Tapir Asia** (`tapir_asia_tepi_gambut.jpg` & `.webp`) — Satwa pemalu pemakan tumbuhan air gambut.
- **Orangutan Sumatra & Kalimantan** (`orangutan_dahan_pohon.png`, `orangutan_bridge_canopy.png`) — Penjaga kanopi utama.

### B. Lanskap Lingkungan Gambut (`aset_lingkungan/`)
- **Drone Sungai Air Hitam** (`lanskap_drone_sungai_air_hitam.jpg` & `.webp`) — Pola sungai air teh pekat di tengah kanopi zamrud.
- **Kanopi & Sunrays Fajar** (`kanopi_fajar_sunrays_pohon_raksasa.jpg` & `.webp`) — Keagungan pohon raksasa Shorea & Ramin.
- **Bawah Air & Akar Gambut** (`kubah_gambut_bawah_air_spons_karbon.jpg` & `.webp`) — Spons air bawah tanah penyerap karbon terbesar.
- **Kontras Hutan vs Karhutla** (`kontras_hutan_asli_vs_ancaman_asap.jpg` & `.webp`) — Visual kontras kuat urgensi `#SebelumJadiApi`.

---

## 6. Aset Tambahan & Efek Khusus (`aset_lainnya/`)

- **`overlay_embers_spark.png`**: Partikel bara api menyala transparan (letakkan di atas foto untuk memberi efek ketegangan api).
- **`overlay_smoke_particles.png`**: Partikel kabut asap lembut transparan untuk memberi mood dramatis.
- **`badge_sebelumjadiapi_seal.png`**: Stempel lencana lingkaran resmi kampanye.
- **`badge_critical_biodiversity.png`**: Pita peringatan zona kritis biodiversitas gambut.
- **`element_swipe_indicators.png`**: Elemen petunjuk geser (swipe dots, panah, pil swipe).
- **`sticker_jaga_gambut.png`**: Stiker tipografi *"Keringkan Gambut Undang Api, Basahkan Gambut Jaga Masa Depan"*.
