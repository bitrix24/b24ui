<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/content/description-list'
import { tv } from '../../utils/tv'
import type { AvatarProps, ButtonProps, IconComponent } from '../../types'
import type { DynamicSlots } from '../../types/utils'

const appConfig = _appConfig as AppConfig & { b24ui: { descriptionList: Partial<typeof theme> } }

const descriptionList = tv({ extend: tv(theme), ...(appConfig.b24ui?.descriptionList || {}) })

type DescriptionListVariants = VariantProps<typeof descriptionList>

export interface DescriptionListItem {
  label?: string
  icon?: IconComponent
  avatar?: AvatarProps
  slot?: string
  description?: string
  /**
   * Display a list of actions:
   * - under the description if multiline
   * - next to the description if not multiline
   * `{ size: 'xs' }`{lang="ts-type"}
   */
  actions?: ButtonProps[]
  class?: any
  b24ui?: Partial<typeof descriptionList.slots>
}

export interface DescriptionListProps<T> {
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
  size?: DescriptionListVariants['size']
  class?: any
  b24ui?: Partial<typeof descriptionList.slots>
}

type SlotProps<T> = (props: { item: T, index: number }) => any

export type DescriptionListSlots<T extends { slot?: string }> = {
  legend(props?: {}): any
  text(props?: {}): any
  leading: SlotProps<T>
  label: SlotProps<T>
  description: SlotProps<T>
  actions: SlotProps<T>
  footer(props?: { b24ui: any }): any
} & DynamicSlots<T, SlotProps<T>>
</script>

<script setup lang="ts"  generic="T extends DescriptionListItem">
import { computed } from 'vue'
import { get } from '../../utils'
import B24Avatar from '../Avatar.vue'
import B24Button from '../Button.vue'

const props = withDefaults(defineProps<DescriptionListProps<T>>(), {
  labelKey: 'label',
  descriptionKey: 'description'
})
const slots = defineSlots<DescriptionListSlots<T>>()

const b24ui = computed(() => descriptionList({
  size: props.size
}))

function normalizeItem(item: any) {
  const label = get(item, props.labelKey as string)
  const description = get(item, props.descriptionKey as string)
  const multiline = (item.actions || []).length > 1

  return {
    ...item,
    label,
    description,
    multiline
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
  <div
    :class="b24ui.root({ class: [props.class, props.b24ui?.root] })"
  >
    <h2 v-if="legend || !!slots.legend" :class="b24ui.legend({ class: props.b24ui?.legend })">
      <slot name="legend">
        {{ legend }}
      </slot>
    </h2>
    <p v-if="text || !!slots.text" :class="b24ui.text({ class: props.b24ui?.text })">
      <slot name="text">
        {{ text }}
      </slot>
    </p>

    <dl :class="b24ui.container({ class: props.b24ui?.container })">
      <template
        v-for="(item, index) in normalizedItems"
        :key="index"
      >
        <dt
          :class="b24ui.labelWrapper({
            class: [
              props.b24ui?.labelWrapper,
              item?.b24ui?.labelWrapper
            ]
          })"
        >
          <slot name="leading" :item="item" :index="index">
            <Component
              :is="item.icon"
              v-if="item.icon"
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
              :class="b24ui.avatar({
                class: [
                  props.b24ui?.avatar,
                  item?.b24ui?.avatar
                ]
              })"
            />
          </slot>
          <span
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
          :class="b24ui.descriptionWrapper({
            class: [
              props.b24ui?.descriptionWrapper,
              item?.b24ui?.descriptionWrapper
            ],
            multiline: item.multiline
          })"
        >
          <span
            :class="b24ui.description({
              class: [
                item?.class,
                props.b24ui?.description,
                item?.b24ui?.description
              ],
              multiline: item.multiline
            })"
          >
            <slot name="description" :item="item" :index="index">
              {{ item.description }}
            </slot>
          </span>
          <span
            v-if="item.actions?.length || !!slots.actions"
            :class="b24ui.actions({
              class: [
                props.b24ui?.actions,
                item?.b24ui?.actions
              ],
              multiline: item.multiline
            })"
          >
            <slot name="actions" :item="item" :index="index">
              <B24Button
                v-for="(action, indexActions) in item.actions"
                :key="indexActions"
                size="xs"
                v-bind="action"
              />
            </slot>
          </span>
        </dd>
      </template>
    </dl>
    <div
      v-if="!!slots.footer"
      :class="b24ui.footer({ class: props.b24ui?.footer })"
    >
      <slot name="footer" :b24ui="b24ui" />
    </div>
  </div>
</template>
