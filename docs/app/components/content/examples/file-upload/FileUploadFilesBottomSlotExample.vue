<script setup lang="ts">
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'

const value = ref<File[]>([])
</script>

<template>
  <B24FileUpload
    v-model="value"
    :icon="ImageIcon"
    label="Drop your images here"
    description="SVG, PNG, JPG or GIF (max. 2MB)"
    layout="list"
    multiple
    :interactive="false"
    class="w-96 min-h-48"
  >
    <template #actions="{ open }">
      <B24Button
        label="Select images"
        :icon="UploadIcon"
        color="air-selection"
        @click="open()"
      />
    </template>

    <template #files-bottom="{ removeFile, files }">
      <B24Button
        v-if="files?.length"
        label="Remove all files"
        color="air-primary-alert"
        @click="removeFile()"
      />
    </template>
  </B24FileUpload>
</template>
