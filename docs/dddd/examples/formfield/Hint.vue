<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Hint.vue'

const hint = ref('Optional')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="hint" class="w-full sm:w-1/4">
        <B24Input v-model="hint" />
      </B24FormField>
    </template>
    <Demo :hint="hint" />
  </ComponentShowExample>
</template>
