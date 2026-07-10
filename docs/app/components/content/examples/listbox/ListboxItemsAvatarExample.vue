<script setup lang="ts">
import type { ListboxItem } from '@bitrix24/b24ui-nuxt'

const items = ref<ListboxItem[]>([
  {
    label: 'Assistant',
    avatar: {
      src: '/b24ui/avatar/assistant.png'
    }
  },
  {
    label: 'Employee',
    avatar: {
      src: '/b24ui/avatar/employee.png'
    }
  },
  {
    label: 'Bitrix24',
    avatar: {
      src: 'https://github.com/bitrix24.png'
    }
  }
])
</script>

<template>
  <B24Listbox :items="items" class="w-full" />
</template>
