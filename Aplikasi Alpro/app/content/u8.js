EK.addContent({
  "units": [{
    "id": "u8",
    "order": 8,
    "title": "Pemodelan Matematika",
    "subtitle": "Dari soal cerita menjadi model, lalu kembali ke cerita",
    "difficulty": 3,
    "properties": [],
    "capstone": true,
    "objectives": [
      "Memodelkan berbagai soal cerita menjadi model bilangan berpangkat.",
      "Menyelesaikan model, menafsirkan hasilnya, dan memeriksa apakah jawabannya masuk akal."
    ],
    "segments": [
      {
        "title": "Apa itu pemodelan?",
        "body": "Pemodelan matematika adalah mengubah **situasi nyata** menjadi **model matematika**, menyelesaikannya, lalu mengartikan hasilnya kembali ke situasi nyata.",
        "key": "Soal cerita → model → hasil → arti di dunia nyata."
      },
      {
        "title": "Lima langkah pemodelan",
        "body": "Gunakan lima langkah ini untuk setiap soal cerita.",
        "table": {
          "head": ["Langkah", "Pertanyaan pemandu"],
          "rows": [
            ["① Pahami", "Apa yang diketahui? Apa yang ditanya? Informasi mana yang tidak perlu?"],
            ["② Buat Model", "Apa yang berulang? Dikali berapa setiap kali? Ada berapa kali?"],
            ["③ Selesaikan", "Sifat bilangan berpangkat mana yang dipakai?"],
            ["④ Tafsirkan", "Apa arti angka ini di dalam soal? Apa satuannya?"],
            ["⑤ Periksa", "Apakah jawabannya masuk akal? Bisakah dicek dengan cara lain?"]
          ]
        }
      },
      {
        "title": "Membuat model dengan tabel pola",
        "body": "Jika sesuatu **dikali berulang**, isi tabel untuk beberapa langkah pertama. Contohnya, 3 bakteri yang membelah menjadi 2: setelah 0 kali ada 3, setelah 1 kali ada $3 × 2$, dan setelah 2 kali ada $3 × 2^2$. Jadi, setelah n kali ada $3 × 2^n$.",
        "table": {
          "head": ["Jenis situasi", "Bentuk model"],
          "rows": [
            ["Bertambah berlipat (membelah, menyebar)", "$a × b^n$"],
            ["Berkurang sebagian (memantul, meluruh)", "$a × ([1/b])^n$"],
            ["Satuan sangat besar atau kecil", "$a × 10^n$ atau $2^{10}$"],
            ["Banyaknya kemungkinan", "$k^n$"]
          ]
        },
        "key": "a adalah jumlah awal, b adalah faktor pengali setiap langkah, dan n adalah banyaknya langkah."
      },
      {
        "title": "Jangan lupa memeriksa",
        "body": "Jawaban yang benar secara hitungan belum tentu masuk akal. Contohnya, tidak mungkin ada setengah bakteri, dan bola yang memantul tidak mungkin makin tinggi. Selalu bandingkan jawabanmu dengan keadaan nyata."
      }
    ],
    "examples": [],
    "exercises": []
  }]
});
