# Take Action — 10 November 2026

Step 04 aktif setelah Prevention Lab; Show Your Action hanya penutup/penanda bab mendatang, bukan kontrol palsu. Footer akademik tetap terakhir. Lima baris tipografis memakai accordion button aria-expanded, keyboard native dan reduced motion. Tidak ada aset, audio, font, backend, model atau dependensi baru.

File baru: src/content/takeAction.ts; src/features/take-action/TakeAction.tsx, shareActions.ts, takeAction.css; scripts/check-take-action.mjs. Disambungkan pada JejakKehidupanPage.tsx; penanda Take Action di PreventionLab.tsx sekarang anchor internal berfungsi dengan style pada preventionLab.css.

Learn menuju Before the Fire/simulasi serta materi UNEP. Check berisi checkbox tanggal kejadian, lokasi, konteks foto, sumber. Share menampilkan kartu fakta, copy pesan/sumber, native share dengan copy fallback, unduh SVG mandiri bersumber dan berlabel akademik. Invite menyediakan pesan dan wa.me berisi teks yang di-encode, tanpa mengirim otomatis. Jika Clipboard gagal, textarea read-only menampilkan teks untuk disalin manual; pembatalan share tidak dianggap berhasil. Tidak ada metrik partisipasi atau data pribadi.

Pesan memakai tautan sumber publik UNEP, bukan alamat localhost yang tidak dapat diakses penerima. Status berbagi hanya menyatakan API selesai, bukan bukti pesan dipublikasikan. Status unduh menyatakan berkas disiapkan, bukan konfirmasi penyimpanan OS.

Rujukan diperiksa melalui web pada 10 November 2026:
- https://www.unep.org/en/news-and-stories/story/fighting-fires-indonesias-peatlands : gambut yang dikeringkan lebih rentan terbakar; pembasahan/pengelolaan air.
- https://www.kehutanan.go.id/updatekarhutla : informasi resmi karhutla.
- https://wwf.id/id/id/volunteer : program relawan dan pengumuman kesempatan melalui kanal resmi. Tidak mengklaim rekrutmen tertentu sedang dibuka.
- https://membership.wwf.id/id : MoNa, program keanggotaan/dukungan konservasi dengan ketentuan pada situs resmi. Tidak mendaftarkan pengguna dari prototipe. Event MoNa yang ditemukan sudah berakhir sehingga tidak ditawarkan sebagai pendaftaran aktif.

Tes check-take-action.mjs lulus: lima jalur tepat, payload copy/share utuh, native share tidak tersedia/ditolak, clipboard ditolak menjadi manual, pembatalan, encoding WhatsApp, isi SVG dan XML escaping. Lint, production build termasuk typecheck, tes Prevention Lab 27 jalur dan audio lease dijalankan. Link rujukan eksternal dibuka via web untuk memeriksa isi/relevansi; kontrol halaman dan integrasi OS/browser clipboard, download, share sheet, WhatsApp, mouse/keyboard/touch belum diuji langsung karena localhost diblokir izin tersimpan. Tidak mengklaim pesan dikirim, file tersimpan, atau QA visual desktop/mobile lulus.
