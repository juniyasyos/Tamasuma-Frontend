<template>
  <v-container fluid class="mb-1">
    <v-row align="center" justify="space-between" class="mb-2">
      <v-col cols="12" class="d-flex align-center justify-space-between">
        <div>
          <p class="google-font mb-1 mt-0 section-title">Galeri Kegiatan</p>
          <p class="google-font mt-0 mb-0 section-subtitle">
            Cuplikan kegiatan dan modul terbaru dari Tamasuma.
          </p>
        </div>
      </v-col>
    </v-row>

    <!-- Loading -->
    <v-row v-if="loading">
      <v-col v-for="i in 8" :key="i" cols="6" sm="4" md="3" class="pa-2 d-flex">
        <v-sheet :elevation="0" class="flex-grow-1" rounded="lg" :color="sheetColor">
          <v-skeleton-loader type="image, list-item@2" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Empty -->
    <v-row v-else-if="galleryItems.length === 0" class="py-10 text-center">
      <v-col cols="12">
        <v-img :src="require('@/assets/img/common/DataNotFound.svg')" width="160" class="mx-auto mb-3" />
        <p class="google-font mb-0">Belum ada foto pada galeri.</p>
      </v-col>
    </v-row>

    <!-- Masonry Grid -->
    <div v-else class="masonry">
      <div v-for="(item, i) in galleryItems" :key="item.id || i" class="masonry-item">
        <v-card class="gallery-card" :elevation="2" rounded="lg" @click="open(i)">
          <v-img :src="item.src" :height="tileHeight(i)" cover class="hover-zoom">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
            <div class="image-overlay">
              <div class="image-meta">
                <v-chip x-small color="rgba(0,0,0,.55)" text-color="white" class="mr-1">
                  <v-icon left x-small>mdi-calendar</v-icon>
                  {{ convtDate(item.date) }}
                </v-chip>
              </div>
            </div>
          </v-img>
        </v-card>
      </div>
    </div>

    <!-- Lightbox -->
    <v-dialog v-model="dialog" max-width="960" content-class="gallery-dialog" eager>
      <v-card rounded="lg">
        <v-toolbar flat dense>
          <v-toolbar-title class="google-font">Galeri</v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-carousel v-model="active" hide-delimiter-background height="420">
          <v-carousel-item v-for="(g, k) in galleryItems" :key="k">
            <v-img :src="g.src" height="420" contain />
          </v-carousel-item>
        </v-carousel>
        <v-card-actions class="justify-center">
          <v-btn small text @click="prev"><v-icon left>mdi-chevron-left</v-icon>Sebelumnya</v-btn>
          <v-btn small text @click="next">Berikutnya<v-icon right>mdi-chevron-right</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import service from "@/services/appservices";
export default {
  name: 'HomeGallery',
  data: () => ({
    loading: true,
    items: [],
    dialog: false,
    active: 0,
  }),
  computed: {
    sheetColor() {
      return this.$vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-4'
    },
    galleryItems() {
      return (this.items || [])
        .filter(m => m.visible)
        .slice(0, 8)
        .map(m => ({ id: m.id, src: m.image || m.thumbnail || 'https://placehold.co/800x400?text=Module', date: m.date }))
    }
  },
  methods: {
    load() {
      this.loading = true
      service.getAllCustomEvents().then(res => {
        this.items = res.success ? (res.data || []) : []
      }).finally(() => this.loading = false)
    },
    convtDate(d) {
      try { return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) } catch (_) { return d }
    },
    tileHeight(i) {
      const sizes = [180, 240, 300, 220, 260]
      return sizes[i % sizes.length]
    },
    open(i) { this.active = i; this.dialog = true },
    prev() { this.active = (this.active + this.galleryItems.length - 1) % this.galleryItems.length },
    next() { this.active = (this.active + 1) % this.galleryItems.length },
  },
  mounted() {
    this.load()
  }
}
</script>

<style scoped>
.section-title { font-weight: 650; font-size: 1.3rem; }
.section-subtitle { font-size: 0.95rem; opacity: 0.85; }
.gallery-card { cursor: pointer; overflow: hidden; border-radius: 16px; transition: transform .18s ease, box-shadow .18s ease; }
.gallery-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,.08); }
.image-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: flex-start; padding: 8px; }
.image-overlay { background: linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,0) 60%); }
.image-meta { display: flex; flex-wrap: wrap; }
.google-font { font-family: google-sans; }
.gallery-dialog { border-radius: 16px; }

/* Masonry columns */
.masonry { column-count: 2; column-gap: 12px; }
@media (min-width: 600px) { .masonry { column-count: 3; } }
@media (min-width: 1264px) { .masonry { column-count: 4; } }
.masonry-item { break-inside: avoid; margin: 0 0 12px; display: inline-block; width: 100%; }

/* Subtle zoom on image */
.hover-zoom >>> .v-image__image { transition: transform .35s ease; }
.gallery-card:hover .hover-zoom >>> .v-image__image { transform: scale(1.05); }
</style>
