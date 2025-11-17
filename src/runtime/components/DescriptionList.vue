<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/description-list'
import type { AvatarProps, ButtonProps, IconComponent } from '../types'
import type { DynamicSlots } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type DescriptionList = ComponentConfig<typeof theme, AppConfig, 'descriptionList'>

export interface DescriptionListItem {
  label?: string
  /**
   * Display an icon on the left side.
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  slot?: string
  description?: string
  /**
   * The orientation between the content and the actions.
   * @defaultValue 'vertical'
   */
  orientation?: DescriptionList['variants']['orientation']
  /**
   * Display a list of actions:
   * - under the description when orientation is `vertical`
   * - next to the description when orientation is `horizontal`
   * `{ size: 'xs' }`{lang="ts"}
   */
  actions?: ButtonProps[]
  class?: any
  b24ui?: Pick<DescriptionList['slots'], 'labelWrapper' | 'icon' | 'avatar' | 'label' | 'descriptionWrapper' | 'description' | 'actions'>
  [key: string]: any
}

export interface DescriptionListProps<T extends DescriptionListItem = DescriptionListItem> {
  legend?: string
  text?: string
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: string
  /**
   * The key used to get the description from the item.
   * @defaultValue 'description'
   */
  descriptionKey?: string
  items?: T[]
  /**
   * @defaultValue 'md'
   */
  size?: DescriptionList['variants']['size']
  class?: any
  b24ui?: DescriptionList['slots']
}

type SlotProps<T extends DescriptionListItem> = (props: { item: T, index: number, b24ui: DescriptionList['b24ui'] }) => any

export type DescriptionListSlots<T extends DescriptionListItem = DescriptionListItem> = {
  'legend'(props?: {}): any
  'text'(props?: {}): any
  'leading': SlotProps<T>
  'label'(props: { item: T, index: number }): any
  'description'(props: { item: T, index: number }): any
  'actions': SlotProps<T>
  'content-top': SlotProps<T>
  'content': SlotProps<T>
  'content-bottom': SlotProps<T>
  'footer'(props?: { b24ui: DescriptionList['b24ui'] }): any
} & DynamicSlots<T, undefined, { index: number, b24ui: DescriptionList['b24ui'] }>
</script>

<script setup lang="ts" generic="T extends DescriptionListItem">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { get } from '../utils'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'
import B24Button from './Button.vue'

const props = withDefaults(defineProps<DescriptionListProps<T>>(), {
  labelKey: 'label',
  descriptionKey: 'description'
})
const slots = defineSlots<DescriptionListSlots<T>>()

const appConfig = useAppConfig() as DescriptionList['AppConfig']

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.descriptionList || {}) })({
  size: props.size
}))

function normalizeItem(item: any) {
  if (item === null) {
    return {
      label: undefined,
      description: undefined,
      orientation: undefined
    }
  }

  const label = get(item, props.labelKey as string)
  const description = get(item, props.descriptionKey as string)
  const orientation = item?.orientation || 'vertical'

  return {
    ...item,
    label,
    description,
    orientation
  }
}

const normalizedItems = computed(() => {
  if (!props.items) {
    return []
  }

  return props.items.map(normalizeItem)
})
</script>

<template>
  <div data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <h2 v-if="legend || !!slots.legend" data-slot="legend" :class="b24ui.legend({ class: props.b24ui?.legend })">
      <slot name="legend">
        {{ legend }}
      </slot>
    </h2>
    <p v-if="text || !!slots.text" data-slot="text" :class="b24ui.text({ class: props.b24ui?.text })">
      <slot name="text">
        {{ text }}
      </slot>
    </p>

    <dl data-slot="container" :class="b24ui.container({ class: props.b24ui?.container })">
      <template
        v-for="(item, index) in normalizedItems"
        :key="index"
      >
        <slot
          name="content-top"
          :item="(item as Extract<T, { slot: string; }>)"
          :index="index"
          :b24ui="b24ui"
        />

        <slot
          :name="((item.slot || 'content') as keyof DescriptionListSlots<T>)"
          :item="(item as Extract<T, { slot: string; }>)"
          :index="index"
          :b24ui="b24ui"
        >
          <dt
            data-slot="labelWrapper"
            :class="b24ui.labelWrapper({
              class: [
                props.b24ui?.labelWrapper,
                item?.b24ui?.labelWrapper
              ]
            })"
          >
            <slot name="leading" :item="item" :index="index" :b24ui="b24ui">
              <Component
                :is="item.icon"
                v-if="item.icon"
                data-slot="icon"
                :class="b24ui.icon({
                  class: [
                    props.b24ui?.icon,
                    item?.b24ui?.icon
                  ]
                })"
              />
              <B24Avatar
                v-else-if="item.avatar"
                :size="((props.b24ui?.avatarSize || b24ui.avatarSize()) as AvatarProps['size'])"
                v-bind="item.avatar"
                data-slot="avatar"
                :class="b24ui.avatar({
                  class: [
                    props.b24ui?.avatar,
                    item?.b24ui?.avatar
                  ]
                })"
              />
            </slot>
            <span
              data-slot="label"
              :class="b24ui.label({
                class: [
                  item?.class,
                  props.b24ui?.label,
                  item?.b24ui?.label
                ]
              })"
            >
              <slot name="label" :item="item" :index="index">
                {{ item.label }}
              </slot>
            </span>
          </dt>
          <dd
            :data-orientation="item.orientation"
            data-slot="descriptionWrapper"
            :class="b24ui.descriptionWrapper({
              class: [
                props.b24ui?.descriptionWrapper,
                item?.b24ui?.descriptionWrapper,
                item?.b24ui?.class
              ],
              orientation: item.orientation
            })"
          >
            <span
              data-slot="description"
              :class="b24ui.description({
                class: [
                  item?.class,
                  props.b24ui?.description,
                  item?.b24ui?.description
                ],
                orientation: item.orientation
              })"
            >
              <slot name="description" :item="item" :index="index">
                {{ item.description }}
              </slot>
            </span>
            <span
              v-if="item.actions?.length || !!slots.actions"
              data-slot="actions"
              :class="b24ui.actions({
                class: [
                  props.b24ui?.actions,
                  item?.b24ui?.actions
                ],
                orientation: item.orientation
              })"
            >
              <slot name="actions" :item="item" :index="index" :b24ui="b24ui">
                <B24Button
                  v-for="(action, indexActions) in item.actions"
                  :key="indexActions"
                  size="xs"
                  v-bind="action"
                />
              </slot>
            </span>
          </dd>
        </slot>

        <slot
          name="content-bottom"
          :item="(item as Extract<T, { slot: string; }>)"
          :index="index"
          :b24ui="b24ui"
        />
      </template>
    </dl>
    <div
      v-if="!!slots.footer"
      data-slot="footer"
      :class="b24ui.footer({ class: props.b24ui?.footer })"
    >
      <slot name="footer" :b24ui="b24ui" />
    </div>
  </div>
</template>
