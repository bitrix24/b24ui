<script setup lang="ts">
import type { FileUploadItem } from '@bitrix24/b24ui-nuxt'
import LoaderWaitIcon from '@bitrix24/b24icons-vue/animated/LoaderWaitIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/outline/CircleCheckIcon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'
import { useIntervalFn } from '@vueuse/core'

interface UploadFileItem extends FileUploadItem {
  progress: number
  preview: string
}

const uploadingAvatar = {
  icon: LoaderWaitIcon
}
const files = ref<UploadFileItem[]>([{
  name: 'bitrix24.png',
  size: 1000,
  type: 'image/png',
  progress: 0,
  preview: 'https://github.com/bitrix24.png',
  avatar: uploadingAvatar
}])
const objectUrls = new Set<string>()

function onUpdateFiles(value: (File | UploadFileItem)[] | null | undefined) {
  files.value = (value || []).map((file) => {
    if (!(file instanceof File)) return file

    const preview = URL.createObjectURL(file)
    objectUrls.add(preview)

    return {
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      preview,
      avatar: uploadingAvatar
    }
  })

  for (const url of objectUrls) {
    if (files.value.some(file => file.preview === url)) continue
    URL.revokeObjectURL(url)
    objectUrls.delete(url)
  }
}

useIntervalFn(() => {
  for (const file of files.value) {
    if (file.progress === 100) continue

    file.progress = Math.min(file.progress + 2, 100)
    if (file.progress === 100) {
      file.avatar = { src: file.preview, alt: file.name }
    }
  }
}, 100)

onScopeDispose(() => {
  for (const url of objectUrls) URL.revokeObjectURL(url)
})
</script>

<template>
  <B24FileUpload
    :model-value="files"
    layout="list"
    label="Drop your images here"
    description="SVG, PNG, JPG or GIF"
    accept="image/*"
    multiple
    class="w-96 min-h-48"
    @update:model-value="onUpdateFiles"
  >
    <template #file-trailing="{ file, index, removeFile }">
      <div class="ms-auto flex items-center gap-2">
        <B24Progress
          v-if="'progress' in file && file.progress < 100"
          :model-value="file.progress"
          size="xs"
          class="w-20"
        />
        <CircleCheckIcon
          v-else-if="'progress' in file && file.progress === 100"
          class="size-5 text-(--ui-color-accent-main-success)"
        />
        <B24Button
          color="air-tertiary-no-accent"
          size="xs"
          :icon="CrossMIcon"
          :aria-label="`Remove ${file.name}`"
          @click.stop.prevent="removeFile(index)"
        />
      </div>
    </template>
  </B24FileUpload>
</template>
