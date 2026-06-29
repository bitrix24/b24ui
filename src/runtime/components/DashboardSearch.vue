<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/dashboard-search'
import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
import type { ButtonProps } from './Button.vue'
import type { CommandPaletteGroup, CommandPaletteItem, CommandPaletteProps, CommandPaletteSlots } from './CommandPalette.vue'
import type { InputProps } from './Input.vue'
import type { LinkPropsKeys } from './Link.vue'
import type { ModalProps } from './Modal.vue'
import type { ComponentConfig } from '../types/tv'

type DashboardSearch = ComponentConfig<typeof theme, AppConfig, 'dashboardSearch'>

/**
 * @memo not use loadingIcon
 */
export interface DashboardSearchProps<T extends CommandPaletteItem = CommandPaletteItem> extends Pick<ModalProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal' | 'unmountOnHide'>, Pick<CommandPaletteProps<CommandPaletteGroup<T>, T>, 'icon' | 'trailingIcon' | 'selectedIcon' | 'childrenIcon' | 'placeholder' | 'autofocus' | 'loading' | 'closeIcon' | 'back' | 'backIcon' | 'disabled' | 'highlightOnHover' | 'labelKey' | 'descriptionKey' | 'preserveGroupOrder' | 'virtualize' | 'groups'> {
  /**
   * @defaultValue 'md'
   */
  size?: DashboardSearch['variants']['size']
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'sm', color: 'air-tertiary-no-accent' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue true
   */
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>
  /**
   * Configure the input or hide it with `false`.
   * `{ fixed: true }`{lang="ts-type"}
   * @defaultValue true
   */
  input?: boolean | Omit<InputProps, 'modelValue' | 'defaultValue'>
  /**
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://bitrix24.github.io/b24ui/docs/composables/define-shortcuts/))
   * @defaultValue 'meta_k'
   */
  shortcut?: string
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://bitrix24.github.io/b24ui/docs/components/command-palette/).
   * @defaultValue {
     fuseOptions: {
        ignoreLocation: true,
        useTokenSearch: true,
        threshold: 0.1,
        keys: ['label', 'description', 'suffix']
      },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true
    }
   */
  fuse?: UseFuseOptions<T>
  /**
   * Delay (in milliseconds) before the search term is passed to Fuse (debounced).
   * Useful for large datasets where running fuzzy search on every keystroke is the bottleneck — the input stays responsive while Fuse only re-runs after typing settles.
   * Set to `0` to disable.
   * @defaultValue 100
   */
  searchDelay?: number
  /**
   * When `true`, the theme command will be added to the groups.
   * @defaultValue true
   */
  colorMode?: boolean
  class?: any
  b24ui?: DashboardSearch['slots'] & CommandPaletteProps<CommandPaletteGroup<CommandPaletteItem>, CommandPaletteItem>['b24ui']
}

export type DashboardSearchSlots = CommandPaletteSlots<CommandPaletteItem> & {
  content?(props: { close: () => void }): VNode
}

</script>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useForwardProps } from 'reka-ui'
import { defu } from 'defu'
import { reactivePick } from '@vueuse/core'
import { useAppConfig, useColorMode, defineShortcuts, useRuntimeHook } from '#imports'
import { useComponentProps } from '../composables/useComponentProps'
import { useLocale } from '../composables/useLocale'
import { omit, transformUI } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24CommandPalette from './CommandPalette.vue'
import B24Modal from './Modal.vue'

const _props = withDefaults(defineProps<DashboardSearchProps>(), {
  shortcut: 'meta_k',
  colorMode: true,
  close: true,
  fullscreen: false,
  searchDelay: 100
})
const slots = defineSlots<DashboardSearchSlots>()

const props = useComponentProps('dashboardSearch', _props)

const open = defineModel<boolean>('open', { default: false })
const searchTerm = defineModel<string>('searchTerm', { default: '' })

useRuntimeHook('dashboard:search:toggle', () => {
  open.value = !open.value
})

const { t } = useLocale()
// eslint-disable-next-line vue/no-dupe-keys
const colorMode = useColorMode()
const appConfig = useAppConfig() as DashboardSearch['AppConfig']

/** @memo not use loadingIcon */
const commandPaletteProps = useForwardProps(reactivePick(props, 'size', 'icon', 'trailingIcon', 'selectedIcon', 'childrenIcon', 'placeholder', 'autofocus', 'loading', 'close', 'closeIcon', 'back', 'backIcon', 'disabled', 'highlightOnHover', 'labelKey', 'descriptionKey', 'preserveGroupOrder', 'virtualize', 'searchDelay'))
const modalProps = useForwardProps(reactivePick(props, 'overlay', 'transition', 'content', 'dismissible', 'fullscreen', 'modal', 'portal', 'unmountOnHide'))
const inputProps = computed(() => {
  if (props.input === false) {
    return false
  }
  return defu(typeof props.input === 'object' ? props.input : {}, { fixed: true })
})

const getProxySlots = () => omit(slots, ['content'])

// eslint-disable-next-line vue/no-dupe-keys
const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    useTokenSearch: true
  }
}))

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.dashboardSearch || {}) })({
  size: props.size,
  fullscreen: props.fullscreen
}))

const groups = computed(() => {
  const groups: CommandPaletteGroup[] = []

  groups.push(...(props.groups || []))

  if (props.colorMode && !colorMode?.forced) {
    groups.push({
      id: 'theme',
      label: t('dashboardSearch.theme'),
      items: [
        {
          label: t('colorMode.system'),
          icon: icons.system,
          active: colorMode.preference === 'system',
          onSelect: () => {
            colorMode.preference = 'system'
          }
        },
        {
          label: t('colorMode.light'),
          icon: icons.light,
          active: colorMode.preference === 'light',
          onSelect: () => {
            colorMode.preference = 'light'
          }
        },
        {
          label: t('colorMode.dark'),
          icon: icons.dark,
          active: colorMode.preference === 'dark',
          onSelect: () => {
            colorMode.preference = 'dark'
          }
        }
      ]
    })
  }

  return groups
})

const commandPaletteRef = useTemplateRef('commandPaletteRef')

function onSelect(item: CommandPaletteItem) {
  if (item.disabled) {
    return
  }

  // Close modal on select
  open.value = false
  // Reset search term on select
  searchTerm.value = ''
}

defineShortcuts({
  [props.shortcut]: {
    usingInput: true,
    handler: () => open.value = !open.value
  }
})

defineExpose({
  commandPaletteRef
})
</script>

<template>
  <B24Modal
    v-model:open="open"
    :title="props.title || t('dashboardSearch.title')"
    :description="props.description || t('dashboardSearch.description')"
    v-bind="modalProps"
    data-slot="modal"
    :class="b24ui.modal({ class: [props.b24ui?.modal, props.class] })"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <B24CommandPalette
          ref="commandPaletteRef"
          v-model:search-term="searchTerm"
          v-bind="commandPaletteProps"
          :groups="groups"
          :fuse="fuse"
          :input="inputProps"
          :b24ui="transformUI(omit(b24ui, ['modal']), props.b24ui)"
          @update:model-value="onSelect"
          @update:open="open = $event"
        >
          <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </B24CommandPalette>
      </slot>
    </template>
  </B24Modal>
</template>
