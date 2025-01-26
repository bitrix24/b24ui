<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/FormField.vue'

const label = ref('Email')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="label" class="1/2">
        <B24Input v-model="label" />
      </B24FormField>
    </template>
    <Demo :label="label" />
  </ComponentShowExample>
</template>
