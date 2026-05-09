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
      <div class="w-65 p-6 flex flex-col gap-4.5">
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

        <B24Button block color="air-secondary-accent-2" label="Open account" />

        <B24Separator />

        <B24DescriptionList
          size="sm"
          :items="items"
          :b24ui="{
            container: 'mt-0 sm:grid-cols-1',
            labelWrapper: 'border-t-0 sm:border-t-0 py-0 pb-2.5 sm:py-0 sm:pb-2.5',
            descriptionWrapper: 'sm:border-t-0 py-0 pb-2.5 sm:py-0 sm:pb-2.5'
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
