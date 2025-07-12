/* eslint-disable no-console */
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        '✅ App is being served from cache by a service worker.'
      )
    },
    registered(registration) {
      console.log('📦 Service worker has been registered.')

      // Cek update secara berkala (misalnya tiap 1 jam)
      setInterval(() => {
        registration.update()
      }, 1000 * 60 * 60) // 1 jam
    },
    updatefound() {
      console.log('⬇️ New content is downloading...')
    },
    updated(registration) {
      console.log('🔁 New content is available; refreshing...')

      if (registration.waiting) {
        // Kirim pesan ke SW agar langsung aktif
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })

        // Reload halaman saat SW baru mengambil alih
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload()
        })
      }
    },
    cached() {
      console.log('📥 Content has been cached for offline use.')
    },
    offline() {
      console.log('📴 No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('❌ Error during service worker registration:', error)
    }
  })
}
