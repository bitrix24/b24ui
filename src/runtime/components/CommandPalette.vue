<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ListboxRootProps, ListboxRootEmits } from 'reka-ui'
import type { FuseResult } from 'fuse.js'
import type { AppConfig } from '@nuxt/schema'
import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
import theme from '#build/b24ui/command-palette'
import type { UseComponentIconsProps } from '../composables/useComponentIcons'
import type { AvatarProps, ButtonProps, ChipProps, KbdProps, InputProps, LinkProps, IconComponent } from '../types'
import type { GetItemKeys } from '../types/utils'
import type { ComponentConfig } from '../types/tv'

type CommandPalette = ComponentConfig<typeof theme, AppConfig, 'commandPalette'>

export interface CommandPaletteItem extends Omit<LinkProps, 'type' | 'raw' | 'custom'> {
  prefix?: string
  label?: string
  suffix?: string
  description?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  chip?: ChipProps
  kbds?: KbdProps['value'][] | KbdProps[]
  active?: boolean
  loading?: boolean
  disabled?: boolean
  slot?: string
  /**
   * The placeholder to display when the item has children.
   */
  placeholder?: string
  children?: CommandPaletteItem[]
  onSelect?: (e: Event) => void
  class?: any
  b24ui?: Pick<CommandPalette['slots'], 'item' | 'itemLeadingIcon' | 'itemLeadingAvatarSize' | 'itemLeadingAvatar' | 'itemLeadingChipSize' | 'itemLeadingChip' | 'itemWrapper' | 'itemLabel' | 'itemDescription' | 'itemLabelPrefix' | 'itemLabelBase' | 'itemLabelSuffix' | 'itemTrailing' | 'itemTrailingKbds' | 'itemTrailingKbdsSize' | 'itemTrailingHighlightedIcon' | 'itemTrailingIcon'>
  [key: string]: any
}

export interface CommandPaletteGroup<T extends CommandPaletteItem = CommandPaletteItem> {
  id: string
  label?: string
  slot?: string
  items?: T[]
  /**
   * Whether to filter group items with [useFuse](https://vueuse.org/integrations/useFuse).
   * When `true`, items will not be filtered which is useful for custom filtering (useAsyncData, useFetch, etc.).
   * @defaultValue false
   */
  ignoreFilter?: boolean
  /** Filter group items after the search happened. */
  postFilter?: (searchTerm: string, items: T[]) => T[]
  /**
   * The icon displayed when an item is highlighted.
   * @IconComponent
   */
  highlightedIcon?: IconComponent
}

/**
 * @memo not use loadingIcon
 */
export interface CommandPaletteProps<G extends CommandPaletteGroup<T> = CommandPaletteGroup<any>, T extends CommandPaletteItem = CommandPaletteItem> extends Pick<ListboxRootProps, 'multiple' | 'disabled' | 'modelValue' | 'defaultValue' | 'highlightOnHover' | 'selectionBehavior'>, Pick<UseComponentIconsProps, 'loading'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  /**
   * The icon displayed in the input.
   * @defaultValue icons.search
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * The icon displayed on the right side of the input.
   * @defaultValue icons.search
   * @IconComponent
   */
  trailingIcon?: IconComponent
  /**
   * The icon displayed when an item is selected.
   * @defaultValue icons.check
   * @IconComponent
   */
  selectedIcon?: IconComponent
  /**
   * The icon displayed when an item has children.
   * @defaultValue icons.chevronRight
   * @IconComponent
   */
  childrenIcon?: IconComponent
  /**
   * The placeholder text for the input.
   * @defaultValue t('commandPalette.placeholder')
   */
  placeholder?: InputProps['placeholder']
  /**
   * Automatically focus the input when component is mounted.
   * @defaultValue true
   */
  autofocus?: boolean
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'sm', color: 'air-tertiary-no-accent' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue false
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconComponent
   */
  closeIcon?: IconComponent
  /**
   * Display a button to navigate back in history.
   * `{ size: 'sm', color: 'air-selection' }`{lang="ts-type"}
   * @defaultValue true
   */
  back?: boolean | ButtonProps
  /**
   * The icon displayed in the back button.
   * @defaultValue icons.arrowLeft
   * @IconComponent
   */
  backIcon?: IconComponent
  groups?: G[]
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse).
   * @defaultValue {
      fuseOptions: {
        ignoreLocation: true,
        threshold: 0.1,
        keys: ['label', 'suffix']
      },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true
    }
   */
  fuse?: UseFuseOptions<T>
  /**
   * Enable virtualization for large lists.
   * Note: when enabled, all groups are flattened into a single list due to a limitation of Reka UI (https://github.com/unovue/reka-ui/issues/1885).
   * @defaultValue false
   */
  virtualize?: boolean | {
    /**
     * Number of items rendered outside the visible area
     * @defaultValue 12
     */
    overscan?: number
    /**
     * Estimated size (in px) of each item
     * @defaultValue 32
     */
    estimateSize?: number
  }
  /**
   * The key used to get the label from the item.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>
  /**
   * The key used to get the description from the item.
   * @defaultValue 'description'
   */
  descriptionKey?: GetItemKeys<T>
  /**
   * Whether to preserve the order of groups as defined in the `groups` prop when filtering.
   * When `false`, groups will appear based on item matches.
   * @defaultValue false
   */
  preserveGroupOrder?: boolean
  class?: any
  b24ui?: CommandPalette['slots']
}

export type CommandPaletteEmits<T extends CommandPaletteItem = CommandPaletteItem> = ListboxRootEmits<T> & {
  'update:open': [value: boolean]
}

type SlotProps<T> = (props: { item: T, index: number, b24ui: CommandPalette['b24ui'] }) => any

export type CommandPaletteSlots<G extends CommandPaletteGroup<T> = CommandPaletteGroup<any>, T extends CommandPaletteItem = CommandPaletteItem> = {
  'empty'(props: { searchTerm?: string }): any
  'footer'(props: { b24ui: CommandPalette['b24ui'] }): any
  'back'(props: { b24ui: CommandPalette['b24ui'] }): any
  'close'(props: { b24ui: CommandPalette['b24ui'] }): any
  'item': SlotProps<T>
  'item-leading': SlotProps<T>
  'item-label': SlotProps<T>
  'item-description': SlotProps<T>
  'item-trailing': SlotProps<T>
} & Record<string, SlotProps<G>> & Record<string, SlotProps<T>>

</script>

<script setup lang="ts" generic="G extends CommandPaletteGroup<T>, T extends CommandPaletteItem">
import { computed, ref, useTemplateRef, toRef } from 'vue'
import { ListboxRoot, ListboxFilter, ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxVirtualizer, ListboxItem, ListboxItemIndicator, useForwardProps, useForwardPropsEmits } from 'reka-ui'
import { defu } from 'defu'
import { reactivePick, createReusableTemplate, refThrottled } from '@vueuse/core'
import { useFuse } from '@vueuse/integrations/useFuse'
import { useAppConfig } from '#imports'
import { useLocale } from '../composables/useLocale'
import { omit, get } from '../utils'
import { highlight } from '../utils/fuse'
import { pickLinkProps } from '../utils/link'
import { getEstimateSize } from '../utils/virtualizer'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24Avatar from './Avatar.vue'
import B24Button from './Button.vue'
import B24Chip from './Chip.vue'
import B24LinkBase from './LinkBase.vue'
import B24Link from './Link.vue'
import B24Input from './Input.vue'
import B24Kbd from './Kbd.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CommandPaletteProps<G, T>>(), {
  modelValue: '',
  labelKey: 'label',
  descriptionKey: 'description',
  autofocus: true,
  back: true,
  preserveGroupOrder: false,
  virtualize: false,
  highlightOnHover: true
})
const emits = defineEmits<CommandPaletteEmits<T>>()
const slots = defineSlots<CommandPaletteSlots<G, T>>()

const searchTerm = defineModel<string>('searchTerm', { default: '' })

const { t } = useLocale()
const appConfig = useAppConfig() as CommandPalette['AppConfig']

const rootProps = useForwardPropsEmits(reactivePick(props, 'as', 'disabled', 'multiple', 'modelValue', 'defaultValue', 'highlightOnHover'), emits)
const inputProps = useForwardProps(reactivePick(props, 'loading'))
const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false

  return defu(typeof props.virtualize === 'boolean' ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, 'md', props.descriptionKey as string)
  })
})

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: CommandPaletteItem, group?: CommandPaletteGroup, index: number }>({
  props: {
    item: {
      type: Object,
      required: true
    },
    group: {
      type: Object,
      required: false
    },
    index: {
      type: Number,
      required: false
    }
  }
})

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.commandPalette || {}) })({
  virtualize: !!props.virtualize
}))

const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    ignoreLocation: true,
    threshold: 0.1,
    keys: [props.labelKey, 'suffix']
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}) as UseFuseOptions<T>)

const history = ref<(CommandPaletteGroup & { placeholder?: string })[]>([])

const placeholder = computed(() => history.value[history.value.length - 1]?.placeholder || props.placeholder || t('commandPalette.placeholder'))

const groups = computed(() => history.value?.length ? [history.value[history.value.length - 1] as G] : props.groups)

const items = computed(() => groups.value?.filter((group) => {
  if (!group.id) {
    console.warn(`[@bitrix24/b24ui-nuxt] CommandPalette group is missing an \`id\` property`)
    return false
  }
  if (group.ignoreFilter) {
    return false
  }
  return true
})?.flatMap(group => group.items?.map(item => ({ ...item, group: group.id })) || []) || [])

const { results: fuseResults } = useFuse<typeof items.value[number]>(searchTerm, items, fuse)

const throttledFuseResults = refThrottled(fuseResults, 16, true)

function processGroupItems(group: G, items: (T & { matches?: FuseResult<T>['matches'] })[]) {
  let processedItems = items

  if (group?.postFilter && typeof group.postFilter === 'function') {
    processedItems = group.postFilter(searchTerm.value, processedItems)
  }

  return {
    ...group,
    items: processedItems.slice(0, fuse.value.resultLimit).map((item) => {
      return {
        ...item,
        labelHtml: highlight<T>(item, searchTerm.value, props.labelKey),
        suffixHtml: highlight<T>(item, searchTerm.value, undefined, [props.labelKey])
      }
    })
  }
}

const filteredGroups = computed(() => {
  const currentGroups = groups.value

  const groupsById = throttledFuseResults.value.reduce((acc, result) => {
    const { item, matches } = result
    if (!item.group) {
      return acc
    }

    acc[item.group] ||= []
    acc[item.group]?.push({ ...item, matches })

    return acc
  }, {} as Record<string, (T & { matches?: FuseResult<T>['matches'] })[]>)

  if (props.preserveGroupOrder) {
    const processedGroups: Array<ReturnType<typeof processGroupItems>> = []

    for (const group of currentGroups || []) {
      if (!group.items?.length) {
        continue
      }

      const items = group.ignoreFilter ? group.items : groupsById[group.id]
      if (!items?.length) {
        continue
      }

      const processedGroup = processGroupItems(group, items)

      // Filter out groups that become empty after postFilter
      if (processedGroup.items?.length) {
        processedGroups.push(processedGroup)
      }
    }

    return processedGroups
  }

  const fuseGroups = Object.entries(groupsById).map(([id, items]) => {
    const group = currentGroups?.find(group => group.id === id)
    if (!group) {
      return
    }

    const processedGroup = processGroupItems(group, items)
    // Filter out groups without items after postFilter
    return processedGroup.items?.length ? processedGroup : undefined
  }).filter(group => !!group)

  const nonFuseGroups = currentGroups
    ?.map((group, index) => ({ ...group, index }))
    ?.filter(group => group.ignoreFilter && group.items?.length)
    ?.map((group) => {
      const processedGroup = processGroupItems(group, group.items || [])
      return { ...processedGroup, index: group.index }
    })
    // Filter out groups without items after postFilter
    ?.filter(group => group.items?.length) || []

  return nonFuseGroups.reduce((acc, group) => {
    acc.splice(group.index, 0, group)
    return acc
  }, [...fuseGroups])
})

const filteredItems = computed(() => filteredGroups.value.flatMap(group => group.items || []))

const rootRef = useTemplateRef('rootRef')

function navigate(item: T) {
  if (!item.children?.length) {
    return
  }

  history.value.push({
    id: `history-${history.value.length}`,
    label: item.label,
    slot: item.slot,
    placeholder: item.placeholder,
    items: item.children
  } as any)

  searchTerm.value = ''

  rootRef.value?.highlightFirstItem()
}

function navigateBack() {
  if (!history.value.length) {
    return
  }

  history.value.pop()

  searchTerm.value = ''

  rootRef.value?.highlightFirstItem()
}

function onBackspace() {
  if (!searchTerm.value) {
    navigateBack()
  }
}

function onSelect(e: Event, item: T) {
  if (item.children?.length) {
    e.preventDefault()

    navigate(item)
  } else {
    item.onSelect?.(e)
  }
}
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <DefineItemTemplate v-slot="{ item, index, group }">
    <ListboxItem
      :value="omit(item, ['matches' as any, 'group' as any, 'onSelect', 'labelHtml', 'suffixHtml', 'children'])"
      :disabled="item.disabled"
      as-child
      @select="onSelect($event, item as T)"
    >
      <B24Link v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
        <B24LinkBase
          v-bind="slotProps"
          data-slot="item"
          :class="b24ui.item({ class: [props.b24ui?.item, item.b24ui?.item, item.class], active: active || item.active })"
        >
          <slot
            :name="((item.slot || group?.slot || 'item') as keyof CommandPaletteSlots<G, T>)"
            :item="(item as any)"
            :index="index"
            :b24ui="b24ui"
          >
            <slot
              :name="((item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`) as keyof CommandPaletteSlots<G, T>)"
              :item="(item as any)"
              :index="index"
              :b24ui="b24ui"
            >
              <Component
                :is="icons.loading"
                v-if="item.loading"
                data-slot="itemLeadingIcon"
                :class="b24ui.itemLeadingIcon({ class: [props.b24ui?.itemLeadingIcon, item.b24ui?.itemLeadingIcon], loading: true })"
              />
              <Component
                :is="item.icon"
                v-else-if="item.icon"
                data-slot="itemLeadingIcon"
                :class="b24ui.itemLeadingIcon({ class: [props.b24ui?.itemLeadingIcon, item.b24ui?.itemLeadingIcon], active: active || item.active })"
              />
              <B24Avatar
                v-else-if="item.avatar"
                :size="((item.b24ui?.itemLeadingAvatarSize || props.b24ui?.itemLeadingAvatarSize || b24ui.itemLeadingAvatarSize()) as AvatarProps['size'])"
                v-bind="item.avatar"
                data-slot="itemLeadingAvatar"
                :class="b24ui.itemLeadingAvatar({ class: [props.b24ui?.itemLeadingAvatar, item.b24ui?.itemLeadingAvatar], active: active || item.active })"
              />
              <B24Chip
                v-else-if="item.chip"
                :size="((item.b24ui?.itemLeadingChipSize || props.b24ui?.itemLeadingChipSize || b24ui.itemLeadingChipSize()) as ChipProps['size'])"
                inset
                standalone
                v-bind="item.chip"
                data-slot="itemLeadingChip"
                :class="b24ui.itemLeadingChip({ class: [props.b24ui?.itemLeadingChip, item.b24ui?.itemLeadingChip], active: active || item.active })"
              />
            </slot>

            <span
              v-if="(item.prefix || (item.labelHtml || get(item, props.labelKey as string)) || (item.suffixHtml || item.suffix) || !!slots[(item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`) as keyof CommandPaletteSlots<G, T>]) || (get(item, props.descriptionKey as string) || !!slots[(item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`) as keyof CommandPaletteSlots<G, T>])"
              data-slot="itemWrapper"
              :class="b24ui.itemWrapper({ class: [props.b24ui?.itemWrapper, item.b24ui?.itemWrapper] })"
            >
              <span data-slot="itemLabel" :class="b24ui.itemLabel({ class: [props.b24ui?.itemLabel, item.b24ui?.itemLabel], active: active || item.active })">
                <slot
                  :name="((item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`) as keyof CommandPaletteSlots<G, T>)"
                  :item="(item as any)"
                  :index="index"
                  :b24ui="b24ui"
                >
                  <span
                    v-if="item.prefix"
                    data-slot="itemLabelPrefix"
                    :class="b24ui.itemLabelPrefix({ class: [props.b24ui?.itemLabelPrefix, item.b24ui?.itemLabelPrefix] })"
                  >{{ item.prefix }}</span>

                  <span
                    v-if="item.labelHtml"
                    data-slot="itemLabelBase"
                    :class="b24ui.itemLabelBase({ class: [props.b24ui?.itemLabelBase, item.b24ui?.itemLabelBase], active: active || item.active })"
                    v-html="item.labelHtml || get(item, props.labelKey as string)"
                  />
                  <span
                    v-else
                    data-slot="itemLabelBase"
                    :class="b24ui.itemLabelBase({ class: [props.b24ui?.itemLabelBase, item.b24ui?.itemLabelBase], active: active || item.active })"
                  >{{ get(item, props.labelKey as string) }}</span>

                  <span
                    v-if="item.suffixHtml"
                    data-slot="itemLabelSuffix"
                    :class="b24ui.itemLabelSuffix({ class: [props.b24ui?.itemLabelSuffix, item.b24ui?.itemLabelSuffix], active: active || item.active })"
                    v-html="item.suffixHtml || item.suffix"
                  />
                  <span
                    v-else-if="item.suffix"
                    data-slot="itemLabelSuffix"
                    :class="b24ui.itemLabelSuffix({ class: [props.b24ui?.itemLabelSuffix, item.b24ui?.itemLabelSuffix], active: active || item.active })"
                  >{{ item.suffix }}</span>
                </slot>
              </span>

              <span
                v-if="get(item, props.descriptionKey as string)"
                data-slot="itemDescription"
                :class="b24ui.itemDescription({ class: [props.b24ui?.itemDescription, item.b24ui?.itemDescription] })"
              >
                <slot
                  :name="((item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`) as keyof CommandPaletteSlots<G, T>)"
                  :item="(item as any)"
                  :index="index"
                  :b24ui="b24ui"
                >
                  {{ get(item, props.descriptionKey as string) }}
                </slot>
              </span>
            </span>

            <span data-slot="itemTrailing" :class="b24ui.itemTrailing({ class: [props.b24ui?.itemTrailing, item.b24ui?.itemTrailing] })">
              <slot
                :name="((item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`) as keyof CommandPaletteSlots<G, T>)"
                :item="(item as any)"
                :index="index"
                :b24ui="b24ui"
              >
                <Component
                  :is="childrenIcon || icons.chevronRight"
                  v-if="item.children && item.children.length > 0"
                  data-slot="itemTrailingIcon"
                  :class="b24ui.itemTrailingIcon({ class: [props.b24ui?.itemTrailingIcon, item.b24ui?.itemTrailingIcon] })"
                />

                <span v-else-if="item.kbds?.length" data-slot="itemTrailingKbds" :class="b24ui.itemTrailingKbds({ class: [props.b24ui?.itemTrailingKbds, item.b24ui?.itemTrailingKbds] })">
                  <B24Kbd
                    v-for="(kbd, kbdIndex) in item.kbds"
                    :key="kbdIndex"
                    :size="((item.b24ui?.itemTrailingKbdsSize || props.b24ui?.itemTrailingKbdsSize || b24ui.itemTrailingKbdsSize()) as KbdProps['size'])"
                    v-bind="typeof kbd === 'string' ? { value: kbd } : kbd"
                  />
                </span>

                <Component
                  :is="group.highlightedIcon"
                  v-else-if="group?.highlightedIcon"
                  data-slot="itemTrailingHighlightedIcon"
                  :class="b24ui.itemTrailingHighlightedIcon({ class: [props.b24ui?.itemTrailingHighlightedIcon, item.b24ui?.itemTrailingHighlightedIcon] })"
                />
              </slot>

              <ListboxItemIndicator v-if="!item.children?.length" as-child>
                <Component
                  :is="selectedIcon || icons.check"
                  data-slot="itemTrailingIcon"
                  :class="b24ui.itemTrailingIcon({ class: [props.b24ui?.itemTrailingIcon, item.b24ui?.itemTrailingIcon] })"
                />
              </ListboxItemIndicator>
            </span>
          </slot>
        </B24LinkBase>
      </B24Link>
    </ListboxItem>
  </DefineItemTemplate>

  <ListboxRoot v-bind="{ ...rootProps, ...$attrs }" ref="rootRef" :selection-behavior="selectionBehavior" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <ListboxFilter v-model="searchTerm" as-child>
      <B24Input
        :placeholder="placeholder"
        no-border
        no-padding
        :autofocus="autofocus"
        v-bind="inputProps"
        size="xl"
        :trailing-icon="trailingIcon"
        :icon="icon || icons.search"
        data-slot="input"
        :class="b24ui.input({ class: props.b24ui?.input })"
        @keydown.backspace="onBackspace"
      >
        <template v-if="history?.length && (back || !!slots.back)" #leading>
          <slot name="back" :b24ui="b24ui">
            <B24Button
              :icon="backIcon || icons.arrowLeft"
              size="sm"
              color="air-selection"
              :aria-label="t('commandPalette.back')"
              v-bind="(typeof back === 'object' ? back as Partial<ButtonProps> : {})"
              data-slot="back"
              :class="b24ui.back({ class: props.b24ui?.back })"
              @click="navigateBack"
            />
          </slot>
        </template>

        <template v-if="close || !!slots.close" #trailing>
          <slot name="close" :b24ui="b24ui">
            <B24Button
              v-if="close"
              :icon="closeIcon || icons.close"
              size="sm"
              color="air-tertiary-no-accent"
              :aria-label="t('commandPalette.close')"
              v-bind="(typeof close === 'object' ? close as Partial<ButtonProps> : {})"
              data-slot="close"
              :class="b24ui.close({ class: props.b24ui?.close })"
              @click="emits('update:open', false)"
            />
          </slot>
        </template>
      </B24Input>
    </ListboxFilter>

    <ListboxContent data-slot="content" :class="b24ui.content({ class: props.b24ui?.content })">
      <div v-if="filteredGroups?.length" role="presentation" data-slot="viewport" :class="b24ui.viewport({ class: props.b24ui?.viewport })">
        <ListboxVirtualizer
          v-if="!!virtualize"
          v-slot="{ option: item, virtualItem }"
          :options="(filteredItems as any[])"
          :text-content="item => get(item, props.labelKey as string)"
          v-bind="virtualizerProps"
        >
          <ReuseItemTemplate :item="item" :index="virtualItem.index" />
        </ListboxVirtualizer>

        <template v-else>
          <ListboxGroup v-for="group in filteredGroups" :key="`group-${group.id}`" data-slot="group" :class="b24ui.group({ class: props.b24ui?.group })">
            <ListboxGroupLabel v-if="get(group, props.labelKey as string)" data-slot="label" :class="b24ui.label({ class: props.b24ui?.label })">
              {{ get(group, props.labelKey as string) }}
            </ListboxGroupLabel>

            <ReuseItemTemplate
              v-for="(item, index) in group.items"
              :key="`group-${group.id}-${index}`"
              :item="item"
              :index="index"
              :group="(group as CommandPaletteGroup)"
            />
          </ListboxGroup>
        </template>
      </div>

      <div v-else data-slot="empty" :class="b24ui.empty({ class: props.b24ui?.empty })">
        <slot name="empty" :search-term="searchTerm">
          {{ searchTerm ? t('commandPalette.noMatch', { searchTerm }) : t('commandPalette.noData') }}
        </slot>
      </div>
    </ListboxContent>

    <div v-if="!!slots.footer" data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
      <slot name="footer" :b24ui="b24ui" />
    </div>
  </ListboxRoot>
</template>
