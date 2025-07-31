<template>
  <v-container fluid>
    <!-- Search Field -->
    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="12" md="6">
        <p class="google-font mb-1" style="font-size: 24px; font-weight: 600;">
          Modul Pembelajaran
        </p>
        <p class="google-font" style="font-size: 14px;">
          Telusuri berbagai materi dari pembelajaran AI, Web, Mobile dan lainnya.
        </p>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field v-model="search" hide-details rounded dense solo-inverted prepend-inner-icon="mdi-magnify"
          label="Cari modul..." />
      </v-col>
    </v-row>

    <!-- Cards Grid -->
    <v-row>
      <v-col v-for="(item, index) in visibleModules" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card class="d-flex flex-column justify-space-between" elevation="2" @click="goToModule(item.id)">
          <v-img src="https://placehold.co/600x400?text=Module+Image" height="170" class="rounded-t"
            lazy-src="https://placehold.co/10x10"></v-img>

          <v-card-text class="pa-4">
            <!-- Judul Modul -->
            <div class="google-font font-weight-medium mb-1" style="font-size: 16px">
              {{ item.name }}
            </div>

            <!-- Penulis / Info -->
            <div class="google-font grey--text text--darken-1 text-truncate mb-2" style="font-size: 13px;">
              oleh {{ item.author || "Nama Pengajar" }}
            </div>

            <!-- Rating -->
            <div class="d-flex align-center mb-1">
              <v-icon small color="yellow darken-2" class="mr-1">mdi-star</v-icon>
              <span class="text-caption grey--text">4.8 (1.2k)</span>
            </div>

            <!-- Harga -->
            <div class="google-font font-weight-bold mt-2" style="font-size: 15px">
              Rp129.000 <span class="text--disabled text--line-through ml-1" style="font-size: 13px;">Rp609.000</span>
            </div>
          </v-card-text>

          <!-- Badge -->
          <v-card-actions class="px-4 pb-4">
            <v-chip color="teal lighten-4" class="google-font font-weight-medium" small>Unggulan</v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Load More Button -->
    <div class="text-center mt-6" v-if="visibleModules.length < filteredModules.length">
      <v-btn @click="loadMore" color="primary" class="google-font" depressed>
        Load More
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      modules: [], // semua modul akan dimuat di sini
      search: "",
      itemsPerLoad: 8,
      currentLoaded: 1,
    };
  },
  computed: {
    filteredModules() {
      const keyword = this.search.toLowerCase();
      return this.modules.filter((mod) =>
        mod.name.toLowerCase().includes(keyword)
      );
    },
    visibleModules() {
      return this.filteredModules.slice(0, this.currentLoaded * this.itemsPerLoad);
    },
  },
  methods: {
    loadMore() {
      this.currentLoaded += 1;
    },
    goToModule(id) {
      this.$router.push(`/modules/${id}`);
    },
  },
  mounted() {
    // Simulasi dummy data
    this.modules = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Modul #${i + 1}`,
      author: "John Doe"
    }));
  },
};
</script>
