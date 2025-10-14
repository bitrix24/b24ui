<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.max"
    >
      <B24InputNumber
        v-model="appConfig.toaster.max"
        :min="0"
        :max="100"
      />
    </B24FormField>
  </div>
</template>
