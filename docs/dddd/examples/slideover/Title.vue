<script setup lang="ts">
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Title.vue'
import { title } from './dictionary'
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="title" class="w-full sm:w-1/4">
        <B24Input v-model="title" />
      </B24FormField>
    </template>
    <Demo :title="title" />
  </ComponentShowExample>
</template>
