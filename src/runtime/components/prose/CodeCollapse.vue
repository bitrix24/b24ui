<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/code-collapse'
import type { IconComponent } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProseCodeCollapse = ComponentConfig<typeof theme, AppConfig, 'codeCollapse', 'b24ui.prose'>

export interface ProseCodeCollapseProps {
  /**
   * The icon displayed to toggle the code.
   * @defaultValue ui.icons.chevronDown
   */
  icon?: IconComponent
  /**
   * The name displayed in the trigger label.
   * @defaultValue t('prose.codeCollapse.name')
   */
  name?: string
  /**
   * The text displayed when the code is collapsed.
   * @defaultValue t('prose.codeCollapse.openText')
   */
  openText?: string
  /**
   * The text displayed when the code is expanded.
   * @defaultValue t('prose.codeCollapse.closeText')
   */
  closeText?: string
  class?: any
  b24ui?: ProseCodeCollapse['slots']
}

export interface ProseCodeCollapseSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../../composables/useLocale'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Button from '../Button.vue'

const props = defineProps<ProseCodeCollapseProps>()
defineSlots<ProseCodeCollapseSlots>()

const open = defineModel<boolean>('open', { default: false })

const { t } = useLocale()
const appConfig = useAppConfig() as ProseCodeCollapse['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.codeCollapse || {}) })({
  open: open.value
}))
</script>

<template>
  <div data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <slot />

    <div data-slot="footer" :class="b24ui.footer({ class: props.b24ui?.footer })">
      <B24Button
        :icon="icon || icons.chevronDown"
        color="air-secondary-accent-1"
        :data-state="open ? 'open' : 'closed'"
        :label="`${open ? (props.closeText || t('prose.codeCollapse.closeText')) : (props.openText || t('prose.codeCollapse.openText'))} ${props.name || t('prose.codeCollapse.name')}`"
        data-slot="trigger"
        :class="b24ui.trigger({ class: props.b24ui?.trigger })"
        :b24ui="{ leadingIcon: b24ui.triggerIcon({ class: props.b24ui?.triggerIcon }) }"
        @click="open = !open"
      />
    </div>
  </div>
</template>
