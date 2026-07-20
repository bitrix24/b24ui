<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/pre'
import type { IconComponent } from '../../types/icons'
import type { ComponentConfig } from '../../types/tv'
import type { ButtonProps } from '../Button.vue'
import type { LinkPropsKeys } from '../Link.vue'

type ProsePre = ComponentConfig<typeof theme, AppConfig, 'pre', 'b24ui.prose'>

export interface ProsePreProps {
  icon?: IconComponent
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  /**
   * Display a button to copy the code to the clipboard.
   * `{ size: 'sm', color: 'air-secondary-no-accent' }`{lang="ts-type"}
   * @defaultValue true
   */
  copy?: boolean | Omit<ButtonProps, LinkPropsKeys>
  class?: any
  style?: any
  b24ui?: ProsePre['slots']
}

export interface ProsePreSlots {
  default(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useAppConfig } from '#imports'
import { useComponentProps } from '../../composables/useComponentProps'
import { useLocale } from '../../composables/useLocale'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24CodeIcon from './CodeIcon.vue'
import B24Button from '../Button.vue'

const _props = withDefaults(defineProps<ProsePreProps>(), {
  copy: true
})

defineSlots<ProsePreSlots>()

const props = useComponentProps('prose.pre', _props)

const { t } = useLocale()
const { copy: copyToClipboard, copied } = useClipboard()
const appConfig = useAppConfig() as ProsePre['AppConfig']

const baseRef = useTemplateRef('baseRef')

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.prose?.pre || {}) })())

function copyCode() {
  const code = props.code ?? baseRef.value?.textContent ?? ''

  copyToClipboard(code)
}
</script>

<template>
  <div data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root], filename: !!props.filename })">
    <div v-if="props.filename && !props.hideHeader" data-slot="header" :class="b24ui.header({ class: props.b24ui?.header })">
      <B24CodeIcon :icon="props.icon" :filename="props.filename" data-slot="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />

      <span data-slot="filename" :class="b24ui.filename({ class: props.b24ui?.filename })">{{ props.filename }}</span>
    </div>

    <B24Button
      v-if="props.copy"
      color="air-secondary-no-accent"
      size="sm"
      :aria-label="t('prose.pre.copy')"
      data-slot="copy"
      :class="b24ui.copy({ class: props.b24ui?.copy })"
      tabindex="-1"
      :icon="copied ? icons.copyCheck : icons.copy"
      :b24ui="{ leadingIcon: [copied ? 'text-(--ui-color-accent-main-success)' : 'text-(--ui-btn-color)'] }"
      v-bind="(typeof props.copy === 'object' ? props.copy : {})"
      @click="copyCode"
    />

    <pre ref="baseRef" data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })" v-bind="$attrs"><slot /></pre>
  </div>
</template>
