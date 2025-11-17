<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/breadcrumb'
import type { AvatarProps, IconComponent, LinkProps } from '../types'
import type { DynamicSlots, GetItemKeys } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Breadcrumb = ComponentConfig<typeof theme, AppConfig, 'breadcrumb'>

export interface BreadcrumbItem extends Omit<LinkProps, 'raw' | 'custom'> {
  label?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  slot?: string
  class?: any
  b24ui?: Pick<Breadcrumb['slots'], 'item' | 'link' | 'linkLeadingIcon' | 'linkLeadingAvatar' | 'linkLabel' | 'separator' | 'separatorIcon'>
  [key: string]: any
}

export interface BreadcrumbProps<T extends BreadcrumbItem = BreadcrumbItem> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any
  items?: T[]
  /**
   * The icon to use as a separator.
   * @defaultValue icons.chevronRight
   * @IconComponent
   */
  separatorIcon?: IconComponent
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  class?: any
  b24ui?: Breadcrumb['slots']
}

type SlotProps<T extends BreadcrumbItem> = (props: { item: T, index: number, active?: boolean, b24ui: Breadcrumb['b24ui'] }) => any

export type BreadcrumbSlots<T extends BreadcrumbItem = BreadcrumbItem> = {
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': (props: { item: T, index: number, active?: boolean }) => any
  'item-trailing': (props: { item: T, index: number, active?: boolean }) => any
  'separator': (props: { b24ui: Breadcrumb['b24ui'] }) => any
}
& DynamicSlots<T, 'leading', { index: number, active?: boolean, b24ui: Breadcrumb['b24ui'] }>
& DynamicSlots<T, 'label' | 'trailing', { index: number, active?: boolean }>

</script>

<script setup lang="ts" generic="T extends BreadcrumbItem">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { get } from '../utils'
import { tv } from '../utils/tv'
import { pickLinkProps } from '../utils/link'
import icons from '../dictionary/icons'
import B24Avatar from './Avatar.vue'
import B24LinkBase from './LinkBase.vue'
import B24Link from './Link.vue'

const props = withDefaults(defineProps<BreadcrumbProps<T>>(), {
  as: 'nav',
  labelKey: 'label'
})
const slots = defineSlots<BreadcrumbSlots<T>>()

const { dir } = useLocale()
const appConfig = useAppConfig() as Breadcrumb['AppConfig']

const separatorIcon = computed(() => props.separatorIcon || (dir.value === 'rtl' ? icons.chevronLeft : icons.chevronRight))

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.breadcrumb || {}) })())
</script>

<template>
  <Primitive :as="as" aria-label="breadcrumb" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <ol data-slot="list" :class="b24ui.list({ class: props.b24ui?.list })">
      <template v-for="(item, index) in items" :key="index">
        <li data-slot="item" :class="b24ui.item({ class: [props.b24ui?.item, item.b24ui?.item] })">
          <B24Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
            <B24LinkBase
              v-bind="slotProps"
              as="span"
              :aria-current="(item.active ?? active) && (index === items!.length - 1) ? 'page' : undefined"
              data-slot="link"
              :class="b24ui.link({ class: [props.b24ui?.link, item.b24ui?.link, item.class], active: item.active ?? (index === items!.length - 1), disabled: !!item.disabled, to: !!item.to })"
            >
              <slot
                :name="((item.slot || 'item') as keyof BreadcrumbSlots<T>)"
                :item="(item as Extract<T, { slot: string; }>)"
                :active="item.active ?? (index === items!.length - 1)"
                :index="index"
                :b24ui="b24ui"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-leading`: 'item-leading') as keyof BreadcrumbSlots<T>)"
                  :item="(item as Extract<T, { slot: string; }>)"
                  :active="item.active ?? (index === items!.length - 1)"
                  :index="index"
                  :b24ui="b24ui"
                >
                  <Component
                    :is="item.icon"
                    v-if="item.icon"
                    data-slot="linkLeadingIcon"
                    :class="b24ui.linkLeadingIcon({ class: [props.b24ui?.linkLeadingIcon, item.b24ui?.linkLeadingIcon], active: item.active ?? (index === items!.length - 1) })"
                  />
                  <B24Avatar
                    v-else-if="item.avatar"
                    :size="((props.b24ui?.linkLeadingAvatarSize || b24ui.linkLeadingAvatarSize()) as AvatarProps['size'])"
                    v-bind="item.avatar"
                    data-slot="linkLeadingAvatar"
                    :class="b24ui.linkLeadingAvatar({ class: [props.b24ui?.linkLeadingAvatar, item.b24ui?.linkLeadingAvatar], active: item.active ?? (index === items!.length - 1) })"
                  />
                </slot>

                <span
                  v-if="get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label`: 'item-label') as keyof BreadcrumbSlots<T>]"
                  data-slot="linkLabel"
                  :class="b24ui.linkLabel({ class: [props.b24ui?.linkLabel, item.b24ui?.linkLabel] })"
                >
                  <slot
                    :name="((item.slot ? `${item.slot}-label`: 'item-label') as keyof DynamicSlots<T, 'label'>)"
                    :item="(item as Extract<T, { slot: string; }>)"
                    :active="item.active ?? (index === items!.length - 1)"
                    :index="index"
                  >
                    {{ get(item, props.labelKey as string) }}
                  </slot>
                </span>

                <slot
                  :name="((item.slot ? `${item.slot}-trailing`: 'item-trailing') as keyof DynamicSlots<T, 'trailing'>)"
                  :item="(item as Extract<T, { slot: string; }>)"
                  :active="item.active ?? (index === items!.length - 1)"
                  :index="index"
                />
              </slot>
            </B24LinkBase>
          </B24Link>
        </li>

        <li v-if="index < items!.length - 1" role="presentation" aria-hidden="true" data-slot="separator" :class="b24ui.separator({ class: [props.b24ui?.separator, item.b24ui?.separator] })">
          <slot name="separator" :b24ui="b24ui">
            <Component
              :is="separatorIcon"
              data-slot="separatorIcon"
              :class="b24ui.separatorIcon({ class: [props.b24ui?.separatorIcon, item.b24ui?.separatorIcon] })"
            />
          </slot>
        </li>
      </template>
    </ol>
  </Primitive>
</template>
