<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Loading.vue'

const isLoading = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isLoading">
        <B24Switch v-model="isLoading" />
      </B24FormField>
    </template>
    <Demo :is-loading="isLoading" />
  </ComponentShowExample>
</template>
