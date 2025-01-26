<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Description.vue'

const description = ref('Broadcast posting is allowed in Feed. These posts will be visible to everyone.')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="description" class="w-full sm:w-44">
        <B24Input v-model="description" />
      </B24FormField>
    </template>
    <div class="w-auto sm:max-w-2/3">
      <Demo :description="description" />
    </div>
  </ComponentShowExample>
</template>
