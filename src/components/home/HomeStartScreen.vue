<template>
  <v-container fluid class="py-0">
    <v-row align="center" justify="center">
      <v-col md="8" cols="12" order-md="1" order="2">
        <v-avatar color="#F1F2F3" class="mr-2">
          <v-img
            alt="Community Logo"
            class="shrink google-font"
            contain
            :src="require('@/assets/img/icon-tamasuma.png')"
            transition="scale-transition"
            width="100"
          />
        </v-avatar>

        <span
          class="google-font mb-0 my-auto"
          style="font-size: 120%; font-weight: 600"
          >{{
            config.generalConfig.shortName || config.generalConfig.name || ""
          }}</span
        >

        <p
          style="font-weight: 600; font-size: 300%"
          class="google-font mb-0 mt-8"
        >
          Platform Edu-Tech untuk Pendidik Siap Menuju<br />
          <span class="aura-text">Talent Mastery</span>
        </p>

        <p class="google-font" style="font-size: 100%; color: #dee5f1">
          <span v-for="(item, i) in config.generalConfig.hashtags" :key="i">
            <v-chip
              :href="'https://twitter.com/hashtag/' + item"
              rel="noreferrer"
              target="_blank"
              small
              class="mr-1"
              :color="$vuetify.theme.dark ? '#292929' : '#DEE5F1'"
              >#{{ item }}</v-chip
            >
          </span>
        </p>

        <p class="google-font" style="font-size: 100%">
          {{ config.generalConfig.shortDescription }}
        </p>

        <br class="my-6" />

        <v-btn
          rel="noreferrer"
          depressed
          rounded
          aria-label="Mulai Sekarang"
          class="ma-0 google-font mr-2 aura-btn"
          style="text-transform: capitalize; color: white"
          >Mulai Sekarang</v-btn
        >

        <v-btn fab depressed shaped small dark to="/about" color="#363636">
          <v-icon>mdi-arrow-top-right</v-icon>
        </v-btn>
      </v-col>
      <v-col md="4" cols="12" order-md="2" order="1">
        <v-img
          :src="
            checkExistance(config.generalConfig.homeImage, 0)
              ? config.generalConfig.homeImage
              : require('@/assets/img/common/home.png')
          "
          :lazy-src="
            checkExistance(config.generalConfig.homeImage, 0)
              ? config.generalConfig.homeImage
              : require('@/assets/img/common/home.png')
          "
          class="my-md-5"
          width="100%"
          height="350px"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState(["config"]),
  },
};
</script>
