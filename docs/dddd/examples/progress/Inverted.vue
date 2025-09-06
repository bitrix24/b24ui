<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Inverted.vue'

const isInverted = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isInverted">
        <B24Switch v-model="isInverted" />
      </B24FormField>
    </template>
    <Demo :is-inverted="isInverted" />
  </ComponentShowExample>
</template>
