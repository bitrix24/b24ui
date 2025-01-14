<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/content/description-list'
import { tv } from '../../utils/tv'

const appConfig = _appConfig as AppConfig & { b24ui: { descriptionList: Partial<typeof theme> } }

const descriptionList = tv({ extend: tv(theme), ...(appConfig.b24ui?.descriptionList || {}) })

// type DescriptionListVariants = VariantProps<typeof descriptionList>

export interface DescriptionListProps {
  class?: any
  b24ui?: Partial<typeof descriptionList.slots>
}

// export interface DescriptionListEmits {}

// export interface DescriptionListSlots {}
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<DescriptionListProps>()
// const emits = defineEmits<DescriptionListEmits>()
// const slots = defineSlots<DescriptionListSlots>()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => descriptionList({}))
</script>

<template>
  <div class="w-full shrink-0">
    <h2 class="text-base/7 font-semibold text-base-950 sm:text-sm/6 dark:text-white">
      Order #1011
    </h2>
    <p class="mt-0.5 max-w-2/3 text-sm/6 text-gray-500">
      Personal details and application.
    </p>
    <dl class="mt-4 grid grid-cols-1 text-base/6 sm:grid-cols-[min(50%,theme(spacing.80))_auto] sm:text-sm/6">
      <dt
        class="col-start-1 border-t border-base-950/5 pt-3 text-base-500 sm:border-t sm:border-base-950/5 sm:py-3 dark:border-white/5 dark:text-base-400 sm:dark:border-white/5"
      >
        Customer
      </dt>
      <dd
        class="pb-3 pt-1 text-base-950 sm:border-t sm:border-base-950/5 sm:py-3 dark:text-white dark:sm:border-white/5"
      >
        Leslie Alexander
      </dd>
      <dt
        class="col-start-1 border-t border-base-950/5 pt-3 text-base-500 sm:border-t sm:border-base-950/5 sm:py-3 dark:border-white/5 dark:text-base-400 sm:dark:border-white/5"
      >
        Email
      </dt>
      <dd
        class="pb-3 pt-1 text-base-950 sm:border-t sm:border-base-950/5 sm:py-3 dark:text-white dark:sm:border-white/5"
      >
        <a href="mailto:leslie.alexander@example.com">leslie.alexander@example.com</a>
      </dd>
      <dt
        class="col-start-1 border-t border-base-950/5 pt-3 text-base-500 sm:border-t sm:border-base-950/5 sm:py-3 dark:border-white/5 dark:text-base-400 sm:dark:border-white/5"
      >
        Access
      </dt>
      <dd
        class="pb-3 pt-1 text-base-950 sm:border-t sm:border-base-950/5 sm:py-3 dark:text-white dark:sm:border-white/5"
      >
        Admin
      </dd>
    </dl>
  </div>
</template>
