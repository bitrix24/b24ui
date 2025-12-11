<script setup lang="ts">
import UploadIcon from '@bitrix24/b24icons-vue/outline/UploadIcon'
import CheckLIcon from '@bitrix24/b24icons-vue/outline/CheckLIcon'

const toast = useToast()

function showToast() {
  toast.add({
    'title': 'Uploading file...',
    'description': 'Your file is being uploaded.',
    'icon': UploadIcon,
    'duration': 3000,
    'onUpdate:open': (open) => {
      if (!open) {
        toast.add({
          title: 'File uploaded!',
          description: 'Your file has been successfully uploaded.',
          icon: CheckLIcon,
          color: 'air-primary-success'
        })
      }
    }
  })
}
</script>

<template>
  <B24Button label="Show toast" @click="showToast" />
</template>
