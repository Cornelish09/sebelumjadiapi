# Show Your Action dan Stay in the Movement — 10 November 2026

Dua bab terakhir aktif setelah Take Action. Urutan: Why It Matters → Before the Fire → Make It Personal → Prevention Lab (tambahan) → Take Action → Show Your Action → Stay in the Movement → footer akademik. Tidak mengubah enam bagian wajib menjadi tujuh.

File baru:
- src/content/campaignParticipation.ts: hashtag, panduan posting, tiga contoh simulasi, link sosial dan MoNa.
- src/features/show-your-action/ShowYourAction.tsx, showYourAction.css: mekanisme challenge, salin hashtag/panduan dengan status dan textarea fallback, link platform, tiga contoh editorial berlabel simulasi.
- src/features/stay-in-movement/StayInMovement.tsx, useClosingParallax.ts, stayInMovement.css: finale full-bleed dengan aset hero orisinal yang sudah ada, CTA MoNa dan kembali ke awal tanpa reload. Parallax maksimum beberapa piksel, damping delta time, RAF berhenti saat settle/offscreen/hidden, perubahan reduced motion dihormati, touch statis.
- scripts/check-campaign-finale.mjs: tes render SSR aktual dua komponen, data dan salin/fallback, struktur perjalanan.

Disambungkan: JejakKehidupanPage.tsx (dua section dan footer akhir), TakeAction.tsx/takeAction.css (anchor menuju Show Your Action). Footer menyebut prototipe akademik tanpa afiliasi/persetujuan WWF. Tidak ada aset gambar baru, backend, database, model, font, dependensi atau audio baru.

Show Your Action: headline/subteks sesuai brief; tiga langkah memilih, mendokumentasikan dan mengunggah sendiri. Galeri tiga contoh: verifikasi informasi, edukasi gambut, catatan kegiatan lingkungan. Tidak ada identitas, foto peserta, testimony, like, jumlah peserta, feed live, upload atau janji unggahan diterima WWF. Label Simulasi konten kampanye terlihat di galeri dan isi setiap contoh menggunakan penanda Contoh konten. Konsep kurasi mencantumkan izin pemilik, moderasi dan pengelolaan resmi.

Stay in the Movement: headline/subteks sesuai brief; background public/assets/hero/forest-clean-soft.webp (orisinal proyek, provenance hero tetap). CTA https://membership.wwf.id/id diperiksa melalui web 10 November 2026, laman resmi MoNa dapat dibaca. Instagram https://www.instagram.com/ dapat dibuka sebagai laman platform; https://www.tiktok.com/ adalah tautan platform umum, tetapi fetch web tool ditolak akses sehingga tidak mengklaim sesi pengguna atau alur posting TikTok telah diuji. Link tidak mengirim posting otomatis. Akun/login dan kebijakan platform tetap berlaku.

Hasil tes: lint dan production build termasuk TypeScript lulus. check-campaign-finale.mjs merender kedua komponen lewat Vite SSR/ReactDOMServer: tepat tiga article contoh, label simulasi, tombol salin, anchor antar section, MoNa, enam bab plus Lab berurutan dan footer terakhir, tanpa form. Payload hashtag/panduan dan clipboard denied → manual fallback lulus. check-take-action.mjs, check-audio-lease.mjs dan check-before-fire.mjs lulus untuk fungsi share/copy serta regresi audio satu instance.

Batas QA: SSR bukan browser. Clipboard OS, klik platform/login/posting, parallax langsung, viewport desktop/mobile, keyboard/touch dan FPS belum diperiksa langsung karena izin localhost tersimpan masih memblokir alat browser pada upaya sebelumnya. Tidak memakai screenshot lama sebagai bukti versi ini. Tidak ada konten publik yang benar-benar dikirim/diterima atau pendaftaran MoNa yang dilakukan. Seluruh bab setelah Make It Personal tetap sunyi mengikuti manager yang sudah ada.
