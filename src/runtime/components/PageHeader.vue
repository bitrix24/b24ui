<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-header'
import type { ButtonProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageHeader = ComponentConfig<typeof theme, AppConfig, 'pageHeader'>

export interface PageHeaderProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  headline?: string
  title?: string
  description?: string
  /**
   * Display a list of Button next to the title.
   * `{ color: 'air-secondary-accent', size: 'sm' }`{lang="ts-type"}
   */
  links?: ButtonProps[]
  class?: any
  b24ui?: PageHeader['slots']
}

export interface PageHeaderSlots {
  headline(props?: {}): any
  title(props?: {}): any
  description(props?: {}): any
  links(props?: {}): any
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'

const props = defineProps<PageHeaderProps>()
const slots = defineSlots<PageHeaderSlots>()

const appConfig = useAppConfig() as PageHeader['AppConfig']
const uiProp = useComponentUI('pageHeader', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageHeader || {}) })({
  title: !!props.title || !!slots.title
}))
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div v-if="headline || !!slots.headline" data-slot="headline" :class="b24ui.headline({ class: uiProp?.headline })">
      <slot name="headline">
        {{ headline }}
      </slot>
    </div>

    <div data-slot="container" :class="b24ui.container({ class: uiProp?.container })">
      <div data-slot="wrapper" :class="b24ui.wrapper({ class: uiProp?.wrapper })">
        <h1 v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: uiProp?.title })">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <div v-if="links?.length || !!slots.links" data-slot="links" :class="b24ui.links({ class: uiProp?.links })">
          <slot name="links">
            <B24Button
              v-for="(link, index) in links"
              :key="index"
              color="air-secondary-accent"
              size="sm"
              v-bind="link"
            />
          </slot>
        </div>
      </div>

      <div v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: uiProp?.description })">
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <slot />
    </div>
  </Primitive>
</template>
