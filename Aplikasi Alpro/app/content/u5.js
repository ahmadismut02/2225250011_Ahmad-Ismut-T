EK.addContent({
  "units": [{
    "id": "u5",
    "order": 5,
    "title": "Pangkat Nol & Pangkat Negatif",
    "subtitle": "Temukan maknanya lewat pola",
    "difficulty": 2,
    "properties": ["P6", "P7"],
    "objectives": [
      "Menjelaskan mengapa $a^0 = 1$ dengan melihat pola.",
      "Mengubah pangkat negatif menjadi pecahan dengan pangkat positif."
    ],
    "segments": [
      {
        "title": "Pola menuju pangkat nol",
        "body": "Perhatikan polanya. Setiap pangkat turun satu, nilainya dibagi 2.",
        "table": {
          "head": ["Bentuk", "Nilai"],
          "rows": [["$2^3$", "8"], ["$2^2$", "4"], ["$2^1$", "2"], ["$2^0$", "1"]]
        },
        "key": "Sifat 6: $a^0 = 1$, dengan a ≠ 0."
      },
      {
        "title": "Dari pembagian",
        "body": "$[2^3/2^3] = 2^{3-3} = 2^0$. Padahal, $[8/8] = 1$. Jadi, $2^0 = 1$."
      },
      {
        "title": "Pangkat negatif",
        "body": "Lanjutkan pola tadi. Setiap pangkat turun satu, nilainya tetap dibagi 2.",
        "table": {
          "head": ["Bentuk", "Nilai"],
          "rows": [["$2^0$", "1"], ["$2^{-1}$", "$[1/2]$"], ["$2^{-2}$", "$[1/4]$"], ["$2^{-3}$", "$[1/8]$"]]
        },
        "key": "Sifat 7: $a^{-n} = [1/a^n]$. Pangkat negatif berarti kebalikan, bukan bilangan negatif."
      },
      {
        "title": "Pecahan dengan pangkat negatif",
        "body": "$([2/3])^{-2} = ([3/2])^2 = [9/4]$. Balik pecahannya, lalu pangkatnya menjadi positif."
      }
    ],
    "examples": [
      {
        "prompt": "Hitung $2^{-3}$.",
        "steps": [
          { "text": "Pangkat negatif berarti kebalikan: $2^{-3} = [1/2^3]$", "prop": "P7" },
          { "text": "$= [1/8]$" }
        ]
      },
      {
        "prompt": "Sederhanakan $[3^2/3^5]$. Tulis dengan pangkat positif.",
        "steps": [
          { "text": "$[3^2/3^5] = 3^{2-5} = 3^{-3}$", "prop": "P2" },
          { "text": "$3^{-3} = [1/3^3]$", "prop": "P7" },
          { "text": "$= [1/27]$", "ask": { "prompt": "Berapakah nilainya? (tulis sebagai pecahan)", "answer": "1/27", "mode": "value" } }
        ],
        "why": {
          "question": "Mengapa hasilnya pecahan, bukan bilangan negatif?",
          "options": ["Karena pangkat negatif berarti kebalikan", "Karena 2 lebih kecil dari 5", "Karena 3 adalah bilangan ganjil"],
          "correct": 0
        }
      },
      {
        "prompt": "Hitung $([1/2])^{-3}$.",
        "steps": [
          { "text": "Balik pecahannya, lalu pangkatnya menjadi positif: $([1/2])^{-3} = ([2/1])^3 = 2^3$", "prop": "P7" },
          { "text": "$= 8$" }
        ]
      }
    ],
    "exercises": [
      {
        "id": "u5-x1", "level": "dasar", "type": "input",
        "prompt": "Hitung $7^0$.",
        "answer": "1", "mode": "value", "expr": "7^0", "props": ["P6"],
        "wrong": [ { "answer": "0", "mis": "M06" }, { "answer": "7", "mis": "M06" } ],
        "hints": ["Ingat pola: $7^2 = 49$, $7^1 = 7$, $7^0 = ...$"],
        "explanation": "Setiap bilangan (selain 0) yang dipangkatkan 0 hasilnya 1, jadi $7^0 = 1$."
      },
      {
        "id": "u5-x2", "level": "dasar", "type": "input",
        "prompt": "Hitung $2^{-2}$. Tulis sebagai pecahan.",
        "answer": "1/4", "mode": "value", "expr": "2^-2", "props": ["P7"],
        "wrong": [ { "answer": "-4", "mis": "M05" }, { "answer": "-1/4", "mis": "M05" } ],
        "hints": ["Pangkat negatif berarti kebalikan: $2^{-2} = [1/2^2]$."],
        "explanation": "$2^{-2} = [1/2^2] = [1/4]$."
      },
      {
        "id": "u5-x3", "level": "dasar", "type": "choose-property",
        "prompt": "Sifat apa yang dipakai untuk menghitung $4^{-3}$?",
        "options": ["P5", "P6", "P7", "P2"], "correct": "P7", "props": ["P7"],
        "hints": ["Perhatikan pangkatnya."],
        "explanation": "Pangkatnya negatif, jadi dipakai Sifat 7: $4^{-3} = [1/4^3]$."
      },
      {
        "id": "u5-x4", "level": "menengah", "type": "input",
        "prompt": "Hitung $10^{-3}$. Boleh ditulis sebagai pecahan atau desimal.",
        "answer": "1/1000", "mode": "value", "expr": "10^-3", "props": ["P7"],
        "wrong": [ { "answer": "-1000", "mis": "M05" }, { "answer": "-30", "mis": "M01" } ],
        "hints": ["$10^{-3} = [1/10^3]$", "$10^3 = 1000$", "Hasilnya juga bisa ditulis 0,001."],
        "explanation": "$10^{-3} = [1/10^3] = [1/1000] = 0,001$."
      },
      {
        "id": "u5-x5", "level": "menengah", "type": "input",
        "prompt": "Sederhanakan $[2^3/2^7]$, lalu hitung nilainya.",
        "answer": "1/16", "mode": "value", "expr": "2^3/2^7", "props": ["P2", "P7"],
        "wrong": [ { "answer": "16", "feedback": "Hasilnya $2^{3-7} = 2^{-4}$, yaitu **kebalikan** dari $2^4$." }, { "answer": "-16", "mis": "M05" } ],
        "hints": ["Pangkat dikurangkan: 3 − 7.", "$2^{-4} = [1/2^4]$", "$2^4 = 16$"],
        "explanation": "$[2^3/2^7] = 2^{3-7} = 2^{-4} = [1/16]$."
      },
      {
        "id": "u5-x6", "level": "menengah", "type": "mcq",
        "prompt": "Manakah yang nilainya sama dengan $[1/9]$?",
        "options": ["$3^{-2}$", "$-3^2$", "$(-3)^2$", "$9^1$"], "correct": 0, "props": ["P7"],
        "optionFeedback": { "1": "M05", "2": "M05", "3": "$9^1 = 9$, bukan $[1/9]$. Kebalikan diperoleh dari pangkat negatif." },
        "hints": ["$[1/9] = [1/3^2]$", "Bentuk $[1/a^n]$ sama dengan $a^{-n}$."],
        "explanation": "$3^{-2} = [1/3^2] = [1/9]$."
      },
      {
        "id": "u5-x7", "level": "tantangan", "type": "input",
        "prompt": "Hitung $([2/3])^{-2}$. Tulis sebagai pecahan.",
        "answer": "9/4", "mode": "value", "expr": "(2/3)^-2", "props": ["P7", "P5"],
        "wrong": [ { "answer": "4/9", "feedback": "Pangkat negatif **membalik** pecahannya. $([2/3])^{-2} = ([3/2])^2$." }, { "answer": "-4/9", "mis": "M05" } ],
        "hints": ["Balik pecahannya: $[2/3]$ menjadi $[3/2]$.", "Pangkatnya menjadi positif: $([3/2])^2$.", "Pangkatkan pembilang dan penyebut."],
        "explanation": "$([2/3])^{-2} = ([3/2])^2 = [9/4]$."
      },
      {
        "id": "u5-x8", "level": "tantangan", "type": "input",
        "prompt": "Hitung $5^0 + 5^{-1}$. Tulis sebagai pecahan atau desimal.",
        "answer": "6/5", "mode": "value", "expr": "5^0+5^-1", "props": ["P6", "P7"],
        "wrong": [ { "answer": "1/5", "mis": "M06" }, { "answer": "-4", "mis": "M05" }, { "answer": "-5", "mis": "M05" } ],
        "hints": ["$5^0 = 1$", "$5^{-1} = [1/5]$", "$1 + [1/5] = [5/5] + [1/5]$"],
        "explanation": "$5^0 + 5^{-1} = 1 + [1/5] = [6/5]$ (atau 1,2)."
      },
      {
        "id": "u5-x9", "level": "tantangan", "type": "input",
        "prompt": "Jika $2^n = [1/32]$, berapakah n?",
        "answer": "-5", "mode": "value", "props": ["P7"],
        "wrong": [ { "answer": "5", "feedback": "$2^5 = 32$, bukan $[1/32]$. Kebalikannya memakai pangkat negatif." } ],
        "hints": ["$32 = 2^5$", "$[1/32] = [1/2^5]$", "Bentuk $[1/a^n]$ sama dengan $a^{-n}$."],
        "explanation": "$[1/32] = [1/2^5] = 2^{-5}$, jadi n = −5."
      }
    ]
  }]
});
