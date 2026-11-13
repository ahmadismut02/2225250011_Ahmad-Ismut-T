# 03 — Arsitektur Teknis

| Atribut | Keterangan |
|---|---|
| Versi | 2.0 (menggantikan rancangan React/Capacitor v1.x) |
| Pendekatan | **PWA JavaScript murni tanpa langkah build** + **server Python (FastAPI)** |
| Platform | Web di Android, Windows, macOS, dan iOS. Dipasang langsung dari browser, **tanpa Play Store/App Store** |
| Prinsip | *Offline-first*, konten terpisah dari kode, bisa dijalankan tanpa memasang alat apa pun |

---

## 1. Keputusan Tech Stack

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Bahasa klien | **JavaScript (ES2017), tanpa framework dan tanpa build** | Permintaan product owner (JavaScript + Python). Bisa langsung dibuka dan di-hosting, mudah dipelajari tim mahasiswa |
| Tampilan | HTML + CSS dengan *design tokens* (`app/css/style.css`) | Palet tenang, mode gelap, aksesibilitas |
| Navigasi | Router berbasis hash (`#/unit/u4`) | Berjalan di `file://`, GitHub Pages, dan semua hosting statis |
| Notasi matematika | Renderer ringan buatan sendiri (`EK.math.renderText`) | Tanpa pustaka eksternal (offline, ringan). Cukup untuk pangkat dan pecahan |
| Penilai jawaban | Parser recursive-descent buatan sendiri (**tanpa `eval`**) | Aman, mendukung `2^7`, `2⁷`, `3×2^n`, `4/9`, `0,005`, `3.000.000` |
| Penyimpanan | `localStorage` (kunci `eksponenku:v1`) | Data tetap di perangkat siswa, cukup untuk MVP |
| Offline & pemasangan | **PWA**: `manifest.webmanifest` + `sw.js` (service worker) | Satu kode untuk semua sistem operasi, bisa dipasang dari browser |
| APK Android (opsional) | **PWABuilder** (pwabuilder.com) → paket TWA | Membuat APK dari URL PWA tanpa Android Studio |
| Server | **Python 3.12 + FastAPI + Uvicorn** | Menyajikan aplikasi, API pemeriksa matematika, dan tempat Asisten AI (Fase 2) |
| Matematika server | **SymPy** dengan parser aman buatan sendiri (`server/mathcheck.py`) | Pemeriksaan eksak (pecahan, pangkat besar) tanpa `parse_expr`/`eval` |
| Uji klien | `tests/run-tests.html` dijalankan di Edge/Chrome headless (`tools/run_tests.ps1`) | Tidak perlu Node.js |
| Uji server & konten | `pytest`, `tools/validate_content.py` | Memeriksa kebenaran kunci jawaban secara eksak |
| AI (Fase 2) | Claude API lewat SDK Python `anthropic`, dari server | Lihat [10-asisten-pemodelan-ai.md](10-asisten-pemodelan-ai.md) |

### 1.1 Catatan Keputusan (ADR ringkas)

| Opsi | Kelebihan | Kekurangan | Keputusan |
|---|---|---|---|
| **PWA JS murni + FastAPI** | Tanpa build, satu kode untuk 4 OS, tanpa toko aplikasi, sesuai permintaan JS + Python | Tidak ada file aplikasi native untuk iOS | ✅ **Dipilih** (v2.0) |
| React + Vite + Capacitor (rencana v1) | Ekosistem komponen | Butuh Node.js dan Android Studio; tidak sesuai permintaan JS murni | ❌ Diganti |
| Flutter / React Native | Performa native | Bukan JS + Python; distribusi iOS tetap butuh App Store | ❌ |
| Python di browser (Pyodide) | Semua logika Python | Unduhan ±10 MB, lambat di HP kelas bawah | ❌ |

**Batasan iOS:** Apple tidak mengizinkan pemasangan file aplikasi dari luar App Store untuk pengguna umum. Di iPhone/iPad, aplikasi dipasang sebagai PWA ("Tambahkan ke Layar Utama"), lalu tampil layar penuh dengan ikon dan bisa dipakai offline.

## 2. Arsitektur Tingkat Tinggi

```
┌──────────────────────── Perangkat siswa (Android / Windows / Mac / iOS) ────────────────────────┐
│  Browser / PWA terpasang                                                                         │
│  ┌──────────────┐   ┌──────────────────────────┐   ┌───────────────────────────┐                 │
│  │ app.js (UI,  │──▶│ math.js  (parser, render)│   │ content/*.js (materi,     │                 │
│  │ router)      │──▶│ grader.js (penilai)      │◀──│ soal, pemodelan, stimulus)│                 │
│  │              │──▶│ store.js (localStorage,  │   └───────────────────────────┘                 │
│  └──────────────┘   │  latihan ulang, level)   │                                                 │
│         ▲           └──────────────────────────┘          sw.js: cache semua berkas → offline    │
└─────────┼────────────────────────────────────────────────────────────────────────────────────────┘
          │ HTTPS (hanya saat pertama kali membuka / memperbarui)
┌─────────┴──────────────────────────┐        ┌───────────────────────────────┐
│ Hosting statis (GitHub Pages,      │   atau │ Server Python (FastAPI)       │
│ Netlify, Vercel) — folder app/     │        │ - menyajikan app/             │
└────────────────────────────────────┘        │ - POST /api/verify (SymPy)    │
                                              │ - POST /api/model-story-problem│
                                              │   (Fase 2 → Claude API)       │
                                              └───────────────────────────────┘
```

**Aturan lapisan:**
- `math.js` dan `grader.js` adalah **fungsi murni**: tanpa DOM, tanpa penyimpanan. Keduanya mudah diuji.
- `store.js` adalah satu-satunya bagian yang menyentuh `localStorage`.
- `app.js` berisi tampilan dan alur. Konten tidak boleh ditulis di dalam `app.js`.
- Aplikasi **tidak bergantung** pada server Python. Server bersifat opsional untuk MVP dan wajib untuk Fase 2.

## 3. Struktur Folder

```
Aplikasi Alpro/
├── CLAUDE.md, README.md
├── docs/                         # dokumen perencanaan
├── app/                          # ← INI yang di-hosting (PWA)
│   ├── index.html                # kerangka halaman + urutan skrip
│   ├── manifest.webmanifest      # identitas aplikasi untuk pemasangan
│   ├── sw.js                     # service worker (offline). Naikkan CACHE saat rilis
│   ├── css/style.css             # design tokens + komponen
│   ├── icons/                    # ikon PNG (dibuat oleh tools/make_icons.ps1)
│   ├── js/
│   │   ├── math.js               # normalisasi, parser aman, evaluasi, render notasi
│   │   ├── content.js            # registri konten (EK.addContent)
│   │   ├── grader.js             # penilaian: value/exact/sci/model, pilihan, multi, benar-salah
│   │   ├── store.js              # localStorage, level, latihan ulang 1-3 hari, statistik
│   │   └── app.js                # router + semua tampilan
│   ├── content/                  # KONTEN (JSON di dalam EK.addContent)
│   │   ├── properties.js         # Kartu Sifat + katalog miskonsepsi
│   │   ├── u1.js … u8.js         # unit: materi, contoh, latihan
│   │   └── modeling.js           # soal pemodelan T1–T8 + stimulus literasi
│   └── downloads/                # (opsional) EksponenKu.apk hasil PWABuilder
├── server/                       # Python
│   ├── main.py                   # FastAPI: sajikan app/, /api/verify, /api/model-story-problem
│   ├── mathcheck.py              # parser aman → SymPy
│   └── requirements.txt
├── tools/
│   ├── run_tests.ps1             # uji JS di Edge headless (tanpa Node)
│   ├── validate_content.py       # periksa konten secara eksak dengan SymPy
│   └── make_icons.ps1            # buat ulang ikon PNG
└── tests/
    ├── run-tests.html, tests.js  # uji mesin, konten, dan simulasi siswa end-to-end
    └── test_server.py            # pytest untuk server
```

## 4. Model Data

### 4.1 Konten (statis)

Setiap file di `app/content/` berisi `EK.addContent({...})` dengan **JSON murni** di dalamnya (kunci bertanda kutip, tanpa komentar). Dengan begitu, file dapat dibaca browser dan juga oleh `tools/validate_content.py`. Format lengkap ada di [05-spesifikasi-konten.md](05-spesifikasi-konten.md).

Notasi di dalam teks: `$...$` untuk matematika, `a^b` atau `a^{...}` untuk pangkat, `[p/q]` untuk pecahan bertingkat, dan `**tebal**` untuk penekanan.

### 4.2 Data siswa (`localStorage` → `eksponenku:v1`)

```js
{
  version: 1,
  profile: { nickname, grade, createdAt },                 // hanya nama panggilan
  settings: { textScale, theme, reduceMotion },
  units: { u4: { lastSegment, done: { materi, contoh, 'latihan-dasar', cerita, misi, refleksi, ... },
                 solved: { dasar: { 'u4-x1': true }, ... }, manualUnlock: {} } },
  attempts: [ { kind: 'exercise'|'model-step'|'literacy', ex|model|q, step?, props?, correct, mis?, hints?, first, t } ],
  review: { 'u4-x2': { stage, due, streak } },             // latihan ulang
  modeling: { 'm-bola': { done: { understand: true, ... }, attempts, revealed, finished } },
  missions: { 'lit-2': { answers: { 'lit-2-q1': { correct, level, ended } } } },
  reflections: [ { unit, effort: 1..9, notes: [...], t } ],
  lastUnit: 'u4'
}
```
`attempts` dibatasi 800 entri terakhir. Data dapat diunduh siswa sebagai JSON dari Pengaturan, misalnya untuk keperluan penelitian dengan persetujuan.

## 5. Komponen Domain

| Komponen | File | Aturan |
|---|---|---|
| Penilai isian | `grader.js → gradeInput` | `value`: nilai sama. `exact`: bentuk tertulis sama. `sci`: notasi ilmiah. `model`: setara (huruf diuji 5 nilai) dan berbentuk pangkat/variabel. Urutan pengecekan: kunci → jawaban salah dikenal (tulisan) → "nilai benar, bentuk salah" → jawaban salah dikenal (nilai) → umum |
| Level | `store.isUnlocked` | Level terbuka jika ≥ 80% soal level sebelumnya pernah benar, atau dibuka manual oleh siswa |
| Latihan ulang | `store.scheduleWrong/reviewResult` | Salah pada percobaan pertama → muncul besok. Benar saat diulang → 3 hari lagi. Benar 2× → keluar dari daftar |
| Lab Pemodelan | `app.js → labView` | 5 langkah. Langkah interaktif bergantung pada `stage` (contoh/rumpang/terbimbing). "Pemodelan Lengkap" terbuka setelah ≥ 1 percobaan |
| Pemeriksa server | `server/mathcheck.py` | Aturan sama dengan `math.js`, tetapi eksak dengan SymPy. Dipakai validator konten dan (Fase 2) verifikasi keluaran AI |

## 6. Offline & Pembaruan

- `sw.js` menyimpan semua berkas di cache saat pertama kali dibuka (strategi *cache-first*).
- **Setiap rilis:** naikkan `CACHE` di `sw.js` (misalnya `eksponenku-v0.1.1`) dan tambahkan berkas baru ke `FILES`. Tanpa ini, perangkat siswa tetap memakai versi lama.
- Server FastAPI mengirim `sw.js` dengan `Cache-Control: no-cache`.
- Saat dibuka dari `file://` (klik dua kali `index.html`), aplikasi tetap berjalan, tetapi tanpa service worker dan tanpa fitur pasang.

## 7. Menjalankan, Menguji, Merilis

| Kebutuhan | Perintah |
|---|---|
| Coba cepat tanpa alat | Klik dua kali `app/index.html` |
| Jalankan dengan server Python | `python -m uvicorn server.main:app --reload --port 8000` → http://localhost:8000 |
| Uji JS (tanpa Node) | `powershell -ExecutionPolicy Bypass -File tools\run_tests.ps1` |
| Validasi konten (SymPy) | `python tools/validate_content.py` |
| Uji server | `python -m pytest tests` |
| Rilis web | Unggah isi folder `app/` ke hosting HTTPS. Lihat [11-panduan-rilis-dan-pemasangan.md](11-panduan-rilis-dan-pemasangan.md) |
| APK Android | PWABuilder dari URL HTTPS → simpan sebagai `app/downloads/EksponenKu.apk` |

## 8. Keamanan & Privasi

- Tidak ada `eval`/`Function`/`innerHTML` dari input siswa tanpa *escape*. Semua teks dirender lewat `M.esc`.
- Parser server tidak memakai `sympy.parse_expr` (yang menjalankan kode). Input dibatasi 120 karakter dan pangkat ≤ 400.
- Hanya nama panggilan yang dikumpulkan. Tidak ada SDK iklan atau pelacak, dan tidak ada data yang dikirim ke server di MVP.
- Fase 2 (akun dan AI): persetujuan orang tua/wali, kunci API hanya di server, kuota per siswa ([10-asisten-pemodelan-ai.md](10-asisten-pemodelan-ai.md)).
