<script setup lang="ts">
import SettingsLIcon from '@bitrix24/b24icons-vue/outline/SettingsLIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
</script>

<template>
  <ProseH2 class="font-semibold mb-0">
    <slot />
  </ProseH2>

  <B24ButtonGroup size="md">
    <B24Button label="Create" color="air-primary-success" />
    <B24Button color="air-primary-success" use-dropdown />
  </B24ButtonGroup>
  <div>
    <B24Input
      size="sm"
    />
  </div>
  <div class="flex-1 flex flex-row items-center justify-end gap-[12px]">
    <B24Button size="sm" :icon="SettingsLIcon" color="air-secondary-accent" />
    <B24Button size="sm" :icon="TaskIcon" color="air-secondary-accent" />
  </div>
</template>
