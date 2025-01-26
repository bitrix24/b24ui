<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Disabled.vue'

const isDisabled = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isDisabled">
        <B24Switch v-model="isDisabled" />
      </B24FormField>
    </template>
    <Demo :is-disabled="isDisabled" />
  </ComponentShowExample>
</template>
