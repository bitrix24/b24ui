<script setup lang="ts">
import type { ToasterProps } from '@bitrix24/b24ui-nuxt'

const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.expand"
    >
      <B24SelectMenu
        v-model="(appConfig.toaster as ToasterProps).expand"
        :items="[true, false]"
        :search-input="false"
      />
    </B24FormField>
  </div>
</template>
