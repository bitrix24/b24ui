<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <B24Popover
    v-model:open="open"
    :b24ui="{ content: 'w-(--reka-popper-anchor-width) p-4' }"
  >
    <template #anchor>
      <B24Input placeholder="Focus to open" @focus="open = true" @blur="open = false" />
    </template>

    <template #content>
      <Placeholder class="w-full aspect-square" />
    </template>
  </B24Popover>
</template>
