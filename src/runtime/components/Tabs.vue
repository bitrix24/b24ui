<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ComponentPublicInstance } from 'vue'
import type { TabsRootProps, TabsRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/tabs'
import type { AvatarProps, BadgeProps, IconComponent } from '../types'
import type { DynamicSlots, GetItemKeys } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Tabs = ComponentConfig<typeof theme, AppConfig, 'tabs'>

export interface TabsItem {
  label?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  /**
   * Display a badge on the item.
   * `{ size: 'sm', color: 'air-primary' }`{lang="ts-type"}
   */
  badge?: string | number | BadgeProps
  slot?: string
  content?: string
  /** A unique value for the tab item. Defaults to the index. */
  value?: string | number
  disabled?: boolean
  class?: any
  b24ui?: Pick<Tabs['slots'], 'trigger' | 'leadingIcon' | 'leadingAvatar' | 'leadingAvatarSize' | 'label' | 'trailingBadge' | 'trailingBadgeSize' | 'content'>
  [key: string]: any
}

export interface TabsProps<T extends TabsItem = TabsItem> extends Pick<TabsRootProps<string | number>, 'defaultValue' | 'modelValue' | 'activationMode' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  items?: T[]
  /**
   * @defaultValue 'link'
   */
  variant?: Tabs['variants']['variant']
  /**
   * @defaultValue 'md'
   */
  size?: Tabs['variants']['size']
  /**
   * The orientation of the tabs.
   * @defaultValue 'horizontal'
   */
  orientation?: TabsRootProps['orientation']
  /**
   * The content of the tabs, can be disabled to prevent rendering the content.
   * @defaultValue true
   */
  content?: boolean
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  class?: any
  b24ui?: Tabs['slots']
}

export interface TabsEmits extends TabsRootEmits<string | number> {}

type SlotProps<T extends TabsItem> = (props: { item: T, index: number, b24ui: Tabs['b24ui'] }) => any

export type TabsSlots<T extends TabsItem = TabsItem> = {
  'leading': SlotProps<T>
  'default'(props: { item: T, index: number }): any
  'trailing': SlotProps<T>
  'content': SlotProps<T>
  'list-leading'(props?: {}): any
  'list-trailing'(props?: {}): any
} & DynamicSlots<T, undefined, { index: number, b24ui: Tabs['b24ui'] }>

</script>

<script setup lang="ts" generic="T extends TabsItem">
import { ref, computed } from 'vue'
import { TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { get } from '../utils'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'
import B24Badge from './Badge.vue'

const props = withDefaults(defineProps<TabsProps<T>>(), {
  content: true,
  defaultValue: '0',
  orientation: 'horizontal',
  unmountOnHide: true,
  labelKey: 'label'
})
const emits = defineEmits<TabsEmits>()
const slots = defineSlots<TabsSlots<T>>()

const appConfig = useAppConfig() as Tabs['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'unmountOnHide'), emits)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.tabs || {}) })({
  variant: props.variant,
  size: props.size,
  orientation: props.orientation
}))

const triggersRef = ref<ComponentPublicInstance[]>([])

defineExpose({
  triggersRef
})
</script>

<template>
  <TabsRoot
    v-bind="rootProps"
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :activation-mode="activationMode"
    data-slot="root"
    :class="b24ui.root({ class: [props.b24ui?.root, props.class] })"
  >
    <TabsList data-slot="list" :class="b24ui.list({ class: props.b24ui?.list })">
      <TabsIndicator data-slot="indicator" :class="b24ui.indicator({ class: props.b24ui?.indicator })" />

      <slot name="list-leading" />

      <TabsTrigger
        v-for="(item, index) of items"
        :key="index"
        :ref="el => (triggersRef[index] = el as ComponentPublicInstance)"
        :value="item.value ?? String(index)"
        :disabled="item.disabled"
        data-slot="trigger"
        :class="b24ui.trigger({ class: [props.b24ui?.trigger, item.b24ui?.trigger] })"
      >
        <slot name="leading" :item="item" :index="index" :b24ui="b24ui">
          <Component
            :is="item.icon"
            v-if="item.icon"
            data-slot="leadingIcon"
            :class="b24ui.leadingIcon({ class: [props.b24ui?.leadingIcon, item.b24ui?.leadingIcon] })"
          />
          <B24Avatar
            v-else-if="item.avatar"
            :size="((item.b24ui?.leadingAvatarSize || props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
            v-bind="item.avatar"
            data-slot="leadingAvatar"
            :class="b24ui.leadingAvatar({ class: [props.b24ui?.leadingAvatar, item.b24ui?.leadingAvatar] })"
          />
        </slot>

        <span v-if="get(item, props.labelKey as string) || !!slots.default" data-slot="label" :class="b24ui.label({ class: [props.b24ui?.label, item.b24ui?.label] })">
          <slot :item="item" :index="index">{{ get(item, props.labelKey as string) }}</slot>
        </span>

        <slot name="trailing" :item="item" :index="index" :b24ui="b24ui">
          <B24Badge
            v-if="item.badge || item.badge === 0"
            color="air-primary"
            :size="((item.b24ui?.trailingBadgeSize || props.b24ui?.trailingBadgeSize || b24ui.trailingBadgeSize()) as BadgeProps['size'])"
            v-bind="(typeof item.badge === 'string' || typeof item.badge === 'number') ? { label: item.badge } : item.badge"
            data-slot="trailingBadge"
            :class="b24ui.trailingBadge({ class: [props.b24ui?.trailingBadge, item.b24ui?.trailingBadge] })"
          />
        </slot>
      </TabsTrigger>

      <slot name="list-trailing" />
    </TabsList>

    <template v-if="!!content">
      <TabsContent
        v-for="(item, index) of items"
        :key="index"
        :value="item.value ?? String(index)"
        data-slot="content"
        :class="b24ui.content({ class: [props.b24ui?.content, item.b24ui?.content, item.class] })"
      >
        <slot
          :name="((item.slot || 'content') as keyof TabsSlots<T>)"
          :item="(item as Extract<T, { slot: string; }>)"
          :index="index"
          :b24ui="b24ui"
        >
          {{ item.content }}
        </slot>
      </TabsContent>
    </template>
  </TabsRoot>
</template>
