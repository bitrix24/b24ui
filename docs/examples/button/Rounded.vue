<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Rounded.vue'
import { colorValue, size } from './dictionary.js'

const isRounded = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isRounded">
        <B24Switch v-model="isRounded" />
      </B24FormField>
    </template>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo :is-rounded="isRounded" :color="colorValue" :size="size" />
    </div>
  </ComponentShowExample>
</template>
