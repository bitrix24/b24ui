<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Color.vue'
import { colorList, colorValue } from './dictionary'

const isHighlight = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isHighlight">
        <B24Switch v-model="isHighlight" />
      </B24FormField>
      <B24FormField label="color" class="w-full sm:w-1/4">
        <B24Select
          v-model="colorValue"
          :items="colorList"
          name="color"
          class="w-full"
        />
      </B24FormField>
    </template>
    <Demo :color="colorValue" :is-highlight="isHighlight" />
  </ComponentShowExample>
</template>
