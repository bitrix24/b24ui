<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Label.vue'

const label = ref('All employees can post to Feed')
const isRequired = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isRequired">
        <B24Switch v-model="isRequired" size="xs" />
      </B24FormField>
      <B24FormField label="label" class="w-2/3">
        <B24Input v-model="label" type="search" />
      </B24FormField>
    </template>
    <Demo :label="label" :is-required="isRequired" />
  </ComponentShowExample>
</template>
