<script setup lang="ts">
import { ref } from 'vue'
import { refDebounced } from '@vueuse/core'
import UserIcon from '@bitrix24/b24icons-vue/common-b24/UserIcon'
import Expand1Icon from '@bitrix24/b24icons-vue/actions/Expand1Icon'

const searchTerm = ref('')
const searchTermDebounced = refDebounced(searchTerm, 200)

const { data: users, status: status } = await globalThis.useFetch('https://jsonplaceholder.typicode.com/users', {
  params: { q: searchTermDebounced },
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    })) || []
  },
  lazy: true
})
</script>

<template>
  <B24SelectMenu
    v-model:search-term="searchTerm"
    :items="users || []"
    :loading="status === 'pending'"
    ignore-filter
    :icon="UserIcon"
    :trailing-icon="Expand1Icon"
    class="w-full"
    placeholder="Select user"
  >
    <template #leading="{ modelValue, b24ui }">
      <B24Avatar
        v-if="modelValue"
        v-bind="modelValue.avatar"
        :size="b24ui.leadingAvatarSize()"
        :class="b24ui.leadingAvatar()"
      />
    </template>
  </B24SelectMenu>
</template>
