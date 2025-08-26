<script setup lang="ts">
import { ref } from 'vue'
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'

const open = ref(false)
</script>

<template>
  <B24Popover
    v-model:open="open"
    :dismissible="false"
    :content="{
      align: 'center',
      side: 'bottom'
    }"
    :b24ui="{ content: 'w-[calc(var(--reka-popper-anchor-width)+10px)] p-[10px]' }"
  >
    <template #anchor>
      <B24Input
        placeholder="Focus to open"
        @focus="open = true"
      />
    </template>

    <template #content>
      <div class="flex items-center justify-between gap-4 mb-[4px]">
        <ProseH2 class="mb-0.5">
          Popover non-dismissible
        </ProseH2>

        <B24Button
          color="air-tertiary"
          :icon="Cross50Icon"
          @click="open = false"
        />
      </div>
      <Placeholder class="w-full h-[192px]" />
    </template>
  </B24Popover>
</template>
