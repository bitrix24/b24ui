<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/SearchInput.vue'

const placeholder = ref('Filter...')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="searchInput.placeholder" class="w-full sm:w-1/4">
        <B24Input v-model="placeholder" />
      </B24FormField>
    </template>
    <div class="w-full sm:w-1/3">
      <Demo :search-input-placeholder="placeholder" />
    </div>
  </ComponentShowExample>
</template>
