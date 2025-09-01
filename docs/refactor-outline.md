# Tamasuma Frontend – Refactor & Structure Improvement Plan

## 1) Objectives
- Konsistensi struktur proyek agar mudah dikembangkan dan dipelihara.
- Memisahkan concern: UI, routing, state, dan data access lebih rapi.
- Menyiapkan pola feature-oriented untuk skalabilitas tim dan fitur baru.
- Mengurangi risiko bug dari inkonsistensi dan dependensi yang tak perlu.

## 2) Scope & Non‑Goals
- Scope: struktur folder, perapihan router, Vuex modular, service layer, konfigurasi `.env`, pembersihan aset/CSS dasar, dokumentasi.
- Non‑Goals: fitur baru; perubahan UI besar; migrasi ke Vue 3 (di luar cakupan saat ini).

## 3) Current Summary (Singkat)
- Stack: Vue 2 + Vue Router + Vuex + Vuetify + PWA.
- Data: dummy JSON + rencana Firebase; service layer bercampur (dummy/external/firestore).
- Router: memuat route ke komponen yang belum ada (Modules/Materials, dsb.).
- Vuex: single store; ada typo pemanggilan mutasi di `App.vue`.
- Ikon: `@mdi/font` tersedia, namun yang diimport Google Icons; tidak konsisten.
- CSS: outline debug global aktif di seluruh elemen.
- package: `firebase-admin` tercantum, tidak relevan untuk frontend.

## 4) Quick Wins (Low Risk)
1. Perbaiki typo mutasi di `App.vue` → gunakan `setKeysAndSecurityConfig`.
2. Nonaktifkan global outline CSS (`* { outline: 1px solid red; }`).
3. Samakan ikon Vuetify ke MDI: import `@mdi/font` dan lepas `material-design-icons-iconfont` jika tidak dipakai.
4. Hapus `firebase-admin` dari `package.json` (hanya untuk server‑side).
5. Sinkronkan router: komentari atau buat placeholder untuk `Materials/Assignments/Discussions/Resources`.
6. Rapikan `dummyReader.getConfig`: benar‑benar buang properti `id` tanpa menaruh `undefined`.

## 5) Proposed Architecture (Feature‑Oriented)
```
src/
  features/
    modules/{views,components,store,services,routes.js}
    events/{views,components,store,services,routes.js}
    speakers/{views,components,store,services,routes.js}
    team/{views,components,store,services,routes.js}
  shared/{components,utils,constants,styles}
  api/{clients,repositories}
  router/{index.js}
  store/{index.js,modules/*}
```

## 6) Data Access Layer
- `api/clients`:
  - `firebaseClient.js`: inisialisasi Firebase dari `.env`.
  - `httpClient.js`: wrapper `fetch` + error handling.
- `api/repositories`:
  - `configRepository.js`, `teamRepository.js`, dsb.: expose fungsi domain (`getTeam`, `getConfig`, …) dengan sumber data dapat ditukar (dummy/live) via env flag.

## 7) Vuex Modular & Namespaced
- Buat module: `config`, `ui`, `team`, `speakers`, (opsional `modules`, `events`).
- `ui` mengelola drawer, bottom nav; `config` mengelola konfigurasi & side‑effects (localStorage title).
- Hindari state root gemuk; gunakan getter dan mutation per module.

## 8) Routing Plan
- Setiap fitur punya `routes.js`; diimpor dan digabung di `router/index.js`.
- Pastikan meta konsisten (`title`, `isEvent`, `isModule`) dengan helper `withMeta`.
- Tambahkan `NotFound.vue` dan fallback `*` ke 404.

## 9) Configuration & Secrets
- Pindahkan Firebase config ke `.env` (`VUE_APP_FIREBASE_*`).
- `src/config/firebase.js` membaca dari `process.env` + pengecekan `messaging.isSupported()` tetap.

## 10) UI/Icons & Assets
- Konsistenkan penggunaan MDI (`@mdi/font/css/materialdesignicons.css`).
- Hapus import iconfont lain jika tidak dipakai.
- Benahi path aset di CSS agar tidak mengarah ke `../src//assets/...`; gunakan alias atau relatif yang benar.

## 11) CSS & Styles
- Hilangkan outline debug global atau guard by env.
- Pindahkan util kelas umum ke `shared/styles` bila perlu.

## 12) PWA
- Pertahankan mekanisme SW update yang ada; opsional: fallback offline page.

## 13) Migration Strategy (Phases)
Phase 1 – Quick Wins
- Terapkan keenam poin Quick Wins di atas.

Phase 2 – Router Hygiene
- Komentari route belum tersedia atau buat placeholder minimal; tambah `NotFound.vue`.

Phase 3 – Vuex Modular
- Ekstrak `ui` dan `config` ke module namespaced; sesuaikan pemanggilan di komponen.

Phase 4 – Data Layer
- Pisahkan `api/clients` dan `api/repositories`; pindahkan logic dari `services/appservices.js` bertahap.
- Tambah flag env untuk pilih dummy vs live.

Phase 5 – Feature Folders
- Pindahkan komponen dan views ke dalam `src/features/*` bertahap, update import/alias.

Phase 6 – Cleanup & Docs
- Hapus file legacy yang sudah dipindah; update README & arsitektur.

## 14) Task Breakdown (Checklist)
- [ ] Fix mutation name `setKeysAndSecurityConfig` di `App.vue`.
- [ ] Matikan outline CSS global.
- [ ] Konsistenkan MDI icons; hapus iconfont lain jika tak dipakai.
- [ ] Remove `firebase-admin` dari `package.json` + lockfile update.
- [ ] Router: placeholder/komentar untuk rute yang belum ada + `NotFound.vue`.
- [ ] Perbaiki `dummyReader.getConfig` agar `id` di-drop benar.
- [ ] Tambah `.env.example` untuk Firebase keys.
- [ ] Buat `api/clients` dan `api/repositories` skeleton.
- [ ] Modularisasi Vuex: `ui`, `config`.
- [ ] Pindahkan sebagian komponen ke `features/*` (pilot: speakers atau team).
- [ ] Update README arsitektur dan cara run (dummy vs live).

## 15) Acceptance Criteria
- Build `serve` dan `build` berjalan tanpa error.
- Navigasi rute utama berjalan; 404 menampilkan halaman khusus.
- State `config` terisi benar; title halaman mengikuti meta dan config.
- Tidak ada global outline merah; ikon tampil sesuai MDI.
- Tidak ada referensi ke komponen/rute yang tidak ada.

## 16) Risks & Mitigations
- Risiko path import rusak saat pemindahan: lakukan bertahap per fitur + jalankan dev server untuk validasi.
- Perubahan Vuex memengaruhi banyak komponen: mulai dari module `ui` dan `config` terlebih dahulu, uji smoke.
- Ketergantungan Firebase di env: sediakan fallback dummy & `.env.example`.

## 17) Rollback Strategy
- Lakukan perubahan per fase dan commit terpisah; mudah rollback per commit.
- Simpan salinan `services/appservices.js` sampai repository pattern stabil.

## 18) Estimasi (kasar)
- Phase 1: 0.5–1 hari.
- Phase 2: 0.5 hari.
- Phase 3: 1 hari.
- Phase 4: 1–1.5 hari.
- Phase 5: 1–2 hari (bertahap per fitur).
- Phase 6: 0.5 hari.

—
Silakan review dan beri approval untuk menjalankan Phase 1 (Quick Wins). Setelah itu saya lanjut per fase sesuai outline.

