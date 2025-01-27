<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Label.vue'

const label = ref('Badge')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="label" class="w-full sm:w-44">
        <B24Input v-model="label" />
      </B24FormField>
    </template>
    <div class="flex flex-row items-center justify-between gap-5">
      <Demo :label="label" />
    </div>
  </ComponentShowExample>
</template>
