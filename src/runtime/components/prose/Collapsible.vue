<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/prose/collapsible'
import type { IconComponent, CollapsibleProps } from '../../types'
import type { ComponentConfig } from '../../types/tv'

type ProseCollapsible = ComponentConfig<typeof theme, AppConfig, 'collapsible', 'b24ui.prose'>

export interface ProseCollapsibleProps {
  /**
   * The icon displayed to toggle the collapsible.
   * @defaultValue icons.chevronDown
   */
  icon?: IconComponent
  /**
   * The name displayed in the trigger label.
   * @defaultValue t('prose.collapsible.name')
   */
  name?: string
  /**
   * The text displayed when the collapsible is open.
   * @defaultValue t('prose.collapsible.openText')
   */
  openText?: string
  /**
   * The text displayed when the collapsible is closed.
   * @defaultValue t('prose.collapsible.closeText')
   */
  closeText?: string
  class?: any
  b24ui?: ProseCollapsible['slots'] & CollapsibleProps['b24ui']
}

export interface ProseCollapsibleSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '#imports'
import { useLocale } from '../../composables/useLocale'
import { transformUI } from '../../utils'
import { tv } from '../../utils/tv'
import icons from '../../dictionary/icons'
import B24Collapsible from '../Collapsible.vue'

const props = defineProps<ProseCollapsibleProps>()
defineSlots<ProseCollapsibleSlots>()

const { t } = useLocale()
const appConfig = useAppConfig() as ProseCollapsible['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.prose?.collapsible || {}) })())
</script>

<template>
  <B24Collapsible :unmount-on-hide="false" :class="props.class" :b24ui="transformUI(b24ui, props.b24ui)">
    <template #default="{ open }">
      <button data-slot="trigger" :class="b24ui.trigger({ class: props.b24ui?.trigger })">
        <Component
          :is="icon || icons.chevronDown"
          data-slot="triggerIcon"
          :class="b24ui.triggerIcon({ class: props.b24ui?.triggerIcon })"
        />
        <span data-slot="triggerLabel" :class="b24ui.triggerLabel({ class: props.b24ui?.triggerLabel })">
          {{ open ? (props.closeText || t('prose.collapsible.closeText')) : (props.openText || t('prose.collapsible.openText')) }} {{ props.name || t('prose.collapsible.name') }}
        </span>
      </button>
    </template>

    <template #content>
      <slot />
    </template>
  </B24Collapsible>
</template>
