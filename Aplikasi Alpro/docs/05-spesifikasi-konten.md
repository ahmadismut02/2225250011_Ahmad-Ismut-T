# 05 — Spesifikasi Konten

| Atribut | Keterangan |
|---|---|
| Versi | 1.0 |
| Format | JSON murni di dalam `EK.addContent({...})` pada `app/content/*.js`, divalidasi oleh `tools/validate_content.py` (SymPy) dan `tests/run-tests.html` |
| Notasi matematika | Di antara `$...$`: `a^b` / `a^{...}` = pangkat, `[p/q]` = pecahan bertingkat; `**tebal**` di luar rumus. Dirender oleh `EK.math.renderText` |
| Catatan | Contoh JSON di §2 adalah rancangan awal. Nama bidang yang dipakai aplikasi ada di `app/content/u1.js` (latihan) dan `app/content/modeling.js` (pemodelan & stimulus) |
| Peninjau wajib | Guru matematika SMP |

---

## 1. Prinsip Penulisan Konten

1. **Satu konsep per segmen**, ≤ 80 kata.
2. **Contoh numerik** selalu berada di dekat rumus.
3. **Bahasa** sesuai [Panduan UX Writing](04-desain-ui-ux.md#6-panduan-umpan-balik--bahasa-ux-writing).
4. **Soal cerita** ≤ 60 kata, satu informasi per kalimat, bilangan ditulis sebagai angka.
5. Setiap soal **wajib** memiliki: jawaban, pembahasan, minimal 1 umpan balik miskonsepsi, sifat yang diuji.
6. Soal Menengah & Tantangan **wajib** memiliki 3–4 petunjuk bertingkat.
7. Gambar dalam format **SVG** (diagram) atau **WebP** (foto), ≤ 100 KB, dengan teks `alt`.
8. Konten asli buatan tim atau berlisensi terbuka; cantumkan sumber jika diadaptasi.

## 2. Skema Konten

### 2.1 Unit (`unit.json`)

```json
{
  "id": "u4",
  "order": 4,
  "title": "Pecahan Berpangkat",
  "objectives": ["Menerapkan sifat $(\\frac{a}{b})^n = \\frac{a^n}{b^n}$ dengan $b \\neq 0$"],
  "prerequisites": ["u3"],
  "difficulty": 3,
  "propertyIds": ["P5"],
  "estimatedMinutes": 25,
  "videoIds": ["v-u4-1"]
}
```

### 2.2 Segmen Materi (`lessons.json`)

```json
{
  "id": "u4-s1",
  "unitId": "u4",
  "order": 1,
  "title": "Pecahan yang dikalikan berulang",
  "body": "Ingat, pangkat berarti perkalian berulang. Jadi $(\\frac{2}{3})^3 = \\frac{2}{3} \\times \\frac{2}{3} \\times \\frac{2}{3}$.",
  "media": { "type": "image", "src": "/images/u4/pecahan-berulang.svg", "alt": "Tiga batang pecahan dua pertiga dikalikan" },
  "keyIdea": "Pangkat pada pecahan = pecahan itu dikalikan dengan dirinya sendiri."
}
```

### 2.3 Contoh Soal Bertahap (`examples.json`)

```json
{
  "id": "u6-e1",
  "unitId": "u6",
  "mode": "full",
  "prompt": "Sederhanakan $4^3 \\times 8^2$ dalam bentuk $2^n$.",
  "steps": [
    { "text": "Uraikan basis ke faktor prima: $4 = 2^2$ dan $8 = 2^3$.", "propertyId": null },
    { "text": "$4^3 \\times 8^2 = (2^2)^3 \\times (2^3)^2$", "propertyId": null },
    { "text": "$= 2^6 \\times 2^6$", "propertyId": "P3" },
    { "text": "$= 2^{12}$", "propertyId": "P1" }
  ],
  "selfExplain": {
    "question": "Mengapa pada langkah terakhir pangkatnya dijumlahkan?",
    "options": ["Karena basisnya sama dan dikalikan", "Karena pangkatnya sama", "Karena hasilnya genap"],
    "answerIndex": 0
  }
}
```

`mode`: `full` (semua langkah ditampilkan bertahap) | `partial` (beberapa langkah berisi `"blank": true` yang harus diisi siswa).

### 2.4 Soal Latihan (`exercises.json`)

```json
{
  "id": "u2-x07",
  "unitId": "u2",
  "level": "menengah",
  "type": "input",
  "prompt": "Hitung $3^5 \\div 3^2$. Tulis dalam bentuk $3^n$.",
  "answer": { "value": "3^3", "compare": "exact" },
  "propertyIds": ["P2"],
  "wrongAnswers": [
    { "answer": "3^7", "misconceptionId": "M11" },
    { "answer": "1^3", "misconceptionId": "M03" }
  ],
  "hints": [
    "Perhatikan basisnya. Apakah sama?",
    "Gunakan sifat pembagian bilangan berpangkat dengan basis sama.",
    "Pangkatnya dikurangkan: $5 - 2 = \\dots$",
    { "showExampleId": "u2-e3" }
  ],
  "explanation": "Basis sama (3), operasi pembagian → pangkat dikurangkan: $3^{5-2} = 3^3$.",
  "source": "Tim EksponenKu"
}
```

**Tipe soal (`type`):**

| Tipe | Deskripsi | Bidang tambahan |
|---|---|---|
| `mcq` | Pilihan ganda (4 opsi) | `options[]`, `answerIndex` |
| `input` | Isian angka/ekspresi | `answer.value`, `answer.compare` (`exact` / `value` / `equivalent`) |
| `choose-property` | Pilih sifat yang tepat untuk soal | `answerPropertyId` |
| `order-steps` | Susun langkah pengerjaan | `steps[]` (urutan benar) |
| `story` | Soal cerita + templat urai | `highlights[]` (indeks kata), `known[]`, `asked`, lalu sub-soal `input`/`mcq` |
| `modeling` | Soal cerita dengan siklus 5 langkah (F-15) | Lihat §2.7 |
| `multi-select` | Pilihan ganda kompleks (lebih dari satu jawaban benar) | `options[]`, `answerIndexes[]` |
| `true-false-reason` | Benar/salah + memilih alasan (soal penalaran) | `statement`, `answer`, `reasons[]`, `reasonIndex` |
| `matching` | Menjodohkan | `left[]`, `right[]`, `pairs[]` |

### 2.5 Kartu Sifat (`property-cards.json`)

| ID | Sifat | Rumus | Gunakan jika… |
|---|---|---|---|
| P1 | Perkalian basis sama | $a^m \times a^n = a^{m+n}$ | Dua bilangan berpangkat **berbasis sama** dikalikan |
| P2 | Pembagian basis sama | $a^m \div a^n = a^{m-n}$, $a \neq 0$ | Dua bilangan berpangkat **berbasis sama** dibagi |
| P3 | Pangkat dari pangkat | $(a^m)^n = a^{m \times n}$ | Bilangan berpangkat dipangkatkan lagi |
| P4 | Pangkat dari perkalian | $(ab)^n = a^n b^n$ | Hasil kali dalam kurung dipangkatkan |
| P5 | Pangkat dari pecahan | $(\frac{a}{b})^n = \frac{a^n}{b^n}$, $b \neq 0$ | Pecahan dalam kurung dipangkatkan |
| P6 | Pangkat nol | $a^0 = 1$, $a \neq 0$ | Pangkatnya 0 |
| P7 | Pangkat negatif | $a^{-n} = \frac{1}{a^n}$, $a \neq 0$ | Pangkatnya negatif |
| S1 | Strategi: samakan basis | $4 = 2^2$, $8 = 2^3$, … | Basis berbeda tetapi berasal dari faktor prima yang sama |

Setiap kartu juga memuat `example` dan `commonMistake` (merujuk ke `misconceptions.json`).

### 2.6 Miskonsepsi (`misconceptions.json`)

```json
{ "id": "M02", "label": "Mengalikan pangkat pada perkalian basis sama",
  "feedback": "Pada perkalian basis sama, pangkatnya **dijumlahkan**, bukan dikalikan.",
  "relatedPropertyId": "P1" }
```

Katalog awal ada di [Desain Instruksional §6](02-desain-instruksional.md#6-katalog-miskonsepsi).

### 2.7 Soal Cerita & Pemodelan

Setiap soal `modeling` **wajib** menyimpan pemodelan lengkap (`modelingSolution`) yang mencakup kelima langkah. Data ini dipakai sekaligus untuk umpan balik per langkah, tombol "Lihat Pemodelan Lengkap", dan mode fading.

```json
{
  "id": "u8-m03",
  "unitId": "u8",
  "type": "modeling",
  "problemType": "T1",
  "context": "saintifik",
  "level": "menengah",
  "fadingStage": 3,
  "text": "Sebuah sel bakteri membelah menjadi 2 setiap 20 menit. Mula-mula terdapat 3 bakteri. Bu guru mencatat percobaan dimulai pukul 07.00. Berapa banyak bakteri pada pukul 09.00?",
  "modelingSolution": {
    "understand": {
      "known": [
        { "label": "bakteri awal", "value": "3", "unit": "bakteri" },
        { "label": "faktor pembelahan", "value": "2", "unit": "kali" },
        { "label": "selang waktu", "value": "20", "unit": "menit" },
        { "label": "lama percobaan", "value": "120", "unit": "menit" }
      ],
      "asked": "banyak bakteri pada pukul 09.00",
      "irrelevant": ["Bu guru mencatat"]
    },
    "model": {
      "answer": "3*2^6",
      "compare": "equivalent",
      "representation": "tabel-pola",
      "patternTable": [["0", "3"], ["1", "3 \\times 2"], ["2", "3 \\times 2^2"], ["n", null]],
      "explanation": "120 ÷ 20 = 6 kali membelah, setiap kali dikali 2."
    },
    "solve": {
      "steps": [
        { "latex": "2^6 = 64", "propertyId": null },
        { "latex": "3 \\times 64 = 192", "propertyId": null }
      ],
      "answer": { "value": "192", "compare": "value" }
    },
    "interpret": {
      "template": "Jadi, pada pukul 09.00 terdapat ___ bakteri.",
      "answer": "192",
      "unit": "bakteri"
    },
    "check": {
      "question": "Mengapa jawaban 192 masuk akal?",
      "options": [
        "Karena 3 → 6 → 12 → 24 → 48 → 96 → 192 tepat 6 kali dikali 2",
        "Karena 192 adalah bilangan genap",
        "Karena 192 lebih kecil dari 200"
      ],
      "answerIndex": 0
    }
  },
  "wrongAnswers": [
    { "step": "model", "answer": "3*2^2", "misconceptionId": "MM01" },
    { "step": "model", "answer": "6^6", "misconceptionId": "M03" }
  ],
  "hints": {
    "understand": ["Cari semua bilangan dan satuannya.", "Kalimat mana yang tidak memengaruhi jumlah bakteri?"],
    "model": ["Berapa menit dari 07.00 sampai 09.00?", "Isi tabel: setelah 1 kali membelah ada berapa?"]
  },
  "status": "review"
}
```

**Miskonsepsi pemodelan** (`MM`, ditambahkan ke `misconceptions.json`):

| Kode | Miskonsepsi | Umpan balik |
|---|---|---|
| MM01 | Memakai lama waktu (jam) sebagai pangkat tanpa mengubah ke banyak kejadian | "Pangkat adalah **banyaknya kejadian** (membelah), bukan jumlah jam. Ada berapa kali 20 menit dalam 2 jam?" |
| MM02 | Menjumlahkan alih-alih mengalikan berulang (model linear) | "Bakteri bertambah **berlipat**, bukan bertambah 2 setiap kali. Coba isi tabel polanya." |
| MM03 | Lupa nilai awal (`bⁿ` saja, tanpa `a ×`) | "Mula-mula ada berapa? Jangan lupa dikalikan dengan jumlah awal." |
| MM04 | Peluruhan dimodelkan dengan pangkat negatif yang salah tanda / pembagian berulang keliru | "Setiap kali tersisa setengahnya, jadi dikali 1/2 setiap langkah." |
| MM05 | Jawaban tanpa satuan atau konteks | "Angkanya sudah benar. Sekarang tulis artinya dalam soal, lengkap dengan satuan." |
| MM06 | Menerima jawaban yang tidak masuk akal (mis. 0,5 bakteri, tinggi pantulan bertambah) | "Apakah mungkin ada setengah bakteri? Periksa lagi modelnya." |

### 2.8 Stimulus Literasi (`stimuli.json`)

```json
{
  "id": "lit-u7-01",
  "unitId": "u7",
  "context": "personal",
  "title": "Memori HP Raka",
  "body": "HP Raka memiliki penyimpanan 32 GB … (≤ 120 kata)",
  "media": { "type": "image", "src": "/images/lit/memori-hp.svg", "alt": "Infografis ukuran foto 4 MB, lagu 8 MB, video 1 menit 128 MB" },
  "dataSource": "Ilustrasi",
  "questionIds": ["lit-u7-01-q1", "lit-u7-01-q2", "lit-u7-01-q3", "lit-u7-01-q4"]
}
```

Setiap soal stimulus adalah `Exercise` biasa dengan tambahan `stimulusId` dan `cognitiveLevel` (`pemahaman` | `penerapan` | `penalaran`).

## 3. Target Jumlah Konten (MVP)

| Unit | Segmen materi | Contoh soal | Soal latihan (D/M/T) | Soal pemodelan | Stimulus literasi | Video |
|---|---|---|---|---|---|---|
| U1 | 3 | 3 | 5/5/5 | 1 | 1 | — |
| U2 | 4 | 3 | 5/5/5 | 1 | 1 | — |
| U3 | 4 | 3 | 5/5/5 | 1 | 1 | — |
| U4 | 5 | **5** | **6/6/6** | 2 | 1 | **1** |
| U5 | 4 | 3 | 5/5/5 | 1 | 1 | — |
| U6 | 5 | **5** | **6/6/6** | 2 | 1 | **1** |
| U7 | 4 | 3 | 5/5/5 | 2 | 1 | — |
| U8 | 4 | **8** (1 per tipe) | — | **16** (2 per tipe T1–T8) | 2 | 1 |
| **Total** | **33** | **33** | **111** | **26** | **9** (± 36 soal) | **3** |

Ditambah: 10 soal diagnostik, pre/post-test paralel (20 soal prosedural + 2 stimulus literasi + 2 soal pemodelan uraian), dan 5 soal sumatif per unit.

**Sebaran wajib:** setiap tipe T1–T8 minimal 2 soal. Stimulus literasi seimbang antara konteks Personal, Sosial budaya, dan Saintifik (masing-masing minimal 3).

## 4. Alur Kerja Konten

```
Draf (penulis) → Validasi otomatis (python tools/validate_content.py + tools/run_tests.ps1)
   → Review matematika (guru) → Review bahasa & keterbacaan
   → Uji coba dengan siswa → Revisi → Terbit
```

| Status | Arti |
|---|---|
| `draft` | Sedang ditulis |
| `review` | Menunggu tinjauan guru |
| `approved` | Disetujui, siap tampil |

Hanya konten berstatus `approved` yang ikut dalam build produksi.

## 5. Checklist Review Soal

- [ ] Jawaban benar secara matematis (dicek dua orang).
- [ ] Hanya ada satu jawaban benar (untuk `mcq`).
- [ ] Pengecoh berasal dari miskonsepsi nyata, bukan acak.
- [ ] Bahasa jelas, tidak ambigu, ≤ 60 kata untuk soal cerita.
- [ ] Level sesuai (Dasar = 1 sifat; Menengah = 2 sifat; Tantangan = ≥ 3 sifat atau basis berbeda).
- [ ] Petunjuk bertingkat tidak langsung memberikan jawaban di tingkat 1.
- [ ] LaTeX dirender dengan benar di layar 360 px.
- [ ] (Soal pemodelan) `modelingSolution` lengkap kelima langkah; model diuji ulang dengan menghitung nilainya.
- [ ] (Soal pemodelan) Tipe T1–T8 dan konteks diisi dengan benar; info pengecoh ≤ 1.
- [ ] (Stimulus) Ada soal untuk ketiga level proses kognitif; sumber data dicantumkan atau ditandai "ilustrasi".
