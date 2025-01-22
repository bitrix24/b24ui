<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Title.vue'

const title = ref('The calculation of indicators has been completed')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="title" class="w-full">
        <B24Input v-model="title" type="search" />
      </B24FormField>
    </template>
    <Demo :title="title" />
  </ComponentShowExample>
</template>
