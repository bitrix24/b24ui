<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Description.vue'

const description = ref('Broadcast posting is allowed in Feed. These posts will be visible to everyone.')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="description" class="w-full">
        <B24Input v-model="description" type="search" />
      </B24FormField>
    </template>
    <Demo :description="description" />
  </ComponentShowExample>
</template>
