import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/config/firebase'

// Optional: Import modules
// import auth from './modules/auth'

Vue.use(Vuex)

// Nav item data config
const navItemsData = [
  { text: 'Home', to: '/', icon: 'mdi-circle-double', showToolbar: true, showBottomNav: true },
  // { text: 'Events', to: '/events', icon: 'mdi-flag-outline', showToolbar: true, showBottomNav: true },
  { text: 'Modules', to: '/modules', icon: 'mdi-view-grid-outline', showToolbar: true, showBottomNav: true },
  { text: 'Team', to: '/team', icon: 'mdi-account-group-outline', showToolbar: true, showBottomNav: true },
  { text: 'Speakers', to: '/speakers', icon: 'mdi-account-multiple-outline', showToolbar: true, showBottomNav: false },
  { text: 'About', to: '/about', icon: 'mdi-lightbulb-outline', showToolbar: true, showBottomNav: true },
  { text: 'Contact', to: '/contact', icon: 'mdi-card-account-mail-outline', showToolbar: true, showBottomNav: true },
  { text: 'Partners', to: '/partners', icon: 'mdi-currency-usd', showToolbar: false, showBottomNav: false },
  { text: 'Blogs', to: '/blogs', icon: 'mdi-newspaper-variant-multiple-outline', showToolbar: true, showBottomNav: false },
]

export default new Vuex.Store({
  state: {
    drawer: false,
    eventDrawer: true,
    config: {
      generalConfig: {
        socialLinks: {}
      },
      keysandsecurity: {},
      footerConfig: {},
    },
    items: navItemsData.map(item => ({
      ...item,
      meta: {
        showToolbar: item.showToolbar,
        showBottomNav: item.showBottomNav
      }
    }))
  },

  getters: {
    links: state => state.items,
    toolbarLinks: state => state.items.filter(i => i.meta.showToolbar),
    bottomNavLinks: state => state.items.filter(i => i.meta.showBottomNav),
  },

  mutations: {
    setDrawer: (state, payload) => { state.drawer = payload },
    toggleDrawer: state => { state.drawer = !state.drawer },

    setEventDrawer: (state, payload) => { state.eventDrawer = payload },
    toggleEventDrawer: state => { state.eventDrawer = !state.eventDrawer },

    setGeneralConfig: (state, payload) => {
      state.config.generalConfig = payload
      if (payload.name) localStorage.setItem('name', payload.name)
    },
    setKeysAndSecurityConfig: (state, payload) => {
      state.config.keysandsecurity = payload
    },
    setFooterConfig: (state, payload) => {
      state.config.footerConfig = payload
    },
  },

  actions: {
    // Optional: kamu bisa buat actions async di sini
  },

  modules: {
    // auth,
    // events,
    // user,
  }
})
