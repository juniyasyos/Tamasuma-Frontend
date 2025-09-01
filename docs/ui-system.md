## UI System (Vuetify, Theme, Global Styles)

### Vuetify Setup
- File: `src/plugins/vuetify.js`
- Tema: light/dark, primary = `colors.blue`
- Ikon: `@mdi/font/css/materialdesignicons.css`

### Global Styles
- File: `src/style.css`
- Kelas penting:
  - `google-font`: memakai font Google Sans (font-face lokal)
  - `aura-card-*`: varian kartu (light/white/dark)
  - `aura-btn`: latar gradien bergambar (brand)
  - Util layout seperti `aura-hidden-x`, `aura-home-card*`

### Komponen UI Reusable
- `components/ui/AppButton.vue`
  - Props: `variant (solid|outline|text|gradient)`, `color`, `rounded`, `depressed`, `to|href`, `iconRight`
  - Pakai `variant="gradient"` untuk kaca brand (kelas `aura-btn`)
  - Melewatkan `$attrs`/`$listeners` ke `v-btn` untuk fleksibilitas

- `components/ui/AppTags.vue`
  - Props: `tags: string[]`, `max`, `color`, `textColor`
  - Menampilkan N tag pertama + chip `+N` sisanya (opsional digunakan)

### Pola Responsif
- Grid: gunakan `cols` + `sm|md|lg` pada `v-col`
- Komponen berat diberi `skeleton-loader` pada state loading

