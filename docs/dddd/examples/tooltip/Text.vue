<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Text.vue'

const text = ref('Opens the deal creation form in the slider')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="text" class="w-full sm:flex-1">
        <B24Input v-model="text" />
      </B24FormField>
    </template>
    <Demo :text="text" />
  </ComponentShowExample>
</template>
