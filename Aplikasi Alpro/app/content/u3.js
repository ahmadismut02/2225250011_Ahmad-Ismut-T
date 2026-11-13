EK.addContent({
  "units": [{
    "id": "u3",
    "order": 3,
    "title": "Pangkat dari Pangkat & Perkalian",
    "subtitle": "Kalikan pangkat, pangkatkan tiap faktor",
    "difficulty": 2,
    "properties": ["P3", "P4"],
    "objectives": [
      "Menyederhanakan bilangan berpangkat yang dipangkatkan lagi.",
      "Memangkatkan hasil kali dua bilangan atau lebih."
    ],
    "segments": [
      {
        "title": "Pangkat dari pangkat",
        "body": "$(2^3)^2 = 2^3 × 2^3 = 2^{3+3} = 2^6$. Ada 2 kelompok, dan setiap kelompok berisi 3 faktor. Jadi, banyaknya faktor 3 × 2 = 6.",
        "key": "Sifat 3: $(a^m)^n = a^{m × n}$. Pangkatnya dikalikan."
      },
      {
        "title": "Pangkat dari perkalian",
        "body": "$(2 × 5)^3 = (2 × 5) × (2 × 5) × (2 × 5) = 2^3 × 5^3$.",
        "key": "Sifat 4: $(ab)^n = a^n × b^n$. Setiap faktor di dalam kurung ikut dipangkatkan."
      },
      {
        "title": "Bedakan ketiga bentuk ini",
        "body": "Ketiga bentuk berikut terlihat mirip, tetapi aturannya berbeda.",
        "table": {
          "head": ["Bentuk", "Yang dilakukan", "Contoh"],
          "rows": [
            ["$a^m × a^n$", "Jumlahkan pangkat", "$2^3 × 2^2 = 2^5$"],
            ["$(a^m)^n$", "Kalikan pangkat", "$(2^3)^2 = 2^6$"],
            ["$(ab)^n$", "Pangkatkan tiap faktor", "$(2 × 5)^2 = 2^2 × 5^2$"]
          ]
        }
      }
    ],
    "examples": [
      {
        "prompt": "Sederhanakan $(3^4)^2$.",
        "steps": [
          { "text": "Bentuknya pangkat dari pangkat." },
          { "text": "Pangkatnya dikalikan: $(3^4)^2 = 3^{4 × 2}$", "prop": "P3" },
          { "text": "$= 3^8$" }
        ]
      },
      {
        "prompt": "Sederhanakan $(2a)^3$.",
        "steps": [
          { "text": "Di dalam kurung ada perkalian 2 × a." },
          { "text": "Setiap faktor dipangkatkan: $(2a)^3 = 2^3 × a^3$", "prop": "P4" },
          { "text": "$= 8a^3$" }
        ]
      },
      {
        "prompt": "Sederhanakan $(x^2 y)^3$.",
        "steps": [
          { "text": "Setiap faktor dipangkatkan: $(x^2 y)^3 = (x^2)^3 × y^3$", "prop": "P4" },
          { "text": "$(x^2)^3 = x^{2 × 3}$", "prop": "P3", "ask": { "prompt": "Berapakah pangkat x sekarang?", "answer": "6", "mode": "value" } },
          { "text": "Jadi, hasilnya $x^6 y^3$." }
        ],
        "why": {
          "question": "Mengapa pangkat x menjadi 6, bukan 5?",
          "options": ["Karena pangkat dari pangkat dikalikan: 2 × 3", "Karena 2 + 3 = 5 lalu ditambah 1", "Karena y juga dipangkatkan 3"],
          "correct": 0
        }
      }
    ],
    "exercises": [
      {
        "id": "u3-x1", "level": "dasar", "type": "input",
        "prompt": "Sederhanakan $(5^2)^3$. Tulis dalam bentuk $5^n$.",
        "answer": "5^6", "mode": "exact", "expr": "(5^2)^3", "props": ["P3"],
        "wrong": [ { "answer": "5^5", "mis": "M04" } ],
        "hints": ["Bentuknya pangkat dari pangkat.", "Kalikan pangkatnya: 2 × 3."],
        "explanation": "$(5^2)^3 = 5^{2 × 3} = 5^6$."
      },
      {
        "id": "u3-x2", "level": "dasar", "type": "input",
        "prompt": "Hitung $(2 × 3)^2$.",
        "answer": "36", "mode": "value", "expr": "(2*3)^2", "props": ["P4"],
        "wrong": [ { "answer": "12", "mis": "M16" }, { "answer": "18", "mis": "M16" } ],
        "hints": ["Hitung isi kurung dulu, atau pangkatkan tiap faktornya.", "$(2 × 3)^2 = 6^2$"],
        "explanation": "$(2 × 3)^2 = 2^2 × 3^2 = 4 × 9 = 36$. Bisa juga dihitung $6^2 = 36$."
      },
      {
        "id": "u3-x3", "level": "dasar", "type": "choose-property",
        "prompt": "Sifat apa yang dipakai untuk menyederhanakan $(7^3)^4$?",
        "options": ["P1", "P2", "P3", "P4"], "correct": "P3", "props": ["P3"],
        "hints": ["Ada bilangan berpangkat di dalam kurung yang dipangkatkan lagi."],
        "explanation": "$(7^3)^4$ adalah pangkat dari pangkat, jadi dipakai Sifat 3: pangkat dikalikan."
      },
      {
        "id": "u3-x4", "level": "menengah", "type": "input",
        "prompt": "Sederhanakan $(a^3)^4 × a^2$. Tulis dalam bentuk $a^n$.",
        "answer": "a^14", "mode": "exact", "expr": "(a^3)^4*a^2", "props": ["P3", "P1"],
        "wrong": [ { "answer": "a^9", "mis": "M04" }, { "answer": "a^24", "mis": "M02" } ],
        "hints": ["Kerjakan pangkat dari pangkat dulu.", "$(a^3)^4 = a^{12}$", "Lalu kalikan dengan $a^2$: pangkat dijumlahkan."],
        "explanation": "$(a^3)^4 = a^{12}$, lalu $a^{12} × a^2 = a^{14}$."
      },
      {
        "id": "u3-x5", "level": "menengah", "type": "input",
        "prompt": "Hitung nilai $(2^2)^3$.",
        "answer": "64", "mode": "value", "expr": "(2^2)^3", "props": ["P3"],
        "wrong": [ { "answer": "32", "mis": "M04" } ],
        "hints": ["Pangkat dari pangkat: pangkatnya dikalikan.", "$(2^2)^3 = 2^6$", "Hitung $2^6$."],
        "explanation": "$(2^2)^3 = 2^{2 × 3} = 2^6 = 64$."
      },
      {
        "id": "u3-x6", "level": "menengah", "type": "mcq",
        "prompt": "$(3x)^2$ sama dengan ...",
        "options": ["$9x^2$", "$3x^2$", "$6x^2$", "$9x$"], "correct": 0, "props": ["P4"],
        "optionFeedback": { "1": "M16", "2": "M01", "3": "M16" },
        "hints": ["Ada dua faktor di dalam kurung: 3 dan x.", "Keduanya dipangkatkan 2.", "$3^2 = 9$"],
        "explanation": "$(3x)^2 = 3^2 × x^2 = 9x^2$."
      },
      {
        "id": "u3-x7", "level": "tantangan", "type": "input",
        "prompt": "Sederhanakan $[(2^3)^4/2^5]$. Tulis dalam bentuk $2^n$.",
        "answer": "2^7", "mode": "exact", "expr": "(2^3)^4/2^5", "props": ["P3", "P2"],
        "wrong": [ { "answer": "2^2", "mis": "M04" } ],
        "hints": ["Sederhanakan pembilangnya dulu.", "$(2^3)^4 = 2^{12}$", "Lalu bagi dengan $2^5$: pangkat dikurangkan."],
        "explanation": "$(2^3)^4 = 2^{12}$, lalu $2^{12} ÷ 2^5 = 2^7$."
      },
      {
        "id": "u3-x8", "level": "tantangan", "type": "input",
        "prompt": "Hitung $(2 × 5)^4$.",
        "answer": "10000", "mode": "value", "expr": "(2*5)^4", "props": ["P4"],
        "wrong": [ { "answer": "40", "mis": "M01" }, { "answer": "80", "mis": "M16" } ],
        "hints": ["Hitung isi kurung: 2 × 5 = 10.", "$10^4$ artinya 10 × 10 × 10 × 10.", "Hitung banyak angka nolnya."],
        "explanation": "$(2 × 5)^4 = 10^4 = 10000$."
      },
      {
        "id": "u3-x9", "level": "tantangan", "type": "input",
        "prompt": "Jika $(3^n)^2 = 3^{10}$, berapakah n?",
        "answer": "5", "mode": "value", "props": ["P3"],
        "wrong": [ { "answer": "8", "mis": "M04" } ],
        "hints": ["$(3^n)^2 = 3^{2n}$", "Jadi 2n = 10.", "Gunakan operasi kebalikan dari perkalian."],
        "explanation": "$(3^n)^2 = 3^{2n}$. Karena $3^{2n} = 3^{10}$, maka 2n = 10, sehingga n = 5."
      }
    ]
  }]
});
