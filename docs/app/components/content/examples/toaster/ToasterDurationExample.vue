<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.duration"
    >
      <B24InputNumber
        v-model="appConfig.toaster.duration"
        :min="0"
        :format-options="{ style: 'decimal' }"
      />
    </B24FormField>
  </div>
</template>
