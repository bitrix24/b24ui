<script setup lang="ts">
import SettingsLIcon from '@bitrix24/b24icons-vue/outline/SettingsLIcon'
import TaskIcon from '@bitrix24/b24icons-vue/button/TaskIcon'
import Search2Icon from '@bitrix24/b24icons-vue/main/Search2Icon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'

const items = ref(['Prospecting', 'Presenting'])
</script>

<template>
  <div class="flex items-center gap-[12px]">
    <div class="w-full flex items-center gap-[20px]">
      <ProseH2 class="font-(--ui-font-weight-semibold) mb-0">
        <slot />
      </ProseH2>

      <B24FieldGroup size="md">
        <B24Button label="Create" color="air-primary-success" />
        <B24Button color="air-primary-success" use-dropdown />
      </B24FieldGroup>

      <div class="w-full max-w-[600px] hidden sm:flex">
        <B24InputTags
          v-model="items"
          tag="+ enter"
          tag-color="air-primary-copilot"
          aria-label="Insert value"
          name="some_value"
          placeholder="Search"
        >
          <template #trailing>
            <div class="flex flex-row items-center justify-between gap-[2px] pe-[5px]">
              <Search2Icon
                v-show="items.length < 1"
                class="size-[24px] text-(--b24ui-icon-color) hover:text-(--b24ui-icon-color-hover)"
              />
              <CrossMIcon
                v-show="items.length > 0"
                class="size-[24px] text-(--b24ui-icon-color) hover:text-(--b24ui-icon-color-hover) cursor-pointer"
                @click="items = []"
              />
            </div>
          </template>
        </B24InputTags>
      </div>
    </div>
    <div class="flex-1 hidden sm:flex flex-row items-center justify-end gap-[12px]">
      <B24Button size="sm" :icon="SettingsLIcon" color="air-secondary-accent" />
      <B24Button size="sm" :icon="TaskIcon" color="air-secondary-accent" />
    </div>
  </div>
</template>
