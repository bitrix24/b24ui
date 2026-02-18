<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { NavigationMenuRootProps, NavigationMenuContentProps, NavigationMenuContentEmits, AccordionRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/navigation-menu'
import type { AvatarProps, BadgeProps, ChipProps, IconComponent, LinkProps, PopoverProps, TooltipProps } from '../types'
import type { ArrayOrNested, DynamicSlots, GetItemKeys, MergeTypes, NestedItem, EmitsToProps } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type NavigationMenu = ComponentConfig<typeof theme, AppConfig, 'navigationMenu'>

/**
 * @memo not use in NavigationMenuChildItem
 * - description
 * - avatar
 * - b24ui
 * - children - only 1 level
 */
export interface NavigationMenuChildItem extends Omit<NavigationMenuItem, 'type' | 'b24ui' | 'avatar' | 'children'> {
  [key: string]: any
}

export interface NavigationMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string
  /**
   * Icon is only used when `orientation` is `vertical`
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * Avatar is only used when `orientation` is `vertical`
   * @AvatarProps
   */
  avatar?: AvatarProps
  /**
   * Display a badge on the item.
   * `{ size: 'xs', color: 'air-primary-alert' }`{lang="ts"}
   */
  badge?: string | number | BadgeProps
  /**
   * Display a chip around the icon of the item.
   * `{ inset: true }`{lang="ts-type"}
   */
  chip?: boolean | ChipProps
  /**
   * Display a hint on the item in `horizontal` orientation.
   */
  hint?: string
  /**
   * Display a tooltip on the item with the label of the item.
   * In `vertical` orientation, only works when the menu is `collapsed`.
   * In `horizontal` orientation, works on any item.
   */
  tooltip?: boolean | TooltipProps
  /**
   * Display a popover on the item when the menu is collapsed with the children list.
   * This has priority over the global `popover` prop.
   */
  popover?: boolean | PopoverProps
  /**
   * @IconComponent
   */
  trailingIcon?: IconComponent
  /**
   * The type of the item.
   * The `label` type is only displayed in `vertical` orientation.
   * The `trigger` type is used to force the item to be collapsible when its a link in `vertical` orientation.
   * @defaultValue 'link'
   */
  type?: 'label' | 'trigger' | 'link'
  slot?: string
  /**
   * The value of the item. Avoid using `index` as the value to prevent conflicts in horizontal orientation with Reka UI.
   * @defaultValue `item-${index}`
   */
  value?: string
  children?: NavigationMenuChildItem[]
  /**
   * With orientation=`horizontal` if `true` it will position the dropdown menu correctly
   */
  viewportRtl?: boolean
  defaultOpen?: boolean
  open?: boolean
  onSelect?: (e: Event) => void
  class?: any
  b24ui?: Pick<NavigationMenu['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLeadingChipSize' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkLeadingHint' | 'linkLeadingBadgeSize' | 'linkLeadingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childLabel' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkHint' | 'childLinkBadgeSize' | 'childLinkBadge' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'popoverWrapper'>
  [key: string]: any
}

type SingleOrMultipleType = 'single' | 'multiple'
type Orientation = NavigationMenu['variants']['orientation']

type NavigationMenuModelValue<
  K extends SingleOrMultipleType = SingleOrMultipleType,
  O extends Orientation = Orientation
> = O extends 'horizontal' ? string : K extends 'single' ? string : K extends 'multiple' ? string[] : string | string[]

/**
 * @memo remove contentOrientation
 * @memo remove highlight
 * @memo remove highlightColor
 * @memo remove arrow
 * @memo remove color
 * @memo remove variant (link) -> use variant.pill
 */

export interface NavigationMenuProps<
  T extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
  K extends SingleOrMultipleType = SingleOrMultipleType,
  O extends Orientation = Orientation
> extends Pick<NavigationMenuRootProps, 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>, Pick<AccordionRootProps, 'disabled' | 'collapsible'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * Determines whether a "single" or "multiple" items can be selected at a time.
   *
   * Only works when `orientation` is `vertical`.
   * @defaultValue 'multiple'
   */
  type?: K
  /**
   * The controlled value of the active item(s).
   * - In horizontal orientation: always `string`
   * - In vertical orientation with `type="single"`: `string`
   * - In vertical orientation with `type="multiple"`: `string[]`
   *
   * Use this when you need to control the state of the items. Can be binded with `v-model`
   */
  modelValue?: NavigationMenuModelValue<K, O>
  /**
   * The default active value of the item(s).
   * - In horizontal orientation: always `string`
   * - In vertical orientation with `type="single"`: `string`
   * - In vertical orientation with `type="multiple"`: `string[]`
   *
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: NavigationMenuModelValue<K, O>
  /**
   * The icon displayed to open the menu.
   * @defaultValue icons.chevronDown
   * @IconComponent
   */
  trailingIcon?: IconComponent
  /**
   * The icon displayed when the item is an external link.
   * Set to `false` to hide the external icon.
   * @defaultValue icons.external
   * @IconComponent
   */
  externalIcon?: boolean | IconComponent
  items?: T
  /**
   * The orientation of the menu.
   * @defaultValue 'horizontal'
   */
  orientation?: O
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
   * @defaultValue false
   */
  collapsed?: boolean
  /**
   * Display a tooltip on the items with the label of the item.
   * Only works when `orientation` is `vertical` and `collapsed` is `true`.
   * `{ delayDuration: 0, content: { side: 'right' } }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | TooltipProps
  /**
   * Display a popover on the items when the menu is collapsed with the children list.
   * `{ mode: 'hover', content: { side: 'right', align: 'center', alignOffset: 2 } }`{lang="ts-type"}
   * @defaultValue false
   */
  popover?: boolean | PopoverProps
  /**
   * The content of the menu.
   */
  content?: Omit<NavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<NavigationMenuContentEmits>>
  /**
   * The key used to get the value from the item.
   * @defaultValue 'value'
   */
  valueKey?: GetItemKeys<T>
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  class?: any
  b24ui?: NavigationMenu['slots']
}

export type NavigationMenuEmits<
  K extends SingleOrMultipleType = SingleOrMultipleType,
  O extends Orientation = Orientation
> = {
  /**
   * Event handler called when the value changes.
   * - In horizontal orientation: emits `string`
   * - In vertical orientation with `type="single"`: emits `string | undefined`
   * - In vertical orientation with `type="multiple"`: emits `string[] | undefined`
   */
  'update:modelValue': [value: NavigationMenuModelValue<K, O> | undefined]
}

type SlotProps<T extends NavigationMenuItem> = (props: { item: T, index: number, active?: boolean, b24ui: NavigationMenu['b24ui'] }) => any

export type NavigationMenuSlots<
  A extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
  T extends NestedItem<A> = NestedItem<A>
> = {
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': (props: { item: T, index: number, active?: boolean }) => any
  'item-trailing': SlotProps<T>
  'item-content': SlotProps<T> & { close?: () => void }
  'list-leading': (props?: {}) => any
  'list-trailing': (props?: {}) => any
}
& DynamicSlots<MergeTypes<T>, 'label', { index: number, active?: boolean, b24ui: NavigationMenu['b24ui'] }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing' | 'content', { index: number, active?: boolean, b24ui: NavigationMenu['b24ui'] }>

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<NavigationMenuItem>, K extends SingleOrMultipleType = SingleOrMultipleType, O extends Orientation = Orientation">
import { computed, toRef } from 'vue'
// @memo not use NavigationMenuIndicator
import { NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport, AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent, useForwardPropsEmits } from 'reka-ui'
import { defu } from 'defu'
import { reactivePick, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../composables/useComponentUI'
import { get, isArrayOfArray } from '../utils'
import { tv } from '../utils/tv'
import { pickLinkProps } from '../utils/link'
import icons from '../dictionary/icons'
import B24LinkBase from './LinkBase.vue'
import B24Link from './Link.vue'
import B24Avatar from './Avatar.vue'
import B24Badge from './Badge.vue'
import B24Chip from './Chip.vue'
import B24Popover from './Popover.vue'
import B24Tooltip from './Tooltip.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NavigationMenuProps<T, K, O>>(), {
  orientation: 'horizontal' as never,
  contentOrientation: 'horizontal',
  externalIcon: true,
  delayDuration: 0,
  type: 'multiple' as never,
  collapsible: true,
  unmountOnHide: true,
  valueKey: 'value',
  labelKey: 'label'
})
const emits = defineEmits<NavigationMenuEmits<K, O>>()
const slots = defineSlots<NavigationMenuSlots<T>>()

const appConfig = useAppConfig() as NavigationMenu['AppConfig']
const uiProp = useComponentUI('navigationMenu', props)

const rootProps = useForwardPropsEmits(computed(() => ({
  as: props.as,
  delayDuration: props.delayDuration,
  skipDelayDuration: props.skipDelayDuration,
  orientation: props.orientation,
  disableClickTrigger: props.disableClickTrigger,
  disableHoverTrigger: props.disableHoverTrigger,
  disablePointerLeaveClose: props.disablePointerLeaveClose,
  unmountOnHide: props.unmountOnHide
})), emits)
const accordionProps = useForwardPropsEmits(reactivePick(props, 'collapsible', 'disabled', 'type', 'unmountOnHide'), emits)
const contentProps = toRef(() => props.content)
const tooltipProps = toRef(() => defu(typeof props.tooltip === 'boolean' ? {} : props.tooltip, { ...(props.orientation === 'vertical' && { delayDuration: 0, content: { side: 'right' } }) }) as TooltipProps)
const popoverProps = toRef(() => defu(typeof props.popover === 'boolean' ? {} : props.popover, { arrow: true, mode: 'hover', content: { side: 'right', align: 'center', alignOffset: 2 } }) as PopoverProps)

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, active?: boolean }>()
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, level?: number }>({
  props: {
    item: Object,
    index: Number,
    level: Number
  }
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.navigationMenu || {}) })({
  orientation: props.orientation,
  collapsed: props.collapsed
}))

const lists = computed<NavigationMenuItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)

function getAccordionDefaultValue(list: NavigationMenuItem[], level = 0) {
  const indexes = list.reduce((acc: string[], item, index) => {
    if (item.defaultOpen || item.open) {
      acc.push(get(item, props.valueKey as string) ?? (level > 0 ? `item-${level}-${index}` : `item-${index}`))
    }
    return acc
  }, [])

  return props.type === 'single' ? indexes[0] : indexes
}
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof NavigationMenuSlots<T>)" :item="item" :index="index" :active="active" :b24ui="b24ui">
      <span data-slot="linkLabelWrapper" :class="b24ui.linkLabelWrapper({ class: uiProp?.linkLabelWrapper, active })">
        <slot
          :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof NavigationMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
          :b24ui="b24ui"
        >
          <template v-if="orientation === 'vertical' && item.type !== 'label'">
            <B24Chip
              v-if="item.icon && item.chip"
              :size="((item.b24ui?.linkLeadingChipSize || uiProp?.linkLeadingChipSize || b24ui.linkLeadingChipSize()) as ChipProps['size'])"
              inset
              v-bind="typeof item.chip === 'object' ? item.chip : {}"
              data-slot="linkLeadingChip"
            >
              <Component
                :is="item.icon"
                data-slot="linkLeadingIcon"
                :class="b24ui.linkLeadingIcon({ class: [uiProp?.linkLeadingIcon, item.b24ui?.linkLeadingIcon], active, disabled: !!item.disabled })"
              />
            </B24Chip>
            <Component
              :is="item.icon"
              v-else-if="item.icon"
              data-slot="linkLeadingIcon"
              :class="b24ui.linkLeadingIcon({ class: [uiProp?.linkLeadingIcon, item.b24ui?.linkLeadingIcon], active, disabled: !!item.disabled })"
            />
            <B24Avatar
              v-else-if="item.avatar"
              :size="((item.b24ui?.linkLeadingAvatarSize || uiProp?.linkLeadingAvatarSize || b24ui.linkLeadingAvatarSize()) as AvatarProps['size'])"
              v-bind="item.avatar"
              data-slot="linkLeadingAvatar"
              :class="b24ui.linkLeadingAvatar({ class: [uiProp?.linkLeadingAvatar, item.b24ui?.linkLeadingAvatar], active, disabled: !!item.disabled })"
            />
          </template>
          <div
            v-if="item.hint && item.type !== 'label' && orientation === 'horizontal'"
            data-slot="linkLeadingHint"
            :class="b24ui.linkLeadingHint({ class: [uiProp?.linkLeadingHint, item.b24ui?.linkLeadingHint] })"
          >
            {{ item.hint }}
          </div>
          <B24Badge
            v-if="(item.badge || item.badge === 0) && item.type !== 'label'"
            color="air-primary-alert"
            :size="((item.b24ui?.linkLeadingBadgeSize || uiProp?.linkLeadingBadgeSize || b24ui.linkLeadingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
            data-slot="linkLeadingBadge"
            :class="b24ui.linkLeadingBadge({ class: [uiProp?.linkLeadingBadge, item.b24ui?.linkLeadingBadge] })"
          />
        </slot>

        <span
          v-if="get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof NavigationMenuSlots<T>]"
          data-slot="linkLabel"
          :class="b24ui.linkLabel({ class: [uiProp?.linkLabel, item.b24ui?.linkLabel], active })"
        >
          <slot :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
            {{ get(item, props.labelKey as string) }}
          </slot>
          <Component
            :is="typeof externalIcon !== 'boolean' ? externalIcon : icons.external"
            v-if="item.target === '_blank' && externalIcon !== false"
            data-slot="linkLabelExternalIcon"
            :class="b24ui.linkLabelExternalIcon({ class: [uiProp?.linkLabelExternalIcon, item.b24ui?.linkLabelExternalIcon], active })"
          />
        </span>
      </span>

      <component
        :is="orientation === 'vertical' && item.children?.length && !collapsed ? AccordionTrigger : 'span'"
        v-if="/* (item.badge || item.badge === 0) || */(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length) || item.trailingIcon || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>]"
        as="span"
        data-slot="linkTrailing"
        :class="b24ui.linkTrailing({ class: [uiProp?.linkTrailing, item.b24ui?.linkTrailing] })"
        @click.stop.prevent
      >
        <slot
          :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
          :b24ui="b24ui"
        >
          <Component
            :is="item.trailingIcon || trailingIcon || icons.chevronDown"
            v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length)"
            data-slot="linkTrailingIcon"
            :class="b24ui.linkTrailingIcon({ class: [uiProp?.linkTrailingIcon, item.b24ui?.linkTrailingIcon], active })"
          />
          <Component
            :is="item.trailingIcon"
            v-else-if="item.trailingIcon"
            data-slot="linkTrailingIcon"
            :class="b24ui.linkTrailingIcon({ class: [uiProp?.linkTrailingIcon, item.b24ui?.linkTrailingIcon], active })"
          />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0 }">
    <component
      :is="(orientation === 'vertical' && !collapsed) ? AccordionItem : NavigationMenuItem"
      as="li"
      :value="get(item, props.valueKey as string) ?? (level > 0 ? `item-${level}-${index}` : `item-${index}`)"
    >
      <div
        v-if="orientation === 'vertical' && item.type === 'label' && !collapsed"
        data-slot="label"
        :class="b24ui.label({ class: [uiProp?.label, item.b24ui?.label, item.class] })"
      >
        <ReuseLinkTemplate :item="item" :index="index" />
      </div>
      <B24Link
        v-else-if="item.type !== 'label'"
        v-slot="{ active, ...slotProps }"
        v-bind="(orientation === 'vertical' && item.children?.length && !collapsed && item.type === 'trigger') ? {} : pickLinkProps(item as Omit<NavigationMenuItem, 'type'>)"
        custom
      >
        <component
          :is="(
            orientation === 'horizontal'
            && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>]))
            ? NavigationMenuTrigger
            : ((orientation === 'vertical' && item.children?.length && !collapsed && !(slotProps as any).href)
              ? AccordionTrigger
              : NavigationMenuLink
            )"
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <B24Popover
            v-if="orientation === 'vertical' && collapsed && item.children?.length && (!!props.popover || !!item.popover)"
            v-bind="{ ...popoverProps, ...(typeof item.popover === 'boolean' ? {} : item.popover || {}) }"
            :b24ui="{ content: b24ui.content({ class: [uiProp?.content, item.b24ui?.content] }) }"
          >
            <B24LinkBase
              v-bind="slotProps"
              data-slot="link"
              :class="b24ui.link({
                class: [uiProp?.link, item.b24ui?.link, item.class],
                active: active || item.active,
                disabled: !!item.disabled,
                level: level > 0
              })"
            >
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
            </B24LinkBase>

            <template #content="{ close }">
              <div data-slot="popoverWrapper" :class="b24ui.popoverWrapper({ class: uiProp?.popoverWrapper })">
                <slot
                  :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>)"
                  :item="item"
                  :active="active || item.active"
                  :index="index"
                  :b24ui="b24ui"
                  :close="close"
                >
                  <ul data-slot="childList" :class="b24ui.childList({ class: [uiProp?.childList, item.b24ui?.childList] })">
                    <li data-slot="childLabel" :class="b24ui.childLabel({ class: [uiProp?.childLabel, item.b24ui?.childLabel] })">
                      {{ get(item, props.labelKey as string) }}
                    </li>
                    <li
                      v-for="(childItem, childIndex) in item.children"
                      :key="childIndex"
                      data-slot="childItem"
                      :class="b24ui.childItem({ class: [uiProp?.childItem, item.b24ui?.childItem] })"
                    >
                      <B24Link v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                        <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                          <B24LinkBase
                            v-bind="childSlotProps"
                            data-slot="childLink"
                            :class="b24ui.childLink({ class: [uiProp?.childLink, item.b24ui?.childLink, childItem.class], active: childActive })"
                          >
                            <B24Chip
                              v-if="childItem.icon && childItem.chip"
                              :size="((childItem.b24ui?.linkLeadingChipSize || uiProp?.linkLeadingChipSize || b24ui.linkLeadingChipSize()) as ChipProps['size'])"
                              inset
                              v-bind="typeof childItem.chip === 'object' ? childItem.chip : {}"
                              data-slot="linkLeadingChip"
                            >
                              <Component
                                :is="childItem.icon"
                                data-slot="childLinkIcon"
                                :class="b24ui.childLinkIcon({ class: [uiProp?.childLinkIcon, item.b24ui?.childLinkIcon], active: childActive })"
                              />
                            </B24Chip>
                            <Component
                              :is="childItem.icon"
                              v-else-if="childItem.icon"
                              data-slot="childLinkIcon"
                              :class="b24ui.childLinkIcon({ class: [uiProp?.childLinkIcon, item.b24ui?.childLinkIcon], active: childActive })"
                            />
                            <div
                              v-if="childItem.hint"
                              data-slot="childLinkHint"
                              :class="b24ui.childLinkHint({ class: [uiProp?.childLinkHint, item.b24ui?.childLinkHint] })"
                            >
                              {{ childItem.hint }}
                            </div>

                            <span data-slot="childLinkLabel" :class="b24ui.childLinkLabel({ class: [uiProp?.childLinkLabel, item.b24ui?.childLinkLabel], active: childActive })">
                              {{ get(childItem, props.labelKey as string) }}
                            </span>
                            <Component
                              :is="typeof externalIcon === 'boolean' ? icons.external : externalIcon"
                              v-if="childItem.target === '_blank' && externalIcon !== false"
                              data-slot="childLinkLabelExternalIcon"
                              :class="b24ui.childLinkLabelExternalIcon({ class: [uiProp?.childLinkLabelExternalIcon, item.b24ui?.childLinkLabelExternalIcon], active: childActive })"
                            />
                          </B24LinkBase>
                        </NavigationMenuLink>
                      </B24Link>
                    </li>
                  </ul>
                </slot>
              </div>
            </template>
          </B24Popover>
          <B24Tooltip
            v-else-if="(orientation === 'vertical' && collapsed && (!!props.tooltip || !!item.tooltip)) || (orientation === 'horizontal' && !!item.tooltip)"
            :text="get(item, props.labelKey as string)"
            v-bind="{ ...tooltipProps, ...(typeof item.tooltip === 'boolean' ? {} : item.tooltip || {}) }"
          >
            <B24LinkBase
              v-bind="slotProps"
              data-slot="link"
              :class="b24ui.link({
                class: [uiProp?.link, item.b24ui?.link, item.class],
                active: active || item.active,
                disabled: !!item.disabled,
                level: level > 0
              })"
            >
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
            </B24LinkBase>
          </B24Tooltip>
          <B24LinkBase
            v-else
            v-bind="slotProps"
            data-slot="link"
            :class="b24ui.link({
              class: [uiProp?.link, item.b24ui?.link, item.class],
              active: active || item.active,
              disabled: !!item.disabled,
              level: orientation === 'horizontal' || level > 0
            })"
          >
            <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" />
          </B24LinkBase>
        </component>

        <NavigationMenuContent
          v-if="orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])"
          v-bind="contentProps"
          :data-viewport="item.viewportRtl ? 'rtl' : 'ltr'"
          data-slot="content"
          :class="b24ui.content({ class: [uiProp?.content, item.b24ui?.content] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>)"
            :item="item"
            :active="active || item.active"
            :index="index"
            :b24ui="b24ui"
          >
            <ul data-slot="childList" :class="b24ui.childList({ class: [uiProp?.childList, item.b24ui?.childList] })">
              <li
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                data-slot="childItem"
                :class="b24ui.childItem({ class: [uiProp?.childItem, item.b24ui?.childItem] })"
              >
                <B24Link
                  v-slot="{ active: childActive, ...childSlotProps }"
                  v-bind="pickLinkProps(childItem)"
                  custom
                >
                  <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                    <B24LinkBase
                      v-bind="childSlotProps"
                      data-slot="childLink"
                      :class="b24ui.childLink({ class: [uiProp?.childLink, childItem.childLink, childItem.class], active: childActive })"
                    >
                      <B24Chip
                        v-if="childItem.icon && childItem.chip"
                        :size="((childItem.b24ui?.linkLeadingChipSize || uiProp?.linkLeadingChipSize || b24ui.linkLeadingChipSize()) as ChipProps['size'])"
                        inset
                        v-bind="typeof childItem.chip === 'object' ? childItem.chip : {}"
                        data-slot="linkLeadingChip"
                      >
                        <Component
                          :is="childItem.icon"
                          data-slot="childLinkIcon"
                          :class="b24ui.childLinkIcon({ class: [uiProp?.childLinkIcon, item.b24ui?.childLinkIcon], active: childActive })"
                        />
                      </B24Chip>
                      <Component
                        :is="childItem.icon"
                        v-else-if="childItem.icon"
                        data-slot="childLinkIcon"
                        :class="b24ui.childLinkIcon({ class: [uiProp?.childLinkIcon, item.b24ui?.childLinkIcon], active: childActive })"
                      />

                      <div
                        v-if="childItem.hint"
                        data-slot="childLinkHint"
                        :class="b24ui.childLinkHint({ class: [uiProp?.childLinkHint, item.b24ui?.childLinkHint] })"
                      >
                        {{ childItem.hint }}
                      </div>
                      <div data-slot="childLinkWrapper" :class="b24ui.childLinkWrapper({ class: [uiProp?.childLinkWrapper, item.b24ui?.childLinkWrapper] })">
                        <p data-slot="childLinkLabel" :class="b24ui.childLinkLabel({ class: [uiProp?.childLinkLabel, item.b24ui?.childLinkLabel], active: childActive })">
                          {{ get(childItem, props.labelKey as string) }}
                        </p>
                        <B24Badge
                          v-if="childItem.badge !== undefined"
                          color="air-primary-alert"
                          :size="((item.b24ui?.childLinkBadgeSize || uiProp?.childLinkBadgeSize || b24ui.childLinkBadgeSize()) as BadgeProps['size'])"
                          v-bind="(typeof childItem.badge === 'string' || typeof childItem.badge === 'number') ? { label: childItem.badge } : childItem.badge"
                          data-slot="childLinkBadge"
                          :class="b24ui.childLinkBadge({ class: [uiProp?.childLinkBadge, item.b24ui?.childLinkBadge] })"
                        />
                      </div>
                      <Component
                        :is="typeof externalIcon === 'boolean' ? icons.external : externalIcon"
                        v-if="childItem.target === '_blank' && externalIcon !== false"
                        data-slot="childLinkLabelExternalIcon"
                        :class="b24ui.childLinkLabelExternalIcon({ class: [uiProp?.childLinkLabelExternalIcon, item.b24ui?.childLinkLabelExternalIcon], active: childActive })"
                      />
                    </B24LinkBase>
                  </NavigationMenuLink>
                </B24Link>
              </li>
            </ul>
          </slot>
        </NavigationMenuContent>
      </B24Link>

      <AccordionContent
        v-if="orientation === 'vertical' && item.children?.length && !collapsed"
        data-slot="content"
        :class="b24ui.content({ class: [uiProp?.content, item.b24ui?.content] })"
      >
        <AccordionRoot
          v-bind="({
            ...accordionProps,
            defaultValue: getAccordionDefaultValue(item.children, level + 1)
          } as AccordionRootProps)"
          as="ul"
          data-slot="childList"
          :class="b24ui.childList({ class: uiProp?.childList })"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            data-slot="childItem"
            :class="b24ui.childItem({ class: [uiProp?.childItem, childItem.b24ui?.childItem] })"
          />
        </AccordionRoot>
      </AccordionContent>
    </component>
  </DefineItemTemplate>

  <NavigationMenuRoot
    v-bind="{
      ...rootProps,
      ...(orientation === 'horizontal' ? {
        modelValue: modelValue as string,
        defaultValue: defaultValue as string
      } : {}),
      ...$attrs
    }"
    :data-collapsed="collapsed"
    data-component="section"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
  >
    <slot name="list-leading" />

    <template v-for="(list, listIndex) in lists" :key="`list-${listIndex}`">
      <component
        v-bind="orientation === 'vertical' && !collapsed ? {
          ...accordionProps,
          modelValue,
          defaultValue: defaultValue ?? getAccordionDefaultValue(list)
        } : {}"
        :is="orientation === 'vertical' ? AccordionRoot : NavigationMenuList"
        as="ul"
        data-slot="list"
        :class="b24ui.list({ class: uiProp?.list })"
      >
        <ReuseItemTemplate
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          data-slot="item"
          :class="b24ui.item({ class: [uiProp?.item, item.b24ui?.item] })"
        />
      </component>

      <div v-if="orientation === 'vertical' && listIndex < lists.length - 1" data-slot="separator" :class="b24ui.separator({ class: uiProp?.separator })" />
    </template>

    <slot name="list-trailing" />

    <div v-if="orientation === 'horizontal'" data-slot="viewportWrapper" :class="b24ui.viewportWrapper({ class: uiProp?.viewportWrapper })">
      <NavigationMenuViewport data-slot="viewport" :class="b24ui.viewport({ class: uiProp?.viewport })" />
    </div>
  </NavigationMenuRoot>
</template>
