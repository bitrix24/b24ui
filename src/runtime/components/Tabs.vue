<script lang="ts">
import type { TabsRootProps, TabsRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/tabs'
import type { AvatarProps, IconComponent } from '../types'
import type { DynamicSlots, ComponentConfig } from '../types/utils'

type Tabs = ComponentConfig<typeof theme, AppConfig, 'tabs'>

export interface TabsItem {
  label?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  slot?: string
  content?: string
  /** A unique value for the tab item. Defaults to the index. */
  value?: string | number
  disabled?: boolean
  class?: any
  b24ui?: Pick<Tabs['slots'], 'trigger' | 'leadingIcon' | 'leadingAvatarSize' | 'leadingAvatar' | 'label' | 'content'>
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
   * @defaultValue 'default'
   */
  color?: Tabs['variants']['color']
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
  labelKey?: string
  class?: any
  b24ui?: Tabs['slots']
}

export interface TabsEmits extends TabsRootEmits<string | number> {}

type SlotProps<T extends TabsItem> = (props: { item: T, index: number }) => any

export type TabsSlots<T extends TabsItem = TabsItem> = {
  'leading': SlotProps<T>
  'default': SlotProps<T>
  'trailing': SlotProps<T>
  'content': SlotProps<T>
  'list-leading': (props?: {}) => any
  'list-trailing': (props?: {}) => any
} & DynamicSlots<T, undefined, { index: number }>
</script>

<script setup lang="ts" generic="T extends TabsItem">
import type { ComponentPublicInstance } from 'vue'
import { ref, computed } from 'vue'
import { TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { get } from '../utils'
import { tv } from '../utils/tv'
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

const appConfig = useAppConfig() as Tabs['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'activationMode', 'unmountOnHide'), emits)

const getLabel = (item: TabsItem) => {
  return get(item, props.labelKey as string)
}

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.tabs || {}) })({
  color: props.color,
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
  <TabsRoot v-bind="rootProps" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <TabsList :class="b24ui.list({ class: props.b24ui?.list })">
      <TabsIndicator :class="b24ui.indicator({ class: props.b24ui?.indicator })" />

      <slot name="list-leading" />

      <TabsTrigger
        v-for="(item, index) in items"
        :key="index"
        :ref="el => (triggersRef[index] = el as ComponentPublicInstance)"
        :value="item.value || String(index)"
        :disabled="item.disabled"
        :class="b24ui.trigger({ class: [props.b24ui?.trigger, item.b24ui?.trigger] })"
      >
        <slot name="leading" :item="item" :index="index">
          <Component
            :is="item.icon"
            v-if="item.icon"
            :class="b24ui.leadingIcon({ class: [props.b24ui?.leadingIcon, item.b24ui?.leadingIcon] })"
          />
          <B24Avatar
            v-else-if="item.avatar"
            :size="((item.b24ui?.leadingAvatarSize || props.b24ui?.leadingAvatarSize || b24ui.leadingAvatarSize()) as AvatarProps['size'])"
            v-bind="item.avatar"
            :class="b24ui.leadingAvatar({ class: [props.b24ui?.leadingAvatar, item.b24ui?.leadingAvatar] })"
          />
        </slot>

        <span v-if="getLabel(item) || !!slots.default" :class="b24ui.label({ class: [props.b24ui?.label, item.b24ui?.label] })">
          <slot :item="item" :index="index">{{ getLabel(item) }}</slot>
        </span>

        <slot name="trailing" :item="item" :index="index" />
      </TabsTrigger>

      <slot name="list-trailing" />
    </TabsList>

    <template v-if="!!content">
      <TabsContent
        v-for="(item, index) in items"
        :key="index"
        :value="item.value || String(index)"
        :class="b24ui.content({ class: [props.b24ui?.content, item.b24ui?.content, item.class] })"
      >
        <slot :name="((item.slot || 'content') as keyof TabsSlots<T>)" :item="(item as Extract<T, { slot: string; }>)" :index="index">
          {{ item.content }}
        </slot>
      </TabsContent>
    </template>
  </TabsRoot>
</template>
