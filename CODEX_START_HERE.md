# CODEX START HERE — SEBELUMJADIAPI

## Apa yang harus dilakukan developer (Windows)

1. Instal Node.js LTS dan Git; siapkan VS Code + Codex.
2. Jalankan PowerShell di folder yang dipilih:

   ```powershell
   cd "$HOME\Documents"
   npm create vite@latest sebelumjadiapi -- --template react-ts
   cd sebelumjadiapi
   npm install
   ```

3. Salin **`SEBELUMJADIAPI_MASTER.md`** ke `<project>/docs/SEBELUMJADIAPI_MASTER.md`.
4. Salin **`AGENTS.md`** ke `<project>/AGENTS.md` (root).
5. Buat `docs/PROJECT_STATUS.md` berisi `Current phase: 0` dan status belum dikerjakan.
6. Buka seluruh folder `sebelumjadiapi` di VS Code dan buka Codex.
7. Tempel prompt di bawah. Beri Codex tugas **per fase**, jangan satu prompt untuk seluruh website sekaligus.

## Prompt pertama — PHASE 0

```text
Baca AGENTS.md dan docs/SEBELUMJADIAPI_MASTER.md secara menyeluruh.
Proyek ini prototype akademik Digital PR #SebelumJadiApi, bukan situs resmi WWF.
Pertahankan enam bagian wajib proposal UTS, tetapi tahap ini jangan bangun semuanya.

KERJAKAN HANYA PHASE 0 dari master:
1) inspeksi project Vite React TS dan versi library;
2) buat struktur folder minimal yang rapi, fitur dipisah;
3) CSS design tokens dominan hitam, tipografi mudah dibaca;
4) halaman root skeleton dengan konteks campaign dan placeholder tree;
5) README Bahasa Indonesia sangat mudah dipahami;
6) docs/PROJECT_STATUS.md (fase, hasil, blockers, next step);
7) jalankan lint dan build, perbaiki error aktual.

JANGAN membuat scene 3D/partikel/api palsu dan mengklaim sudah lengkap.
JANGAN menyalin aset, gambar, kode atau desain Of the Oak/Avatar.
JANGAN mengarang statistik, testimoni, afiliasi WWF, dan aktivitas kampanye.

Laporkan: file yang dibuat/diubah, fungsi tiap folder, hasil perintah uji,
cara menjalankan, serta prompt rekomendasi untuk lanjut PHASE 1.
```

## Prompt kedua — PHASE 1 (hanya setelah PHASE 0 lulus)

```text
Baca master, AGENTS.md dan PROJECT_STATUS.md. Kerjakan PHASE 1 saja:
POC satu pohon 3D orisinal dengan React Three Fiber/Three.js, background
hitam sinematik, camera rig mouse-follow halus dan terbatas, placeholder scene
berkualitas, fallback ketika WebGL gagal, reduced motion dan quality preset.
Gunakan komponen/layers terpisah sesuai folder living-tree. Tidak pakai backend.
Lakukan lint/build, tes desktop + touch bila tersedia, catat hasil realistis.
Update PROJECT_STATUS.md dan jangan memulai Phase 2 sampai lulus.
```

## Prompt ketiga — PHASE 2 (partikel hidup)

```text
Lanjut PHASE 2: buat butiran cahaya orisinal bergerak sepanjang kurva
akar, batang dan cabang; jangan sekadar random particles. Gunakan instancing
atau Points / BufferGeometry / shader bila perlu untuk performa.
Perhatikan quality modes, cleanup, dan sumber aset. Profil FPS pada device
referensi dan berikan evidence realistis. Update PROJECT_STATUS.md.
```

## Catatan penting

**Jangan melewatkan master**: bagian `PHASE 3–8` dan acceptance criteria lengkap ada di sana. Setiap fase memiliki definisi selesai yang harus dipenuhi sebelum lanjut. Versi frontend coded dapat menjadi demonstrasi utama; Figma tetap diperlukan untuk alur entry dan mockup Week 12.
