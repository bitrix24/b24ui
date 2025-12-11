<script lang="ts">
import type { SelectMenuProps } from '../SelectMenu.vue'
import type { Locale } from '../../types/locale'

export interface LocaleSelectProps extends Omit<SelectMenuProps<Locale<any>[], 'code', false>, 'items' | 'modelValue'> {
  locales?: Locale<any>[]
}
</script>

<script setup lang="ts">
import { useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import B24SelectMenu from '../SelectMenu.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LocaleSelectProps>(), {
  searchInput: false,
  valueKey: 'code',
  labelKey: 'name'
})

const selectMenuProps = useForwardProps(reactiveOmit(props, 'locales'))

const modelValue = defineModel<string>({ required: true })

function getEmojiFlag(locale: string): string {
  const languageToCountry: Record<string, string> = {
    en: 'us', // English -> USA
    de: 'de', // Deutsch
    es: 'es', // Catalan -> Spain

    br: 'br', // Português
    fr: 'fr', // Français
    it: 'it', // Italiano

    pl: 'pl', // Polski
    ru: 'ru', // Russia -> Russia
    ua: 'ua', // Ukrainian -> Ukraine

    tr: 'tr', // Türkçe
    sc: 'sc', // 中文（简体）
    tc: 'tc', // 中文（繁體)

    ja: 'jp', // Japanese -> Japan
    vn: 'vn', // Tiếng Việt
    id: 'id', // Bahasa Indonesia

    ms: 'ms', // Bahasa Melayu
    th: 'th', // ภาษาไทย
    ar: 'sa', // Arabic -> Saudi Arabia

    kk: 'kz', // Kazakh -> Kazakhstan
    hi: 'in' // Indian (हिन्दी)
  }

  const baseLanguage = locale.split('-')[0]?.toLowerCase() || locale
  const countryCode = languageToCountry[baseLanguage] || locale.replace(/^.*-/, '').slice(0, 2)

  return countryCode.toUpperCase()
    .split('')
    .map(char => String.fromCodePoint(0x1F1A5 + char.charCodeAt(0)))
    .join('')
}
</script>

<template>
  <B24SelectMenu
    v-model="modelValue"
    v-bind="{ ...selectMenuProps, ...$attrs }"
    :items="locales"
  >
    <template #leading>
      <span v-if="modelValue" class="size-5 text-center">
        {{ getEmojiFlag(modelValue) }}
      </span>
    </template>

    <template #item-leading="{ item }">
      <span class="size-5 text-center">
        {{ getEmojiFlag(item.locale) }}
      </span>
    </template>
  </B24SelectMenu>
</template>
