## Glossary & ADRs

### Glossary
- Module: fitur pembelajaran, direpresentasikan sebagai entitas `event` kustom (sejarah dari template awal)
- Feature Events: daftar ID modul unggulan yang ditampilkan di beranda
- Config: kumpulan pengaturan (general/footer/keys) yang diambil saat bootstrap app

### ADRs (Architecture Decision Records)
1. Ikon: memilih MDI (`@mdi/font`) untuk konsistensi dan dukungan ikon luas.
2. Data Dummy: memakai JSON lokal untuk dev/offline agar cepat iterasi; akan di-“swap” ke Firebase/API saat live.
3. PWA: mengaktifkan SW update otomatis dengan UI snackbar agar pengguna tetap kontrol kapan refresh.
4. Lazy Loading: semua view dan sebagian komponen besar di-lazy agar initial load ringan.

