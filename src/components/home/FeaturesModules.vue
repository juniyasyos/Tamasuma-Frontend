<template>
  <v-container fluid class="mb-1">
    <v-row align="center" justify="center">
      <v-col cols="12" class="mb-2 d-flex align-center justify-space-between">
        <div>
          <p class="google-font mb-1 mt-0 section-title">{{ sectionTitle }}</p>
          <p class="google-font mt-0 mb-0 section-subtitle">
            {{ sectionSubtitle }}
          </p>
        </div>
        <div v-if="variant === 'dashboard'">
          <AppButton variant="text" color="primary" class="google-font" to="/modules" iconRight="mdi-arrow-right">
            Lihat Semua Modul
          </AppButton>
        </div>
      </v-col>

      <v-col cols="12" class="mt-0 pt-0 pa-0">
        <v-container fluid class="py-0 my-0">
          <!-- Loading -->
          <v-row class="py-0 my-0" v-if="loading && !notFound">
            <v-col v-for="i in 4" :key="i" cols="12" sm="6" md="4" lg="3" class="pa-2 d-flex">
              <v-sheet :elevation="0" rounded="lg" class="flex-grow-1"
                :color="`grey ${theme.isDark ? 'darken-3' : 'lighten-4'}`">
                <v-skeleton-loader class="mx-auto" type="image, heading, text, actions"></v-skeleton-loader>
              </v-sheet>
            </v-col>
          </v-row>

          <!-- Empty -->
          <v-row class="py-8 my-4 text-center" v-else-if="notFound">
            <v-col cols="12">
              <v-img :src="require('@/assets/img/common/DataNotFound.svg')" width="160" class="mx-auto mb-4" />
              <p class="google-font mb-2" style="font-size: 115%">Belum ada modul unggulan</p>
              <p class="google-font mb-4" style="opacity: 0.8">
                Silakan kembali nanti untuk melihat pembaruan modul.
              </p>
              <v-btn color="primary" rounded to="/modules" class="google-font">Jelajahi Modul</v-btn>
            </v-col>
          </v-row>

          <!-- Content -->
          <v-row v-else class="py-0 my-0 px-1">
            <v-col v-for="(item, i) in featureModulesData" :key="item.id || i" cols="12" sm="6" md="4" lg="3"
              class="pa-2 d-flex">
              <v-card class="module-card flex-grow-1" :elevation="3" color="grey lighten-5" rounded="lg"
                @click="goToModule(item.id)">
                <div class="image-container">
                  <v-img :src="item.image || 'https://placehold.co/600x400?text=Module'" height="180" cover
                    class="rounded-t-lg">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="primary" />
                      </v-row>
                    </template>
                    <div class="image-overlay">
                      <v-chip small color="primary" class="ma-2">
                        <v-icon left small>mdi-play-circle</v-icon>
                        Mulai Belajar
                      </v-chip>
                    </div>
                  </v-img>
                </div>

                <v-card-text class="pa-4">
                  <h3 class="google-font module-title mb-2">{{ item.name }}</h3>
                  <div class="google-font caption grey--text mb-3 d-flex align-center">
                    <v-icon small class="mr-1" color="grey">mdi-calendar</v-icon>
                    Mulai {{ formatDate(item.date) }}
                  </div>
                  <div class="chip-row">
                    <v-chip v-for="(tag, t) in (item.hashtags || []).slice(0, 3)" :key="t" x-small class="mr-1 mt-1"
                      :color="getChipColor(t)" text-color="white" @click.stop>
                      #{{ tag }}
                    </v-chip>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import service from "@/services/appservices";
import AppButton from "@/components/ui/AppButton";
export default {
  name: "App",
  inject: ["theme"],
  components: {
    // featureEventCard: () => import("@/components/home/FeatureEventCard")
    AppButton,
  },
  props: {
    // Gunakan 'dashboard' untuk ditampilkan di beranda (tampilkan CTA)
    // Gunakan 'page' untuk halaman /modules (sembunyikan CTA "Lihat Semua Modul")
    variant: {
      type: String,
      default: 'dashboard'
    }
  },
  data: () => ({
    loading: true,
    notFound: false,
    FeaturesEventID: [],
    AllCustomEvents: [],
    eData: [],
    featureModulesData: [],
  }),
  mounted() {
    if (this.variant === 'page') {
      this.getAllModulesForPage()
    } else {
      this.getFeaturesEventID()
    }
  },
  methods: {
    goToModule(id) {
      this.$router.push(`/modules/${id}`);
    },
    formatDate(d) {
      try { return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) } catch (_) { return d }
    },
    getChipColor(index) {
      const colors = ['success', 'warning', 'error', 'info', 'purple', 'teal']
      return colors[index % colors.length]
    },
    getAllCustomEvents() {
      this.featureModulesData = [];
      service.getAllCustomEvents().then((res) => {
        if (res.success) {
          this.loading = false;
          this.AllCustomEvents = res.data;

          this.FeaturesEventID.map((res) => {
            this.AllCustomEvents.map((obj) => {
              if (obj.id == res) {
                this.featureModulesData.push(obj);
              }
            });
          });
          this.featureModulesData = this.featureModulesData
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4) // maksimal 4 modul unggulan di dashboard
        }
      });
    },
    getAllModulesForPage() {
      this.loading = true
      this.featureModulesData = []
      service.getAllCustomEvents().then((res) => {
        if (res.success) {
          this.AllCustomEvents = res.data || []
          this.featureModulesData = this.AllCustomEvents.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          )
          this.notFound = this.featureModulesData.length === 0
        } else {
          this.notFound = true
        }
        this.loading = false
      })
    },
    getFeaturesEventID() {
      this.loading = true;
      service.getFeaturesEvents().then((res) => {
        if (res.success) {
          this.notFound = false;
          this.FeaturesEventID = res.data;
          if (this.FeaturesEventID.length > 0) this.getAllCustomEvents();
          else {
            this.notFound = true;
            this.loading = false;
          }
        } else {
          this.notFound = true;
          this.loading = false;
        }
      });
    },
  },
  computed: {
    sectionTitle() {
      return this.variant === 'page' ? 'Semua Modul' : 'Modul Unggulan'
    },
    sectionSubtitle() {
      return this.variant === 'page'
        ? 'Daftar lengkap modul pembelajaran Tamasuma.'
        : 'Rekomendasi modul terkurasi untuk pengembangan kompetensi pendidik.'
    }
  }
};
</script>

<style scoped>
.section-title {
  font-weight: 650;
  font-size: 1.6rem;
}

.section-subtitle {
  font-size: 0.95rem;
  opacity: 0.85;
}

.module-card {
  border-radius: 16px;
  cursor: pointer;
  transition: all .3s ease;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
}

.module-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(25, 118, 210, 0.15);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity .3s ease;
}

.module-card:hover .image-overlay {
  opacity: 1;
}

.module-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  transition: color .2s ease;
}

.module-card:hover .module-title {
  color: #1976d2 !important;
}

.chip-row {
  min-height: 28px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.google-font {
  font-family: google-sans;
}

.theme--dark .module-card {
  background: linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%);
}

.theme--dark .module-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
</style>
