<script setup lang="ts">
import type { FileUploadItem } from '@bitrix24/b24ui-nuxt'

const files = ref<FileUploadItem[]>([{
  name: 'bitrix24.png',
  size: 1000,
  type: 'image/png',
  avatar: {
    src: 'https://github.com/bitrix24.png',
    alt: 'Bitrix24'
  }
}])
</script>

<template>
  <B24FileUpload
    v-model="files"
    layout="list"
    label="Drop your images here"
    description="SVG, PNG, JPG or GIF"
    accept="image/*"
    multiple
    class="w-96 min-h-48"
  />
</template>
