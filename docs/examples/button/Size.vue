<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'
import { sizes, size } from './dictionary.js'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="size" class="w-full sm:w-1/4">
        <B24Select v-model="size" :items="sizes" class="w-full" />
      </B24FormField>
    </template>
    <Demo :size="size" />
  </ComponentShowExample>
</template>
