<script setup lang="ts">
import { ref } from 'vue'
import type { SidebarLayoutProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import BusinesProcessStagesIcon from '@bitrix24/b24icons-vue/outline/BusinesProcessStagesIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const checkedUseLightContent = ref(true)

// Manage loading state
const handleAction = async () => {
  // Performing an asynchronous operation
  await new Promise(resolve => setTimeout(resolve, 2_000))
}

// This is for demonstration purposes only
const customUIForDemo = {
  root: 'h-[400px] min-h-[400px]',
  loadingWrapper: 'h-[400px] min-h-[400px]',
  sidebar: 'relative z-[0]',
  contentWrapper: 'lg:pl-0',
  container: 'min-h-[calc(100vh-var(--topbar-height)-32px)]'
} as SidebarLayoutProps['b24ui']
</script>

<template>
  <B24SidebarLayout
    :use-light-content="checkedUseLightContent"
    :b24ui="customUIForDemo"
  >
    <template #sidebar>
      <!-- Your sidebar -->
      <B24SidebarHeader>
        <!-- Navigation header -->
        <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
          <ProseH4 class="font-medium mb-0">
            SideBar
          </ProseH4>
        </div>
      </B24SidebarHeader>
      <B24SidebarBody>
        <!-- Navigation elements -->
        <B24SidebarSection>
          <B24NavigationMenu
            :items="[{ label: 'Page 1', type: 'trigger', active: true }, { label: 'Page 2', type: 'trigger' }]"
            orientation="vertical"
          />
        </B24SidebarSection>

        <B24SidebarSpacer />
        <B24SidebarSection>
          <B24NavigationMenu
            :items="[{ label: 'Page 3', type: 'trigger' }, { label: 'Page 4', type: 'trigger' }]"
            orientation="vertical"
          />
        </B24SidebarSection>
      </B24SidebarBody>
      <B24SidebarFooter>
        <!-- Navigation footer -->
        <B24SidebarSection>
          <B24PageLinks
            :links="[
              {
                label: 'b24ui',
                to: 'https://bitrix24.github.io/b24ui/',
                target: '_blank'
              }
            ]"
            class="mb-[12px]"
          />
          <B24Button
            block
            label="Docs"
            color="air-boost"
            size="sm"
            loading-auto
            :icon="RocketIcon"
            to="https://bitrix24.github.io/b24ui/"
            target="_blank"
          />
        </B24SidebarSection>
      </B24SidebarFooter>
    </template>

    <template #navbar>
      <!-- Your navigation bar -->
      <B24NavbarSection class="hidden sm:inline-flex">
        <B24NavigationMenu
          :items="[{ label: 'Page 1', type: 'trigger', active: true }, { label: 'Page 2', type: 'trigger' }]"
          orientation="horizontal"
        />
      </B24NavbarSection>
      <B24NavbarSpacer />
      <B24NavbarSection class="flex-row items-center justify-start gap-4">
        <B24DropdownMenu
          arrow
          :items="[{ label: 'Value 1' }, { label: 'Value 2' }]"
        >
          <B24Button
            color="air-secondary-accent"
            size="xs"
            rounded
            use-dropdown
            label="Action"
          />
        </B24DropdownMenu>
        <B24Switch
          v-model="checkedUseLightContent"
          size="xs"
        />
        <B24Button
          label="Reload"
          color="air-secondary-accent"
          rounded
          size="xs"
          loading-auto
          @click="handleAction"
        />
      </B24NavbarSection>
    </template>

    <template #content-top>
      <div class="w-full flex flex-col gap-[20px] lg:mt-[22px]">
        <div class="lg:rounded-(--ui-border-radius-md) lg:border-1 border-(--ui-color-design-outline-na-stroke) backdrop-blur-md bg-(--ui-color-design-outline-na-bg) p-[24px] lg:px-[22px] lg:py-[15px] flex flex-col items-start justify-between gap-[14px]">
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
                <!-- Page Title -->
                <ProseH1 class="mb-0 text-(--b24ui-typography-label-color) leading-[29px] font-(--ui-font-weight-light)">
                  Some title
                </ProseH1>
              </div>
            </div>
            <div class="flex-1 flex flex-row items-center justify-end gap-[12px]">
              <B24DropdownMenu
                :items="[{ label: 'Value 1' }, { label: 'Value 2' }]"
                :content="{ side: 'bottom', align: 'end' }"
              >
                <B24Button size="sm" :icon="MoreMIcon" color="air-secondary-accent" />
              </B24DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #content-actions>
      <!-- Actions on page -->
      <div class="hidden lg:inline-flex">
        <B24Button
          color="air-secondary-accent"
          label="Action"
          loading-auto
          @click="handleAction"
        />
      </div>
    </template>

    <!-- Main content -->
    <div>
      <ProseP>Your main content goes here</ProseP>
    </div>

    <template #content-bottom>
      <!-- Bottom of page -->
      <ProseP small accent="less-more" class="mt-[12px] px-[22px] pb-[2px]">
        Footer or additional information
      </ProseP>
    </template>
  </B24SidebarLayout>
</template>
