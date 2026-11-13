EK.addContent({
  "units": [{
    "id": "u4",
    "order": 4,
    "title": "Pecahan Berpangkat",
    "subtitle": "Pembilang dan penyebut sama-sama dipangkatkan",
    "difficulty": 3,
    "properties": ["P5"],
    "objectives": [
      "Menghitung pecahan yang dipangkatkan.",
      "Menyederhanakan operasi pecahan berpangkat dengan basis sama."
    ],
    "segments": [
      {
        "title": "Pecahan yang dikalikan berulang",
        "body": "Pangkat berarti perkalian berulang, termasuk untuk pecahan: $([2/3])^3 = [2/3] × [2/3] × [2/3]$.",
        "table": {
          "head": ["n", "$([1/2])^n$", "Nilai"],
          "rows": [
            ["1", "$[1/2]$", "$[1/2]$"],
            ["2", "$[1/2] × [1/2]$", "$[1/4]$"],
            ["3", "$[1/2] × [1/2] × [1/2]$", "$[1/8]$"]
          ]
        },
        "key": "Pecahan antara 0 dan 1 menjadi makin kecil jika pangkatnya makin besar."
      },
      {
        "title": "Pembilang dan penyebut",
        "body": "$([2/3])^3 = [2 × 2 × 2/3 × 3 × 3] = [2^3/3^3] = [8/27]$.",
        "key": "Sifat 5: $([a/b])^n = [a^n/b^n]$, dengan b ≠ 0."
      },
      {
        "title": "Kesalahan yang sering terjadi",
        "body": "$([2/3])^2$ **bukan** $[4/3]$ dan **bukan** $[4/6]$. Jawaban yang benar adalah $[4/9]$, karena pembilang **dan** penyebut sama-sama dipangkatkan.",
        "table": {
          "head": ["Jawaban", "Benar?", "Alasan"],
          "rows": [
            ["$[4/3]$", "Tidak", "Hanya pembilang yang dipangkatkan"],
            ["$[4/6]$", "Tidak", "Pembilang dan penyebut dikali 2, bukan dipangkatkan"],
            ["$[4/9]$", "Ya", "$[2^2/3^2] = [4/9]$"]
          ]
        }
      },
      {
        "title": "Pecahan negatif",
        "body": "$(-[1/2])^3 = -[1/8]$, karena pangkatnya ganjil sehingga hasilnya negatif. $(-[1/2])^2 = [1/4]$, karena pangkatnya genap sehingga hasilnya positif.",
        "key": "Pangkat genap menghasilkan bilangan positif. Pangkat ganjil mempertahankan tanda negatif."
      }
    ],
    "examples": [
      {
        "prompt": "Hitung $([3/4])^2$.",
        "steps": [
          { "text": "Pembilang dan penyebut dipangkatkan: $([3/4])^2 = [3^2/4^2]$", "prop": "P5" },
          { "text": "$= [9/16]$" }
        ]
      },
      {
        "prompt": "Hitung $([2/5])^3$.",
        "steps": [
          { "text": "$([2/5])^3 = [2^3/5^3]$", "prop": "P5" },
          { "text": "Pembilang: $2^3 = 8$" },
          { "text": "Penyebut: $5^3 = 125$", "ask": { "prompt": "Berapakah $5^3$?", "answer": "125", "mode": "value" } },
          { "text": "Jadi, $([2/5])^3 = [8/125]$." }
        ]
      },
      {
        "prompt": "Sederhanakan $([2/3])^2 × ([2/3])^3$, lalu hitung nilainya.",
        "steps": [
          { "text": "Basisnya sama, yaitu $[2/3]$. Pangkatnya dijumlahkan: $([2/3])^5$", "prop": "P1" },
          { "text": "$([2/3])^5 = [2^5/3^5]$", "prop": "P5" },
          { "text": "$= [32/243]$" }
        ],
        "why": {
          "question": "Mengapa langkah pertama memakai Sifat 1?",
          "options": ["Karena dua bilangan berpangkat dengan basis sama dikalikan", "Karena ada pecahan", "Karena pangkatnya berbeda"],
          "correct": 0
        }
      },
      {
        "prompt": "Hitung $(-[1/3])^3$.",
        "steps": [
          { "text": "$(-[1/3])^3 = (-[1/3]) × (-[1/3]) × (-[1/3])$" },
          { "text": "Ada 3 faktor negatif (ganjil), jadi hasilnya negatif." },
          { "text": "$= -[1^3/3^3] = -[1/27]$", "prop": "P5" }
        ]
      },
      {
        "prompt": "Sederhanakan $([3/2])^4 ÷ ([3/2])^2$, lalu hitung nilainya.",
        "steps": [
          { "text": "Basisnya sama, pangkatnya dikurangkan: $([3/2])^{4-2} = ([3/2])^2$", "prop": "P2" },
          { "text": "$([3/2])^2 = [3^2/2^2] = [9/4]$", "prop": "P5", "ask": { "prompt": "Berapakah nilainya? (tulis sebagai pecahan, misalnya 9/4)", "answer": "9/4", "mode": "value" } }
        ]
      }
    ],
    "exercises": [
      {
        "id": "u4-x1", "level": "dasar", "type": "input",
        "prompt": "Hitung $([1/2])^3$. Tulis sebagai pecahan, misalnya 1/5.",
        "answer": "1/8", "mode": "value", "expr": "(1/2)^3", "props": ["P5"],
        "wrong": [ { "answer": "1/2", "mis": "M07" }, { "answer": "1/6", "mis": "M01" }, { "answer": "3/6", "mis": "M01" } ],
        "hints": ["Pembilang dan penyebut sama-sama dipangkatkan 3.", "$1^3 = 1$ dan $2^3 = 8$."],
        "explanation": "$([1/2])^3 = [1^3/2^3] = [1/8]$."
      },
      {
        "id": "u4-x2", "level": "dasar", "type": "input",
        "prompt": "Hitung $([2/3])^2$. Tulis sebagai pecahan.",
        "answer": "4/9", "mode": "value", "expr": "(2/3)^2", "props": ["P5"],
        "wrong": [ { "answer": "4/3", "mis": "M07" }, { "answer": "4/6", "mis": "M01" }, { "answer": "2/9", "mis": "M07" } ],
        "hints": ["Pangkatkan pembilang: $2^2$.", "Pangkatkan penyebut: $3^2$."],
        "explanation": "$([2/3])^2 = [2^2/3^2] = [4/9]$."
      },
      {
        "id": "u4-x3", "level": "dasar", "type": "choose-property",
        "prompt": "Sifat apa yang dipakai untuk menghitung $([5/7])^4$?",
        "options": ["P3", "P4", "P5", "P7"], "correct": "P5", "props": ["P5"],
        "hints": ["Apa yang ada di dalam kurung?"],
        "explanation": "Di dalam kurung ada pecahan yang dipangkatkan, jadi dipakai Sifat 5."
      },
      {
        "id": "u4-x4", "level": "dasar", "type": "mcq",
        "prompt": "$([3/5])^2 = ...$",
        "options": ["$[9/25]$", "$[9/5]$", "$[6/10]$", "$[3/25]$"], "correct": 0, "props": ["P5"],
        "optionFeedback": { "1": "M07", "2": "M01", "3": "M07" },
        "hints": ["Pembilang dan penyebut sama-sama dipangkatkan 2."],
        "explanation": "$([3/5])^2 = [3^2/5^2] = [9/25]$."
      },
      {
        "id": "u4-x5", "level": "menengah", "type": "input",
        "prompt": "Hitung $([2/3])^4$. Tulis sebagai pecahan.",
        "answer": "16/81", "mode": "value", "expr": "(2/3)^4", "props": ["P5"],
        "wrong": [ { "answer": "16/3", "mis": "M07" }, { "answer": "8/12", "mis": "M01" } ],
        "hints": ["Pangkatkan pembilang dan penyebut.", "$2^4 = 16$", "$3^4 = 3 × 3 × 3 × 3 = ...$"],
        "explanation": "$([2/3])^4 = [2^4/3^4] = [16/81]$."
      },
      {
        "id": "u4-x6", "level": "menengah", "type": "input",
        "prompt": "Hitung $(-[1/2])^4$. Tulis sebagai pecahan.",
        "answer": "1/16", "mode": "value", "expr": "(-1/2)^4", "props": ["P5"],
        "wrong": [ { "answer": "-1/16", "mis": "M18" }, { "answer": "-1/8", "mis": "M01" } ],
        "hints": ["Pangkatnya genap. Apa akibatnya pada tanda negatif?", "Pangkat genap menghasilkan bilangan positif.", "$([1/2])^4 = [1/16]$"],
        "explanation": "Ada 4 faktor negatif (genap), jadi hasilnya positif: $(-[1/2])^4 = [1/16]$."
      },
      {
        "id": "u4-x7", "level": "menengah", "type": "input",
        "prompt": "Hitung $([3/4])^2 × [3/4]$. Tulis sebagai pecahan.",
        "answer": "27/64", "mode": "value", "expr": "(3/4)^2*(3/4)", "props": ["P1", "P5"],
        "wrong": [ { "answer": "27/4", "mis": "M07" }, { "answer": "9/16", "mis": "M14" } ],
        "hints": ["$[3/4] = ([3/4])^1$", "Basisnya sama, jadi pangkatnya dijumlahkan: 2 + 1.", "Hitung $([3/4])^3$."],
        "explanation": "$([3/4])^2 × ([3/4])^1 = ([3/4])^3 = [27/64]$."
      },
      {
        "id": "u4-x8", "level": "menengah", "type": "mcq",
        "prompt": "Manakah yang nilainya **paling kecil**?",
        "options": ["$([1/2])^4$", "$([1/2])^2$", "$([1/2])^1$", "$([1/2])^3$"], "correct": 0, "props": ["P5"],
        "optionFeedback": { "1": "M19", "2": "M19", "3": "M19" },
        "hints": ["Hitung nilai masing-masing.", "$([1/2])^2 = [1/4]$ dan $([1/2])^3 = [1/8]$", "Makin besar penyebutnya, makin kecil nilai pecahannya."],
        "explanation": "$([1/2])^4 = [1/16]$ adalah yang paling kecil, karena pecahan antara 0 dan 1 makin kecil jika pangkatnya makin besar."
      },
      {
        "id": "u4-x9", "level": "tantangan", "type": "input",
        "prompt": "Sederhanakan $([2/5])^6 ÷ ([2/5])^4$, lalu hitung nilainya.",
        "answer": "4/25", "mode": "value", "expr": "(2/5)^6/(2/5)^4", "props": ["P2", "P5"],
        "wrong": [ { "answer": "4/5", "mis": "M07" }, { "answer": "4/10", "mis": "M01" } ],
        "hints": ["Basisnya sama, jadi pangkatnya dikurangkan.", "$([2/5])^{6-4} = ([2/5])^2$", "Pangkatkan pembilang dan penyebut."],
        "explanation": "$([2/5])^6 ÷ ([2/5])^4 = ([2/5])^2 = [4/25]$."
      },
      {
        "id": "u4-x10", "level": "tantangan", "type": "input",
        "prompt": "Hitung $(([1/2])^3)^2$. Tulis sebagai pecahan.",
        "answer": "1/64", "mode": "value", "expr": "((1/2)^3)^2", "props": ["P3", "P5"],
        "wrong": [ { "answer": "1/32", "mis": "M04" } ],
        "hints": ["Ini pangkat dari pangkat.", "$(([1/2])^3)^2 = ([1/2])^6$", "$2^6 = 64$"],
        "explanation": "$(([1/2])^3)^2 = ([1/2])^{3 × 2} = ([1/2])^6 = [1/64]$."
      },
      {
        "id": "u4-x11", "level": "tantangan", "type": "input",
        "prompt": "$[16/81]$ dapat ditulis sebagai $([2/3])^n$. Berapakah n?",
        "answer": "4", "mode": "value", "props": ["P5"],
        "wrong": [ { "answer": "2", "feedback": "$([4/9])^2$ memang sama dengan $[16/81]$, tetapi basisnya harus $[2/3]$. Berapa kali 2 dikalikan agar hasilnya 16?" } ],
        "hints": ["$[16/81] = [2^?/3^?]$", "2 × 2 × 2 × 2 = 16", "Periksa juga: 3 × 3 × 3 × 3 = 81."],
        "explanation": "$16 = 2^4$ dan $81 = 3^4$, jadi $[16/81] = ([2/3])^4$ dan n = 4."
      },
      {
        "id": "u4-x12", "level": "tantangan", "type": "mcq",
        "prompt": "$(-[2/3])^3 = ...$",
        "options": ["$-[8/27]$", "$[8/27]$", "$-[6/9]$", "$-[8/3]$"], "correct": 0, "props": ["P5"],
        "optionFeedback": { "1": "M18", "2": "M01", "3": "M07" },
        "hints": ["Pangkatnya ganjil. Bagaimana tandanya?", "Pangkatkan pembilang dan penyebut.", "$2^3 = 8$ dan $3^3 = 27$"],
        "explanation": "Pangkat ganjil mempertahankan tanda negatif: $(-[2/3])^3 = -[8/27]$."
      }
    ]
  }]
});
