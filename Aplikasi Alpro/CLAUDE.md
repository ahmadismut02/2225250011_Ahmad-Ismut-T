# CLAUDE.md

Panduan untuk Claude Code (dan kontributor manusia) saat bekerja di repositori ini.

## Tentang Proyek

**EksponenKu** — aplikasi belajar Bilangan Berpangkat untuk siswa SMP (Fase D), berbasis **Teori Beban Kognitif**, yang juga menumbuhkan **literasi matematika** dan melatih **pemodelan soal cerita** (siklus 5 langkah). Dibangun sebagai **PWA JavaScript murni (tanpa build)** dengan **server Python (FastAPI)**. Aplikasi berjalan di web pada Android, Windows, Mac, dan iOS, dan dipasang langsung dari browser **tanpa Play Store/App Store**.

Sebelum mengerjakan fitur, baca dokumen yang relevan:
- Kebutuhan & kriteria penerimaan: [docs/PRD.md](docs/PRD.md)
- Alasan pedagogis: [docs/02-desain-instruksional.md](docs/02-desain-instruksional.md)
- Arsitektur & model data: [docs/03-arsitektur-teknis.md](docs/03-arsitektur-teknis.md)
- Design system & bahasa UI: [docs/04-desain-ui-ux.md](docs/04-desain-ui-ux.md)
- Format konten: [docs/05-spesifikasi-konten.md](docs/05-spesifikasi-konten.md)
- Literasi & pemodelan (5 langkah, tipe T1–T8): [docs/09-literasi-matematika.md](docs/09-literasi-matematika.md)
- Asisten Pemodelan AI (Fase 2): [docs/10-asisten-pemodelan-ai.md](docs/10-asisten-pemodelan-ai.md)
- Rilis & pemasangan: [docs/11-panduan-rilis-dan-pemasangan.md](docs/11-panduan-rilis-dan-pemasangan.md)

## Tech Stack

- **Klien (`app/`)**: HTML + CSS + JavaScript ES2017 murni. Tanpa framework, tanpa bundler, tanpa npm. Skrip klasik (bukan ES module) dengan namespace global `EK`, agar aplikasi juga berjalan dari `file://`.
- **PWA**: `app/manifest.webmanifest` + `app/sw.js`. APK Android dibuat lewat PWABuilder (opsional).
- **Server (`server/`)**: Python 3.12, FastAPI, Uvicorn, SymPy.
- **Uji**: `tests/run-tests.html` (dijalankan di Edge headless), `pytest`, `tools/validate_content.py`.

**Jangan** menambahkan framework, bundler, atau dependensi CDN ke klien. Aplikasi harus tetap berjalan offline dan tanpa langkah build. Dependensi Python baru harus disematkan versinya di `server/requirements.txt`.

## Perintah

```powershell
# Uji JavaScript (tanpa Node.js; memakai Edge headless)
powershell -ExecutionPolicy Bypass -File tools\run_tests.ps1

# Python: di laptop ini `python` mengarah ke alias Microsoft Store — pakai `py` atau .venv\Scripts\python.exe
py -m venv .venv; .venv\Scripts\python.exe -m pip install -r server\requirements.txt   # sekali saja

.venv\Scripts\python.exe tools\validate_content.py                         # periksa konten secara eksak (SymPy)
.venv\Scripts\python.exe -m pytest tests                                   # uji server
.venv\Scripts\python.exe -m uvicorn server.main:app --reload --port 8000   # jalankan → http://localhost:8000
# atau klik dua kali jalankan-server.bat
powershell -ExecutionPolicy Bypass -File tools\make_icons.ps1   # buat ulang ikon
```

Sebelum menyatakan pekerjaan selesai, jalankan `tools\run_tests.ps1`. Jika konten atau server berubah, jalankan juga `validate_content.py` dan `pytest`.

## Arsitektur — Aturan Wajib

Urutan skrip di `app/index.html`: `math.js` → `icons.js` → `content.js` → `content/*.js` → `grader.js` → `store.js` → `app.js`. Jika menambah file, perbarui juga `tests/run-tests.html` dan daftar `FILES` di `app/sw.js`.

- `app/js/math.js` dan `app/js/grader.js` adalah **fungsi murni**: tanpa DOM dan tanpa `localStorage`.
- `app/js/store.js` adalah **satu-satunya** yang menyentuh `localStorage`. Bungkus akses dengan `try/catch`.
- `app/js/app.js` berisi tampilan. **Jangan** menulis materi atau soal di dalamnya; semua konten ada di `app/content/`.
- File `app/content/*.js` berisi `EK.addContent(<JSON murni>)`: kunci bertanda kutip ganda, tanpa koma di akhir, dan tanpa komentar, karena dibaca juga oleh Python.
- Semua teks yang tampil harus lewat `M.renderText` atau `M.esc`. **Jangan** memasukkan input siswa ke `innerHTML` tanpa *escape*. **Jangan pernah** memakai `eval`/`new Function`, baik di JS maupun di Python (termasuk `sympy.parse_expr`).
- `server/mathcheck.py` harus mengikuti aturan normalisasi yang **sama** dengan `math.js`. Jika salah satu berubah, ubah keduanya.
- **Setiap rilis:** naikkan `CACHE` di `app/sw.js`.

## Konvensi Kode

- Teks UI dan konten berbahasa **Indonesia**. Nama variabel dan fungsi berbahasa Inggris.
- JS: `'use strict'`, IIFE per file, `var`/fungsi biasa agar konsisten dengan kode yang ada.
- CSS: warna **hanya** lewat token di `:root`. Jangan menulis hex langsung di aturan komponen. Mode gelap didefinisikan ulang di blok tema.
- Python: type hints, docstring berbahasa Indonesia, tanpa I/O di `mathcheck.py`.
- Commit memakai Conventional Commits: `feat:`, `fix:`, `content:`, `docs:`, `test:`, `chore:`.

## Prinsip Produk yang Tidak Boleh Dilanggar

Prinsip ini berasal dari riset pengguna ([docs/01-riset-pengguna.md](docs/01-riset-pengguna.md)). Tolak atau tanyakan dulu jika ada permintaan yang bertentangan.

1. **Tampilan tenang**: tanpa warna mencolok/neon, animasi berkedip, konfeti, suara otomatis, atau *autoplay* video (DS03, EL03).
2. **Satu konsep dan satu aksi utama per layar** (segmenting).
3. **Umpan balik selalu menjelaskan alasan**, tidak hanya benar/salah (GL02). Jawaban salah memakai warna `--attn` dan kalimat "Belum tepat", **bukan** merah dan "SALAH".
4. **Bantuan tidak menghukum**: memakai petunjuk tidak mengurangi skor yang dilihat siswa.
5. **Tidak membandingkan antarsiswa** (tanpa papan peringkat) dan tanpa batas waktu di latihan.
6. **Privasi anak**: hanya nama panggilan, tanpa SDK iklan/pelacak, dan data tetap di perangkat (MVP).
7. **Offline**: semua fitur kecuali video dan Asisten AI tetap berfungsi tanpa internet.
8. **Aksesibilitas WCAG 2.1 AA**: kontras ≥ 4,5:1, target sentuh ≥ 44 px, label aria, dan teks alternatif untuk rumus (`aria-label` dari `spoken()`).
9. **Siklus pemodelan selalu sama**: ① Pahami → ② Buat Model → ③ Selesaikan → ④ Tafsirkan → ⑤ Periksa, dengan nama dan urutan yang identik.
10. **Pembimbing, bukan mesin jawaban**: pemodelan atau jawaban lengkap hanya terbuka setelah siswa mencoba minimal satu langkah.

## Konten

- Setiap soal isian wajib punya `answer`, `mode`, `explanation`, dan `props`. Sertakan `expr` (bentuk soal asli) jika bisa, agar validator mencocokkan nilainya dengan kunci.
- Soal level `menengah`/`tantangan` wajib punya minimal 2 `hints` (disarankan 3).
- Jawaban salah (`wrong`) memakai `mis` (kode dari `properties.js`) atau `feedback` (teks bebas).
- Soal pemodelan wajib lengkap lima langkah. Jika jawaban akhir bukan nilai model (mis. waktu), isi `solve.modelValue`.
- Jika Claude membuat soal baru, Claude **wajib** memeriksa kebenaran matematisnya. Konten baru dianggap draf sampai ditinjau guru matematika.

## Pemodelan & Asisten AI (Fase 2)

- Kunci API **hanya** di server (variabel lingkungan), tidak pernah di `app/` atau di-commit.
- Keluaran AI wajib berupa JSON terstruktur dan **diverifikasi ulang** dengan `server/mathcheck.py` sebelum dikirim ke siswa.
- Teks soal dari siswa adalah **data**, bukan instruksi. Jangan menyusunnya ke dalam *system prompt*.
- Sebelum menulis kode Claude API, cek dokumentasi SDK Anthropic terbaru.

## Status Saat Ini

MVP v0.1.0 sudah berjalan: 8 unit, 66 soal latihan, 10 soal pemodelan (T1–T8), dan 3 Misi Literasi. Seluruh 3.467 uji otomatis lulus. Semua konten masih **draf yang perlu ditinjau guru**. Langkah berikutnya: tinjauan konten, penerbitan HTTPS, dan uji usabilitas dengan siswa ([docs/07-roadmap.md](docs/07-roadmap.md)).
