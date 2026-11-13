EK.addContent({
  "units": [{
    "id": "u1",
    "order": 1,
    "title": "Apa itu Bilangan Berpangkat?",
    "subtitle": "Perkalian berulang, basis, dan pangkat",
    "difficulty": 1,
    "properties": [],
    "mission": "lit-1",
    "objectives": [
      "Menulis perkalian berulang sebagai bilangan berpangkat, dan sebaliknya.",
      "Menentukan basis dan pangkat, lalu menghitung nilainya."
    ],
    "segments": [
      {
        "title": "Perkalian berulang",
        "body": "Perkalian bilangan yang sama secara berulang dapat ditulis lebih singkat. Contohnya, $2 × 2 × 2 × 2 × 2$ ditulis $2^5$.",
        "table": {
          "head": ["Bentuk panjang", "Bentuk pangkat", "Nilai"],
          "rows": [
            ["$3 × 3$", "$3^2$", "9"],
            ["$2 × 2 × 2$", "$2^3$", "8"],
            ["$5 × 5 × 5 × 5$", "$5^4$", "625"],
            ["$10 × 10 × 10$", "$10^3$", "1000"]
          ]
        }
      },
      {
        "title": "Basis dan pangkat",
        "body": "Pada $a^n$, **a** disebut **basis**, yaitu bilangan yang dikalikan. **n** disebut **pangkat** (atau eksponen), yaitu banyaknya faktor.",
        "key": "$2^5$ artinya 2 dikalikan sebanyak 5 kali, bukan 2 × 5."
      },
      {
        "title": "Hati-hati dengan tanda negatif",
        "body": "$(-3)^2 = (-3) × (-3) = 9$. Namun, $-3^2 = -(3 × 3) = -9$. Tanda kurung menentukan bagian yang dipangkatkan.",
        "key": "Jika tanda negatif ada di dalam kurung, tanda itu ikut dipangkatkan."
      }
    ],
    "examples": [
      {
        "prompt": "Tulis $7 × 7 × 7 × 7$ sebagai bilangan berpangkat, lalu hitung nilainya.",
        "steps": [
          { "text": "Hitung banyak faktor 7. Ada 4 faktor." },
          { "text": "Jadi, $7 × 7 × 7 × 7 = 7^4$. Basisnya 7 dan pangkatnya 4." },
          { "text": "Nilainya: $7 × 7 = 49$, lalu $49 × 49 = 2401$.", "ask": { "prompt": "Berapakah $7^4$?", "answer": "2401", "mode": "value" } }
        ]
      },
      {
        "prompt": "Hitung $(-2)^3$.",
        "steps": [
          { "text": "$(-2)^3 = (-2) × (-2) × (-2)$" },
          { "text": "$(-2) × (-2) = 4$" },
          { "text": "$4 × (-2) = -8$. Pangkat ganjil membuat hasilnya negatif." }
        ],
        "why": {
          "question": "Mengapa hasil $(-2)^3$ negatif?",
          "options": ["Karena ada 3 faktor negatif (banyaknya ganjil)", "Karena 3 adalah bilangan prima", "Karena 2 lebih kecil dari 3"],
          "correct": 0
        }
      }
    ],
    "exercises": [
      {
        "id": "u1-x1", "level": "dasar", "type": "input",
        "prompt": "Tulis $3 × 3 × 3 × 3 × 3$ dalam bentuk bilangan berpangkat.",
        "answer": "3^5", "mode": "exact", "expr": "3*3*3*3*3", "props": [],
        "wrong": [ { "answer": "5^3", "mis": "M12" }, { "answer": "15", "mis": "M01" } ],
        "hints": ["Ada berapa faktor 3?", "Basisnya 3. Pangkatnya adalah banyaknya faktor."],
        "explanation": "Ada 5 faktor 3, jadi $3 × 3 × 3 × 3 × 3 = 3^5$."
      },
      {
        "id": "u1-x2", "level": "dasar", "type": "input",
        "prompt": "Hitung nilai $2^4$.",
        "answer": "16", "mode": "value", "expr": "2^4", "props": [],
        "wrong": [ { "answer": "8", "mis": "M01" }, { "answer": "6", "mis": "M01" } ],
        "hints": ["$2^4 = 2 × 2 × 2 × 2$"],
        "explanation": "$2^4 = 2 × 2 × 2 × 2 = 16$."
      },
      {
        "id": "u1-x3", "level": "dasar", "type": "mcq",
        "prompt": "Pada bilangan $6^3$, manakah yang merupakan **basis**?",
        "options": ["6", "3", "18", "216"], "correct": 0, "props": [],
        "optionFeedback": { "1": "M12", "2": "M01", "3": "216 adalah nilai dari $6^3$, bukan basisnya." },
        "hints": ["Basis adalah bilangan yang dikalikan berulang."],
        "explanation": "$6^3 = 6 × 6 × 6$. Bilangan yang dikalikan adalah 6, jadi basisnya 6."
      },
      {
        "id": "u1-x4", "level": "menengah", "type": "input",
        "prompt": "Hitung nilai $(-2)^4$.",
        "answer": "16", "mode": "value", "expr": "(-2)^4", "props": [],
        "wrong": [ { "answer": "-16", "mis": "M10" }, { "answer": "-8", "mis": "M01" } ],
        "hints": ["Tanda negatif berada di dalam kurung. Apakah ikut dipangkatkan?", "$(-2)^4 = (-2) × (-2) × (-2) × (-2)$", "Ada 4 faktor negatif (genap), jadi hasilnya positif."],
        "explanation": "$(-2)^4 = (-2) × (-2) × (-2) × (-2) = 16$. Banyaknya faktor negatif genap, jadi hasilnya positif."
      },
      {
        "id": "u1-x5", "level": "menengah", "type": "input",
        "prompt": "Hitung nilai $-2^4$.",
        "answer": "-16", "mode": "value", "expr": "-2^4", "props": [],
        "wrong": [ { "answer": "16", "mis": "M10" } ],
        "hints": ["Tidak ada tanda kurung. Bagian mana yang dipangkatkan?", "Hanya 2 yang dipangkatkan: $-2^4 = -(2^4)$", "Hitung $2^4$ dulu, lalu beri tanda negatif."],
        "explanation": "Tanpa kurung, hanya 2 yang dipangkatkan: $-2^4 = -(2 × 2 × 2 × 2) = -16$."
      },
      {
        "id": "u1-x6", "level": "menengah", "type": "mcq",
        "prompt": "Bentuk pangkat dari $[1/2] × [1/2] × [1/2]$ adalah ...",
        "options": ["$([1/2])^3$", "$[1/2] × 3$", "$([1/3])^2$", "$([3/2])^3$"], "correct": 0, "props": [],
        "optionFeedback": { "1": "M01", "2": "M12", "3": "Basisnya adalah pecahan yang dikalikan berulang, yaitu $[1/2]$." },
        "hints": ["Pecahan apa yang dikalikan berulang?", "Ada berapa faktor?", "Tulis pecahan itu di dalam kurung, lalu beri pangkat."],
        "explanation": "Pecahan $[1/2]$ dikalikan sebanyak 3 kali, jadi bentuknya $([1/2])^3$."
      },
      {
        "id": "u1-x7", "level": "tantangan", "type": "input",
        "prompt": "Hitung $2^3 + 3^2$.",
        "answer": "17", "mode": "value", "expr": "2^3+3^2", "props": [],
        "wrong": [ { "answer": "12", "mis": "M01" }, { "answer": "5^5", "mis": "M08" } ],
        "hints": ["Hitung nilai tiap bilangan berpangkat dulu.", "$2^3 = 8$ dan $3^2 = ...$", "Jumlahkan kedua hasilnya."],
        "explanation": "$2^3 = 8$ dan $3^2 = 9$, jadi $8 + 9 = 17$."
      },
      {
        "id": "u1-x8", "level": "tantangan", "type": "input",
        "prompt": "Bilangan 64 dapat ditulis sebagai $2^n$. Berapakah n?",
        "answer": "6", "mode": "value", "props": [],
        "wrong": [ { "answer": "32", "mis": "M01" }, { "answer": "8", "feedback": "$8 × 8 = 64$, jadi 64 = $8^2$. Namun, basis yang diminta adalah 2. Berapa kali 2 dikalikan agar hasilnya 64?" } ],
        "hints": ["Kalikan 2 berulang sampai hasilnya 64.", "2, 4, 8, 16, ...", "Hitung berapa kali kamu mengalikan 2."],
        "explanation": "2 × 2 × 2 × 2 × 2 × 2 = 64. Ada 6 faktor, jadi n = 6."
      },
      {
        "id": "u1-x9", "level": "tantangan", "type": "input",
        "prompt": "Tulis 625 sebagai bilangan berpangkat dengan **basis 5**.",
        "answer": "5^4", "mode": "exact", "expr": "625", "props": [],
        "formHint": "Nilainya benar, tetapi basisnya harus 5.",
        "wrong": [ { "answer": "5^3", "feedback": "$5^3 = 125$. Kalikan dengan 5 sekali lagi." } ],
        "hints": ["5, 25, 125, ...", "Berapa kali 5 dikalikan agar hasilnya 625?", "Tulis dalam bentuk $5^n$."],
        "explanation": "5 × 5 × 5 × 5 = 625, jadi $625 = 5^4$."
      }
    ]
  }]
});
