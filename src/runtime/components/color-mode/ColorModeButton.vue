<script lang="ts">
import type { ButtonProps } from '../../types'

export interface ColorModeButtonProps extends Omit<ButtonProps, 'color'> {
  /**
   * @defaultValue 'air-tertiary-no-accent'
   */
  color?: ButtonProps['color']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { useColorMode } from '#imports'
import { useLocale } from '../../composables/useLocale'
import icons from '../../dictionary/icons'
import B24Button from '../Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ColorModeButtonProps>(), {
  color: 'air-tertiary-no-accent'
})
defineSlots<{
  fallback(props?: {}): any
}>()

const { t } = useLocale()
const colorMode = useColorMode()
// const appConfig = useAppConfig()

const buttonProps = useForwardProps(reactiveOmit(props, 'icon'))

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <B24Button
      v-bind="{
        ...buttonProps,
        'icon': props.icon || (isDark ? icons.dark : icons.light),
        'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
        ...$attrs
      }"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <slot name="fallback">
        <div class="w-[32px] h-[34px]" />
      </slot>
    </template>
  </ClientOnly>
</template>
