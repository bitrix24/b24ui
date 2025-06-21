<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { NavigationMenuRootProps, NavigationMenuRootEmits, NavigationMenuContentProps, NavigationMenuContentEmits, AccordionRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/navigation-menu'
import type { AvatarProps, BadgeProps, LinkProps, TooltipProps, IconComponent } from '../types'
import type { ArrayOrNested, DynamicSlots, MergeTypes, NestedItem, EmitsToProps, ComponentConfig } from '../types/utils'

type NavigationMenu = ComponentConfig<typeof theme, AppConfig, 'navigationMenu'>

export interface NavigationMenuChildItem extends Omit<NavigationMenuItem, 'type' | 'b24ui'> {
  /** Description is only used when `orientation` is `horizontal`. */
  description?: string
  [key: string]: any
}

export interface NavigationMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  label?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'danger', depth: 'dark' }`{lang="ts-type"}
   */
  badge?: string | number | BadgeProps
  /**
   * Display a tooltip on the item.
   * Only works when `type` is `link`.
   * `{ content: { side: 'right' } }`{lang="ts-type"}
   */
  tooltip?: TooltipProps
  /**
   * @IconComponent
   */
  trailingIcon?: IconComponent
  /**
   * The type of the item.
   * The `label` type only works on `vertical` orientation.
   * @defaultValue 'link'
   */
  type?: 'label' | 'link'
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
  onSelect?(e: Event): void
  class?: any
  b24ui?: Pick<NavigationMenu['slots'], 'item' | 'linkLeadingAvatarSize' | 'linkLeadingAvatar' | 'linkLeadingIcon' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkTrailing' | 'linkTrailingBadgeSize' | 'linkTrailingBadge' | 'linkTrailingIcon' | 'label' | 'link' | 'content' | 'childList' | 'childItem' | 'childLink' | 'childLinkIcon' | 'childLinkWrapper' | 'childLinkLabel' | 'childLinkLabelExternalIcon' | 'childLinkDescription'>
  [key: string]: any
}

export interface NavigationMenuProps<T extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>> extends Pick<NavigationMenuRootProps, 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'>, Pick<AccordionRootProps, 'disabled' | 'type' | 'collapsible'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
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
   * @defaultValue 'primary'
   */
  color?: NavigationMenu['variants']['color']
  /**
   * @defaultValue 'pill'
   */
  variant?: NavigationMenu['variants']['variant']
  /**
   * The orientation of the menu.
   * @defaultValue 'horizontal'
   */
  orientation?: NavigationMenuRootProps['orientation']
  /**
   * Collapse the navigation menu to only show icons.
   * Only works when `orientation` is `vertical`.
   * @defaultValue false
   */
  collapsed?: boolean
  /** Display a line next to the active item. */
  highlight?: boolean
  /**
   * @defaultValue 'primary'
   */
  highlightColor?: NavigationMenu['variants']['highlightColor']
  /**
   * The content of the menu.
   */
  content?: Omit<NavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<NavigationMenuContentEmits>>
  /**
   * The orientation of the content.
   * Only works when `orientation` is `horizontal`.
   * @defaultValue 'vertical'
   */
  contentOrientation?: NavigationMenu['variants']['contentOrientation']
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: keyof NestedItem<T>
  class?: any
  b24ui?: NavigationMenu['slots']
}

export interface NavigationMenuEmits extends NavigationMenuRootEmits {}

type SlotProps<T extends NavigationMenuItem> = (props: { item: T, index: number, active?: boolean }) => any

export type NavigationMenuSlots<
  A extends ArrayOrNested<NavigationMenuItem> = ArrayOrNested<NavigationMenuItem>,
  T extends NestedItem<A> = NestedItem<A>
> = {
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
  'item-content': SlotProps<T>
  'list-leading': (props?: {}) => any
  'list-trailing': (props?: {}) => any
} & DynamicSlots<MergeTypes<T>, 'leading' | 'label' | 'trailing' | 'content', { index: number, active?: boolean }>

</script>

<script setup lang="ts" generic="T extends ArrayOrNested<NavigationMenuItem>">
import { computed, toRef } from 'vue'
import { NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent, useForwardPropsEmits } from 'reka-ui'
import { reactivePick, createReusableTemplate } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { get, isArrayOfArray } from '../utils'
import { tv } from '../utils/tv'
import { pickLinkProps } from '../utils/link'
import icons from '../dictionary/icons'
import B24LinkBase from './LinkBase.vue'
import B24Link from './Link.vue'
import B24Avatar from './Avatar.vue'
import B24Badge from './Badge.vue'
import B24Tooltip from './Tooltip.vue'

const props = withDefaults(defineProps<NavigationMenuProps<T>>(), {
  orientation: 'horizontal',
  contentOrientation: 'vertical',
  externalIcon: true,
  delayDuration: 0,
  type: 'multiple',
  collapsible: true,
  unmountOnHide: true,
  labelKey: 'label'
})
const emits = defineEmits<NavigationMenuEmits>()
const slots = defineSlots<NavigationMenuSlots<T>>()

const appConfig = useAppConfig() as NavigationMenu['AppConfig']

const rootProps = useForwardPropsEmits(computed(() => ({
  as: props.as,
  modelValue: props.modelValue,
  defaultValue: props.defaultValue,
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

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, active?: boolean }>()
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, level?: number }>({
  props: {
    item: Object,
    index: Number,
    // @memo problem compile
    level: {
      type: Number,
      default: 0
    }
  }
})

const getLabel = (item: NavigationMenuItem) => {
  return get(item, props.labelKey as string)
}

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.navigationMenu || {}) })({
  orientation: props.orientation,
  contentOrientation: props.orientation === 'vertical' ? undefined : props.contentOrientation,
  collapsed: props.collapsed,
  color: props.color,
  variant: props.variant,
  highlight: props.highlight,
  highlightColor: props.highlightColor || props.color
}))

const lists = computed<NavigationMenuItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)

function getAccordionDefaultValue(list: NavigationMenuItem[]) {
  function findItemsWithDefaultOpen(items: NavigationMenuItem[], level = 0): string[] {
    return items.reduce((acc: string[], item, index) => {
      if (item.defaultOpen || item.open) {
        acc.push(item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`))
      }
      if (item.children?.length) {
        acc.push(...findItemsWithDefaultOpen(item.children, level + 1))
      }
      return acc
    }, [])
  }

  const indexes = findItemsWithDefaultOpen(list)

  return props.type === 'single' ? indexes[0] : indexes
}
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot :name="((item.slot || 'item') as keyof NavigationMenuSlots<T>)" :item="item" :index="index">
      <span :class="b24ui.linkLabelWrapper({ class: props.b24ui?.linkLabelWrapper, active })">
        <slot :name="((item.slot ? `${item.slot}-leading` : 'item-leading') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
          <Component
            :is="item.icon"
            v-if="item.icon"
            :class="b24ui.linkLeadingIcon({ class: [props.b24ui?.linkLeadingIcon, item.b24ui?.linkLeadingIcon], active, disabled: !!item.disabled })"
          />
          <B24Avatar v-else-if="item.avatar" :size="((item.b24ui?.linkLeadingAvatarSize || props.b24ui?.linkLeadingAvatarSize || b24ui.linkLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="b24ui.linkLeadingAvatar({ class: [props.b24ui?.linkLeadingAvatar, item.b24ui?.linkLeadingAvatar], active, disabled: !!item.disabled })" />
        </slot>

        <span
          v-if="(!collapsed || orientation !== 'vertical') && (getLabel(item) || !!slots[(item.slot ? `${item.slot}-label` : 'item-label') as keyof NavigationMenuSlots<T>])"
          :class="b24ui.linkLabel({ class: [props.b24ui?.linkLabel, item.b24ui?.linkLabel], active })"
        >
          <slot :name="((item.slot ? `${item.slot}-label` : 'item-label') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
            {{ getLabel(item) }}
          </slot>

          <Component
            :is="typeof externalIcon !== 'boolean' ? externalIcon : icons.external"
            v-if="item.target === '_blank' && externalIcon !== false"
            :class="b24ui.linkLabelExternalIcon({ class: [props.b24ui?.linkLabelExternalIcon, item.b24ui?.linkLabelExternalIcon], active })"
          />
        </span>
      </span>
      <component
        :is="orientation === 'vertical' && item.children?.length ? AccordionTrigger : 'span'"
        v-if="(!collapsed || orientation !== 'vertical') && (item.badge || (orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length) || item.trailingIcon || !!slots[(item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>])"
        :class="b24ui.linkTrailing({ class: [props.b24ui?.linkTrailing, item.b24ui?.linkTrailing] })"
      >
        <slot :name="((item.slot ? `${item.slot}-trailing` : 'item-trailing') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
          <Component
            :is="item.trailingIcon || trailingIcon || icons.chevronDown"
            v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) || (orientation === 'vertical' && item.children?.length)"
            as="span"
            :class="b24ui.linkTrailingIcon({ class: [props.b24ui?.linkTrailingIcon, item.b24ui?.linkTrailingIcon], active })"
            @click.stop.prevent
          />
          <Component
            :is="item.trailingIcon"
            v-else-if="item.trailingIcon"
            :class="b24ui.linkTrailingIcon({ class: [props.b24ui?.linkTrailingIcon, item.b24ui?.linkTrailingIcon], active })"
          />

          <B24Badge
            v-if="item.badge"
            color="danger"
            depth="dark"
            :use-fill="true"
            :size="((item.b24ui?.linkTrailingBadgeSize || props.b24ui?.linkTrailingBadgeSize || b24ui.linkTrailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
            :class="b24ui.linkTrailingBadge({ class: [props.b24ui?.linkTrailingBadge, item.b24ui?.linkTrailingBadge] })"
          />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level }">
    <component
      :is="(orientation === 'vertical' && item.children?.length) ? AccordionItem : NavigationMenuItem"
      as="li"
      :value="item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`)"
    >
      <div
        v-if="orientation === 'vertical' && item.type === 'label'"
        :class="b24ui.label({ class: [props.b24ui?.label, item.b24ui?.label, item.class] })"
      >
        <ReuseLinkTemplate :item="item" :index="index" />
      </div>
      <B24Link
        v-else-if="item.type !== 'label'"
        v-slot="{ active, ...slotProps }"
        v-bind="pickLinkProps(item as Omit<NavigationMenuItem, 'type'>)"
        custom
      >
        <component
          :is="(orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])) ? NavigationMenuTrigger : ((orientation === 'vertical' && item.children?.length && !(slotProps as any).href) ? AccordionTrigger : NavigationMenuLink)"
          as-child
          :active="active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <B24Tooltip
            v-if="!!item.tooltip && orientation === 'vertical' && collapsed"
            :content="{ side: 'right' }"
            v-bind="item.tooltip"
          >
            <B24LinkBase
              v-bind="slotProps"
              :class="b24ui.link({ class: [props.b24ui?.link, item.b24ui?.link, item.class], active, disabled: !!item.disabled, level: orientation === 'horizontal' || (level || 0) > 0 })"
            >
              <ReuseLinkTemplate :item="item" :active="active" :index="index" />
            </B24LinkBase>
          </B24Tooltip>
          <B24LinkBase
            v-else
            v-bind="slotProps"
            :class="b24ui.link({ class: [props.b24ui?.link, item.b24ui?.link, item.class], active, disabled: !!item.disabled, level: orientation === 'horizontal' || (level || 0) > 0 })"
          >
            <ReuseLinkTemplate :item="item" :active="active" :index="index" />
          </B24LinkBase>
        </component>

        <NavigationMenuContent
          v-if="orientation === 'horizontal' && (item.children?.length || !!slots[(item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>])"
          v-bind="contentProps"
          :data-viewport="item.viewportRtl ? 'rtl' : 'ltr'"
          :class="b24ui.content({ class: [props.b24ui?.content, item.b24ui?.content] })"
        >
          <slot :name="((item.slot ? `${item.slot}-content` : 'item-content') as keyof NavigationMenuSlots<T>)" :item="item" :active="active" :index="index">
            <ul :class="b24ui.childList({ class: [props.b24ui?.childList, item.b24ui?.childList] })">
              <li
                v-for="(childItem, childIndex) in item.children"
                :key="childIndex"
                :class="b24ui.childItem({ class: [props.b24ui?.childItem, item.b24ui?.childItem] })"
              >
                <B24Link
                  v-slot="{ active: childActive, ...childSlotProps }"
                  v-bind="pickLinkProps(childItem)"
                  custom
                >
                  <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                    <B24LinkBase
                      v-bind="childSlotProps"
                      :class="b24ui.childLink({ class: [props.b24ui?.childLink, childItem.childLink, childItem.class], active: childActive })"
                    >
                      <Component
                        :is="childItem.icon"
                        v-if="childItem.icon"
                        :class="b24ui.childLinkIcon({ class: [props.b24ui?.childLinkIcon, item.b24ui?.childLinkIcon], active: childActive })"
                      />

                      <div :class="b24ui.childLinkWrapper({ class: [props.b24ui?.childLinkWrapper, item.b24ui?.childLinkWrapper] })">
                        <p :class="b24ui.childLinkLabel({ class: [props.b24ui?.childLinkLabel, item.b24ui?.childLinkLabel], active: childActive })">
                          {{ getLabel(childItem) }}

                          <Component
                            :is="typeof externalIcon === 'string' ? externalIcon : icons.external"
                            v-if="childItem.target === '_blank' && externalIcon !== false"
                            :class="b24ui.childLinkLabelExternalIcon({ class: [props.b24ui?.childLinkLabelExternalIcon, item.b24ui?.childLinkLabelExternalIcon], active: childActive })"
                          />
                        </p>
                        <p v-if="childItem.description" :class="b24ui.childLinkDescription({ class: [props.b24ui?.childLinkDescription, item.b24ui?.childLinkDescription], active: childActive })">
                          {{ childItem.description }}
                        </p>
                      </div>
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
        :class="b24ui.content({ class: [props.b24ui?.content, item.b24ui?.content] })"
      >
        <ul :class="b24ui.childList({ class: props.b24ui?.childList })">
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="(level || 0) + 1"
            :class="b24ui.childItem({ class: [props.b24ui?.childItem, childItem.b24ui?.childItem] })"
          />
        </ul>
      </AccordionContent>
    </component>
  </DefineItemTemplate>

  <NavigationMenuRoot
    v-bind="rootProps"
    :data-collapsed="collapsed"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
    data-slot="section"
  >
    <slot name="list-leading" />

    <template v-for="(list, listIndex) in lists" :key="`list-${listIndex}`">
      <component
        v-bind="orientation === 'vertical' ? {
          ...accordionProps,
          defaultValue: getAccordionDefaultValue(list)
        } : {}"
        :is="orientation === 'vertical' ? AccordionRoot : NavigationMenuList"
        as="ul"
        :class="b24ui.list({ class: props.b24ui?.list })"
      >
        <ReuseItemTemplate
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          :class="b24ui.item({ class: [props.b24ui?.item, item.b24ui?.item] })"
        />
      </component>

      <div v-if="orientation === 'vertical' && listIndex < lists.length - 1" :class="b24ui.separator({ class: props.b24ui?.separator })" />
    </template>

    <slot name="list-trailing" />

    <div v-if="orientation === 'horizontal'" :class="b24ui.viewportWrapper({ class: props.b24ui?.viewportWrapper })">
      <NavigationMenuIndicator v-if="arrow" :class="b24ui.indicator({ class: props.b24ui?.indicator })">
        <div :class="b24ui.arrow({ class: props.b24ui?.arrow })" />
      </NavigationMenuIndicator>

      <NavigationMenuViewport
        align="start"
        :class="b24ui.viewport({ class: props.b24ui?.viewport })"
      />
    </div>
  </NavigationMenuRoot>
</template>
