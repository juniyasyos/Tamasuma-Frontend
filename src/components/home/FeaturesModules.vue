<template>
  <v-container fluid class="mb-1">
    <v-row align="center" justify="center">
      <v-col cols="12" class="mb-2 d-flex align-center justify-space-between">
        <div>
          <p class="google-font mb-1 mt-0 section-title">Modul Unggulan</p>
          <p class="google-font mt-0 mb-0 section-subtitle">
            Rekomendasi modul terkurasi untuk pengembangan kompetensi pendidik.
          </p>
        </div>
        <div>
          <AppButton
            variant="text"
            color="primary"
            class="google-font"
            to="/modules"
            iconRight="mdi-arrow-right"
          >
            Lihat Semua Modul
          </AppButton>
        </div>
      </v-col>

      <v-col cols="12" class="mt-0 pt-0 pa-0">
        <v-container fluid class="py-0 my-0">
          <!-- Loading -->
          <v-row class="py-0 my-0" v-if="loading && !notFound">
            <v-col v-for="i in 4" :key="i" cols="12" sm="6" md="4" lg="3" class="pa-2 d-flex">
              <v-sheet
                :elevation="0"
                rounded="lg"
                class="flex-grow-1"
                :color="`grey ${theme.isDark ? 'darken-3' : 'lighten-4'}`"
              >
                <v-skeleton-loader
                  class="mx-auto"
                  type="image, heading, text, actions"
                ></v-skeleton-loader>
              </v-sheet>
            </v-col>
          </v-row>

          <!-- Empty -->
          <v-row class="py-8 my-4 text-center" v-else-if="notFound">
            <v-col cols="12">
              <v-img
                :src="require('@/assets/img/common/DataNotFound.svg')"
                width="160"
                class="mx-auto mb-4"
              />
              <p class="google-font mb-2" style="font-size: 115%">Belum ada modul unggulan</p>
              <p class="google-font mb-4" style="opacity: 0.8">
                Silakan kembali nanti untuk melihat pembaruan modul.
              </p>
              <v-btn color="primary" rounded to="/modules" class="google-font"
                >Jelajahi Modul</v-btn
              >
            </v-col>
          </v-row>

          <!-- Content -->
          <v-row v-else class="py-0 my-0 px-1">
            <v-col
              v-for="(item, i) in featureModulesData"
              :key="item.id || i"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="pa-2 d-flex"
            >
              <v-card class="module-card flex-grow-1" :elevation="2" @click="goToModule(item.id)">
                <v-img
                  :src="item.image || 'https://placehold.co/600x400?text=Module'"
                  height="170"
                  cover
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5" />
                    </v-row>
                  </template>
                </v-img>

                <v-card-text class="pa-4">
                  <div class="google-font title mb-1 text--primary">{{ item.name }}</div>
                  <div class="google-font caption grey--text mb-3">
                    Mulai {{ convtDate(item.date) }}
                  </div>
                  <p class="google-font" style="font-size: 100%; color: #dee5f1">
                    <span v-for="(tag, t) in (item.hashtags || [])" :key="t">
                      <v-chip
                        :href="'https://twitter.com/hashtag/' + tag"
                        rel="noreferrer"
                        target="_blank"
                        small
                        class="mr-1 mt-1"
                        :color="$vuetify.theme.dark ? '#292929' : '#DEE5F1'"
                        @click.stop
                      >
                        #{{ tag }}
                      </v-chip>
                    </span>
                  </p>
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
  data: () => ({
    loading: true,
    notFound: false,
    FeaturesEventID: [],
    AllCustomEvents: [],
    eData: [],
    featureModulesData: [],
  }),
  mounted() {
    this.getFeaturesEventID();
  },
  methods: {
    goToModule(id) {
      this.$router.push(`/modules/${id}`);
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
          this.featureModulesData = this.featureModulesData.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        }
      });
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
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.module-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}
.title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
}
.chip-row {
  min-height: 24px;
}
.google-font {
  font-family: google-sans;
}
</style>
