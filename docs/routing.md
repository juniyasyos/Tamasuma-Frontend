## Routing (Vue Router)

### Dasar
- File: `src/router/index.js`
- Helper:
  - `loadView(name)` → lazy import `../views/${name}`
  - `withMeta(meta)` → menyematkan meta default + override

### Pola
- Rute utama: Home, About, Team, Modules, Speakers, Partners, Contact
- Rute dinamis:
  - `'/team/:id'` → detail tim
  - `'/speakers/:id'` → detail speaker
  - `'/modules/:id'` → modul kustom (MainView + children)

### Modules Nested Routes
- Parent: `views/Modules/MainView.vue`
- Children aktif: `About.vue` pada path `'/'` (landing modul)
- Anak lain (Schedule, Speaker, Team, Partners) tersedia untuk pola lanjutan.

### Meta & Title
- Middleware `beforeEach`:
  - Jika `to.meta.title` ada → `document.title = ${meta.title} | ${localStorage.name || 'App'}`
  - Scroll ke `{x:0,y:0}` pada tiap navigasi

