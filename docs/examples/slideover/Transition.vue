<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Transition.vue'
import { title, description } from './dictionary'

const isTransition = ref(false)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isTransition">
        <B24Switch v-model="isTransition" />
      </B24FormField>
    </template>
    <Demo :is-transition="isTransition" :title="title" :description="description" />
  </ComponentShowExample>
</template>
