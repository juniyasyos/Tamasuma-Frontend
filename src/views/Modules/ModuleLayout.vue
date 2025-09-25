<template>
  <v-main class="hidden-x">
    <ModuleToolbar :moduleName="moduleData.name" />
    <ModuleDrawer />

    <!-- Loading: neutral skeletons (no heavy primary) -->
    <v-container v-if="loader" fluid class="py-6">
      <v-row>
        <v-col cols="12">
          <v-sheet :elevation="0" rounded="xl" class="pa-6" :color="themeSheetColor">
            <v-skeleton-loader type="image, heading, text, chip@3, actions" />
          </v-sheet>
        </v-col>
        <v-col cols="12" class="mt-4">
          <v-skeleton-loader type="article@2" />
        </v-col>
      </v-row>
    </v-container>

    <!-- Loaded -->
    <v-container v-else fluid class="py-0">
      <!-- Content -->
      <v-row>
        <v-col cols="12" class="my-0 py-0">
          <v-slide-y-reverse-transition>
            <router-view :moduleDetails="moduleData" v-show="show" />
          </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
    </v-container>

    <!-- Mobile share FAB (subtle color) -->
    <v-fab-transition>
      <v-btn
        app
        dark
        fab
        class="hidden-sm-and-up"
        @click="shareModule"
        bottom
        fixed
        right
        color="grey darken-3"
      >
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-main>
</template>

<script>
import service from "@/services/appservices";
import { mapState } from "vuex";
export default {
  name: "ModuleLayoutPage",
  components: {
    ModuleToolbar: () => import("@/components/modules/ModuleToolbar"),
    ModuleDrawer: () => import("@/components/modules/ModuleDrawer"),
  },
  data: () => ({
    show: false,
    notFound: 0,
    moduleData: {},
    loader: true,
  }),
  mounted() {
    this.getModuleInfo();
  },
  computed: {
    ...mapState(["config"]),
    brandName() {
      return this.config?.generalConfig?.name || "Tamasuma";
    },
    isOverview() {
      return this.$route?.name === 'ModuleOverview';
    },
    heroImage() {
      return this.moduleData?.image || 'https://placehold.co/1200x360?text=Module';
    },
    themeSheetColor() {
      return this.$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4';
    }
  },
  methods: {
    getModuleInfo() {
      this.loader = true;
      this.moduleData = {};
      service
        .getModule(this.$route.params.id)
        .then((res) => {
          if (res.success) {
            if (res.data.visible) {
              this.moduleData = res.data;
              this.loader = false;
              document.title = this.moduleData.name + " | ";
              if (this.config?.generalConfig?.name) {
                document.title += this.config.generalConfig.name;
              } else {
                document.title += "Tamasuma";
              }
            } else {
              this.loader = false;
              this.$router.push({ path: "/modules" });
            }
          } else {
            this.loader = false;
            this.$router.push({ path: "/modules" });
          }
        })
        .catch((e) => {
          this.loader = false;
          console.log(e);
        });
    },
    convtDate(d) {
      try {
        const dt = new Date(d)
        return dt.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      } catch (_) {
        return d
      }
    },
    shareModule() {
      if (navigator.share) {
        navigator
          .share({
            title: `${this.moduleData.name} - ${this.brandName}`,
            url: `${window.location.href}`,
            text: `${this.moduleData.name} • ${this.brandName}`,
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        try {
          const url = window.location.href
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(url)
            alert('Tautan disalin ke clipboard')
          } else {
            alert(url)
          }
        } catch (_) {
          alert('Bagikan tidak didukung di browser Anda')
        }
      }
    },
  },
  created() {
    this.show = true;
  },
  watch: {
    '$route.params.id'(n, o) {
      if (n !== o) this.getModuleInfo()
    }
  }
};
</script>

<style scoped>
.google-font { font-family: google-sans; }
.hero-img { position: relative; }
.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
}
.hero-header {
  width: 100%;
  padding: 16px 20px 20px 20px;
}
.hero-title { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
.hero-sub { opacity: 0.9; margin-bottom: 12px; }
.chip-row { display: flex; flex-wrap: wrap; margin-bottom: 12px; }
.hero-actions .v-btn { transition: transform .15s ease; }
.hero-actions .v-btn:hover { transform: translateY(-1px); }
</style>
