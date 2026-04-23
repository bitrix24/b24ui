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
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'

const props = defineProps<CardProps>()
const slots = defineSlots<CardSlots>()

const appConfig = useAppConfig() as Card['AppConfig']
const uiProp = useComponentUI('card', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.card || {}) })({
  variant: props.variant
}))
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div v-if="!!slots.header || (title || !!slots.title) || (description || !!slots.description)" data-slot="header" :class="b24ui.header({ class: uiProp?.header })">
      <slot name="header">
        <div v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: uiProp?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </div>

        <div v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: uiProp?.description })">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.default" data-slot="body" :class="b24ui.body({ class: uiProp?.body })">
      <slot />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: uiProp?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
