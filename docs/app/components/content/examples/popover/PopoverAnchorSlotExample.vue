<script lang="ts" setup>
const open = ref(false)
</script>

<template>
  <B24Popover
    v-model:open="open"
    :dismissible="false"
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
