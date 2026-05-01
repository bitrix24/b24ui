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
  icon?: IconComponent['name']
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
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { useLocale } from '../../composables/useLocale'
import { getSlotChildrenText } from '../../utils'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Button from '../Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ProsePromptProps>(), {
  actions: () => ['copy']
})
const slots = defineSlots<ProsePromptSlots>()

const { t } = useLocale()
const { copy, copied } = useClipboard()
const appConfig = useAppConfig() as ProsePrompt['AppConfig']
const uiProp = useComponentUI('prose.prompt', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.prompt || {}) })())

function getPromptText() {
  const children = slots.default?.()
  return children ? getSlotChildrenText(children).trim() : ''
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
  <div data-slot="root" :class="b24ui.root({ class: [uiProp?.root, props.class] })" v-bind="$attrs">
    <Component :is="icon" v-if="icon" data-slot="icon" :class="b24ui.icon({ class: uiProp?.icon })" />

    <div data-slot="content" :class="b24ui.content({ class: uiProp?.content })">
      <p v-if="description" data-slot="description" :class="b24ui.description({ class: uiProp?.description })">
        {{ description }}
      </p>
    </div>

    <div data-slot="actions" :class="b24ui.actions({ class: uiProp?.actions })">
      <B24Button
        v-if="actions.includes('copy')"
        :icon="copied ? icons.copyCheck : icons.copy"
        color="air-primary-copilot"
        size="sm"
        :label="t('prose.prompt.copy')"
        @click="copyPrompt"
      />

      <B24Button
        v-if="actions.includes('cursor')"
        data-icon="cursor"
        color="air-secondary-accent-2"
        size="sm"
        :label="t('prose.prompt.openIn', { name: 'Cursor' })"
        @click="openInCursor"
      />

      <B24Button
        v-if="actions.includes('windsurf')"
        data-icon="windsurf"
        color="air-secondary-accent-2"
        size="sm"
        :label="t('prose.prompt.openIn', { name: 'Windsurf' })"
        @click="openInWindsurf"
      />
    </div>
  </div>
</template>
