# Product Requirements Document (PRD) — EksponenKu

| Atribut | Keterangan |
|---|---|
| Versi | 1.1 |
| Tanggal | 12 November 2026 |
| Status | Draf — menunggu review |
| Pemilik dokumen | *(isi nama product owner)* |
| Dokumen terkait | [Riset Pengguna](01-riset-pengguna.md), [Desain Instruksional](02-desain-instruksional.md), [Arsitektur Teknis](03-arsitektur-teknis.md), [Literasi Matematika](09-literasi-matematika.md), [Asisten Pemodelan AI](10-asisten-pemodelan-ai.md) |

---

## 1. Latar Belakang

Bilangan berpangkat adalah materi dasar Fase D (kelas 7–9) yang menjadi prasyarat bentuk akar, notasi ilmiah, fungsi eksponen, dan aljabar SMA. Wawancara dengan siswa kelas 9 (S01) menunjukkan bahwa siswa **menguasai sifat dasar**, tetapi **kesulitan memilih sifat yang tepat**, **menangani basis berbeda**, **mengerjakan pecahan berpangkat**, dan **membaca soal cerita**. Saat belajar mandiri, siswa **tidak memiliki umpan balik yang pasti** sehingga menilai jawaban benar jika "mendekati hasil".

Selain penguasaan prosedur, siswa perlu **literasi matematika**: kemampuan merumuskan, menerapkan, dan menafsirkan matematika dalam konteks nyata, sebagaimana diukur oleh AKM Numerasi dan PISA. Keengganan membaca soal cerita (EL05) menunjukkan bahwa langkah **mengubah situasi nyata menjadi model matematika** adalah titik lemah yang harus dilatih secara eksplisit.

## 2. Pernyataan Masalah

> Siswa SMP yang belajar bilangan berpangkat secara mandiri mengalami beban kognitif berlebih ketika soal menuntut pemilihan sifat eksponen, penyamaan basis, atau penguraian soal cerita — dan tidak memiliki umpan balik langkah demi langkah untuk mengetahui di mana mereka keliru. Mereka juga jarang dilatih secara terstruktur untuk **memodelkan** masalah nyata dan **menafsirkan** hasilnya, sehingga literasi matematikanya belum berkembang.

## 3. Visi Produk

> **Membantu siswa SMP memahami bilangan berpangkat langkah demi langkah dan memakainya untuk memodelkan serta menyelesaikan masalah nyata — dengan tampilan yang tenang, umpan balik yang jelas, dan latihan yang sesuai kemampuan — di web maupun Android, bahkan saat offline.**

## 4. Tujuan & Metrik Keberhasilan

| ID | Tujuan | Metrik | Target MVP |
|---|---|---|---|
| G1 | Meningkatkan pemahaman | Selisih skor *pre-test* vs *post-test* (N-gain) | N-gain ≥ 0,3 (kategori sedang) |
| G2 | Menurunkan beban kognitif ekstrinsik | Skor skala beban mental Paas (1–9) setelah sesi | Rata-rata ≤ 5 |
| G3 | Antarmuka mudah digunakan | System Usability Scale (SUS) | ≥ 70 |
| G4 | Siswa memilih sifat dengan tepat | Akurasi pada soal "pilih sifat" | ≥ 75% pada akhir modul |
| G5 | Siswa menyelesaikan modul | Tingkat penyelesaian modul | ≥ 60% pengguna uji |
| G6 | Menumbuhkan literasi matematika | N-gain tes literasi berbasis stimulus (format AKM) | N-gain ≥ 0,3 |
| G7 | Siswa mampu memodelkan soal cerita | Skor rubrik pemodelan 5 langkah ([Literasi §8.1](09-literasi-matematika.md#81-rubrik-pemodelan-untuk-soal-uraian-lab-pemodelan-dan-prepost-test)) | Rata-rata ≥ 7/10 di post-test; ≥ 70% siswa menulis model (langkah ②) dengan benar |

**Non-tujuan (out of scope MVP):**
- Seluruh materi matematika SMP (hanya bilangan berpangkat).
- Gamifikasi kompetitif (papan peringkat, *streak* yang menekan).
- Chat langsung dengan guru, forum diskusi.
- Aplikasi iOS.
- Monetisasi / iklan.

## 5. Pengguna Sasaran

| Segmen | Prioritas | Keterangan |
|---|---|---|
| Siswa SMP kelas 7–9 | **Utama (MVP)** | Persona "Raka" — lihat [Riset Pengguna §4](01-riset-pengguna.md#4-persona) |
| Guru matematika SMP | Sekunder (Fase 2) | Memantau kemajuan kelas |
| Orang tua | Tersier (belum direncanakan) | — |

## 6. Ruang Lingkup Materi (MVP)

Bilangan Berpangkat, dipecah menjadi 8 unit (detail di [Desain Instruksional §4](02-desain-instruksional.md#4-peta-materi)):

1. Pengertian bilangan berpangkat (perkalian berulang)
2. Sifat perkalian & pembagian (basis sama)
3. Sifat pangkat dari pangkat & pangkat dari perkalian
4. **Pecahan berpangkat** *(bobot ekstra — IL05, DS02)*
5. Pangkat nol dan pangkat negatif
6. **Menyamakan basis** — basis & pangkat berbeda *(bobot ekstra — IL01)*
7. Notasi ilmiah — bilangan sangat besar & sangat kecil
8. **Pemodelan Matematika** — capstone siklus 5 langkah, 8 tipe soal cerita *(EL05, literasi)*

Ditambah **jalur literasi lintas unit**: setiap unit diakhiri satu *Misi Literasi* berbasis stimulus ([Literasi §7](09-literasi-matematika.md#7-penempatan-dalam-kurikulum-aplikasi)).

## 7. Kebutuhan Fungsional

Prioritas memakai metode **MoSCoW**: **M** = Must, **S** = Should, **C** = Could, **W** = Won't (kali ini).

### F-01 Tes Diagnostik Awal — **S**
*Sumber: K03, IL04*
- Siswa mengerjakan 8–10 soal singkat saat pertama kali membuka modul.
- Sistem merekomendasikan unit awal (unit yang sudah dikuasai ditandai "Sudah paham", tetap bisa dibuka).
- Bisa dilewati.

**Kriteria penerimaan:**
- [ ] Diagnostik selesai ≤ 5 menit.
- [ ] Hasil menampilkan unit kuat dan unit yang disarankan, dalam bahasa yang positif.
- [ ] Siswa dapat mengulang diagnostik kapan saja.

### F-02 Materi Bertahap (Segmented Lesson) — **M**
*Sumber: K01, IL05, EL02, EL04, DS01, DS02*
- Setiap unit terbagi menjadi **segmen pendek** (1 konsep per layar).
- Kombinasi teks singkat + visual/tabel (prinsip multimedia).
- Siswa mengatur kecepatan sendiri (tombol Lanjut/Kembali).
- Rumus ditampilkan dengan notasi matematika yang benar (KaTeX).

**Kriteria penerimaan:**
- [ ] Satu layar memuat maksimal satu konsep baru.
- [ ] Teks per segmen ≤ 80 kata.
- [ ] Setiap rumus memiliki minimal satu contoh numerik di dekatnya (prinsip *contiguity*).
- [ ] Posisi terakhir disimpan; siswa dapat melanjutkan dari segmen yang sama.

### F-03 Contoh Soal Bertahap (Worked Example) — **M**
*Sumber: K02, IL01, IL05, GL05, DS01*
- Contoh soal ditampilkan **langkah demi langkah**; siswa menekan "Langkah berikutnya".
- Setiap langkah diberi **label sifat** yang dipakai (mis. "Sifat 1: aᵐ × aⁿ = aᵐ⁺ⁿ").
- Pola **fading**: contoh lengkap → contoh sebagian (siswa mengisi 1 langkah) → soal mandiri.

**Kriteria penerimaan:**
- [ ] Minimal 3 contoh per unit (lengkap, sebagian, sebagian lagi).
- [ ] Setiap langkah menampilkan label sifat yang diklik untuk membuka Kartu Sifat.
- [ ] Unit 4 dan 6 memiliki minimal 5 contoh.

### F-04 Kartu Sifat (Referensi Cepat) — **M**
*Sumber: EL01*
- Panel yang dapat dibuka dari mana saja, berisi semua sifat eksponen dengan contoh singkat.
- Tiap kartu: rumus, kapan dipakai ("Gunakan jika…"), satu contoh, satu kesalahan umum.

**Kriteria penerimaan:**
- [ ] Dapat dibuka dalam ≤ 1 ketukan dari layar latihan.
- [ ] Membuka kartu tidak menghapus jawaban yang sedang dikerjakan.

### F-05 Latihan Bertingkat — **M**
*Sumber: IL01, IL04, GL01*
- Tiga level per unit: **Dasar**, **Menengah**, **Tantangan**.
- Level berikutnya terbuka setelah 4 dari 5 soal benar (bisa juga dibuka manual).
- Jika 2 soal berturut-turut salah, sistem menawarkan kembali ke contoh soal atau level sebelumnya.
- Format soal: pilihan ganda, isian (angka/ekspresi), pilih sifat, dan susun langkah.

**Kriteria penerimaan:**
- [ ] Minimal 15 soal per unit (5 per level).
- [ ] Soal diacak urutannya; opsi pilihan ganda diacak.
- [ ] Isian menerima bentuk setara (mis. `2^5`, `32`, `2⁵` dinilai sama jika soal meminta nilai).

### F-06 Umpan Balik Langsung & Per Langkah — **M**
*Sumber: IL02, GL02*
- Setelah menjawab, siswa langsung tahu **benar/salah** dengan **alasan**.
- Untuk jawaban salah yang umum (miskonsepsi), tampilkan umpan balik spesifik. Contoh: menjawab `2³ × 2⁴ = 2¹²` → "Sepertinya kamu mengalikan pangkatnya. Untuk perkalian basis sama, pangkatnya **dijumlahkan**."
- Pada soal "susun langkah", tiap langkah divalidasi.

**Kriteria penerimaan:**
- [ ] Umpan balik muncul ≤ 300 ms setelah menekan "Periksa".
- [ ] Setiap soal memiliki minimal 1 umpan balik miskonsepsi.
- [ ] Tidak memakai warna merah menyala atau animasi mengejutkan untuk jawaban salah.

### F-07 Petunjuk Bertingkat (Penunjuk Sifat) — **M**
*Sumber: EL01, GL03, GL05*
- Tombol "Butuh bantuan?" memberi petunjuk bertingkat:
  1. **Petunjuk arah** — "Perhatikan basisnya. Apakah sama?"
  2. **Petunjuk sifat** — "Gunakan sifat pangkat dari pangkat."
  3. **Langkah pertama** — menampilkan langkah awal pengerjaan.
  4. **Lihat contoh mirip** — membuka contoh soal serupa.
- Penggunaan petunjuk dicatat, tetapi **tidak mengurangi skor** yang ditampilkan ke siswa.

**Kriteria penerimaan:**
- [ ] Setiap soal Menengah & Tantangan memiliki minimal 3 tingkat petunjuk.
- [ ] Petunjuk terbuka satu per satu, tidak sekaligus.

### F-08 Video Pembelajaran Pendek — **S**
*Sumber: EL02, EL04, DS01*
- Video ≤ 5 menit per konsep, dengan kontrol kecepatan (0,75×–1,5×) dan subtitle.
- Video bersifat pelengkap, bukan pengganti materi teks.
- Video dapat di-*embed* dari YouTube (mode privasi) atau di-*host* sendiri.

**Kriteria penerimaan:**
- [ ] Tersedia minimal 1 video untuk unit 4 dan unit 6.
- [ ] Tidak *autoplay*.
- [ ] Ada peringatan ukuran data sebelum memutar via data seluler.

### F-09 Latihan Ulang Pintar (Review) — **S**
*Sumber: IL03*
- Soal yang pernah salah masuk ke daftar "Ulangi". Muncul kembali setelah 1, 3, dan 7 hari (*spaced repetition* sederhana).
- Halaman beranda menampilkan "Hari ini: 5 soal untuk diulang".

**Kriteria penerimaan:**
- [ ] Soal hilang dari daftar setelah dijawab benar 2 kali pada jadwal berbeda.
- [ ] Bekerja offline.

### F-10 Mode Urai Soal Cerita — **M**
*Sumber: EL05. Menjadi langkah ① "Pahami" dalam Lab Pemodelan (F-15).*
- Soal cerita ditampilkan dengan tombol **"Urai Soal"** yang:
  1. **Menyorot** bilangan dan satuan penting dalam teks.
  2. Menampilkan templat **Diketahui – Ditanya – Jawab**.
  3. Meminta siswa menyeret/menulis bilangan ke kolom "Diketahui".
- Teks soal cerita ditulis singkat (≤ 60 kata) dan memakai konteks yang dekat dengan siswa.

**Kriteria penerimaan:**
- [ ] Penyorotan dapat dinyalakan/dimatikan.
- [ ] Siswa dapat mengisi templat sebelum menjawab; templat diperiksa dan diberi umpan balik.

### F-11 Pertanyaan Penjelasan Diri (Self-Explanation) — **C**
*Sumber: GL04*
- Setelah beberapa contoh soal, siswa diminta memilih/menulis alasan sebuah langkah ("Mengapa pangkatnya dijumlahkan?").
- Fitur "Jelaskan ke Teman": siswa menyusun penjelasan singkat dari potongan kalimat.

### F-12 Profil & Kemajuan — **M**
- Akun lokal tanpa registrasi (nama panggilan saja) untuk MVP.
- Halaman kemajuan: unit selesai, sifat yang dikuasai (indikator per sifat), soal yang perlu diulang.
- Tidak ada perbandingan dengan siswa lain.

### F-13 Mode Offline — **M**
- Seluruh materi teks, contoh, dan latihan dapat dipakai tanpa internet setelah unduhan pertama.
- Video adalah satu-satunya konten yang membutuhkan internet (kecuali diunduh — **C**).

### F-14 Sinkronisasi Akun & Dasbor Guru — **W** (Fase 2)
- Login opsional, sinkronisasi kemajuan antarperangkat, kode kelas, dasbor guru.

### F-15 Lab Pemodelan Terbimbing (5 Langkah) — **M**
*Sumber: EL05, IL02, GL02, permintaan literasi & pemodelan*
- Setiap soal cerita dikerjakan dengan siklus **① Pahami → ② Buat Model → ③ Selesaikan → ④ Tafsirkan → ⑤ Periksa** ([Literasi §3](09-literasi-matematika.md#3-siklus-pemodelan-5-langkah)).
- Setiap langkah memiliki pertanyaan pemandu, bantuan, dan umpan balik otomatis.
- Bantuan dikurangi bertahap: Contoh Model Lengkap → Model Rumpang → Terbimbing → Mandiri.
- Aplikasi **menyimpan model dan penyelesaian lengkap** untuk setiap soal cerita. Tombol **"Lihat Pemodelan Lengkap"** muncul setelah siswa mencoba minimal satu langkah.
- Bank soal mencakup **8 tipe model** (T1–T8: pertumbuhan, peluruhan, satuan besar/kecil, luas/volume, perbandingan, mencari n, pencacahan, multi-langkah).

**Kriteria penerimaan:**
- [ ] Kelima langkah tampil berurutan, dan langkah yang sudah selesai dapat dibuka kembali.
- [ ] Langkah ② menerima model yang setara (mis. `3*2^6` = `2^6*3`).
- [ ] Setiap tipe T1–T8 memiliki minimal 2 soal di MVP.
- [ ] Pemodelan lengkap tidak dapat dibuka sebelum ada percobaan.
- [ ] Berfungsi offline.

### F-16 Misi Literasi (Soal Berbasis Stimulus) — **M**
*Sumber: permintaan literasi; kerangka AKM Numerasi*
- Satu stimulus (teks ≤ 120 kata, infografis, atau tabel) diikuti 3–5 soal dengan level **Pemahaman, Penerapan, Penalaran**.
- Bentuk soal: pilihan ganda, pilihan ganda kompleks, benar/salah + alasan, isian, menjodohkan.
- Konteks seimbang: **Personal, Sosial budaya, Saintifik**.
- Satu Misi Literasi di akhir setiap unit U1–U7.

**Kriteria penerimaan:**
- [ ] Stimulus dapat dilipat/dibuka kembali saat menjawab soal.
- [ ] Setiap stimulus memuat minimal 1 soal per level proses kognitif.
- [ ] Data nyata mencantumkan sumber; data rekaan ditandai "ilustrasi".

### F-17 Alat Representasi — **S**
*Sumber: EL02, permintaan pemodelan*
- **Tabel Pola**, **Diagram Pohon**, dan **Tangga Satuan** untuk menjembatani situasi nyata ke model simbolik ([Literasi §6](09-literasi-matematika.md#6-alat-representasi-f-17)).

**Kriteria penerimaan:**
- [ ] Tabel Pola dapat diisi siswa dan menyorot pola "×b setiap langkah".
- [ ] Dapat dipakai dengan sentuhan di layar 360 px.

### F-18 Asisten Pemodelan AI — **W** di MVP (rencana v0.4)
*Sumber: permintaan "aplikasi dapat memodelkan berbagai macam soal cerita dan menyelesaikannya"*
- Siswa mengetik atau memfoto soal cerita **sendiri**, lalu asisten memodelkan dan membimbing penyelesaian dengan siklus 5 langkah yang sama.
- Memerlukan internet, login, persetujuan orang tua/wali, dan backend. Spesifikasi lengkap ada di [10-asisten-pemodelan-ai.md](10-asisten-pemodelan-ai.md).
- Hasil perhitungan AI **selalu diverifikasi ulang** oleh mesin matematika lokal sebelum ditampilkan.

### F-19 Buat Soal Ceritamu — **C**
*Sumber: GL04 (senang menjelaskan ke teman), pemodelan terbalik*
- Siswa diberi model (mis. `5 × 3ⁿ`) lalu menyusun soal cerita dari potongan konteks, sehingga terlatih memahami makna setiap bagian model.
- Soal buatan siswa dapat dibagikan ke teman (Fase 2).

## 8. Kebutuhan Non-Fungsional

| ID | Kategori | Kebutuhan |
|---|---|---|
| NFR-01 | Platform | Web (PWA) di Android, Windows, macOS, dan iOS: Chrome, Edge, Firefox, Safari 2 versi terakhir; Android 8.0 ke atas. Klien JavaScript, server Python |
| NFR-DIST | Distribusi | Dipasang langsung dari browser **tanpa Play Store/App Store**. APK Android opsional (PWABuilder). Lihat [11-panduan-rilis-dan-pemasangan.md](11-panduan-rilis-dan-pemasangan.md) |
| NFR-02 | Performa | *First load* web ≤ 3 detik di 4G; perpindahan layar ≤ 300 ms; ukuran APK ≤ 25 MB |
| NFR-03 | Offline | Semua fitur kecuali video dan Asisten Pemodelan AI (F-18) berfungsi tanpa koneksi (lihat F-13) |
| NFR-04 | Perangkat | Lancar di HP RAM 2 GB, layar 5"–6,7", juga tablet & desktop |
| NFR-UX-1 | Tampilan tenang | Palet warna lembut, tanpa warna neon/jenuh, tanpa animasi berkedip (DS03, EL03) |
| NFR-UX-2 | Fokus | Satu tugas utama per layar; tidak ada iklan, pop-up promosi, atau notifikasi berlebihan |
| NFR-UX-3 | Bahasa | Bahasa Indonesia baku yang ramah siswa; istilah konsisten dengan buku teks Kurikulum Merdeka |
| NFR-A11Y | Aksesibilitas | Memenuhi WCAG 2.1 level AA: kontras ≥ 4,5:1, target sentuh ≥ 44×44 px, dukungan pembaca layar, ukuran teks dapat diperbesar |
| NFR-PRIV | Privasi | Mematuhi UU No. 27/2022 tentang Pelindungan Data Pribadi; data anak minimal; tanpa pelacakan iklan; analitik anonim dan dapat dimatikan |
| NFR-SEC | Keamanan | HTTPS wajib; tidak menyimpan data sensitif; dependensi dipindai rutin |
| NFR-MAINT | Pemeliharaan | Konten terpisah dari kode (file JSON/Markdown) agar guru dapat menambah soal tanpa mengubah kode |
| NFR-QA | Kualitas | Cakupan unit test ≥ 70% untuk logika penilaian; semua konten divalidasi skema |

## 9. Alur Pengguna Utama

```
[Buka aplikasi] → [Onboarding: nama panggilan + kelas]
      → [Tes diagnostik (opsional)] → [Beranda: peta unit + "Ulangi hari ini"]
      → [Pilih unit] → [Materi bertahap] → [Contoh soal bertahap]
      → [Video (opsional)] → [Latihan Dasar → Menengah → Tantangan]
             ↘ butuh bantuan → [Petunjuk bertingkat / Kartu Sifat / Contoh mirip]
      → [Misi Literasi (stimulus)] → [Ringkasan unit + refleksi] → [Kembali ke beranda]

[Unit 8 Pemodelan] → [Contoh Model Lengkap] → [Model Rumpang] → [Lab Pemodelan Terbimbing/Mandiri]
      → [Lihat Pemodelan Lengkap] → [Buat Soal Ceritamu (opsional)]

[Fase 2] [Tanya Soalku (ketik/foto)] → [Asisten Pemodelan AI 5 langkah] → [Soal mirip dari bank soal]
```

Detail layar ada di [Desain UI/UX §5](04-desain-ui-ux.md#5-daftar-layar).

## 10. Asumsi dan Pertanyaan Terbuka

| ID | Asumsi / Pertanyaan | Cara validasi | Status |
|---|---|---|---|
| A1 | Siswa memiliki HP Android atau akses browser | Survei perangkat | Terbuka |
| A2 | Siswa mau belajar mandiri di luar sekolah | Uji coba 1 minggu | Terbuka |
| A3 | Video ≤ 5 menit lebih disukai | Uji usabilitas | Terbuka |
| Q1 | Apakah perlu login di MVP? | Diskusi dengan guru/sekolah | Keputusan sementara: **tidak** |
| Q2 | Siapa yang membuat video? | Diskusi tim | Terbuka |
| Q3 | Apakah aplikasi akan didistribusikan via Play Store atau APK langsung? | Diskusi tim | Terbuka |

## 11. Risiko

Lihat [Roadmap §5](07-roadmap.md#5-manajemen-risiko).

## 12. Rilis

| Rilis | Isi | Lihat |
|---|---|---|
| MVP (v0.1) | F-02, F-03, F-04, F-05, F-06, F-07, F-10, F-12, F-13, **F-15, F-16** — Unit 1–8 | [Roadmap](07-roadmap.md) |
| v0.2 | F-01, F-08, F-09, F-17 | |
| v0.3 | F-11, F-19, unduh video | |
| v0.4 (Fase 2) | F-14, **F-18 Asisten Pemodelan AI** | [10-asisten-pemodelan-ai.md](10-asisten-pemodelan-ai.md) |
| v1.0 | Materi tambahan (bentuk akar); perluasan tipe soal cerita ke materi lain | |

## 13. Riwayat Revisi

| Versi | Tanggal | Perubahan | Oleh |
|---|---|---|---|
| 1.0 | 12-11-2026 | Draf awal berdasarkan wawancara S01 | *(isi)* |
| 1.1 | 12-11-2026 | Tambah literasi matematika & pemodelan: tujuan G6–G7, Unit 8, fitur F-15–F-19 | *(isi)* |
