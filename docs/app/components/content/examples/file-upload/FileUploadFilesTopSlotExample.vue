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
    layout="grid"
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

    <template #files-top="{ open, files }">
      <div v-if="files?.length" class="mb-2 flex items-center justify-between">
        <p class="font-bold">
          Files ({{ files?.length }})
        </p>

        <B24Button
          label="Add more"
          color="air-selection"
          class="-my-2"
          @click="open()"
        />
      </div>
    </template>
  </B24FileUpload>
</template>
