<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col md="4" sm="12" cols="12">
        <p class="google-font mb-0" style="font-size: 150%">What we do?</p>
        <p class="google-font" style="font-size: 100%">
          Kami hadir untuk mendampingi pendidik menggali potensi, mengasah
          keterampilan, dan tumbuh bersama dalam komunitas pembelajar.
        </p>
      </v-col>
      <v-col md="8" sm="12" cols="12" class="pa-0 ma-0">
        <v-container fluid class="pa-0 ma-0">
          <v-row>
            <v-col
              md="4"
              lg="4"
              sm="6"
              cols="6"
              v-for="(item, index) in whatWeDoContent"
              :key="index"
              class="aura-card-container"
            >
              <div
                class="aura-home-card pa-4"
                :class="
                  $vuetify.theme.dark ? 'aura-card-dark' : 'aura-card-light'
                "
              >
                <div class="aura-home-cardbar"></div>
                <div class="aura-home-card-content">
                  <v-icon large style="font-size: 250%">{{ item.icon }}</v-icon>
                  <p class="google-font mt-2" style="font-size: 110%">
                    {{ item.name }}
                  </p>
                  <p class="google-font" style="font-size: 80%">
                    {{ item.des }}
                  </p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import whatwedodata from "@/assets/data/whatwedo.json";

export default {
  computed: {
    ...mapState(["config"]),
  },
  name: "App",
  data: () => ({
    whatwedodata: whatwedodata,
    whatWeDoContent: [
      {
        name: "Pelatihan Pendidik",
        icon: "mdi-school", // Mengganti mdi-teach dengan mdi-school yang tersedia
        des: "Kelas interaktif untuk meningkatkan kompetensi dan keterampilan mengajar para pendidik profesional.",
      },
      {
        name: "Mentoring Karier",
        icon: "mdi-account-supervisor-circle", // Menggunakan ikon yang lebih spesifik untuk bimbingan personal
        des: "Bimbingan personal dan strategis dari para ahli di bidang pendidikan untuk pengembangan karier jangka panjang.",
      },
      {
        name: "Pengembangan Komunitas",
        icon: "mdi-account-group", // Ikon yang sudah bagus untuk komunitas
        des: "Platform kolaborasi untuk terhubung, berbagi pengalaman, dan belajar bersama sesama pendidik di seluruh Indonesia.",
      },
    ],
  }),
  methods: {
    getImgUrl(url) {
      if (url.length > 0) {
        return require("@/assets/img/what-we-do/" + url);
      } else {
        return require("@/assets/img/what-we-do/notFound.png");
      }
    },
  },
};
</script>
