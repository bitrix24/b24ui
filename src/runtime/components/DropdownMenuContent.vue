<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { DropdownMenuContentProps as RekaDropdownMenuContentProps, DropdownMenuContentEmits as RekaDropdownMenuContentEmits } from 'reka-ui'
import theme from '#build/b24ui/dropdown-menu'
import { tv } from '../utils/tv'
import type { KbdProps, AvatarProps, DropdownMenuItem, DropdownMenuSlots, IconComponent } from '../types'
import type { ArrayOrNested, NestedItem } from '../types/utils'

const _dropdownMenu = tv(theme)()

interface DropdownMenuContentProps<T extends ArrayOrNested<DropdownMenuItem>> extends Omit<RekaDropdownMenuContentProps, 'as' | 'asChild' | 'forceMount'> {
  items?: T
  portal?: boolean
  sub?: boolean
  labelKey: keyof NestedItem<T>
  /**
   * @IconComponent
   */
  checkedIcon?: IconComponent
  /**
   * @IconComponent
   */
  externalIcon?: boolean | IconComponent
  class?: any
  b24ui: typeof _dropdownMenu
  b24uiOverride?: any
}

interface DropdownMenuContentEmits extends RekaDropdownMenuContentEmits {}

type DropdownMenuContentSlots<T extends ArrayOrNested<DropdownMenuItem>> = Omit<DropdownMenuSlots<T>, 'default'> & {
  default(props?: {}): any
}
</script>

<script setup lang="ts" generic="T extends ArrayOrNested<DropdownMenuItem>">
import { computed } from 'vue'
import { DropdownMenu } from 'reka-ui/namespaced'
import { useForwardPropsEmits } from 'reka-ui'
import { reactiveOmit, createReusableTemplate } from '@vueuse/core'
import { omit, get, isArrayOfArray } from '../utils'
import { pickLinkProps } from '../utils/link'
import icons from '../dictionary/icons'
import B24LinkBase from './LinkBase.vue'
import B24Link from './Link.vue'
import B24Avatar from './Avatar.vue'
import B24Kbd from './Kbd.vue'
// eslint-disable-next-line import/no-self-import
import B24DropdownMenuContent from './DropdownMenuContent.vue'

const props = defineProps<DropdownMenuContentProps<T>>()
const emits = defineEmits<DropdownMenuContentEmits>()
const slots = defineSlots<DropdownMenuContentSlots<T>>()

const contentProps = useForwardPropsEmits(reactiveOmit(props, 'sub', 'items', 'portal', 'labelKey', 'checkedIcon', 'externalIcon', 'class', 'b24ui', 'b24uiOverride'), emits)
const proxySlots = omit(slots, ['default'])

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: DropdownMenuItem, active?: boolean, index: number }>()

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
    <slot :name="((item.slot || 'item') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :index="index">
      <slot :name="((item.slot ? `${item.slot}-leading`: 'item-leading') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :active="active" :index="index">
        <Component
          :is="icons.loading"
          v-if="item.loading"
          :class="b24ui.itemLeadingIcon({ class: b24uiOverride?.itemLeadingIcon, color: item?.color, loading: true })"
        />
        <Component
          :is="item.icon"
          v-else-if="item.icon"
          :class="b24ui.itemLeadingIcon({ class: b24uiOverride?.itemLeadingIcon, color: item?.color, active })"
        />
        <B24Avatar
          v-else-if="item.avatar"
          :size="((props.b24uiOverride?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
          v-bind="item.avatar"
          :class="b24ui.itemLeadingAvatar({ class: b24uiOverride?.itemLeadingAvatar, active })"
        />
      </slot>

      <span v-if="get(item, props.labelKey as string) || !!slots[(item.slot ? `${item.slot}-label`: 'item-label') as keyof DropdownMenuContentSlots<T>]" :class="b24ui.itemLabel({ class: b24uiOverride?.itemLabel, active })">
        <slot :name="((item.slot ? `${item.slot}-label`: 'item-label') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :active="active" :index="index">
          {{ get(item, props.labelKey as string) }}
        </slot>
        <Component
          :is="typeof externalIcon !== 'boolean' ? externalIcon : icons.external"
          v-if="item.target === '_blank' && externalIcon !== false"
          :class="b24ui.itemLabelExternalIcon({ class: b24uiOverride?.itemLabelExternalIcon, color: item?.color, active })"
        />
      </span>

      <span :class="b24ui.itemTrailing({ class: b24uiOverride?.itemTrailing })">
        <slot :name="((item.slot ? `${item.slot}-trailing`: 'item-trailing') as keyof DropdownMenuContentSlots<T>)" :item="(item as Extract<NestedItem<T>, { slot: string; }>)" :active="active" :index="index">
          <Component
            :is="icons.chevronRight"
            v-if="item.children?.length"
            :class="b24ui.itemTrailingIcon({ class: b24uiOverride?.itemTrailingIcon, color: item?.color, active })"
          />
          <span v-else-if="item.kbds?.length" :class="b24ui.itemTrailingKbds({ class: b24uiOverride?.itemTrailingKbds })">
            <B24Kbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" :size="((props.b24uiOverride?.itemTrailingKbdsSize || b24ui.itemTrailingKbdsSize()) as KbdProps['size'])" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
          </span>
        </slot>

        <DropdownMenu.ItemIndicator as-child>
          <Component
            :is="checkedIcon || icons.check"
            :class="b24ui.itemTrailingIcon({ class: b24uiOverride?.itemTrailingIcon, color: item?.color })"
          />
        </DropdownMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <DropdownMenu.Portal :disabled="!portal">
    <component :is="sub ? DropdownMenu.SubContent : DropdownMenu.Content" :class="props.class" v-bind="contentProps">
      <DropdownMenu.Group v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" :class="b24ui.group({ class: b24uiOverride?.group })">
        <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
          <DropdownMenu.Label v-if="item.type === 'label'" :class="b24ui.label({ class: b24uiOverride?.label })">
            <ReuseItemTemplate :item="item" :index="index" />
          </DropdownMenu.Label>
          <DropdownMenu.Separator v-else-if="item.type === 'separator'" :class="b24ui.separator({ class: b24uiOverride?.separator })" />
          <DropdownMenu.Sub v-else-if="item?.children?.length" :open="item.open" :default-open="item.defaultOpen">
            <DropdownMenu.SubTrigger
              as="button"
              type="button"
              :disabled="item.disabled"
              :text-value="get(item, props.labelKey as string)"
              :class="b24ui.item({ class: b24uiOverride?.item, color: item?.color })"
            >
              <ReuseItemTemplate :item="item" :index="index" />
            </DropdownMenu.SubTrigger>

            <B24DropdownMenuContent
              sub
              :class="props.class"
              :b24ui="b24ui"
              :b24ui-override="b24uiOverride"
              :portal="portal"
              :items="(item.children as T)"
              side="right"
              align="start"
              :align-offset="-4"
              :side-offset="3"
              :label-key="labelKey"
              :checked-icon="checkedIcon"
              :external-icon="externalIcon"
              v-bind="item.content"
            >
              <template v-for="(_, name) in proxySlots" #[name]="slotData: any">
                <slot :name="(name as keyof DropdownMenuContentSlots<T>)" v-bind="slotData" />
              </template>
            </B24DropdownMenuContent>
          </DropdownMenu.Sub>
          <DropdownMenu.CheckboxItem
            v-else-if="item.type === 'checkbox'"
            :model-value="item.checked"
            :disabled="item.disabled"
            :text-value="get(item, props.labelKey as string)"
            :class="b24ui.item({ class: [b24uiOverride?.item, item.class], color: item?.color })"
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
                :class="b24ui.item({ class: [b24uiOverride?.item, item.class], color: item?.color, active })"
              >
                <ReuseItemTemplate :item="item" :active="active" :index="index" />
              </B24LinkBase>
            </B24Link>
          </DropdownMenu.Item>
        </template>
      </DropdownMenu.Group>

      <slot />
    </component>
  </DropdownMenu.Portal>
</template>
