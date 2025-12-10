<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-card'
import type { IconComponent, LinkProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageCard = ComponentConfig<typeof theme, AppConfig, 'pageCard'>

/**
 * @memo not use spotlight
 * @memo not use spotlightColor
 */
export interface PageCardProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The icon displayed above the title.
   * @IconComponent
   */
  icon?: IconComponent
  title?: string
  description?: string
  /**
   * The orientation of the page card.
   * @defaultValue 'vertical'
   */
  orientation?: PageCard['variants']['orientation']
  /**
   * Reverse the order of the default slot.
   * @defaultValue false
   */
  reverse?: boolean
  /**
   * Display a line around the page card.
   */
  highlight?: boolean
  /**
   * @defaultValue 'air-primary'
   */
  highlightColor?: PageCard['variants']['highlightColor']
  /**
   * @defaultValue 'outline'
   */
  variant?: PageCard['variants']['variant']
  to?: LinkProps['to']
  target?: LinkProps['target']
  onClick?: (event: MouseEvent) => void | Promise<void>
  class?: any
  b24ui?: PageCard['slots']
}

export interface PageCardSlots {
  header(props?: {}): any
  body(props?: {}): any
  leading(props: { b24ui: PageCard['b24ui'] }): any
  title(props?: {}): any
  description(props?: {}): any
  footer(props?: {}): any
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { getSlotChildrenText } from '../utils'
import { tv } from '../utils/tv'
import B24Link from './Link.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PageCardProps>(), {
  orientation: 'vertical'
})
const slots = defineSlots<PageCardSlots>()

const cardRef = ref<HTMLElement>()

const appConfig = useAppConfig() as PageCard['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageCard || {}) })({
  orientation: props.orientation,
  reverse: props.reverse,
  variant: props.variant,
  to: !!props.to || !!props.onClick,
  title: !!props.title || !!slots.title,
  highlight: props.highlight,
  highlightColor: props.highlightColor
}))

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title())
  return (slotText || props.title || 'Card link').trim()
})
</script>

<template>
  <Primitive
    ref="cardRef"
    :as="as"
    :data-orientation="orientation"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    v-bind="$attrs"
    @click="onClick"
  >
    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <div v-if="!!slots.header || (icon || !!slots.leading) || !!slots.body || (title || !!slots.title) || (description || !!slots.description) || !!slots.footer" data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
        <div v-if="!!slots.header" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
          <slot name="header" />
        </div>

        <div v-if="icon || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
          <slot name="leading" :b24ui="b24ui">
            <Component :is="icon" v-if="icon" data-slot="leadingIcon" :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })" />
          </slot>
        </div>

        <div v-if="!!slots.body || (title || !!slots.title) || (description || !!slots.description)" data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
          <slot name="body">
            <div v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
              <slot name="title">
                {{ title }}
              </slot>
            </div>

            <div v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
              <slot name="description">
                {{ description }}
              </slot>
            </div>
          </slot>
        </div>

        <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
          <slot name="footer" />
        </div>
      </div>

      <slot />
    </div>

    <B24Link
      v-if="to"
      :aria-label="ariaLabel"
      v-bind="{ to, target }"
      class="focus:outline-none peer"
      raw
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </B24Link>
  </Primitive>
</template>
