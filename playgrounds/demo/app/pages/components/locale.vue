<script setup lang="ts">
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const locale = ref('en')
</script>

<template>
  <Navbar to="https://bitrix24.github.io/b24ui/docs/getting-started/integrations/i18n/nuxt/" />

  <B24LocaleSelect v-model="locale" :locales="Object.values(locales)" class="w-48 mx-auto mt-10 backdrop-blur-2xl" />
</template>
