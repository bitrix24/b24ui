<script setup lang="ts">
import { ref } from 'vue'

/**
 * useFetch
 * @param url
 * @param options
 * @link https://nuxt.com/docs/api/composables/use-fetch
 * @see playground-vue/src/main.ts
 */
const useFetch = async (url: string, options: RequestInit & { transform?: (data) => any, lazy?: boolean } = {}) => {
  const data = ref()
  const status = ref('idle')
  async function _fetch() {
    status.value = 'loading'
    try {
      data.value = await fetch(url, options).then(r => r.json()).then(r => options.transform ? options.transform(r) : r)
      status.value = 'success'
    } catch (error) {
      console.error(error)
      status.value = 'error'
    }
  }
  _fetch()
  return Promise.resolve({
    data,
    status
  })
}

const { data: users, status } = await useFetch('https://jsonplaceholder.typicode.com/users', {
  transform: (data: { id: number, name: string }[]) => {
    return data?.map(user => ({
      label: user.name,
      value: String(user.id),
      avatar: { src: `https://i.pravatar.cc/120?img=${user.id}` }
    })) || []
  },
  lazy: true
})

function getUserAvatar(value: string) {
  return users.value?.find(user => user.value === value)?.avatar || {}
}
</script>

<template>
  <B24Select
    :items="users || []"
    :loading="status === 'pending'"
    icon="i-lucide-user"
    placeholder="Select user"
    class="w-48"
  >
    <template #leading="{ modelValue, ui }">
      <B24Avatar
        v-if="modelValue"
        v-bind="getUserAvatar(modelValue as string)"
        :size="ui.leadingAvatarSize()"
        :class="ui.leadingAvatar()"
      />
    </template>
  </B24Select>
</template>
