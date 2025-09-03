<template>
  <v-main
    class="hidden-sm-and-down py-0 my-0"
    :class="$vuetify.theme.dark ? 'grey darken-4' : 'white'"
    v-if="Object.keys(config).length"
  >
    <v-container fluid class="pa-0 ma-0">
      <v-row align="center" justify="center" class="my-0 py-0">
        <v-col cols="12" md="11" lg="11" sm="11" class="py-0 my-0">
          <v-divider v-if="!$vuetify.theme.dark"></v-divider>
          <CommunitySocialInfo :config="config" />
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <v-row align="start" justify="center" class="mt-3">
        <v-col cols="12" md="11" lg="11" sm="11" class="my-0 py-0">
          <v-container fluid class="pa-0 my-0">
            <v-row justify="start">
              <v-col
                v-for="section in footerSections"
                :key="section.key"
                cols="12"
                sm="4"
                md="3"
                lg="3"
                class="py-2"
              >
                <p class="google-font mb-1" style="font-size: 120%; font-weight: 300">
                  <b>{{ section.title }}</b>
                </p>
                <div v-for="(item, i) in section.links" :key="i">
                  <router-link
                    v-if="isInternal(item.link)"
                    :to="item.link"
                    class="google-font my-3"
                    :class="$vuetify.theme.dark ? 'aura-darkThemeTextLink' : 'aura-lightThemeTextLink'"
                    style="text-decoration: none; font-size: 100%"
                    :aria-label="item.linkname"
                  >
                    {{ item.linkname }}
                  </router-link>
                  <a
                    v-else
                    :href="item.link"
                    rel="noreferrer"
                    target="_blank"
                    class="google-font my-3"
                    :class="$vuetify.theme.dark ? 'aura-darkThemeTextLink' : 'aura-lightThemeTextLink'"
                    style="text-decoration: none; font-size: 100%"
                    :aria-label="item.linkname"
                  >
                    {{ item.linkname }}
                  </a>
                  <br />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>

      <v-row align="center" justify="center" class="mb-0">
        <v-col cols="12" md="11" lg="11" sm="11" class="px-0 mx-0">
          <v-divider></v-divider>
          <v-toolbar
            text
            class="pa-0 px-0 mt-3 mx-0 elevation-0"
            style="padding: 0 !important"
            :class="$vuetify.theme.dark ? 'grey darken-4' : 'white'"
          >
            <v-toolbar-title class="google-font pl-0 ml-0 mr-3 mb-0" style="font-size: 150%">
              {{ config.generalConfig.shortName || config.generalConfig.name || '' }}
            </v-toolbar-title>
            <v-btn
              v-for="(item, i) in bottomLinks"
              :key="i"
              rounded
              small
              :to="isInternal(item.link) ? item.link : undefined"
              :href="!isInternal(item.link) ? item.link : undefined"
              :target="!isInternal(item.link) ? '_blank' : undefined"
              rel="noreferrer"
              class="ml-0 mr-3 google-font hidden-sm-and-down"
              style="text-transform: capitalize"
              text
              :aria-label="item.linkname"
            >
              {{ item.linkname }}
            </v-btn>
            <v-spacer></v-spacer>
            <p class="google-font mb-0" style="font-size: 110%">
              © {{ currentYear }} {{ config.generalConfig.name }} · Dibangun di atas
              <span class="aura-text">
                <a
                  href="https://github.com/gdg-x/aura/"
                  target="_blank"
                  rel="noreferrer"
                  style="text-decoration: none; cursor: pointer"
                  class="aura-text"
                >
                  Project Aura
                </a>
              </span>
            </p>
          </v-toolbar>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AppFooter",
  components: {
    CommunitySocialInfo: () =>
      import("@/components/common/CommunitySocialInfo"),
  },
  data: () => ({
    preferredOrder: [
      'Tamasuma Platform',
      'About',
      'Resources',
      'Legal & Guidelines',
      'Developer Console'
    ],
    titleMap: {
      'Tamasuma Platform': 'Platform Tamasuma',
      'About': 'Tentang Tamasuma',
      'Resources': 'Sumber Daya',
      'Legal & Guidelines': 'Legal & Pedoman',
      'Developer Console': 'Konsol Pengembang'
    }
  }),
  computed: {
    ...mapState(["config"]),
    footerSections() {
      const cfg = this.config.footerConfig || {}
      const keys = Object.keys(cfg)
      // Sort keys by preferred order; unknown keys go last
      const sorted = keys.sort((a, b) => {
        const ia = this.preferredOrder.indexOf(a)
        const ib = this.preferredOrder.indexOf(b)
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib)
      })
      return sorted
        .filter(k => Array.isArray(cfg[k]) && cfg[k].length)
        .map(k => ({ key: k, title: this.titleMap[k] || k, links: cfg[k] }))
    },
    bottomLinks() {
      const cfg = this.config.footerConfig || {}
      if (Array.isArray(cfg['Footer End Session Link']) && cfg['Footer End Session Link'].length) {
        return cfg['Footer End Session Link']
      }
      if (Array.isArray(cfg['Legal & Guidelines']) && cfg['Legal & Guidelines'].length) {
        return cfg['Legal & Guidelines']
      }
      return []
    },
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    isInternal(link) {
      return typeof link === 'string' && link.startsWith('/')
    }
  }
};
</script>
