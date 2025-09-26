<script setup lang="ts">
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'
import type { AvatarProps } from '@bitrix24/b24ui-nuxt'

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  key: 'typicode-users',
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    }))
  },
  lazy: true
})

function getUserAvatar(value: string) {
  return users.value?.find(user => user.value === value)?.avatar || {}
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
