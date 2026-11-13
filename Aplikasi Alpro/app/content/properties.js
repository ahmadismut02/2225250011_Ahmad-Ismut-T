EK.addContent({
  "properties": [
    {
      "id": "P1",
      "name": "Perkalian basis sama",
      "formula": "$a^m × a^n = a^{m+n}$",
      "when": "Dua bilangan berpangkat dengan **basis sama** dikalikan.",
      "example": "$2^3 × 2^4 = 2^{3+4} = 2^7$",
      "mistake": "M02"
    },
    {
      "id": "P2",
      "name": "Pembagian basis sama",
      "formula": "$a^m ÷ a^n = a^{m-n}$, dengan a ≠ 0",
      "when": "Dua bilangan berpangkat dengan **basis sama** dibagi.",
      "example": "$5^6 ÷ 5^2 = 5^{6-2} = 5^4$",
      "mistake": "M11"
    },
    {
      "id": "P3",
      "name": "Pangkat dari pangkat",
      "formula": "$(a^m)^n = a^{m × n}$",
      "when": "Bilangan berpangkat di dalam kurung **dipangkatkan lagi**.",
      "example": "$(3^2)^4 = 3^{2 × 4} = 3^8$",
      "mistake": "M04"
    },
    {
      "id": "P4",
      "name": "Pangkat dari perkalian",
      "formula": "$(ab)^n = a^n × b^n$",
      "when": "Hasil kali di dalam kurung dipangkatkan. Juga dipakai terbalik jika **pangkatnya sama**: $2^5 × 5^5 = 10^5$.",
      "example": "$(2 × 5)^3 = 2^3 × 5^3$",
      "mistake": "M16"
    },
    {
      "id": "P5",
      "name": "Pangkat dari pecahan",
      "formula": "$([a/b])^n = [a^n/b^n]$, dengan b ≠ 0",
      "when": "Pecahan di dalam kurung dipangkatkan.",
      "example": "$([2/3])^2 = [2^2/3^2] = [4/9]$",
      "mistake": "M07"
    },
    {
      "id": "P6",
      "name": "Pangkat nol",
      "formula": "$a^0 = 1$, dengan a ≠ 0",
      "when": "Pangkatnya **0**.",
      "example": "$7^0 = 1$",
      "mistake": "M06"
    },
    {
      "id": "P7",
      "name": "Pangkat negatif",
      "formula": "$a^{-n} = [1/a^n]$, dengan a ≠ 0",
      "when": "Pangkatnya **negatif**. Artinya kebalikan, bukan bilangan negatif.",
      "example": "$2^{-3} = [1/2^3] = [1/8]$",
      "mistake": "M05"
    },
    {
      "id": "S1",
      "name": "Strategi: samakan basis",
      "formula": "$4 = 2^2$, $8 = 2^3$, $9 = 3^2$, $27 = 3^3$",
      "when": "Basisnya **berbeda**, tetapi berasal dari faktor prima yang sama.",
      "example": "$4^3 × 8^2 = (2^2)^3 × (2^3)^2 = 2^6 × 2^6 = 2^{12}$",
      "mistake": "M08"
    }
  ],
  "misconceptions": [
    { "id": "M01", "label": "Mengalikan basis dengan pangkat", "feedback": "Pangkat bukan perkalian biasa. $2^3$ artinya 2 × 2 × 2 = 8, bukan 2 × 3." },
    { "id": "M02", "label": "Mengalikan pangkat pada perkalian basis sama", "feedback": "Pada perkalian dengan basis sama, pangkatnya **dijumlahkan**, bukan dikalikan." },
    { "id": "M03", "label": "Ikut mengoperasikan basis", "feedback": "Basisnya tetap. Yang dioperasikan hanya pangkatnya." },
    { "id": "M04", "label": "Menjumlahkan pangkat pada pangkat dari pangkat", "feedback": "Bilangan berpangkat yang dipangkatkan lagi: pangkatnya **dikalikan**, bukan dijumlahkan." },
    { "id": "M05", "label": "Pangkat negatif dianggap bilangan negatif", "feedback": "Pangkat negatif berarti **kebalikan**, bukan bilangan negatif. Contoh: $2^{-3} = [1/2^3] = [1/8]$." },
    { "id": "M06", "label": "Pangkat nol dianggap 0", "feedback": "Lihat polanya: $5^2 = 25$, $5^1 = 5$, $5^0 = 1$. Setiap pangkat turun satu, nilainya dibagi 5. Jadi $a^0 = 1$." },
    { "id": "M07", "label": "Hanya pembilang yang dipangkatkan", "feedback": "Pembilang **dan** penyebut sama-sama dipangkatkan: $([a/b])^n = [a^n/b^n]$." },
    { "id": "M08", "label": "Menggabungkan basis berbeda", "feedback": "Basis berbeda tidak bisa langsung digabung. Samakan basisnya dulu, atau gunakan $(ab)^n$ jika pangkatnya sama." },
    { "id": "M09", "label": "Sifat perkalian dipakai pada penjumlahan", "feedback": "Menjumlahkan pangkat hanya berlaku untuk **perkalian**, bukan penjumlahan. Hitung nilainya masing-masing dulu." },
    { "id": "M10", "label": "Tanda negatif dan kurung", "feedback": "Perhatikan kurungnya. $-3^2 = -(3 × 3) = -9$, sedangkan $(-3)^2 = (-3) × (-3) = 9$." },
    { "id": "M11", "label": "Menjumlahkan pangkat pada pembagian", "feedback": "Pada pembagian dengan basis sama, pangkatnya **dikurangkan**." },
    { "id": "M12", "label": "Basis dan pangkat tertukar", "feedback": "Basis adalah bilangan yang dikalikan berulang. Pangkat adalah **banyaknya** faktor. Coba hitung lagi ada berapa faktor." },
    { "id": "M13", "label": "Membagi pangkat pada pembagian", "feedback": "Pada pembagian dengan basis sama, pangkatnya **dikurangkan**, bukan dibagi." },
    { "id": "M14", "label": "Lupa bahwa a = a¹", "feedback": "Bilangan tanpa pangkat yang tertulis memiliki pangkat 1. Contoh: $a = a^1$." },
    { "id": "M15", "label": "Operasi kebalikan keliru", "feedback": "Untuk mencari pangkat yang belum diketahui, gunakan operasi kebalikan. Contoh: n + 3 = 10, jadi n = 10 − 3." },
    { "id": "M16", "label": "Hanya satu faktor dipangkatkan", "feedback": "Setiap faktor di dalam kurung ikut dipangkatkan: $(ab)^n = a^n × b^n$." },
    { "id": "M18", "label": "Tanda pada pangkat genap/ganjil", "feedback": "Bilangan negatif berpangkat **genap** hasilnya positif. Berpangkat **ganjil** hasilnya negatif." },
    { "id": "M19", "label": "Pecahan dipangkatkan dianggap makin besar", "feedback": "Pecahan antara 0 dan 1 menjadi **makin kecil** jika pangkatnya makin besar. Contoh: $[1/2]$, $[1/4]$, $[1/8]$, ..." },
    { "id": "MM01", "label": "Lama waktu dipakai sebagai pangkat", "feedback": "Pangkat adalah **banyaknya kejadian** (misalnya membelah), bukan lamanya waktu. Hitung dulu ada berapa kali kejadian itu terjadi." },
    { "id": "MM02", "label": "Model linear, bukan berlipat", "feedback": "Jumlahnya bertambah **berlipat** (dikali berulang), bukan bertambah tetap. Coba isi tabel polanya." },
    { "id": "MM03", "label": "Lupa nilai awal", "feedback": "Mula-mula ada berapa? Jangan lupa mengalikan dengan jumlah awal." },
    { "id": "MM04", "label": "Peluruhan dimodelkan sebagai pertumbuhan", "feedback": "Jumlahnya makin **berkurang**. Setiap langkah dikali $[1/2]$, bukan dikali 2." },
    { "id": "MM05", "label": "Jawaban tanpa satuan atau konteks", "feedback": "Angkanya sudah benar. Sekarang tulis artinya di dalam soal, lengkap dengan satuannya." },
    { "id": "MM06", "label": "Menerima jawaban yang tidak masuk akal", "feedback": "Bandingkan jawabanmu dengan keadaan nyata di soal. Apakah memang mungkin terjadi?" }
  ]
});
