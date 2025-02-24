<script setup lang="ts">
import { ref } from 'vue'
import VPLayout from 'vitepress/dist/client/theme-default/Layout.vue'
import B24App from '@bitrix24/b24ui-nuxt/runtime/components/App.vue'

const toaster = ref({
  position: 'top-right' as const,
  expand: true,
  duration: 8000
})
</script>

<template>
  <B24App
    :toaster="toaster"
  >
    <VPLayout />
  </B24App>
</template>
