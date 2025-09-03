<script lang="ts">
import type { SwitchProps } from '@bitrix24/b24ui-nuxt'

export interface ColorModeSwitchProps extends /** @vue-ignore */ Pick<SwitchProps, 'as' | 'color' | 'size' | 'disabled' | 'b24ui'> {
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'
import { useLocale } from '../../composables/useLocale'
import icons from '../../dictionary/icons'
import B24Switch from '../Switch.vue'

defineOptions({ inheritAttrs: false })

defineProps<ColorModeSwitchProps>()

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
  <ClientOnly v-if="!colorMode?.forced">
    <B24Switch
      v-model="isDark"
      :checked-icon="icons.dark"
      :unchecked-icon="icons.light"
      :aria-label="isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')"
      v-bind="$attrs"
    />

    <template #fallback>
      <B24Switch
        :checked-icon="icons.dark"
        :unchecked-icon="icons.light"
        :aria-label="isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark')"
        v-bind="$attrs"
        disabled
      />
    </template>
  </ClientOnly>
</template>
