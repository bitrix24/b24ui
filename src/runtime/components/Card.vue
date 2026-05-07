<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/card'
import type { ComponentConfig } from '../types/tv'

type Card = ComponentConfig<typeof theme, AppConfig, 'card'>

export interface CardProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  title?: string
  description?: string
  /**
   * @defaultValue 'outline'
   */
  variant?: Card['variants']['variant']
  class?: any
  b24ui?: Card['slots']
}

export interface CardSlots {
  header?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
  footer?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'

const _props = defineProps<CardProps>()
const slots = defineSlots<CardSlots>()

const props = useComponentProps('card', _props)

const appConfig = useAppConfig() as Card['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.card || {}) })({
  variant: props.variant
}))
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
      <slot name="header">
        <div v-if="props.title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.default" data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
      <slot />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
