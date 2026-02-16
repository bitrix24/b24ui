<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/pre'
import type { IconComponent } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProsePre = ComponentConfig<typeof theme, AppConfig, 'pre', 'b24ui.prose'>

export interface ProsePreProps {
  icon?: IconComponent
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  class?: any
  style?: any
  b24ui?: ProsePre['slots']
}

export interface ProsePreSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentUI } from '../../composables/useComponentUI'
import { useLocale } from '../../composables/useLocale'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24CodeIcon from './CodeIcon.vue'
import B24Button from '../Button.vue'

const props = defineProps<ProsePreProps>()
defineSlots<ProsePreSlots>()

const { t } = useLocale()
const { copy, copied } = useClipboard()
const appConfig = useAppConfig() as ProsePre['AppConfig']
const uiProp = useComponentUI('prose.pre', props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.pre || {}) })())
</script>

<template>
  <div data-slot="root" :class="b24ui.root({ class: [uiProp?.root], filename: !!filename })">
    <div v-if="filename && !hideHeader" data-slot="header" :class="b24ui.header({ class: uiProp?.header })">
      <B24CodeIcon :icon="icon" :filename="filename" data-slot="icon" :class="b24ui.icon({ class: uiProp?.icon })" />

      <span data-slot="filename" :class="b24ui.filename({ class: uiProp?.filename })">{{ filename }}</span>
    </div>

    <B24Button
      color="air-secondary-no-accent"
      size="sm"
      :aria-label="t('prose.pre.copy')"
      data-slot="copy"
      :class="b24ui.copy({ class: uiProp?.copy })"
      tabindex="-1"
      :icon="copied ? icons.copyCheck : icons.copy"
      :b24ui="{
        leadingIcon: [copied ? 'text-(--ui-color-accent-main-success)' : 'text-(--ui-btn-color)']
      }"
      @click="copy(props.code || '')"
    />

    <pre data-slot="base" :class="b24ui.base({ class: [uiProp?.base, props.class] })" v-bind="$attrs"><slot /></pre>
  </div>
</template>

<style>
.shiki span.line {
  display: block;
}

.shiki span.line.highlight {
  margin: 0 -16px;
  padding: 0 16px;

  @apply bg-(--ui-color-g-plastic-bluish-bg)/30;
}
</style>
