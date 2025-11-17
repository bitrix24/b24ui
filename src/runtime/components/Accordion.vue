<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AccordionRootProps, AccordionRootEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/accordion'
import type { IconComponent } from '../types'
import type { DynamicSlots } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type Accordion = ComponentConfig<typeof theme, AppConfig, 'accordion'>

export interface AccordionItem {
  label?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * @IconComponent
   */
  trailingIcon?: IconComponent
  slot?: string
  content?: string
  /** A unique value for the accordion item. Defaults to the index. */
  value?: string
  disabled?: boolean
  class?: any
  b24ui?: Pick<Accordion['slots'], 'item' | 'header' | 'trigger' | 'leadingIcon' | 'label' | 'trailingIcon' | 'content' | 'body'>
  [key: string]: any
}

export interface AccordionProps<T extends AccordionItem = AccordionItem> extends Pick<AccordionRootProps, 'collapsible' | 'defaultValue' | 'modelValue' | 'type' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  items?: T[]
  /**
   * The icon displayed on the right side of the trigger.
   * @defaultValue icons.chevronDown
   * @IconComponent
   */
  trailingIcon?: IconComponent
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: string
  class?: any
  b24ui?: Accordion['slots']
}

export interface AccordionEmits extends AccordionRootEmits {}

type SlotProps<T extends AccordionItem> = (props: { item: T, index: number, open: boolean, b24ui: Accordion['b24ui'] }) => any

export type AccordionSlots<T extends AccordionItem = AccordionItem> = {
  leading: SlotProps<T>
  default(props: { item: T, index: number, open: boolean }): any
  trailing: SlotProps<T>
  content: SlotProps<T>
  body: SlotProps<T>
} & DynamicSlots<T, 'body', { index: number, open: boolean, b24ui: Accordion['b24ui'] }>

</script>

<script setup lang="ts" generic="T extends AccordionItem">
import { computed } from 'vue'
import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent, useForwardPropsEmits } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { get } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'

const props = withDefaults(defineProps<AccordionProps<T>>(), {
  type: 'single',
  collapsible: true,
  unmountOnHide: true,
  labelKey: 'label'
})
const emits = defineEmits<AccordionEmits>()
const slots = defineSlots<AccordionSlots<T>>()

const appConfig = useAppConfig() as Accordion['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'collapsible', 'defaultValue', 'disabled', 'modelValue', 'type', 'unmountOnHide'), emits)

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.accordion || {}) })({
  disabled: props.disabled
}))
</script>

<template>
  <AccordionRoot v-bind="rootProps" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <AccordionItem
      v-for="(item, index) in props.items"
      v-slot="{ open }"
      :key="index"
      :value="item.value || String(index)"
      :disabled="item.disabled"
      data-slot="item"
      :class="b24ui.item({ class: [props.b24ui?.item, item.b24ui?.item, item.class] })"
    >
      <AccordionHeader as="div" data-slot="header" :class="b24ui.header({ class: [props.b24ui?.header, item.b24ui?.header] })">
        <AccordionTrigger data-slot="trigger" :class="b24ui.trigger({ class: [props.b24ui?.trigger, item.b24ui?.trigger], disabled: item.disabled })">
          <slot name="leading" :item="item" :index="index" :open="open" :b24ui="b24ui">
            <Component
              :is="item.icon"
              v-if="item.icon"
              data-slot="leadingIcon"
              :class="b24ui.leadingIcon({ class: [props.b24ui?.leadingIcon, item?.b24ui?.leadingIcon] })"
            />
          </slot>

          <span
            v-if="get(item, props.labelKey as string) || !!slots.default"
            data-slot="label"
            :class="b24ui.label({ class: [props.b24ui?.label, item.b24ui?.label] })"
          >
            <slot :item="item" :index="index" :open="open">{{ get(item, props.labelKey as string) }}</slot>
          </span>

          <slot name="trailing" :item="item" :index="index" :open="open" :b24ui="b24ui">
            <Component
              :is="item.trailingIcon || trailingIcon || icons.chevronDown"
              data-slot="trailingIcon"
              :class="b24ui.trailingIcon({ class: [props.b24ui?.trailingIcon, item.b24ui?.trailingIcon] })"
            />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        v-if="item.content || !!slots.content || (item.slot && !!slots[item.slot as keyof AccordionSlots<T>]) || !!slots.body || (item.slot && !!slots[`${item.slot}-body` as keyof AccordionSlots<T>])"
        data-slot="content"
        :class="b24ui.content({ class: [props.b24ui?.content, item.b24ui?.content] })"
      >
        <slot
          :name="((item.slot || 'content') as keyof AccordionSlots<T>)"
          :item="(item as Extract<T, { slot: string; }>)"
          :index="index"
          :open="open"
          :b24ui="b24ui"
        >
          <div data-slot="body" :class="b24ui.body({ class: [props.b24ui?.body, item.b24ui?.body] })">
            <slot
              :name="((item.slot ? `${item.slot}-body`: 'body') as keyof AccordionSlots<T>)"
              :item="(item as Extract<T, { slot: string; }>)"
              :index="index"
              :open="open"
              :b24ui="b24ui"
            >
              {{ item.content }}
            </slot>
          </div>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
