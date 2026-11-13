# 04 — Desain UI/UX

| Atribut | Keterangan |
|---|---|
| Versi | 1.0 |
| Prinsip utama | **Tenang, fokus, jelas** — menurunkan beban kognitif ekstrinsik |
| Sumber | EL02, EL03, EL04, DS03 ([Riset Pengguna](01-riset-pengguna.md)) |

---

## 1. Prinsip Desain

1. **Satu layar, satu tujuan.** Setiap layar hanya punya satu aksi utama (tombol primer).
2. **Tenang, bukan ramai.** Warna lembut, tanpa neon, tanpa animasi yang tidak bermakna (DS03).
3. **Bantuan selalu dekat.** Kartu Sifat dan petunjuk dapat dibuka dari mana saja tanpa kehilangan pekerjaan.
4. **Konsisten.** Pola unit, posisi tombol, dan warna makna selalu sama.
5. **Ramah kesalahan.** Jawaban salah adalah kesempatan belajar, bukan hukuman.

## 2. Design Tokens

### 2.1 Warna

Palet tenang dengan saturasi rendah–sedang. Semua pasangan teks/latar memenuhi kontras WCAG AA.

| Token | Hex | Penggunaan |
|---|---|---|
| `--color-bg` | `#F7F8FA` | Latar aplikasi |
| `--color-surface` | `#FFFFFF` | Kartu, panel |
| `--color-text` | `#1F2933` | Teks utama |
| `--color-text-muted` | `#52606D` | Teks sekunder |
| `--color-primary` | `#3B6EA5` | Tombol primer, tautan (biru teduh) |
| `--color-primary-soft` | `#E3ECF6` | Latar sorotan primer |
| `--color-accent-base` | `#2F7D6D` | Penanda **basis** (hijau teal) |
| `--color-accent-exp` | `#8A5A9E` | Penanda **pangkat** (ungu lembut) |
| `--color-success` | `#2E7D4F` | Jawaban benar |
| `--color-success-soft` | `#E6F4EC` | Latar umpan balik benar |
| `--color-attention` | `#A0571A` | Jawaban belum tepat (oranye tanah, **bukan merah menyala**) |
| `--color-attention-soft` | `#FBF0E4` | Latar umpan balik belum tepat |
| `--color-border` | `#D9DEE4` | Garis pembatas |

**Mode gelap** (Should): turunan palet yang sama dengan latar `#1B1F24`.

**Aturan warna:**
- Warna **tidak boleh** menjadi satu-satunya penanda makna — selalu disertai ikon/teks (✓ "Benar", ↻ "Belum tepat").
- Basis dan pangkat diberi warna konsisten di seluruh aplikasi (signaling — P6).
- Maksimal 1 warna aksen dominan per layar.

### 2.2 Tipografi

| Token | Ukuran | Penggunaan |
|---|---|---|
| `--text-xs` | 12 px | Label kecil |
| `--text-sm` | 14 px | Teks sekunder |
| `--text-base` | 16 px | Teks isi (minimum) |
| `--text-lg` | 18 px | Teks materi |
| `--text-xl` | 22 px | Judul segmen |
| `--text-2xl` | 28 px | Judul halaman |
| `--text-math` | 1.15× teks sekitar | Ekspresi matematika |

- Font: **Inter** atau **Nunito** (sans-serif, mudah dibaca), fallback `system-ui`. Font dibundel (offline).
- Tinggi baris 1,5–1,6. Panjang baris maks. ±65 karakter di desktop.
- Pengguna dapat memperbesar teks (100% / 115% / 130%).

### 2.3 Spasi, Bentuk, Gerak

- Skala spasi 4 px: 4, 8, 12, 16, 24, 32, 48.
- Radius sudut: 8 px (tombol), 12 px (kartu).
- Target sentuh minimal **44 × 44 px**.
- Animasi ≤ 200 ms, hanya untuk transisi bermakna. Hormati `prefers-reduced-motion`.
- Tanpa konfeti, efek berkedip, atau suara otomatis.

## 3. Komponen Inti

| Komponen | Deskripsi |
|---|---|
| `MathText` | Membungkus KaTeX; mendukung pewarnaan basis/pangkat |
| `SegmentCard` | Satu segmen materi: teks + visual + navigasi |
| `StepReveal` | Langkah worked example yang terbuka satu per satu, dengan label sifat |
| `PropertyChip` | Label sifat yang bisa diketuk → membuka Kartu Sifat |
| `PropertySheet` | Panel bawah (mobile) / samping (desktop) berisi Kartu Sifat |
| `AnswerInput` | Input jawaban dengan papan ketik matematika mini (`^`, `/`, `(`, `)`, angka, `−`) |
| `FeedbackBanner` | Umpan balik benar/belum tepat + penjelasan + tombol "Lihat langkah" |
| `HintLadder` | Petunjuk bertingkat 1→4 |
| `StoryProblem` | Teks soal cerita + toggle sorot + templat Diketahui–Ditanya–Jawab |
| `ProgressRing` | Indikator penguasaan per sifat (tanpa angka persentase yang menekan) |
| `EffortScale` | Skala 1–9 dengan label "Sangat ringan" – "Sangat berat" |
| `ModelingStepper` | Penunjuk 5 langkah (① Pahami … ⑤ Periksa) di atas layar Lab Pemodelan; langkah selesai dapat diketuk untuk ditinjau |
| `PatternTable` | Tabel Pola yang dapat diisi (n vs nilai), menyorot "×b" di antara baris |
| `TreeDiagram` | Diagram pohon pembelahan/percabangan, maksimal 4 tingkat agar tidak ramai |
| `UnitLadder` | Tangga satuan (KB→MB→GB, mm→m→km) |
| `StimulusPanel` | Stimulus literasi yang dapat dilipat; di desktop tampil berdampingan dengan soal |

## 4. Tata Letak

**Mobile (utama):**
```
┌─────────────────────────┐
│ ← Unit 4   [≡ Sifat] (?)│  ← header ringkas: kembali, Kartu Sifat, bantuan
│ ▓▓▓▓▓░░░░  Segmen 3/6   │  ← progres unit
├─────────────────────────┤
│                         │
│   Konten (1 fokus)      │
│                         │
├─────────────────────────┤
│ [ Kembali ] [ Lanjut ▶ ]│  ← aksi di bawah, mudah dijangkau jempol
└─────────────────────────┘
```

### 4.1 Beranda (v0.1.1, mengikuti gambaran UI dari product owner)

```
┌─────────────────────────┐  ← pita warna --band
│┌───────────────────────┐│
││ (R)  Selamat sore,    ││  avatar inisial, sapaan sesuai jam
││      Raka             ││
││      ✓ 12 bagian ☆ 30 ││  statistik pribadi
││ Level 2      40/100   ││  poin belajar pribadi (tanpa peringkat)
││ ▓▓▓▓░░░░░░░░          ││
││ [Mau belajar apa…? 🔍]││  pencarian materi/sifat/soal cerita
│└───────────────────────┘│
│  ◯Materi ◯Ulang ◯Lab ◯Misi       grid 4×2, ikon di atas bentuk bulat lembut
│  ◯Sifat ◯Kemajuan ◯Pasang ◯Atur
│ [Lanjutkan belajar  →]  │
│ [Ayo Raka, semangat! │UNIT 3/8│]  tips harian, bukan kutipan tokoh
│                     (?) │  tombol bantuan → cara menulis jawaban
│ ⌂  ⚗  ▥  ▤  ⚙          │  menu bawah berikon
└─────────────────────────┘
```

**Adaptasi dari gambaran UI.** Bagian berikut sengaja disesuaikan agar tetap sejalan dengan riset dan PRD:
- **Berlian/koin diganti poin belajar pribadi.** Poin dihitung dari bagian selesai ×10, jawaban benar pertama ×2, dan soal pemodelan selesai ×15. Tidak ada peringkat dan tidak ada perbandingan dengan siswa lain.
- **Lonceng notifikasi tidak dipakai**, agar tidak ada gangguan (EL03).
- **Ikon digambar sendiri**, tanpa maskot atau ilustrasi milik aplikasi lain. Warna bentuk bulat memakai token lembut (`--primary-soft`, `--base-soft`, `--exp-soft`, `--attn-soft`).
- **Font Nunito** (SIL OFL) disertakan di `app/fonts/` agar tetap tampil saat offline.

**Desktop/tablet (≥ 1024 px):** konten di tengah (maks. 720 px), Kartu Sifat dapat disematkan di panel kanan.

## 5. Daftar Layar

| ID | Layar | Isi utama | Fitur PRD |
|---|---|---|---|
| S01 | Splash / Onboarding | Nama panggilan, kelas, penjelasan singkat 3 langkah | F-12 |
| S02 | Tes Diagnostik | Soal satu per satu, tanpa umpan balik per soal, hasil di akhir | F-01 |
| S03 | Beranda | Pita biru + kartu profil (sapaan sesuai waktu, level & poin belajar pribadi, pencarian), grid 8 menu berikon, "Lanjutkan belajar", kartu semangat (tips harian + unit selesai), tombol bantuan "?". Lihat §4.1 | F-09, F-12 |
| S03b | Materi (peta unit) | Daftar 8 unit dengan progres dan tingkat kesulitan | F-02 |
| S03c | Daftar Misi Literasi | Daftar stimulus dan status selesai | F-16 |
| S04 | Ringkasan Unit | Tujuan, daftar bagian (Materi/Contoh/Video/Latihan), status | F-02 |
| S05 | Materi | `SegmentCard` bertahap | F-02 |
| S06 | Contoh Soal | `StepReveal`, mode fading | F-03, F-11 |
| S07 | Video | Pemutar, kontrol kecepatan, subtitle | F-08 |
| S08 | Latihan | Soal, `AnswerInput`, `HintLadder`, `FeedbackBanner` | F-05, F-06, F-07 |
| S09 | Soal Cerita | `StoryProblem` + Mode Urai Soal | F-10 |
| S10 | Akhir Unit | Ringkasan, `EffortScale`, refleksi | F-12 |
| S11 | Kartu Sifat | Daftar sifat + pohon keputusan | F-04 |
| S12 | Kemajuan | Penguasaan per sifat, unit selesai, daftar ulang | F-12 |
| S13 | Pengaturan | Ukuran teks, mode gelap, kurangi gerak, analitik, hapus data | NFR |
| S14 | Lab Pemodelan | `ModelingStepper`, teks soal, area kerja per langkah, alat representasi, "Lihat Pemodelan Lengkap" | F-15, F-17 |
| S15 | Misi Literasi | `StimulusPanel` + soal 3–5 (berbagai bentuk), ringkasan per level proses kognitif | F-16 |
| S16 | Buat Soal Ceritamu | Model diberikan → pilih konteks & susun kalimat | F-19 |
| S17 | Tanya Soalku *(Fase 2)* | Ketik/foto soal → tinjau teks → Lab Pemodelan berbantuan AI; label "Asisten AI dapat keliru" | F-18 |

**Tata letak Lab Pemodelan (mobile):**
```
┌─────────────────────────┐
│ ← Soal 3/16        (?)  │
│ ①━②━③─④─⑤  Buat Model   │  ← ModelingStepper
├─────────────────────────┤
│ ▸ Soal (ketuk untuk buka)│  ← teks soal dapat dilipat
│ Tabel Pola:             │
│  n │ banyak bakteri      │
│  0 │ 3                   │
│  1 │ 3 × 2               │
│  2 │ [      ]            │
│ Model:  B = [        ]  │
├─────────────────────────┤
│ [Petunjuk]   [Periksa ▶]│
└─────────────────────────┘
```

## 6. Panduan Umpan Balik & Bahasa (UX Writing)

| Situasi | ✅ Gunakan | ❌ Hindari |
|---|---|---|
| Jawaban benar | "Benar! Pangkatnya dijumlahkan: 3 + 4 = 7." | "Hebat sekali!!! 🎉🎉🎉" |
| Jawaban salah | "Belum tepat. Sepertinya pangkatnya dikalikan. Coba lihat lagi sifat perkalian." | "SALAH!", "Jawabanmu keliru." |
| Buntu | "Butuh bantuan? Mulai dari petunjuk kecil." | "Menyerah?" |
| Naik level | "Level Menengah terbuka. Kamu bisa lanjut atau berlatih lagi." | "Kamu harus lanjut sekarang." |
| Kembali ke level lebih mudah | "Mau lihat contoh yang mirip dulu?" | "Kamu gagal di level ini." |

- Sapaan "kamu", kalimat aktif, ≤ 20 kata per kalimat.
- Istilah konsisten: **basis**, **pangkat** (sebut "eksponen" sekali sebagai sinonim di U1), **sifat**.

## 7. Aksesibilitas (WCAG 2.1 AA)

- [ ] Kontras teks ≥ 4,5:1 (teks besar ≥ 3:1).
- [ ] Semua ekspresi KaTeX memiliki teks alternatif yang dibacakan ("dua pangkat tiga").
- [ ] Navigasi keyboard penuh di web; urutan fokus logis; indikator fokus terlihat.
- [ ] Label `aria` pada tombol ikon.
- [ ] Gambar materi memiliki `alt` yang menjelaskan isi matematis.
- [ ] Video memiliki subtitle Bahasa Indonesia.
- [ ] Tidak ada batas waktu pada latihan.
- [ ] Teks dapat diperbesar hingga 130% tanpa tata letak rusak.

## 8. Deliverable Desain

| Deliverable | Alat | Status |
|---|---|---|
| Wireframe low-fidelity S01–S13 | Figma / kertas | ⏳ |
| Design system (tokens + komponen) | Figma | ⏳ |
| Prototipe interaktif alur U4 (pecahan) | Figma | ⏳ |
| Uji usabilitas prototipe dengan 3–5 siswa | — | ⏳ |
