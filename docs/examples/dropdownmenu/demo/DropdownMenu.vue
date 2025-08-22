<script setup lang="ts">
import { dropdownMenuItems } from './../../dropdownmenu/dictionary'
import HamburgerMenuIcon from '@bitrix24/b24icons-vue/outline/HamburgerMenuIcon'
import CircleCheckThinIcon from '@bitrix24/b24icons-vue/main/CircleCheckThinIcon'
</script>

<template>
  <B24DropdownMenu :items="dropdownMenuItems" arrow>
    <B24Button label="Open" color="air-secondary-accent" :icon="HamburgerMenuIcon" />

    <template #custom-trailing>
      <CircleCheckThinIcon class="shrink-0 size-[20px] text-(--ui-color-copilot-accent-primary)" />
    </template>
  </B24DropdownMenu>
</template>
