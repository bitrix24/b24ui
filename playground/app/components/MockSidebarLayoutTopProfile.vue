<script setup lang="ts">
import { onMounted } from 'vue'
import MockSidebarLayoutMenu from './MockSidebarLayoutMenu.vue'
import BusinesProcessStagesIcon from '@bitrix24/b24icons-vue/outline/BusinesProcessStagesIcon'
import CameraIcon from '@bitrix24/b24icons-vue/button/CameraIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import { useMockMenu } from './../composables/useMockMenu'

const { dropdownMenuItems } = useMockMenu()

onMounted(() => {
  defineShortcuts(extractShortcuts(dropdownMenuItems.value))
})
</script>

<template>
  <div class="backdrop-blur-sm backdrop-brightness-110 px-[15px] py-[10px] flex flex-col items-start items-center justify-between gap-[20px]">
    <div class="w-full flex flex-row items-center justify-between gap-[20px]">
      <div class="flex-1 flex flex-row items-center justify-end gap-[12px]">
        <B24Avatar
          :icon="BusinesProcessStagesIcon"
          alt="Workflows"
          size="xl"
          :b24ui="{
            root: 'bg-(--ui-color-primary-alt)',
            icon: 'size-[36px] text-(--ui-color-palette-white-base)'
          }"
        />
        <div class="flex-1">
          <ProseH1 class="text-(--b24ui-typography-label-color) leading-[29px] font-(--ui-font-weight-light)">
            Workflows
          </ProseH1>
        </div>
      </div>
      <div class="flex-1 hidden sm:flex flex-row items-center justify-end gap-[12px]">
        <B24Button size="sm" :icon="CameraIcon" label="Chats and meetings" color="air-primary" />
        <B24Button size="sm" label="SCRUM items" color="air-selection" />
        <B24DropdownMenu
          :items="dropdownMenuItems"
          arrow
          :content="{ side: 'bottom', align: 'center' }"
        >
          <B24Button size="sm" :icon="MoreMIcon" color="air-secondary-accent" />
        </B24DropdownMenu>
      </div>
    </div>
    <div>
      <MockSidebarLayoutMenu orientation="horizontal" />
    </div>
  </div>
</template>
