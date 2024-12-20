<script lang="ts">
import type { DefineComponent } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { AvatarFallbackProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/avatar'
import { tv } from '../utils/tv'

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
  icon?: DefineComponent
  text?: string
  size?: AvatarVariants['size']
  class?: any
  b24ui?: Partial<typeof avatar.slots>
}

export interface AvatarSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { AvatarRoot, AvatarImage, AvatarFallback, useForwardProps } from 'reka-ui'
import { reactivePick } from '@vueuse/core'
import { useAvatarGroup } from '../composables/useAvatarGroup'
import ImageComponent from '#build/b24ui-image-component'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), { as: 'span' })

const fallbackProps = useForwardProps(reactivePick(props, 'delayMs'))

const fallback = computed(() => props.text || (props.alt || '')
  .replace(/[\+\-\*\)\(\}\]\[\{\}]/g, '')
  .split(' ')
  .map(word => word.charAt(0))
  .join('')
  .substring(0, 2)
)

const { size } = useAvatarGroup(props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => avatar({
  size: size.value
}))

const sizePx = computed(() => ({
  '2xs': 14,
  'xs': 18,
  'sm': 22,
  'md': 32,
  'lg': 42,
  'xl': 48,
  '2xl': 60,
  '3xl': 94
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

    <AvatarFallback as-child v-bind="{ ...fallbackProps, ...$attrs }">
      <slot>
        <Component :is="icon" v-if="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
        <span v-else :class="b24ui.fallback({ class: props.b24ui?.fallback })">{{ fallback || '&nbsp;' }}</span>
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
