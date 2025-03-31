<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
</script>

<template>
  <template v-if="!route.path.startsWith('/__bitrix24_ui__')">
    <B24App :toaster="appConfig.toaster">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </B24App>
  </template>
  <template v-else>
    <NuxtPage />
  </template>
</template>
