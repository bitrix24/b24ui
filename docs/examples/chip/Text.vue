<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/chip'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Text.vue'

const text = ref('+5')

const sizes = Object.keys(theme.variants.size)
const size = ref('md' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="text" class="w-full sm:w-1/4">
        <B24Input v-model="text" />
      </B24FormField>
      <B24FormField label="size" class="w-full sm:w-1/4">
        <B24Select v-model="size" :items="sizes" class="w-full" />
      </B24FormField>
    </template>
    <Demo :text="text" :size="size" />
  </ComponentShowExample>
</template>
