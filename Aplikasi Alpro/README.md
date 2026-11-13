# EksponenKu — Aplikasi Belajar Bilangan Berpangkat untuk Siswa SMP

> *Nama kerja (working title), dapat diganti sebelum rilis.*

EksponenKu adalah aplikasi pembelajaran matematika untuk siswa SMP (Fase D, Kurikulum Merdeka) yang dirancang berdasarkan **Teori Beban Kognitif**. Selain melatih prosedur bilangan berpangkat, aplikasi ini menumbuhkan **literasi matematika** dan melatih siswa **memodelkan soal cerita** menjadi model matematika, lalu menyelesaikannya.

- **JavaScript** (aplikasi) + **Python** (server dan pemeriksa matematika)
- Berjalan di **web** pada **Android, Windows, Mac, dan iOS**
- Dipasang **langsung dari browser**, **tanpa Play Store atau App Store** (PWA). APK Android tersedia sebagai opsi tambahan
- Bisa dipakai **tanpa internet** setelah dibuka pertama kali

## Isi Aplikasi (MVP v0.1.0)

| Bagian | Isi |
|---|---|
| 8 unit materi | Pengertian, perkalian/pembagian, pangkat dari pangkat, **pecahan berpangkat**, pangkat nol & negatif, **menyamakan basis**, notasi ilmiah, **pemodelan matematika** |
| Materi bertahap | 1 konsep per layar, tabel, dan "ide kunci" |
| Contoh soal bertahap | Langkah dibuka satu per satu, sebagian langkah diisi siswa, dan pertanyaan "mengapa" |
| 66 soal latihan | Level Dasar → Menengah → Tantangan, umpan balik miskonsepsi, petunjuk bertingkat, latihan ulang otomatis |
| Lab Pemodelan | 10 soal cerita (8 tipe T1–T8) dengan siklus ① Pahami → ② Buat Model → ③ Selesaikan → ④ Tafsirkan → ⑤ Periksa |
| Misi Literasi | 3 stimulus format AKM (Pemahaman, Penerapan, Penalaran) |
| Pendukung | Kartu Sifat dan pohon keputusan, halaman kemajuan, refleksi (skala usaha mental 1–9), mode gelap, ukuran teks |

> ⚠️ Semua konten masih **draf** dan perlu ditinjau guru matematika sebelum dipakai di kelas.

## Cara Menjalankan

### 1. Coba cepat (tanpa memasang apa pun)
Klik dua kali **`app/index.html`**. Aplikasi terbuka di browser. Untuk memasang dan memakai offline, gunakan cara 2 atau 3.

### 2. Dengan server Python (disarankan untuk pengembangan)
**Cara termudah:** klik dua kali **`jalankan-server.bat`**. Saat pertama kali, file ini menyiapkan Python secara otomatis. Setelah itu browser terbuka di **http://localhost:8000**. Biarkan jendela hitamnya terbuka selama aplikasi dipakai.

Cara manual (Python 3.12 ke atas; sudah diuji dengan 3.14):
```powershell
py -m venv .venv                      # di Windows pakai "py"; "python" bisa mengarah ke Microsoft Store
.venv\Scripts\python.exe -m pip install -r server\requirements.txt
.venv\Scripts\python.exe -m uvicorn server.main:app --reload --port 8000
```
Dokumentasi API tersedia di http://localhost:8000/api/docs.

### 3. Terbitkan untuk siswa
Unggah folder **`app/`** ke hosting HTTPS gratis, misalnya Netlify Drop atau GitHub Pages. Siswa membuka alamatnya lalu memasang aplikasi. Langkah lengkap, termasuk membuat APK Android tanpa Android Studio, ada di [docs/11-panduan-rilis-dan-pemasangan.md](docs/11-panduan-rilis-dan-pemasangan.md).

## Pengujian

```powershell
powershell -ExecutionPolicy Bypass -File tools\run_tests.ps1   # 3.467 uji JS di Edge headless (tanpa Node.js)
python tools\validate_content.py                               # periksa semua kunci jawaban secara eksak (SymPy)
python -m pytest tests                                         # uji server Python
```
Uji JS mencakup mesin matematika, penilai jawaban, kebenaran konten, dan **simulasi siswa** yang mengerjakan semua latihan, Lab Pemodelan, dan Misi Literasi.

## Struktur Folder

```
app/        Aplikasi PWA (HTML, CSS, JS, konten, ikon, service worker) — folder ini yang di-hosting
server/     Server Python FastAPI + pemeriksa matematika SymPy
tools/      Skrip uji, validasi konten, pembuat ikon
tests/      Uji JS (browser) dan uji Python (pytest)
docs/       Dokumen perencanaan
```

## Peta Dokumen

| Dokumen | Isi |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Panduan untuk asisten AI (Claude Code) saat mengembangkan proyek ini |
| [docs/PRD.md](docs/PRD.md) | Product Requirements Document: apa yang dibangun dan mengapa |
| [docs/01-riset-pengguna.md](docs/01-riset-pengguna.md) | Sintesis wawancara, persona, dan matriks temuan → fitur |
| [docs/02-desain-instruksional.md](docs/02-desain-instruksional.md) | Prinsip Teori Beban Kognitif, alur belajar, peta materi |
| [docs/03-arsitektur-teknis.md](docs/03-arsitektur-teknis.md) | Tech stack, arsitektur, model data, struktur folder |
| [docs/04-desain-ui-ux.md](docs/04-desain-ui-ux.md) | Design system, daftar layar, aksesibilitas |
| [docs/05-spesifikasi-konten.md](docs/05-spesifikasi-konten.md) | Format konten dan bank soal |
| [docs/06-rencana-pengujian.md](docs/06-rencana-pengujian.md) | Pengujian teknis, uji usabilitas, evaluasi beban kognitif |
| [docs/07-roadmap.md](docs/07-roadmap.md) | Linimasa, milestone, sprint, risiko |
| [docs/08-glosarium.md](docs/08-glosarium.md) | Istilah yang dipakai |
| [docs/09-literasi-matematika.md](docs/09-literasi-matematika.md) | Kerangka literasi (PISA/AKM), siklus pemodelan, 8 tipe soal cerita, rubrik |
| [docs/10-asisten-pemodelan-ai.md](docs/10-asisten-pemodelan-ai.md) | Rancangan Asisten Pemodelan AI (Fase 2) |
| [docs/11-panduan-rilis-dan-pemasangan.md](docs/11-panduan-rilis-dan-pemasangan.md) | Cara merilis, membuat APK, dan memasang di tiap perangkat |

## Tim

| Peran | Nama |
|---|---|
| Peneliti / Pewawancara | Ahmad Ismut Thoriequddin |
| Product owner | *(isi)* |
| Developer | *(isi)* |
| Desainer UI/UX | *(isi)* |
| Validator materi (guru matematika) | *(isi)* |
