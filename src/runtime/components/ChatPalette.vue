<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/chat-palette'
import type { ComponentConfig } from '../types/tv'

type ChatPalette = ComponentConfig<typeof theme, AppConfig, 'chatPalette'>

export interface ChatPaletteProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any
  class?: any
  b24ui?: ChatPalette['slots']
}

export interface ChatPaletteSlots {
  default(props?: {}): any
  prompt(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { Primitive, Slot } from 'reka-ui'
import { useAppConfig } from '#imports'
import { tv } from '../utils/tv'

const props = defineProps<ChatPaletteProps>()
const slots = defineSlots<ChatPaletteSlots>()

const appConfig = useAppConfig() as ChatPalette['AppConfig']

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.chatPalette || {}) })())
</script>

<template>
  <Primitive :as="as" data-slot="root" :class="b24ui.root({ class: [props.b24ui?.root, props.class] })">
    <div data-slot="content" :class="b24ui.content({ class: props.b24ui?.content })">
      <Slot compact>
        <slot />
      </Slot>
    </div>

    <Slot v-if="!!slots.prompt" data-slot="prompt" :class="b24ui.prompt({ class: props.b24ui?.prompt })">
      <slot name="prompt" />
    </Slot>
  </Primitive>
</template>
