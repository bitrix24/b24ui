<script setup lang="ts">
import EyeClosedIcon from '@bitrix24/b24icons-vue/button/EyeClosedIcon'
</script>

<template>
  <B24Slideover
    title="Slideover with custom close button"
    description="The `close-icon` prop use"
    :close-icon="EyeClosedIcon"
  >
    <B24Button label="Open" color="link" depth="dark" />

    <template #body>
      <Placeholder class="h-full w-full" />
    </template>
  </B24Slideover>
</template>
