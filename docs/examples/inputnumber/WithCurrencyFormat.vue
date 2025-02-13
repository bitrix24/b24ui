<script setup lang="ts">
import { ref } from 'vue'
import ComponentShowExample from '~/.vitepress/theme/components/ui/ComponentShowExample.vue'
import Demo from './demo/WithCurrencyFormat.vue'
import countryCurrencies from './../locales/CountryCurrencies'

const locales = ref(countryCurrencies)
const localeCode = ref<string>(countryCurrencies[0].code)
</script>

<template>
  <ComponentShowExample>
    <template #actions>
      <B24FormField label="locale" class="w-full sm:w-1/4">
        <B24Select
          v-model="localeCode"
          :items="locales"
          value-key="code"
          label-key="country"
          class="w-full"
          :b24ui="{ content: 'max-h-60' }"
        />
      </B24FormField>
    </template>
    <div class="w-full sm:w-1/3">
      <Demo :locale="localeCode" />
    </div>
  </ComponentShowExample>
</template>
