<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/badge'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Avatar.vue'
import { colorList, colorValue } from './dictionary'

const label = ref('Badge')

const sizes = Object.keys(theme.variants.size)
const size = ref('lg' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="size" class="w-full sm:w-1/4">
        <B24Select v-model="size" :items="sizes" class="w-full" />
      </B24FormField>
      <B24FormField label="color" class="w-full sm:w-1/4">
        <B24Select
          v-model="colorValue"
          :items="colorList"
          name="color"
          class="w-full"
        />
      </B24FormField>
      <B24FormField label="label" class="w-full sm:w-1/4">
        <B24Input v-model="label" />
      </B24FormField>
    </template>
    <div class="flex flex-row items-center justify-between gap-5">
      <Demo :label="label" :color="colorValue" :size="size" />
    </div>
  </ComponentShowExample>
</template>
