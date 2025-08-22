<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/NormalCase.vue'
import { colorValue, size } from './dictionary'

const isNormalCase = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isNormalCase">
        <B24Switch v-model="isNormalCase" />
      </B24FormField>
    </template>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo :is-normal-case="isNormalCase" :color="colorValue" :size="size" />
    </div>
  </ComponentShowExample>
</template>
