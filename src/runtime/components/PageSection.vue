<script lang="ts">
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
  top(props?: {}): any
  header(props?: {}): any
  leading(props: { b24ui: PageSection['b24ui'] }): any
  headline(props?: {}): any
  title(props?: {}): any
  description(props?: {}): any
  body(props?: {}): any
  features(props?: {}): any
  footer(props?: {}): any
  links(props?: {}): any
  default(props?: {}): any
  bottom(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { tv } from '../utils/tv'
import B24PageFeature from './PageFeature.vue'
import B24Container from './Container.vue'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<PageSectionProps>(), {
  as: 'section',
  orientation: 'vertical'
})
const slots = defineSlots<PageSectionSlots>()

const appConfig = useAppConfig() as PageSection['AppConfig']
const uiProp = useComponentUI('pageSection', props)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageSection || {}) })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title,
  description: !!props.description || !!slots.description,
  body: !!slots.body || (!!props.features?.length || !!slots.features)
}))
</script>

<template>
  <Primitive :as="as" :data-orientation="orientation" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <slot name="top" />

    <B24Container data-slot="container" :class="b24ui.container({ class: uiProp?.container })">
      <div v-if="!!slots.header || (icon || !!slots.leading) || (headline || !!slots.headline) || (title || !!slots.title) || (description || !!slots.description) || !!slots.body || (features?.length || !!slots.features) || !!slots.footer || (links?.length || !!slots.links)" data-slot="wrapper" :class="b24ui.wrapper({ class: uiProp?.wrapper })">
        <div v-if="!!slots.header || (icon || !!slots.leading) || (headline || !!slots.headline) || (title || !!slots.title) || (description || !!slots.description)" data-slot="header" :class="b24ui.header({ class: uiProp?.header })">
          <slot name="header">
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

            <div v-if="headline || !!slots.headline" data-slot="headline" :class="b24ui.headline({ class: uiProp?.headline, headline: !slots.headline })">
              <slot name="headline">
                {{ headline }}
              </slot>
            </div>

            <h2 v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: uiProp?.title })">
              <slot name="title">
                {{ title }}
              </slot>
            </h2>

            <div v-if="description || !!slots.description" data-slot="description" :class="b24ui.description({ class: uiProp?.description })">
              <slot name="description">
                {{ description }}
              </slot>
            </div>
          </slot>
        </div>

        <div v-if="!!slots.body || (features?.length || !!slots.features)" data-slot="body" :class="b24ui.body({ class: uiProp?.body })">
          <slot name="body">
            <ul v-if="features?.length || !!slots.features" data-slot="features" :class="b24ui.features({ class: uiProp?.features })">
              <slot name="features">
                <B24PageFeature
                  v-for="(feature, index) in features"
                  :key="index"
                  as="li"
                  v-bind="feature"
                />
              </slot>
            </ul>
          </slot>
        </div>

        <div v-if="!!slots.footer || (links?.length || !!slots.links)" data-slot="footer" :class="b24ui.footer({ class: uiProp?.footer })">
          <slot name="footer">
            <div v-if="links?.length || !!slots.links" data-slot="links" :class="b24ui.links({ class: uiProp?.links })">
              <slot name="links">
                <B24Button v-for="(link, index) in links" :key="index" size="lg" v-bind="link" />
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <slot v-if="!!slots.default" />
      <div v-else-if="orientation === 'horizontal'" class="hidden lg:block" />
    </B24Container>

    <slot name="bottom" />
  </Primitive>
</template>
