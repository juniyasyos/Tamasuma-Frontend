## Testing Strategy

### Target
- Unit: utils/mixins (`src/functions/generalFunctions.js`), komponen UI (AppButton, AppTags), komponen yang memiliki logika filter/sorting.
- Snapshot: komponen presentational yang stabil.
- Integration (ringan): service wrapper (mock `dummyReader`).

### Tools (usulan)
- Jest + Vue Test Utils untuk Vue 2
- Testing Library (opsional) untuk fokus ke behavior

### Contoh Cakupan
- `FeaturesModules.vue`: render state loading/empty/content; urutan sorting oleh tanggal; navigasi saat klik kartu.
- `Modules/Schedule.vue`: header tabel dan pemetaan field agenda.
- `dummyReader.js`: fungsi `getFeatureEvents`, transform `getConfig`.

