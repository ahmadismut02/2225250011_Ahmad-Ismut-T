# 06 — Rencana Pengujian & Evaluasi

| Atribut | Keterangan |
|---|---|
| Versi | 1.0 |
| Cakupan | (A) Pengujian perangkat lunak, (B) Uji usabilitas, (C) Evaluasi pembelajaran & beban kognitif |

---

## A. Pengujian Perangkat Lunak

### A.1 Tingkatan

| Tingkat | Alat | Fokus | Target |
|---|---|---|---|
| Unit (JS) | `tests/run-tests.html` di Edge headless (`tools/run_tests.ps1`) | `math.js`, `grader.js`, latihan ulang | Semua kasus §A.2 lulus |
| Konten | `tests/tests.js` + `tools/validate_content.py` (SymPy) | ID unik; rujukan sifat/miskonsepsi ada; nilai `expr` = kunci; jawaban salah tidak dinilai benar; model pemodelan menghasilkan jawaban | 100% konten |
| E2E (simulasi siswa) | `tests/tests.js` | Onboarding → materi → contoh → semua latihan → Lab Pemodelan (10 soal) → Misi Literasi → refleksi → halaman lain | Semua alur lulus |
| Server | `pytest` (`tests/test_server.py`) | Parser aman, `/api/verify`, penyajian aplikasi | Lulus |
| Offline | Manual | Pasang PWA → mode pesawat → semua fitur kecuali video berjalan | Lulus |
| Perangkat | Manual | Android 8, 11, 14; HP RAM 2 GB; Chrome/Firefox/Safari desktop | Lihat matriks A.3 |
| Aksesibilitas | axe-core (Playwright) + TalkBack manual | Pelanggaran WCAG AA | 0 pelanggaran kritis |
| Performa | Lighthouse | Performa, PWA, aksesibilitas | Skor ≥ 90 |

### A.2 Kasus Uji Kritis — Grader

| # | Soal | Input | Mode | Diharapkan |
|---|---|---|---|---|
| 1 | $2^3 \times 2^4$ (bentuk $2^n$) | `2^7` | exact | Benar |
| 2 | sama | `2⁷` | exact | Benar (normalisasi superskrip) |
| 3 | sama | `128` | exact | Salah + pesan "Tulis dalam bentuk 2ⁿ" |
| 4 | sama | `2^12` | exact | Salah + M02 |
| 5 | Nilai $2^3 \times 2^4$ | `128` / `2^7` | value | Benar |
| 6 | $(2/3)^2$ | `4/9`, `8/18`, `0,44` | value | `4/9` dan `8/18` benar; desimal hanya diterima jika soal mendefinisikan toleransi |
| 7 | $(2/3)^2$ | `4/3` | value | Salah + M07 |
| 8 | $5^0$ | `0` | value | Salah + M06 |
| 9 | $2^{-3}$ | `-8` | value | Salah + M05 |
| 10 | Input kosong / huruf acak | `` / `abc` | — | Tidak dinilai; pesan "Masukkan jawabanmu dulu" |
| 11 | `-3^2` | `9` | value | Salah + M10 |
| 12 | Model bakteri (langkah ②) | `3*2^6`, `2^6*3`, `3×2⁶` | equivalent | Benar |
| 13 | sama | `3*2^2` | equivalent | Salah + MM01 |
| 14 | sama | `3+2*6` | equivalent | Salah + MM02 |
| 15 | sama | `2^6` | equivalent | Salah + MM03 |
| 16 | Lab Pemodelan | Klik "Lihat Pemodelan Lengkap" sebelum mencoba | — | Tombol nonaktif |

### A.3 Matriks Perangkat

| Platform | Versi | Perangkat contoh |
|---|---|---|
| Android | 8.0, 11, 14 | HP RAM 2 GB layar 5,5"; HP RAM 4 GB layar 6,5"; tablet |
| Web | Chrome, Firefox, Edge terbaru | Laptop 1366×768 |
| Web | Safari iOS terbaru | iPhone (PWA) — *best effort* |

### A.4 Definition of Done (per fitur)

- [ ] Kriteria penerimaan di PRD terpenuhi.
- [ ] Unit test ditulis & lulus; CI hijau.
- [ ] Diuji di layar 360 px dan desktop.
- [ ] Berfungsi offline (jika relevan).
- [ ] Lulus pemeriksaan axe tanpa pelanggaran kritis.
- [ ] Teks UI sesuai panduan bahasa.
- [ ] Di-review oleh minimal 1 anggota tim lain.

## B. Uji Usabilitas

| Aspek | Rencana |
|---|---|
| Peserta | 5 siswa SMP kelas 8–9 (campuran kemampuan) |
| Metode | *Think-aloud* + observasi, 30–40 menit per siswa |
| Tugas | (1) Onboarding; (2) Selesaikan 1 segmen U4; (3) Kerjakan 3 soal latihan, pakai petunjuk jika perlu; (4) Buka Kartu Sifat dan temukan sifat pecahan; (5) Selesaikan 1 soal cerita di Lab Pemodelan (5 langkah); (6) Kerjakan 1 Misi Literasi |
| Metrik | Tingkat keberhasilan tugas, waktu, jumlah kesalahan navigasi, SUS (≥ 70) |
| Etika | Persetujuan sekolah, orang tua/wali, dan siswa; data dianonimkan (kode S01, S02, …) |
| Iterasi | Uji prototipe Figma (sebelum coding) **dan** uji MVP (setelah coding) |

## C. Evaluasi Pembelajaran & Beban Kognitif

### C.1 Desain

*One-group pretest–posttest* (minimal) atau *quasi-experiment* dengan kelompok kontrol (jika memungkinkan).

```
Pre-test (20 soal) → Pemakaian aplikasi (3–4 sesi × 40 menit) → Post-test (20 soal paralel)
                     + skala Paas setiap akhir unit
                     + SUS & angket di akhir
```

### C.2 Instrumen

| Instrumen | Mengukur | Analisis |
|---|---|---|
| Pre/post-test bagian A (20 soal, kisi-kisi di bawah) | Pemahaman prosedural (G1) | N-gain Hake: (post − pre)/(maks − pre) |
| Pre/post-test bagian B: tes literasi (2 stimulus × 4 soal, format AKM) | Literasi matematika (G6) | N-gain; sebaran skor per level proses kognitif |
| Pre/post-test bagian C: 2 soal pemodelan uraian | Kemampuan memodelkan (G7) | Rubrik 5 langkah (0–10), 2 penilai, kesepakatan antarpenilai (Cohen's kappa ≥ 0,7) |
| Log Lab Pemodelan | Langkah pemodelan tersulit | Akurasi per langkah ①–⑤, miskonsepsi MM tersering |
| Skala usaha mental Paas (1–9) | Beban kognitif keseluruhan (G2) | Rata-rata per unit |
| Kuesioner beban kognitif Leppink dkk. (2013), diadaptasi ke Bahasa Indonesia | IL, EL, GL terpisah | Rata-rata per dimensi |
| System Usability Scale (SUS) | Usabilitas (G3) | Skor 0–100 |
| Log aplikasi (lokal, opt-in) | Akurasi "pilih sifat" (G4), penggunaan petunjuk, miskonsepsi tersering | Deskriptif |
| Wawancara pasca-uji | Pengalaman kualitatif | Koding IL/EL/GL/DS seperti wawancara awal |

### C.3 Kisi-kisi Pre/Post-test

| Unit / Sifat | Jumlah soal | Level kognitif |
|---|---|---|
| U1 Pengertian | 2 | C1–C2 |
| U2 Perkalian & pembagian | 3 | C3 |
| U3 Pangkat dari pangkat/perkalian | 3 | C3 |
| U4 Pecahan berpangkat | 3 | C3 |
| U5 Pangkat nol & negatif | 3 | C2–C3 |
| U6 Menyamakan basis | 3 | C3–C4 |
| U7 Notasi ilmiah | 3 | C3–C4 |
| **Total bagian A** | **20** | |

**Bagian B (literasi):** 2 stimulus (1 Personal, 1 Saintifik), masing-masing 4 soal: 1 Pemahaman, 2 Penerapan, 1 Penalaran.
**Bagian C (pemodelan):** 2 soal uraian (1 tipe T1/T2, 1 tipe T6/T8), dinilai dengan rubrik 5 langkah.

Instrumen divalidasi oleh ahli (dosen/guru) sebelum dipakai; reliabilitas diuji pada uji coba terbatas.

### C.5 Evaluasi Asisten Pemodelan AI (Fase 2)

Mengikuti [10-asisten-pemodelan-ai.md §7](10-asisten-pemodelan-ai.md#7-evaluasi-sebelum-rilis): set uji ≥ 80 soal, ambang akurasi model ≥ 95%, jawaban akhir ≥ 98% setelah verifikasi, ketepatan penolakan soal di luar cakupan ≥ 95%. Fitur tidak dibuka untuk siswa sebelum ambang ini terpenuhi.

### C.4 Kriteria Keberhasilan

Lihat [PRD §4](PRD.md#4-tujuan--metrik-keberhasilan). Hasil evaluasi ditulis di `docs/laporan-evaluasi.md` setelah uji coba.
