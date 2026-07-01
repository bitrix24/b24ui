<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import ArrowToTheTopIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheTopIcon'
import ArrowToTheLeftIcon from '@bitrix24/b24icons-vue/actions/ArrowToTheLeftIcon'

const props = withDefaults(defineProps<{
  orientation?: 'vertical' | 'horizontal'
}>(), {
  orientation: 'vertical'
})

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

const isHorizontal = computed(() => props.orientation === 'horizontal')

// The container owns the scroll; the list virtualizes against it so the header and cards share one scrollbar.
const container = useTemplateRef('container')
const title = useTemplateRef('title')

// Item size along the scroll axis: card width when horizontal, row height when vertical.
const itemSize = computed(() => isHorizontal.value ? 256 : 88)
const getScrollElement = () => container.value

// `scrollMargin` is the title's offset along the scroll axis: its width when it sits left of the cards, its height when above.
const { width: titleWidth, height: titleHeight } = useElementSize(title, undefined, { box: 'border-box' })
const scrollMargin = computed(() => isHorizontal.value ? titleWidth.value : titleHeight.value)

function scrollToStart() {
  container.value?.scrollTo(isHorizontal.value ? { left: 0, behavior: 'smooth' } : { top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div
    ref="container"
    :class="isHorizontal ? 'w-full overflow-x-auto scrollbar-thin' : 'w-full h-128 overflow-y-auto scrollbar-thin'"
  >
    <div :class="isHorizontal && 'flex'">
      <div
        ref="title"
        class="z-10 flex gap-4 bg-elevated/50 backdrop-blur"
        :class="isHorizontal
          ? 'sticky left-0 w-72 shrink-0 flex-col justify-center p-6 border-r border-muted'
          : 'sticky top-0 items-end justify-between px-6 py-4 border-b border-muted'"
      >
        <div>
          <h2 class="text-2xl font-bold">
            Members
          </h2>
          <p class="text-muted">
            This header scrolls away with the cards, sharing one scrollbar.
          </p>
        </div>
        <B24Button
          :icon="isHorizontal ? ArrowToTheLeftIcon : ArrowToTheTopIcon"
          color="air-tertiary"
          :class="isHorizontal && 'self-start'"
          :label="isHorizontal ? 'Start' : 'Top'"
          @click="scrollToStart"
        />
      </div>

      <B24ScrollArea
        v-slot="{ item }"
        :orientation="orientation"
        :items="users"
        :class="isHorizontal && 'h-48 shrink-0'"
        :virtualize="{ scrollMargin, getScrollElement, estimateSize: itemSize, skipMeasurement: isHorizontal }"
      >
        <B24PageCard
          orientation="horizontal"
          class="rounded-none h-full"
          :class="isHorizontal && 'w-64'"
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
  </div>
</template>
