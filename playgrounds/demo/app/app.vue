<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()

useHead({
  title: 'Bitrix24 UI - Playground',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Explore and test all Bitrix24 UI components in an interactive environment' }
  ],
  htmlAttrs: {
    lang: 'en',
    dir: computed(() => appConfig.dir)
  }
})
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
