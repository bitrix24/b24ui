<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/empty'
import type { ComponentConfig } from '../types/tv'
import type { ButtonProps, IconComponent } from '../types'

type Empty = ComponentConfig<typeof theme, AppConfig, 'empty'>

export interface EmptyProps {
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
   * Display a list of Button in the body.
   */
  actions?: ButtonProps[]
  /**
   * @defaultValue 'air-secondary-accent'
   */
  color?: Empty['variants']['color']
  /**
   * If set to `true` the color is inverted.
   * Used for 'air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot' and 'air-primary-warning' colors.
   * @defaultValue false
   */
  inverted?: boolean
  /**
   * @defaultValue 'md'
   */
  size?: Empty['variants']['size']
  class?: any
  b24ui?: Empty['slots']
}

export interface EmptySlots {
  header(props?: {}): any
  leading(props: { b24ui: Empty['b24ui'] }): any
  title(props?: {}): any
  description(props?: {}): any
  body(props?: {}): any
  actions(props?: {}): any
  footer(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<EmptyProps>(), {
  inverted: false
})
const slots = defineSlots<EmptySlots>()

const appConfig = useAppConfig() as Empty['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.empty || {}) })({
  color: props.color,
  inverted: Boolean(props.inverted),
  size: props.size
}))
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div v-if="!!slots.header || (icon || !!slots.leading) || (title || !!slots.title) || (description || !!slots.description)" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
      <slot name="header">
        <slot name="leading" :b24ui="b24ui">
          <div v-if="icon" data-slot="indicator" :class="b24ui.indicator({ class: props.b24ui?.indicator })">
            <Component
              :is="icon"
              data-slot="icon"
              :class="b24ui.icon({ class: props.b24ui?.icon })"
            />
          </div>
        </slot>

        <h2 v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </h2>

        <div v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.body || (actions?.length || !!slots.actions)" data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
      <slot name="body">
        <div v-if="actions?.length || !!slots.actions" data-slot="actions" :class="b24ui.actions({ class: props.b24ui?.actions })">
          <slot name="actions">
            <B24Button v-for="(action, index) in actions" :key="index" :size="size" v-bind="action" />
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
