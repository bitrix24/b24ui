<script setup lang="ts">
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

const rows = [
  { label: 'Active deals', count: 10, amount: '$46,500' },
  { label: 'Won deals', count: 1, amount: '$10,000' }
]

const highlight = {
  label: 'Conversion',
  count: '10%',
  amount: '17.7%',
  info: 'Today vs. last 30 days'
}
</script>

<template>
  <B24Modal
    title=""
    description=""
    :close="false"
    :b24ui="{
      content: 'sm:max-w-md bg-transparent shadow-none border-0',
      body: 'p-0'
    }"
  >
    <B24Button label="Open sales widget" />

    <template #body>
      <B24Card
        variant="filled-copilot"
        :b24ui="{
          root: 'edge-dark rounded-2xl bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-copilot-bg-content-3)_0%,var(--ui-color-copilot-bg-content-2)_58.65%,var(--ui-color-copilot-bg-content-1)_100%)]'
        }"
      >
        <template #header>
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <div class="text-(length:--ui-font-size-2xl)/[normal] font-(--ui-font-weight-semi-bold)">
                Repeat sales dynamics
              </div>
              <div class="text-(length:--ui-font-size-md) opacity-90">
                Total deals created: 10
              </div>
              <div class="text-(length:--ui-font-size-md) opacity-90">
                Today: 10 deals
              </div>
            </div>

            <B24Button
              rounded
              color="air-secondary-accent"
              label="Last 30 days"
              :trailing-icon="RepeatIcon"
            />
          </div>
        </template>

        <div class="flex flex-col gap-2">
          <div class="grid grid-cols-[1fr_auto_auto] gap-x-6 px-3 py-1 text-(length:--ui-font-size-sm) opacity-80">
            <span />
            <span class="text-right min-w-20">Count</span>
            <span class="text-right min-w-24">Amount</span>
          </div>

          <div
            v-for="row in rows"
            :key="row.label"
            class="grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl bg-white/5"
          >
            <span class="font-(--ui-font-weight-medium)">{{ row.label }}</span>
            <span class="text-right min-w-20">{{ row.count }}</span>
            <span class="text-right min-w-24">{{ row.amount }}</span>
          </div>

          <div class="style-filled-boost grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl text-(--ui-color-design-filled-boost-content)">
            <span class="font-(--ui-font-weight-medium) inline-flex items-center gap-1">
              {{ highlight.label }}
              <B24Tooltip :text="highlight.info">
                <Info1Icon class="size-4 opacity-80" />
              </B24Tooltip>
            </span>
            <span class="text-right min-w-20">{{ highlight.count }}</span>
            <span class="text-right min-w-24 font-(--ui-font-weight-semi-bold)">{{ highlight.amount }}</span>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center justify-between gap-4">
            <B24Button color="air-secondary-accent" :icon="SettingsIcon" label="Configure" />
            <B24Button color="air-secondary-accent" :icon="FeedbackIcon" label="Feedback" />
          </div>
        </template>
      </B24Card>
    </template>
  </B24Modal>
</template>
