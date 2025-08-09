import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import generalFunctions from './functions/generalFunctions'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.mixin(generalFunctions)
app.mount('#app')
