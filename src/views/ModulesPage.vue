<template>
  <v-main>
    <v-container fluid class="pa-0">
      <v-row justify="center" align="center" class="py-0 my-0">
        <v-col md="12" lg="11" sm="11" xs="12">
          <!-- Header -->
          <v-container fluid class="my-0 py-0">
            <v-row justify="center" align="center">
              <v-col md="8" sm="7" cols="12">
                <p class="google-font mb-2" style="font-weight: 600; font-size: 200%">
                  <b>Modul <span class="aura-text">Pembelajaran</span></b>
                </p>
                <p class="google-font mt-0 mb-4" style="font-size: 100%">
                  Temukan berbagai modul yang dirancang untuk meningkatkan keterampilan, mengembangkan potensi, dan
                  memperluas wawasan profesional Anda.
                </p>
                <p class="google-font mb-0" style="font-size: 95%">
                  Butuh bantuan? Hubungi kami di
                  <a :href="`mailto:${config.generalConfig.email}`" class="aura-text"
                    style="text-decoration: none; color: #1565c0">
                    {{ config.generalConfig.email }}
                  </a>
                </p>
              </v-col>

              <v-col md="4" sm="5" cols="12">
                <v-img width="80%" style="margin: auto" :src="require('@/assets/img/common/events.png')"
                  alt="Ilustrasi Modul Pembelajaran"></v-img>
              </v-col>
            </v-row>
          </v-container>
          <!-- Header -->

          <!-- Feature Events (ganti konteks ke modul unggulan) -->
          <FeatureModules class="my-10" />
          <!-- Feature Events -->
        </v-col>
      </v-row>
    </v-container>

    <!-- Past Events (ganti konteks ke modul sebelumnya) -->
    <v-container fluid class="py-2 mt-8 mb-8">
      <v-row justify="center" align="center">
        <v-col md="12" lg="11" sm="11" xs="12" class="py-0">
          <ModuleList />
        </v-col>
      </v-row>
    </v-container>
    <!-- Past Events -->
  </v-main>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "EventsPage",
  components: {
    FeatureModules: () => import("@/components/home/FeaturesModules"),
    ModuleList: () => import("@/components/events/PastEvents"),
  },
  computed: {
    ...mapState(["config"]),
  },
  data: () => ({}),
};
</script>
