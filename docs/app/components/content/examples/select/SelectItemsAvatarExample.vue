<script setup lang="ts">
import type { SelectItem } from '@bitrix24/b24ui-nuxt'

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
] satisfies SelectItem[])

const value = ref(items.value[0]?.value)

const avatar = computed(() => items.value.find(item => item.value === value.value)?.avatar)
</script>

<template>
  <B24Select v-model="value" :items="items" value-key="value" :avatar="avatar" class="w-[192px]" />
</template>
