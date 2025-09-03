<script lang="ts">
import type { ButtonProps } from '../../../types'

export interface ColorModeButtonProps extends /** @vue-ignore */ Pick<ButtonProps, 'as' | 'size' | 'disabled' | 'b24ui'> {
  /**
   * @defaultValue 'air-tertiary-no-accent'
   */
  color?: ButtonProps['color']
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'
import { useLocale } from '../../../composables/useLocale'
import icons from '../../../dictionary/icons'
import B24Button from '../../../components/Button.vue'

withDefaults(defineProps<ColorModeButtonProps>(), {
  color: 'air-tertiary-no-accent'
})

const { t } = useLocale()
const colorMode = useColorMode()
// const appConfig = useAppConfig()

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
  <B24Button
    :icon="isDark ? icons.dark : icons.light"
    :color="color"
    :aria-label="isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')"
    @click="isDark = !isDark"
  />
</template>
