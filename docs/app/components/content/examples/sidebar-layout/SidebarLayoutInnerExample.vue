<script setup lang="ts">
import type { SidebarLayoutProps } from '@bitrix24/b24ui-nuxt'
import NotificationIcon from '@bitrix24/b24icons-vue/outline/NotificationIcon'
import SidebarLayoutInnerAction from './SidebarLayoutInnerAction.vue'

// Manage loading state
const handleAction = async () => {
  // Performing an asynchronous operation
  await new Promise(resolve => setTimeout(resolve, 4_000))
}

// This is for demonstration purposes only
const customUIForDemo = {
  root: 'h-[400px] min-h-[400px]',
  loadingWrapper: 'h-[400px] min-h-[400px]',
  sidebar: 'relative z-[0]',
  contentWrapper: 'lg:pl-0',
  container: 'min-h-[calc(100vh-var(--topbar-height)-12px)]'
} as SidebarLayoutProps['b24ui']

// This is for demonstration purposes only
const customUIInnerForDemo = {
  loadingWrapper: 'h-[400px] min-h-[400px]'
} as SidebarLayoutProps['b24ui']
</script>

<template>
  <B24SidebarLayout
    :use-light-content="false"
    :b24ui="customUIForDemo"
  >
    <template #navbar>
      <!-- Your navigation bar -->
      <B24NavbarSection class="hidden sm:inline-flex">
        <B24NavigationMenu
          :items="[{ label: 'Page 1', type: 'trigger', active: true }, { label: 'Page 2', type: 'trigger' }]"
          orientation="horizontal"
        />
      </B24NavbarSection>
      <B24NavbarSpacer />
      <B24NavbarSection>
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

    <!-- Main content -->
    <div class="mt-[12px] relative h-full rounded-t-[12px] overflow-hidden">
      <div class="size-full rounded-t-[12px]">
        <B24SidebarLayout
          :use-light-content="false"
          is-inner
          off-content-scrollbar
          :b24ui="{
            ...customUIInnerForDemo,
            root: [
              'edge-light',
              '[--leftmenu-bg-expanded:#eef2f4!important]',
              '[--air-theme-bg-color:#eef2f4]',
              '[--air-theme-bg-size:240px_240px]',
              '[--air-theme-bg-repeat:repeat]',
              '[--air-theme-bg-position:0_0]',
              '[--air-theme-bg-attachment:fixed]',
              '[--air-theme-bg-image:url(/bg/edge-light-v1.svg)]',
              '[--air-theme-bg-image-blurred:url(/bg/edge-light-v1-blurred.webp)]'
            ].join(' '),
            contentWrapper: [
              'bg-[url(/bg/pattern-1.png)] bg-cover bg-center bg-fixed bg-no-repeat bg-[#799fe1]/10',
              'p-0 px-0 ps-0 pe-0 lg:p-0 lg:px-0 lg:ps-0 lg:pe-0 '
            ].join(' '),
            containerWrapper: 'h-full relative',
            containerWrapperInner: 'flex flex-col items-center justify-center'
          } as SidebarLayoutProps['b24ui']"
        >
          <template #sidebar>
            <B24SidebarHeader>
              <div class="text-[#f8f7f7] h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
                <ProseH6 class="font-medium mb-0">
                  Settings
                </ProseH6>
              </div>
            </B24SidebarHeader>
            <B24SidebarBody>
              <div class="space-y-6 px-[25px]">
                <B24Switch label="Expand" class="mt-1" />
                <B24Switch label="isShowProgress" class="mt-1" />
              </div>
            </B24SidebarBody>
          </template>
          <template #navbar>
            <ProseH4 class="font-medium mb-0">
              Demo
            </ProseH4>
            <B24NavbarSpacer />
          </template>
          <template #default>
            <div class="text-(--ui-color-design-filled-market-content) max-w-[550px] mx-(--content-area-shift) px-[60px] py-[20px] rounded-[24px] bg-[#525c69]/20 flex flex-col items-center justify-center gap-[20px]">
              <B24Avatar
                :icon="NotificationIcon"
                alt="Toast"
                size="xl"
                :b24ui="{
                  root: 'bg-transparent ring-2 ring-(--ui-color-design-filled-market-content)/50',
                  icon: 'size-[44px] text-(--ui-color-design-filled-market-content)'
                }"
              />
              <ProseH2 class="text-center text-(--ui-color-design-filled-market-content) leading-[29px] mb-0">
                Some text
              </ProseH2>
              <div class="flex flex-col sm:flex-row items-center justify-center gap-[15px]">
                <SidebarLayoutInnerAction />
              </div>
            </div>
          </template>
        </B24SidebarLayout>
      </div>
    </div>
  </B24SidebarLayout>
</template>
