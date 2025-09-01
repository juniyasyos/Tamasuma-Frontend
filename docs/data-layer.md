## Data Layer (Services, Dummy, Firebase)

### Service Wrapper
- File: `src/services/appservices.js`
- Pola return: `{ success: boolean, data: any }` untuk keseragaman konsumsi
- Kelompok fungsi:
  - Dummy Readers: `getTeam`, `getTeamMember`, `getAllEvents`, `getEvent`, `getAllSpeakers`, `getSpeaker`, `getAllPartners`, `getPartner`, `getAllConfig`, `getFeaturesEvents`, `getAllCustomEvents`
  - External API: Meetup (upcoming/past), Medium (RSS2JSON)
  - Firestore: `getCommunityGuidelines()` (contoh akses koleksi `config/communityguidelines`)

### Dummy Reader
- File: `src/dummy/dummyReader.js`
- Memuat JSON:
  - `team.json`, `events.json`, `Speakers.json`, `partners.json`, `config.json`, `featureevents.json`
- Transform `config.json` → array `{ name: id, data: rest }`
- `getFeatureEvents()` → baca ID modul unggulan dari `featureevents.json`

### Skema Data Dummy (ringkas)
- `events.json` (modul):
  - Kunci utama: `id`, `name`, `date`, `endDate`, `time`, `venue`, `links`, `image`, `thumbnail`, `hashtags`, `category`, `difficulty`, `language`, `durationHours`, `authors`, `prerequisites[]`, `outcomes[]`, `resources[]`, `agenda[]`, `team[]`, `speakers[]`, `partners[]`, `visible`, `active`
  - Relasi: `team`→`team.json`, `speakers`→`Speakers.json`, `partners`→`partners.json`
- `Speakers.json`: `id`, `name`, `designation`, `email`, `company{name,url}`, `image`, `bio`, `city`, `country`, `socialLinks{...}`, `visible`
- `team.json`: `id`, `name`, `designation`, `email`, `image`, `role(Core/Organizing/Volunteer)`, `socialLinks{...}`, `visible`
- `partners.json`: `id`, `name`, `des`, `image`, `socialLinks{web,linkedin,...}`, `visible`
- `config.json`: `general`, `footer`, `communityguidelines`, `partners`

### Firebase (opsional/live)
- File: `src/config/firebase.js`
- Inisialisasi `firebase.app`, expose `firestore`, `auth`, `storage`, `messaging` (dengan `isSupported`)
- Catatan: pindah kredensial ke `.env` (lihat docs/config-and-env.md)

### Rencana Peningkatan
- Pisah `api/clients` (firebase/http) dan `api/repositories` (domain) agar mudah tukar sumber (dummy vs live)
- Tambah flag env untuk switching data source

