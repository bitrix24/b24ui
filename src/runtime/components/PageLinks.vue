<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/page-links'
import type { IconComponent, LinkProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type PageLinks = ComponentConfig<typeof theme, AppConfig, 'pageLinks'>

export interface PageLink extends Omit<LinkProps, 'custom'> {
  label: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  class?: any
  b24ui?: Pick<PageLinks['slots'], 'item' | 'link' | 'linkWrapper' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeadingIcon'>
}

export interface PageLinksProps<T extends PageLink = PageLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any
  title?: string
  links?: T[]
  class?: any
  b24ui?: PageLinks['slots']
}

type SlotProps<T> = (props: { link: T, active: boolean, b24ui: PageLinks['b24ui'] }) => any

export interface PageLinksSlots<T extends PageLink = PageLink> {
  'title'(props?: {}): any
  'link': SlotProps<T>
  'link-leading': SlotProps<T>
  'link-label'(props: { link: T, active: boolean }): any
  'link-trailing'(props: { link: T, active: boolean }): any
}
</script>

<script setup lang="ts" generic="T extends PageLink">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { pickLinkProps } from '../utils/link'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Link from './Link.vue'
import B24LinkBase from './LinkBase.vue'

const props = withDefaults(defineProps<PageLinksProps<T>>(), {
  as: 'nav'
})
const slots = defineSlots<PageLinksSlots<T>>()

const appConfig = useAppConfig() as PageLinks['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.pageLinks || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <p v-if="title || !!slots.title" data-slot="title" :class="b24ui.title({ class: props.b24ui?.title })">
      <slot name="title">
        {{ title }}
      </slot>
    </p>

    <ul data-slot="list" :class="b24ui.list({ class: props.b24ui?.list })">
      <li v-for="(link, index) in links" :key="index" data-slot="item" :class="b24ui.item({ class: [props.b24ui?.item, link.b24ui?.item] })">
        <B24Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
          <B24LinkBase v-bind="slotProps" data-slot="link" :class="b24ui.link({ class: [props.b24ui?.link, link.b24ui?.link, link.class], active })">
            <slot name="link" :link="link" :active="active" :b24ui="b24ui">
              <div data-slot="linkWrapper" :class="b24ui.linkWrapper({ class: [props.b24ui?.linkWrapper, link.b24ui?.linkWrapper], active })">
                <slot name="link-leading" :link="link" :active="active" :b24ui="b24ui">
                  <Component
                    :is="link.icon"
                    v-if="link.icon"
                    data-slot="linkLeadingIcon"
                    :class="b24ui.linkLeadingIcon({ class: [props.b24ui?.linkLeadingIcon, link.b24ui?.linkLeadingIcon], active })"
                  />
                </slot>

                <div v-if="link.label || !!slots['link-label']" data-slot="linkLabel" :class="b24ui.linkLabel({ class: [props.b24ui?.linkLabel, link.b24ui?.linkLabel], active })">
                  <slot name="link-label" :link="link" :active="active">
                    {{ link.label }}
                  </slot>
                </div>
              </div>
              <Component
                :is="icons.external"
                v-if="link.target === '_blank'"
                data-slot="linkLabelExternalIcon"
                :class="b24ui.linkLabelExternalIcon({ class: [props.b24ui?.linkLabelExternalIcon, link.b24ui?.linkLabelExternalIcon], active })"
              />

              <slot name="link-trailing" :link="link" :active="active" />
            </slot>
          </B24LinkBase>
        </B24Link>
      </li>
    </ul>
  </Primitive>
</template>
