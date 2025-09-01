# Component Documentation Template

## Ringkasan
- Nama komponen: `ComponentName`
- Lokasi: `src/components/...`
- Tujuan: (1–2 kalimat)

## API Komponen
- Props: nama, tipe, default, deskripsi
- Slots: nama, deskripsi
- Events: nama, payload, kapan dipancarkan

## Ketergantungan
- Store (getters/mutations/actions) jika ada
- Router (navigasi) jika ada
- Komponen lain yang digunakan

## Perilaku & UX
- Interaksi pengguna utama (klik, hover, loading state, empty state)
- Responsif (breakpoints utama)

## Styling
- Kelas penting, style scoped, ketergantungan tema (dark/light)

## Contoh Penggunaan
```vue
<ComponentName :prop-a="..." @submit="handler" />
```

