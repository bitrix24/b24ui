<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Link.vue'

const asTag = ref('button')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="as" class="w-full sm:w-1/4">
        <B24Input v-model="asTag" />
      </B24FormField>
    </template>
    <div class="w-full flex flex-col items-center gap-8">
      <Demo :as-tag="asTag" />
    </div>
  </ComponentShowExample>
</template>
