<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { NavigationMenuRootProps, NavigationMenuRootEmits, NavigationMenuContentProps, NavigationMenuContentEmits, CollapsibleRootProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/navigation-menu'
import { tv } from '../utils/tv'
import type { AvatarProps, BadgeProps, LinkProps, IconComponent } from '../types'
import type { DynamicSlots, MaybeArrayOfArray, MaybeArrayOfArrayItem, PartialString, EmitsToProps } from '../types/utils'

const appConfigNavigationMenu = _appConfig as AppConfig & { b24ui: { navigationMenu: Partial<typeof theme> } }

const navigationMenu = tv({ extend: tv(theme), ...(appConfigNavigationMenu.b24ui?.navigationMenu || {}) })

export interface NavigationMenuChildItem extends Omit<NavigationMenuItem, 'children' | 'type'> {
  /** Description is only used when `orientation` is `horizontal`. */
  description?: string
}

export interface NavigationMenuItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'>, Pick<CollapsibleRootProps, 'defaultOpen' | 'open'> {
  label?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   */
  badge?: string | number | BadgeProps
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
  value?: string
  children?: NavigationMenuChildItem[]
  /**
   * With orientation=`horizontal` if `true` it will position the dropdown menu correctly
   */
  viewportRtl?: boolean
  onSelect?(e: Event): void
}

type NavigationMenuVariants = VariantProps<typeof navigationMenu>

export interface NavigationMenuProps<T> extends Pick<NavigationMenuRootProps, 'modelValue' | 'defaultValue' | 'delayDuration' | 'disableClickTrigger' | 'disableHoverTrigger' | 'skipDelayDuration' | 'disablePointerLeaveClose' | 'unmountOnHide'> {
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
  color?: NavigationMenuVariants['color']
  /**
   * @defaultValue 'pill'
   */
  variant?: NavigationMenuVariants['variant']
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
  highlightColor?: NavigationMenuVariants['highlightColor']
  /**
   * The content of the menu.
   */
  content?: Omit<NavigationMenuContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<NavigationMenuContentEmits>>
  /**
   * The orientation of the content.
   * Only works when `orientation` is `horizontal`.
   * @defaultValue 'vertical'
   */
  contentOrientation?: NavigationMenuVariants['contentOrientation']
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: string
  class?: any
  b24ui?: PartialString<typeof navigationMenu.slots>
}

export interface NavigationMenuEmits extends NavigationMenuRootEmits {}

type SlotProps<T> = (props: { item: T, index: number, active?: boolean }) => any

export type NavigationMenuSlots<T extends { slot?: string }> = {
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-trailing': SlotProps<T>
  'item-content': SlotProps<T>
} & DynamicSlots<T, SlotProps<T>>

</script>

<script setup lang="ts" generic="T extends MaybeArrayOfArrayItem<I>, I extends MaybeArrayOfArray<NavigationMenuItem>">
import { computed, toRef } from 'vue'
import { NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, useForwardPropsEmits } from 'reka-ui'
import { createReusableTemplate } from '@vueuse/core'
import { get } from '../utils'
import { pickLinkProps } from '../utils/link'
import icons from '../dictionary/icons'
import B24LinkBase from './LinkBase.vue'
import B24Link from './Link.vue'
import B24Avatar from './Avatar.vue'
import B24Badge from './Badge.vue'
import B24Collapsible from './Collapsible.vue'

const props = withDefaults(defineProps<NavigationMenuProps<I>>(), {
  orientation: 'horizontal',
  contentOrientation: 'vertical',
  externalIcon: true,
  delayDuration: 0,
  unmountOnHide: true,
  labelKey: 'label'
})
const emits = defineEmits<NavigationMenuEmits>()
const slots = defineSlots<NavigationMenuSlots<T>>()

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

const contentProps = toRef(() => props.content)

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, active?: boolean }>()
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: NavigationMenuItem, index: number, level?: number }>({
  props: {
    item: Object,
    index: Number,
    level: Number
  }
})

const b24ui = computed(() => navigationMenu({
  orientation: props.orientation,
  contentOrientation: props.contentOrientation,
  collapsed: props.collapsed,
  color: props.color,
  variant: props.variant,
  highlight: props.highlight,
  highlightColor: props.highlightColor || props.color
}))

const lists = computed(() => props.items?.length ? (Array.isArray(props.items[0]) ? props.items : [props.items]) as T[][] : [])
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index }">
    <slot :name="item.slot || 'item'" :item="(item as T)" :index="index">
      <span :class="b24ui.linkLabelWrapper({ class: props.b24ui?.linkLabelWrapper, active })">
        <slot :name="item.slot ? `${item.slot}-leading` : 'item-leading'" :item="(item as T)" :active="active" :index="index">
          <Component
            :is="item.icon"
            v-if="item.icon"
            :class="b24ui.linkLeadingIcon({ class: props.b24ui?.linkLeadingIcon, active, disabled: !!item.disabled })"
          />
          <B24Avatar v-else-if="item.avatar" :size="((props.b24ui?.linkLeadingAvatarSize || b24ui.linkLeadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="b24ui.linkLeadingAvatar({ class: props.b24ui?.linkLeadingAvatar, active, disabled: !!item.disabled })" />
        </slot>

        <span
          v-if="(!collapsed || orientation !== 'vertical') && (get(item, props.labelKey as string) || !!slots[item.slot ? `${item.slot}-label` : 'item-label'])"
          :class="b24ui.linkLabel({ class: props.b24ui?.linkLabel, active })"
        >
          <slot :name="item.slot ? `${item.slot}-label` : 'item-label'" :item="(item as T)" :active="active" :index="index">
            {{ get(item, props.labelKey as string) }}
          </slot>

          <Component
            :is="typeof externalIcon !== 'boolean' ? externalIcon : icons.external"
            v-if="item.target === '_blank' && externalIcon !== false"
            :class="b24ui.linkLabelExternalIcon({ class: props.b24ui?.linkLabelExternalIcon, active })"
          />
        </span>
      </span>
      <span v-if="(!collapsed || orientation !== 'vertical') && (item.badge || (orientation === 'horizontal' && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : 'item-content'])) || (orientation === 'vertical' && item.children?.length) || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : 'item-trailing'])" :class="b24ui.linkTrailing({ class: props.b24ui?.linkTrailing })">
        <slot :name="item.slot ? `${item.slot}-trailing` : 'item-trailing'" :item="(item as T)" :active="active" :index="index">
          <Component
            :is="item.trailingIcon || trailingIcon || icons.chevronDown"
            v-if="(orientation === 'horizontal' && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : 'item-content'])) || (orientation === 'vertical' && item.children?.length)"
            :class="b24ui.linkTrailingIcon({ class: props.b24ui?.linkTrailingIcon, active })"
          />
          <Component
            :is="item.trailingIcon"
            v-else-if="item.trailingIcon"
            :class="b24ui.linkTrailingIcon({ class: props.b24ui?.linkTrailingIcon, active })"
          />

          <B24Badge
            v-if="item.badge"
            color="danger"
            depth="dark"
            :use-fill="true"
            :size="((props.b24ui?.linkTrailingBadgeSize || b24ui.linkTrailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
            :class="b24ui.linkTrailingBadge({ class: props.b24ui?.linkTrailingBadge })"
          />
        </slot>
      </span>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0 }">
    <component
      :is="(orientation === 'vertical' && item.children?.length && !collapsed) ? B24Collapsible : NavigationMenuItem"
      as="li"
      :value="item.value || String(index)"
      :default-open="item.defaultOpen"
      :unmount-on-hide="(orientation === 'vertical' && item.children?.length && !collapsed) ? unmountOnHide : undefined"
      :open="item.open"
    >
      <div v-if="orientation === 'vertical' && item.type === 'label'" :class="b24ui.label({ class: props.b24ui?.label })">
        <ReuseLinkTemplate :item="(item as T)" :index="index" />
      </div>
      <B24Link v-else-if="item.type !== 'label'" v-slot="{ active, ...slotProps }" v-bind="(orientation === 'vertical' && item.children?.length && !collapsed) ? {} : pickLinkProps(item as Omit<NavigationMenuItem, 'type'>)" custom>
        <component
          :is="(orientation === 'horizontal' && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : 'item-content'])) ? NavigationMenuTrigger : NavigationMenuLink"
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <B24LinkBase v-bind="slotProps" :class="b24ui.link({ class: [props.b24ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: orientation === 'horizontal' || level > 0 })">
            <ReuseLinkTemplate :item="(item as T)" :active="active || item.active" :index="index" />
          </B24LinkBase>
        </component>

        <NavigationMenuContent
          v-if="orientation === 'horizontal' && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : 'item-content'])"
          v-bind="contentProps"
          :data-viewport="item.viewportRtl ? 'rtl' : 'ltr'"
          :class="b24ui.content({ class: props.b24ui?.content })"
        >
          <slot :name="item.slot ? `${item.slot}-content` : 'item-content'" :item="(item as T)" :active="active" :index="index">
            <ul :class="b24ui.childList({ class: props.b24ui?.childList })">
              <li v-for="(childItem, childIndex) in item.children" :key="childIndex" :class="b24ui.childItem({ class: props.b24ui?.childItem })">
                <B24Link v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                  <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                    <B24LinkBase v-bind="childSlotProps" :class="b24ui.childLink({ class: [props.b24ui?.childLink, childItem.class], active: childActive })">
                      <Component
                        :is="childItem.icon"
                        v-if="childItem.icon"
                        :class="b24ui.childLinkIcon({ class: props.b24ui?.childLinkIcon, active: childActive })"
                      />

                      <div :class="b24ui.childLinkWrapper({ class: props.b24ui?.childLinkWrapper })">
                        <p :class="b24ui.childLinkLabel({ class: props.b24ui?.childLinkLabel, active: childActive })">
                          {{ get(childItem, props.labelKey as string) }}

                          <Component
                            :is="typeof externalIcon === 'string' ? externalIcon : icons.external"
                            v-if="childItem.target === '_blank' && externalIcon !== false"
                            :class="b24ui.childLinkLabelExternalIcon({ class: props.b24ui?.childLinkLabelExternalIcon, active: childActive })"
                          />
                        </p>
                        <p v-if="childItem.description" :class="b24ui.childLinkDescription({ class: props.b24ui?.childLinkDescription, active: childActive })">
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

      <template v-if="orientation === 'vertical' && item.children?.length && !collapsed" #content>
        <ul :class="b24ui.childList({ class: props.b24ui?.childList })">
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :class="b24ui.childItem({ class: props.b24ui?.childItem })"
          />
        </ul>
      </template>
    </component>
  </DefineItemTemplate>

  <NavigationMenuRoot
    v-bind="rootProps"
    :data-collapsed="collapsed"
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
    data-slot="section"
  >
    <template v-for="(list, listIndex) in lists" :key="`list-${listIndex}`">
      <NavigationMenuList :class="b24ui.list({ class: props.b24ui?.list })">
        <ReuseItemTemplate
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          :class="b24ui.item({ class: props.b24ui?.item })"
        />
      </NavigationMenuList>

      <div v-if="orientation === 'vertical' && listIndex < lists.length - 1" :class="b24ui.separator({ class: props.b24ui?.separator })" />
    </template>

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
