<script setup lang="ts">
import { ref } from 'vue'

import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Icon.vue'
import { colorList, colorValue, sizes, size } from './dictionary.js'

const label = ref('Button')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="label" class="w-full sm:w-1/4">
        <B24Input v-model="label" />
      </B24FormField>
      <div class="w-full sm:w-1/4">
        <B24FormField label="size">
          <B24Select v-model="size" :items="sizes" class="w-full" />
        </B24FormField>
      </div>
      <B24FormField label="color" class="w-full sm:w-1/4">
        <B24Select
          v-model="colorValue"
          :items="colorList"
          name="color"
          class="w-full"
        />
      </B24FormField>
    </template>
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
      <Demo
        :label="label"
        :color="colorValue"
        :size="size"
      />
    </div>
  </ComponentShowExample>
</template>
