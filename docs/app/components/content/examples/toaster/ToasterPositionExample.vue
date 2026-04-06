<script setup lang="ts">
import type { ToasterProps } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/toaster'

const positions = Object.keys(theme.variants.position)
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.position"
    >
      <B24SelectMenu
        v-model="(appConfig.toaster as ToasterProps).position"
        :items="positions"
        :search-input="false"
      />
    </B24FormField>
  </div>
</template>
