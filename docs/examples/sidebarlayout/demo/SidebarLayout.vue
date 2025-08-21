<script setup lang="ts">
import { ref } from 'vue'
import type { SidebarLayoutInstance, SidebarLayoutProps } from '@bitrix24/b24ui-nuxt'
import RocketIcon from '@bitrix24/b24icons-vue/outline/RocketIcon'
import OpenIn50Icon from '@bitrix24/b24icons-vue/actions/OpenIn50Icon'
import BusinesProcessStagesIcon from '@bitrix24/b24icons-vue/outline/BusinesProcessStagesIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'

const checkedUseLightContent = ref(true)
const sidebarLayoutRef = ref<SidebarLayoutInstance | null>(null)

// Manage loading state
const handleAction = async () => {
  if (sidebarLayoutRef.value) {
    sidebarLayoutRef.value.setLoading(true)

    try {
      // Performing an asynchronous operation
      await new Promise(resolve => setTimeout(resolve, 2_000))
    } finally {
      sidebarLayoutRef.value.setLoading(false)
    }
  }
}

// This is for demonstration purposes only
const customUIForDemo = {
  root: 'h-[400px] min-h-[400px]',
  loadingWrapper: 'h-[400px] min-h-[400px]',
  sidebar: 'relative z-[0]',
  contentWrapper: 'lg:pl-0'
} as SidebarLayoutProps['b24ui']
</script>

<template>
  <B24SidebarLayout
    ref="sidebarLayoutRef"
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
          <B24Link
            class="text-sm mb-2 flex flex-row items-center justify-between"
            to="https://bitrix24.github.io/b24ui/"
            target="_blank"
          >
            <div>@bitrix24/b24ui</div>
            <OpenIn50Icon class="size-4" />
          </B24Link>
          <B24Button
            block
            label="Use our Vue starter"
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
      <div class="w-full flex flex-col gap-[20px]">
        <div class="backdrop-blur-sm backdrop-brightness-110 px-[15px] py-[10px] flex flex-col items-start justify-between gap-[20px]">
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
              <B24DropdownMenu
                :items="[{ label: 'Value 1' }, { label: 'Value 2' }]"
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
        <!-- Page Title -->
        <ProseH2 class="font-semibold mb-0">
          Some title
        </ProseH2>
      </div>
    </template>

    <template #content-actions>
      <!-- Actions on page -->
      <B24Button
        color="air-secondary-accent"
        label="Action"
        loading-auto
        @click="handleAction"
      />
    </template>

    <!-- Main content -->
    <div>
      <ProseP>Your main content goes here</ProseP>
    </div>

    <template #content-bottom>
      <!-- Bottom of page -->
      <ProseP small accent="less-more" class="px-[22px] pb-[2px]">
        Footer or additional information
      </ProseP>
    </template>
  </B24SidebarLayout>
</template>
