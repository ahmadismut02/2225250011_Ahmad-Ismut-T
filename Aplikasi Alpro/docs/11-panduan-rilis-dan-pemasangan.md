# 11 — Panduan Rilis & Pemasangan

Dokumen ini untuk **tim pengembang** (cara merilis) dan **guru/siswa** (cara memasang). EksponenKu dipasang **langsung dari browser, tanpa Play Store atau App Store**.

---

## A. Untuk Tim: Merilis Aplikasi

### A.1 Sebelum rilis

1. Jalankan uji JS: `powershell -ExecutionPolicy Bypass -File tools\run_tests.ps1`. Semua uji harus lulus.
2. Jalankan validasi konten: `python tools/validate_content.py`, dan pastikan hasilnya `LULUS`.
3. Naikkan versi:
   - `CACHE` di `app/sw.js` (mis. `eksponenku-v0.1.1`)
   - `VERSION` di `app/js/app.js` dan `server/main.py`
4. Jika ada berkas baru di `app/`, tambahkan ke daftar `FILES` di `app/sw.js`.

### A.2 Menerbitkan versi web (wajib HTTPS)

PWA hanya bisa dipasang dari alamat **HTTPS** (atau `localhost`). Pilih salah satu cara berikut, semuanya gratis untuk proyek kecil:

| Pilihan | Langkah singkat |
|---|---|
| **Netlify Drop** (paling mudah) | Buka app.netlify.com/drop, lalu seret folder `app/` ke halaman itu. Alamat HTTPS langsung jadi |
| **GitHub Pages** | Unggah repositori ke GitHub → Settings → Pages → pilih branch dan folder `/app` (atau pindahkan isi `app/` ke folder `docs/` khusus Pages) |
| **Server Python sendiri** | Jalankan `uvicorn server.main:app --host 0.0.0.0 --port 8000` di belakang reverse proxy HTTPS (mis. Caddy/Nginx) |

### A.3 Membuat APK Android (opsional, tanpa Android Studio)

1. Pastikan versi web sudah terbit di alamat HTTPS.
2. Buka **pwabuilder.com**, masukkan alamat aplikasi, lalu klik **Start**.
3. Pilih **Package for stores → Android → Generate Package**. Untuk pemasangan langsung, pilih opsi APK yang ditandatangani (*signed APK*).
4. Unduh file ZIP. Di dalamnya ada **APK** dan **kunci penandatangan (signing key)**.
   - **Simpan kunci itu dengan aman** dan jangan unggah ke repositori. Kunci yang sama diperlukan untuk setiap pembaruan.
5. Ganti nama APK menjadi `EksponenKu.apk` dan letakkan di `app/downloads/`. Terbitkan ulang. Halaman **Pasang Aplikasi** akan otomatis menampilkan tombol unduh APK.

> Catatan: APK hasil PWABuilder (TWA) membuka versi web yang terpasang. Saat pertama kali dibuka, perangkat perlu internet, setelah itu aplikasi bisa berjalan offline.

### A.4 Windows dan Mac

- Cara yang disarankan adalah memasang PWA langsung dari Chrome atau Edge (lihat bagian B). Aplikasi akan muncul di Start Menu atau Dock.
- Jika sekolah memerlukan file installer Windows, PWABuilder juga dapat membuat paket **MSIX**. Untuk Mac, PWA dari Chrome atau Safari sudah cukup.

---

## B. Untuk Guru dan Siswa: Memasang EksponenKu

Buka alamat aplikasi yang dibagikan guru, lalu ikuti langkah sesuai perangkat. Panduan yang sama juga ada di aplikasi, di menu **Pengaturan → Cara memasang aplikasi**.

| Perangkat | Langkah |
|---|---|
| **Android (Chrome)** | Ketuk menu ⋮ → **Instal aplikasi** / **Tambahkan ke layar utama**. Atau unduh **APK** dari halaman Pasang Aplikasi, buka file itu, lalu izinkan pemasangan dari sumber ini jika diminta |
| **iPhone / iPad (Safari)** | Ketuk **Bagikan** (kotak dengan panah ke atas) → **Tambahkan ke Layar Utama** → **Tambah**. *Harus memakai Safari* |
| **Windows (Chrome/Edge)** | Klik ikon **Instal** di ujung kanan kolom alamat, atau buka menu → **Instal EksponenKu** |
| **Mac** | Chrome: ikon **Instal** di kolom alamat. Safari: menu **File → Tambahkan ke Dock** |

**Setelah terpasang:**
- Aplikasi bisa dibuka tanpa internet.
- Data belajar tersimpan **hanya di perangkat itu**. Jika siswa berganti perangkat, kemajuannya tidak ikut pindah (fitur sinkronisasi direncanakan di Fase 2).
- Menghapus data browser atau mencopot aplikasi juga menghapus kemajuan belajar.

---

## C. Pemecahan Masalah

| Masalah | Penyebab dan solusi |
|---|---|
| Tombol "Instal" tidak muncul | Alamat bukan HTTPS, atau aplikasi sudah terpasang. Di iOS memang tidak ada tombol; pakai menu Bagikan di Safari |
| Perubahan konten tidak muncul di HP siswa | `CACHE` di `sw.js` belum dinaikkan. Naikkan, terbitkan ulang, lalu minta siswa membuka aplikasi dua kali |
| Android menolak memasang APK | Aktifkan **Izinkan dari sumber ini** untuk aplikasi pembuka file (Chrome atau File Manager) |
| Membuka `index.html` langsung dari folder | Aplikasi tetap bisa dipakai, tetapi tidak bisa dipasang dan tidak offline. Pakai server atau hosting |
