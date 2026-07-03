<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-feature'
import type { IconComponent } from '../types/icons'
import type { LinkProps } from './Link.vue'
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
  onClick?: (event: MouseEvent) => void
  class?: any
  b24ui?: PageFeature['slots']
}

export interface PageFeatureSlots {
  leading?(props: { b24ui: PageFeature['b24ui'] }): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { usePrefix } from '../composables/usePrefix'
import { getSlotChildrenText } from '../utils'
import { tv } from '../utils/tv'
import B24Link from './Link.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<PageFeatureProps>(), {
  orientation: 'horizontal'
})
const slots = defineSlots<PageFeatureSlots>()

const props = useComponentProps('pageFeature', _props)

const appConfig = useAppConfig() as PageFeature['AppConfig']
const prefix = usePrefix()

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.pageFeature || {}) })({
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
  <Primitive
    :as="props.as"
    v-bind="!props.to ? $attrs : {}"
    :data-orientation="props.orientation"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    @click="props.onClick"
  >
    <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="b24ui.leading({ class: props.b24ui?.leading })">
      <slot name="leading" :b24ui="b24ui">
        <Component
          :is="props.icon"
          v-if="props.icon"
          data-slot="leadingIcon"
          :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
        />
      </slot>
    </div>

    <div data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
      <B24Link
        v-if="props.to"
        :aria-label="ariaLabel"
        v-bind="{ to: props.to, target: props.target, ...$attrs }"
        :class="prefix('focus:outline-none peer')"
        raw
      >
        <span :class="prefix('absolute inset-0')" aria-hidden="true" />
      </B24Link>

      <slot>
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
  </Primitive>
</template>
