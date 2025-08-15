<script setup lang="ts">
import SettingsLIcon from '@bitrix24/b24icons-vue/outline/SettingsLIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'

const search = ref('')
/**
 * @todo make filter
 */
</script>

<template>
  <div class="flex items-center gap-[12px]">
    <div class="w-full flex items-center gap-[20px]">
      <ProseH2 class="font-semibold mb-0">
        <slot />
      </ProseH2>

      <B24ButtonGroup size="md">
        <B24Button label="Create" color="air-primary-success" />
        <B24Button color="air-primary-success" use-dropdown />
      </B24ButtonGroup>

      <div class="w-full hidden sm:flex">
        <B24Input
          v-model="search"
          type="text"
          name="search"
          aria-label="Search"
          placeholder="Search"
          no-padding
          class="w-full max-w-[400px]"
          :b24ui="{
            base: 'ps-[16px] pe-[58px] text-(--ui-color-design-plain-content)',
            trailing: 'px-0'
          }"
        >
          <template #trailing>
            <div class="flex flex-row items-center justify-between gap-[2px] pe-[5px]">
              <Search2Icon
                v-show="search.length < 1"
                class="size-[24px] text-(--b24ui-icon-color) hover:text-(--b24ui-icon-color-hover) cursor-pointer"
              />
              <CrossMIcon
                v-show="search.length > 0"
                class="size-[24px] text-(--b24ui-icon-color) hover:text-(--b24ui-icon-color-hover) cursor-pointer"
                @click="search = ''"
              />
            </div>
          </template>
        </B24Input>
      </div>
    </div>
    <div class="flex-1 hidden sm:flex flex-row items-center justify-end gap-[12px]">
      <B24Button size="sm" :icon="SettingsLIcon" color="air-secondary-accent" />
      <B24Button size="sm" :icon="TaskIcon" color="air-secondary-accent" />
    </div>
  </div>
</template>
