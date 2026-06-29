<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import ArrowToTheTopIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheTopIcon'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
}

const { data: users } = useLazyFetch('https://dummyjson.com/users?limit=100&select=firstName,lastName,email,image', {
  key: 'scroll-area-external-scroll-users',
  transform: (data?: { users: User[] }) => data?.users ?? [],
  default: () => [] as User[],
  server: false
})

// The container owns the scroll; the list virtualizes against it so everything shares one scrollbar.
const container = useTemplateRef('container')
const title = useTemplateRef('title')

const ITEM_SIZE = 88
const getScrollElement = () => container.value

// `scrollMargin` is the list's offset within the scroll element (border-box height of the header above it).
const { height: titleHeight } = useElementSize(title, undefined, { box: 'border-box' })
const scrollMargin = computed(() => titleHeight.value)

function scrollToTop() {
  container.value?.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div
    ref="container"
    class="w-full h-128 overflow-y-auto scrollbar-thin"
  >
    <div
      ref="title"
      class="sticky top-0 z-10 flex items-end justify-between gap-4 px-6 py-4 border-b border-muted bg-elevated/50 backdrop-blur"
    >
      <div>
        <h2 class="text-2xl font-bold">
          Members
        </h2>
        <p class="text-muted">
          This header and the virtualized list share one scrollbar.
        </p>
      </div>
      <B24Button
        :icon="ArrowToTheTopIcon"
        color="air-tertiary"
        label="Top"
        @click="scrollToTop"
      />
    </div>

    <B24ScrollArea
      v-slot="{ item }"
      :items="users"
      :virtualize="{ scrollMargin, getScrollElement, estimateSize: ITEM_SIZE, skipMeasurement: true }"
    >
      <B24PageCard
        orientation="horizontal"
        class="rounded-none"
      >
        <B24User
          :name="`${item.firstName} ${item.lastName}`"
          :description="item.email"
          :avatar="{ src: item.image, alt: item.firstName, loading: 'lazy' as const }"
          size="lg"
        />
      </B24PageCard>
    </B24ScrollArea>
  </div>
</template>
