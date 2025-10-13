<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.duration"
    >
      <B24InputNumber
        :min="0"
        :format-options="{
          style: 'decimal'
        }"
        v-model="appConfig.toaster.duration"
      />
    </B24FormField>
  </div>
</template>
