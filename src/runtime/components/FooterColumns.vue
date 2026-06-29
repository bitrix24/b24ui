<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/footer-columns'
import type { IconComponent } from '../types/icons'
import type { LinkProps } from './Link.vue'
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

type SlotProps<T> = (props: { link: T, active: boolean, b24ui: FooterColumns['b24ui'] }) => VNode[]

export interface FooterColumnsSlots<T extends FooterColumnLink = FooterColumnLink> {
  'left'?(props?: {}): VNode[]
  'default'?(props?: {}): VNode[]
  'right'?(props?: {}): VNode[]
  'column-label'?: (props: { column: FooterColumn<T> }) => VNode[]
  'link'?: SlotProps<T>
  'link-leading'?: SlotProps<T>
  'link-label'?(props: { link: T, active: boolean }): VNode[]
  'link-trailing'?(props: { link: T, active: boolean }): VNode[]
}
</script>

<script setup lang="ts" generic="T extends FooterColumnLink">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { pickLinkProps } from '../utils/link'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Link from './Link.vue'
import B24LinkBase from './LinkBase.vue'

const _props = withDefaults(defineProps<FooterColumnsProps<T>>(), {
  as: 'nav'
})
const slots = defineSlots<FooterColumnsSlots<T>>()

const props = useComponentProps<FooterColumnsProps<T>>('footerColumns', _props)

const appConfig = useAppConfig() as FooterColumns['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.footerColumns || {}) })())
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div v-if="!!slots.left" data-slot="left" :class="b24ui.left({ class: props.b24ui?.left })">
      <slot name="left" />
    </div>

    <div v-if="!!slots.default || props.columns?.length" data-slot="center" :class="b24ui.center({ class: props.b24ui?.center })">
      <slot>
        <div v-for="(column, index) in props.columns" :key="index">
          <h3 data-slot="label" :class="b24ui.label({ class: props.b24ui?.label })">
            <slot name="column-label" :column="column">
              {{ column.label }}
            </slot>
          </h3>

          <ul data-slot="list" :class="b24ui.list({ class: props.b24ui?.list })">
            <li v-for="(link, linkIndex) in column.children" :key="linkIndex" data-slot="item" :class="b24ui.item({ class: [props.b24ui?.item, link.b24ui?.item] })">
              <B24Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
                <B24LinkBase v-bind="slotProps" data-slot="link" :class="b24ui.link({ class: [props.b24ui?.link, link.b24ui?.link, link.class], active })">
                  <slot name="link" :link="(link as T)" :active="active" :b24ui="b24ui">
                    <slot name="link-leading" :link="(link as T)" :active="active" :b24ui="b24ui">
                      <Component
                        :is="link.icon"
                        v-if="link.icon"
                        data-slot="linkLeadingIcon"
                        :class="b24ui.linkLeadingIcon({ class: [props.b24ui?.linkLeadingIcon, link.b24ui?.linkLeadingIcon], active })"
                      />
                    </slot>

                    <span v-if="link.label || !!slots['link-label']" data-slot="linkLabel" :class="b24ui.linkLabel({ class: [props.b24ui?.linkLabel, link.b24ui?.linkLabel], active })">
                      <slot name="link-label" :link="(link as T)" :active="active">
                        {{ (link as T).label }}
                      </slot>
                    </span>

                    <slot name="link-trailing" :link="(link as T)" :active="active">
                      <Component
                        :is="icons.external"
                        v-if="link.target === '_blank'"
                        data-slot="linkLabelExternalIcon"
                        :class="b24ui.linkLabelExternalIcon({ class: [props.b24ui?.linkLabelExternalIcon, link.b24ui?.linkLabelExternalIcon], active })"
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

    <div v-if="!!slots.right" data-slot="right" :class="b24ui.right({ class: props.b24ui?.right })">
      <slot name="right" />
    </div>
  </Primitive>
</template>
