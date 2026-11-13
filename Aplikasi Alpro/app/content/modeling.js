EK.addContent({
  "modeling": [
    {
      "id": "m-bakteri",
      "unit": "u8",
      "type": "T1",
      "context": "saintifik",
      "stage": "contoh",
      "title": "Bakteri di laboratorium",
      "text": "Sebuah sel bakteri membelah menjadi 2 setiap 20 menit. Mula-mula terdapat 3 bakteri. Bu guru mencatat percobaan dimulai pukul 07.00. Berapa banyak bakteri pada pukul 09.00?",
      "understand": {
        "known": [
          { "label": "Banyak bakteri mula-mula", "answer": "3", "unit": "bakteri" },
          { "label": "Setiap membelah, dikali", "answer": "2", "unit": "" },
          { "label": "Selang waktu membelah", "answer": "20", "unit": "menit" },
          { "label": "Lama percobaan (07.00–09.00)", "answer": "120", "unit": "menit" }
        ],
        "asked": { "options": ["Banyak bakteri pada pukul 09.00", "Waktu bakteri mulai membelah", "Lama percobaan"], "correct": 0 },
        "irrelevant": { "options": ["Bu guru mencatat percobaan", "Bakteri membelah setiap 20 menit", "Mula-mula ada 3 bakteri"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model banyak bakteri setelah n kali membelah.",
        "lhs": "B",
        "answer": "3*2^n",
        "table": { "head": ["n (kali membelah)", "Banyak bakteri"], "rows": [["0", "3"], ["1", "$3 × 2$ = 6"], ["2", "$3 × 2^2$ = 12"]], "ask": { "label": "3", "answer": "24" } },
        "wrong": [ { "answer": "3+2*n", "mis": "MM02" }, { "answer": "2^n", "mis": "MM03" }, { "answer": "6^n", "mis": "M03" }, { "answer": "3*2^120", "mis": "MM01" } ],
        "explanation": "Mula-mula ada 3 bakteri, dan setiap kali membelah jumlahnya dikali 2. Jadi, setelah n kali membelah: $B = 3 × 2^n$."
      },
      "solve": {
        "n": { "prompt": "Berapa kali bakteri membelah dari pukul 07.00 sampai 09.00? n =", "answer": "6", "wrong": [ { "answer": "2", "mis": "MM01" }, { "answer": "120", "mis": "MM01" } ] },
        "prompt": "Hitung banyak bakteri: B =",
        "answer": "192",
        "mode": "value",
        "steps": ["120 menit ÷ 20 menit = 6, jadi n = 6", "$B = 3 × 2^6$", "$2^6 = 64$", "$B = 3 × 64 = 192$"]
      },
      "interpret": { "before": "Jadi, pada pukul 09.00 terdapat", "after": "bakteri.", "answer": "192" },
      "check": {
        "question": "Mengapa jawaban 192 masuk akal?",
        "options": ["Karena 3 → 6 → 12 → 24 → 48 → 96 → 192 tepat 6 kali dikali 2", "Karena 192 adalah bilangan genap", "Karena 192 kurang dari 200"],
        "correct": 0,
        "optionFeedback": { "1": "MM06", "2": "MM06" }
      },
      "hints": {
        "understand": ["Cari semua bilangan dan satuannya di soal.", "Dari 07.00 ke 09.00 ada berapa menit?"],
        "model": ["Isi tabelnya: setelah 3 kali membelah ada berapa?", "Setiap baris dikali 2. Berapa yang dikali 2 sebanyak n kali?", "Jangan lupa jumlah awalnya, yaitu 3."],
        "solve": ["Ada berapa kali 20 menit dalam 120 menit?", "Hitung $2^6$, lalu kalikan dengan 3."],
        "interpret": ["Tulis hasil hitunganmu ke dalam kalimat."],
        "check": ["Coba hitung satu per satu: dikali 2 sebanyak 6 kali."]
      }
    },
    {
      "id": "m-pesan",
      "unit": "u8",
      "type": "T1",
      "context": "sosial budaya",
      "stage": "rumpang",
      "title": "Pesan berantai",
      "text": "Pada hari ke-1, Dina mengirim pesan kepada 3 temannya. Setiap orang yang menerima pesan meneruskannya kepada 3 orang baru pada hari berikutnya. Dina mengirim pesan itu dari ponsel barunya. Berapa orang yang menerima pesan pada hari ke-5?",
      "understand": {
        "known": [
          { "label": "Penerima pada hari ke-1", "answer": "3", "unit": "orang" },
          { "label": "Setiap penerima meneruskan kepada", "answer": "3", "unit": "orang" },
          { "label": "Hari yang ditanyakan", "answer": "5", "unit": "" }
        ],
        "asked": { "options": ["Banyak penerima pesan pada hari ke-5", "Jumlah semua penerima dari hari ke-1 sampai ke-5", "Banyak teman Dina"], "correct": 0 },
        "irrelevant": { "options": ["Dina mengirim pesan dari ponsel barunya", "Setiap penerima meneruskan kepada 3 orang baru", "Pada hari ke-1 ada 3 penerima"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model banyak penerima pesan pada hari ke-n.",
        "lhs": "P",
        "answer": "3^n",
        "table": { "head": ["Hari ke-n", "Penerima"], "rows": [["1", "3"], ["2", "$3 × 3 = 3^2$"], ["3", "$3^3$"]], "ask": { "label": "4", "answer": "81" } },
        "wrong": [ { "answer": "3*n", "mis": "MM02" }, { "answer": "n^3", "feedback": "Yang dikali berulang adalah 3, jadi 3 yang menjadi basis, dan n menjadi pangkat." }, { "answer": "3*3^n", "feedback": "Periksa hari ke-1: modelmu memberi $3 × 3^1 = 9$, padahal penerima hari ke-1 hanya 3." } ],
        "explanation": "Hari ke-1: 3 orang, hari ke-2: $3^2$ orang, hari ke-3: $3^3$ orang. Jadi, pada hari ke-n: $P = 3^n$."
      },
      "solve": {
        "n": { "prompt": "n =", "answer": "5" },
        "prompt": "P =",
        "answer": "243",
        "mode": "value",
        "steps": ["$P = 3^5$", "$= 3 × 3 × 3 × 3 × 3 = 243$"]
      },
      "interpret": { "before": "Jadi, pada hari ke-5 ada", "after": "orang yang menerima pesan.", "answer": "243" },
      "check": {
        "question": "Apakah jawaban 243 masuk akal?",
        "options": ["Ya. Polanya 3, 9, 27, 81, 243, dan setiap hari dikali 3", "Ya, karena 5 × 3 = 15 lalu dikali banyak teman", "Tidak, karena pesan tidak mungkin diteruskan"],
        "correct": 0,
        "optionFeedback": { "1": "MM02", "2": "MM06" }
      },
      "hints": {
        "understand": ["Siapa saja yang menerima pesan pada hari ke-1?"],
        "model": ["Isi tabel: pada hari ke-4 ada berapa penerima?", "Setiap hari dikali 3.", "Hari ke-n sama dengan 3 dikali sebanyak n kali."],
        "solve": ["Hitung $3^5$."],
        "interpret": ["Tulis hasilnya ke dalam kalimat."],
        "check": ["Coba tulis pola dari hari ke-1 sampai ke-5."]
      }
    },
    {
      "id": "m-bola",
      "unit": "u4",
      "type": "T2",
      "context": "saintifik",
      "stage": "terbimbing",
      "title": "Bola yang memantul",
      "text": "Sebuah bola dijatuhkan dari ketinggian 64 cm. Setiap kali memantul, tinggi pantulan menjadi setengah dari tinggi sebelumnya. Bola itu berwarna merah. Berapa tinggi pantulan ke-4?",
      "understand": {
        "known": [
          { "label": "Tinggi awal", "answer": "64", "unit": "cm" },
          { "label": "Setiap pantulan, tinggi dikali", "answer": "1/2", "unit": "" },
          { "label": "Pantulan yang ditanyakan", "answer": "4", "unit": "" }
        ],
        "asked": { "options": ["Tinggi pantulan ke-4", "Jarak total yang ditempuh bola", "Banyaknya pantulan"], "correct": 0 },
        "irrelevant": { "options": ["Bola itu berwarna merah", "Tinggi awal 64 cm", "Tinggi pantulan menjadi setengahnya"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model tinggi pantulan ke-n. Gunakan (1/2) untuk setengah.",
        "lhs": "h",
        "answer": "64*(1/2)^n",
        "table": { "head": ["Pantulan ke-n", "Tinggi (cm)"], "rows": [["0", "64"], ["1", "$64 × [1/2]$ = 32"], ["2", "$64 × ([1/2])^2$ = 16"]], "ask": { "label": "3", "answer": "8" } },
        "wrong": [ { "answer": "64*2^n", "mis": "MM04" }, { "answer": "(1/2)^n", "mis": "MM03" }, { "answer": "64-2*n", "mis": "MM02" }, { "answer": "64/2*n", "mis": "MM02" } ],
        "explanation": "Mula-mula 64 cm, dan setiap pantulan tingginya dikali $[1/2]$. Jadi, $h = 64 × ([1/2])^n$."
      },
      "solve": {
        "n": { "prompt": "n =", "answer": "4" },
        "prompt": "h =",
        "answer": "4",
        "mode": "value",
        "steps": ["$h = 64 × ([1/2])^4$", "$([1/2])^4 = [1/16]$", "$h = 64 × [1/16] = 4$"],
        "wrong": [ { "answer": "1024", "mis": "MM04" }, { "answer": "16", "mis": "M07" } ]
      },
      "interpret": { "before": "Jadi, tinggi pantulan ke-4 adalah", "after": "cm.", "answer": "4" },
      "check": {
        "question": "Apakah jawaban 4 cm masuk akal?",
        "options": ["Ya. Tingginya makin kecil: 64 → 32 → 16 → 8 → 4", "Tidak, karena pantulan bola seharusnya makin tinggi", "Ya, karena 4 adalah bilangan genap"],
        "correct": 0,
        "optionFeedback": { "1": "MM06", "2": "MM06" }
      },
      "hints": {
        "understand": ["'Setengah' dapat ditulis sebagai 1/2."],
        "model": ["Isi tabel: pantulan ke-3 setinggi berapa?", "Setiap pantulan, tingginya dikali $[1/2]$.", "Model: tinggi awal × $([1/2])^n$"],
        "solve": ["$([1/2])^4 = [1/2^4]$", "$64 × [1/16]$ = 64 ÷ 16"],
        "interpret": ["Jangan lupa satuannya, yaitu cm."],
        "check": ["Apakah tinggi pantulan seharusnya bertambah atau berkurang?"]
      }
    },
    {
      "id": "m-obat",
      "unit": "u8",
      "type": "T2",
      "context": "saintifik",
      "stage": "terbimbing",
      "title": "Obat di dalam tubuh",
      "text": "Dalam tubuh seorang pasien terdapat 800 mg obat. Setiap 6 jam, jumlah obat di dalam tubuh tinggal setengahnya. Pasien minum obat itu setelah sarapan. Berapa mg obat yang tersisa setelah 24 jam? (Data ilustrasi)",
      "understand": {
        "known": [
          { "label": "Obat mula-mula", "answer": "800", "unit": "mg" },
          { "label": "Setiap 6 jam, jumlah obat dikali", "answer": "1/2", "unit": "" },
          { "label": "Lama waktu", "answer": "24", "unit": "jam" }
        ],
        "asked": { "options": ["Sisa obat setelah 24 jam", "Banyak obat yang diminum", "Waktu sarapan pasien"], "correct": 0 },
        "irrelevant": { "options": ["Pasien minum obat setelah sarapan", "Setiap 6 jam obat tinggal setengahnya", "Mula-mula ada 800 mg obat"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model sisa obat setelah n kali berkurang setengah.",
        "lhs": "S",
        "answer": "800*(1/2)^n",
        "wrong": [ { "answer": "800*2^n", "mis": "MM04" }, { "answer": "(1/2)^n", "mis": "MM03" }, { "answer": "800-2*n", "mis": "MM02" }, { "answer": "800*(1/2)^24", "mis": "MM01" } ],
        "explanation": "Mula-mula 800 mg, dan setiap 6 jam dikali $[1/2]$. Jadi, $S = 800 × ([1/2])^n$."
      },
      "solve": {
        "n": { "prompt": "Ada berapa kali 6 jam dalam 24 jam? n =", "answer": "4", "wrong": [ { "answer": "24", "mis": "MM01" }, { "answer": "6", "mis": "MM01" } ] },
        "prompt": "S =",
        "answer": "50",
        "mode": "value",
        "steps": ["24 jam ÷ 6 jam = 4, jadi n = 4", "$S = 800 × ([1/2])^4 = 800 × [1/16]$", "$S = 50$"]
      },
      "interpret": { "before": "Jadi, setelah 24 jam obat yang tersisa adalah", "after": "mg.", "answer": "50" },
      "check": {
        "question": "Cara manakah yang dapat memeriksa jawaban 50 mg?",
        "options": ["800 → 400 → 200 → 100 → 50, yaitu dibagi 2 sebanyak 4 kali", "800 − 24 × 6 = 656", "800 ÷ 24 ≈ 33"],
        "correct": 0,
        "optionFeedback": { "1": "MM02", "2": "MM02" }
      },
      "hints": {
        "understand": ["Berapa jam lamanya? Berapa jam sekali obat berkurang setengah?"],
        "model": ["Mirip dengan soal bola memantul: setiap langkah dikali $[1/2]$.", "Jumlah awalnya 800.", "$S = 800 × ([1/2])^n$"],
        "solve": ["n adalah banyaknya kejadian, bukan lamanya jam.", "24 ÷ 6 = ...", "$800 ÷ 16$"],
        "interpret": ["Satuannya mg."],
        "check": ["Bagi 800 dengan 2 berulang kali."]
      }
    },
    {
      "id": "m-memori",
      "unit": "u7",
      "type": "T3",
      "context": "personal",
      "stage": "terbimbing",
      "title": "Memori HP",
      "text": "HP Raka memiliki memori 32 GB. Diketahui 1 GB = $2^{10}$ MB. Raka membeli HP itu tahun lalu. Berapa MB memori HP Raka? Tulis dalam bentuk $2^n$.",
      "understand": {
        "known": [
          { "label": "Memori HP", "answer": "32", "unit": "GB" },
          { "label": "1 GB sama dengan (MB)", "answer": "2^10", "unit": "MB" }
        ],
        "asked": { "options": ["Memori HP dalam satuan MB", "Harga HP Raka", "Memori HP dalam satuan GB"], "correct": 0 },
        "irrelevant": { "options": ["Raka membeli HP itu tahun lalu", "1 GB = $2^{10}$ MB", "Memori HP 32 GB"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis bentuk perkalian untuk mengubah 32 GB menjadi MB. Gunakan bentuk berpangkat.",
        "lhs": "M",
        "answer": "32*2^10",
        "wrong": [ { "answer": "32+2^10", "feedback": "Setiap 1 GB berisi $2^{10}$ MB. Untuk 32 GB, kalikan, jangan dijumlahkan." }, { "answer": "32/2^10", "feedback": "Mengubah GB ke MB (satuan lebih kecil) berarti hasilnya lebih besar, jadi dikali." } ],
        "explanation": "32 GB = 32 × $2^{10}$ MB."
      },
      "solve": {
        "prompt": "Tulis dalam bentuk $2^n$: M =",
        "answer": "2^15",
        "mode": "exact",
        "steps": ["$32 = 2^5$", "$32 × 2^{10} = 2^5 × 2^{10}$", "$= 2^{15}$"],
        "wrong": [ { "answer": "2^50", "mis": "M02" }, { "answer": "64^10", "mis": "M03" } ],
        "formHint": "Nilainya benar. Ubah 32 menjadi $2^5$, lalu tulis hasilnya dalam bentuk $2^n$."
      },
      "interpret": { "before": "Jadi, memori HP Raka adalah", "after": "MB.", "answer": "2^15" },
      "check": {
        "question": "Apakah $2^{15}$ MB masuk akal?",
        "options": ["Ya. $2^{15}$ = 32768, dan 32768 ÷ 1024 = 32 GB", "Tidak, karena MB lebih besar dari GB", "Ya, karena 15 lebih kecil dari 32"],
        "correct": 0,
        "optionFeedback": { "1": "MB adalah satuan yang **lebih kecil** daripada GB.", "2": "MM06" }
      },
      "hints": {
        "understand": ["Satuan apa yang diketahui, dan satuan apa yang ditanya?"],
        "model": ["1 GB = $2^{10}$ MB, jadi 32 GB = 32 × ...", "Gunakan tanda * untuk perkalian dan ^ untuk pangkat."],
        "solve": ["Ubah 32 menjadi bentuk $2^n$.", "$2^5 × 2^{10}$: jumlahkan pangkatnya."],
        "interpret": ["Kamu boleh menulis $2^{15}$ atau 32768."],
        "check": ["Ubah kembali ke GB: bagi dengan $2^{10}$ = 1024."]
      }
    },
    {
      "id": "m-flashdisk",
      "unit": "u2",
      "type": "T5",
      "context": "personal",
      "stage": "terbimbing",
      "title": "Dua flashdisk",
      "text": "Kapasitas flashdisk A adalah $2^6$ GB, sedangkan flashdisk B adalah $2^2$ GB. Flashdisk A berwarna biru. Berapa kali lipat kapasitas flashdisk A dibandingkan flashdisk B?",
      "understand": {
        "known": [
          { "label": "Kapasitas flashdisk A", "answer": "2^6", "unit": "GB" },
          { "label": "Kapasitas flashdisk B", "answer": "2^2", "unit": "GB" }
        ],
        "asked": { "options": ["Berapa kali lipat kapasitas A dibandingkan B", "Selisih kapasitas A dan B", "Jumlah kapasitas A dan B"], "correct": 0 },
        "irrelevant": { "options": ["Flashdisk A berwarna biru", "Kapasitas A adalah $2^6$ GB", "Kapasitas B adalah $2^2$ GB"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model perbandingan kapasitas A terhadap B (gunakan bentuk berpangkat).",
        "lhs": "K",
        "answer": "2^6/2^2",
        "wrong": [ { "answer": "2^6-2^2", "feedback": "'Berapa kali lipat' berarti **dibagi**, bukan dikurangi." }, { "answer": "2^2/2^6", "feedback": "Yang dibandingkan adalah A terhadap B, jadi A dibagi B." } ],
        "explanation": "Berapa kali lipat berarti dibagi: $K = 2^6 ÷ 2^2$."
      },
      "solve": {
        "prompt": "K =",
        "answer": "16",
        "mode": "value",
        "steps": ["$2^6 ÷ 2^2 = 2^{6-2}$", "$= 2^4 = 16$"],
        "wrong": [ { "answer": "2^3", "mis": "M13" }, { "answer": "2^8", "mis": "M11" }, { "answer": "60", "feedback": "64 − 4 = 60 adalah selisih, bukan berapa kali lipat." } ]
      },
      "interpret": { "before": "Jadi, kapasitas flashdisk A adalah", "after": "kali kapasitas flashdisk B.", "answer": "16" },
      "check": {
        "question": "Bagaimana cara memeriksa jawaban 16?",
        "options": ["16 × $2^2$ GB = 16 × 4 = 64 GB = $2^6$ GB", "64 − 4 = 60", "6 − 2 = 4"],
        "correct": 0,
        "optionFeedback": { "1": "Itu selisih, bukan berapa kali lipat.", "2": "4 adalah pangkatnya. Nilainya adalah $2^4$." }
      },
      "hints": {
        "understand": ["Tulis kapasitas masing-masing flashdisk."],
        "model": ["'Berapa kali lipat' memakai operasi pembagian.", "A dibagi B."],
        "solve": ["Basisnya sama: pangkatnya dikurangkan.", "$2^4 = ...$"],
        "interpret": ["Tulis hasilnya ke dalam kalimat."],
        "check": ["Kalikan jawabanmu dengan kapasitas B."]
      }
    },
    {
      "id": "m-kubus",
      "unit": "u3",
      "type": "T4",
      "context": "personal",
      "stage": "terbimbing",
      "title": "Kotak kubus",
      "text": "Sebuah kotak hadiah berbentuk kubus dengan panjang rusuk $2^3$ cm. Volume kubus = rusuk × rusuk × rusuk. Kotak itu dibungkus kertas kado. Berapa volume kotak tersebut?",
      "understand": {
        "known": [
          { "label": "Panjang rusuk", "answer": "2^3", "unit": "cm" }
        ],
        "asked": { "options": ["Volume kotak", "Luas kertas kado", "Panjang rusuk"], "correct": 0 },
        "irrelevant": { "options": ["Kotak itu dibungkus kertas kado", "Panjang rusuk $2^3$ cm", "Volume = rusuk × rusuk × rusuk"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model volume kubus dengan bentuk berpangkat.",
        "lhs": "V",
        "answer": "(2^3)^3",
        "wrong": [ { "answer": "2^3*3", "mis": "M01" }, { "answer": "(2^3)^2", "feedback": "Volume memakai rusuk **tiga kali**, jadi dipangkatkan 3." } ],
        "explanation": "$V = 2^3 × 2^3 × 2^3 = (2^3)^3$."
      },
      "solve": {
        "prompt": "V =",
        "answer": "512",
        "mode": "value",
        "steps": ["$(2^3)^3 = 2^{3 × 3} = 2^9$", "$2^9 = 512$"],
        "wrong": [ { "answer": "64", "mis": "M04" }, { "answer": "2^6", "mis": "M04" }, { "answer": "24", "mis": "M01" } ]
      },
      "interpret": { "before": "Jadi, volume kotak adalah", "after": "cm³.", "answer": "512" },
      "check": {
        "question": "Bagaimana memeriksa jawaban 512 cm³?",
        "options": ["Rusuknya 8 cm, dan 8 × 8 × 8 = 512", "$2^3 × 3 = 24$", "512 adalah bilangan genap"],
        "correct": 0,
        "optionFeedback": { "1": "M01", "2": "MM06" }
      },
      "hints": {
        "understand": ["Ubah $2^3$ menjadi bilangan biasa: 8 cm."],
        "model": ["Rusuk × rusuk × rusuk = rusuk dipangkatkan 3.", "$(2^3)^3$"],
        "solve": ["Pangkat dari pangkat: pangkatnya dikalikan.", "$2^9 = 512$"],
        "interpret": ["Satuan volume adalah cm³."],
        "check": ["Hitung 8 × 8 × 8."]
      }
    },
    {
      "id": "m-koloni",
      "unit": "u6",
      "type": "T6",
      "context": "saintifik",
      "stage": "terbimbing",
      "title": "Kapan bakteri mencapai 320?",
      "text": "Sebuah koloni berisi 5 bakteri. Setiap 30 menit, setiap bakteri membelah menjadi 2. Setelah berapa menit jumlah bakteri menjadi 320?",
      "understand": {
        "known": [
          { "label": "Bakteri mula-mula", "answer": "5", "unit": "bakteri" },
          { "label": "Setiap membelah, dikali", "answer": "2", "unit": "" },
          { "label": "Selang waktu membelah", "answer": "30", "unit": "menit" },
          { "label": "Jumlah akhir", "answer": "320", "unit": "bakteri" }
        ],
        "asked": { "options": ["Waktu (menit) sampai bakteri berjumlah 320", "Banyak bakteri setelah 30 menit", "Banyak bakteri mula-mula"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model banyak bakteri setelah n kali membelah.",
        "lhs": "B",
        "answer": "5*2^n",
        "table": { "head": ["n", "Banyak bakteri"], "rows": [["0", "5"], ["1", "10"], ["2", "20"]], "ask": { "label": "3", "answer": "40" } },
        "wrong": [ { "answer": "5+2*n", "mis": "MM02" }, { "answer": "2^n", "mis": "MM03" }, { "answer": "10^n", "mis": "M03" } ],
        "explanation": "Mula-mula 5, dan setiap kali dikali 2: $B = 5 × 2^n$. Kita mencari n saat $5 × 2^n = 320$."
      },
      "solve": {
        "n": { "prompt": "Dari $5 × 2^n = 320$, n =", "answer": "6", "wrong": [ { "answer": "64", "feedback": "$2^n = 64$, tetapi yang ditanya adalah n. $64 = 2^?$" }, { "answer": "5", "feedback": "$2^5 = 32$, jadi $5 × 32 = 160$. Belum 320." } ] },
        "prompt": "Waktu yang diperlukan (menit) =",
        "answer": "180",
        "modelValue": "320",
        "mode": "value",
        "steps": ["$5 × 2^n = 320$", "$2^n = 320 ÷ 5 = 64$", "$64 = 2^6$, jadi n = 6", "Waktu = 6 × 30 menit = 180 menit"],
        "wrong": [ { "answer": "6", "mis": "MM05" } ]
      },
      "interpret": { "before": "Jadi, jumlah bakteri menjadi 320 setelah", "after": "menit (3 jam).", "answer": "180" },
      "check": {
        "question": "Bagaimana memeriksa jawaban 180 menit?",
        "options": ["5 → 10 → 20 → 40 → 80 → 160 → 320, yaitu 6 kali × 30 menit", "320 ÷ 5 = 64 menit", "320 − 5 = 315 menit"],
        "correct": 0,
        "optionFeedback": { "1": "64 adalah nilai $2^n$, bukan waktu.", "2": "MM02" }
      },
      "hints": {
        "understand": ["Yang ditanya adalah waktu, bukan banyak bakteri."],
        "model": ["Mirip dengan soal bakteri sebelumnya.", "Jumlah awal × 2 sebanyak n kali."],
        "solve": ["Bagi dulu kedua ruas dengan 5.", "Samakan basis: $64 = 2^?$", "Lalu kalikan n dengan 30 menit."],
        "interpret": ["Satuannya menit."],
        "check": ["Gandakan 5 sampai menjadi 320, lalu hitung berapa kali."]
      }
    },
    {
      "id": "m-pin",
      "unit": "u1",
      "type": "T7",
      "context": "personal",
      "stage": "terbimbing",
      "title": "PIN aplikasi",
      "text": "Sebuah aplikasi meminta PIN yang terdiri atas 4 angka. Setiap angka dapat dipilih dari 0 sampai 9, dan angka boleh berulang. Raka memakai aplikasi itu setiap hari. Berapa banyak PIN berbeda yang mungkin dibuat?",
      "understand": {
        "known": [
          { "label": "Banyak angka dalam PIN", "answer": "4", "unit": "angka" },
          { "label": "Banyak pilihan untuk setiap angka (0–9)", "answer": "10", "unit": "pilihan" }
        ],
        "asked": { "options": ["Banyak PIN berbeda yang mungkin", "PIN milik Raka", "Banyak angka dalam PIN"], "correct": 0 },
        "irrelevant": { "options": ["Raka memakai aplikasi itu setiap hari", "Setiap angka dipilih dari 0 sampai 9", "PIN terdiri atas 4 angka"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model banyaknya PIN yang terdiri atas n angka.",
        "lhs": "P",
        "answer": "10^n",
        "wrong": [ { "answer": "10*n", "mis": "MM02" }, { "answer": "9^n", "feedback": "Dari 0 sampai 9 ada **10** pilihan, karena angka 0 ikut dihitung." }, { "answer": "n^10", "feedback": "Banyaknya pilihan (10) dikalikan sebanyak n kali, jadi 10 yang menjadi basis." } ],
        "explanation": "Setiap angka memiliki 10 pilihan. Untuk n angka: $10 × 10 × ... × 10 = 10^n$."
      },
      "solve": {
        "n": { "prompt": "n =", "answer": "4" },
        "prompt": "P =",
        "answer": "10000",
        "mode": "value",
        "steps": ["$P = 10^4$", "$= 10000$"],
        "wrong": [ { "answer": "40", "mis": "M01" }, { "answer": "6561", "feedback": "$9^4 = 6561$. Pilihan untuk setiap angka adalah 10, bukan 9." } ]
      },
      "interpret": { "before": "Jadi, ada", "after": "PIN berbeda yang mungkin.", "answer": "10000" },
      "check": {
        "question": "Mengapa 10000 masuk akal?",
        "options": ["PIN 4 angka berkisar dari 0000 sampai 9999, yaitu 10000 kemungkinan", "Karena 4 × 10 = 40", "Karena PIN harus angka genap"],
        "correct": 0,
        "optionFeedback": { "1": "M01", "2": "MM06" }
      },
      "hints": {
        "understand": ["Dari 0 sampai 9 ada berapa angka? Hitung dengan teliti."],
        "model": ["Setiap posisi angka memiliki 10 pilihan.", "Untuk 2 angka: 10 × 10. Untuk n angka?"],
        "solve": ["$10^4$"],
        "interpret": ["Tulis hasilnya ke dalam kalimat."],
        "check": ["PIN terkecil 0000 dan terbesar 9999."]
      }
    },
    {
      "id": "m-foto",
      "unit": "u8",
      "type": "T8",
      "context": "personal",
      "stage": "terbimbing",
      "title": "Ukuran foto",
      "text": "Raka memiliki 32 foto. Ukuran setiap foto adalah $2^{22}$ byte. Diketahui 1 MB = $2^{20}$ byte. Berapa MB ukuran semua foto Raka?",
      "understand": {
        "known": [
          { "label": "Banyak foto", "answer": "32", "unit": "foto" },
          { "label": "Ukuran tiap foto (byte)", "answer": "2^22", "unit": "byte" },
          { "label": "1 MB sama dengan (byte)", "answer": "2^20", "unit": "byte" }
        ],
        "asked": { "options": ["Ukuran semua foto dalam MB", "Ukuran satu foto dalam byte", "Banyak foto"], "correct": 0 }
      },
      "model": {
        "prompt": "Tulis model ukuran semua foto dalam MB (gunakan bentuk berpangkat).",
        "lhs": "U",
        "answer": "32*2^22/2^20",
        "wrong": [ { "answer": "32*2^22*2^20", "feedback": "Mengubah byte ke MB (satuan lebih besar) berarti **dibagi** dengan $2^{20}$." }, { "answer": "32*2^22", "feedback": "Itu ukuran semua foto dalam byte. Ubah ke MB dengan membagi $2^{20}$." } ],
        "explanation": "Ukuran total dalam byte adalah $32 × 2^{22}$. Ubah ke MB dengan membaginya dengan $2^{20}$."
      },
      "solve": {
        "prompt": "U =",
        "answer": "128",
        "mode": "value",
        "steps": ["$32 = 2^5$", "$2^5 × 2^{22} = 2^{27}$", "$2^{27} ÷ 2^{20} = 2^7$", "$2^7 = 128$"],
        "wrong": [ { "answer": "2^47", "mis": "M11" }, { "answer": "4", "mis": "MM03" } ]
      },
      "interpret": { "before": "Jadi, ukuran semua foto Raka adalah", "after": "MB.", "answer": "128" },
      "check": {
        "question": "Bagaimana memeriksa jawaban 128 MB?",
        "options": ["Satu foto = $2^{22} ÷ 2^{20}$ = 4 MB, dan 32 × 4 = 128 MB", "128 lebih besar dari 32", "22 − 20 = 2"],
        "correct": 0,
        "optionFeedback": { "1": "MM06", "2": "2 adalah pangkatnya. Satu foto berukuran $2^2$ = 4 MB." }
      },
      "hints": {
        "understand": ["Ada tiga informasi penting: banyak foto, ukuran tiap foto, dan konversi satuan."],
        "model": ["Hitung dulu total byte: banyak foto × ukuran tiap foto.", "Ubah ke MB: bagi dengan $2^{20}$."],
        "solve": ["Ubah 32 menjadi $2^5$.", "Gunakan sifat perkalian, lalu sifat pembagian."],
        "interpret": ["Satuannya MB."],
        "check": ["Hitung dulu ukuran satu foto dalam MB."]
      }
    }
  ],
  "stimuli": [
    {
      "id": "lit-1",
      "unit": "u1",
      "context": "sosial budaya",
      "title": "Pesan Berantai",
      "body": "Sebuah pesan hoaks dikirim kepada 2 orang pada hari ke-1. Setiap orang yang menerima pesan meneruskannya kepada 2 orang baru keesokan harinya. Pesan seperti ini dapat menyebar sangat cepat jika tidak dihentikan.",
      "table": { "head": ["Hari ke-", "Penerima baru"], "rows": [["1", "2"], ["2", "4"], ["3", "8"]] },
      "source": "Ilustrasi",
      "questions": [
        { "id": "lit-1-q1", "level": "pemahaman", "type": "input", "prompt": "Tulis banyak penerima pada hari ke-3 sebagai bilangan berpangkat dengan basis 2.", "answer": "2^3", "mode": "exact", "explanation": "8 = 2 × 2 × 2 = $2^3$." },
        { "id": "lit-1-q2", "level": "penerapan", "type": "input", "prompt": "Berapa orang yang menerima pesan pada hari ke-10?", "answer": "1024", "mode": "value", "explanation": "Hari ke-n: $2^n$ orang. Hari ke-10: $2^{10}$ = 1024 orang." },
        { "id": "lit-1-q3", "level": "penalaran", "type": "tfr", "statement": "Penerima pesan pada hari ke-6 adalah dua kali lebih banyak daripada penerima pada hari ke-3.", "truth": false, "reasons": ["Karena $2^6 ÷ 2^3 = 2^3 = 8$, jadi 8 kali lipat", "Karena 6 adalah dua kali 3", "Karena pesan selalu bertambah"], "reason": 0, "explanation": "$2^6 = 64$ dan $2^3 = 8$. 64 adalah 8 kali 8, bukan 2 kali." },
        { "id": "lit-1-q4", "level": "penalaran", "type": "multi", "prompt": "Pilih **semua** pernyataan yang benar.", "options": ["Banyak penerima pada hari ke-n adalah $2^n$", "Pada hari ke-5 ada 10 penerima", "Penerima bertambah berlipat, bukan bertambah tetap", "Pada hari ke-4 ada 8 penerima"], "correct": [0, 2], "explanation": "Hari ke-5: $2^5 = 32$, dan hari ke-4: $2^4 = 16$. Polanya berlipat dua setiap hari." }
      ]
    },
    {
      "id": "lit-2",
      "unit": "u7",
      "context": "personal",
      "title": "Memori HP Raka",
      "body": "HP Raka memiliki penyimpanan 32 GB. Ia ingin menyimpan foto, lagu, dan video. Diketahui 1 GB = $2^{10}$ MB = 1024 MB.",
      "table": { "head": ["Jenis file", "Ukuran rata-rata"], "rows": [["Foto", "4 MB"], ["Lagu", "8 MB"], ["Video 1 menit", "128 MB"]] },
      "source": "Ilustrasi",
      "questions": [
        { "id": "lit-2-q1", "level": "pemahaman", "type": "input", "prompt": "Nyatakan 32 GB dalam MB sebagai bilangan berpangkat dengan basis 2.", "answer": "2^15", "mode": "exact", "explanation": "32 GB = $2^5 × 2^{10}$ MB = $2^{15}$ MB." },
        { "id": "lit-2-q2", "level": "penerapan", "type": "input", "prompt": "Jika memori yang kosong 2 GB, berapa foto yang dapat disimpan?", "answer": "512", "mode": "value", "explanation": "2 GB = 2048 MB, dan 2048 ÷ 4 = 512 foto. Dalam bentuk pangkat: $2^{11} ÷ 2^2 = 2^9$." },
        { "id": "lit-2-q3", "level": "penerapan", "type": "multi", "prompt": "Pilih **semua** pernyataan yang benar.", "options": ["Ukuran 1 video 1 menit sama dengan $2^7$ MB", "Ukuran 1 lagu sama dengan $2^4$ MB", "1 GB cukup untuk menyimpan tepat 8 video 1 menit", "Ukuran 2 foto sama dengan ukuran 1 lagu"], "correct": [0, 2, 3], "explanation": "128 = $2^7$. 8 = $2^3$, bukan $2^4$. 8 × 128 = 1024 MB = 1 GB. 2 × 4 = 8 MB." },
        { "id": "lit-2-q4", "level": "penalaran", "type": "tfr", "statement": "Raka berkata, 'Ukuran 1 video 1 menit sama dengan ukuran 16 lagu.'", "truth": true, "reasons": ["Karena $2^7 ÷ 2^3 = 2^4 = 16$", "Karena video dan lagu sama-sama file", "Karena 128 − 8 = 16"], "reason": 0, "explanation": "128 MB ÷ 8 MB = $2^7 ÷ 2^3 = 2^4 = 16$." }
      ]
    },
    {
      "id": "lit-3",
      "unit": "u2",
      "context": "saintifik",
      "title": "Melipat Kertas",
      "body": "Selembar kertas setebal 0,1 mm dilipat dua berulang kali. Setiap kali dilipat, banyak lapisan menjadi dua kali lipat. Tebal tumpukan sama dengan banyak lapisan × 0,1 mm.",
      "table": { "head": ["Banyak lipatan", "Banyak lapisan"], "rows": [["1", "2"], ["2", "4"], ["3", "8"]] },
      "source": "Ilustrasi",
      "questions": [
        { "id": "lit-3-q1", "level": "pemahaman", "type": "input", "prompt": "Berapa lapisan kertas setelah 5 kali dilipat? Tulis sebagai bilangan berpangkat.", "answer": "2^5", "mode": "exact", "explanation": "Setiap lipatan mengalikan lapisan dengan 2, jadi 5 lipatan menghasilkan $2^5$ lapisan." },
        { "id": "lit-3-q2", "level": "penerapan", "type": "input", "prompt": "Raka melipat kertas 3 kali, lalu melipatnya lagi 4 kali. Tulis banyak lapisannya dalam bentuk $2^n$.", "answer": "2^7", "mode": "exact", "explanation": "$2^3 × 2^4 = 2^{3+4} = 2^7$ lapisan." },
        { "id": "lit-3-q3", "level": "penerapan", "type": "input", "prompt": "Berapa mm tebal tumpukan setelah 6 kali dilipat?", "answer": "6.4", "mode": "value", "explanation": "$2^6$ = 64 lapisan, dan 64 × 0,1 mm = 6,4 mm." },
        { "id": "lit-3-q4", "level": "penalaran", "type": "tfr", "statement": "Banyak lapisan setelah 8 lipatan adalah 2 kali banyak lapisan setelah 4 lipatan.", "truth": false, "reasons": ["Karena $2^8 ÷ 2^4 = 2^4 = 16$, jadi 16 kali lipat", "Karena 8 adalah 2 kali 4", "Karena kertas tidak bisa dilipat 8 kali"], "reason": 0, "explanation": "$2^8 = 256$ dan $2^4 = 16$, sehingga 256 ÷ 16 = 16 kali, bukan 2 kali." }
      ]
    }
  ]
});
