<script setup lang="ts">
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

const { data: users } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users-email',
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      email: user.email,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    }))
  },
  lazy: true
})
</script>

<template>
  <B24SelectMenu
    :items="users"
    :icon="UserIcon"
    :trailing-icon="Expand1Icon"
    placeholder="Select user"
    :b24ui="{ content: 'min-w-fit', viewport: 'min-w-fit', item: 'min-w-fit' }"
    class="w-[192px]"
  >
    <template #item-label="{ item }">
      {{ item.label }}

      <span class="text-(--b24ui-typography-description-color)">
        {{ item.email }}
      </span>
    </template>
  </B24SelectMenu>
</template>
