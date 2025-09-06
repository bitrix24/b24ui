<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Color.vue'
import { colorList, colorValue } from './dictionary'

const label = ref('Badge')
const inverted = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="inverted">
        <B24Switch v-model="inverted" />
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
    <Demo :label="label" :color="colorValue" :inverted="inverted" />
  </ComponentShowExample>
</template>
