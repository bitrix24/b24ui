<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Inset.vue'

const isInset = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isInset">
        <B24Switch v-model="isInset" />
      </B24FormField>
    </template>
    <div class="flex flex-row items-center justify-between gap-5">
      <Demo :is-inset="isInset" />
    </div>
  </ComponentShowExample>
</template>
