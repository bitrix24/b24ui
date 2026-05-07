<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page'
import type { ComponentConfig } from '../types/tv'

type Page = ComponentConfig<typeof theme, AppConfig, 'page'>

export interface PageProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: Page['slots']
}

export interface PageSlots {
  left?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
  right?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed, onBeforeUpdate, shallowRef } from 'vue'
import { Primitive, Slot } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = defineProps<PageProps>()
const slots = defineSlots<PageSlots>()

const props = useComponentProps('page', _props)

const appConfig = useAppConfig() as Page['AppConfig']

const hasLeft = shallowRef(!!slots.left)
const hasRight = shallowRef(!!slots.right)

onBeforeUpdate(() => {
  hasLeft.value = !!slots.left
  hasRight.value = !!slots.right
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.page || {}) })({
  left: hasLeft.value,
  right: hasRight.value
}))
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <Slot v-if="!!slots.left" data-slot="left" :class="b24ui.left({ class: props.b24ui?.left })">
      <slot name="left" />
    </Slot>

    <div data-slot="center" :class="b24ui.center({ class: props.b24ui?.center })">
      <slot />
    </div>

    <Slot v-if="!!slots.right" data-slot="right" :class="b24ui.right({ class: props.b24ui?.right })">
      <slot name="right" />
    </Slot>
  </Primitive>
</template>
