<template>
  <v-app-bar app :color="this.$vuetify.theme.dark ? 'black' : 'white'" flat>
    <v-app-bar-nav-icon class="d-md-none d-block d-lg-none" aria-label="Hamburger Menu"
      @click="toggleEventDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="google-font px-0" style="width: 280px">
      <router-link :to="'/modules/' + $route.params.id + '/'" class="google-font" aria-label="Module homepage"
        style="text-decoration: none; font-size: 110%"
        :class="this.$vuetify.theme.dark ? 'aura-event-whiteText' : 'aura-event-blackText'">{{ moduleName || ""
        }}</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn rounded text to="/modules" class="ml-1 aura-btn" dark aria-label="Back to modules">
      All Modules
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "ModuleToolbar",
  props: ["moduleName"],
  methods: {
    ...mapMutations(["toggleEventDrawer"]),
  },
};
</script>
