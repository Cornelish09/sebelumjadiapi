# Make It Personal — 10 November 2026

Implementasi pertama mengikuti proposal UNAIR, Tabel 3.1 dan uraian Make It Personal pada halaman 18–19: kedekatan isu melalui dampak terhadap keseharian. Tidak ada profil atau kesaksian rekaan.

Satu scene full-bleed dengan tiga perspektif tombol (udara, aktivitas, perlindungan warga), cross-dissolve narasi, transisi masuk dari aset gosong yang sudah ada, tautan lanjut dan pertanyaan akhir. Tidak ada scroll-pinning/engine baru, autoplay carousel, dependensi, font atau audio baru. Footer tetap setelah section ini. The Prevention Lab belum dibangun.

Foto yang dipakai hanya satu, sesuai batas maksimal tiga: Pekanbaru-hazy-streets.jpg, Rina Zuhairina, 14 September 2015, Pekanbaru, Riau. Commons menyatakan CC0 1.0 dan konfirmasi izin VRT #2017121310003409. Sumber https://commons.wikimedia.org/wiki/File:Pekanbaru-hazy-streets.jpg ; lisensi https://creativecommons.org/publicdomain/zero/1.0/ . File lokal public/assets/images/make-it-personal/pekanbaru.webp (960×1280, 76.956 byte), dikonversi tanpa generative editing. Foto dipertahankan sebagai konteks kota yang sama saat narasi berganti, tidak diklaim mewakili kejadian lain. Caption/alt/kredit/link lisensi tampil. Dua kandidat foto lainnya tidak dipakai; unduhan server dibatasi, tidak diganti foto tanpa izin.

Fakta umum kesehatan dan gangguan layanan merujuk WHO https://www.who.int/health-topics/wildfires . Tidak ada angka korban, identitas pengendara, diagnosis orang dalam foto, atau klaim kejadian terkini. Pemeriksaan sumber dan lisensi: 10 November 2026. Metadata lengkap: credits.json di folder foto.

File ditambah: src/content/makeItPersonal.ts; src/features/make-it-personal/MakeItPersonal.tsx dan makeItPersonal.css; src/features/jejak-kehidupan/jejakChapter.ts; scripts/check-personal.mjs; scripts/prepare-personal-photos.py; aset foto dan credits.json. File disesuaikan: JejakKehidupanPage.tsx (urutan sebelum footer), JejakAudio.tsx (fade-out dan sunyi pada bab personal), BeforeTheFire.tsx (tautan lanjut dari penutup).

Typecheck, lint dan production build dijalankan. Tes data foto/lisensi, tiga perspektif, batas bab sunyi serta reverse scroll, lifecycle StrictMode dan regresi AudioEngine lulus. Foto lokal diperiksa visual dan decode. Tidak ada pengujian interaksi/visual desktop-mobile browser baru karena origin localhost masih diblokir izin tersimpan pada pemeriksaan sebelumnya; tidak menggunakan screenshot lama sebagai bukti. CSS menyediakan mobile dan reduced motion, tetapi hasil tampilannya belum diverifikasi di browser. Tidak mengklaim FPS perangkat fisik.

## Revisi periode terbaru
Foto 2015 di atas merupakan catatan implementasi lama, sudah tidak aktif. Pengganti: Medan, 15 Oktober 2026, Nafisathallah; CC BY-SA 4.0. Sumber: https://commons.wikimedia.org/wiki/File:Kota_Medan_diselimuti_Kabut_Asap_Oktober_2026_1.jpg . Foto WebP aktif medan-2026.webp, 1280x720, 191.078 byte. Resize/WebP dan crop tampilan; turunan foto didistribusikan dengan lisensi yang sama. Source, alt, caption, teks dan credits.json sudah disesuaikan. Tes menolak metadata aktif bertahun 2015.
