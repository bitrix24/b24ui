<script setup lang="ts">
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

const searchTerm = ref('B')

function onSelect() {
  searchTerm.value = ''
}
</script>

<template>
  <B24CommandPalette
    v-model:search-term="searchTerm"
    :groups="[{ id: 'users', items: users }]"
    class="flex-1"
    @update:model-value="onSelect"
  />
</template>
