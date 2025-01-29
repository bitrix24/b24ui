<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Label.vue'

const label = ref('Bitrix24 UI')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="label" class="w-full sm:w-1/4">
        <B24Input v-model="label" />
      </B24FormField>
    </template>
    <div class="bg-white dark:bg-base-900 rounded w-full h-[70px] p-2 flex flex-col items-center justify-center gap-5">
      <Demo :label="label" />
    </div>
  </ComponentShowExample>
</template>
