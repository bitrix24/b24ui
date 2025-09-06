<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Status.vue'

const isStatus = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isStatus">
        <B24Switch v-model="isStatus" />
      </B24FormField>
    </template>
    <Demo :is-status="isStatus" />
  </ComponentShowExample>
</template>
