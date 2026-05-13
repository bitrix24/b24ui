<script setup lang="ts">
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'

interface MetricRow {
  label: string
  count: string | number
  amount: string
}

interface HighlightRow {
  label: string
  count: string
  amount: string
  info?: string
}

interface Props {
  title: string
  totalLine: string
  todayLine?: string
  rangeLabel: string
  countHeader?: string
  amountHeader?: string
  rows: MetricRow[]
  highlight?: HighlightRow
  configureLabel?: string
  feedbackLabel?: string
}

withDefaults(defineProps<Props>(), {
  countHeader: 'Count',
  amountHeader: 'Amount',
  configureLabel: 'Configure',
  feedbackLabel: 'Feedback'
})

const emit = defineEmits<{
  range: []
  configure: []
  feedback: []
}>()
</script>

<template>
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
            {{ title }}
          </div>
          <div class="text-(length:--ui-font-size-md) opacity-90">
            {{ totalLine }}
          </div>
          <div v-if="todayLine" class="text-(length:--ui-font-size-md) opacity-90">
            {{ todayLine }}
          </div>
        </div>

        <B24Button
          rounded
          color="air-secondary-accent"
          :label="rangeLabel"
          :trailing-icon="RepeatIcon"
          @click="emit('range')"
        />
      </div>
    </template>

    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-[1fr_auto_auto] gap-x-6 px-3 py-1 text-(length:--ui-font-size-sm) opacity-80">
        <span />
        <span class="text-right min-w-20">{{ countHeader }}</span>
        <span class="text-right min-w-24">{{ amountHeader }}</span>
      </div>

      <div
        v-for="(row, index) in rows"
        :key="index"
        class="grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl bg-white/5"
      >
        <span class="font-(--ui-font-weight-medium)">{{ row.label }}</span>
        <span class="text-right min-w-20">{{ row.count }}</span>
        <span class="text-right min-w-24">{{ row.amount }}</span>
      </div>

      <div
        v-if="highlight"
        class="style-filled-boost grid grid-cols-[1fr_auto_auto] gap-x-6 items-center px-3 py-3 rounded-xl text-(--ui-color-design-filled-boost-content)"
      >
        <span class="font-(--ui-font-weight-medium) inline-flex items-center gap-1">
          {{ highlight.label }}
          <B24Tooltip v-if="highlight.info" :text="highlight.info">
            <Info1Icon class="size-4 opacity-80" />
          </B24Tooltip>
        </span>
        <span class="text-right min-w-20">{{ highlight.count }}</span>
        <span class="text-right min-w-24 font-(--ui-font-weight-semi-bold)">{{ highlight.amount }}</span>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center justify-between gap-4">
        <B24Button
          color="air-secondary-accent"
          :icon="SettingsIcon"
          :label="configureLabel"
          @click="emit('configure')"
        />
        <B24Button
          color="air-secondary-accent"
          :icon="FeedbackIcon"
          :label="feedbackLabel"
          @click="emit('feedback')"
        />
      </div>
    </template>
  </B24Card>
</template>
