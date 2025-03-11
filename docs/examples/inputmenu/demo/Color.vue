<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  color?: any
  isHighlight?: boolean
}

withDefaults(defineProps<ExampleProps>(), {
  color: 'default',
  isHighlight: true
})

const items = ref([
  {
    label: 'CRM settings',
    value: 'settings'
  },
  {
    label: 'My company details',
    value: 'my_company_details'
  },
  {
    label: 'Access permissions',
    value: 'access_permissions'
  }
])
const value = ref(items.value[1])
</script>

<template>
  <B24InputMenu
    v-model="value"
    :color="color"
    :highlight="isHighlight"
    :items="items"
    class="w-full"
  />
</template>
