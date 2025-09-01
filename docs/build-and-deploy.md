## Build & Deploy

### Scripts
- `npm run serve` → dev server
- `npm run build` → build production (PWA enabled)

### Optimisasi
- Nonaktifkan prefetch (mengurangi request idle)
- Nonaktifkan source map pada production (`productionSourceMap: false`)

### Deploy
- Hasil build di `dist/`
- Dapat dideploy ke static hosting (Firebase Hosting, Netlify, Vercel)
- Jika memakai SW update, komunikasikan bahwa update mungkin memerlukan refresh (snackbar sudah tersedia)

