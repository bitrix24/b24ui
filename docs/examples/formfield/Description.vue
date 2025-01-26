<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Description.vue'

const description = ref('We\'ll never share your email with anyone else.')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="description" class="w-full sm:w-44">
        <B24Input v-model="description" />
      </B24FormField>
    </template>
    <Demo :description="description" />
  </ComponentShowExample>
</template>
