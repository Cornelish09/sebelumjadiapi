# Publikasi production — 10 November 2026

URL publik: https://sebelumjadiapi.sappyfinch257.chatgpt.site

Domain utama sejak 10 November 2026: https://sebelumjadiapi.my.id . Custom domain appgdom_6af228642b688191bef6e387c84158df berstatus active, SSL active. Dua A record dan dua TXT verifikasi disimpan lewat panel DNS DewaBiz dengan TTL 300. HTTP halaman 200 dan seluruh 75 berkas build dapat diakses tanpa autentikasi; Home juga tampil di browser dengan alamat domain sendiri. Respons HTML pada pemeriksaan ini 0,143 detik (bukan pengukuran FPS). Auto-renew registrar terverifikasi OFF; panel mencantumkan berakhir 9 November 2027. Pengguna melaporkan verifikasi email selesai; panel terakhir masih menampilkan Menunggu verifikasi email sehingga sinkronisasi status registrar belum terkonfirmasi.

Sites project: appgprj_6af222ac9df0819181994d8a1b61663f. Deployment appgdep_6af223a2e46c819185fd98ccec3b3ed1 berhasil, audience public. Commit sumber publikasi: b4e3f8e747292c81fd3ac98b14d13232fc92725f.

## Kelengkapan dan optimasi

- Home, Meditations, enam bab Jejak Kehidupan, dan Prevention Lab disertakan.
- Semua 64 berkas public dicocokkan SHA256 terhadap build; tidak ada yang tertinggal. Dokumen kerja, model transkripsi, dan kredensial tidak masuk paket publik.
- React.lazy memisahkan halaman Meditations dan Jejak. JS awal turun dari sekitar 356 KB menjadi 236,65 KB; CSS awal dari sekitar 58 KB menjadi 8,70 KB. Ini ukuran build, bukan pengukuran FPS.
- Konfigurasi identitas hosting disimpan di .openai/hosting.json; gunakan project yang sama untuk pembaruan berikutnya.

## Pemeriksaan yang dilakukan

- Lint, TypeScript dan production build lulus.
- Regresi Before the Fire, Prevention Lab (27 jalur), Make It Personal, Take Action dan audio lease lulus.
- HTTP tanpa autentikasi: halaman utama 200; 75 berkas build berhasil diakses. index.html melakukan redirect normal ke halaman utama. Hasil di tmp/publication-check.json.
- Respons HTML sekitar 2,23 detik pada koneksi pemeriksaan ini; bukan hasil Lighthouse atau jaminan kecepatan semua pengguna.
- MP3 benar-benar tersedia dengan Content-Type audio/mpeg. Permintaan byte range dibalas 200 penuh, tanpa Content-Range; dukungan partial streaming 206 tidak terverifikasi pada hosting ini.
- Browser publik: Home tampil, navigasi Meditations dan Jejak berhasil, putar Meditations berjalan sampai 0:25 dan narasi berganti otomatis. Scene Before the Fire dan finale tampil.
- Viewport 390×844: Before the Fire menyesuaikan layout, tombol fase membungkus dan teks terbaca. Override viewport sudah dikembalikan.

## Batas verifikasi

Belum mengukur FPS, Lighthouse/Core Web Vitals, atau mendengarkan keluaran audio di perangkat fisik. Ketersediaan file bukan bukti seluruh transisi audio/seek sudah diuji ulang di production. Autoplay tetap mengikuti kebijakan browser.
