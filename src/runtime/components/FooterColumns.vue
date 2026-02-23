<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/footer-columns'
import type { IconComponent, LinkProps } from '../types'
import type { ComponentConfig } from '../types/tv'

type FooterColumns = ComponentConfig<typeof theme, AppConfig, 'footerColumns'>

export interface FooterColumnLink extends Omit<LinkProps, 'custom'> {
  label: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  class?: any
  b24ui?: Pick<FooterColumns['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeadingIcon'>
}

export interface FooterColumn<T extends FooterColumnLink = FooterColumnLink> {
  label: string
  children?: T[]
}

export interface FooterColumnsProps<T extends FooterColumnLink = FooterColumnLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  columns?: FooterColumn<T>[]
  b24ui?: FooterColumns['slots']
}

type SlotProps<T> = (props: { link: T, active: boolean, b24ui: FooterColumns['b24ui'] }) => any

export interface FooterColumnsSlots<T extends FooterColumnLink = FooterColumnLink> {
  'left'(props?: {}): any
  'default'(props?: {}): any
  'right'(props?: {}): any
  'column-label'?: (props: { column: FooterColumn<T> }) => any
  'link': SlotProps<T>
  'link-leading': SlotProps<T>
  'link-label'(props: { link: T, active: boolean }): any
  'link-trailing'(props: { link: T, active: boolean }): any
}
</script>

<script setup lang="ts" generic="T extends FooterColumnLink">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { pickLinkProps } from '../utils/link'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Link from './Link.vue'
import B24LinkBase from './LinkBase.vue'

const props = withDefaults(defineProps<FooterColumnsProps<T>>(), {
  as: 'nav'
})
const slots = defineSlots<FooterColumnsSlots<T>>()

const appConfig = useAppConfig() as FooterColumns['AppConfig']
const uiProp = useComponentUI('footerColumns', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.footerColumns || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })">
    <div v-if="!!slots.left" data-slot="left" :class="b24ui.left({ class: uiProp?.left })">
      <slot name="left" />
    </div>

    <div v-if="!!slots.default || columns?.length" data-slot="center" :class="b24ui.center({ class: uiProp?.center })">
      <slot>
        <div v-for="(column, index) in columns" :key="index">
          <h3 data-slot="label" :class="b24ui.label({ class: uiProp?.label })">
            <slot name="column-label" :column="column">
              {{ column.label }}
            </slot>
          </h3>

          <ul data-slot="list" :class="b24ui.list({ class: uiProp?.list })">
            <li v-for="(link, linkIndex) in column.children" :key="linkIndex" data-slot="item" :class="b24ui.item({ class: [uiProp?.item, link.b24ui?.item] })">
              <B24Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
                <B24LinkBase v-bind="slotProps" data-slot="link" :class="b24ui.link({ class: [uiProp?.link, link.b24ui?.link, link.class], active })">
                  <slot name="link" :link="(link as T)" :active="active" :b24ui="b24ui">
                    <slot name="link-leading" :link="(link as T)" :active="active" :b24ui="b24ui">
                      <Component
                        :is="link.icon"
                        v-if="link.icon"
                        data-slot="linkLeadingIcon"
                        :class="b24ui.linkLeadingIcon({ class: [uiProp?.linkLeadingIcon, link.b24ui?.linkLeadingIcon], active })"
                      />
                    </slot>

                    <span v-if="link.label || !!slots['link-label']" data-slot="linkLabel" :class="b24ui.linkLabel({ class: [uiProp?.linkLabel, link.b24ui?.linkLabel], active })">
                      <slot name="link-label" :link="(link as T)" :active="active">
                        {{ (link as T).label }}
                      </slot>
                    </span>

                    <slot name="link-trailing" :link="(link as T)" :active="active">
                      <Component
                        :is="icons.external"
                        v-if="link.target === '_blank'"
                        data-slot="linkLabelExternalIcon"
                        :class="b24ui.linkLabelExternalIcon({ class: [uiProp?.linkLabelExternalIcon, link.b24ui?.linkLabelExternalIcon], active })"
                      />
                    </slot>
                  </slot>
                </B24LinkBase>
              </B24Link>
            </li>
          </ul>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.right" data-slot="right" :class="b24ui.right({ class: uiProp?.right })">
      <slot name="right" />
    </div>
  </Primitive>
</template>
