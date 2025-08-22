<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/LinkActiveColor.vue'
import { colorList, colorValue } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="activeColor" class="w-full sm:w-1/4">
        <B24Select
          v-model="colorValue"
          :items="colorList"
          name="color"
          class="w-full"
        />
      </B24FormField>
    </template>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo :active-color="colorValue" />
    </div>
  </ComponentShowExample>
</template>
