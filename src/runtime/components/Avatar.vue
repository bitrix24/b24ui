<script lang="ts">
import type { VariantProps } from 'tailwind-variants'
import type { AvatarFallbackProps } from 'reka-ui'
import type { AppConfig } from '@nuxt/schema'
import _appConfig from '#build/app.config'
import theme from '#build/b24ui/avatar'
import { tv } from '../utils/tv'
import type { IconComponent } from '../types'

const appConfigAvatar = _appConfig as AppConfig & { b24ui: { avatar: Partial<typeof theme> } }

const avatar = tv({ extend: tv(theme), ...(appConfigAvatar.b24ui?.avatar || {}) })

type AvatarVariants = VariantProps<typeof avatar>

export interface AvatarProps extends Pick<AvatarFallbackProps, 'delayMs'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any
  src?: string
  alt?: string
  icon?: IconComponent
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
import { ref, computed, useAttrs, onMounted } from 'vue'
import { AvatarRoot, AvatarFallback, useForwardProps } from 'reka-ui'
import { reactivePick, useImage } from '@vueuse/core'
import ImageComponent from '#build/b24ui-image-component'
import { useAvatarGroup } from '../composables/useAvatarGroup'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), { as: 'span' })
const attrs = useAttrs() as any

const fallbackProps = useForwardProps(reactivePick(props, 'delayMs'))

const fallback = computed(() => props.text || (props.alt || '')
  .replace(/[+\-*)(}\][{]/g, '')
  .split(' ')
  .map(word => word.charAt(0))
  .join('')
  .substring(0, 2)
)

const imageLoaded = ref(false)

const { size } = useAvatarGroup(props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => avatar({
  size: size.value
}))

const sizePx = computed(() => ({
  '3xs': 10,
  '2xs': 14,
  'xs': 18,
  'sm': 22,
  'md': 32,
  'lg': 42,
  'xl': 48,
  '2xl': 60,
  '3xl': 94
})[props.size || 'md'])

// Reproduces Reka UI's [AvatarImage](https://reka-ui.com/docs/components/avatar#image) component behavior which cannot be used with NuxtImg component
onMounted(() => {
  if (!props.src || (ImageComponent as unknown as string) !== 'img') {
    return
  }

  const { then } = useImage({ ...props, ...attrs, src: props.src! })

  then((img) => {
    if (img.isReady.value) {
      imageLoaded.value = true
    }
  })
})
</script>

<template>
  <AvatarRoot :as="as" :class="b24ui.root({ class: [props.class, props.b24ui?.root] })">
    <component
      :is="ImageComponent"
      v-if="src"
      v-show="imageLoaded"
      role="img"
      :src="src"
      :alt="alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="attrs"
      :class="b24ui.image({ class: props.b24ui?.image })"
      @load="imageLoaded = true"
    />

    <AvatarFallback v-if="!imageLoaded" as-child v-bind="{ ...fallbackProps, ...$attrs }">
      <slot>
        <Component :is="icon" v-if="icon" :class="b24ui.icon({ class: props.b24ui?.icon })" />
        <span v-else :class="b24ui.fallback({ class: props.b24ui?.fallback })">{{ fallback || '&nbsp;' }}</span>
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
