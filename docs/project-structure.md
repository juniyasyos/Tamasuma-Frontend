## Project Structure Map

Struktur direktori utama dan fungsinya.

### Pohon Direktori (ringkas)
```
src/
  assets/           # gambar, font, data statis
  components/       # komponen UI reusable & feature pieces
    core/           # Toolbar, Drawer, Footer, AppSidebar, View shell
    home/           # komponen khusus halaman Home
    modules/        # komponen list/kartu modul
    speakers/, team/, blogs/, common/  # komponen fitur lain
    ui/             # komponen util UI (AppButton, AppTags)
  config/           # inisialisasi firebase
  dummy/            # data JSON & reader untuk development/offline
  functions/        # mixin & util umum untuk komponen
  plugins/          # konfigurasi Vuetify
  router/           # konfigurasi Vue Router
  services/         # service wrapper (dummy/external/Firebase)
  store/            # Vuex store
  views/            # halaman (Home, Modules, Speakers, Team, …)
  style.css         # gaya global

public/             # index.html, icons, manifest
```

### Peran Folder
- `components/core`: komponen layout global (Toolbar/Drawer/Footer/Views)
- `components/ui`: komponen UI generik siap pakai (button, tags)
- `views`: halaman route-level, lazy-loaded dari router
- `dummy`: sumber data development dalam bentuk JSON; dipanggil via `dummyReader`
- `services`: abstraksi akses data (mengembalikan `{ success, data }`)
- `router`: definisi rute dan helper untuk meta/title
- `store`: state global dan getters untuk navigasi/topbar/bottom nav

### Alur Umum Data
View → Service (`services/appservices.js`) → Dummy/Firebase → Store (opsional) → Komponen anak.

