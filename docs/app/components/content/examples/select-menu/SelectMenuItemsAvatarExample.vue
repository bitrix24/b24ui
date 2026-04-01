<script setup lang="ts">
import type { SelectMenuItem } from '@bitrix24/b24ui-nuxt'

const items = ref([
  {
    label: 'Assistant',
    value: 'assistant',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      alt: 'assistant',
      loading: 'lazy' as const
    }
  },
  {
    label: 'Employee',
    value: 'employee',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      alt: 'employee',
      loading: 'lazy' as const
    }
  }
] satisfies SelectMenuItem[])

const value = ref(items.value[0])
</script>

<template>
  <B24SelectMenu v-model="value" :avatar="value?.avatar" :items="items" class="w-48" />
</template>
