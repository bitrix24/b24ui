<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Description.vue'
import { title, description } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="title" class="w-full sm:w-1/4">
        <B24Input v-model="title" />
      </B24FormField>
      <B24FormField label="description" class="w-full sm:flex-1">
        <B24Textarea v-model="description" autoresize :rows="2" :maxrows="0" />
      </B24FormField>
    </template>
    <Demo :title="title" :description="description" />
  </ComponentShowExample>
</template>
