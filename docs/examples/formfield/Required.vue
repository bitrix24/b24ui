<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Required.vue'

const label = ref('Email')
const isRequired = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="required">
        <B24Switch v-model="isRequired" />
      </B24FormField>
      <B24FormField label="label" class="w-full sm:w-44">
        <B24Input v-model="label" />
      </B24FormField>
    </template>
    <Demo :label="label" :is-required="isRequired" />
  </ComponentShowExample>
</template>
