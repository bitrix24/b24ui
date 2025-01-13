<script lang="ts">
import type { DefineComponent } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { TabsRootProps, TabsRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/tabs'
import { tv } from '../utils/tv'
import type { AvatarProps } from '../types'
import type { DynamicSlots, PartialString } from '../types/utils'

const appConfig = _appConfig as AppConfig & { b24ui: { tabs: Partial<typeof theme> } }

const tabs = tv({ extend: tv(theme), ...(appConfig.b24ui?.tabs || {}) })

export interface TabsItem {
  label?: string
  icon?: DefineComponent
  avatar?: AvatarProps
  slot?: string
  content?: string
  /** A unique value for the tab item. Defaults to the index. */
  value?: string | number
  disabled?: boolean
}

type TabsVariants = VariantProps<typeof tabs>

export interface TabsProps<T> extends Pick<TabsRootProps<string | number>, 'defaultValue' | 'modelValue' | 'activationMode' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  items?: T[]
  color?: TabsVariants['color']
  variant?: TabsVariants['variant']
  size?: TabsVariants['size']
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
  labelKey?: string
  class?: any
  b24ui?: PartialString<typeof tabs.slots>
}

export interface TabsEmits extends TabsRootEmits<string | number> {}

type SlotProps<T> = (props: { item: T, index: number }) => any

export type TabsSlots<T extends { slot?: string }> = {
  leading: SlotProps<T>
  default: SlotProps<T>
  trailing: SlotProps<T>
  content: SlotProps<T>
} & DynamicSlots<T, SlotProps<T>>
</script>

<script setup lang="ts" generic="T extends TabsItem">
import { computed } from 'vue'
import { TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { get } from '../utils'
import B24Avatar from './Avatar.vue'

const props = withDefaults(defineProps<TabsProps<T>>(), {
  content: true,
  defaultValue: '0',
  orientation: 'horizontal',
  unmountOnHide: true,
  labelKey: 'label'
})
const emits = defineEmits<TabsEmits>()
const slots = defineSlots<TabsSlots<T>>()

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'activationMode', 'unmountOnHide'), emits)

const b24ui = computed(() => tabs({
  color: props.color,
  variant: props.variant,
  size: props.size,
  orientation: props.orientation
}))
</script>

<template>
  <TabsRoot v-bind="rootProps" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <TabsList :class="b24ui.list({ class: props.b24ui?.list })">
      <TabsIndicator :class="b24ui.indicator({ class: props.b24ui?.indicator })" />

      <TabsTrigger v-for="(item, index) of items" :key="index" :value="item.value || String(index)" :disabled="item.disabled" :class="b24ui.trigger({ class: props.b24ui?.trigger })">
        <slot name="leading" :item="item" :index="index">
          <Component
            :is="item.icon"
            v-if="item.icon"
            :class="b24ui.leadingIcon({ class: props.b24ui?.leadingIcon })"
          />
          <B24Avatar v-else-if="item.avatar" :size="((props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])" v-bind="item.avatar" :class="b24ui.leadingAvatar({ class: props.b24ui?.leadingAvatar })" />
        </slot>

        <span v-if="get(item, props.labelKey as string) || !!slots.default" :class="b24ui.label({ class: props.b24ui?.label })">
          <slot :item="item" :index="index">{{ get(item, props.labelKey as string) }}</slot>
        </span>

        <slot name="trailing" :item="item" :index="index" />
      </TabsTrigger>
    </TabsList>

    <template v-if="!!content">
      <TabsContent v-for="(item, index) of items" :key="index" :value="item.value || String(index)" :class="b24ui.content({ class: props.b24ui?.content })">
        <slot :name="item.slot || 'content'" :item="item" :index="index">
          {{ item.content }}
        </slot>
      </TabsContent>
    </template>
  </TabsRoot>
</template>
