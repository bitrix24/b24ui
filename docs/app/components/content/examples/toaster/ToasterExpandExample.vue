<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div>
    <B24FormField
      label="toaster.expand"
    >
      <B24SelectMenu
        v-model="appConfig.toaster.expand"
        :items="[true, false]"
        :search-input="false"
      />
    </B24FormField>
  </div>
</template>
