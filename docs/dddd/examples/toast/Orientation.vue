<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/toast'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Orientation.vue'

const title = ref('The calculation of indicators has been completed')
const description = ref('Is there anything else you need help with?')

const orientations = Object.keys(theme.variants.orientation)
const orientation = ref('horizontal' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="orientation" class="w-full sm:w-1/4">
        <B24Select v-model="orientation" :items="orientations" class="w-full" />
      </B24FormField>
      <B24FormField label="description" class="w-full sm:flex-1">
        <B24Textarea v-model="description" />
      </B24FormField>
    </template>
    <Demo :orientation="orientation" :title="title" :description="description" />
  </ComponentShowExample>
</template>
