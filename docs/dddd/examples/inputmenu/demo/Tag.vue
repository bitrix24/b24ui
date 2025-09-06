<script setup lang="ts">
import { ref } from 'vue'

export interface ExampleProps {
  tagColor?: any
  tag?: string
}

withDefaults(defineProps<ExampleProps>(), {
  tagColor: 'default',
  tag: 'info'
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
    :tag-color="tagColor"
    :tag="tag"
    :items="items"
    class="w-full"
  />
</template>
