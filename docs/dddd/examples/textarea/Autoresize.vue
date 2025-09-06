<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Autoresize.vue'

const isAutoresize = ref(true)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="isAutoresize">
        <B24Switch v-model="isAutoresize" />
      </B24FormField>
    </template>
    <Demo :is-autoresize="isAutoresize" />
  </ComponentShowExample>
</template>
