## Core Components

### Toolbar.vue (`components/core/Toolbar.vue`)
- App bar global: logo + shortName/name, indikator offline, toggle drawer (mobile)
- Getter store untuk links jika ingin menu dinamis

### Drawer.vue & AppSidebar.vue
- Menu samping untuk navigasi utama; terhubung ke `store.drawer`

### Footer.vue
- Menampilkan link terstruktur dari `store.config.footerConfig`

### Views.vue
- Wrapper `<router-view>` dengan transisi slide dan penanganan tema background

