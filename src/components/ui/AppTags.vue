<template>
  <div class="app-tags">
    <v-chip
      v-for="(tag, i) in visibleTags"
      :key="`tag-${i}`"
      label
      small
      class="mr-1 mb-1"
      :color="chipColor"
      :text-color="chipTextColor"
    >
      {{ tag }}
    </v-chip>
    <v-chip
      v-if="hiddenCount > 0"
      label
      small
      class="mr-1 mb-1"
      :color="chipColor"
      :text-color="chipTextColor"
    >
      +{{ hiddenCount }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'AppTags',
  props: {
    tags: { type: Array, default: () => [] },
    max: { type: Number, default: 2 },
    color: { type: String, default: 'blue lighten-5' },
    textColor: { type: String, default: 'blue darken-2' },
  },
  computed: {
    visibleTags() {
      return (this.tags || []).slice(0, this.max)
    },
    hiddenCount() {
      const total = (this.tags || []).length
      return total > this.max ? total - this.max : 0
    },
    chipColor() { return this.color },
    chipTextColor() { return this.textColor },
  },
}
</script>

<style scoped>
.app-tags { min-height: 24px; }
</style>

