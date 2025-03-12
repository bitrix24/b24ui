<script setup lang="ts">
import { ref } from 'vue'
import CrossCircle70Icon from '@bitrix24/b24icons-vue/actions/CrossCircle70Icon'

const open = ref(false)
</script>

<template>
  <B24Popover
    v-model:open="open"
    arrow
    :dismissible="false"
    :b24ui="{ content: 'p-5' }"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #content>
      <div class="flex items-center justify-between gap-4 mb-2">
        <ProseH2 class="mb-0">
          Popover non-dismissible
        </ProseH2>

        <B24Button
          color="link"
          :icon="CrossCircle70Icon"
          @click="open = false"
        />
      </div>

      <Placeholder class="size-full min-h-48" />
    </template>
  </B24Popover>
</template>
