<script lang="ts">
import { tv } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/skeleton-task-add'
// @todo fix this content at src/theme/index.ts && src/templates.ts ////
// import theme from '#build/b24ui/content/skeleton-task-add'

const appConfig = _appConfig as AppConfig & { b24ui: { skeletonTaskAdd: Partial<typeof theme> } }

const skeletonTaskAdd = tv({ extend: tv(theme), ...(appConfig.b24ui?.skeletonTaskAdd || {}) })

export interface SkeletonTaskAddProps {
  class?: any
  b24ui?: Partial<typeof skeletonTaskAdd.slots>
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import B24Skeleton from './../Skeleton.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SkeletonTaskAddProps>(), {})

const b24ui = computed(() => skeletonTaskAdd({}))
</script>

<template>
  <div :class="b24ui.root({ class: [props.class, props.b24ui?.root] })" v-bind="$attrs">
    <div class="mb-4 flex flex-row flex-nowrap items-center justify-between gap-2 ">
      <B24Skeleton class="ml-xs2 h-xs2 w-[38%] rounded-3xs" />
      <div class="flex flex-row flex-nowrap items-center justify-between gap-4">
        <div class="border-2 border-gray-200 size-[40px] rounded-2xs flex items-center justify-center">
          <B24Skeleton class="h-xs2 w-[10px] rounded-3xs" />
        </div>
        <div class="border-2 border-gray-200 h-[40px] w-[150px] px-lg rounded-2xs flex items-center justify-center">
          <B24Skeleton class="h-xs2 w-full rounded-3xs" />
        </div>
      </div>
    </div>
    <div class="bg-white rounded-md p-lg flex flex-col flex-nowrap items-start justify-between">
      <div class="mb-12 w-full flex flex-col items-start justify-start gap-2">
        <B24Skeleton class="h-xs2 w-[76%] rounded-3xs mb-1.5" />
        <B24Skeleton class="h-xs w-[76%] rounded-3xs" />
        <B24Skeleton class="h-xs w-[76%] rounded-3xs" />
        <B24Skeleton class="h-xs w-[40%] rounded-3xs" />
      </div>

      <div class="mb-3 bg-gray-20 w-full h-14 rounded-md" />
      <div class="mb-6 bg-gray-20 w-full h-40 rounded-md" />
      <B24Skeleton class="mb-4 h-xs w-[42%] rounded-3xs" />
      <div class="mb-4 pt-4 w-full flex flex-row flex-nowrap items-center justify-between gap-2 border-t-1 border-t-gray-100 overflow-hidden">
        <div class="flex flex-row flex-nowrap items-center justify-between gap-4">
          <div class="bg-green-350 h-[40px] w-[100px] px-lg rounded-2xs flex items-center justify-center">
            <B24Skeleton class="h-xs2 w-full rounded-3xs bg-gray-50" />
          </div>
          <div class="border-2 border-gray-200 h-[40px] w-[150px] px-lg rounded-2xs flex items-center justify-center">
            <B24Skeleton class="h-xs2 w-full rounded-3xs" />
          </div>
        </div>
        <div class="flex flex-row flex-nowrap items-center justify-between gap-4">
          <div class="w-[140px]">
            <B24Skeleton class="h-xs2 w-full rounded-3xs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
