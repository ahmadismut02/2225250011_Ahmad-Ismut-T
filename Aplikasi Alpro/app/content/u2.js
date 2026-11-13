EK.addContent({
  "units": [{
    "id": "u2",
    "order": 2,
    "title": "Perkalian & Pembagian Basis Sama",
    "subtitle": "Jumlahkan atau kurangkan pangkatnya",
    "difficulty": 1,
    "properties": ["P1", "P2"],
    "mission": "lit-3",
    "objectives": [
      "Menyederhanakan perkalian bilangan berpangkat dengan basis sama.",
      "Menyederhanakan pembagian bilangan berpangkat dengan basis sama."
    ],
    "segments": [
      {
        "title": "Mengalikan basis yang sama",
        "body": "$2^3 × 2^2 = (2 × 2 × 2) × (2 × 2) = 2^5$. Banyaknya faktor 2 adalah 3 + 2 = 5.",
        "key": "Sifat 1: $a^m × a^n = a^{m+n}$. Basis tetap, pangkat dijumlahkan."
      },
      {
        "title": "Membagi basis yang sama",
        "body": "$[2^5/2^2] = [2 × 2 × 2 × 2 × 2/2 × 2] = 2^3$. Dua faktor 2 di atas dan di bawah saling menghabiskan. Sisanya 5 − 2 = 3 faktor.",
        "key": "Sifat 2: $a^m ÷ a^n = a^{m-n}$, dengan a ≠ 0. Basis tetap, pangkat dikurangkan."
      },
      {
        "title": "Kapan sifat ini boleh dipakai?",
        "body": "Sifat ini hanya berlaku untuk **perkalian** atau **pembagian** dengan **basis sama**.",
        "table": {
          "head": ["Bentuk", "Boleh langsung digabung?", "Alasan"],
          "rows": [
            ["$2^3 × 2^4$", "Ya, menjadi $2^7$", "Perkalian, basis sama"],
            ["$2^3 + 2^4$", "Tidak", "Penjumlahan: 8 + 16 = 24"],
            ["$2^3 × 3^4$", "Tidak langsung", "Basis berbeda"]
          ]
        }
      }
    ],
    "examples": [
      {
        "prompt": "Sederhanakan $5^4 × 5^3$.",
        "steps": [
          { "text": "Basisnya sama, yaitu 5. Operasinya perkalian." },
          { "text": "Pangkatnya dijumlahkan: $5^4 × 5^3 = 5^{4+3}$", "prop": "P1" },
          { "text": "$= 5^7$" }
        ]
      },
      {
        "prompt": "Sederhanakan $[3^8/3^5]$, lalu hitung nilainya.",
        "steps": [
          { "text": "Basisnya sama, yaitu 3. Operasinya pembagian." },
          { "text": "Pangkatnya dikurangkan: $[3^8/3^5] = 3^{8-5} = 3^3$", "prop": "P2" },
          { "text": "$3^3 = 27$", "ask": { "prompt": "Berapakah $3^3$?", "answer": "27", "mode": "value" } }
        ]
      },
      {
        "prompt": "Sederhanakan $2^4 × 2^3 ÷ 2^2$.",
        "steps": [
          { "text": "Kerjakan dari kiri: $2^4 × 2^3 = 2^7$", "prop": "P1" },
          { "text": "$2^7 ÷ 2^2 = 2^{7-2}$", "prop": "P2", "ask": { "prompt": "Berapakah pangkatnya sekarang?", "answer": "5", "mode": "value" } },
          { "text": "Jadi, hasilnya $2^5 = 32$." }
        ],
        "why": {
          "question": "Mengapa pada langkah kedua pangkatnya dikurangkan?",
          "options": ["Karena basisnya sama dan operasinya pembagian", "Karena 7 lebih besar dari 2", "Karena hasilnya harus lebih kecil"],
          "correct": 0
        }
      }
    ],
    "exercises": [
      {
        "id": "u2-x1", "level": "dasar", "type": "input",
        "prompt": "Sederhanakan $2^3 × 2^4$. Tulis dalam bentuk $2^n$.",
        "answer": "2^7", "mode": "exact", "expr": "2^3*2^4", "props": ["P1"],
        "wrong": [ { "answer": "2^12", "mis": "M02" }, { "answer": "4^7", "mis": "M03" } ],
        "hints": ["Basisnya sama, operasinya perkalian.", "Jumlahkan pangkatnya: 3 + 4."],
        "explanation": "$2^3 × 2^4 = 2^{3+4} = 2^7$."
      },
      {
        "id": "u2-x2", "level": "dasar", "type": "input",
        "prompt": "Sederhanakan $7^6 ÷ 7^2$. Tulis dalam bentuk $7^n$.",
        "answer": "7^4", "mode": "exact", "expr": "7^6/7^2", "props": ["P2"],
        "wrong": [ { "answer": "7^3", "mis": "M13" }, { "answer": "7^8", "mis": "M11" }, { "answer": "1^4", "mis": "M03" } ],
        "hints": ["Basisnya sama, operasinya pembagian.", "Kurangkan pangkatnya: 6 − 2."],
        "explanation": "$7^6 ÷ 7^2 = 7^{6-2} = 7^4$."
      },
      {
        "id": "u2-x3", "level": "dasar", "type": "choose-property",
        "prompt": "Sifat apa yang dipakai untuk menyederhanakan $3^5 × 3^2$?",
        "options": ["P1", "P2", "P3", "P4"], "correct": "P1", "props": ["P1"],
        "hints": ["Lihat operasinya: perkalian atau pembagian?", "Apakah basisnya sama?"],
        "explanation": "Basisnya sama (3) dan operasinya perkalian, jadi dipakai Sifat 1: pangkat dijumlahkan."
      },
      {
        "id": "u2-x4", "level": "menengah", "type": "input",
        "prompt": "Sederhanakan $a^4 × a^3 × a$. Tulis dalam bentuk $a^n$.",
        "answer": "a^8", "mode": "exact", "expr": "a^4*a^3*a", "props": ["P1"],
        "wrong": [ { "answer": "a^7", "mis": "M14" }, { "answer": "a^12", "mis": "M02" } ],
        "hints": ["Berapa pangkat dari $a$ yang tidak ditulis pangkatnya?", "$a = a^1$", "Jumlahkan semua pangkatnya: 4 + 3 + 1."],
        "explanation": "$a^4 × a^3 × a^1 = a^{4+3+1} = a^8$."
      },
      {
        "id": "u2-x5", "level": "menengah", "type": "input",
        "prompt": "Hitung nilai $[2^{10}/2^7]$.",
        "answer": "8", "mode": "value", "expr": "2^10/2^7", "props": ["P2"],
        "wrong": [ { "answer": "2^17", "mis": "M11" } ],
        "hints": ["Sederhanakan dulu sebelum menghitung.", "Pangkat dikurangkan: 10 − 7.", "Hitung nilai $2^3$."],
        "explanation": "$[2^{10}/2^7] = 2^{10-7} = 2^3 = 8$."
      },
      {
        "id": "u2-x6", "level": "menengah", "type": "mcq",
        "prompt": "Manakah pernyataan yang **benar**?",
        "options": ["$3^2 × 3^4 = 3^6$", "$3^2 + 3^4 = 3^6$", "$3^2 × 3^4 = 9^6$", "$3^2 × 3^4 = 3^8$"], "correct": 0, "props": ["P1"],
        "optionFeedback": { "1": "M09", "2": "M03", "3": "M02" },
        "hints": ["Perhatikan operasinya pada tiap pilihan.", "Pada perkalian dengan basis sama, basis tetap.", "Pangkat dijumlahkan: 2 + 4."],
        "explanation": "$3^2 × 3^4 = 3^{2+4} = 3^6$. Sifat ini tidak berlaku untuk penjumlahan."
      },
      {
        "id": "u2-x7", "level": "tantangan", "type": "input",
        "prompt": "Sederhanakan $[5^3 × 5^6/5^4]$. Tulis dalam bentuk $5^n$.",
        "answer": "5^5", "mode": "exact", "expr": "5^3*5^6/5^4", "props": ["P1", "P2"],
        "wrong": [ { "answer": "5^13", "mis": "M11" }, { "answer": "5^14", "mis": "M02" } ],
        "hints": ["Sederhanakan pembilangnya dulu.", "$5^3 × 5^6 = 5^9$", "Lalu bagi: pangkat 9 dikurangi 4."],
        "explanation": "$5^3 × 5^6 = 5^9$, lalu $5^9 ÷ 5^4 = 5^{9-4} = 5^5$."
      },
      {
        "id": "u2-x8", "level": "tantangan", "type": "input",
        "prompt": "Jika $2^n × 2^3 = 2^{10}$, berapakah n?",
        "answer": "7", "mode": "value", "props": ["P1"],
        "wrong": [ { "answer": "13", "mis": "M15" } ],
        "hints": ["Ruas kiri dapat ditulis $2^{n+3}$.", "Jadi n + 3 = 10.", "Gunakan operasi kebalikan dari penjumlahan."],
        "explanation": "$2^n × 2^3 = 2^{n+3}$. Karena $2^{n+3} = 2^{10}$, maka n + 3 = 10, sehingga n = 7."
      },
      {
        "id": "u2-x9", "level": "tantangan", "type": "mcq",
        "prompt": "Hasil dari $4^3 × 4^2 ÷ 4^4$ adalah ...",
        "options": ["4", "16", "$4^9$", "1"], "correct": 0, "props": ["P1", "P2"],
        "optionFeedback": { "2": "M11", "1": "Periksa lagi pangkatnya: 3 + 2 − 4 = ...", "3": "Hasilnya 1 jika pangkatnya 0. Hitung lagi 3 + 2 − 4." },
        "hints": ["Kerjakan perkalian dulu: $4^3 × 4^2$.", "$4^5 ÷ 4^4$", "Pangkat 5 − 4 = 1."],
        "explanation": "$4^3 × 4^2 = 4^5$, lalu $4^5 ÷ 4^4 = 4^1 = 4$."
      }
    ]
  }]
});
