<template>
  <v-main class="hidden-x">
    <ModuleToolbar :moduleName="moduleData.name" />
    <ModuleDrawer />
    <v-main class="" v-if="loader">
      <v-container fluid class="fill-height">
        <v-row justify="start" align="start" class>
          <v-col cols="12" md="12" class="text-center">
            <v-progress-circular
              :width="5"
              :size="50"
              color="indigo"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-main v-else class="pa-0 ma-0" :class="this.$vuetify.theme.dark ? 'black' : 'white'">
      <v-container fluid>
        <v-row align="start" justify="start">
          <v-col cols="12" sm="12" md="11" lg="11" xl="11" class="my-0 py-0">
            <v-slide-y-reverse-transition>
              <router-view :moduleDetails="moduleData" v-show="show" />
            </v-slide-y-reverse-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
        color="indigo"
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
              document.title = this.moduleData.name + " | " + this.config.generalConfig.name;
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
    shareModule() {
      if (navigator.share) {
        navigator
          .share({
            title: `${this.moduleData.name} - ${this.config.generalConfig.name}`,
            url: `${window.location.href}`,
            text: `${this.moduleData.name} by ${this.config.generalConfig.name} — check this out!`,
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        alert("Not supporting in your browser");
      }
    },
  },
  created() {
    this.show = true;
  },
};
</script>
