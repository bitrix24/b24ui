<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'Assistant',
    value: 'assistant',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      alt: 'assistant'
    }
  },
  {
    label: 'Employee',
    value: 'employee',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      alt: 'employee'
    }
  }
])
const value = ref(items.value[1])
</script>

<template>
  <B24SelectMenu
    v-model="value"
    :items="items"
    :avatar="value?.avatar"
    class="w-full"
  />
</template>
