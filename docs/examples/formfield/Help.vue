<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Help.vue'

const help = ref('Please enter a valid email address.')
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="help" class="w-full sm:w-44">
        <B24Input v-model="help" />
      </B24FormField>
    </template>
    <Demo :help="help" />
  </ComponentShowExample>
</template>
