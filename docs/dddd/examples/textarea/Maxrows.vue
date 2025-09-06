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
      <B24FormField label="maxrows" class="w-28">
        <B24InputNumber v-model.number="maxrows" :min="0" :max="100" />
      </B24FormField>
      <B24FormField label="isAutoresize">
        <B24Switch v-model="isAutoresize" />
      </B24FormField>
    </template>
    <Demo :maxrows="maxrows" :is-autoresize="isAutoresize" />
  </ComponentShowExample>
</template>
