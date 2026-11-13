EK.addContent({
  "units": [{
    "id": "u7",
    "order": 7,
    "title": "Notasi Ilmiah",
    "subtitle": "Bilangan sangat besar dan sangat kecil",
    "difficulty": 2,
    "properties": ["P1", "P2", "P7"],
    "mission": "lit-2",
    "objectives": [
      "Menulis bilangan sangat besar atau sangat kecil dalam bentuk $a × 10^n$.",
      "Mengalikan dan membagi bilangan dalam notasi ilmiah."
    ],
    "segments": [
      {
        "title": "Pangkat dari 10",
        "body": "Pangkat dari 10 mudah dihitung: pangkatnya menunjukkan banyaknya angka nol, atau banyaknya tempat setelah koma.",
        "table": {
          "head": ["Bentuk", "Nilai"],
          "rows": [["$10^3$", "1000"], ["$10^6$", "1000000"], ["$10^0$", "1"], ["$10^{-1}$", "0,1"], ["$10^{-3}$", "0,001"]]
        }
      },
      {
        "title": "Bentuk baku",
        "body": "Notasi ilmiah adalah bentuk $a × 10^n$, dengan $1 ≤ a < 10$ dan n bilangan bulat. Contohnya, jarak Bumi ke Matahari sekitar 150000000 km, atau $1,5 × 10^8$ km.",
        "key": "Bilangan a harus lebih dari atau sama dengan 1 dan kurang dari 10. Jadi $15 × 10^7$ belum termasuk notasi ilmiah."
      },
      {
        "title": "Bilangan sangat kecil",
        "body": "Ukuran sebuah bakteri sekitar 0,000002 m, atau $2 × 10^{-6}$ m. Geser koma ke kanan sampai berada tepat setelah angka bukan nol pertama. Banyaknya geseran menjadi pangkat negatif.",
        "key": "Bilangan lebih dari 10 → pangkat positif. Bilangan kurang dari 1 → pangkat negatif."
      },
      {
        "title": "Mengalikan notasi ilmiah",
        "body": "$(2 × 10^3) × (4 × 10^5) = (2 × 4) × 10^{3+5} = 8 × 10^8$. Kalikan bilangan di depan, lalu jumlahkan pangkat 10-nya."
      }
    ],
    "examples": [
      {
        "prompt": "Tulis 45000 dalam notasi ilmiah.",
        "steps": [
          { "text": "Letakkan koma setelah angka pertama: 4,5" },
          { "text": "Dari 45000 ke 4,5, koma bergeser 4 tempat ke kiri. Jadi, n = 4." },
          { "text": "$45000 = 4,5 × 10^4$" }
        ]
      },
      {
        "prompt": "Tulis 0,0003 dalam notasi ilmiah.",
        "steps": [
          { "text": "Geser koma ke kanan sampai setelah angka 3: menjadi 3." },
          { "text": "Koma bergeser 4 tempat ke kanan. Bilangannya kurang dari 1, jadi pangkatnya negatif: n = −4." },
          { "text": "$0,0003 = 3 × 10^{-4}$", "prop": "P7" }
        ]
      },
      {
        "prompt": "Hitung $(3 × 10^4) × (2 × 10^{-1})$.",
        "steps": [
          { "text": "Kalikan bilangan di depan: 3 × 2 = 6" },
          { "text": "Jumlahkan pangkat 10: $10^{4+(-1)} = 10^n$", "prop": "P1", "ask": { "prompt": "Berapakah n?", "answer": "3", "mode": "value" } },
          { "text": "Hasilnya $6 × 10^3$." }
        ]
      }
    ],
    "exercises": [
      {
        "id": "u7-x1", "level": "dasar", "type": "input",
        "prompt": "Hitung $10^5$.",
        "answer": "100000", "mode": "value", "expr": "10^5", "props": [],
        "wrong": [ { "answer": "50", "mis": "M01" } ],
        "hints": ["Pangkatnya 5, jadi ada 5 angka nol setelah angka 1."],
        "explanation": "$10^5 = 100000$."
      },
      {
        "id": "u7-x2", "level": "dasar", "type": "input",
        "prompt": "Tulis 3000000 dalam notasi ilmiah. Contoh penulisan: 4 × 10^5",
        "answer": "3*10^6", "mode": "sci", "expr": "3000000", "props": [],
        "wrong": [ { "answer": "3*10^7", "feedback": "Hitung lagi banyak angka nolnya. Ada 6 angka nol." }, { "answer": "3*10^5", "feedback": "Hitung lagi banyak angka nolnya. Ada 6 angka nol." } ],
        "hints": ["Hitung banyak angka nol setelah angka 3."],
        "explanation": "3000000 memiliki 6 angka nol, jadi $3000000 = 3 × 10^6$."
      },
      {
        "id": "u7-x3", "level": "dasar", "type": "input",
        "prompt": "Tulis 0,005 dalam notasi ilmiah.",
        "answer": "5*10^-3", "mode": "sci", "expr": "0.005", "props": ["P7"],
        "wrong": [ { "answer": "5*10^3", "feedback": "Bilangannya kurang dari 1, jadi pangkatnya negatif." }, { "answer": "5*10^-2", "feedback": "Koma digeser 3 tempat ke kanan: 0,005 → 5." } ],
        "hints": ["Bilangan kurang dari 1 berarti pangkatnya negatif.", "Berapa tempat koma digeser ke kanan agar menjadi 5?"],
        "explanation": "Koma digeser 3 tempat ke kanan, jadi $0,005 = 5 × 10^{-3}$."
      },
      {
        "id": "u7-x4", "level": "menengah", "type": "input",
        "prompt": "Tulis 72000 dalam notasi ilmiah.",
        "answer": "7.2*10^4", "mode": "sci", "expr": "72000", "props": [],
        "wrong": [ { "answer": "7.2*10^3", "feedback": "Dari 72000 ke 7,2, koma bergeser 4 tempat." } ],
        "hints": ["Letakkan koma setelah angka pertama: 7,2", "Berapa tempat koma bergeser?", "Tulis $7,2 × 10^n$."],
        "explanation": "$72000 = 7,2 × 10^4$."
      },
      {
        "id": "u7-x5", "level": "menengah", "type": "input",
        "prompt": "Hitung $(2 × 10^3) × (3 × 10^4)$. Tulis dalam notasi ilmiah.",
        "answer": "6*10^7", "mode": "sci", "expr": "(2*10^3)*(3*10^4)", "props": ["P1"],
        "wrong": [ { "answer": "6*10^12", "mis": "M02" }, { "answer": "5*10^7", "feedback": "Bilangan di depan **dikalikan**: 2 × 3." } ],
        "hints": ["Kalikan bilangan di depan: 2 × 3.", "Jumlahkan pangkat 10: 3 + 4.", "Pastikan a berada di antara 1 dan 10."],
        "explanation": "$(2 × 3) × 10^{3+4} = 6 × 10^7$."
      },
      {
        "id": "u7-x6", "level": "menengah", "type": "mcq",
        "prompt": "Manakah yang ditulis dalam notasi ilmiah yang benar?",
        "options": ["$2,5 × 10^6$", "$25 × 10^5$", "$0,25 × 10^7$", "$2,5 × 100^3$"], "correct": 0, "props": [],
        "optionFeedback": { "1": "25 tidak kurang dari 10.", "2": "0,25 kurang dari 1.", "3": "Basisnya harus 10, bukan 100." },
        "hints": ["Syarat: $1 ≤ a < 10$.", "Basisnya harus 10."],
        "explanation": "Hanya $2,5 × 10^6$ yang memenuhi $1 ≤ a < 10$ dengan basis 10."
      },
      {
        "id": "u7-x7", "level": "tantangan", "type": "input",
        "prompt": "Hitung $(8 × 10^9) ÷ (2 × 10^3)$. Tulis dalam notasi ilmiah.",
        "answer": "4*10^6", "mode": "sci", "expr": "(8*10^9)/(2*10^3)", "props": ["P2"],
        "wrong": [ { "answer": "4*10^3", "mis": "M13" }, { "answer": "4*10^12", "mis": "M11" } ],
        "hints": ["Bagi bilangan di depan: 8 ÷ 2.", "Kurangkan pangkat 10: 9 − 3.", "Tulis $a × 10^n$."],
        "explanation": "$(8 ÷ 2) × 10^{9-3} = 4 × 10^6$."
      },
      {
        "id": "u7-x8", "level": "tantangan", "type": "input",
        "prompt": "Hitung $(5 × 10^4) × (4 × 10^{-2})$. Tulis dalam notasi ilmiah.",
        "answer": "2*10^3", "mode": "sci", "expr": "(5*10^4)*(4*10^-2)", "props": ["P1"],
        "wrong": [ { "answer": "20*10^2", "feedback": "Nilainya benar, tetapi 20 belum memenuhi $1 ≤ a < 10$. Ingat, $20 = 2 × 10^1$." }, { "answer": "2*10^2", "feedback": "5 × 4 = 20 = $2 × 10^1$. Jangan lupa menambahkan pangkat 1 itu." } ],
        "hints": ["5 × 4 = 20 dan $10^{4+(-2)} = 10^2$.", "Hasil sementara: $20 × 10^2$.", "Ubah 20 menjadi $2 × 10^1$, lalu gabungkan."],
        "explanation": "$20 × 10^2 = 2 × 10^1 × 10^2 = 2 × 10^3$."
      },
      {
        "id": "u7-x9", "level": "tantangan", "type": "input",
        "prompt": "Massa sebutir debu sekitar 0,00000075 gram. Tulis dalam notasi ilmiah.",
        "answer": "7.5*10^-7", "mode": "sci", "expr": "0.00000075", "props": ["P7"],
        "wrong": [ { "answer": "7.5*10^-6", "feedback": "Hitung lagi geserannya. Koma harus berada setelah angka 7." }, { "answer": "75*10^-8", "feedback": "Nilainya benar, tetapi 75 belum memenuhi $1 ≤ a < 10$." } ],
        "hints": ["Geser koma ke kanan sampai setelah angka 7.", "Hitung banyaknya geseran.", "Bilangannya kurang dari 1, jadi pangkatnya negatif."],
        "explanation": "Koma bergeser 7 tempat ke kanan, jadi $0,00000075 = 7,5 × 10^{-7}$."
      }
    ]
  }]
});
