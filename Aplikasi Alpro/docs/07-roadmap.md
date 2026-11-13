# 07 — Roadmap & Rencana Proyek

| Atribut | Keterangan |
|---|---|
| Versi | 1.0 |
| Metode | Scrum ringan — sprint 2 minggu |
| Perkiraan durasi MVP | 14 minggu (16 Nov 2026 – 21 Feb 2027) |

> Tanggal adalah perkiraan; sesuaikan dengan kalender akademik dan jadwal libur sekolah (akhir Desember).

**Status per 12 November 2026:** kode MVP v0.1.0 sudah dibuat lebih awal dari jadwal. Isinya PWA JavaScript + server Python, 8 unit, Lab Pemodelan, dan Misi Literasi, dengan 3.467 uji otomatis lulus. Fokus berikutnya bergeser ke **validasi riset (Fase 0)**, **tinjauan konten oleh guru**, **uji usabilitas prototipe nyata**, dan **penerbitan HTTPS + APK**. Sprint di §2 tetap dipakai untuk penyempurnaan dan pelengkapan konten (target T1–T8 masing-masing ≥ 2 soal, 9 stimulus).

---

## 1. Fase & Milestone

| Fase | Minggu | Periode | Keluaran | Milestone |
|---|---|---|---|---|
| 0. Validasi riset | 1–2 | 16–29 Nov 2026 | Wawancara tambahan 4–7 siswa + 1–2 guru; survei perangkat; revisi PRD | **M0:** PRD v1.1 disetujui |
| 1. Desain | 3–4 | 30 Nov – 13 Des 2026 | Wireframe, design system, prototipe Figma U4; uji usabilitas prototipe | **M1:** Desain disetujui |
| 2. Pengembangan inti | 5–10 | 14 Des 2026 – 24 Jan 2027 | Sprint 1–3 (lihat §2) | **M2:** Alpha (U1–U4 dapat dipakai) |
| 3. Konten & pelengkap | 11–12 | 25 Jan – 7 Feb 2027 | Sprint 4: U5–U7, soal cerita, polishing | **M3:** Beta / MVP lengkap |
| 4. Uji coba & evaluasi | 13–14 | 8–21 Feb 2027 | Uji usabilitas MVP, pre/post-test (prosedural, literasi, pemodelan), SUS, skala Paas | **M4:** Laporan evaluasi |
| 5. Fase 2 — AI & akun | ±8 minggu setelah M4 | Mar–Apr 2027 (perkiraan) | Supabase, login + persetujuan wali, Asisten Pemodelan AI (F-18), set evaluasi AI ≥ 80 soal | **M5:** Asisten AI lulus ambang eval |

## 2. Rencana Sprint (Fase 2–3)

| Sprint | Tujuan | Item utama |
|---|---|---|
| **Sprint 0** (dalam fase 1) | Fondasi proyek | Inisialisasi repo, Vite + React + TS, Tailwind + tokens, ESLint/Prettier, CI, Capacitor Android "hello world", PWA dasar |
| **Sprint 1** | Kerangka belajar | Skema konten + validasi; `MathText`; routing; Beranda; Materi bertahap (F-02); penyimpanan progres (Dexie) |
| **Sprint 2** | Contoh & latihan | Worked example + fading (F-03); Kartu Sifat (F-04); latihan bertingkat (F-05); grader + umpan balik (F-06) |
| **Sprint 3** | Bantuan, offline & mesin pemodelan | Petunjuk bertingkat (F-07); profil & kemajuan (F-12); offline penuh (F-13); Modeling Engine (domain); konten U1–U4 + Misi Literasi U1–U4 |
| **Sprint 4** | Lengkapi MVP | Lab Pemodelan 5 langkah (F-15) + Mode Urai Soal (F-10); Misi Literasi (F-16); konten U5–U8; refleksi + skala Paas; aksesibilitas; build APK rilis |
| *Pasca-MVP* | v0.2 | Diagnostik (F-01), video (F-08), latihan ulang (F-09), alat representasi (F-17) |
| *Pasca-MVP* | v0.3 | Self-explanation (F-11), Buat Soal Ceritamu (F-19) |

## 3. Pembagian Peran (contoh untuk tim 4 orang)

| Peran | Tanggung jawab |
|---|---|
| Product owner / peneliti | Riset, PRD, prioritas backlog, koordinasi sekolah, evaluasi |
| Developer frontend | UI, komponen, PWA, Capacitor |
| Developer logika & data | Grader, scheduler, Dexie, test |
| Desainer & penulis konten | Figma, design system, materi, soal, koordinasi review guru |

## 4. Alat Kerja

| Kebutuhan | Alat |
|---|---|
| Repositori & CI | GitHub + GitHub Actions |
| Backlog | GitHub Projects (kolom: Backlog → To Do → In Progress → Review → Done) |
| Desain | Figma |
| Komunikasi | Grup WhatsApp/Discord + rapat mingguan |
| Dokumentasi | Folder `docs/` di repositori |

**Konvensi Git:**
- Branch: `main` (stabil), `feat/<nama>`, `fix/<nama>`, `content/<unit>`.
- Commit: *Conventional Commits* — `feat:`, `fix:`, `content:`, `docs:`, `test:`, `chore:`.
- Setiap perubahan masuk lewat Pull Request dengan minimal 1 reviewer.

## 5. Manajemen Risiko

| ID | Risiko | Kemungkinan | Dampak | Mitigasi |
|---|---|---|---|---|
| R1 | Temuan riset n=1 tidak mewakili siswa lain | Tinggi | Tinggi | Fase 0 validasi riset dengan 4–7 siswa tambahan |
| R2 | Pembuatan konten (111+ soal) memakan waktu lebih lama dari koding | Tinggi | Tinggi | Mulai menulis konten sejak Fase 1, paralel dengan desain; prioritaskan U2, U4, U6 |
| R3 | Penilaian jawaban ekspresi matematika keliru | Sedang | Tinggi | Grader dengan mode `exact`/`value`; test kasus luas; utamakan `mcq` jika ragu |
| R4 | Izin uji coba dari sekolah terlambat | Sedang | Tinggi | Ajukan surat izin di Fase 0 |
| R5 | HP siswa terlalu lambat / penyimpanan penuh | Sedang | Sedang | Target APK ≤ 25 MB; uji di HP RAM 2 GB; PWA sebagai alternatif tanpa instal |
| R6 | Anggota tim kurang familiar dengan React/TS | Sedang | Sedang | Sprint 0 untuk belajar; pair programming; gunakan Claude Code dengan CLAUDE.md |
| R7 | Video tidak sempat dibuat | Sedang | Rendah | Video berstatus Should; gunakan video berlisensi terbuka dengan izin |
| R8 | Kebocoran data pribadi anak | Rendah | Tinggi | MVP tanpa server; hanya nama panggilan; tanpa SDK iklan/pelacak |
| R9 | Libur akhir tahun mengganggu jadwal | Tinggi | Sedang | Sprint 2 dirancang dapat dikerjakan jarak jauh; buffer 1 minggu |
| R10 | Penulisan soal pemodelan (26) dan stimulus literasi (9) lebih lama karena butuh konteks autentik & pemodelan lengkap | Tinggi | Tinggi | Mulai dari tipe T1, T2, T6 (paling terkait temuan riset); pakai templat §2.7; libatkan guru sejak Fase 1 |
| R11 | Asisten AI memberi model/jawaban keliru | Sedang | Tinggi | Verifikasi ulang dengan math.js; ambang eval sebelum rilis; label "AI dapat keliru"; tombol lapor |
| R12 | Biaya API melebihi anggaran | Sedang | Sedang | Kuota harian per siswa, prompt caching, batas anggaran di konsol penyedia |
| R13 | Siswa memakai AI hanya untuk menyalin jawaban | Sedang | Sedang | Langkah dibuka bertahap; jawaban akhir hanya setelah percobaan; guru dapat menonaktifkan fitur |

## 6. Kriteria Rilis MVP

- [ ] Semua fitur **Must** memenuhi kriteria penerimaan.
- [ ] Konten U1–U8 dan 9 stimulus literasi berstatus `approved`; tipe T1–T8 masing-masing ≥ 2 soal.
- [ ] Lulus semua test CI; tidak ada bug prioritas tinggi terbuka.
- [ ] Lighthouse ≥ 90 (performa, aksesibilitas, PWA).
- [ ] APK terpasang & berjalan di 3 perangkat uji.
- [ ] Kebijakan privasi tersedia di aplikasi.
