<script lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'
import type { AvatarFallbackProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/avatar'

const appConfig = _appConfig as AppConfig & { b24ui: { avatar: Partial<typeof theme> } }

const avatar = tv({ extend: tv(theme), ...(appConfig.b24ui?.avatar || {}) })

type AvatarVariants = VariantProps<typeof avatar>

export interface AvatarProps extends Pick<AvatarFallbackProps, 'delayMs'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any
  src?: string
  alt?: string
  icon?: string
  text?: string
  size?: AvatarVariants['size']
  class?: any
  b24ui?: Partial<typeof avatar.slots>
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { AvatarRoot, AvatarImage, AvatarFallback, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAvatarGroup } from '../composables/useAvatarGroup'
import UIcon from './Icon.vue'
import ImageComponent from '#build/b24ui-image-component'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), { as: 'span' })

const fallbackProps = useForwardProps(reactivePick(props, 'delayMs'))

const fallback = computed(() => props.text || (props.alt || '').split(' ').map(word => word.charAt(0)).join('').substring(0, 2))

const { size } = useAvatarGroup(props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => avatar({
  size: size.value
}))

const sizePx = computed(() => ({
  '3xs': 16,
  '2xs': 20,
  'xs': 24,
  'sm': 28,
  'md': 32,
  'lg': 36,
  'xl': 40,
  '2xl': 44,
  '3xl': 48
})[props.size || 'md'])
</script>

<template>
  <AvatarRoot :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <AvatarImage
      v-if="src"
      :as="ImageComponent"
      :src="src"
      :alt="alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="$attrs"
      :class="b24ui.image({ class: props.b24ui?.image })"
    />

    <AvatarFallback as-child v-bind="fallbackProps">
      <UIcon v-if="icon" :name="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
      <span v-else :class="b24ui.fallback({ class: props.b24ui?.fallback })">{{ fallback }}</span>
    </AvatarFallback>
  </AvatarRoot>
</template>
