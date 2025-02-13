<script setup lang="ts">
import { ref, computed } from 'vue'
import countryCurrencies from './../../locales/CountryCurrencies'
import type { CurrencyLocale } from './../../locales/CountryCurrencies'

export interface ExampleProps {
  locale?: string
}

const props = withDefaults(defineProps<ExampleProps>(), {
  locale: countryCurrencies[0].code
})

const localeInfo = computed<CurrencyLocale>(() => {
  const foundElement = countryCurrencies.find(item => item.code === props.locale)

  if (foundElement) {
    return foundElement
  }

  return countryCurrencies[0]
})

const value = ref(1500.05)
</script>

<template>
  <B24InputNumber
    v-model.number="value"
    :step="1.00"
    :locale="localeInfo.locale"
    :format-options="{
      style: 'currency',
      currency: localeInfo.currencyCode,
      currencyDisplay: 'code',
      currencySign: 'accounting'
    }"
  />
</template>
