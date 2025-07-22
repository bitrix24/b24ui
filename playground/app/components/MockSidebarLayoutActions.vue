<script setup lang="ts">
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import ChatsWithCheckIcon from '@bitrix24/b24icons-vue/outline/ChatsWithCheckIcon'
</script>

<template>
  <B24ButtonGroup size="sm" no-split>
    <B24Button label="SubAction 1.1" color="air-secondary-accent" active active-color="air-selection" />
    <B24Button label="SubAction 1.2" color="air-secondary-accent" active-color="air-selection" />
    <B24Button label="SubAction 1.3" color="air-secondary-accent" active-color="air-selection" />
  </B24ButtonGroup>
  <B24ButtonGroup size="sm" no-split>
    <B24Button label="SubAction 2.1" color="air-secondary-accent" active active-color="air-selection">
      <template #leading>
        <B24Chip standalone text="4" size="md" />
      </template>
    </B24Button>
    <B24Button label="SubAction 2.2" color="air-secondary-accent" active-color="air-selection">
      <template #leading>
        <B24Chip standalone text="22" size="md" color="success" />
      </template>
    </B24Button>
    <B24Button :icon="ChatsWithCheckIcon" color="air-secondary-accent" active-color="air-selection" />
  </B24ButtonGroup>
  <div class="flex-1 flex flex-row items-center justify-end gap-[12px]">
    <B24Button size="sm" :icon="RobotIcon" label="SubAction 3.1" color="air-secondary-accent" />
    <B24ButtonGroup size="sm">
      <B24Button label="SubAction 3.2" color="air-secondary-accent" />
      <B24Button color="air-secondary-accent" use-dropdown />
    </B24ButtonGroup>
  </div>
</template>
