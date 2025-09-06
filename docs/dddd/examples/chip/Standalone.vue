<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Standalone.vue'

const isInset = ref(true)
const isStandalone = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isStandalone">
        <B24Switch v-model="isStandalone" />
      </B24FormField>
      <B24FormField label="isInset">
        <B24Switch v-model="isInset" />
      </B24FormField>
    </template>
    <Demo :is-standalone="isStandalone" :is-inset="isInset" />
  </ComponentShowExample>
</template>
