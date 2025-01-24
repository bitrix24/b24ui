<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Placeholder.vue'

const placeholder = ref('You need to choose')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="placeholder" class="w-1/2">
        <B24Input v-model="placeholder" type="search" />
      </B24FormField>
    </template>
    <div class="w-1/3">
      <Demo :placeholder="placeholder" />
    </div>
  </ComponentShowExample>
</template>
