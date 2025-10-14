<script lang="ts">
import type { SelectMenuProps } from '@bitrix24/b24ui-nuxt'

export interface ColorModeSelectProps extends /** @vue-ignore */ Pick<SelectMenuProps<any>, 'color' | 'size' | 'trailingIcon' | 'selectedIcon' | 'content' | 'arrow' | 'portal' | 'disabled' | 'b24ui'> {
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '#imports'
import { useLocale } from '../../composables/useLocale'
import icons from '../../dictionary/icons'
import B24SelectMenu from '../SelectMenu.vue'

defineOptions({ inheritAttrs: false })

defineProps<ColorModeSelectProps>()

const { t } = useLocale()
const colorMode = useColorMode()
// const appConfig = useAppConfig()

const items = computed(() => [
  { label: t('colorMode.system'), value: 'system' as const, icon: icons.system },
  { label: t('colorMode.light'), value: 'light' as const, icon: icons.light },
  { label: t('colorMode.dark'), value: 'dark' as const, icon: icons.dark }
])

const preference = computed({
  get() {
    return items.value.find(option => option.value === colorMode.preference) || items.value[0]
  },
  set(option) {
    colorMode.preference = option!.value
  }
})
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <B24SelectMenu
      v-model="preference"
      :search-input="false"
      :icon="preference?.icon"
      v-bind="$attrs"
      :items="items"
    />

    <template #fallback>
      <B24SelectMenu
        :search-input="false"
        :icon="items[0]?.icon"
        v-bind="$attrs"
        :model-value="items[0]"
        :items="items"
        disabled
      />
    </template>
  </ClientOnly>
</template>
