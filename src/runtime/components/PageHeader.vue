<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-header'
import type { ButtonProps } from './Button.vue'
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
  headline?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  links?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'
import B24Button from './Button.vue'

const _props = defineProps<PageHeaderProps>()
const slots = defineSlots<PageHeaderSlots>()

const props = useComponentProps('pageHeader', _props)

const appConfig = useAppConfig() as PageHeader['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageHeader || {}) })({
  title: !!props.title || !!slots.title
}))
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div v-if="props.headline || !!slots.headline" data-slot="headline" :class="b24ui.headline({ class: props.b24ui?.headline })">
      <slot name="headline">
        {{ props.headline }}
      </slot>
    </div>

    <div data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <div data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
        <h1 v-if="props.title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h1>

        <div v-if="props.links?.length || !!slots.links" data-slot="links" :class="b24ui.links({ class: props.b24ui?.links })">
          <slot name="links">
            <B24Button
              v-for="(link, index) in props.links"
              :key="index"
              color="air-secondary-accent"
              size="sm"
              v-bind="link"
            />
          </slot>
        </div>
      </div>

      <div v-if="props.description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <slot />
    </div>
  </Primitive>
</template>
