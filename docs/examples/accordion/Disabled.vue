<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Disabled.vue'

const isDisabled = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="disabled">
        <B24Switch v-model="isDisabled" />
      </B24FormField>
    </template>
    <div class="flex flex-col items-start min-w-full">
      <Demo :is-disabled="isDisabled" />
    </div>
  </ComponentShowExample>
</template>
