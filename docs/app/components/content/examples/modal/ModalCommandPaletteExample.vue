<script setup lang="ts">
import PersonSearchIcon from '@bitrix24/b24icons-vue/outline/PersonSearchIcon'

const searchTerm = ref('')

const { data: users, status, execute } = await useLazyFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'modal-command-palette-users',
  params: { q: searchTerm },
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({ id: user.id, label: user.name, suffix: user.email, avatar: { src: `https://i.pravatar.cc/120?img=${user.id}`, loading: 'lazy' as const } })) || []
  },
  immediate: false
})

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value || [],
  ignoreFilter: true
}])

function onOpen() {
  if (!users.value?.length) {
    execute()
  }
}
</script>

<template>
  <B24Modal
    :b24ui="{ content: 'p-0 pt-0 pb-2.5' }"
    @update:open="onOpen"
  >
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
        class="h-80"
      />
    </template>
  </B24Modal>
</template>
