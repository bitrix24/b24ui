<script setup lang="ts">
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import CircleCheckIcon from '@bitrix24/b24icons-vue/main/CircleCheckIcon'

const open = ref(false)

const benefits: NavigationMenuItem[] = [
  { label: 'Unlimited monitored lines', icon: CircleCheckIcon },
  { label: '90-day historical analytics', icon: CircleCheckIcon },
  { label: 'AI defect detection on camera streams', icon: CircleCheckIcon },
  { label: 'Predictive maintenance alerts', icon: CircleCheckIcon },
  { label: 'SCADA / MES webhooks', icon: CircleCheckIcon }
]
</script>

<template>
  <PlaygroundPage :b24ui="{ body: 'flex-col gap-2 max-w-100 mx-auto' }">
    <B24Button
      label="Open marketing modal"
      color="air-secondary-accent"
      @click="open = true"
    />

    <B24Modal
      v-model:open="open"
      title=""
      description=""
      :b24ui="{
        content: 'sm:max-w-3xl',
        body: 'bg-gradient-to-br from-base to-elevated p-6 md:p-8'
      }"
    >
      <template #body>
        <div class="flex flex-col md:flex-row gap-6">
          <div class="flex-1 space-y-3">
            <h2 class="text-2xl font-semibold leading-snug">
              Keep your factory floor moving — your Pro trial ends in 6 days
            </h2>

            <p class="text-description">
              Pro unlocks real-time OEE across every line, 90 days of historical
              analytics, AI defect detection on camera streams and predictive
              maintenance alerts. Teams on Pro ship 12% more units per shift on
              average.
            </p>

            <B24Link to="#" class="inline-flex">
              Compare plans
            </B24Link>
          </div>

          <div class="md:w-72 shrink-0">
            <B24Card
              variant="tinted-no-accent"
              :b24ui="{
                header: 'flex items-center justify-between gap-2',
                body: 'space-y-4'
              }"
            >
              <template #header>
                <span class="font-semibold">Production Insights · Pro</span>
                <B24Badge label="Recommended" color="air-primary" size="xs" />
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
                <B24Progress
                  :model-value="24"
                  :max="30"
                  color="air-primary"
                  size="sm"
                />
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

      <template #footer>
        <div class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between w-full gap-2">
          <B24ModalDialogClose>
            <B24Button
              label="Remind me later"
              color="air-tertiary-no-accent"
            />
          </B24ModalDialogClose>

          <B24Button
            label="Upgrade to Pro"
            color="air-primary"
            size="lg"
            :trailing-icon="ArrowRightLIcon"
          />
        </div>
      </template>
    </B24Modal>
  </PlaygroundPage>
</template>
