<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Block.vue'
import { colorValue, size } from './dictionary'

const isBlock = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isBlock">
        <B24Switch v-model="isBlock" />
      </B24FormField>
    </template>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo :is-block="isBlock" :color="colorValue" :size="size" />
    </div>
  </ComponentShowExample>
</template>
