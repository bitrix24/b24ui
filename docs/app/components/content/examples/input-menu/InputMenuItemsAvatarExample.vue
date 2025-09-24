<script setup lang="ts">
import type { InputMenuItem } from '@bitrix24/b24ui-nuxt'

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
] satisfies InputMenuItem[])

const value = ref(items.value[0])
</script>

<template>
  <B24InputMenu v-model="value" :avatar="value?.avatar" :items="items" />
</template>
