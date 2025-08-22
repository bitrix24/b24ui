<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Tag.vue'
import { colorList as tagColorList, colorValue as tagColorValue } from './../badge/dictionary'

const tag = ref('note')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="tag" class="w-full sm:w-1/4">
        <B24Input v-model="tag" />
      </B24FormField>
      <B24FormField label="tagColor" class="w-full sm:w-1/4">
        <B24Select
          v-model="tagColorValue"
          :items="tagColorList"
          name="color"
          class="w-full"
        />
      </B24FormField>
    </template>
    <Demo :tag-color="tagColorValue" :tag="tag" />
  </ComponentShowExample>
</template>
