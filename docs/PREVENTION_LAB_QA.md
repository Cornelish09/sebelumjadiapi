# The Prevention Lab — 10 November 2026

Fitur tambahan setelah Make It Personal, bukan step pengganti enam bagian proposal. Take Action hanya penanda transisi di penutup, tanpa tombol menuju fitur yang belum tersedia. Footer tetap terakhir.

File baru: src/content/preventionLab.ts (tepat tiga skenario, tiga pilihan, satu jawaban terbaik, alasan dan metadata sumber); src/features/prevention-lab/PreventionLab.tsx; labState.ts; preventionLab.css; scripts/check-prevention-lab.mjs. File disambungkan: JejakKehidupanPage.tsx dan MakeItPersonal.tsx/makeItPersonal.css. Tidak menambah aset, font, dependensi, backend atau audio.

Sumber yang diperiksa 10 November 2026:
- UNEP: https://www.unep.org/en/news-and-stories/story/fighting-fires-indonesias-peatlands — pengeringan dan pembasahan gambut.
- Kementerian Kehutanan: https://www.kehutanan.go.id/news/kemenhut-libatkan-masyarakat-peduli-api-kelompok-tani-hutan-masyarakat-adat-dan-relawan-atasi-karhutla — edukasi pengelolaan lahan tanpa bakar dan pelaporan dini.
- Kementerian Kehutanan: https://www.kehutanan.go.id/updatekarhutla — informasi resmi, pencegahan, verifikasi dan pelaporan indikasi. Tidak menciptakan nomor telepon atau form pelaporan.

Interaksi: opsi button dengan aria-pressed, hover/focus/selected, feedback live region, sumber, maju setelah pilihan benar maupun salah, kembali dan mengganti jawaban, fokus judul saat pindah, penutup setelah ketiganya dipilih. Progress 01/03 sampai 03/03. Panel bertumpuk pada grid yang sama; ruang feedback disediakan agar perubahan konten tidak menggeser kontrol. Cross-dissolve CSS, fallback reduced motion, satu kolom mobile. Tidak ada autoplay pertanyaan, timer, scroll pin atau skor rekaan. Simulasi berlabel edukatif, bukan prediksi/panduan darurat.

Pengujian: seluruh 27 kombinasi jawaban melewati tiga pertanyaan hingga selesai, jawaban benar/salah tetap bisa lanjut, kembali mempertahankan pilihan, perubahan jawaban dan batas input lulus. Lint dan production build (termasuk typecheck) dijalankan. Regresi audio lease dan Make It Personal dijalankan. Browser desktop/mobile belum diperiksa ulang karena blokir origin localhost yang tersimpan; tidak mengklaim uji interaksi browser atau pengukuran FPS lulus.

## Revisi visual hitam dan narasi
File diubah: src/content/preventionLab.ts (field scene, situasi, pertanyaan dan alasan diperjelas); PreventionLab.tsx (header dan kolom cerita/keputusan, selected tidak lagi memakai centang yang bisa disalahartikan sebagai jawaban benar); preventionLab.css (hitam netral tanpa hijau, hierarki dan spacing baru, kontrol teks). Logika dan sumber dipertahankan. Tes 27 kombinasi, lint dan build dijalankan ulang. Pemeriksaan visual browser belum tersedia; tidak mengklaim hasil desktop/mobile sudah dilihat langsung.

## Revisi kejelasan simulasi keputusan
Diubah: PreventionLab.tsx dan preventionLab.css. Pengantar tepat sesuai brief; status jawaban eksplisit, sumber dan alasan tetap, tanpa duplikasi jawaban. Tombol lanjut diberi teks lengkap, kontrol membungkus pada layar sempit, fokus judul/live region/aria-pressed tetap. Tes 27 jalur termasuk benar/salah, maju-mundur dan ganti jawaban lulus; ketiga alasan lolos batas tiga kalimat. Lint dan build dijalankan ulang. Mouse, keyboard, touch dan tampilan browser belum diuji langsung karena blokir localhost; tidak menyatakan pengujian tersebut lulus.
