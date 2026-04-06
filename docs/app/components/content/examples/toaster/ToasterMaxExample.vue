<script setup lang="ts">
import type { ToasterProps } from '@bitrix24/b24ui-nuxt'

const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.max"
    >
      <B24InputNumber
        v-model="(appConfig.toaster as ToasterProps).max"
        :min="0"
        :max="100"
      />
    </B24FormField>
  </div>
</template>
