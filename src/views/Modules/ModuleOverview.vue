<template>
  <v-main class="pa-0 ma-0 google-font">
    <v-container fluid class="py-0 my-0 mt-0">
      <v-row class="py-0 my-0" align="center" justify="center">
        <v-col cols="12" class="pa-0">
          <v-img
            :src="moduleDetails.image || 'https://placehold.co/1200x360?text=Module'"
            height="480"
            cover
            class="rounded-xl hero-img"
            gradient="to bottom, rgba(0,0,0,.2), rgba(0,0,0,.55)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
            <div class="hero-overlay">
              <div class="hero-header">
                <h1 class="white--text hero-title">{{ moduleDetails.name }}</h1>
                <p class="white--text hero-sub">{{ brandName }} • Mulai {{ convtDate(moduleDetails.date) }}</p>
                <div class="chip-row">
                  <v-chip small outlined color="white" text-color="white" class="mr-2 mb-2">
                    <v-icon left small color="white">mdi-signal</v-icon>
                    {{ moduleDetails.difficulty || 'Umum' }}
                  </v-chip>
                  <v-chip small outlined color="white" text-color="white" class="mr-2 mb-2">
                    <v-icon left small color="white">mdi-translate</v-icon>
                    {{ (moduleDetails.language || 'id').toUpperCase() }}
                  </v-chip>
                  <v-chip v-if="moduleDetails.durationHours" small outlined color="white" text-color="white" class="mr-2 mb-2">
                    <v-icon left small color="white">mdi-timer</v-icon>
                    {{ moduleDetails.durationHours }} jam
                  </v-chip>
                </div>
              </div>
            </div>
          </v-img>
        </v-col>

        <v-col cols="12" class="pa-0">
          <v-sheet :color="themeSheetColor" rounded="xl" class="pa-5 mt-4">
            <v-row class="mb-1" align="center">
              <v-col cols="12" md="8" class="py-2">
                <div class="meta-row">
                  <span class="mr-5 d-inline-flex align-center">
                    <v-icon class="mr-1">mdi-calendar</v-icon>{{ convtDate(moduleDetails.date) }}
                  </span>
                  <span class="mr-5 d-inline-flex align-center" v-if="moduleDetails.time">
                    <v-icon class="mr-1">mdi-clock-outline</v-icon>{{ moduleDetails.time.starttime }} - {{ moduleDetails.time.endtime }}
                  </span>
                  <span class="mr-5 d-inline-flex align-center" v-if="moduleDetails.venue">
                    <v-icon class="mr-1">mdi-map-marker-outline</v-icon>
                    <a :href="moduleDetails.venue.googlemapsurl" target="_blank" style="text-decoration:none">{{ moduleDetails.venue.name }}</a>
                  </span>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="py-2 text-md-right">
                <div class="d-flex flex-wrap justify-end">
                  <v-chip
                    v-for="(tag, i) in (moduleDetails.hashtags || [])"
                    :key="'t'+i"
                    small
                    class="mr-1 mb-1"
                    :href="'https://twitter.com/hashtag/' + tag"
                    target="_blank"
                  >
                    #{{ tag }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>

            <h2 class="section-title mb-2">Tentang Modul</h2>
            <div class="mb-4 body-text" v-html="moduleDetails.des"></div>

            <div class="action-row mt-6">
              <v-btn
                v-if="moduleDetails?.links?.registration"
                :href="moduleDetails.links.registration"
                target="_blank"
                color="white"
                class="google-font primary--text mr-2 mb-2"
                rounded
                elevation="2"
              >
                <v-icon left color="primary">mdi-checkbox-marked-circle-outline</v-icon>
                Daftar
              </v-btn>
              <v-btn v-else disabled color="white" class="mr-2 mb-2 grey--text text--darken-1" rounded elevation="0">
                Pendaftaran belum dibuka
              </v-btn>

              <v-btn v-if="moduleDetails?.links?.callforspeaker" :href="moduleDetails.links.callforspeaker" target="_blank" rounded outlined class="mr-2 mb-2">
                <v-icon left>mdi-bullhorn</v-icon>
                Call For Speakers
              </v-btn>

              <v-btn v-if="moduleDetails?.links?.feedback" :href="moduleDetails.links.feedback" target="_blank" rounded outlined class="mr-2 mb-2">
                <v-icon left>mdi-message-text-outline</v-icon>
                Feedback
              </v-btn>

              <v-btn v-if="moduleDetails?.links?.youtube" :href="moduleDetails.links.youtube" target="_blank" rounded outlined class="mr-2 mb-2">
                <v-icon left color="red">mdi-youtube</v-icon>
                Youtube
              </v-btn>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="mt-4 mb-6">
      <v-row>
        <v-col md="6" cols="12" class="pb-4 pb-md-0">
          <v-sheet :color="themeSheetColor" rounded="xl" class="pa-5">
            <p class="mb-3 section-title">Speakers</p>
            <v-row>
              <v-col md="6" cols="12" class="pa-1" v-for="(item, index) in moduleSpeakers" :key="index">
                <v-list two-line dense rounded>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img :src="checkExistance(item.image, 0) ? item.image : require('@/assets/img/donotremove/profile.jpg')" />
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <div>
                        <p class="mb-1">{{ item.name }}</p>
                        <p class="mb-0" style="font-size: 80%">{{ item.designation }}</p>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            <div class="text-right mt-2">
              <v-btn rounded text class="google-font" :to="'/modules/' + $route.params.id + '/speakers'">
                Selengkapnya
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-sheet>
        </v-col>

        <v-col md="6" cols="12">
          <v-sheet :color="themeSheetColor" rounded="xl" class="pa-5">
            <p class="mb-3 section-title">Partners</p>
            <v-row class="pa-0" align="center" v-if="checkExistance(moduleDetails.partners, 0)">
              <v-col cols="6" sm="4" class="pa-2" v-for="(item, i) in modulePartners" :key="i">
                <a :href="item.socialLinks.web" target="_blank" style="text-decoration:none">
                  <v-img
                    :src="getImgUrl(item.image, 'noimage.jpg')"
                    :lazy-src="getImgUrl(item.image, 'noimage.jpg')"
                    width="100%"
                    height="80"
                    contain
                    class="rounded"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5" />
                      </v-row>
                    </template>
                  </v-img>
                </a>
              </v-col>
            </v-row>
            <div class="text-right mt-2">
              <v-btn rounded text class="google-font" :to="'/modules/' + $route.params.id + '/partners'">
                Selengkapnya
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import service from "@/services/appservices";
export default {
  name: "ModuleOverview",
  props: ["moduleDetails"],
  data: () => ({
    moduleSpeakers: [],
    SpeakersData: [],
    modulePartners: [],
    partnersData: [],
  }),
  computed: {
    ...mapState(["config"]),
    brandName() {
      return this.config?.generalConfig?.name || 'Tamasuma'
    },
    themeSheetColor() {
      return this.$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-5'
    }
  },
  mounted() {
    this.getAllSpeakers();
    this.getAllPartners();
  },
  methods: {
    getAllSpeakers() {
      this.isLoading = true;
      this.moduleSpeakers = [];
      service
        .getAllSpeakers()
        .then((res) => {
          if (res.success == true) {
            this.SpeakersData = res.data;
            this.moduleDetails.speakers.map((s) => {
              this.SpeakersData.map((obj) => {
                if (obj.id == s) {
                  this.moduleSpeakers.push(obj);
                }
              });
            });
            this.moduleSpeakers = this.getRandomElements(this.moduleSpeakers, 4);
          }
          this.isLoading = false;
        })
        .catch((e) => {
          this.ErrorMsg = e;
          this.isLoading = false;
        });
    },
    getAllPartners() {
      this.isLoading = true;
      this.modulePartners = [];
      service
        .getAllPartners()
        .then((res) => {
          if (res.success) {
            this.partnersData = res.data;
            this.moduleDetails.partners.map((p) => {
              this.partnersData.map((obj) => {
                if (obj.id == p) {
                  this.modulePartners.push(obj);
                }
              });
            });
            this.modulePartners = this.getRandomElements(this.modulePartners, 4);
          }
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
    getRandomElements(arr, count) {
      const shuffled = arr.slice().sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    },
    convtDate(d) {
      try {
        const date = new Date(d)
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
      } catch (_) {
        return d
      }
    },
  },
};
</script>

<style scoped>
.hero-img { position: relative; }
.hero-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; }
.hero-header { width: 100%; padding: 16px 20px 22px 20px; }
.hero-title { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
.hero-sub { opacity: 0.9; margin-bottom: 12px; }
.chip-row { display: flex; flex-wrap: wrap; }
.section-title { font-weight: 650; font-size: 1.25rem; }
.body-text { font-size: 0.98rem; opacity: 0.95; }
.action-row .v-btn { transition: transform .15s ease; }
.action-row .v-btn:hover { transform: translateY(-1px); }
</style>
