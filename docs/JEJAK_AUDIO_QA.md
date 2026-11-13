# Integrasi audio Jejak — 10 November 2026

File aktual diperiksa dengan Mutagen: Why It Matters.mp3 167,616 detik; Before The Fire_The Last Breath.mp3 99,096 detik. Folder: public/assets/audio/jejak kehidupan/. Path di-encode sekali oleh AudioEngine.

Diubah: AudioEngine.ts (opsi loop), BeforeTheFire.tsx (melepas pemilik audio lama), JejakKehidupanPage.tsx. Ditambahkan: JejakAudio.tsx, jejakAudio.css dan src/content/jejakAudio.ts. Kontrol suara opt-in, jeda/putar, ulang soundtrack, error, pergantian bab dan cleanup memakai elemen audio tunggal. Why berulang; Before tidak berulang dan tidak restart tiap fase/cursor. Fade perpindahan memakai manager yang ada.

Belum selesai: cue emosional belum diverifikasi lewat pendengaran. fireAudioCalibration berstatus pending dan cues null. Guided Journey serta seek otomatis per fase belum diaktifkan; tidak membagi durasi rata-rata atau mengarang waktu. Saat ini eksplorasi tetap scroll bebas dengan komposisi audio kontinu. Seamless loop MP3 dan kualitas fade lewat pendengaran belum diuji.

Lint dan production build termasuk TypeScript lulus. Tes FakeAudio meliputi loop/non-loop, pause/resume, seek, cleanup lintas halaman, isolasi sumber dan satu instance; regresi Home lulus. File ditemukan dan durasinya diparse, bukan uji decoding browser. Interaksi browser/pendengaran belum diverifikasi karena blokir izin localhost yang tercatat sebelumnya.
