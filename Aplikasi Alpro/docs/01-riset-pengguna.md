# 01 — Riset Pengguna

| Atribut | Keterangan |
|---|---|
| Versi | 1.0 |
| Sumber data | Laporan Hasil Wawancara S01 (3 November 2026) |
| Metode | Wawancara semi-terstruktur, 10:31 menit, direkam dengan persetujuan |
| Artefak pemicu | Lembar latihan soal Bilangan Berpangkat |
| Kerangka analisis | Teori Beban Kognitif (Sweller): Intrinsic, Extraneous, Germane Load |

---

## 1. Ringkasan Eksekutif

Siswa kelas 9 (S01) merasa materi **sifat-sifat dasar** bilangan berpangkat mudah dan menyenangkan, tetapi mengalami lonjakan kesulitan pada tiga titik:

1. **Basis dan pangkat sama-sama berbeda** (mis. `4³ × 8²`) — IL01
2. **Pecahan yang dipangkatkan** (mis. `(2/3)⁴`) — IL05, DS02
3. **Memilih sifat eksponen yang tepat** untuk sebuah soal — EL01

Selain itu, siswa **enggan membaca soal cerita** karena sulit menemukan bilangan yang diketahui (EL05), dan menilai kebenaran jawaban hanya dari "mendekati hasil" (GL02) — tanda bahwa ia **tidak memiliki mekanisme umpan balik yang andal** saat belajar mandiri.

Siswa menginginkan aplikasi yang berisi **materi, contoh soal, dan video pembelajaran** (DS01), dengan **warna yang tidak mencolok** (DS03).

## 2. Kode Analisis

| Kode | Makna | Implikasi desain |
|---|---|---|
| **K** | Konteks / pengalaman belajar umum | Latar belakang persona |
| **IL** | *Intrinsic Load* — kesulitan yang melekat pada materi | Kelola dengan urutan, segmentasi, *scaffolding* |
| **EL** | *Extraneous Load* — beban akibat cara penyajian | **Kurangi** sebanyak mungkin |
| **GL** | *Germane Load* — usaha membangun skema/pemahaman | **Dukung dan dorong** |
| **DS** | *Design Suggestion* — saran langsung dari siswa | Masukan fitur & tampilan |

## 3. Matriks Temuan → Kebutuhan → Fitur

Ini adalah tabel paling penting dalam riset ini. Setiap fitur di PRD harus dapat ditelusuri ke minimal satu baris di sini.

| Kode | Temuan (ringkas) | Kebutuhan pengguna | Fitur yang menjawab | ID Fitur PRD |
|---|---|---|---|---|
| K01 | Belajar bilangan berpangkat seru dan gampang | Pertahankan pengalaman positif | Mulai dari materi mudah untuk membangun rasa percaya diri | F-02 |
| K02 | Belajar dengan contoh soal + penjelasan guru | Penjelasan bertahap disertai contoh | *Worked example* bertahap | F-03 |
| K03 | Ingat sifat basis sama, pangkat beda | Materi dasar sudah dikuasai | Tes diagnostik untuk melewati materi yang sudah dikuasai | F-01 |
| IL01 | Sulit saat basis & pangkat berbeda | Strategi menyamakan basis | Modul khusus "Samakan Basis" + langkah faktorisasi prima | F-03, F-05 |
| IL02 | Mengecek ulang jawaban | Cara memverifikasi langkah | Umpan balik per langkah, bukan hanya jawaban akhir | F-06 |
| IL03 | Perlu belajar berulang-ulang | Pengulangan terstruktur | Latihan ulang otomatis untuk sifat yang lemah | F-09 |
| IL04 | Sulit jika soal di luar kemampuan | Tingkat kesulitan sesuai kemampuan | Level bertingkat + penyesuaian kesulitan sederhana | F-05 |
| IL05 | Sulit saat pecahan dipangkatkan | Penjelasan ekstra pada topik ini | Sub-modul pecahan berpangkat dengan visual | F-02, F-03 |
| EL01 | Bingung memilih sifat eksponen | Panduan memilih sifat | **Kartu Sifat** + **Penunjuk Sifat** (petunjuk bertingkat) | F-04, F-07 |
| EL02 | Gambar, tabel, teks, penjelasan guru menyenangkan | Multimedia | Materi dengan visual, tabel, video pendek | F-02, F-08 |
| EL03 | Tidak ada tampilan yang mengganggu | Antarmuka bersih | Satu fokus per layar, tanpa iklan/animasi berlebih | NFR-UX |
| EL04 | Kecepatan penjelasan normal → mudah paham | Kendali kecepatan | Navigasi mandiri, kontrol kecepatan video | F-02, F-08 |
| EL05 | Malas baca soal cerita, sulit cari bilangan diketahui | Bantuan mengurai soal cerita | **Mode Urai Soal** (sorot bilangan, Diketahui–Ditanya) dalam **Lab Pemodelan 5 Langkah**; Misi Literasi | F-10, F-15, F-16 |
| GL01 | Belajar dengan latihan soal | Banyak latihan | Bank latihan per sifat & per level | F-05 |
| GL02 | Merasa benar jika "mendekati hasil" | Umpan balik yang pasti | Umpan balik eksplisit benar/salah + alasan | F-06 |
| GL03 | Bertanya ke guru dan teman | Bantuan saat buntu | Petunjuk bertingkat; tombol "Tanya Guru" (fase 2) | F-07 |
| GL04 | Senang menjelaskan ke teman | Kesempatan menjelaskan | Pertanyaan *self-explanation* ("Mengapa langkah ini?") | F-11 |
| GL05 | Melihat soal sebelumnya yang mirip | Akses ke contoh serupa | Tautan "Lihat Contoh Mirip" di setiap soal | F-03, F-07 |
| DS01 | Ingin video, contoh soal, dan materi | Tiga jenis konten | Struktur modul: Materi → Contoh → Video → Latihan | F-02, F-03, F-08 |
| DS02 | Sulit: pecahan berpangkat. Mudah: sifat dasar | Prioritas konten | Bobot konten & latihan lebih besar pada pecahan berpangkat | F-02 |
| DS03 | Warna mencolok sebaiknya tidak ada | Palet tenang | Design system warna lembut, kontras cukup | NFR-UX |

## 4. Persona

### Persona Utama — "Raka" (berdasarkan S01)

| Atribut | Keterangan |
|---|---|
| Usia / kelas | 14–15 tahun, kelas 9 SMP |
| Perangkat | Ponsel Android kelas menengah ke bawah; kadang laptop/PC sekolah |
| Koneksi | Tidak selalu stabil; kuota terbatas |
| Gaya belajar | Memperhatikan penjelasan, lalu mengerjakan latihan; mencatat di buku tulis |
| Motivasi | Ingin paham, senang jika berhasil; suka membantu teman |
| Kekuatan | Sudah menguasai sifat dasar (basis sama); punya kebiasaan cek ulang |
| Hambatan | Basis & pangkat berbeda; pecahan berpangkat; memilih sifat; soal cerita |
| Kutipan | *"Kadang-kadang pernah, saya bingung ketika harus menggunakan sifat eksponen yang mana."* |

**Tujuan Raka di aplikasi:**
- Memahami *kapan* memakai sifat yang mana.
- Berlatih sampai yakin, tanpa harus menunggu guru.
- Tahu dengan pasti apakah jawabannya benar, dan mengapa.

**Frustrasi Raka:**
- Soal langsung terlalu sulit.
- Soal cerita panjang tanpa petunjuk.
- Tampilan ramai dan warna mencolok.

### Persona Sekunder — "Bu Sari" (guru matematika) — *fase 2*
Ingin melihat sifat eksponen mana yang paling sering salah di kelasnya, dan memberi tugas latihan. Persona ini **belum divalidasi** dan perlu wawancara terpisah.

## 5. Peta Empati (Raka)

| Berkata | Berpikir |
|---|---|
| "Seru dan gampang" (materi dasar) | "Sifat mana yang harus kupakai di sini?" |
| "Malas baca ceritanya" | "Jawabanku sudah benar belum, ya?" |
| **Melakukan** | **Merasakan** |
| Mengecek ulang jawaban; melihat soal sebelumnya; bertanya ke guru/teman; mengajari teman | Percaya diri di materi dasar; frustrasi saat soal di luar kemampuan; terganggu oleh warna mencolok |

## 6. Perjalanan Pengguna Saat Ini (As-Is)

```
Guru menjelaskan → Contoh soal di papan → Siswa mencatat → Latihan di buku
        → Buntu? → Lihat soal sebelumnya / tanya teman / tanya guru
        → Jawaban "mendekati" → dianggap benar (tidak ada verifikasi)
```

**Titik nyeri utama:** saat belajar di rumah, tidak ada guru untuk ditanya dan tidak ada umpan balik yang pasti.

## 7. Keterbatasan Riset & Rekomendasi

| Keterbatasan | Dampak | Rekomendasi |
|---|---|---|
| Hanya 1 responden (n=1) | Temuan belum dapat digeneralisasi | Wawancara tambahan 4–7 siswa dengan kemampuan berbeda (tinggi/sedang/rendah) |
| Responden cenderung berkemampuan baik (membantu teman) | Kebutuhan siswa berkemampuan rendah mungkin terlewat | Sertakan siswa yang pernah kesulitan di materi dasar |
| Belum ada data guru | Fitur guru belum tervalidasi | Wawancara 1–2 guru matematika SMP |
| Belum ada data perangkat & koneksi | Asumsi teknis belum teruji | Survei singkat: jenis HP, ruang penyimpanan, kuota |
| Durasi wawancara singkat (±10 menit) | Kedalaman terbatas | Gunakan *think-aloud* saat siswa mengerjakan soal di sesi berikutnya |

**Asumsi yang harus divalidasi** (dilacak di [PRD §10](PRD.md#10-asumsi-dan-pertanyaan-terbuka)):
- A1. Siswa memiliki akses ke ponsel Android atau browser.
- A2. Siswa mau belajar mandiri di luar jam sekolah.
- A3. Video pendek (≤5 menit) lebih disukai daripada video panjang.
