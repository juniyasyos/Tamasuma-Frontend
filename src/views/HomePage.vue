<template>
  <v-main>
    <v-container fluid class="my-0">
      <v-row justify="center" align="center">
        <v-col md="12" lg="11" sm="11" xs="11" class="my-5">
          <HomeStartScreen class="mt-0 mb-15" />
          <WhatWeDo />
          <AboutCommunity class="mt-5" />
          <featureModules v-if="showFeatureModuleStatus" class="my-15" />
          <partners class="my-15" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import service from "@/services/appservices";
import { mapState } from "vuex";

export default {
  name: "HomePage",
  components: {
    HomeStartScreen: () => import("@/components/home/HomeStartScreen"),
    WhatWeDo: () => import("@/components/home/WhatWeDo"),
    AboutCommunity: () => import("@/components/home/AboutCommunity"),
    featureModules: () => import("@/components/home/FeaturesModules"),
    partners: () => import("@/components/common/Partners"),
  },
  data: () => ({
    showFeatureModuleStatus: false,
  }),
  mounted() {
    this.getFeaturesEvent();
  },
  computed: {
    ...mapState(["config"]),
  },
  methods: {
    getFeaturesEvent() {
      service.getFeaturesEvents().then((res) => {
        res.success
          ? res.data.length > 0
            ? (this.showFeatureModuleStatus = true)
            : (this.showFeatureModuleStatus = false)
          : (this.notFound = true);
      });
    },
  },
};
</script>
