## PWA & Service Worker

### Plugin & Konfigurasi
- Plugin: `@vue/cli-plugin-pwa` (lihat `vue.config.js` → opsi `pwa`)
- Nonaktifkan prefetch untuk mengurangi request awal (`chainWebpack`)

### Register Service Worker
- File: `src/registerServiceWorker.js`
- Event utama:
  - `registered` → set interval update per 1 jam
  - `updated` → kirim pesan `SKIP_WAITING` ke SW → reload saat `controllerchange`
  - `offline`, `cached`, `error` → logging

### UI Notifikasi Update
- `src/App.vue` menangkap event kustom `swUpdated` dan menampilkan snackbar refresh
- Tombol Refresh mengirim `skipWaiting` ke SW dan reload saat SW baru aktif

### Catatan
- Untuk fallback offline page, siapkan route 404 statis atau cache pattern tertentu via Workbox (opsional)

