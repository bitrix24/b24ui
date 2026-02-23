<script setup lang="ts">
import PersonSearchIcon from '@bitrix24/b24icons-vue/outline/PersonSearchIcon'

const searchTerm = ref('')

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'command-palette-users',
  params: { q: searchTerm },
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` } })) || []
  },
  lazy: true,
  onRequestError({ request }) { console.warn('[fetch request error]', request) }
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true
}])
</script>

<template>
  <B24Drawer :handle="false">
    <B24Button
      label="Search users..."
      :icon="PersonSearchIcon"
      use-dropdown
      :b24ui="{ trailingIcon: 'rotate-180' }"
    />

    <template #content>
      <B24CommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        placeholder="Search users..."
        class="h-[320px]"
      />
    </template>
  </B24Drawer>
</template>
