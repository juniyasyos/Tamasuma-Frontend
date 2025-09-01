# Tamasuma Frontend — Documentation Plan

Tujuan: menyediakan dokumentasi bertahap yang jelas, ringkas, dan praktis untuk memahami arsitektur, struktur folder, serta setiap file/komponen penting. Dokumen akan ditulis per bagian di `docs/` sesuai prioritas.

## Struktur Utama Dokumentasi
- 01. Overview & Getting Started
- 02. Project Structure Map
- 03. Conventions (Naming, Imports, Patterns)
- 04. UI System (Vuetify, Theme, Global Styles)
- 05. Routing (Vue Router)
- 06. State (Vuex)
- 07. Data Layer (Services, Dummy, Firebase)
- 08. Feature Docs (Home, Modules, Speakers, Team, Partners, About)
- 09. Core Components (Toolbar, Drawer, Footer, Views)
- 10. Common Components (Reusable)
- 11. PWA & Service Worker
- 12. Configuration & Environment
- 13. Build, Linting, Deploy
- 14. Testing Strategy
- 15. Glossary & ADRs (opsional)

## Rincian + Isi per Dokumen

1) docs/overview.md
- Ringkasan stack (Vue 2, Vue Router, Vuex, Vuetify, PWA)
- Konsep inti aplikasi (pages vs components, feature-oriented plan)
- Cara cepat menjalankan: `npm install`, `npm run serve`, env

2) docs/project-structure.md
- Pohon folder utama (src/, public/, docs/)
- Makna setiap direktori (views, components, store, router, services, dummy, config, plugins)
- Tabel mapping fitur → folder (Home, Modules, Speakers, Team, dsb.)

3) docs/conventions.md
- Konvensi penamaan file/komponen (PascalCase untuk .vue, kebab-case path)
- Impor path alias `@/`
- Pola lazy-load komponen dan routes
- Style guideline ringkas (CSS util, kelas `google-font`, `aura-*`)

4) docs/ui-system.md
- Vuetify setup (`src/plugins/vuetify.js`) + tema
- Ikon (MDI) dan alasan
- Global style (`src/style.css`) dan util kelas
- UI reusable:
  - `components/ui/AppButton.vue` (props, variant, contoh pemakaian)
  - `components/ui/AppTags.vue` (jika digunakan di bagian lain)

5) docs/routing.md
- Konfigurasi router (`src/router/index.js`), `loadView`, `withMeta`
- Meta standar (title, isEvent/isModule)
- Scroll behavior, title middleware
- Pola nested route untuk Modules (MainView + children)

6) docs/state.md
- Store root (`src/store/index.js`): state `config`, `drawer`, items nav
- Getters (toolbarLinks, bottomNavLinks)
- Mutations kunci (setGeneralConfig, setKeysAndSecurityConfig, setFooterConfig)
- Rencana modularisasi (ui, config, team, speakers)

7) docs/data-layer.md
- Services: `src/services/appservices.js` (dummy, external API, firestore)
- Dummy data: `src/dummy/*` (struktur data dan relasinya)
- Firebase config: `src/config/firebase.js` (catatan env, inisialisasi)
- Rencana pemisahan ke `api/clients` dan `api/repositories`

8) docs/features/
- Home: komponen utama (HomeStartScreen, WhatWeDo, FeaturesModules, AboutCommunity)
- Modules: views (About, Schedule, Speaker, Team, Partners), hubungan data `events.json`
- Speakers: list + detail, dependensi `Speakers.json`
- Team: pemisahan Core/Organizing/Volunteer, dependensi `team.json`
- Partners: komponen `components/common/Partners.vue`
- About/Contact: gambaran singkat

9) docs/core-components.md
- Toolbar, Drawer, AppSidebar, Footer, Views: peran, dependensi store/router

10) docs/common-components.md
- Komponen umum: SocialInfo, CommunitySocialInfo, Partners (common)
- Pola props, slots, event (gunakan template komponen)

11) docs/pwa.md
- `@vue/cli-plugin-pwa` config (vue.config.js)
- register SW (`src/registerServiceWorker.js`), event `swUpdated`, refresh flow
- Catatan fallback offline (opsional)

12) docs/config-and-env.md
- .env (rencana): `VUE_APP_FIREBASE_*`
- Catatan sensitif vs dummy
- `vue.config.js` opsi PWA dan build

13) docs/build-and-deploy.md
- Scripts npm, source maps, prefetch off
- Catatan dependencies (hapus yang tidak perlu), ikon

14) docs/testing.md
- Usulan tool (Jest/Vue Test Utils) untuk Vue 2
- Cakupan test prioritas (utils, komponen kritikal)

15) docs/glossary-and-adrs.md (opsional)
- Istilah internal (Module=custom event), naming mapping
- ADR untuk keputusan ikon, PWA, dummy vs live

## Rencana Penulisan (Prioritas & Urutan)
1. Overview & Getting Started
2. Project Structure Map
3. Conventions
4. UI System
5. Routing
6. State
7. Data Layer (+ Dummy Data)
8. Features: Home, Modules (paling dulu), Speakers, Team, Partners
9. Core Components
10. Common Components
11. PWA
12. Config & Env
13. Build & Deploy
14. Testing
15. Glossary & ADRs

## Granular Checklist per File/Area
- Router: `src/router/index.js` — tujuan, helper (`loadView`, `withMeta`), daftar route, meta
- Store: `src/store/index.js` — state, getters, mutations, alur setConfig
- Services: `src/services/appservices.js` — kontrak metode, sumber data, error handling
- Firebase: `src/config/firebase.js` — inisialisasi, fitur, catatan env
- Dummy Data: `src/dummy/*.json` — skema per file (events, speakers, team, partners, featureevents, config)
- Home: `HomeStartScreen.vue`, `FeaturesModules.vue`, dll — props, alur data, UX
- Modules Views: `About.vue`, `Schedule.vue`, `Speaker.vue`, `Team.vue`, `Partners.vue` — props `eventDetails`, konsumsi data
- Core: `Toolbar.vue`, `Drawer.vue`, `AppSidebar.vue`, `Footer.vue`, `Views.vue` — tanggung jawab & interaksi store/router
- UI Components: `AppButton.vue`, `AppTags.vue` — API komponen, variasi, contoh
- PWA: `registerServiceWorker.js`, `vue.config.js` — lifecycle & opsi
- Global Styles: `src/style.css` — util dan tema

## Template Dokumentasi (akan digunakan)
- Template Komponen: `docs/templates/component.md`
- Template View/Feature: `docs/templates/view.md`
- Template Service/Data: `docs/templates/service.md`, `docs/templates/data-model.md`
- Template Store Module: `docs/templates/store-module.md`

## Output Akhir yang Diharapkan
- Dokumentasi mudah dinavigasi (TOC jelas), setiap bagian memiliki tujuan, tanggung jawab, dan contoh pemakaian singkat.
- Setiap komponen/file penting memiliki penjelasan ringkas 1–2 halaman maksimal, fokus ke hal praktis.

