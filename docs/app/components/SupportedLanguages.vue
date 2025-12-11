<script setup lang="ts">
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const props = withDefaults(defineProps<{
  default?: string
}>(), {
  default: 'en'
})

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

const localeList = computed(() => {
  return Object.values(locales).map((locale, _i) => {
    return {
      code: locale.code,
      locale: locale.locale,
      name: locale.name
    }
  }).sort((a, b) => a.code.localeCompare(b.code))
})
</script>

<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <ProseP>
      By default, the <ProseCode>{{ props.default }}</ProseCode> locale is used.
    </ProseP>
    <div class="grid gap-6 grid-cols-2 md:grid-cols-3">
      <div v-for="locale in localeList" :key="locale.code">
        <div class="flex gap-3 items-center">
          <B24Avatar size="md" class="text-(--b24ui-typography-legend-color)">
            {{ getEmojiFlag(locale.locale) }}
          </B24Avatar>

          <div>
            <ProseH6 class="mb-1">{{ locale.name }}</ProseH6>
            <ProseP small class="mt-1">Code: <ProseCode class="text-xs">{{ locale.code }}</ProseCode> | Locale: <ProseCode class="text-xs">{{ locale.locale }}</ProseCode></ProseP>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
