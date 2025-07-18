<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { DropdownMenuRootProps, DropdownMenuRootEmits, DropdownMenuContentProps, DropdownMenuContentEmits, DropdownMenuArrowProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dropdown-menu'
import type { AvatarProps, KbdProps, LinkProps, IconComponent } from '../types'
import type { ArrayOrNested, DynamicSlots, MergeTypes, NestedItem, EmitsToProps, ComponentConfig } from '../types/utils'

type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>

export interface DropdownMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string
  /**
   * Display an icon on the left side.
   * @IconComponent
   */
  icon?: IconComponent
  color?: DropdownMenu['variants']['color']
  avatar?: AvatarProps
  content?: Omit<DropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DropdownMenuContentEmits>>
  kbds?: KbdProps['value'][] | KbdProps[]
  /**
   * The item type.
   * @defaultValue 'link'
   */
  type?: 'label' | 'separator' | 'link' | 'checkbox'
  slot?: string
  loading?: boolean
  disabled?: boolean
  checked?: boolean
  open?: boolean
  defaultOpen?: boolean
  children?: ArrayOrNested<DropdownMenuItem>
  onSelect?(e: Event): void
  onUpdateChecked?(checked: boolean): void
  class?: any
  b24ui?: Pick<DropdownMenu['slots'], 'item' | 'label' | 'separator' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLabel' | 'itemLabelExternalIcon' | 'itemTrailing' | 'itemTrailingIcon' | 'itemTrailingKbds' | 'itemTrailingKbdsSize'>
  [key: string]: any
}

export interface DropdownMenuProps<T extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>> extends Omit<DropdownMenuRootProps, 'dir'> {
  /**
   * @defaultValue 'md'
   */
  size?: DropdownMenu['variants']['size']
  items?: T
  /**
   * The icon displayed when an item is checked.
   * @defaultValue icons.check
   * @IconComponent
   */
  checkedIcon?: IconComponent
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @defaultValue icons.external
   * @IconComponent
   */
  externalIcon?: boolean | IconComponent
  /**
   * The content of the menu.
   * @defaultValue { side: 'bottom', sideOffset: 8, collisionPadding: 8 }
   */
  content?: Omit<DropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DropdownMenuContentEmits>>
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean | Omit<DropdownMenuArrowProps, 'as' | 'asChild'>
  /**
   * Render the menu in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: keyof NestedItem<T>
  /**
   * @defaultValue false
   */
  disabled?: boolean
  class?: any
  b24ui?: DropdownMenu['slots']
}

export interface DropdownMenuEmits extends DropdownMenuRootEmits {}

type SlotProps<T extends DropdownMenuItem> = (props: { item: T, active?: boolean, index: number }) => any

export type DropdownMenuSlots<
  A extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>
> = {
  'default'(props: { open: boolean }): any
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
  'content-top': (props?: {}) => any
  'content-bottom': (props?: {}) => any
} & DynamicSlots<MergeTypes<T>, 'leading' | 'label' | 'trailing', { active?: boolean, index: number }>

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<DropdownMenuItem>">
import { computed, toRef } from 'vue'
import { defu } from 'defu'
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuArrow, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { omit } from '../utils'
import { tv } from '../utils/tv'
import B24DropdownMenuContent from './DropdownMenuContent.vue'

const props = withDefaults(defineProps<DropdownMenuProps<T>>(), {
  portal: true,
  modal: true,
  externalIcon: true,
  labelKey: 'label'
})
const emits = defineEmits<DropdownMenuEmits>()
const slots = defineSlots<DropdownMenuSlots<T>>()

const appConfig = useAppConfig() as DropdownMenu['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'defaultOpen', 'open', 'modal'), emits)
const contentProps = toRef(() => defu(props.content, { side: 'bottom', sideOffset: 8, collisionPadding: 8 }) as DropdownMenuContentProps)
const arrowProps = toRef(() => props.arrow as DropdownMenuArrowProps)
const proxySlots = omit(slots, ['default'])

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dropdownMenu || {}) })({
  size: props.size
}))
</script>

<template>
  <DropdownMenuRoot v-slot="{ open }" v-bind="rootProps">
    <DropdownMenuTrigger v-if="!!slots.default" as-child :class="props.class" :disabled="disabled">
      <slot :open="open" />
    </DropdownMenuTrigger>

    <B24DropdownMenuContent
      :class="b24ui.content({ class: [!slots.default && props.b24ui?.content, props.class] })"
      :b24ui="b24ui"
      :b24ui-override="props.b24ui"
      v-bind="contentProps"
      :items="items"
      :portal="portal"
      :label-key="(labelKey as keyof NestedItem<T>)"
      :checked-icon="checkedIcon"
      :external-icon="externalIcon"
    >
      <template v-for="(_, name) in proxySlots" #[name]="slotData">
        <slot :name="(name as keyof DropdownMenuSlots<T>)" v-bind="slotData" />
      </template>

      <DropdownMenuArrow v-if="!!arrow" v-bind="arrowProps" :class="b24ui.arrow({ class: props.b24ui?.arrow })" />
    </B24DropdownMenuContent>
  </DropdownMenuRoot>
</template>
