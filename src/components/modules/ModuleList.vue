<template>
  <v-container fluid>
    <!-- Header -->
    <v-sheet :elevation="0" rounded="lg" class="pa-4 mb-4" :color="`grey ${$vuetify.theme.dark ? 'darken-4' : 'lighten-4'}`">
      <v-row align="center" class="ma-0">
        <v-col cols="12" md="5" class="py-0">
          <p class="google-font mb-1" style="font-size: 24px; font-weight: 700">Semua Modul</p>
          <p class="google-font mb-0" style="font-size: 14px; opacity: .9">Telusuri modul vokasi untuk peningkatan keterampilan.</p>
        </v-col>
        <v-col cols="12" md="4" class="py-0">
          <v-text-field
            v-model="search"
            hide-details
            rounded
            dense
            clearable
            solo-inverted
            prepend-inner-icon="mdi-magnify"
            label="Cari modul..."
            aria-label="Cari modul"
          />
        </v-col>
        <v-col cols="12" md="3" class="py-0 d-flex justify-end">
          <v-menu v-model="filterMenu" :close-on-content-click="false" max-width="520" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" class="google-font" outlined rounded v-bind="attrs" v-on="on" aria-label="Buka filter">
                <v-icon left>mdi-filter-variant</v-icon>
                Filter
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="google-font" style="font-weight:600; font-size: 16px">Filter Modul</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="selectedCategories"
                      :items="categoryOptions"
                      label="Kategori"
                      dense
                      rounded
                      solo-inverted
                      multiple
                      chips
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="selectedDifficulties"
                      :items="difficultyOptions"
                      label="Tingkat"
                      dense
                      rounded
                      solo-inverted
                      multiple
                      chips
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="selectedLanguages"
                      :items="languageOptions"
                      label="Bahasa"
                      dense
                      rounded
                      solo-inverted
                      multiple
                      chips
                      clearable
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="itemsPerPage"
                      :items="[8, 12, 16, 24]"
                      label="Item per halaman"
                      dense
                      rounded
                      solo-inverted
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn text rounded class="google-font" @click="clearFilters" aria-label="Hapus filter">Reset</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" rounded class="google-font" @click="applyFilters" aria-label="Terapkan filter">Terapkan</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>

      <!-- Active filters chips -->
      <v-row class="mt-3" v-if="hasActiveFilters">
        <v-col cols="12" class="py-0">
          <span class="google-font" style="font-size: 13px; opacity: .8">Filter aktif:</span>
          <v-chip
            v-for="(c, i) in selectedCategories"
            :key="'c'+i"
            small
            class="ma-1"
            @click:close="removeFilterItem('category', c)"
            close
          >{{ c }}</v-chip>
          <v-chip
            v-for="(d, i) in selectedDifficulties"
            :key="'d'+i"
            small
            class="ma-1"
            @click:close="removeFilterItem('difficulty', d)"
            close
          >{{ d }}</v-chip>
          <v-chip
            v-for="(l, i) in selectedLanguages"
            :key="'l'+i"
            small
            class="ma-1"
            @click:close="removeFilterItem('language', l)"
            close
          >{{ l }}</v-chip>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- Loading -->
    <v-row v-if="loading">
      <v-col v-for="i in itemsPerPage" :key="i" cols="12" sm="6" md="4" lg="3" class="pa-2 d-flex">
        <v-sheet :elevation="0" rounded="lg" class="flex-grow-1" :color="`grey ${$vuetify.theme.dark ? 'darken-3' : 'lighten-4'}`">
          <v-skeleton-loader class="mx-auto" type="image, heading, text, actions" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Empty -->
    <v-row class="py-8 my-4 text-center" v-else-if="!loading && paginatedModules.length === 0">
      <v-col cols="12">
        <v-img :src="require('@/assets/img/common/DataNotFound.svg')" width="160" class="mx-auto mb-4" />
        <p class="google-font mb-2" style="font-size: 115%">Tidak ada modul ditemukan</p>
        <p class="google-font" style="opacity: 0.8">Coba ubah kata kunci atau filter pencarian.</p>
      </v-col>
    </v-row>

    <!-- Grid -->
    <v-row v-else>
      <v-col v-for="(item, index) in paginatedModules" :key="item.id || index" cols="12" sm="6" md="4" lg="3" class="pa-2 d-flex">
        <v-card class="module-card flex-grow-1" :elevation="2" @click="goToModule(item.id)">
          <v-img :src="item.image || 'https://placehold.co/600x400?text=Module'" height="170" cover>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5" />
              </v-row>
            </template>
          </v-img>
          <v-card-text class="pa-4">
            <div class="google-font title mb-1 text--primary">{{ item.name }}</div>
            <div class="google-font caption grey--text mb-2">
              Mulai {{ convtDate ? convtDate(item.date) : new Date(item.date).toLocaleDateString('id-ID') }}
            </div>
            <div class="chip-row">
              <v-chip v-for="(tag, t) in (item.hashtags || []).slice(0, 3)" :key="t" small class="mr-1 mt-1" :color="$vuetify.theme.dark ? '#292929' : '#DEE5F1'" @click.stop>
                #{{ tag }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row class="mt-4" align="center" justify="space-between" v-if="!loading && totalPages >= 1">
      <v-col cols="12" md="4" class="google-font grey--text" style="font-size: 13px">
        Menampilkan {{ displayFrom }}–{{ displayTo }} dari {{ filteredModules.length }} modul
      </v-col>
      <v-col cols="12" md="8" class="text-center text-md-right">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          total-visible="7"
          circle
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
.module-card { border-radius: 12px; cursor: pointer; transition: transform .22s ease, box-shadow .22s ease; }
.module-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,.08); }
.title { font-size: 1rem; font-weight: 600; line-height: 1.4; }
.chip-row { min-height: 24px; }
.google-font { font-family: google-sans; }
</style>
