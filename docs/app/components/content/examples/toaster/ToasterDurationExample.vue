<script setup lang="ts">
import type { ToasterProps } from '@bitrix24/b24ui-nuxt'

const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.duration"
    >
      <B24InputNumber
        v-model="(appConfig.toaster as ToasterProps).duration"
        :min="0"
        :format-options="{ style: 'decimal' }"
      />
    </B24FormField>
  </div>
</template>
