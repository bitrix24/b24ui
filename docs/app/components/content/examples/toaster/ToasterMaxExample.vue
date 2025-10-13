<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.max"
    >
      <B24InputNumber
        :min="0"
        :max="100"
        v-model="appConfig.toaster.max"
      />
    </B24FormField>
  </div>
</template>
