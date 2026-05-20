<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/prompt'
import type { IconComponent } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProsePrompt = ComponentConfig<typeof theme, AppConfig, 'prompt', 'b24ui.prose'>

export interface ProsePromptProps {
  description?: string
  /**
   * @IconComponent
   */
  icon?: IconComponent
  /**
   * Resolved through the icon registry (`dictionary/iconRegistry.ts`)
   * with a fallback to short aliases (`dictionary/icons.ts`).
   * Ignored when `icon` is set.
   */
  iconName?: string
  /**
   * @defaultValue ['copy']
   */
  actions?: ('copy' | 'cursor' | 'windsurf')[]
  class?: any
  b24ui?: ProsePrompt['slots']
}

export interface ProsePromptSlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { useLocale } from '../../composables/useLocale'
import { extractPromptText, resolveIcon } from '../../utils'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Button from '../Button.vue'

defineOptions({ inheritAttrs: false })

const _props = withDefaults(defineProps<ProsePromptProps>(), {
  actions: () => ['copy']
})
defineSlots<ProsePromptSlots>()

const props = useComponentProps('prose.prompt', _props)

const { t } = useLocale()
const { copy, copied } = useClipboard()
const appConfig = useAppConfig() as ProsePrompt['AppConfig']

const bodyRef = useTemplateRef<HTMLElement>('bodyRef')

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.prompt || {}) })())

const iconFromIconName = computed(() => resolveIcon(props.iconName))

function getPromptText() {
  return extractPromptText(bodyRef.value)
}

function copyPrompt() {
  copy(getPromptText())
}

function openInCursor() {
  const url = new URL('cursor://anysphere.cursor-deeplink/prompt')
  url.searchParams.set('text', getPromptText())

  window.open(url.toString(), '_self')
}

function openInWindsurf() {
  const url = new URL('windsurf://cascade/newChat')
  url.searchParams.set('prompt', getPromptText())

  window.open(url.toString(), '_self')
}
</script>

<template>
  <div data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })" v-bind="$attrs">
    <Component
      :is="props.icon"
      v-if="props.icon"
      data-slot="icon"
      :class="b24ui.icon({ class: props.b24ui?.icon })"
    />
    <Component
      :is="iconFromIconName"
      v-else-if="iconFromIconName"
      data-slot="icon"
      :class="b24ui.icon({ class: props.b24ui?.icon })"
    />

    <div data-slot="content" :class="b24ui.content({ class: props.b24ui?.content })">
      <p v-if="props.description" data-slot="description" :class="b24ui.description({ class: props.b24ui?.description })">
        {{ props.description }}
      </p>
      <div ref="bodyRef" data-slot="body" hidden>
        <slot />
      </div>
    </div>

    <div data-slot="actions" :class="b24ui.actions({ class: props.b24ui?.actions })">
      <B24Button
        v-if="props.actions.includes('copy')"
        :icon="copied ? icons.copyCheck : icons.copy"
        color="air-primary-copilot"
        size="sm"
        :label="t('prose.prompt.copy')"
        @click="copyPrompt"
      />

      <B24Button
        v-if="props.actions.includes('cursor')"
        :icon="icons.CursorIcon"
        color="air-secondary-accent-2"
        size="sm"
        :label="t('prose.prompt.openIn', { name: 'Cursor' })"
        @click="openInCursor"
      />

      <B24Button
        v-if="props.actions.includes('windsurf')"
        :icon="icons.WindsurfIcon"
        color="air-secondary-accent-2"
        size="sm"
        :label="t('prose.prompt.openIn', { name: 'Windsurf' })"
        @click="openInWindsurf"
      />
    </div>
  </div>
</template>
