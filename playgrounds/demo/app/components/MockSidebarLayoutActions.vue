<script setup lang="ts">
import RobotIcon from '@bitrix24/b24icons-vue/outline/RobotIcon'
import ChatsWithCheckIcon from '@bitrix24/b24icons-vue/outline/ChatsWithCheckIcon'
import TrendUpIcon from '@bitrix24/b24icons-vue/outline/TrendUpIcon'
</script>

<template>
  <B24FieldGroup size="sm" no-split>
    <B24Button label="List" color="air-secondary-accent" active active-color="air-selection" />
    <B24Button label="Deadline" color="air-secondary-accent" active-color="air-selection">
      <template #leading>
        <B24Chip standalone text="0" size="md" color="air-secondary" />
      </template>
    </B24Button>
    <B24Button label="Planner" color="air-secondary-accent" active-color="air-selection" />
  </B24FieldGroup>
  <B24FieldGroup class="hidden sm:flex" size="sm" no-split>
    <B24Button label="Overdue" color="air-secondary-accent" active-color="air-selection">
      <template #leading>
        <B24Chip standalone text="4" size="md" />
      </template>
    </B24Button>
    <B24Button label="Comments" color="air-secondary-accent" active active-color="air-selection">
      <template #leading>
        <B24Chip standalone text="22" size="md" color="air-primary-success" :trailing-icon="TrendUpIcon" />
      </template>
    </B24Button>
    <B24Button :icon="ChatsWithCheckIcon" color="air-secondary-accent" active-color="air-selection" />
  </B24FieldGroup>
  <div class="flex-1 hidden sm:flex flex-row items-center justify-end gap-[12px]">
    <B24Button size="sm" :icon="RobotIcon" label="Automation rules" color="air-secondary-accent" />
    <B24FieldGroup size="sm">
      <B24Button label="Extensions" color="air-secondary-accent" />
      <B24Button color="air-secondary-accent" use-dropdown />
    </B24FieldGroup>
  </div>
</template>
