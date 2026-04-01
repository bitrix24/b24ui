<script setup lang="ts">
import type { AvatarProps } from '@bitrix24/b24ui-nuxt'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

const { data: users, status, execute } = await useLazyFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users',
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}`, loading: 'lazy' as const }
    }))
  },
  immediate: false
})

function getUserAvatar(value: string) {
  return users.value?.find(user => user.value === value)?.avatar || {}
}

function onOpen() {
  if (!users.value?.length) {
    execute()
  }
}
</script>

<template>
  <B24Select
    :items="users"
    :loading="status === 'pending'"
    :icon="UserIcon"
    :trailing-icon="Expand1Icon"
    placeholder="Select user"
    value-key="value"
    class="w-48"
    @update:open="onOpen"
  >
    <template #leading="{ modelValue, b24ui }">
      <B24Avatar
        v-if="modelValue"
        v-bind="getUserAvatar(modelValue)"
        :size="(b24ui.leadingAvatarSize() as AvatarProps['size'])"
        :class="b24ui.leadingAvatar()"
      />
    </template>
  </B24Select>
</template>
