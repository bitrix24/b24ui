<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-feature'
import type { IconComponent, LinkProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageFeature = ComponentConfig<typeof theme, AppConfig, 'pageFeature'>

export interface PageFeatureProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The icon displayed next to the title when `orientation` is `horizontal` and above the title when `orientation` is `vertical`.
   * @IconComponent
   */
  icon?: IconComponent
  title?: string
  description?: string
  /**
   * The orientation of the page feature.
   * @defaultValue 'horizontal'
   */
  orientation?: PageFeature['variants']['orientation']
  to?: LinkProps['to']
  target?: LinkProps['target']
  onClick?: (event: MouseEvent) => void | Promise<void>
  class?: any
  b24ui?: PageFeature['slots']
}

export interface PageFeatureSlots {
  leading(props: { b24ui: PageFeature['b24ui'] }): any
  title(props?: {}): any
  description(props?: {}): any
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { getSlotChildrenText } from '../utils'
import { tv } from '../utils/tv'
import B24Link from './Link.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PageFeatureProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<PageFeatureSlots>()

const appConfig = useAppConfig() as PageFeature['AppConfig']
const uiProp = useComponentUI('pageFeature', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageFeature || {}) })({
  orientation: props.orientation,
  title: !!props.title || !!slots.title,
  to: !!props.to || !!props.onClick
}))

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title())
  return (slotText || props.title || 'Feature link').trim()
})
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })" @click="onClick">
    <div v-if="icon || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: uiProp?.leading })">
      <slot name="leading" :b24ui="b24ui">
        <Component
          :is="icon"
          v-if="icon"
          data-slot="leadingIcon"
          :class="b24ui.leadingIcon({ class: uiProp?.leadingIcon })"
        />
      </slot>
    </div>

    <div data-slot="wrapper" :class="b24ui.wrapper({ class: uiProp?.wrapper })">
      <B24Link
        v-if="to"
        :aria-label="ariaLabel"
        v-bind="{ to, target, ...$attrs }"
        class="focus:outline-none peer"
        raw
      >
        <span class="absolute inset-0" aria-hidden="true" />
      </B24Link>

      <slot>
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
  </Primitive>
</template>
