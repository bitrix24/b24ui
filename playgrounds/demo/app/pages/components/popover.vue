<script setup lang="ts">
import MockContentLongText from '../../components/MockContentLongText.vue'
import MockContentUploadFile from '../../components/MockContentUploadFile.vue'
import Cross50Icon from '@bitrix24/b24icons-vue/actions/Cross50Icon'

const open = ref(false)
const openCustomAnchor = ref(false)

const contentAligns = ['start', 'center', 'end']
const contentSides = ['right', 'left', 'top', 'bottom']
const entityModes = ['hover', 'click'] as const

const align = ref<'start' | 'center' | 'end'>('center')
const side = ref<'right' | 'left' | 'top' | 'bottom'>('bottom')
const sideOffset = ref(0)
const openDelay = ref(500)
const closeDelay = ref(300)
const arrow = ref(false)
const modal = ref(false)
const entityMode = ref<typeof entityModes[number]>('hover')
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col max-w-md mx-auto' }">
    <template #controls>
      <B24Tooltip text="content.align" size="xs">
        <B24Select v-model="align" placeholder="content.align" size="xs" :items="contentAligns" />
      </B24Tooltip>
      <B24Tooltip text="content.side" size="xs">
        <B24Select v-model="side" placeholder="content.side" size="xs" :items="contentSides" />
      </B24Tooltip>
      <B24Tooltip text="content.sideOffset" size="xs">
        <B24InputNumber v-model="sideOffset" size="xs" placeholder="content.sideOffset" class="w-20" />
      </B24Tooltip>

      <B24Tooltip text="Open delay (hover)" size="xs">
        <B24InputNumber v-model="openDelay" size="xs" placeholder="openDelay" class="w-20" />
      </B24Tooltip>
      <B24Tooltip text="Close delay (hover)" size="xs">
        <B24InputNumber v-model="closeDelay" size="xs" placeholder="closeDelay" class="w-20" />
      </B24Tooltip>
      <B24Switch v-model="arrow" size="xs" label="Arrow" />
      <B24Switch v-model="modal" size="xs" label="Modal" />

      <B24Tooltip text="Entity popover mode" size="xs">
        <B24Select v-model="entityMode" placeholder="entity mode" size="xs" :items="[...entityModes]" />
      </B24Tooltip>
    </template>

    <B24Popover
      :arrow="arrow"
      :modal="modal"
      :content="{
        align,
        side,
        sideOffset
      }"
      :b24ui="{ content: 'p-[10px]' }"
    >
      <B24Button label="Click me" />

      <template #content="{ close }">
        <div class="flex items-center justify-between gap-4 mb-2xs border-b border-(--ui-color-divider-default)">
          <ProseH4 class="mb-0.5">
            Popover with long text
          </ProseH4>

          <B24Button
            color="air-tertiary-no-accent"
            :icon="Cross50Icon"
            @click="close"
          />
        </div>
        <div class="max-w-60 max-h-48 overflow-y-auto scrollbar-thin scrollbar-transparent">
          <MockContentLongText />
        </div>
      </template>
    </B24Popover>

    <B24Popover
      v-model:open="open"
      mode="hover"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :arrow="arrow"
      :modal="modal"
      :content="{
        align,
        side,
        sideOffset
      }"
      :b24ui="{ content: 'p-[10px]' }"
    >
      <B24Button label="Hover me" />

      <template #content>
        <div class="max-w-48 max-h-73">
          <MockContentUploadFile />
        </div>

        <div class="mt-lg flex flex-row gap-xs2">
          <B24Button
            rounded
            label="Send"
            color="air-primary-success"
            size="sm"
            @click="open = false"
          />
          <B24Button
            rounded
            label="Cancel"
            color="air-tertiary-no-accent"
            size="sm"
            @click="open = false"
          />
        </div>
      </template>
    </B24Popover>

    <B24Popover
      v-model:open="openCustomAnchor"
      :arrow="arrow"
      :modal="modal"
      :dismissible="false"
      :content="{
        align,
        side,
        sideOffset
      }"
      :b24ui="{ content: 'p-[10px]' }"
    >
      <template #anchor>
        <B24Input
          placeholder="Focus me"
          @focus="openCustomAnchor = true"
        />
      </template>

      <template #content>
        <div class="flex items-center justify-between gap-4 mb-2xs">
          <ProseH4 class="mb-0.5">
            Popover non-dismissible
          </ProseH4>

          <B24Button
            color="air-tertiary-no-accent"
            :icon="Cross50Icon"
            @click="openCustomAnchor = false"
          />
        </div>
        <Placeholder class="w-60 h-48" />
      </template>
    </B24Popover>

    <ProseP>
      Latest activity on the
      <EntityInfoPopover
        title="ACME Corp."
        caption="12 contacts"
        primary-action-label="Open account"
        owner-name="Sample owner"
        created-at="Oct 6, 2024 08:37"
        category="Enterprise"
        :mode="entityMode"
      >
        <B24Link is-action>
          ACME Corp.
        </B24Link>
      </EntityInfoPopover>
      account — pipeline value grew by 12% this quarter.
    </ProseP>

    <ProseP>
      Click the deal name to inspect
      <EntityInfoPopover
        title="Q3 Enterprise Renewal"
        caption="Stage: Negotiation"
        primary-action-label="Open deal"
        owner-name="Sample owner"
        created-at="Sep 18, 2024 14:02"
        category="Inbound lead"
        mode="click"
      >
        <B24Link is-action>
          Q3 Enterprise Renewal
        </B24Link>
      </EntityInfoPopover>
      before assigning it to the next sales rep.
    </ProseP>

    <B24Popover :b24ui="{ content: 'p-0 bg-transparent border-0 shadow-none' }">
      <B24Button label="Open sales widget" />

      <template #content>
        <SalesDynamicsWidget
          title="Repeat sales dynamics"
          total-line="Total deals created: 10"
          today-line="Today: 10 deals"
          range-label="Last 30 days"
          :rows="[
            { label: 'Active deals', count: 10, amount: '$46,500' },
            { label: 'Won deals', count: 1, amount: '$10,000' }
          ]"
          :highlight="{
            label: 'Conversion',
            count: '10%',
            amount: '17.7%',
            info: 'Today vs. last 30 days'
          }"
        />
      </template>
    </B24Popover>

    <B24Popover mode="hover" :b24ui="{ content: 'p-0 bg-transparent border-0 shadow-none' }">
      <B24Button label="Hover for sales summary" />

      <template #content>
        <SalesDynamicsWidget
          title="Repeat sales dynamics"
          total-line="Total deals created: 10"
          today-line="Today: 10 deals"
          range-label="Last 30 days"
          :rows="[
            { label: 'Active deals', count: 10, amount: '$46,500' },
            { label: 'Won deals', count: 1, amount: '$10,000' }
          ]"
          :highlight="{
            label: 'Conversion',
            count: '10%',
            amount: '17.7%',
            info: 'Today vs. last 30 days'
          }"
        />
      </template>
    </B24Popover>
  </PlaygroundPage>
</template>
