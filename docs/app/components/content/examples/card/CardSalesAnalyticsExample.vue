<script setup lang="ts">
import RepeatIcon from '@bitrix24/b24icons-vue/outline/RepeatIcon'
import SettingsIcon from '@bitrix24/b24icons-vue/outline/SettingsIcon'
import FeedbackIcon from '@bitrix24/b24icons-vue/outline/FeedbackIcon'
import Info1Icon from '@bitrix24/b24icons-vue/main/Info1Icon'
</script>

<template>
  <B24Card
    :b24ui="{
      root: 'w-full sm:max-w-[640px] mx-auto bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-design-filled-boost-bg-gradient-1)_0%,var(--ui-color-design-filled-boost-bg-gradient-2)_58.65%,var(--ui-color-design-filled-boost-bg-gradient-3)_100%)] border-0',
      header: 'flex items-start justify-between gap-3 p-6 pb-3',
      body: 'px-6 space-y-2',
      footer: 'flex items-center justify-between gap-3 p-6 pt-4 border-0'
    }"
  >
    <template #header>
      <div class="flex-1 text-white">
        <h3 class="text-xl font-semibold leading-snug">
          Repeat sales dynamics
        </h3>
        <p class="text-sm text-white/80 mt-1">
          10 deals created in total
        </p>
        <p class="text-sm text-white/80">
          10 deals today
        </p>
      </div>
      <B24Button
        label="Last 30 days"
        color="air-secondary-no-accent"
        size="sm"
        :trailing-icon="RepeatIcon"
      />
    </template>

    <div class="grid grid-cols-[1fr_5rem_7rem] gap-x-6 px-4 text-xs text-white/70">
      <div />
      <div class="text-end">
        Count
      </div>
      <div class="text-end">
        Amount
      </div>
    </div>

    <div class="grid grid-cols-[1fr_5rem_7rem] items-center gap-x-6 px-4 py-3 rounded-lg bg-white/10 text-white">
      <div>Deals in progress</div>
      <div class="text-end">
        10
      </div>
      <div class="text-end">
        $46,500
      </div>
    </div>

    <div class="grid grid-cols-[1fr_5rem_7rem] items-center gap-x-6 px-4 py-3 rounded-lg bg-white/10 text-white">
      <div>Won deals</div>
      <div class="text-end">
        1
      </div>
      <div class="text-end">
        $10,000
      </div>
    </div>

    <div class="grid grid-cols-[1fr_5rem_7rem] items-center gap-x-6 px-4 py-3 rounded-lg bg-white/20 text-white">
      <div class="flex items-center gap-1.5">
        <span>Conversion</span>
        <B24Tooltip text="Won deals divided by total deals">
          <Info1Icon class="size-4 opacity-70" />
        </B24Tooltip>
      </div>
      <div class="text-end">
        10%
      </div>
      <div class="text-end">
        17.7%
      </div>
    </div>

    <template #footer>
      <B24Button
        label="Configure"
        color="air-tertiary-no-accent"
        size="sm"
        :icon="SettingsIcon"
        class="text-white"
      />
      <B24Button
        label="Feedback"
        color="air-tertiary-no-accent"
        size="sm"
        :icon="FeedbackIcon"
        class="text-white"
      />
    </template>
  </B24Card>
</template>
