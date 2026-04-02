<script setup lang="ts">
import type { DropdownMenuItem } from '@bitrix24/b24ui-nuxt'
import { refDebounced } from '@vueuse/core'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import SearchIcon from '@bitrix24/b24icons-vue/outline/SearchIcon'

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data: users, status, execute } = await useLazyFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'dropdown-menu-users-search',
  params: { q: searchTermDebounced },
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}`, loading: 'lazy' as const }
    })) as DropdownMenuItem[]
  },
  immediate: false
})

function onOpen() {
  if (!users.value?.length) {
    execute()
  }
}
</script>

<template>
  <B24DropdownMenu
    v-model:search-term="searchTerm"
    :items="users || []"
    :filter="{
      icon: SearchIcon,
      loading: status === 'pending'
    }"
    ignore-filter
    :content="{ align: 'start' }"
    :b24ui="{ content: 'w-48', viewport: 'w-48' }"
    @update:open="onOpen"
  >
    <B24Button label="Open" :icon="HamburgerMenuIcon" />
  </B24DropdownMenu>
</template>
