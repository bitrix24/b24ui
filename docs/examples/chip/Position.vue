<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/chip'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Position.vue'

const sizes = Object.keys(theme.variants.size)
const size = ref('sm' as const)

const positions = Object.keys(theme.variants.position)
const position = ref('bottom-left' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="position" class="w-full sm:w-44">
        <B24Select v-model="position" :items="positions" />
      </B24FormField>
      <B24FormField label="size" class="w-full sm:w-44">
        <B24Select v-model="size" :items="sizes" />
      </B24FormField>
    </template>
    <Demo :position="position" :size="size" />
  </ComponentShowExample>
</template>
