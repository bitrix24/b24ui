<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Actions.vue'

const title = ref('The calculation of indicators has been completed')
const description = ref('Is there anything else you need help with?')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="description" class="w-full sm:flex-1">
        <B24Textarea v-model="description" />
      </B24FormField>
    </template>
    <Demo :title="title" :description="description" />
  </ComponentShowExample>
</template>
