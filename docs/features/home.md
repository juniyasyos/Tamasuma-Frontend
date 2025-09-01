## Feature: Home

### Komponen Utama
- `HomeStartScreen.vue`: hero section (brand, tagline, hashtags, CTA)
- `WhatWeDo.vue`: highlight fokus/layanan
- `AboutCommunity.vue`: ringkasan komunitas/platform
- `FeaturesModules.vue`: modul unggulan (card grid)
- `components/common/Partners.vue`: daftar partner

### Data & Interaksi
- Hashtags, nama, deskripsi singkat diambil dari `store.config.generalConfig` (diinisialisasi oleh `App.vue` dari service `getAllConfig()`)
- `FeaturesModules` memuat ID modul unggulan dari `featureevents.json`, lalu memetakan ke entitas modul (`events.json`) dan mengurutkannya berdasarkan tanggal.

### UX & Responsif
- Skeleton loader pada daftar modul saat fetching
- Empty state ilustratif + CTA
- Card modul memuat gambar, nama, tanggal mulai, dan tags (chip hashtag) yang dapat diklik ke Twitter

