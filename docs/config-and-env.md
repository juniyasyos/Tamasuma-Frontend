## Configuration & Environment

### Firebase Config
- Saat ini: file `src/config/firebase.js` berisi kredensial tersemat untuk development.
- Rekomendasi: pindahkan ke `.env` dan baca via `process.env` (mis. `VUE_APP_FIREBASE_API_KEY`, dst)
- Pastikan jangan commit `.env` dan tambahkan `.env.example` untuk template.

### App Name (Title)
- Diambil dari `store.config.generalConfig.name`. `setGeneralConfig` juga menyimpan ke `localStorage.name` untuk digunakan di middleware title.

### Vue CLI Config
- File: `vue.config.js`
- Poin penting: hapus prefetch, `productionSourceMap: false`, opsi PWA (themeColor, manifestOptions, dll)

