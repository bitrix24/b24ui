<script setup lang="ts">
import type { AvatarProps } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

const { data: users, status, execute } = await useLazyFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users-email',
  transform: (data: { id: number, name: string, email: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      email: user.email,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}`, loading: 'lazy' as const }
    }))
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
  <B24InputMenu
    :items="users"
    :loading="status === 'pending'"
    :filter-fields="['label', 'email']"
    :icon="UserIcon"
    :trailing-icon="Expand1Icon"
    placeholder="Select user"
    class="w-80"
    :b24ui="{ content: 'w-80', viewport: 'w-80' }"
    @update:open="onOpen"
  >
    <template #leading="{ modelValue, b24ui }">
      <B24Avatar
        v-if="modelValue"
        v-bind="modelValue.avatar"
        :size="(b24ui.leadingAvatarSize() as AvatarProps['size'])"
        :class="b24ui.leadingAvatar()"
      />
    </template>

    <template #item-label="{ item }">
      {{ item.label }}

      <span class="text-description">
        {{ item.email }}
      </span>
    </template>
  </B24InputMenu>
</template>
