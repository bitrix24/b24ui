<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/skeleton'
import type { ComponentConfig } from '../types/tv'

type Skeleton = ComponentConfig<typeof theme, AppConfig, 'skeleton'>

export interface SkeletonProps {
  /**
   * @defaultValue 'default'
   */
  accent?: Skeleton['variants']['accent']
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Skeleton['slots']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<SkeletonProps>(), {
  accent: 'default'
})

const props = useComponentProps('skeleton', _props)

const appConfig = useAppConfig() as Skeleton['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.skeleton || {}) })({
  accent: props.accent
}))
</script>

<template>
  <Primitive
    :as="props.as"
    aria-busy="true"
    aria-label="loading"
    aria-live="polite"
    role="alert"
    data-slot="base"
    :class="b24ui.base({ class: [props.b24ui?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
