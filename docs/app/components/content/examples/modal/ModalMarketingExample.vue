<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/main/CircleCheckIcon'
import CrossMIcon from '@bitrix24/b24icons-vue/outline/CrossMIcon'

const open = ref(false)

const benefits: NavigationMenuItem[] = [
  { label: 'Unlimited monitored lines', icon: CircleCheckIcon },
  { label: 'AI defect detection on camera streams', icon: CircleCheckIcon }
]
</script>

<template>
  <B24Modal
    v-model:open="open"
    title=""
    description=""
    :close="false"
    scrollable
    :b24ui="{
      content: 'sm:max-w-[788px] bg-[radial-gradient(110.42%_110.42%_at_-10.42%_31.25%,var(--ui-color-design-filled-boost-bg-gradient-1)_0%,var(--ui-color-design-filled-boost-bg-gradient-2)_58.65%,var(--ui-color-design-filled-boost-bg-gradient-3)_100%)]',
      body: 'relative p-6 md:p-8'
    }"
  >
    <B24Button label="Open marketing modal" color="air-secondary-accent" />

    <template #body>
      <B24ModalDialogClose>
        <B24Button
          color="air-tertiary-no-accent"
          size="md"
          :icon="CrossMIcon"
          aria-label="Close"
          class="absolute inset-e-3 [--ui-btn-height:24px]"
        />
      </B24ModalDialogClose>

      <div class="flex flex-col md:flex-row gap-6 min-h-full">
        <div class="flex-1 flex flex-col gap-3 text-white">
          <h2 class="text-2xl font-semibold leading-snug">
            Keep your factory floor moving — your Pro trial ends in 6 days
          </h2>
          <p class="text-white/85">
            Pro unlocks real-time OEE across every line, 90 days of historical
            analytics, AI defect detection on camera streams and predictive
            maintenance alerts. Teams on Pro ship 12% more units per shift on
            average.
          </p>
          <B24Link to="#" class="inline-flex text-white underline">
            Compare plans
          </B24Link>

          <div class="flex flex-wrap items-center gap-2 mt-auto pt-4">
            <B24Button
              label="Upgrade to Pro"
              color="air-primary"
              size="lg"
              :trailing-icon="ArrowRightLIcon"
            />
            <B24ModalDialogClose>
              <B24Button label="Remind me later" color="air-tertiary" />
            </B24ModalDialogClose>
          </div>
        </div>

        <div class="md:w-80 shrink-0">
          <B24Card
            variant="tinted-no-accent"
            :b24ui="{
              header: 'flex items-center justify-between gap-2',
              body: 'space-y-4'
            }"
          >
            <template #header>
              <span class="font-semibold whitespace-nowrap">Production Insights · Pro</span>
              <B24Badge label="Recommended" color="air-primary" size="xs" class="shrink-0" />
            </template>

            <div>
              <div class="text-3xl font-semibold leading-none">
                +12%
              </div>
              <div class="text-sm text-description mt-1">
                average throughput uplift after upgrade
              </div>
            </div>

            <div class="space-y-1">
              <B24Progress :model-value="24" :max="30" color="air-primary" size="sm" />
              <div class="text-xs text-description">
                Trial used — 24 of 30 days
              </div>
            </div>

            <B24NavigationMenu
              orientation="vertical"
              :items="benefits"
              :b24ui="{ link: 'px-2 py-1.5', linkLeadingIcon: 'text-primary' }"
            />
          </B24Card>
        </div>
      </div>
    </template>
  </B24Modal>
</template>
