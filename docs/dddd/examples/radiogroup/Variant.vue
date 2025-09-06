<script setup lang="ts">
import { ref } from 'vue'
import theme from '#build/b24ui/radio-group'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Variant.vue'
import { colorList, colorValue } from './dictionary'

const variants = Object.keys(theme.variants.variant)
const variant = ref('table' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24RadioGroup v-model="variant" legend="variant" :items="variants" orientation="horizontal" />
      <B24FormField label="color" class="w-full sm:w-1/4">
        <B24Select
          v-model="colorValue"
          :items="colorList"
          name="color"
          class="w-full"
        />
      </B24FormField>
    </template>
    <Demo :color="colorValue" :variant="variant" />
  </ComponentShowExample>
</template>
