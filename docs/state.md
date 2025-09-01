## State (Vuex)

### Lokasi
- File: `src/store/index.js`

### State Utama
- `drawer`: boolean untuk navigasi samping
- `eventDrawer`: boolean untuk drawer di halaman modul/event
- `config`:
  - `generalConfig`: nama singkat, social links, deskripsi, hashtags
  - `keysandsecurity`: kunci/konfigurasi eksternal
  - `footerConfig`: tautan footer terstruktur
- `items`: daftar navigasi (toolbar/bottom nav) dengan meta visibilitas

### Getters
- `links`: seluruh item menu
- `toolbarLinks`: item dengan `meta.showToolbar`
- `bottomNavLinks`: item dengan `meta.showBottomNav`

### Mutations
- UI: `setDrawer`, `toggleDrawer`, `setEventDrawer`, `toggleEventDrawer`
- Config:
  - `setGeneralConfig` → set state dan `localStorage.setItem('name', payload.name)` jika tersedia
  - `setKeysAndSecurityConfig` → simpan kredensial/keys
  - `setFooterConfig` → simpan tautan footer

### Rencana Modularisasi (disarankan)
- Pisah menjadi module namespaced:
  - `ui` (drawer, eventDrawer, items → nav meta)
  - `config` (general, keys/security, footer)
  - Domain opsional: `team`, `speakers`, `modules` (cache list/detail)

