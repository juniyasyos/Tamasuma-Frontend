<template>
  <v-btn
    :depressed="depressed"
    :rounded="rounded"
    :text="variant === 'text'"
    :outlined="variant === 'outline'"
    :color="btnColor"
    :dark="isDark"
    class="ma-0 google-font"
    :class="btnClass"
    v-bind="$attrs"
    v-on="$listeners"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
  >
    <slot>{{ label }}</slot>
    <v-icon v-if="iconRight" right>{{ iconRight }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    label: { type: String, default: '' },
    variant: { type: String, default: 'solid' }, // solid | outline | text | gradient
    color: { type: String, default: 'primary' },
    rounded: { type: Boolean, default: true },
    depressed: { type: Boolean, default: true },
    dark: { type: Boolean, default: false },
    to: { type: [String, Object], default: null },
    href: { type: String, default: null },
    target: { type: String, default: null },
    rel: { type: String, default: 'noreferrer' },
    iconRight: { type: String, default: '' },
  },
  computed: {
    isDark() {
      return this.dark || this.variant === 'gradient'
    },
    btnColor() {
      if (this.variant === 'solid') return this.color
      if (this.variant === 'outline' || this.variant === 'text') return this.color
      // gradient handled by class background image
      return undefined
    },
    btnClass() {
      return {
        'aura-btn': this.variant === 'gradient',
      }
    },
  },
}
</script>

<style scoped>
.google-font {
  font-family: google-sans;
  text-transform: capitalize;
}
</style>

