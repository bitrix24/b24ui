<script setup lang="ts">
import * as locales from '@bitrix24/b24ui-nuxt/locale'

const locale = ref('en')
</script>

<template>
  <B24LocaleSelect v-model="locale" :locales="Object.values(locales)" class="w-48" />
</template>
