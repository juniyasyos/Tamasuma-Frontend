import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// ✅ Helper: Load component secara dinamis
const loadView = (view) => () => import(`../views/${view}`)

// ✅ Helper: Tambahkan meta default + custom
const withMeta = (meta = {}) => ({
  meta: {
    color: '#0277bd',
    ...meta
  }
})

// ✅ Halaman dasar yang memiliki pola serupa
const basicPages = ['Speakers', 'Partners', 'Volunteers', 'Blogs', 'Contact']

const basicRoutes = basicPages.map((page) => ({
  path: `/${page.toLowerCase()}`,
  name: page,
  component: loadView(`${page}Page.vue`),
  ...withMeta({ title: page })
}))

// ✅ Route utama
const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadView('HomePage.vue'),
    ...withMeta({ title: 'Home' })
  },
  {
    path: '/about',
    name: 'About',
    component: loadView('AboutPage.vue'),
    ...withMeta({ title: 'About' })
  },
  {
    path: '/team',
    name: 'Team',
    component: loadView('TeamPage.vue'),
    ...withMeta({ title: 'Team' })
  },
  {
    path: '/team/:id',
    name: 'TeamDetails',
    component: loadView('Team/TeamDetails.vue'),
    ...withMeta({ title: 'Team Details' })
  },
  {
    path: '/modules',
    name: 'Modules',
    component: loadView('ModulesPage.vue'),
    ...withMeta({ title: 'Modules' })
  },
  {
    path: '/modules/:id',
    name: 'CustomModule',
    component: loadView('Modules/MainView.vue'),
    children: [
      {
        path: '/',
        name: 'CustomModuleHome',
        component: loadView('Modules/About.vue'),
        meta: { isModule: true }
      },
      {
        path: 'materials',
        name: 'CustomModuleMaterials',
        component: loadView('Modules/Materials.vue'),
        meta: { isModule: true }
      },
      {
        path: 'assignments',
        name: 'CustomModuleAssignments',
        component: loadView('Modules/Assignments.vue'),
        meta: { isModule: true }
      },
      {
        path: 'discussions',
        name: 'CustomModuleDiscussions',
        component: loadView('Modules/Discussions.vue'),
        meta: { isModule: true }
      },
      {
        path: 'resources',
        name: 'CustomModuleResources',
        component: loadView('Modules/Resources.vue'),
        meta: { isModule: true }
      },
      {
        path: '',
        name: 'redirectCustomModule',
        redirect: '/',
        meta: { isModule: true }
      }
    ]
  },

  // {
  //   path: '/events',
  //   name: 'Events',
  //   component: loadView('EventsPage.vue'),
  //   ...withMeta({ title: 'Events' })
  // },
  // {
  //   path: '/events/:id',
  //   name: 'CustomEvent',
  //   component: loadView('Events/MainView.vue'),
  //   children: [
  //     {
  //       path: '/',
  //       name: 'CustomEventHome',
  //       component: loadView('Events/About.vue'),
  //       meta: { isEvent: true }
  //     },
  //     {
  //       path: 'speakers',
  //       name: 'CustomEventSpeaker',
  //       component: loadView('Events/Speaker.vue'),
  //       meta: { isEvent: true }
  //     },
  //     {
  //       path: 'team',
  //       name: 'CustomEventTeam',
  //       component: loadView('Events/Team.vue'),
  //       meta: { isEvent: true }
  //     },
  //     {
  //       path: 'schedule',
  //       name: 'CustomEventSchedule',
  //       component: loadView('Events/Schedule.vue'),
  //       meta: { isEvent: true }
  //     },
  //     {
  //       path: 'partners',
  //       name: 'CustomEventPartners',
  //       component: loadView('Events/Partners.vue'),
  //       meta: { isEvent: true }
  //     },
  //     {
  //       path: '',
  //       name: 'redirectCustomEvent',
  //       redirect: 'about',
  //       meta: { isEvent: true }
  //     }
  //   ]
  // },
  {
    path: '/speakers/:id',
    name: 'SpeakersDetails',
    component: loadView('Speakers/SpeakerDetails.vue'),
    ...withMeta({ title: 'Speakers' })
  },
  ...basicRoutes,
  {
    path: '*',
    name: 'Redirect',
    redirect: '/',
    ...withMeta({ title: 'Redirect' })
  }
]

// ✅ Konfigurasi Vue Router
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes
})

// ✅ Middleware sebelum setiap route
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    const name = localStorage.getItem('name') || 'App'
    document.title = `${to.meta.title} | ${name}`
  }
  next()
})

export default router
