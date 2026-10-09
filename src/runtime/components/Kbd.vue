<script lang="ts">
import type { VNode } from 'vue'
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/kbd'
import type { KbdKey, KbdKeySpecific } from '../composables/useKbd'
import type { ComponentConfig } from '../types/tv'

type Kbd = ComponentConfig<typeof theme, AppConfig, 'kbd'>

/**
 * @remove depth
 */
export interface KbdProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'kbd'
   */
  as?: any
  value?: KbdKey | string
  /**
   * @defaultValue 'default'
   */
  accent?: Kbd['variants']['accent']
  /**
   * @defaultValue 'md'
   */
  size?: Kbd['variants']['size']
  class?: any
  b24ui?: Kbd['slots']
}

export interface KbdSlots {
  default?(props?: {}): VNode[]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { useAppConfig, useHead } from '#imports'
import { useKbd, kbdKeysPlatformMap } from '../composables/useKbd'
import { useComponentProps } from '../composables/useComponentProps'
import { usePrefix } from '../composables/usePrefix'
import { tv } from '../utils/tv'

const _props = withDefaults(defineProps<KbdProps>(), {
  as: 'kbd',
  accent: 'default'
})
defineSlots<KbdSlots>()

const props = useComponentProps('kbd', _props)

const { getKbdKey } = useKbd()
const prefix = usePrefix()

const platformKey = computed(() => props.value && Object.hasOwn(kbdKeysPlatformMap, props.value) ? kbdKeysPlatformMap[props.value as KbdKeySpecific] : undefined)

// SECURITY: static inline script (no interpolated input) that flags macOS on
// <html> before hydration, so the server-rendered markup can show both labels
// and let CSS pick one without a hydration mismatch.
if (!import.meta.client && platformKey.value) {
  useHead({
    script: [{
      key: 'ui-kbd-macos',
      innerHTML: `/Macintosh;/.test(navigator.userAgent)&&document.documentElement.classList.add('ui-macos')`,
      tagPosition: 'head'
    }]
  })
}

const appConfig = useAppConfig() as Kbd['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: theme, ...(appConfig.b24ui?.kbd || {}) })({
  accent: props.accent,
  size: props.size
}))
</script>

<template>
  <Primitive :as="props.as" data-slot="base" :class="b24ui.base({ class: [props.b24ui?.base, props.class] })">
    <slot>
      <template v-if="platformKey">
        <span :class="prefix('hidden in-[.ui-macos]:inline')">{{ platformKey.macos }}</span>
        <span :class="prefix('in-[.ui-macos]:hidden')">{{ platformKey.other }}</span>
      </template>
      <template v-else>
        {{ getKbdKey(props.value) }}
      </template>
    </slot>
  </Primitive>
</template>
