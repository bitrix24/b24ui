<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'
import { sizes, size } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <div class="w-full sm:w-1/4">
        <B24FormField label="size">
          <B24Select v-model="size" :items="sizes" class="w-full" />
        </B24FormField>
      </div>
    </template>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo :size="size" />
    </div>
  </ComponentShowExample>
</template>
