<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Actions.vue'

const description = ref('Let\'s signal the manager that the deal is not moving.')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="description" class="w-full sm:w-1/2">
        <B24Textarea v-model="description" />
      </B24FormField>
    </template>
    <Demo :description="description" />
  </ComponentShowExample>
</template>
