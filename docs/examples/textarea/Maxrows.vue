<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Maxrows.vue'

const isAutoresize = ref(true)
const maxrows = ref(4)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="maxrows">
        <B24Input v-model.number="maxrows" type="number" :min="0" :max="1000" />
      </B24FormField>
      <B24FormField label="isAutoresize">
        <B24Switch v-model="isAutoresize" />
      </B24FormField>
    </template>
    <Demo :maxrows="maxrows" :is-autoresize="isAutoresize" />
  </ComponentShowExample>
</template>
