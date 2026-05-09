<script setup lang="ts">
import UserGroupIcon from '@bitrix24/b24icons-vue/common-b24/UserGroupIcon'
import type { DescriptionListItem } from '@bitrix24/b24ui-nuxt/components/DescriptionList.vue'

interface Props {
  title: string
  caption: string
  primaryActionLabel: string
  primaryActionTo?: string
  ownerName: string
  ownerTo?: string
  createdAt: string
  category: string
  mode?: 'click' | 'hover'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'hover'
})

const items = computed(() => [
  { label: 'Account manager', description: props.ownerName, slot: 'owner' as const },
  { label: 'Created', description: props.createdAt },
  { label: 'Segment', description: props.category }
] satisfies DescriptionListItem[])
</script>

<template>
  <B24Popover :mode="props.mode" :content="{ side: 'bottom', sideOffset: 8 }" :b24ui="{ content: 'p-0' }">
    <slot />

    <template #content>
      <div class="w-70 sm:w-xs p-md flex flex-col gap-md">
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
              {{ title }}
            </div>
            <div class="text-sm text-(--ui-color-design-plain-a-content) truncate">
              {{ caption }}
            </div>
          </div>
        </div>

        <B24Button
          block
          color="air-secondary-no-accent"
          :label="primaryActionLabel"
          :to="primaryActionTo"
        />

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
            <B24Link v-if="item.slot === 'owner'" :to="ownerTo">
              {{ item.description }}
            </B24Link>
            <template v-else>
              {{ item.description }}
            </template>
          </template>
        </B24DescriptionList>
      </div>
    </template>
  </B24Popover>
</template>
