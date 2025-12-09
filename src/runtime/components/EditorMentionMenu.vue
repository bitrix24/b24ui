<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/editor-mention-menu'
import type { EditorMenuOptions } from '../composables/useEditorMenu'
import type { AvatarProps, IconComponent } from '../types'
import type { ComponentConfig } from '../types/tv'

type EditorMentionMenu = ComponentConfig<typeof theme, AppConfig, 'editorMentionMenu'>

export interface EditorMentionMenuItem {
  label: string
  description?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  avatar?: AvatarProps
  disabled?: boolean
  class?: any
  [key: string]: any
}

export interface EditorMentionMenuProps<T extends EditorMentionMenuItem = EditorMentionMenuItem> extends Partial<Pick<EditorMenuOptions<T>, 'editor' | 'char' | 'pluginKey' | 'filterFields' | 'limit' | 'options' | 'appendTo'>> {
  items?: T[] | T[][]
  class?: any
  b24ui?: EditorMentionMenu['slots']
}
</script>

<script setup lang="ts" generic="T extends EditorMentionMenuItem">
import { computed, h, onMounted, onBeforeUnmount, nextTick, toRef } from 'vue'
import { useAppConfig } from '#imports'
import { useEditorMenu } from '../composables/useEditorMenu'
import { tv } from '../utils/tv'
import B24Avatar from './Avatar.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EditorMentionMenuProps<T>>(), {
  pluginKey: 'mentionMenu',
  char: '@'
})

const appConfig = useAppConfig() as EditorMentionMenu['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.editorMentionMenu || {}) })())

let menu: ReturnType<typeof useEditorMenu> | null = null

onMounted(async () => {
  await nextTick()

  if (!props.editor || props.editor.isDestroyed) {
    return
  }

  menu = useEditorMenu({
    editor: props.editor,
    char: props.char,
    pluginKey: props.pluginKey,
    items: toRef(() => props.items),
    filterFields: props.filterFields,
    limit: props.limit,
    options: props.options,
    appendTo: props.appendTo,
    b24ui,
    onSelect: (editor, range, item) => {
      // Delete the trigger character and query text, then insert the mention
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({
          type: 'mention',
          attrs: item
        })
        .run()
    },
    renderItem: (item, styles) => [
      /**
       * @memo Icon - first, Avatar - second
       */
      item.icon
        ? h(item.icon, { class: styles.value.itemLeadingIcon() })
        : item.avatar
          ? h(B24Avatar, { ...item.avatar, size: styles.value.itemLeadingAvatarSize(), class: styles.value.itemLeadingAvatar() })
          : null,
      h('span', { class: styles.value.itemWrapper() }, [
        h('span', { class: styles.value.itemLabel() }, item.label),
        item.description
          ? h('span', { class: styles.value.itemDescription() }, item.description)
          : null
      ])
    ]
  })

  props.editor.registerPlugin(menu.plugin)
})

onBeforeUnmount(() => {
  if (menu) {
    menu.destroy()
    menu = null
  }

  if (props.editor && !props.editor.isDestroyed) {
    props.editor.unregisterPlugin(props.pluginKey)
  }
})
</script>

<template>
  <div />
</template>
