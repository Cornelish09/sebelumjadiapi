# Narasi Meditations

Sumber pengguna tetap berada di docs/SEBELUMJADIAPI_5_NARASI_MEDITATIONS.docx dan docs/SEBELUMJADIAPI_MEDITATIONS_TRANSCRIPTS.json. Salinan data yang dibaca website ada di src/content/meditations/transcripts.json. Deskripsi intro berasal dari field intro; naskah tidak ditulis ulang oleh komponen.

## Mengaktifkan sinkronisasi yang sudah ditinjau

Isi start dan end dalam detik berdasarkan rekaman narasi final melalui transkripsi dan forced alignment, lalu tinjau sambil mendengarkan. Jangan membagi durasi menurut jumlah kalimat atau kata. Setiap cue harus berurutan, tidak tumpang tindih, dan berakhir di dalam durasi MP3. Jika kata-kata dalam rekaman berbeda, selaraskan versi naskah terlebih dahulu. Peace pada DOCX secara eksplisit memakai versi panjang, sedangkan rekaman perlu dicocokkan dengan versi itu.

Sesudah audio dan timing benar-benar ditinjau, lengkapi field episode berikut pada salinan runtime:

- audioContentsVerified: true
- audioKind: "narration"
- timingStatus: "VERIFIED"
- alignment.audioSrc: path MP3 yang sama dengan konfigurasi episode
- alignment.duration: durasi asli MP3 dalam detik
- alignment.reviewedAt: tanggal peninjauan yang sebenarnya
- alignment.method: metode transkripsi/alignment dan pemeriksaan yang benar-benar dilakukan
- cues: id dan text asli, start/end angka yang sudah diverifikasi

Jangan mengisi identitas atau tanggal peninjauan fiktif. Jika status, path, durasi, atau salah satu cue tidak valid, seluruh episode kembali ke mode baca manual. Saat MP3 diganti, kembalikan timingStatus ke UNALIGNED dan periksa ulang semua waktu, meskipun nama file atau durasinya sama.

## Perilaku player

Intro mengecil hanya sesudah event playing dari elemen audio. Clock narasi membaca currentTime asli; update React hanya terjadi saat cue berubah. Fade berada pada satu node teks, dihentikan bersama Pause, dan seek mencari interval yang tepat tanpa menjalankan kalimat-kalimat yang dilewati. Akhir audio menampilkan pilihan berikutnya tanpa autoplay. Mode Baca naskah memakai kontrol sebelumnya/berikutnya secara manual dan tidak mengaku sinkron dengan audio.

Jalankan npm run lint, npm run typecheck, npm run build. Uji logika lokal: node tmp/meditations-qa/check-narrative.mjs dan node tmp/meditations-qa/check-audio.mjs. Angka pada fixture tes tidak digunakan dalam naskah produksi.

## File yang berubah pada tahap ini

- src/features/meditations/MeditationsPage.tsx: struktur halaman dan pemilihan episode.
- src/features/meditations/MeditationSession.tsx: intro, mode baca, narasi dan akhir episode.
- src/features/meditations/MeditationPlayer.tsx: kontrol yang sama untuk intro dan mini player.
- src/features/meditations/NarrativeText.tsx: fade dan posisi teks berdasarkan clock audio.
- src/features/meditations/useNarrativeCue.ts: pemilihan cue dan cleanup RAF/subscription.
- src/features/meditations/narrativeTimeline.ts: validasi timing dan pencarian interval.
- src/features/meditations/meditations.css: komposisi, transisi, mobile dan reduced motion.
- src/features/audio/AudioEngine.ts: state playback berhasil/akhir, volume, seek dan pembatalan play yang tertinggal.
- src/content/meditations.ts: deskripsi lama dilepas; konfigurasi visual/audio dipertahankan.
- src/content/meditationTranscripts.ts dan src/content/meditations/transcripts.json: kontrak dan data naskah.
- docs/MEDITATIONS_AUDIO_AUDIT.json, docs/PROJECT_STATUS.md, docs/DECISION_LOG.md dan panduan ini: bukti audit, status dan keputusan.
- .gitignore dan eslint.config.js: mengecualikan lingkungan alat audit sementara, tanpa dependensi aplikasi baru.

Bukti tampilan: tmp/meditations-qa/intro-mobile.png, reader-mobile.png dan reader-desktop.png. Browser QA tidak menemukan error console pada sesi final. Sinkronisasi teks otomatis produksi tetap belum diaktifkan karena belum ada timing final yang ditinjau.
