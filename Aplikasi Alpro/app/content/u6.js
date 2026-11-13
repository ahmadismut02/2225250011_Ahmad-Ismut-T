EK.addContent({
  "units": [{
    "id": "u6",
    "order": 6,
    "title": "Menyamakan Basis",
    "subtitle": "Saat basis dan pangkatnya berbeda",
    "difficulty": 3,
    "properties": ["S1", "P3", "P1", "P2", "P4"],
    "objectives": [
      "Mengubah basis ke faktor prima agar basisnya sama.",
      "Menyederhanakan operasi bilangan berpangkat dengan basis dan pangkat berbeda."
    ],
    "segments": [
      {
        "title": "Mengapa perlu menyamakan basis?",
        "body": "$4^3 × 8^2$ tidak bisa langsung digabung karena basisnya berbeda. Namun, 4 dan 8 sama-sama berasal dari 2: $4 = 2^2$ dan $8 = 2^3$.",
        "key": "Jika basisnya bisa disamakan, sifat-sifat sebelumnya bisa dipakai lagi."
      },
      {
        "title": "Faktorisasi prima",
        "body": "Hafalkan atau gunakan tabel berikut.",
        "table": {
          "head": ["Bilangan", "Basis 2", "Bilangan", "Basis 3 atau 5"],
          "rows": [
            ["4", "$2^2$", "9", "$3^2$"],
            ["8", "$2^3$", "27", "$3^3$"],
            ["16", "$2^4$", "81", "$3^4$"],
            ["32", "$2^5$", "25", "$5^2$"],
            ["64", "$2^6$", "125", "$5^3$"]
          ]
        }
      },
      {
        "title": "Lima langkah tetap",
        "body": "**1. Uraikan** setiap basis ke faktor prima. **2. Tulis ulang** dengan basis yang sama. **3. Kalikan pangkat** (pangkat dari pangkat). **4. Gabungkan** dengan sifat perkalian atau pembagian. **5. Periksa** dengan menghitung nilainya.",
        "key": "Selalu gunakan urutan yang sama: Uraikan, Tulis ulang, Kalikan pangkat, Gabungkan, Periksa."
      },
      {
        "title": "Jika basis tidak bisa disamakan",
        "body": "Pada $2^3 × 3^2$, 2 dan 3 adalah bilangan prima yang berbeda. Hitung nilainya masing-masing: 8 × 9 = 72. Jika **pangkatnya sama**, gunakan Sifat 4 secara terbalik: $2^3 × 5^3 = (2 × 5)^3 = 10^3$."
      }
    ],
    "examples": [
      {
        "prompt": "Sederhanakan $4^3 × 8^2$ dalam bentuk $2^n$.",
        "steps": [
          { "text": "Uraikan: $4 = 2^2$ dan $8 = 2^3$.", "prop": "S1" },
          { "text": "Tulis ulang: $(2^2)^3 × (2^3)^2$" },
          { "text": "Kalikan pangkat: $2^6 × 2^6$", "prop": "P3" },
          { "text": "Gabungkan: $2^{6+6} = 2^{12}$", "prop": "P1" },
          { "text": "Periksa: $4^3 × 8^2 = 64 × 64 = 4096$, dan $2^{12} = 4096$." }
        ]
      },
      {
        "prompt": "Sederhanakan $[27^2/9^2]$ dalam bentuk $3^n$.",
        "steps": [
          { "text": "Uraikan: $27 = 3^3$ dan $9 = 3^2$.", "prop": "S1" },
          { "text": "Tulis ulang dan kalikan pangkat: $[(3^3)^2/(3^2)^2] = [3^6/3^4]$", "prop": "P3" },
          { "text": "Gabungkan: $3^{6-4} = 3^2$", "prop": "P2" },
          { "text": "Periksa: $3^2 = 9$." }
        ]
      },
      {
        "prompt": "Sederhanakan $25^3 × 125^{-1}$ dalam bentuk $5^n$.",
        "steps": [
          { "text": "Uraikan: $25 = 5^2$ dan $125 = 5^3$.", "prop": "S1" },
          { "text": "$(5^2)^3 × (5^3)^{-1} = 5^6 × 5^{-3}$", "prop": "P3" },
          { "text": "$5^{6+(-3)} = 5^n$", "prop": "P1", "ask": { "prompt": "Berapakah n?", "answer": "3", "mode": "value" } },
          { "text": "Jadi, hasilnya $5^3 = 125$." }
        ]
      },
      {
        "prompt": "Hitung $2^5 × 5^5$.",
        "steps": [
          { "text": "Basisnya berbeda dan tidak bisa disamakan, tetapi **pangkatnya sama**." },
          { "text": "$2^5 × 5^5 = (2 × 5)^5$", "prop": "P4" },
          { "text": "$= 10^5 = 100000$" }
        ],
        "why": {
          "question": "Kapan kita boleh menggabungkan $a^n × b^n$ menjadi $(ab)^n$?",
          "options": ["Saat pangkatnya sama", "Saat basisnya sama", "Saat basisnya bilangan prima"],
          "correct": 0
        }
      },
      {
        "prompt": "Tentukan n jika $8^n = 2^{12}$.",
        "steps": [
          { "text": "Uraikan: $8 = 2^3$, jadi $(2^3)^n = 2^{12}$.", "prop": "S1" },
          { "text": "$2^{3n} = 2^{12}$", "prop": "P3" },
          { "text": "Basisnya sama, jadi pangkatnya juga sama: 3n = 12, sehingga n = 4." }
        ]
      }
    ],
    "exercises": [
      {
        "id": "u6-x1", "level": "dasar", "type": "input",
        "prompt": "Tulis 32 sebagai bilangan berpangkat dengan **basis 2**.",
        "answer": "2^5", "mode": "exact", "expr": "32", "props": ["S1"],
        "formHint": "Nilainya benar, tetapi basisnya harus 2.",
        "wrong": [ { "answer": "2^16", "mis": "M01" }, { "answer": "2^4", "feedback": "$2^4 = 16$. Kalikan dengan 2 sekali lagi." } ],
        "hints": ["2, 4, 8, 16, ...", "Berapa kali 2 dikalikan agar hasilnya 32?"],
        "explanation": "2 × 2 × 2 × 2 × 2 = 32, jadi $32 = 2^5$."
      },
      {
        "id": "u6-x2", "level": "dasar", "type": "input",
        "prompt": "Tulis $9^2$ dalam bentuk $3^n$.",
        "answer": "3^4", "mode": "exact", "expr": "9^2", "props": ["S1", "P3"],
        "wrong": [ { "answer": "3^2", "feedback": "$9 = 3^2$, jadi $9^2 = (3^2)^2$. Pangkatnya dikalikan." }, { "answer": "3^3", "mis": "M04" } ],
        "hints": ["$9 = 3^2$", "$(3^2)^2$ adalah pangkat dari pangkat."],
        "explanation": "$9^2 = (3^2)^2 = 3^{2 × 2} = 3^4$."
      },
      {
        "id": "u6-x3", "level": "dasar", "type": "mcq",
        "prompt": "Bilangan-bilangan manakah yang **semuanya** dapat ditulis dengan basis 2?",
        "options": ["4, 8, dan 16", "4, 6, dan 8", "3, 9, dan 27", "2, 10, dan 12"], "correct": 0, "props": ["S1"],
        "optionFeedback": { "1": "6 = 2 × 3, bukan pangkat dari 2.", "2": "3, 9, dan 27 adalah pangkat dari 3.", "3": "10 = 2 × 5 dan 12 = 2 × 2 × 3, bukan pangkat dari 2." },
        "hints": ["Pangkat dari 2: 2, 4, 8, 16, 32, ..."],
        "explanation": "$4 = 2^2$, $8 = 2^3$, dan $16 = 2^4$."
      },
      {
        "id": "u6-x4", "level": "menengah", "type": "input",
        "prompt": "Sederhanakan $4^2 × 2^3$ dalam bentuk $2^n$.",
        "answer": "2^7", "mode": "exact", "expr": "4^2*2^3", "props": ["S1", "P3", "P1"],
        "wrong": [ { "answer": "8^5", "mis": "M03" }, { "answer": "2^5", "feedback": "Ubah 4 menjadi $2^2$ dulu: $4^2 = (2^2)^2 = 2^4$." } ],
        "hints": ["Uraikan: $4 = 2^2$.", "$4^2 = (2^2)^2 = 2^4$", "Lalu $2^4 × 2^3$: jumlahkan pangkatnya."],
        "explanation": "$4^2 × 2^3 = (2^2)^2 × 2^3 = 2^4 × 2^3 = 2^7$."
      },
      {
        "id": "u6-x5", "level": "menengah", "type": "input",
        "prompt": "Sederhanakan $[27^2/3^4]$ dalam bentuk $3^n$.",
        "answer": "3^2", "mode": "exact", "expr": "27^2/3^4", "props": ["S1", "P3", "P2"],
        "wrong": [ { "answer": "3^1", "feedback": "$27 = 3^3$, jadi $27^2 = 3^6$. Lalu $3^6 ÷ 3^4$." }, { "answer": "9^-2", "mis": "M03" } ],
        "hints": ["Uraikan: $27 = 3^3$.", "$27^2 = (3^3)^2 = 3^6$", "Lalu $3^6 ÷ 3^4$: kurangkan pangkatnya."],
        "explanation": "$[27^2/3^4] = [(3^3)^2/3^4] = [3^6/3^4] = 3^2$."
      },
      {
        "id": "u6-x6", "level": "menengah", "type": "input",
        "prompt": "Hitung $2^4 × 5^4$.",
        "answer": "10000", "mode": "value", "expr": "2^4*5^4", "props": ["P4"],
        "wrong": [ { "answer": "10^8", "mis": "M08" }, { "answer": "7^4", "mis": "M08" } ],
        "hints": ["Basisnya berbeda, tetapi pangkatnya sama.", "$2^4 × 5^4 = (2 × 5)^4$", "$10^4 = ...$"],
        "explanation": "$2^4 × 5^4 = (2 × 5)^4 = 10^4 = 10000$."
      },
      {
        "id": "u6-x7", "level": "tantangan", "type": "input",
        "prompt": "Sederhanakan $8^3 × 4^{-2}$ dalam bentuk $2^n$.",
        "answer": "2^5", "mode": "exact", "expr": "8^3*4^-2", "props": ["S1", "P3", "P1", "P7"],
        "wrong": [ { "answer": "2^13", "feedback": "$4^{-2} = (2^2)^{-2} = 2^{-4}$. Pangkat negatif ikut dijumlahkan." }, { "answer": "2^1", "mis": "M04" } ],
        "hints": ["Uraikan: $8 = 2^3$ dan $4 = 2^2$.", "$8^3 = 2^9$ dan $4^{-2} = 2^{-4}$", "Jumlahkan pangkatnya: 9 + (−4)."],
        "explanation": "$8^3 × 4^{-2} = (2^3)^3 × (2^2)^{-2} = 2^9 × 2^{-4} = 2^5$."
      },
      {
        "id": "u6-x8", "level": "tantangan", "type": "input",
        "prompt": "Tentukan n jika $9^n = 3^8$.",
        "answer": "4", "mode": "value", "props": ["S1", "P3"],
        "wrong": [ { "answer": "6", "feedback": "$9^n = (3^2)^n = 3^{2n}$. Pangkatnya dikalikan, bukan dijumlahkan." }, { "answer": "8", "mis": "M08" } ],
        "hints": ["Uraikan: $9 = 3^2$.", "$(3^2)^n = 3^{2n}$", "Jadi 2n = 8."],
        "explanation": "$9^n = 3^{2n} = 3^8$, jadi 2n = 8 dan n = 4."
      },
      {
        "id": "u6-x9", "level": "tantangan", "type": "input",
        "prompt": "Tentukan n jika $4^n × 2^3 = 2^{11}$.",
        "answer": "4", "mode": "value", "props": ["S1", "P3", "P1"],
        "wrong": [ { "answer": "8", "feedback": "$4^n = (2^2)^n = 2^{2n}$. Jadi 2n + 3 = 11, bukan n + 3 = 11." } ],
        "hints": ["Uraikan: $4^n = 2^{2n}$.", "$2^{2n} × 2^3 = 2^{2n+3}$", "Jadi 2n + 3 = 11."],
        "explanation": "$4^n × 2^3 = 2^{2n+3} = 2^{11}$, jadi 2n + 3 = 11, 2n = 8, dan n = 4."
      }
    ]
  }]
});
