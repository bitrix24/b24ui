<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/avatar-group'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'

const sizes = Object.keys(theme.variants.size)
const size = ref('3xl' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="size" class="w-full sm:w-1/4">
        <B24Select v-model="size" :items="sizes" />
      </B24FormField>
    </template>
    <Demo :size="size" />
  </ComponentShowExample>
</template>
