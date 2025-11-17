<script lang="ts">
import type { ContextMenuContentProps as RekaContextMenuContentProps, ContextMenuContentEmits as RekaContextMenuContentEmits } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import type theme from '#build/b24ui/context-menu'
import type { AvatarProps, ContextMenuItem, ContextMenuSlots, IconComponent, KbdProps } from '../types'
import type { ArrayOrNested, GetItemKeys } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type ContextMenu = ComponentConfig<typeof theme, AppConfig, 'contextMenu'>

interface ContextMenuContentProps<T extends ArrayOrNested<ContextMenuItem>> extends Omit<RekaContextMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  items?: T
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
  loadingIcon?: IconComponent
  /**
   * @IconComponent
   */
  externalIcon?: boolean | IconComponent
  class?: any
  b24ui: ContextMenu['b24ui']
  b24uiOverride?: ContextMenu['slots']
}

interface ContextMenuContentEmits extends RekaContextMenuContentEmits {}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<ContextMenuItem>">
import { computed, toRef } from 'vue'
import { ContextMenu } from 'reka-ui/namespaced'
import { useForwardPropsEmits } from 'reka-ui'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
import { useLocale } from '../composables/useLocale'
import { usePortal } from '../composables/usePortal'
import { omit, get, isArrayOfArray } from '../utils'
import { pickLinkProps } from '../utils/link'
import icons from '../dictionary/icons'
import B24LinkBase from './LinkBase.vue'
import B24Link from './Link.vue'
import B24Avatar from './Avatar.vue'
import B24Kbd from './Kbd.vue'
import B24ContextMenuContent from './ContextMenuContent.vue'

const props = defineProps<ContextMenuContentProps<T>>()
const emits = defineEmits<ContextMenuContentEmits>()
const slots = defineSlots<ContextMenuSlots<T>>()

const { dir } = useLocale()

const portalProps = usePortal(toRef(() => props.portal))
const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'descriptionKey', 'checkedIcon', 'loadingIcon', 'externalIcon', 'class', 'b24ui', 'b24uiOverride'), emits)
const getProxySlots = () => omit(slots, ['default'])

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: ContextMenuItem, active?: boolean, index: number }>()

const childrenIcon = computed(() => dir.value === 'rtl' ? icons.chevronLeft : icons.chevronRight)
const groups = computed<ContextMenuItem[][]>(() =>
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
      :name="((item.slot || 'item') as keyof ContextMenuSlots<T>)"
      :item="item"
      :index="index"
      :b24ui="b24ui"
    >
      <slot
        :name="((item.slot ? `${item.slot}-leading`: 'item-leading') as keyof ContextMenuSlots<T>)"
        :item="item"
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
        v-if="(get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label`: 'item-label') as keyof ContextMenuSlots<T>]) || (get(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description`: 'item-description') as keyof ContextMenuSlots<T>])"
        data-slot="itemWrapper"
        :class="b24ui.itemWrapper({ class: [b24uiOverride?.itemWrapper, item.b24ui?.itemWrapper] })"
      >
        <span data-slot="itemLabel" :class="b24ui.itemLabel({ class: [b24uiOverride?.itemLabel, item.b24ui?.itemLabel], active })">
          <slot :name="((item.slot ? `${item.slot}-label`: 'item-label') as keyof ContextMenuSlots<T>)" :item="item" :active="active" :index="index">
            {{ get(item, props.labelKey as string) }}
          </slot>
        </span>

        <span
          v-if="get(item, props.descriptionKey as string)"
          data-slot="itemDescription"
          :class="b24ui.itemDescription({ class: [b24uiOverride?.itemDescription, item.b24ui?.itemDescription] })"
        >
          <slot
            :name="((item.slot ? `${item.slot}-description`: 'item-description') as keyof ContextMenuSlots<T>)"
            :item="item"
            :active="active"
            :index="index"
          >
            {{ get(item, props.descriptionKey as string) }}
          </slot>
        </span>
      </span>

      <span data-slot="itemTrailing" :class="b24ui.itemTrailing({ class: [b24uiOverride?.itemTrailing, item.b24ui?.itemTrailing] })">
        <ContextMenu.ItemIndicator as-child>
          <Component
            :is="checkedIcon || icons.check"
            data-slot="itemTrailingIcon"
            :class="b24ui.itemTrailingIcon({ class: [b24uiOverride?.itemTrailingIcon, item.b24ui?.itemTrailingIcon], color: item?.color })"
          />
        </ContextMenu.ItemIndicator>

        <slot
          :name="((item.slot ? `${item.slot}-trailing`: 'item-trailing') as keyof ContextMenuSlots<T>)"
          :item="item"
          :active="active"
          :index="index"
          :b24ui="b24ui"
        >
          <Component
            :is="loadingIcon || icons.loading"
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

  <ContextMenu.Portal v-bind="portalProps">
    <component
      :is="sub ? ContextMenu.SubContent : ContextMenu.Content"
      data-slot="content"
      :class="b24ui.content({ class: [b24uiOverride?.content, props.class] })"
      v-bind="contentProps"
    >
      <slot name="content-top" />

      <div role="presentation" data-slot="viewport" :class="b24ui.viewport({ class: b24uiOverride?.viewport })">
        <ContextMenu.Group
          v-for="(group, groupIndex) in groups"
          :key="`group-${groupIndex}`"
          data-slot="group"
          :class="b24ui.group({ class: b24uiOverride?.group })"
        >
          <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
            <ContextMenu.Label v-if="item.type === 'label'" data-slot="label" :class="b24ui.label({ class: [b24uiOverride?.label, item.b24ui?.label, item.class] })">
              <ReuseItemTemplate :item="item" :index="index" />
            </ContextMenu.Label>
            <ContextMenu.Separator v-else-if="item.type === 'separator'" data-slot="separator" :class="b24ui.separator({ class: [b24uiOverride?.separator, item.b24ui?.separator, item.class] })" />
            <ContextMenu.Sub
              v-else-if="item?.children?.length"
              :open="item.open"
              :default-open="item.defaultOpen"
            >
              <ContextMenu.SubTrigger
                as="button"
                type="button"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey as string)"
                data-slot="item"
                :class="b24ui.item({ class: [b24uiOverride?.item, item.b24ui?.item, item.class], color: item?.color })"
              >
                <ReuseItemTemplate :item="item" :index="index" />
              </ContextMenu.SubTrigger>

              <B24ContextMenuContent
                sub
                :class="item.b24ui?.content"
                :b24ui="b24ui"
                :b24ui-override="b24uiOverride"
                :portal="portal"
                :items="(item.children as T)"
                :align-offset="-4"
                :label-key="labelKey"
                :description-key="descriptionKey"
                :checked-icon="checkedIcon"
                :loading-icon="loadingIcon"
                :external-icon="externalIcon"
                v-bind="item.content"
              >
                <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
                  <slot :name="(name as keyof ContextMenuSlots<T>)" v-bind="slotData" />
                </template>
              </B24ContextMenuContent>
            </ContextMenu.Sub>
            <ContextMenu.CheckboxItem
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
            </ContextMenu.CheckboxItem>
            <ContextMenu.Item
              v-else
              as-child
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              @select="item.onSelect"
            >
              <B24Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item as Omit<ContextMenuItem, 'type'>)" custom>
                <B24LinkBase
                  v-bind="slotProps"
                  data-slot="item"
                  :class="b24ui.item({ class: [b24uiOverride?.item, item.b24ui?.item, item.class], color: item?.color, active })"
                >
                  <ReuseItemTemplate :item="item" :active="active" :index="index" />
                </B24LinkBase>
              </B24Link>
            </ContextMenu.Item>
          </template>
        </ContextMenu.Group>
      </div>

      <slot />

      <slot name="content-bottom" />
    </component>
  </ContextMenu.Portal>
</template>
