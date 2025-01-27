<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Alert.vue'

const title = ref('Heads up!')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="title" class="w-full sm:w-44">
        <B24Input v-model="title" />
      </B24FormField>
    </template>
    <Demo :title="title" />
  </ComponentShowExample>
</template>
