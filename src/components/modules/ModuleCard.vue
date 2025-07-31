<template>
  <v-card class="module-card" :elevation="2" max-width="300" @click="goToModule(data.id)">
    <!-- Gambar -->
    <v-img src="https://placehold.co/600x400?text=Module+Image" height="170" class="rounded-t-lg" cover />

    <!-- Konten -->
    <v-card-text class="pa-4">
      <!-- Judul -->
      <div class="google-font title mb-1 text--primary">
        {{ data.name || "The Complete AI Guide" }}
      </div>

      <!-- Penulis -->
      <div class="google-font subtitle-2 text-truncate grey--text text--darken-1 mb-2">
        {{ data.authors || "Julian Melanson, Benza Maman" }}
      </div>

      <!-- Harga -->
      <div class="d-flex align-center mb-2">
        <span class="google-font font-weight-bold price">Rp129.000</span>
        <span class="grey--text text--line-through caption ml-2">Rp609.000</span>
      </div>
    </v-card-text>

    <!-- Badge -->
    <v-card-actions class="px-4 pb-4 pt-0">
      <v-chip label small class="google-font font-weight-medium" color="green lighten-4" text-color="green darken-2">
        Unggulan
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ModuleCard",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    goToModule(id) {
      this.$router.push(`/modules/${id}`);
    },
  },
};
</script>

<style scoped>
.module-card {
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 15.5px;
  font-weight: 600;
  line-height: 1.4;
}

.price {
  font-size: 14.5px;
}

.google-font {
  font-family: "Google Sans", Roboto, sans-serif;
}
</style>
