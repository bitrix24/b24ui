<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Error.vue'

const error = ref('The email you specified is incorrect. Please enter a correct one.')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="error" class="w-full">
        <B24Input v-model="error" />
      </B24FormField>
    </template>
    <Demo :error="error" />
  </ComponentShowExample>
</template>
