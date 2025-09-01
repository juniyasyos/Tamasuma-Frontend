## Overview & Getting Started

Tujuan: memberi gambaran menyeluruh tentang aplikasi Tamasuma Frontend, bagaimana cara menjalankannya, dan pola arsitektur dasar yang menjadi fondasi repo.

### Ringkasan Teknis
- Framework: Vue 2 (Options API)
- UI: Vuetify 2 + MDI Icons
- Routing: Vue Router (lazy-loaded views, meta title)
- State: Vuex (root store, rencana modularisasi)
- Data: Dummy JSON di `src/dummy/` via service wrapper, opsi Firebase (config siap)
- PWA: `@vue/cli-plugin-pwa` + service worker update handling

### Cara Menjalankan
- Prasyarat: Node 16/18, npm 8+ (atau pnpm/yarn)
- Setup:
  - `npm install`
  - `npm run serve`
- Build production:
  - `npm run build` (PWA diaktifkan, tanpa source map production)

### Pola Arsitektur (High Level)
- Entry: `src/main.js` memuat Vuetify, Router, Store, CSS global, dan mixin util.
- Shell Layout: `src/App.vue` mengelola Toolbar/Drawer/Footer, inisialisasi config dari service, serta SW update UI.
- Feature Views: halaman dalam `src/views/` (Home, Modules, Speakers, Team, …) menggunakan komponen di `src/components/`.
- Data Layer: `src/services/appservices.js` (wrapper) → `src/dummy/dummyReader.js` (sumber dummy). Firebase config tersedia di `src/config/firebase.js`.
- Routing: `src/router/index.js` dengan helper `loadView` (lazy import) dan `withMeta` (meta default).

### Konsep Inti
- “Module” secara teknis memanfaatkan struktur “event” kustom: setiap modul adalah entitas di `src/dummy/events.json` dengan field lengkap (jadwal, resources, outcomes, dsb).
- Semua entitas (modules, speakers, team, partners) saling merujuk dengan ID, agar mudah diproses lintas fitur.

—
Untuk detail mendalam per bagian, lanjut ke Project Structure, Conventions, dan lainnya.

