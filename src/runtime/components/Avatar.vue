<script lang="ts">
import type { AppConfig } from '@nuxt/schema'
import theme from '#build/b24ui/avatar'
import type { IconComponent, ChipProps } from '../types'
import type { ImgHTMLAttributes } from '../types/html'
import type { ComponentConfig } from '../types/tv'

type Avatar = ComponentConfig<typeof theme, AppConfig, 'avatar'>

export interface AvatarProps extends /** @vue-ignore */ Omit<ImgHTMLAttributes, 'src' | 'alt'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'span'
   */
  as?: any | { root?: any, img?: any }
  src?: string
  alt?: string
  /**
   * Display an icon on the left side.
   * @IconComponent
   */
  icon?: IconComponent
  text?: string
  /**
   * @defaultValue 'md'
   */
  size?: Avatar['variants']['size']
  chip?: boolean | ChipProps
  class?: any
  style?: any
  b24ui?: Avatar['slots']
}

export interface AvatarSlots {
  default(props?: {}): any
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Primitive, Slot } from 'reka-ui'
import { defu } from 'defu'
import { useAppConfig } from '#imports'
import ImageComponent from '#build/b24ui-image-component'
import { useComponentUI } from '../composables/useComponentUI'
import { useAvatarGroup } from '../composables/useAvatarGroup'
import { tv } from '../utils/tv'
import B24Chip from './Chip.vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<AvatarProps>()

const as = computed(() => {
  if (typeof props.as === 'string' || typeof props.as?.render === 'function') {
    return { root: props.as }
  }

  return defu(props.as, { root: 'span' })
})

const fallback = computed(() => props.text || (props.alt || '')
  .replace(/[+\-*)(}\][{]/g, '')
  .split(' ')
  .map(word => word.charAt(0))
  .join('')
  .substring(0, 2)
)

const appConfig = useAppConfig() as Avatar['AppConfig']
const uiProp = useComponentUI('avatar', props)
const { size } = useAvatarGroup(props)

// eslint-disable-next-line vue/no-dupe-keys
const b24ui = computed(() => tv({ extend: tv(theme), ...(appConfig.b24ui?.avatar || {}) })({
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

const error = ref(false)

watch(() => props.src, () => {
  if (error.value) {
    error.value = false
  }
})

function onError() {
  error.value = true
}
</script>

<template>
  <component
    :is="props.chip ? B24Chip : Primitive"
    :as="as.root"
    v-bind="props.chip ? (typeof props.chip === 'object' ? { inset: true, ...props.chip } : { inset: true }) : {}"
    data-slot="root"
    :class="b24ui.root({ class: [uiProp?.root, props.class] })"
    :style="props.style"
  >
    <component
      :is="as.img || ImageComponent"
      v-if="src && !error"
      :src="src"
      :alt="alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="$attrs"
      data-slot="image"
      :class="b24ui.image({ class: uiProp?.image })"
      @error="onError"
    />

    <Slot v-else v-bind="$attrs">
      <slot>
        <Component :is="icon" v-if="icon" data-slot="icon" :class="b24ui.icon({ class: uiProp?.icon })" />
        <span v-else data-slot="fallback" :class="b24ui.fallback({ class: uiProp?.fallback })">{{ fallback || '&nbsp;' }}</span>
      </slot>
    </Slot>
  </component>
</template>
