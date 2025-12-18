<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import { sleepAction } from '~/utils/sleep'

type User = {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  image: string
}

type UserResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}

const skip = ref(0)

const { data, status, execute } = await useFetch('https://dummyjson.com/users?limit=10&select=firstName,lastName,username,email,image', {
  key: 'scroll-area-users-infinite-scroll',
  params: { skip },
  transform: async (data?: UserResponse) => {
    // Simulating a delay
    await sleepAction(1000)
    return data?.users
  },
  lazy: true,
  immediate: false
})

const users = ref<User[]>([])

watch(data, () => {
  users.value = [
    ...users.value,
    ...(data.value || [])
  ]
})

execute()

const scrollArea = useTemplateRef('scrollArea')

onMounted(() => {
  useInfiniteScroll(scrollArea.value?.$el, () => {
    skip.value += 10
  }, {
    distance: 200,
    canLoadMore: () => {
      return status.value !== 'pending'
    }
  })
})
</script>

<template>
  <B24ScrollArea
    ref="scrollArea"
    v-slot="{ item }"
    :items="users"
    :virtualize="{ estimateSize: 88 }"
    class="relative h-96 w-full scrollbar-thin"
  >
    <B24PageCard
      orientation="horizontal"
      class="rounded-none"
    >
      <B24User
        :name="`${item.firstName} ${item.lastName}`"
        :description="item.email"
        :avatar="{ src: item.image, alt: item.firstName, loading: 'lazy' }"
        size="lg"
      />
    </B24PageCard>
  </B24ScrollArea>

  <B24Progress
    v-show="status === 'pending'"
    animation="elastic"
    indeterminate
    size="xs"
    class="absolute top-0 inset-x-0 z-1"
    :b24ui="{ base: 'bg-(--ui-color-bg-content-primary)' }"
  />
</template>
