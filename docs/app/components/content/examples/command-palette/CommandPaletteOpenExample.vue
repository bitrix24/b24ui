<script setup lang="ts">
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const open = ref(false)

const users = [
  {
    label: 'Assistant Name',
    suffix: 'assistant',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: '/b24ui/avatar/assistant.png',
      loading: 'lazy' as const
    }
  },
  {
    label: 'Bitrix24',
    suffix: 'bitrix24',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: 'https://github.com/bitrix24.png',
      loading: 'lazy' as const
    }
  },
  {
    label: 'Employee Name',
    suffix: 'employee',
    to: 'https://github.com/bitrix24',
    target: '_blank',
    avatar: {
      src: '/b24ui/avatar/employee.png',
      loading: 'lazy' as const
    }
  }
]
</script>

<template>
  <B24Modal v-model:open="open" :b24ui="{ content: 'p-0 pt-0 pb-2.5' }">
    <B24Button
      label="Search users..."
      :icon="SearchIcon"
    />

    <template #content>
      <B24CommandPalette close :groups="[{ id: 'users', items: users }]" @update:open="open = $event" />
    </template>
  </B24Modal>
</template>
