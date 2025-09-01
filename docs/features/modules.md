## Feature: Modules

Modul direpresentasikan sebagai entitas “event” kustom di `src/dummy/events.json` dengan field lebih kaya.

### Views
- `views/Modules/MainView.vue`: shell modul dengan toolbar/drawer khusus + `<router-view>` anak
- `views/Modules/About.vue`: header banner modul, detail deskripsi, links (registration, youtube, dll), chips hashtag, highlight speakers/partners
- `views/Modules/Schedule.vue`: tabel agenda (`eventDetails.agenda`)
- `views/Modules/Speaker.vue`: daftar speakers yang direferensikan
- `views/Modules/Team.vue`, `views/Modules/Partners.vue`: daftar tim/mitra terkait modul (opsional di-extend)

### Data
- Setiap modul memiliki kunci: `id`, `name`, `date`, `endDate`, `time`, `venue`, `links`, `hashtags`, `image/thumbnail`, `category`, `difficulty`, `language`, `durationHours`, `authors`, `prerequisites`, `outcomes`, `resources`, `agenda[]`, `team[]`, `speakers[]`, `partners[]`, `visible`, `active`.
- Relasi ke data lain dilakukan di sisi view dengan memetakan ID → entitas pada service `getAllSpeakers()/getAllPartners()`.

### Navigasi
- Route: `'/modules/:id'` (landing → `About.vue`)
- CTA pada kartu modul (`FeaturesModules.vue`) mengarah ke `/modules/<id>`.

### UX
- Loading state global pada `MainView.vue` ketika fetching modul
- Title page diset ke `${event.name} | ${config.generalConfig.name}`

