<script setup lang="ts">
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'
</script>

<template>
  <B24Popover :dismissible="false" :b24ui="{ content: 'p-4' }">
    <B24Button label="Open" />

    <template #content="{ close }">
      <div class="flex items-center gap-4 mb-4">
        <h2 class="text-highlighted font-semibold">
          Popover non-dismissible
        </h2>

        <B24Button color="air-tertiary" :icon="Cross50Icon" @click="close" />
      </div>

      <Placeholder class="size-full min-h-48" />
    </template>
  </B24Popover>
</template>
