<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-section'
import type { ButtonProps, IconComponent, PageFeatureProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageSection = ComponentConfig<typeof theme, AppConfig, 'pageSection'>

export interface PageSectionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'section'
   */
  as?: any
  /**
   * The headline displayed above the title.
   */
  headline?: string
  /**
   * The icon displayed above the title.
   * @IconComponent
   */
  icon?: IconComponent
  title?: string
  description?: string
  /**
   * Display a list of Button under the description.
   * `{ size: 'lg' }`{lang="ts-type"}
   */
  links?: ButtonProps[]
  /**
   * Display a list of PageFeature under the description.
   */
  features?: PageFeatureProps[]
  /**
   * The orientation of the section.
   * @defaultValue 'vertical'
   */
  orientation?: PageSection['variants']['orientation']
  /**
   * Reverse the order of the default slot.
   * @defaultValue false
   */
  reverse?: boolean
  class?: any
  b24ui?: PageSection['slots']
}

export interface PageSectionSlots {
  top?(props?: {}): VNode[]
  header?(props?: {}): VNode[]
  leading?(props: { b24ui: PageSection['b24ui'] }): VNode[]
  headline?(props?: {}): VNode[]
  title?(props?: {}): VNode[]
  description?(props?: {}): VNode[]
  body?(props?: {}): VNode[]
  features?(props?: {}): VNode[]
  footer?(props?: {}): VNode[]
  links?(props?: {}): VNode[]
  default?(props?: {}): VNode[]
  bottom?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { tv } from '../utils/tv'
import B24PageFeature from './PageFeature.vue'
import B24Container from './Container.vue'
import B24Button from './Button.vue'

const _props = withDefaults(defineProps<PageSectionProps>(), {
  as: 'section',
  orientation: 'vertical'
})
const slots = defineSlots<PageSectionSlots>()

const props = useComponentProps('pageSection', _props)

const appConfig = useAppConfig() as PageSection['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageSection || {}) })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title,
  description: !!props.description || !!slots.description,
  body: !!slots.body || (!!props.features?.length || !!slots.features)
}))
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot name="top" />

    <B24Container data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <div v-if="!!slots.header || (props.icon || !!slots.leading) || (props.headline || !!slots.headline) || (props.title || !!slots.title) || (props.description || !!slots.description) || !!slots.body || (props.features?.length || !!slots.features) || !!slots.footer || (props.links?.length || !!slots.links)" data-slot="wrapper" :class="b24ui.wrapper({ class: props.b24ui?.wrapper })">
        <div v-if="!!slots.header || (props.icon || !!slots.leading) || (props.headline || !!slots.headline) || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
          <slot name="header">
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

            <div v-if="props.headline || !!slots.headline" data-slot="headline" :class="b24ui.headline({ class: props.b24ui?.headline, headline: !slots.headline })">
              <slot name="headline">
                {{ props.headline }}
              </slot>
            </div>

            <h2 v-if="props.title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
              <slot name="title">
                {{ props.title }}
              </slot>
            </h2>

            <div v-if="props.description || !!slots.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
              <slot name="description">
                {{ props.description }}
              </slot>
            </div>
          </slot>
        </div>

        <div v-if="!!slots.body || (props.features?.length || !!slots.features)" data-slot="body" :class="b24ui.body({ class: props.b24ui?.body })">
          <slot name="body">
            <ul v-if="props.features?.length || !!slots.features" data-slot="features" :class="b24ui.features({ class: props.b24ui?.features })">
              <slot name="features">
                <B24PageFeature
                  v-for="(feature, index) in props.features"
                  :key="index"
                  as="li"
                  v-bind="feature"
                />
              </slot>
            </ul>
          </slot>
        </div>

        <div v-if="!!slots.footer || (props.links?.length || !!slots.links)" data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
          <slot name="footer">
            <div v-if="props.links?.length || !!slots.links" data-slot="links" :class="b24ui.links({ class: props.b24ui?.links })">
              <slot name="links">
                <B24Button v-for="(link, index) in props.links" :key="index" size="lg" v-bind="link" />
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <slot v-if="!!slots.default" />
      <div v-else-if="props.orientation === 'horizontal'" class="hidden lg:block" />
    </B24Container>

    <slot name="bottom" />
  </Primitive>
</template>
