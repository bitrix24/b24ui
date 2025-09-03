<script lang="ts">
import type { SelectMenuProps } from '@bitrix24/b24ui-nuxt'
import type { Locale } from '../../types/locale'

export interface LocaleSelectProps extends /** @vue-ignore */ Pick<SelectMenuProps<any>, 'color' | 'size' | 'trailingIcon' | 'selectedIcon' | 'content' | 'arrow' | 'portal' | 'disabled' | 'b24ui'> {
  locales?: Locale<any>[]
}
</script>

<script setup lang="ts">
import B24SelectMenu from '../SelectMenu.vue'

defineProps<LocaleSelectProps>()

const modelValue = defineModel<string>()

function getEmojiFlag(locale: string): string {
  const languageToCountry: Record<string, string> = {
    en: 'us', // English -> USA
    de: 'de', // Deutsch
    la: 'es', // Catalan -> Spain

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

    kz: 'kz' // Kazakh -> Kazakhstan
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
    :search-input="false"
    value-key="code"
    label-key="name"
    :items="locales"
  >
    <template #leading>
      <span v-if="modelValue" class="size-5 text-center">
        {{ getEmojiFlag(modelValue) }}
      </span>
    </template>

    <template #item-leading="{ item }">
      <span class="size-5 text-center">
        {{ getEmojiFlag(item.code) }}
      </span>
    </template>
  </B24SelectMenu>
</template>
