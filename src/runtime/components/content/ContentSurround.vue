<script lang="ts">
import type { PropType } from 'vue'
import type { ContentNavigationItem } from '@nuxt/content'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/content/content-surround'
import type { IconComponent } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ContentSurround = ComponentConfig<typeof theme, AppConfig, 'contentSurround'>

export interface ContentSurroundLink extends ContentNavigationItem {
  description?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  class?: any
  b24ui?: Pick<ContentSurround['slots'], 'link' | 'linkLeading' | 'linkLeadingIcon' | 'linkTitle' | 'linkDescription'>
}

export interface ContentSurroundProps<T extends ContentSurroundLink = ContentSurroundLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The icon displayed in the prev link.
   * @defaultValue icons.arrowLeft
   * @IconComponent
   */
  prevIcon?: IconComponent
  /**
   * The icon displayed in the next link.
   * @defaultValue icons.arrowRight
   * @IconComponent
   */
  nextIcon?: IconComponent
  surround?: T[]
  class?: any
  b24ui?: ContentSurround['slots']
}

type SlotProps<T> = (props: { link: T, b24ui: ContentSurround['b24ui'] }) => any

export interface ContentSurroundSlots<T extends ContentSurroundLink = ContentSurroundLink> {
  'link': SlotProps<T>
  'link-leading': SlotProps<T>
  'link-title': SlotProps<T>
  'link-description': SlotProps<T>
}
</script>

<script setup lang="ts" generic="T extends ContentSurroundLink">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Link from '../Link.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<ContentSurroundProps<T>>()
defineSlots<ContentSurroundSlots<T>>()

const appConfig = useAppConfig() as ContentSurround['AppConfig']
const uiProp = useComponentUI('contentSurround', props)

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ link?: ContentSurroundLink, icon: IconComponent, direction: 'left' | 'right' }>({
  props: {
    link: Object,
    icon: [Object, Function] as PropType<IconComponent>,
    direction: String as PropType<'left' | 'right'>
  }
})

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.contentSurround || {}) })())
</script>

<template>
  <DefineLinkTemplate v-slot="{ link, icon, direction }">
    <B24Link
      v-if="link"
      :to="link.path"
      raw
      data-slot="link"
      :class="b24ui.link({ class: [uiProp?.link, link.b24ui?.link, link.class], direction })"
    >
      <slot name="link" :link="(link as T)" :b24ui="b24ui">
        <div data-slot="linkLeading" :class="b24ui.linkLeading({ class: [uiProp?.linkLeading, link.b24ui?.linkLeading] })">
          <slot name="link-leading" :link="(link as T)" :b24ui="b24ui">
            <Component
              :is="link.icon || icon"
              data-slot="linkLeadingIcon"
              :class="b24ui.linkLeadingIcon({ class: [uiProp?.linkLeadingIcon, link.b24ui?.linkLeadingIcon], direction })"
            />
          </slot>
        </div>

        <p data-slot="linkTitle" :class="b24ui.linkTitle({ class: [uiProp?.linkTitle, link.b24ui?.linkTitle] })">
          <slot name="link-title" :link="(link as T)" :b24ui="b24ui">
            {{ link.title }}
          </slot>
        </p>

        <p data-slot="linkDescription" :class="b24ui.linkDescription({ class: [uiProp?.linkDescription, link.b24ui?.linkDescription] })">
          <slot name="link-description" :link="(link as T)" :b24ui="b24ui">
            {{ link.description }}
          </slot>
        </p>
      </slot>
    </B24Link>
    <span v-else class="hidden sm:block">&nbsp;</span>
  </DefineLinkTemplate>

  <Primitive v-if="surround" :as="as" v-bind="$attrs" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <ReuseLinkTemplate :link="surround[0]" :icon="prevIcon || icons.arrowLeft" direction="left" />
    <ReuseLinkTemplate :link="surround[1]" :icon="nextIcon || icons.arrowRight" direction="right" />
  </Primitive>
</template>
