<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Size.vue'
import { sizes, size, colorValue, title, description } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="color" class="w-full sm:w-1/4">
        <B24Select v-model="size" :items="sizes" class="w-full" />
      </B24FormField>
    </template>
    <Demo
      :size="size"
      :color="colorValue"
      :title="title"
      :description="description"
    />
  </ComponentShowExample>
</template>
