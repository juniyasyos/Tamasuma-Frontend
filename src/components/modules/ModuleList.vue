<template>
  <v-container fluid>
    <!-- Header -->
  <v-sheet :elevation="2" rounded="lg" class="pa-6 mb-4" color="primary">
      <v-row align="center" class="ma-0">
        <v-col cols="12" md="5" class="py-0">
          <h1 class="google-font mb-2 white--text" style="font-size: 28px; font-weight: 700">Semua Modul</h1>
          <p class="google-font mb-0 white--text" style="font-size: 16px; opacity: .9">Telusuri modul vokasi untuk
            peningkatan keterampilan.</p>
        </v-col>
        <v-col cols="12" md="4" class="py-0">
          <v-text-field v-model="search" hide-details rounded dense clearable solo flat color="white"
            prepend-inner-icon="mdi-magnify" label="Cari modul..." aria-label="Cari modul"
            background-color="rgba(255,255,255,0.15)" class="white--text search-field" />
        </v-col>
        <v-col cols="12" md="3" class="py-0 d-flex justify-end">
          <v-menu v-model="filterMenu" :close-on-content-click="false" max-width="520" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" class="google-font primary--text" rounded v-bind="attrs" v-on="on"
                aria-label="Buka filter">
                <v-icon left color="primary">mdi-filter-variant</v-icon>
                Filter
              </v-btn>
            </template>
            <v-card rounded="lg" elevation="3">
              <v-card-title class="google-font primary white--text" style="font-weight:600; font-size: 18px">
                <v-icon left color="white">mdi-tune</v-icon>
                Filter Modul
              </v-card-title>
              <v-card-text class="pt-4">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="selectedCategories"
                      :items="categoryOptions"
                      label="Kategori"
                      dense
                      outlined
                      rounded
                      multiple
                      chips
                      clearable
                      color="primary"
                      item-color="primary"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary">mdi-tag-multiple</v-icon>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="selectedDifficulties"
                      :items="difficultyOptions"
                      label="Tingkat"
                      dense
                      outlined
                      rounded
                      multiple
                      chips
                      clearable
                      color="primary"
                      item-color="primary"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary">mdi-signal</v-icon>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="selectedLanguages"
                      :items="languageOptions"
                      label="Bahasa"
                      dense
                      outlined
                      rounded
                      multiple
                      chips
                      clearable
                      color="primary"
                      item-color="primary"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary">mdi-translate</v-icon>
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="itemsPerPage"
                      :items="[8, 12, 16, 24]"
                      label="Item per halaman"
                      dense
                      outlined
                      rounded
                      color="primary"
                    >
                      <template v-slot:prepend-inner>
                        <v-icon color="primary">mdi-view-grid</v-icon>
                      </template>
                    </v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider class="primary"></v-divider>
              <v-card-actions class="pa-4">
                <v-btn text rounded class="google-font" color="error" @click="clearFilters" aria-label="Hapus filter">
                  <v-icon left>mdi-refresh</v-icon>
                  Reset
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" rounded class="google-font" @click="applyFilters" aria-label="Terapkan filter" elevation="2">
                  <v-icon left>mdi-check</v-icon>
                  Terapkan
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>

      <!-- Active filters chips -->
      <v-row class="mt-4" v-if="hasActiveFilters">
        <v-col cols="12" class="py-0">
          <span class="google-font white--text" style="font-size: 14px; opacity: .9">Filter aktif:</span>
          <v-chip
            v-for="(c, i) in selectedCategories"
            :key="'c' + i"
            small
            class="ma-1"
            color="secondary"
            text-color="white"
            @click:close="removeFilterItem('category', c)"
            close
          >
            <v-icon left small>mdi-tag</v-icon>
            {{ c }}
          </v-chip>
          <v-chip
            v-for="(d, i) in selectedDifficulties"
            :key="'d' + i"
            small
            class="ma-1"
            color="accent"
            text-color="white"
            @click:close="removeFilterItem('difficulty', d)"
            close
          >
            <v-icon left small>mdi-signal</v-icon>
            {{ d }}
          </v-chip>
          <v-chip
            v-for="(l, i) in selectedLanguages"
            :key="'l' + i"
            small
            class="ma-1"
            color="success"
            text-color="white"
            @click:close="removeFilterItem('language', l)"
            close
          >
            <v-icon left small>mdi-translate</v-icon>
            {{ l }}
          </v-chip>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Loading -->
    <v-row v-if="loading">
      <v-col v-for="i in itemsPerPage" :key="i" cols="12" sm="6" md="4" lg="3" class="pa-2 d-flex">
        <v-card class="flex-grow-1" :elevation="4" rounded="lg" color="grey lighten-5">
          <v-skeleton-loader class="mx-auto" type="image, card-heading, text, chip@2, actions" />
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty -->
    <v-row class="py-12 my-4 text-center" v-else-if="!loading && paginatedModules.length === 0">
      <v-col cols="12">
        <v-card class="pa-8 mx-auto" max-width="400" :elevation="3" rounded="lg" color="grey lighten-5">
          <v-img :src="require('@/assets/img/common/DataNotFound.svg')" width="160" class="mx-auto mb-4" />
          <h2 class="google-font mb-3 primary--text" style="font-size: 20px; font-weight: 600">Tidak ada modul ditemukan</h2>
          <p class="google-font grey--text" style="font-size: 16px">Coba ubah kata kunci atau filter pencarian.</p>
          <v-btn color="primary" rounded class="mt-2" @click="clearFilters" v-if="hasActiveFilters">
            <v-icon left>mdi-refresh</v-icon>
            Reset Filter
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Grid -->
    <v-row v-else>
      <v-col v-for="(item, index) in paginatedModules" :key="item.id || index" cols="12" sm="6" md="4" lg="3"
        class="pa-2 d-flex">
        <v-card class="module-card flex-grow-1" :elevation="3" rounded="lg" color="grey lighten-5" @click="goToModule(item.id)">
          <div class="image-container">
            <v-img :src="item.image || 'https://placehold.co/600x400?text=Module'" height="180" cover class="rounded-t-lg">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary" />
                </v-row>
              </template>
              <div class="image-overlay">
                <v-chip small color="primary" class="ma-2">
                  <v-icon left small>mdi-play-circle</v-icon>
                  Mulai Belajar
                </v-chip>
              </div>
            </v-img>
          </div>
          <v-card-text class="pa-4">
            <h3 class="google-font module-title mb-2">{{ item.name }}</h3>
            <div class="google-font caption grey--text mb-3 d-flex align-center">
              <v-icon small class="mr-1" color="grey">mdi-calendar</v-icon>
              Mulai {{ convtDate ? convtDate(item.date) : new Date(item.date).toLocaleDateString('id-ID') }}
            </div>
            <div class="chip-row">
              <v-chip
                v-for="(tag, t) in (item.hashtags || []).slice(0, 3)"
                :key="t"
                x-small
                class="mr-1 mt-1"
                :color="getChipColor(t)"
                text-color="white"
                @click.stop
              >
                #{{ tag }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row class="mt-6" align="center" justify="space-between" v-if="!loading && totalPages >= 1">
      <v-col cols="12" md="4" class="google-font grey--text" style="font-size: 14px">
        <v-chip small color="info" text-color="white" class="mr-2">
          <v-icon left small>mdi-information</v-icon>
          Info
        </v-chip>
        Menampilkan {{ displayFrom }}–{{ displayTo }} dari {{ filteredModules.length }} modul
      </v-col>
      <v-col cols="12" md="8" class="text-center text-md-right">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          total-visible="7"
          circle
          color="primary"
          prev-icon="mdi-chevron-left"
          next-icon="mdi-chevron-right"
        />
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import service from "@/services/appservices";

export default {
  name: 'ModuleList',
  data() {
    return {
      loading: true,
      modules: [],
      search: '',
      selectedCategories: [],
      selectedDifficulties: [],
      selectedLanguages: [],
      itemsPerPage: 12,
      currentPage: 1,
      filterMenu: false,
    }
  },
  computed: {
    categoryOptions() {
      const set = new Set()
      this.modules.forEach(m => (m.category || []).forEach(c => set.add(c)))
      return Array.from(set).sort()
    },
    difficultyOptions() {
      const set = new Set(this.modules.map(m => m.difficulty).filter(Boolean))
      return Array.from(set).sort()
    },
    languageOptions() {
      const set = new Set(this.modules.map(m => m.language).filter(Boolean))
      return Array.from(set).sort()
    },
    filteredModules() {
      const q = (this.search || '').toLowerCase()
      return this.modules
        .filter(m => !q || (m.name || '').toLowerCase().includes(q) || (m.des || '').toLowerCase().includes(q))
        .filter(m => this.selectedCategories.length === 0 || (m.category || []).some(c => this.selectedCategories.includes(c)))
        .filter(m => this.selectedDifficulties.length === 0 || this.selectedDifficulties.includes(m.difficulty))
        .filter(m => this.selectedLanguages.length === 0 || this.selectedLanguages.includes(m.language))
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredModules.length / this.itemsPerPage))
    },
    paginatedModules() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredModules.slice(start, start + this.itemsPerPage)
    },
    hasActiveFilters() {
      return (
        this.selectedCategories.length > 0 ||
        this.selectedDifficulties.length > 0 ||
        this.selectedLanguages.length > 0
      )
    },
    displayFrom() {
      if (this.filteredModules.length === 0) return 0
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    displayTo() {
      return Math.min(this.filteredModules.length, this.currentPage * this.itemsPerPage)
    }
  },
  watch: {
    // Reset ke halaman 1 saat filter berubah
    search() { this.currentPage = 1 },
    selectedCategories() { this.currentPage = 1 },
    selectedDifficulties() { this.currentPage = 1 },
    selectedLanguages() { this.currentPage = 1 },
    itemsPerPage() { this.currentPage = 1 },
  },
  methods: {
    goToModule(id) {
      this.$router.push(`/modules/${id}`)
    },
    clearFilters() {
      this.selectedCategories = []
      this.selectedDifficulties = []
      this.selectedLanguages = []
      this.currentPage = 1
    },
    applyFilters() {
      this.currentPage = 1
      this.filterMenu = false
    },
    removeFilterItem(type, value) {
      if (type === 'category') {
        this.selectedCategories = this.selectedCategories.filter(v => v !== value)
      } else if (type === 'difficulty') {
        this.selectedDifficulties = this.selectedDifficulties.filter(v => v !== value)
      } else if (type === 'language') {
        this.selectedLanguages = this.selectedLanguages.filter(v => v !== value)
      }
      this.currentPage = 1
    },
    getChipColor(index) {
      const colors = ['success', 'warning', 'error', 'info', 'purple', 'teal']
      return colors[index % colors.length]
    },
    loadData() {
      this.loading = true
      service.getAllCustomEvents().then(res => {
        if (res.success) {
          this.modules = (res.data || []).filter(m => m.visible)
        } else {
          this.modules = []
        }
      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.module-card {
  border-radius: 16px;
  cursor: pointer;
  transition: all .3s ease;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%);
}

.module-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(25, 118, 210, 0.15);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity .3s ease;
}

.module-card:hover .image-overlay {
  opacity: 1;
}

.module-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  transition: color .2s ease;
}

.module-card:hover .module-title {
  color: #1976d2 !important;
}

.chip-row {
  min-height: 28px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.google-font {
  font-family: google-sans;
}

.search-field >>> .v-input__slot {
  background: rgba(255,255,255,0.15) !important;
}

.search-field >>> .v-text-field__slot input {
  color: white !important;
}

.search-field >>> .v-text-field__slot input::placeholder {
  color: rgba(255,255,255,0.7) !important;
}

.search-field >>> .v-icon {
  color: rgba(255,255,255,0.8) !important;
}

/* Dark theme adjustments */
.theme--dark .module-card {
  background: linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%);
}

.theme--dark .module-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
</style>
