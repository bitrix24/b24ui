<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/ButtonLabel.vue'

const label = ref('Button')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="label" class="w-full sm:w-44">
        <B24Input v-model="label" />
      </B24FormField>
    </template>
    <Demo :label="label" />
  </ComponentShowExample>
</template>
