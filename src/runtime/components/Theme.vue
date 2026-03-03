<script lang="ts">
import type { VNode } from 'vue'
import { computed } from 'vue'
import { provideThemeContext } from '../composables/useComponentUI'
import type { ThemeUI } from '../composables/useComponentUI'

export interface ThemeProps {
  b24ui: ThemeUI
}

export interface ThemeSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
const props = defineProps<ThemeProps>()

provideThemeContext({
  b24ui: computed(() => props.b24ui)
})
</script>

<template>
  <slot />
</template>
