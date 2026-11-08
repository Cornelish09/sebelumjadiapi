# AGENTS.md — SEBELUMJADIAPI

Baca dan hormati `docs/SEBELUMJADIAPI_MASTER.md` sebelum mengubah kode. Jika berkonflik dengan permintaan eksplisit terbaru pengguna, jelaskan konflik dan perbarui decision log. Jangan mengarang persetujuan dari WWF atau dosen.

## Tujuan dan prioritas

- Prototipe akademik `#SebelumJadiApi` untuk Digital Public Relations WWF Indonesia, **BUKAN situs resmi WWF**.
- Wajib mempertahankan 6 section: Why It Matters; Before the Fire; Make It Personal; Take Action; Show Your Action; Stay in the Movement.
- Fokus awal: frontend immersive pohon 3D orisinal, partikel bergerak, sound opt-in, teks naratif bertahap, cursor interaction, hotspot, tiga kondisi pohon, performance/fallback.
- UI hitam dominan, selaras karakter WWF, bukan klon Of the Oak atau Avatar. Animasi harus membantu pemahaman sebelum api muncul.
- Jangan mengerjakan backend kompleks, autentikasi, database, AI/ML, kecuali diminta secara eksplisit di kemudian hari.

## Aturan source dan legal

- Data nyata harus mempunyai sourceUrl, periode, dan status verifikasi.
- Simulasi gambut, state api, konten UGC demo, dan skenario ilustratif wajib berlabel.
- Logo WWF tidak boleh dimodifikasi. Jangan mengklaim kerja sama resmi WWF.
- Dilarang mengambil model, musik, font, gambar, atau kode tanpa izin dari Of the Oak, Avatar, atau situs lain.

## Arsitektur kode

- Gunakan pembagian `src/features/<nama-fitur>/` untuk setiap domain.
- `src/features/meditations/` harus independen; `src/features/living-tree/` memisahkan Canvas, particles, fire, hotspots, camera, hooks, config.
- Konten di `src/content/`, global tokens di `src/styles/`, aset lisensi di `public/assets/`.
- TypeScript untuk kontrak data. Jangan meletakkan semua JSX, HTML, animasi, dan source data dalam satu file.
- Semua kontrol penting harus diakses oleh keyboard/touch dan punya fallback bila WebGL gagal.

## Disiplin implementasi

1. Audit file dan pahami fase terkini di `docs/PROJECT_STATUS.md`.
2. Kerjakan milestone sesuai master. Jangan loncat ke full site sebelum core POC stabil.
3. Jangan mengganti bagian yang sudah berfungsi tanpa kebutuhan jelas.
4. Sesudah perubahan, jalankan lint/typecheck/build/test yang tersedia; laporkan hasil sebenarnya.
5. Update PROJECT_STATUS.md dan DECISION_LOG.md jika keputusan berubah.
6. Laporkan file yang diubah dan bagaimana cara mengujinya.
7. Dokumentasi dan komentar berbasis Bahasa Indonesia yang mudah dipahami nonprogrammer.

## Standar kualitas minimum

Responsif; performa diprofilkan; reduced motion; audio opt-in; sumber setiap klaim; disclaimer akademik; no faux functioning controls; no fabricated metrics; no unlicensed assets; no disabled navigation masquerading as working.
