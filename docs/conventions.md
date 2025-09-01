## Conventions

### Penamaan & Struktur
- Komponen Vue: PascalCase (`Toolbar.vue`, `HomeStartScreen.vue`)
- Direktori fitur: singular dan jelas (`modules/`, `speakers/`)
- Path alias: gunakan `@/` untuk import dari `src/`

### Pola Import
- Lazy-load untuk view/komponen berat di router dan `App.vue`:
  - `() => import('@/components/core/Toolbar')`

### Meta & Title
- Rute menyetel `meta.title` dan helper `withMeta` di `src/router/index.js`.
- Middleware `beforeEach` menyetel `document.title` dengan `meta.title` + `config.generalConfig.name`.

### Styling
- Gunakan kelas util: `google-font`, `aura-*` (card, text, btn)
- Hindari inline style jika bisa; untuk ekspresivitas cepat boleh dipakai asal konsisten.
- Ikon: MDI via `@mdi/font`. Jangan campur dengan Google Icon font.

### Data Contract
- Service mengembalikan `{ success: boolean, data: any }` agar konsumsi konsisten.
- Relasi antar entitas via ID (modules.events → speakers/team/partners).

