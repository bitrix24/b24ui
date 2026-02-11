<script setup lang="ts">
import type { NodeViewProps } from '@tiptap/vue-3'
import { NodeViewWrapper } from '@tiptap/vue-3'
import SpinnerIcon from '@bitrix24/b24icons-vue/specialized/SpinnerIcon'
import ImageIcon from '@bitrix24/b24icons-vue/outline/ImageIcon'

const props = defineProps<NodeViewProps>()

const file = ref<File | null>(null)
const loading = ref(false)

watch(file, async (newFile) => {
  if (!newFile) return

  loading.value = true

  const reader = new FileReader()
  reader.onload = async (e) => {
    const dataUrl = e.target?.result as string
    if (!dataUrl) {
      loading.value = false
      return
    }

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const pos = props.getPos()
    if (typeof pos !== 'number') {
      loading.value = false
      return
    }

    props.editor
      .chain()
      .focus()
      .deleteRange({ from: pos, to: pos + 1 })
      .setImage({ src: dataUrl })
      .run()

    loading.value = false
  }
  reader.readAsDataURL(newFile)
})
</script>

<template>
  <NodeViewWrapper>
    <B24FileUpload
      v-model="file"
      accept="image/*"
      label="Upload an image"
      description="SVG, PNG, JPG or GIF (max. 2MB)"
      :preview="false"
      class="min-h-48"
    >
      <template #leading>
        <B24Avatar
          :icon="loading ? SpinnerIcon : ImageIcon"
          size="md"
          :b24ui="{ icon: [loading && 'animate-spin'] }"
        />
      </template>
    </B24FileUpload>
  </NodeViewWrapper>
</template>
