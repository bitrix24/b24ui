<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Orientation.vue'
import { orientations, orientation, size, colorValue, colorList, title, description } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="orientation" class="w-full sm:w-1/4">
        <B24Select v-model="orientation" :items="orientations" class="w-full" />
      </B24FormField>
      <B24FormField label="color" class="w-full sm:w-1/4">
        <B24Select
          v-model="colorValue"
          :items="colorList"
          name="color"
          class="w-full"
        />
      </B24FormField>
      <B24FormField label="title" class="w-full sm:w-1/4">
        <B24Input v-model="title" />
      </B24FormField>
      <B24FormField label="description" class="w-full sm:w-4/4">
        <B24Textarea v-model="description" autoresize :rows="2" :maxrows="0" />
      </B24FormField>
    </template>
    <Demo
      :orientation="orientation"
      :size="size"
      :color="colorValue"
      :title="title"
      :description="description"
    />
  </ComponentShowExample>
</template>
