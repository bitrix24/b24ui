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
import { computed, h, useTemplateRef } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { useLocale } from '../../composables/useLocale'
import { extractPromptText, resolveIcon } from '../../utils'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Button from '../Button.vue'

// @todo replace with @bitrix24/b24icons-vue once these icons land in the icon pack
const CursorIcon: IconComponent = () => h('svg', {
  'xmlns': 'http://www.w3.org/2000/svg',
  'viewBox': '0 0 24 24',
  'aria-hidden': 'true',
  'data-slot': 'icon'
}, [
  h('path', {
    fill: 'currentColor',
    d: 'M11.503.131L1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23'
  })
])

const WindsurfIcon: IconComponent = () => h('svg', {
  'xmlns': 'http://www.w3.org/2000/svg',
  'viewBox': '0 0 24 24',
  'aria-hidden': 'true',
  'data-slot': 'icon'
}, [
  h('path', {
    fill: 'currentColor',
    d: 'M23.55 5.067a2.177 2.177 0 0 0-2.18 2.177v4.867a1.77 1.77 0 0 1-1.76 1.76a1.82 1.82 0 0 1-1.472-.766l-4.971-7.1a2.2 2.2 0 0 0-1.81-.942c-1.134 0-2.154.964-2.154 2.153v4.896c0 .972-.797 1.76-1.76 1.76c-.57 0-1.136-.287-1.472-.766L.408 5.16A.224.224 0 0 0 0 5.288v4.245c0 .215.066.423.188.6l5.475 7.818c.324.462.8.805 1.351.93a2.164 2.164 0 0 0 2.645-2.098V11.89c0-.972.787-1.76 1.76-1.76h.002a1.8 1.8 0 0 1 1.472.766l4.972 7.1a2.172 2.172 0 0 0 3.96-1.212v-4.895a1.76 1.76 0 0 1 1.76-1.76h.195a.22.22 0 0 0 .22-.22V5.287a.22.22 0 0 0-.22-.22Z'
  })
])

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
        :icon="CursorIcon"
        color="air-secondary-accent-2"
        size="sm"
        :label="t('prose.prompt.openIn', { name: 'Cursor' })"
        @click="openInCursor"
      />

      <B24Button
        v-if="props.actions.includes('windsurf')"
        :icon="WindsurfIcon"
        color="air-secondary-accent-2"
        size="sm"
        :label="t('prose.prompt.openIn', { name: 'Windsurf' })"
        @click="openInWindsurf"
      />
    </div>
  </div>
</template>
