<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import type { UseFuseOptions } from '@vueuse/integrations/useFuse'
import theme from '#build/b24ui/dashboard-search'
import type { ButtonProps, InputProps, ModalProps, CommandPaletteProps, CommandPaletteSlots, CommandPaletteGroup, CommandPaletteItem, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

type DashboardSearch = ComponentConfig<typeof theme, AppConfig, 'dashboardSearch'>

/**
 * @memo not use loadingIcon
 */
export interface DashboardSearchProps<T extends CommandPaletteItem = CommandPaletteItem> extends Pick<ModalProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'> {
  /**
   * The icon displayed in the input.
   * @defaultValue icons.search
   * @IconComponent
   */
  icon?: IconComponent
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
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'sm', color: 'air-tertiary-no-accent' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue true
   */
  close?: boolean | Partial<ButtonProps>
  /**
   * The icon displayed in the close button.
   * @defaultValue icons.close
   * @IconComponent
   */
  closeIcon?: IconComponent
  /**
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://bitrix24.github.io/b24ui/docs/composables/define-shortcuts/))
   * @defaultValue 'meta_k'
   */
  shortcut?: string
  groups?: CommandPaletteGroup<T>[]
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://bitrix24.github.io/b24ui/docs/components/command-palette/).
   * @defaultValue {}
   */
  fuse?: UseFuseOptions<T>
  /**
   * When `true`, the theme command will be added to the groups.
   * @defaultValue true
   */
  colorMode?: boolean
  class?: any
  b24ui?: DashboardSearch['slots'] & CommandPaletteProps<CommandPaletteGroup<CommandPaletteItem>, CommandPaletteItem>['b24ui']
}

export type DashboardSearchSlots = CommandPaletteSlots<CommandPaletteGroup<CommandPaletteItem>, CommandPaletteItem> & {
  content(props: { close: () => void }): any
}

</script>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useForwardProps } from 'reka-ui'
import { defu } from 'defu'
import { reactivePick } from '@vueuse/core'
import { useAppConfig, useColorMode, defineShortcuts, useRuntimeHook } from '#imports'
import { useLocale } from '../composables/useLocale'
import { omit, transformUI } from '../utils'
import { tv } from '../utils/tv'
import icons from '../dictionary/icons'
import B24CommandPalette from './CommandPalette.vue'
import B24Modal from './Modal.vue'

const props = withDefaults(defineProps<DashboardSearchProps>(), {
  shortcut: 'meta_k',
  colorMode: true,
  close: true,
  fullscreen: false
})
const slots = defineSlots<DashboardSearchSlots>()

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
const commandPaletteProps = useForwardProps(reactivePick(props, 'icon', 'placeholder', 'autofocus', 'loading', 'close', 'closeIcon'))
const modalProps = useForwardProps(reactivePick(props, 'overlay', 'transition', 'content', 'dismissible', 'fullscreen', 'modal', 'portal'))

const getProxySlots = () => omit(slots, ['content'])

const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
  }
}))

const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.dashboardSearch || {}) })({
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
    :title="title || t('dashboardSearch.title')"
    :description="description || t('dashboardSearch.description')"
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
