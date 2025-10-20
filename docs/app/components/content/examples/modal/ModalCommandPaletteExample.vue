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
  onRequestError ({ request }) { console.warn("[fetch request error]", request) }
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true
}])
</script>

<template>
  <B24Modal :b24ui="{ content: 'p-0 pt-0 pb-[10px]' }">
    <B24Button
      label="Search users..."
      :icon="PersonSearchIcon"
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
  </B24Modal>
</template>
