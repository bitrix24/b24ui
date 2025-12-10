<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { DropdownMenuContentProps as RekaDropdownMenuContentProps, DropdownMenuContentEmits as RekaDropdownMenuContentEmits, DropdownMenuArrowProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import type theme from '#build/b24ui/dropdown-menu'
import type { KbdProps, AvatarProps, DropdownMenuItem, DropdownMenuSlots, IconComponent } from '../types'
import type { ArrayOrNested, GetItemKeys, NestedItem, DynamicSlots, MergeTypes } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type DropdownMenu = ComponentConfig<typeof theme, AppConfig, 'dropdownMenu'>

interface DropdownMenuContentProps<T extends ArrayOrNested<DropdownMenuItem>> extends Omit<RekaDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  items?: T
  /**
   * Display an arrow alongside the menu.
   * @defaultValue false
   */
  arrow?: boolean | Omit<DropdownMenuArrowProps, 'as' | 'asChild'>
  portal?: boolean | string | HTMLElement
  sub?: boolean
  labelKey: GetItemKeys<T>
  descriptionKey: GetItemKeys<T>
  /**
   * @IconComponent
   */
  checkedIcon?: IconComponent
  /**
   * @IconComponent
   */
  externalIcon?: boolean | IconComponent
  class?: any
  b24ui: DropdownMenu['b24ui']
  b24uiOverride?: DropdownMenu['slots']
}

interface DropdownMenuContentEmits extends RekaDropdownMenuContentEmits {}

type DropdownMenuContentSlots<
  A extends ArrayOrNested<DropdownMenuItem> = ArrayOrNested<DropdownMenuItem>,
  T extends NestedItem<A> = NestedItem<A>
> = Pick<DropdownMenuSlots<A>, 'item' | 'item-leading' | 'item-label' | 'item-description' | 'item-trailing' | 'content-top' | 'content-bottom'> & {
  default(props?: {}): any
}
& DynamicSlots<MergeTypes<T>, 'label' | 'description', { active?: boolean, index: number }>
& DynamicSlots<MergeTypes<T>, 'leading' | 'trailing', { active?: boolean, index: number, b24ui: DropdownMenu['b24ui'] }>
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<DropdownMenuItem>">
import { computed, toRef } from 'vue'
import { defu } from 'defu'
import { DropdownMenu } from 'reka-ui/namespaced'
import {
  DropdownMenuArrow,
  useForwardPropsEmits
} from 'reka-ui'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
// import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { omit, get, isArrayOfArray } from '../utils'
import { pickLinkProps } from '../utils/link'
import icons from '../dictionary/icons'
import B24LinkBase from './LinkBase.vue'
import B24Link from './Link.vue'
import B24Avatar from './Avatar.vue'
import B24Kbd from './Kbd.vue'
import B24DropdownMenuContent from './DropdownMenuContent.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<DropdownMenuContentProps<T>>()
const emits = defineEmits<DropdownMenuContentEmits>()
const slots = defineSlots<DropdownMenuContentSlots<T>>()

const { dir } = useLocale()
// const appConfig = useAppConfig()

const portalProps = usePortal(toRef(() => props.portal))
/** @memo we not use 'loadingIcon' */
const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'descriptionKey', 'checkedIcon', 'externalIcon', 'class', 'b24ui', 'b24uiOverride'), emits)
const getProxySlots = () => omit(slots, ['default'])
const arrowProps = toRef(() => defu(typeof props.arrow === 'boolean' ? {} : props.arrow, { width: 20, height: 10 }) as DropdownMenuArrowProps)

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: DropdownMenuItem, active?: boolean, index: number }>()

const childrenIcon = computed(() => dir.value === 'rtl' ? icons.chevronLeft : icons.chevronRight)
const groups = computed<DropdownMenuItem[][]>(() =>
  props.items?.length
    ? isArrayOfArray(props.items)
      ? props.items
      : [props.items]
    : []
)
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot
      :name="((item.slot || 'item') as keyof DropdownMenuContentSlots<T>)"
      :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
      :index="index"
      :b24ui="b24ui"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading`: 'item-leading') as keyof DropdownMenuContentSlots<T>)"
        :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
        :active="active"
        :index="index"
        :b24ui="b24ui"
      >
        <B24Avatar
          v-if="item.avatar"
          :size="((item.b24ui?.itemLeadingAvatarSize || b24uiOverride?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
          v-bind="item.avatar"
          data-slot="itemLeadingAvatar"
          :class="b24ui.itemLeadingAvatar({ class: [b24uiOverride?.itemLeadingAvatar, item.b24ui?.itemLeadingAvatar], active })"
        />
      </slot>

      <span
        v-if="(get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label`: 'item-label') as keyof DropdownMenuSlots<T>]) || (get(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description`: 'item-description') as keyof DropdownMenuSlots<T>])"
        data-slot="itemWrapper"
        :class="b24ui.itemWrapper({ class: [b24uiOverride?.itemWrapper, item.b24ui?.itemWrapper] })"
      >
        <span data-slot="itemLabel" :class="b24ui.itemLabel({ class: [b24uiOverride?.itemLabel, item.b24ui?.itemLabel], active })">
          <slot :name="((item.slot ? `${item.slot}-label`: 'item-label') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :active="active" :index="index">
            {{ get(item, props.labelKey as string) }}
          </slot>
        </span>

        <span
          v-if="get(item, props.descriptionKey as string)"
          data-slot="itemDescription"
          :class="b24ui.itemDescription({ class: [b24uiOverride?.itemDescription, item.b24ui?.itemDescription] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-description`: 'item-description') as keyof DropdownMenuContentSlots<T>)"
            :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
            :active="active"
            :index="index"
          >
            {{ get(item, props.descriptionKey as string) }}
          </slot>
        </span>
      </span>

      <span data-slot="itemTrailing" :class="b24ui.itemTrailing({ class: [b24uiOverride?.itemTrailing, item.b24ui?.itemTrailing] })">
        <DropdownMenu.ItemIndicator as-child>
          <Component
            :is="checkedIcon || icons.check"
            data-slot="itemTrailingIcon"
            :class="b24ui.itemTrailingIcon({ class: [b24uiOverride?.itemTrailingIcon, item.b24ui?.itemTrailingIcon], color: item?.color })"
          />
        </DropdownMenu.ItemIndicator>

        <slot
          :name="((item.slot ? `${item.slot}-trailing`: 'item-trailing') as keyof DropdownMenuContentSlots<T>)"
          :item="(item as Extract<NestedItem<T>, { slot: string; }>)"
          :active="active"
          :index="index"
          :b24ui="b24ui"
        >
          <Component
            :is="icons.loading"
            v-if="item.loading"
            data-slot="itemLeadingIcon"
            :class="b24ui.itemLeadingIcon({ class: [b24uiOverride?.itemLeadingIcon, item.b24ui?.itemLeadingIcon], color: item?.color, loading: true })"
          />
          <Component
            :is="childrenIcon"
            v-else-if="item.children?.length"
            data-slot="itemTrailingIcon"
            :class="b24ui.itemTrailingIcon({ class: [b24uiOverride?.itemTrailingIcon, item.b24ui?.itemTrailingIcon], color: item?.color, active })"
          />
          <Component
            :is="typeof externalIcon !== 'boolean' ? externalIcon : icons.external"
            v-else-if="item.target === '_blank' && externalIcon !== false"
            data-slot="itemLabelExternalIcon"
            :class="b24ui.itemLabelExternalIcon({ class: [b24uiOverride?.itemLabelExternalIcon, item.b24ui?.itemLabelExternalIcon], color: item?.color, active })"
          />
          <Component
            :is="item.icon"
            v-else-if="item.icon"
            data-slot="itemLeadingIcon"
            :class="b24ui.itemLeadingIcon({ class: [b24uiOverride?.itemLeadingIcon, item.b24ui?.itemLeadingIcon], color: item?.color, active })"
          />
          <span v-else-if="item.kbds?.length" data-slot="itemTrailingKbds" :class="b24ui.itemTrailingKbds({ class: [b24uiOverride?.itemTrailingKbds, item.b24ui?.itemTrailingKbds] })">
            <B24Kbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" :size="((item.b24ui?.itemTrailingKbdsSize || b24uiOverride?.itemTrailingKbdsSize || b24ui.itemTrailingKbdsSize()) as KbdProps['size'])" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
          </span>
        </slot>
      </span>
    </slot>
  </DefineItemTemplate>

  <DropdownMenu.Portal v-bind="portalProps">
    <component
      :is="sub ? DropdownMenu.SubContent : DropdownMenu.Content"
      data-slot="content"
      :class="b24ui.content({ class: [b24uiOverride?.content, props.class] })"
      v-bind="contentProps"
    >
      <slot name="content-top" :sub="sub ?? false" />

      <div role="presentation" data-slot="viewport" :class="b24ui.viewport({ class: b24uiOverride?.viewport })">
        <DropdownMenu.Group
          v-for="(group, groupIndex) in groups"
          :key="`group-${groupIndex}`"
          data-slot="group"
          :class="b24ui.group({ class: b24uiOverride?.group })"
        >
          <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
            <DropdownMenu.Label v-if="item.type === 'label'" data-slot="label" :class="b24ui.label({ class: [b24uiOverride?.label, item.b24ui?.label, item.class] })">
              <ReuseItemTemplate :item="item" :index="index" />
            </DropdownMenu.Label>
            <DropdownMenu.Separator v-else-if="item.type === 'separator'" data-slot="separator" :class="b24ui.separator({ class: [b24uiOverride?.separator, item.b24ui?.separator, item.class] })" />
            <DropdownMenu.Sub
              v-else-if="item?.children?.length"
              :open="item.open"
              :default-open="item.defaultOpen"
            >
              <DropdownMenu.SubTrigger
                as="button"
                type="button"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey as string)"
                data-slot="item"
                :class="b24ui.item({ class: [b24uiOverride?.item, item.b24ui?.item, item.class], color: item?.color })"
              >
                <ReuseItemTemplate :item="item" :index="index" />
              </DropdownMenu.SubTrigger>

              <B24DropdownMenuContent
                sub
                data-slot="content"
                :class="item.b24ui?.content"
                :b24ui="b24ui"
                :b24ui-override="b24uiOverride"
                :portal="portal"
                :items="(item.children as T)"
                :arrow="arrow"
                align="start"
                :align-offset="-4"
                :side-offset="3"
                :label-key="labelKey"
                :description-key="descriptionKey"
                :checked-icon="checkedIcon"
                :external-icon="externalIcon"
                v-bind="item.content"
              >
                <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
                  <slot :name="(name as keyof DropdownMenuContentSlots<T>)" v-bind="slotData" />
                </template>
                <DropdownMenuArrow v-if="!!arrow" v-bind="arrowProps" data-slot="arrow" :class="b24ui.arrow({ class: props.b24ui?.arrow })" />
              </B24DropdownMenuContent>
            </DropdownMenu.Sub>
            <DropdownMenu.CheckboxItem
              v-else-if="item.type === 'checkbox'"
              :model-value="item.checked"
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              data-slot="item"
              :class="b24ui.item({ class: [b24uiOverride?.item, item.b24ui?.item, item.class], color: item?.color })"
              @update:model-value="item.onUpdateChecked"
              @select="item.onSelect"
            >
              <ReuseItemTemplate :item="item" :index="index" />
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.Item
              v-else
              as-child
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              @select="item.onSelect"
            >
              <B24Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item as Omit<DropdownMenuItem, 'type'>)" custom>
                <B24LinkBase
                  v-bind="slotProps"
                  data-slot="item"
                  :class="b24ui.item({ class: [b24uiOverride?.item, item.b24ui?.item, item.class], color: item?.color, active })"
                >
                  <ReuseItemTemplate :item="item" :active="active" :index="index" />
                </B24LinkBase>
              </B24Link>
            </DropdownMenu.Item>
          </template>
        </DropdownMenu.Group>
      </div>

      <slot />

      <slot name="content-bottom" :sub="sub ?? false" />
    </component>
  </DropdownMenu.Portal>
</template>
