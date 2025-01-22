<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Disabled.vue'

const disabled = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="disabled">
        <B24Switch v-model="disabled" size="xs" />
      </B24FormField>
    </template>
    <Demo :is-disabled="disabled" />
  </ComponentShowExample>
</template>
