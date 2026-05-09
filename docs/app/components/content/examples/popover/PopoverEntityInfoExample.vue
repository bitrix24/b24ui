<script setup lang="ts">
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt'

const items = [
  { label: 'Account manager', description: 'Sample owner', slot: 'owner' as const },
  { label: 'Created', description: 'Oct 6, 2024 08:37' },
  { label: 'Segment', description: 'Enterprise' }
] satisfies DescriptionListItem[]
</script>

<template>
  <B24Popover mode="hover" :content="{ side: 'bottom', sideOffset: 8 }" :b24ui="{ content: 'p-0' }">
    <B24Link is-action>
      ACME Corp.
    </B24Link>

    <template #content>
      <div class="w-[280px] sm:w-xs p-md flex flex-col gap-md">
        <div class="flex items-center gap-3">
          <B24Avatar
            size="lg"
            :icon="UserGroupIcon"
            :b24ui="{
              root: 'bg-(--ui-color-design-filled-alert-bg)',
              icon: 'text-(--ui-color-design-filled-alert-content)'
            }"
          />
          <div class="min-w-0">
            <div class="font-(--ui-font-weight-semi-bold) truncate">
              ACME Corp.
            </div>
            <div class="text-sm text-(--ui-color-design-plain-a-content) truncate">
              12 contacts
            </div>
          </div>
        </div>

        <B24Button block color="air-secondary-no-accent" label="Open account" />

        <B24Separator />

        <B24DescriptionList
          size="sm"
          :items="items"
          :b24ui="{
            container: 'sm:grid-cols-1',
            labelWrapper: 'border-t-0 sm:border-t-0 sm:py-0 sm:pt-3',
            descriptionWrapper: 'sm:border-t-0 sm:py-0 sm:pt-1 sm:pb-3'
          }"
        >
          <template #description="{ item }">
            <B24Link v-if="item.slot === 'owner'">{{ item.description }}</B24Link>
            <template v-else>{{ item.description }}</template>
          </template>
        </B24DescriptionList>
      </div>
    </template>
  </B24Popover>
</template>
