<script setup lang="ts">
import { ref } from 'vue'
import * as locales from '@bitrix24/b24ui-nuxt/locale'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/Locale.vue'

const localesList = Object.values(locales).map((locale) => {
  return {
    label: `[${locale.locale}] ${locale.name}`,
    value: locale.locale
  }
})
const locale = ref('en' as const)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="locale" class="w-full sm:w-[200px]">
        <B24Select v-model="locale" :items="localesList" class="w-full" :b24ui="{ content: 'max-h-60' }" />
      </B24FormField>
    </template>
    <Demo :locale="locale" />
  </ComponentShowExample>
</template>
