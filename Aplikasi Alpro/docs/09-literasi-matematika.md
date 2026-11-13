# 09 — Literasi Matematika & Pemodelan Soal Cerita

| Atribut | Keterangan |
|---|---|
| Versi | 1.0 |
| Kerangka acuan | PISA 2022 Mathematics Framework (OECD); Asesmen Kompetensi Minimum (AKM) Numerasi — Kemendikbudristek; Siklus pemodelan matematika (Blum & Leiß, 2007) |
| Sumber kebutuhan | Permintaan product owner (12 Nov 2026); temuan EL05, IL01, IL05, GL04 ([Riset Pengguna](01-riset-pengguna.md)) |
| Fitur terkait | F-10, F-15, F-16, F-17, F-18, F-19 ([PRD](PRD.md)) |

---

## 1. Tujuan

1. **Menumbuhkembangkan literasi matematika**: siswa mampu memakai bilangan berpangkat untuk memahami, menyelesaikan, dan menilai masalah dalam kehidupan nyata — bukan hanya menghitung.
2. **Melatih pemodelan**: siswa mampu mengubah berbagai jenis soal cerita menjadi **model matematika**, menyelesaikannya, lalu menafsirkan hasilnya kembali ke konteks.
3. **Aplikasi mampu memodelkan dan menyelesaikan soal cerita** — dalam dua tahap:
   - **MVP (offline):** untuk setiap soal cerita di bank soal, aplikasi menyimpan model dan penyelesaian lengkap. Siswa dibimbing langkah demi langkah, dan pemodelan lengkap ditampilkan setelah siswa mencoba.
   - **Fase 2 (online, AI):** siswa dapat mengetik atau memfoto soal cerita **sendiri**, lalu Asisten Pemodelan membantu memodelkan dan menyelesaikannya secara bertahap. Lihat [10-asisten-pemodelan-ai.md](10-asisten-pemodelan-ai.md).

## 2. Definisi Operasional

> **Literasi matematika** adalah kemampuan bernalar secara matematis serta **merumuskan, menerapkan, dan menafsirkan** matematika untuk menyelesaikan masalah dalam berbagai konteks dunia nyata (diadaptasi dari PISA 2022).

Dalam aplikasi ini, literasi matematika diukur melalui tiga dimensi yang diselaraskan dengan AKM Numerasi:

| Dimensi | Komponen | Penerapan di aplikasi |
|---|---|---|
| **Konten** | Bilangan; Aljabar (pola & perubahan); Pengukuran | Bilangan berpangkat, pola pertumbuhan/peluruhan, notasi ilmiah, satuan |
| **Proses kognitif** | **Pemahaman** — **Penerapan** — **Penalaran** | Setiap stimulus memuat soal dari ketiga level |
| **Konteks** | **Personal** — **Sosial budaya** — **Saintifik** | Bank stimulus seimbang di ketiga konteks |

Pemetaan proses PISA ke proses AKM dan langkah pemodelan aplikasi:

| PISA | AKM | Langkah pemodelan aplikasi (§3) |
|---|---|---|
| Formulate (merumuskan) | Pemahaman → Penerapan | ① Pahami, ② Buat Model |
| Employ (menerapkan) | Penerapan | ③ Selesaikan |
| Interpret & Evaluate (menafsirkan & menilai) | Penalaran | ④ Tafsirkan, ⑤ Periksa |

## 3. Siklus Pemodelan "5 Langkah"

Siklus pemodelan Blum & Leiß (7 langkah) disederhanakan menjadi 5 langkah agar sesuai untuk siswa SMP dan tidak menambah beban kognitif. **Kelima langkah ini dipakai secara konsisten** di seluruh aplikasi: di soal cerita, Lab Pemodelan, dan Asisten AI.

```
        ┌──────────────── DUNIA NYATA ────────────────┐
        │                                              │
  ① PAHAMI ──────▶ ② BUAT MODEL                ⑤ PERIKSA
  (Diketahui,       (pilih representasi,          (masuk akal?
   Ditanya,          tulis model                   cek ulang)
   info penting)     matematika)                      ▲
        │                 │                           │
        │                 ▼                           │
        │           ③ SELESAIKAN ──────────▶ ④ TAFSIRKAN
        │           (pakai sifat               (jawab dalam
        │            eksponen)                  kalimat + satuan)
        └──────────────── DUNIA MATEMATIKA ────────────┘
```

| Langkah | Pertanyaan pemandu untuk siswa | Aktivitas di aplikasi | Bantuan (scaffold) | Umpan balik otomatis |
|---|---|---|---|---|
| **① Pahami** | "Apa yang diketahui? Apa yang ditanya? Informasi mana yang tidak perlu?" | Menyorot bilangan, mengisi kolom Diketahui/Ditanya, menandai info pengecoh | Sorot otomatis bilangan & satuan (dapat dimatikan) | Mencocokkan isian dengan `known[]` dan `asked` |
| **② Buat Model** | "Apa yang berulang? Dikali atau dibagi berapa setiap kali?" | Mengisi **Tabel Pola**, memilih/menyusun model (mis. `50 × 2ⁿ`) | Tabel pola dengan 2–3 baris awal terisi; pilihan model | Model dicek kesetaraan ekspresinya (`equivalent`) |
| **③ Selesaikan** | "Sifat mana yang dipakai?" | Menyelesaikan model langkah demi langkah | Kartu Sifat, petunjuk bertingkat | Grader per langkah + miskonsepsi |
| **④ Tafsirkan** | "Apa arti angka ini di soal?" | Memilih/menyusun kalimat jawaban dengan satuan | Templat kalimat "Jadi, … adalah …" | Mengecek angka dan satuan |
| **⑤ Periksa** | "Apakah jawabannya masuk akal? Bisa dicek dengan cara lain?" | Pertanyaan estimasi/validasi, mis. "Apakah mungkin bakteri berjumlah 0,5?" | Pilihan alasan | Benar/salah + penjelasan |

Langkah ⑤ menjawab langsung temuan **GL02** (siswa menilai benar dari "mendekati hasil") dan memanfaatkan kebiasaan cek ulang siswa (**IL02**).

### 3.1 Pemudaran Bantuan (Fading) dalam Pemodelan

Agar tidak membebani siswa pemula (prinsip *worked example* dan *expertise reversal*), bantuan dikurangi bertahap:

| Tahap | Nama | Yang dikerjakan siswa | Yang disediakan aplikasi |
|---|---|---|---|
| 1 | **Contoh Model Lengkap** | Mengamati, menjawab 1 pertanyaan "mengapa" | Semua langkah ①–⑤ |
| 2 | **Model Rumpang** | Mengisi langkah ② saja | Langkah ①, ③–⑤ |
| 3 | **Model Terbimbing** | Mengerjakan ①–⑤ | Pertanyaan pemandu + petunjuk |
| 4 | **Model Mandiri** | Mengerjakan ①–⑤ | Petunjuk hanya jika diminta |
| 5 | **Buat Soal Sendiri** | Membuat soal cerita dari model yang diberikan (F-19) | Templat konteks |

## 4. Tipologi Soal Cerita Bilangan Berpangkat

"Berbagai macam soal cerita" dikelompokkan menjadi **8 tipe model**. Setiap tipe memiliki templat model, representasi yang disarankan, dan contoh konteks. Bank soal wajib mencakup semua tipe.

| Kode | Tipe masalah | Bentuk model | Representasi utama | Konteks contoh | Konteks AKM | Kaitan riset |
|---|---|---|---|---|---|---|
| **T1** | Pertumbuhan berlipat | `a × bⁿ` | Tabel pola, diagram pohon | Bakteri membelah dua tiap 20 menit; pesan berantai diteruskan ke 3 orang | Saintifik, Sosial budaya | — |
| **T2** | Peluruhan / berkurang sebagian | `a × (1/b)ⁿ` | Tabel pola, grafik batang | Bola memantul setengah tinggi semula; obat dalam tubuh tersisa setengah tiap 6 jam; kertas dipotong dua | Saintifik, Personal | **IL05** (pecahan berpangkat) |
| **T3** | Satuan sangat besar/kecil | `a × 10ⁿ`, `2¹⁰` | Tangga satuan | Memori HP (KB–MB–GB), jarak Bumi–Matahari, ukuran virus | Saintifik, Personal | — |
| **T4** | Luas & volume berpangkat | `(aᵐ)ⁿ`, `(ab)ⁿ` | Gambar bangun | Kubus bersisi 2³ cm; ubin persegi | Personal | — |
| **T5** | Perbandingan "berapa kali lipat" | `aᵐ ÷ aⁿ` | Diagram perbandingan | "Berapa kali lebih besar memori 64 GB dibanding 4 GB?" | Personal, Saintifik | — |
| **T6** | Menentukan banyak langkah (n) | `a × bⁿ = c` → samakan basis | Tabel pola, faktorisasi prima | "Setelah berapa kali membelah bakteri menjadi 512?" | Saintifik | **IL01** (menyamakan basis) |
| **T7** | Pencacahan kemungkinan | `kⁿ` | Diagram pohon | Banyak kemungkinan PIN 4 digit; kode warna lampu | Personal | — |
| **T8** | Gabungan / multi-langkah | Kombinasi T1–T7 | Bebas | "Berapa GB ruang yang dipakai 2⁵ foto berukuran 2²¹ byte?" | Semua | **EL01** (memilih sifat) |

### 4.1 Contoh Lengkap (Tipe T1 + T6)

**Soal:** *Di laboratorium sekolah, sebuah sel bakteri membelah menjadi 2 setiap 20 menit. Mula-mula terdapat 3 bakteri. Bu guru mencatat percobaan dimulai pukul 07.00. Berapa banyak bakteri pada pukul 09.00?*

| Langkah | Isi |
|---|---|
| ① Pahami | Diketahui: awal = 3 bakteri; membelah ×2; setiap 20 menit; waktu 07.00–09.00. Ditanya: banyak bakteri pukul 09.00. Info "Bu guru mencatat" tidak diperlukan. |
| ② Buat Model | 2 jam = 120 menit → 120 ÷ 20 = 6 kali membelah. Tabel pola: n=0 → 3; n=1 → 3×2; n=2 → 3×2². Model: **B = 3 × 2⁶** |
| ③ Selesaikan | 2⁶ = 64 → B = 3 × 64 = 192 |
| ④ Tafsirkan | Jadi, pada pukul 09.00 terdapat **192 bakteri**. |
| ⑤ Periksa | Hasilnya bilangan bulat positif dan lebih besar dari 3 ✓. Cek: 3 → 6 → 12 → 24 → 48 → 96 → 192 (6 kali) ✓ |

**Variasi T6:** "Pukul berapa bakteri berjumlah 768?" → 3 × 2ⁿ = 768 → 2ⁿ = 256 = 2⁸ → n = 8 → 8 × 20 menit = 160 menit → pukul 09.40.

## 5. Soal Literasi Berbasis Stimulus (F-16)

Mengikuti format AKM: **satu stimulus** (teks pendek, infografis, tabel, atau grafik) diikuti **3–5 soal** dengan level proses kognitif berbeda.

| Komponen | Ketentuan |
|---|---|
| Stimulus | ≤ 120 kata **atau** 1 infografis/tabel; konteks dekat siswa Indonesia; sumber data dicantumkan |
| Jumlah soal | 3–5 per stimulus |
| Sebaran level | Minimal 1 Pemahaman, 1 Penerapan, 1 Penalaran |
| Bentuk soal | Pilihan ganda, **pilihan ganda kompleks** (lebih dari satu jawaban benar), **menjodohkan / benar–salah**, isian singkat, **uraian singkat** (alasan dipilih dari kalimat-kalimat yang disediakan agar dapat dinilai otomatis) |
| Beban kognitif | Stimulus dapat dilipat/dibuka kembali; informasi penting dapat disorot; tabel tidak dipadati angka |

**Contoh stimulus (konteks Personal):** infografis kapasitas penyimpanan HP 32 GB dan ukuran rata-rata file (foto 4 MB, video 1 menit 128 MB, lagu 8 MB) dengan keterangan 1 GB = 2¹⁰ MB.

| No | Soal | Level | Bentuk |
|---|---|---|---|
| 1 | Nyatakan 32 GB dalam MB sebagai bilangan berpangkat 2. | Pemahaman | Isian |
| 2 | Berapa banyak foto yang dapat disimpan jika memori kosong 2 GB? | Penerapan | Isian |
| 3 | Pilih semua pernyataan yang benar tentang video dan lagu. | Penerapan | PG kompleks |
| 4 | Raka berkata, "Video 1 menit sama dengan 16 lagu." Setuju atau tidak? Pilih alasannya. | Penalaran | Benar/Salah + alasan |

## 6. Alat Representasi (F-17)

Representasi ganda membantu siswa berpindah dari kata ke simbol (prinsip multimedia, **EL02**):

| Alat | Fungsi | Dipakai pada tipe |
|---|---|---|
| **Tabel Pola** | Siswa mengisi tabel langkah (n) vs nilai, aplikasi membantu melihat pola "×b setiap langkah" | T1, T2, T6 |
| **Diagram Pohon** | Visual pembelahan/percabangan; jumlah daun = bⁿ | T1, T7 |
| **Tangga Satuan** | Visual KB → MB → GB (×2¹⁰) atau mm → m → km (×10³) | T3, T5 |
| **Pengurai Soal** | Sorot bilangan & satuan; seret ke kolom Diketahui/Ditanya | Semua (F-10) |

## 7. Penempatan dalam Kurikulum Aplikasi

- **Misi Literasi di setiap unit:** setiap unit (U1–U7) diakhiri **1 stimulus literasi** yang memakai sifat dari unit tersebut. Ini menjaga beban intrinsik tetap terkendali (satu sifat baru per misi).
- **Unit 8 — Pemodelan Matematika (capstone):** setelah U1–U7, siswa mempelajari siklus 5 langkah secara eksplisit dan menyelesaikan kedelapan tipe soal (T1–T8) dengan fading penuh (tahap 1–5).
- Lihat peta materi terbaru di [Desain Instruksional §4](02-desain-instruksional.md#4-peta-materi).

## 8. Penilaian Literasi & Pemodelan

### 8.1 Rubrik Pemodelan (untuk soal uraian, Lab Pemodelan, dan pre/post-test)

| Langkah | 0 | 1 | 2 |
|---|---|---|---|
| ① Pahami | Tidak menuliskan informasi yang diketahui/ditanya | Sebagian benar atau ada info yang salah | Lengkap dan tepat, info pengecoh diabaikan |
| ② Buat Model | Tidak ada model / model tidak relevan | Model sebagian benar (mis. eksponen salah) | Model tepat |
| ③ Selesaikan | Tidak menyelesaikan / salah konsep | Konsep benar, ada salah hitung | Benar dan runtut |
| ④ Tafsirkan | Tidak ada kesimpulan | Kesimpulan tanpa satuan/konteks | Kesimpulan lengkap dengan satuan |
| ⑤ Periksa | Tidak memeriksa | Memeriksa tanpa alasan | Memeriksa dengan alasan atau cara lain |

Skor maksimum 10 per soal. Di aplikasi, langkah ①, ②, ③, dan ④ dinilai otomatis, sedangkan langkah ⑤ dinilai melalui pilihan alasan. Pada pre/post-test kertas, rubrik dinilai oleh dua penilai (uji kesepakatan antarpenilai).

### 8.2 Indikator Kemajuan di Aplikasi

Halaman Kemajuan (F-12) menampilkan penguasaan **per langkah pemodelan** (mis. "Kamu sudah kuat di Selesaikan, terus latih Buat Model"), bukan hanya per sifat eksponen.

## 9. Prinsip Penulisan Soal Literasi

1. Konteks **autentik dan dekat** dengan siswa Indonesia (sekolah, HP, pertanian, kesehatan, UMKM, alam Indonesia). Hindari konteks yang asing atau bias gender/ekonomi.
2. Data nyata dicantumkan sumbernya. Data rekaan ditandai sebagai "ilustrasi".
3. Soal cerita ≤ 60 kata dan stimulus ≤ 120 kata (EL05). Satu informasi per kalimat.
4. Sengaja sertakan **0–1 informasi pengecoh** pada level Menengah dan Tantangan untuk melatih langkah ① Pahami.
5. Setiap soal cerita **wajib** menyimpan pemodelan lengkap (`modelingSolution`) yang mencakup kelima langkah. Lihat [Spesifikasi Konten §2.7](05-spesifikasi-konten.md#27-soal-cerita--pemodelan).
6. Setiap tipe T1–T8 memiliki minimal 2 soal di bank soal MVP.
