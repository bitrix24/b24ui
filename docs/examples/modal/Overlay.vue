<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Overlay.vue'

const isOverlay = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isOverlay">
        <B24Switch v-model="isOverlay" />
      </B24FormField>
    </template>
    <Demo :is-overlay="isOverlay" />
  </ComponentShowExample>
</template>
