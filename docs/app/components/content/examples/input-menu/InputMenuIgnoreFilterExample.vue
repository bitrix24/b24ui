<script setup lang="ts">
import type { AvatarProps } from '@bitrix24/b24ui-nuxt'
import { refDebounced } from '@vueuse/core'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    }))
  },
  lazy: true,
  onRequestError ({ request }) { console.warn("[fetch request error]", request) }
})
</script>

<template>
  <B24InputMenu
    v-model:search-term="searchTerm"
    :items="users"
    :loading="status === 'pending'"
    ignore-filter
    :icon="UserIcon"
    :trailing-icon="Expand1Icon"
    placeholder="Select user"
  >
    <template #leading="{ modelValue, b24ui }">
      <B24Avatar
        v-if="modelValue"
        v-bind="modelValue.avatar"
        :size="(b24ui.leadingAvatarSize() as AvatarProps['size'])"
        :class="b24ui.leadingAvatar()"
      />
    </template>
  </B24InputMenu>
</template>
