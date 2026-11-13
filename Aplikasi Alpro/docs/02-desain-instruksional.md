# 02 — Desain Instruksional

| Atribut | Keterangan |
|---|---|
| Versi | 1.0 |
| Landasan teori | Cognitive Load Theory (Sweller, 1988; Sweller, van Merriënboer & Paas, 2019); Prinsip Multimedia (Mayer, 2021) |
| Kurikulum | Kurikulum Merdeka, Matematika Fase D (kelas 7–9), elemen Bilangan |
| Model pengembangan | ADDIE (Analysis, Design, Development, Implementation, Evaluation) |

---

## 1. Prinsip Inti

Aplikasi mengelola tiga jenis beban kognitif:

| Jenis beban | Strategi | Penerapan di aplikasi |
|---|---|---|
| **Intrinsik** (kompleksitas materi) | **Kelola** — pecah dan urutkan | Segmentasi, urutan sederhana→kompleks, *pre-training* istilah, level bertingkat |
| **Ekstrinsik** (cara penyajian) | **Kurangi** | Tampilan bersih, teks + gambar berdekatan, tanpa redundansi, tanpa dekorasi |
| **Germane** (membangun skema) | **Dorong** | *Worked example* → *fading*, *self-explanation*, latihan bervariasi, umpan balik |

## 2. Prinsip Desain dan Penerapannya

| # | Prinsip | Penjelasan | Penerapan konkret | Sumber temuan |
|---|---|---|---|---|
| P1 | **Worked Example Effect** | Pemula belajar lebih baik dari contoh yang diselesaikan daripada langsung memecahkan soal | Contoh bertahap sebelum latihan (F-03) | K02, GL05 |
| P2 | **Fading / Completion Problem** | Bantuan dikurangi bertahap | Contoh lengkap → isi 1 langkah → isi 2 langkah → mandiri | IL04 |
| P3 | **Segmenting** | Materi dipecah menjadi bagian yang dikendalikan siswa | 1 konsep per layar, tombol Lanjut | EL04 |
| P4 | **Pre-training** | Kenalkan istilah sebelum konsep kompleks | Kenalkan "basis", "pangkat/eksponen", "faktorisasi prima" sebelum Unit 6 | IL01 |
| P5 | **Spatial Contiguity** | Teks dan gambar terkait diletakkan berdekatan | Label sifat langsung di samping langkah, bukan di catatan kaki | EL01 |
| P6 | **Signaling** | Sorot informasi penting | Warna aksen untuk basis/pangkat yang berubah; sorot bilangan di soal cerita | EL05 |
| P7 | **Coherence** | Buang materi yang tidak relevan | Tanpa dekorasi, musik latar, maskot yang bergerak terus | EL03, DS03 |
| P8 | **Redundancy** | Jangan menampilkan informasi sama dalam dua bentuk sekaligus | Video tidak menampilkan teks narasi penuh di layar (cukup subtitle opsional) | EL03 |
| P9 | **Multimedia** | Kata + gambar lebih baik dari kata saja | Tabel pola pangkat, visual perkalian berulang, diagram pecahan | EL02 |
| P10 | **Expertise Reversal** | Bantuan untuk pemula bisa menghambat yang sudah mahir | Diagnostik & opsi lewati contoh bagi yang sudah paham | K03 |
| P11 | **Self-Explanation** | Menjelaskan langkah memperkuat skema | Pertanyaan "Mengapa?" setelah contoh (F-11) | GL04 |
| P12 | **Retrieval & Spaced Practice** | Mengingat kembali secara berjarak memperkuat memori | Latihan ulang 1-3-7 hari (F-09) | IL03 |
| P13 | **Immediate Elaborated Feedback** | Umpan balik segera dengan penjelasan | Umpan balik miskonsepsi (F-06) | IL02, GL02 |
| P14 | **Representasi Ganda** | Berpindah antara kata, tabel, diagram, dan simbol membantu membangun model | Tabel Pola, Diagram Pohon, Tangga Satuan (F-17) | EL02, EL05 |
| P15 | **Siklus Pemodelan Eksplisit** | Langkah pemodelan yang diberi nama dan konsisten mengurangi kebingungan "harus mulai dari mana" | 5 langkah yang sama di semua soal cerita (F-15) | EL05, GL02 |

## 3. Struktur Satu Unit

Setiap unit mengikuti pola yang sama agar siswa tidak perlu mempelajari ulang cara memakai aplikasi (mengurangi beban ekstrinsik):

```
┌─────────────────────────────────────────────────────────────┐
│ 1. TUJUAN       "Setelah unit ini kamu bisa…" (1–2 kalimat)  │
│ 2. INGAT LAGI   1–2 soal prasyarat (aktivasi pengetahuan)    │
│ 3. MATERI       3–6 segmen pendek (teks + visual)            │
│ 4. CONTOH       Worked example lengkap → sebagian (fading)   │
│ 5. VIDEO        Opsional, ≤ 5 menit                          │
│ 6. LATIHAN      Dasar (5) → Menengah (5) → Tantangan (5)     │
│ 7. MISI         1 stimulus literasi (3–5 soal: Pemahaman,    │
│    LITERASI     Penerapan, Penalaran) + 1–2 soal cerita      │
│                 dengan siklus pemodelan 5 langkah            │
│ 8. REFLEKSI     Skala usaha mental 1–9 + "Apa yang kamu      │
│                 pelajari?" (pilih kalimat)                   │
└─────────────────────────────────────────────────────────────┘
```

Unit 8 (Pemodelan Matematika) memakai struktur khusus yang berfokus pada siklus 5 langkah. Lihat [09-literasi-matematika.md](09-literasi-matematika.md).

## 4. Peta Materi

Capaian Pembelajaran (CP) Fase D terkait: *peserta didik dapat membaca, menulis, dan membandingkan bilangan … serta menggunakan bilangan berpangkat bulat dan bentuk akar, notasi ilmiah …* — **validasi redaksi CP dengan guru/dokumen resmi terbaru sebelum rilis.**

| Unit | Judul | Tujuan Pembelajaran (TP) | Prasyarat | Bobot kesulitan | Catatan riset |
|---|---|---|---|---|---|
| U1 | Apa itu Bilangan Berpangkat? | Menyatakan perkalian berulang sebagai bilangan berpangkat dan sebaliknya | Perkalian | ★☆☆ | K01 — bangun percaya diri |
| U2 | Perkalian & Pembagian Basis Sama | Menerapkan aᵐ × aⁿ = aᵐ⁺ⁿ dan aᵐ ÷ aⁿ = aᵐ⁻ⁿ | U1 | ★☆☆ | K03 — sudah dikuasai S01 |
| U3 | Pangkat dari Pangkat & Pangkat Perkalian | Menerapkan (aᵐ)ⁿ = aᵐⁿ dan (ab)ⁿ = aⁿbⁿ | U2 | ★★☆ | EL01 — mulai membedakan sifat |
| U4 | **Pecahan Berpangkat** | Menerapkan (a/b)ⁿ = aⁿ/bⁿ, b ≠ 0 | U3, pecahan | ★★★ | **IL05, DS02** — konten ekstra |
| U5 | Pangkat Nol & Pangkat Negatif | Menjelaskan a⁰ = 1 dan a⁻ⁿ = 1/aⁿ melalui pola | U2, U4 | ★★☆ | — |
| U6 | **Menyamakan Basis** | Menyederhanakan operasi dengan basis & pangkat berbeda melalui faktorisasi prima | U1–U5, faktorisasi prima | ★★★ | **IL01** — konten ekstra |
| U7 | Notasi Ilmiah | Menulis dan mengoperasikan bilangan sangat besar/kecil dalam bentuk a × 10ⁿ | U1–U5 | ★★☆ | — |
| U8 | **Pemodelan Matematika** | Memodelkan berbagai soal cerita (tipe T1–T8) menjadi model bilangan berpangkat, menyelesaikan, menafsirkan, dan memeriksa hasilnya | U1–U7 | ★★★ | **EL05**, literasi |
| U0 | *Kartu Sifat & Strategi Memilih Sifat* | Memilih sifat yang tepat untuk sebuah bentuk soal | — (lintas unit) | — | **EL01** |
| L | *Jalur Literasi* (Misi Literasi tiap unit) | Menerapkan sifat unit tersebut pada stimulus kontekstual | Unit terkait | — | Literasi |

> Catatan: materi Bentuk Akar dan pangkat pecahan (a^(m/n)) dijadwalkan untuk Fase 2.

### 4.1 Diagram Prasyarat

```
U1 → U2 → U3 → U4 ─┐
          │        ├→ U5 → U6 → U7 → U8 (Pemodelan, capstone)
          └────────┘
U0 (Kartu Sifat) dapat diakses dari semua unit
Misi Literasi (L) menutup setiap unit U1–U7
```

## 5. Strategi Khusus untuk Titik Kesulitan

### 5.1 Memilih Sifat (EL01) — "Pohon Keputusan Sifat"

Ditampilkan sebagai Kartu Sifat interaktif dan sebagai petunjuk tingkat 1–2:

```
Lihat soalnya:
├─ Ada tanda kurung dipangkatkan?  ( … )ⁿ
│   ├─ Isinya pangkat?        (aᵐ)ⁿ → kalikan pangkat
│   ├─ Isinya perkalian?      (ab)ⁿ → pangkatkan tiap faktor
│   └─ Isinya pecahan?        (a/b)ⁿ → pangkatkan pembilang & penyebut
├─ Ada perkalian / pembagian bilangan berpangkat?
│   ├─ Basis sama?            ×: jumlahkan pangkat | ÷: kurangkan pangkat
│   └─ Basis berbeda?         → Bisakah basisnya disamakan? (faktorisasi prima)
│                               ├─ Ya → samakan, lalu ulangi dari atas
│                               └─ Tidak → hitung nilai masing-masing / pangkat sama? (ab)ⁿ
└─ Ada pangkat 0 atau negatif?  a⁰ = 1 | a⁻ⁿ = 1/aⁿ
```

### 5.2 Basis & Pangkat Berbeda (IL01)

Urutan langkah yang selalu dipakai (konsisten di semua contoh):
1. **Uraikan** setiap basis ke faktor prima (`4 = 2²`, `8 = 2³`).
2. **Tulis ulang** dengan basis yang sama (`4³ = (2²)³`).
3. **Terapkan** pangkat dari pangkat (`(2²)³ = 2⁶`).
4. **Gabungkan** dengan sifat perkalian/pembagian (`2⁶ × 2⁶ = 2¹²`).
5. **Periksa** — hitung nilai (opsional) untuk cek ulang (IL02).

Visual: pohon faktor dan warna berbeda untuk basis asli vs basis baru.

### 5.3 Pecahan Berpangkat (IL05)

- Mulai dari **arti**: `(2/3)³ = 2/3 × 2/3 × 2/3` (visual luas persegi/batang pecahan).
- Baru kemudian rumus `(a/b)ⁿ = aⁿ/bⁿ`.
- Miskonsepsi umum yang harus diberi umpan balik khusus:
  - Hanya memangkatkan pembilang: `(2/3)² = 4/3` ❌
  - Mengalikan dengan pangkat: `(2/3)² = 4/6` ❌
  - Pangkat negatif pecahan: `(2/3)⁻² = -4/9` ❌ → yang benar `9/4`.

### 5.4 Soal Cerita & Pemodelan (EL05)

Semua soal cerita memakai **siklus pemodelan 5 langkah**: ① Pahami (Diketahui–Ditanya) → ② Buat Model → ③ Selesaikan → ④ Tafsirkan → ⑤ Periksa. Bantuan dikurangi bertahap dari contoh model lengkap ke model mandiri. Rincian, 8 tipe soal (T1–T8), dan rubrik ada di [09-literasi-matematika.md](09-literasi-matematika.md). Soal cerita ditulis dengan:
- Kalimat pendek, satu informasi per kalimat.
- Bilangan ditulis sebagai angka (bukan kata), kecuali tujuan latihan memang membaca angka.
- Konteks dekat siswa: pembelahan bakteri, ukuran memori HP (KB–MB–GB), jarak planet, lipatan kertas, penyebaran pesan berantai.

## 6. Katalog Miskonsepsi

Dipakai untuk menyusun pengecoh pilihan ganda dan umpan balik (F-06).

| Kode | Miskonsepsi | Contoh salah | Umpan balik |
|---|---|---|---|
| M01 | Mengalikan basis dengan pangkat | `2³ = 6` | "2³ artinya 2 × 2 × 2, bukan 2 × 3." |
| M02 | Mengalikan pangkat saat perkalian basis sama | `2³ × 2⁴ = 2¹²` | "Pada perkalian basis sama, pangkatnya dijumlahkan." |
| M03 | Ikut mengoperasikan basis | `2³ × 2⁴ = 4⁷`, `3⁵ ÷ 3² = 1³` | "Basisnya tetap. Yang dioperasikan hanya pangkatnya." |
| M04 | Menjumlahkan pangkat pada (aᵐ)ⁿ | `(2³)² = 2⁵` | "Pangkat dipangkatkan → pangkatnya dikalikan." |
| M05 | Pangkat negatif menghasilkan bilangan negatif | `2⁻³ = -8` | "Pangkat negatif berarti kebalikan: 2⁻³ = 1/2³ = 1/8." |
| M06 | a⁰ = 0 | `5⁰ = 0` | "Lihat polanya: 5² = 25, 5¹ = 5, 5⁰ = 1 (dibagi 5 setiap turun)." |
| M07 | Hanya pembilang dipangkatkan | `(2/3)² = 4/3` | "Pembilang **dan** penyebut sama-sama dipangkatkan." |
| M08 | Menjumlahkan pangkat basis berbeda | `2³ × 3² = 6⁵` | "Basis berbeda tidak bisa langsung digabung. Coba samakan basis dulu, atau hitung masing-masing." |
| M09 | Penjumlahan dianggap seperti perkalian | `2³ + 2⁴ = 2⁷` | "Sifat penjumlahan pangkat hanya berlaku untuk **perkalian**, bukan penjumlahan." |
| M10 | Tanda negatif & kurung | `-3² = 9` | "Tanpa kurung, yang dipangkatkan hanya 3: -3² = -(3²) = -9." |
| M11 | Menjumlahkan pangkat pada pembagian | `3⁵ ÷ 3² = 3⁷` | "Pada pembagian basis sama, pangkatnya **dikurangkan**." |

Katalog ini harus ditinjau guru matematika dan diperbarui dari data jawaban salah selama uji coba.

## 7. Asesmen

| Jenis | Kapan | Tujuan | Instrumen |
|---|---|---|---|
| Diagnostik | Awal | Menentukan titik mulai | 8–10 soal (F-01) |
| Formatif | Setiap latihan | Umpan balik & penyesuaian | Latihan bertingkat (F-05) |
| Sumatif mini | Akhir unit | Mengukur ketuntasan unit | 5 soal campuran |
| Pre/Post-test | Penelitian | Mengukur efektivitas (G1) | 20 soal, kisi-kisi di [Rencana Pengujian](06-rencana-pengujian.md) |
| Beban kognitif | Akhir sesi | Mengukur beban mental (G2) | Skala Paas 1–9 |
| Literasi | Misi Literasi tiap unit; pre/post-test | Mengukur literasi matematika (G6) | Soal berbasis stimulus format AKM |
| Pemodelan | Unit 8; pre/post-test | Mengukur kemampuan memodelkan (G7) | Rubrik 5 langkah ([Literasi §8.1](09-literasi-matematika.md#81-rubrik-pemodelan-untuk-soal-uraian-lab-pemodelan-dan-prepost-test)) |

**Kriteria ketuntasan unit:** ≥ 80% benar pada sumatif mini tanpa petunjuk tingkat 3–4.
