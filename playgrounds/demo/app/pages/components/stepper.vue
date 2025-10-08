<script setup lang="ts">
import type { StepperItem } from '@bitrix24/b24ui-nuxt'
import theme from '#build/b24ui/stepper'
import usePageMeta from './../../composables/usePageMeta'
import ExampleGrid from '../../components/ExampleGrid.vue'
import ExampleCard from '../../components/ExampleCard.vue'
import ArrowLeftLIcon from '@bitrix24/b24icons-vue/outline/ArrowLeftLIcon'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import LocationIcon from '@bitrix24/b24icons-vue/outline/LocationIcon'
import DeliveryIcon from '@bitrix24/b24icons-vue/outline/DeliveryIcon'
import PaymentTerminalIcon from '@bitrix24/b24icons-vue/outline/PaymentTerminalIcon'

usePageMeta.setPageTitle('Stepper')

const colors = Object.keys(theme.variants.color)
const sizes = Object.keys(theme.variants.size)
const orientations = Object.keys(theme.variants.orientation)

const isUseBg = ref(true)

const color = ref(theme.defaultVariants.color)
const size = ref(theme.defaultVariants.size)
const orientation = ref('horizontal' as keyof typeof theme.variants.orientation)

const items = [
  {
    slot: 'address' as const,
    title: 'Address',
    description: 'Add your address here',
    icon: LocationIcon
  },
  {
    slot: 'shipping' as const,
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: DeliveryIcon
  },
  {
    slot: 'payment' as const,
    title: 'Payment',
    description: 'Select your payment method',
    icon: PaymentTerminalIcon
  },
  {
    slot: 'checkout' as const,
    title: 'Checkout',
    description: 'Confirm your order'
  }
] satisfies StepperItem[]

const stepper = useTemplateRef('stepper')
</script>

<template>
  <ExampleGrid v-once>
    <ExampleCard title="settings" :use-bg="isUseBg">
      <B24Separator class="my-3" type="dotted" />
      <div class="mb-4 flex flex-wrap items-center justify-start gap-4">
        <B24Select v-model="color" :items="colors" placeholder="Color" />
        <B24Select v-model="size" :items="sizes" placeholder="Size" />
        <B24Select v-model="orientation" :items="orientations" placeholder="Orientation" />
      </div>
    </ExampleCard>
    <ExampleCard title="matrix" :use-bg="isUseBg" class="sm:col-span-3">
      <B24Separator class="my-3" type="dotted" />
      <div class="flex flex-col gap-10 min-h-0">
        <B24Stepper
          ref="stepper"
          :items="items"
          :color="color"
          :orientation="orientation"
          :size="size"
        >
          <template #address="{ item }">
            <Placeholder class="size-full min-h-60 min-w-60">
              {{ item.title }}
            </Placeholder>
          </template>

          <template #shipping="{ item }">
            <Placeholder class="size-full min-h-60 min-w-60">
              {{ item.title }}
            </Placeholder>
          </template>

          <template #payment="{ item }">
            <Placeholder class="size-full min-h-60 min-w-60">
              {{ item.title }}
            </Placeholder>
          </template>

          <template #checkout="{ item }">
            <Placeholder class="size-full min-h-60 min-w-60">
              {{ item.title }}
            </Placeholder>
          </template>
        </B24Stepper>

        <div class="flex gap-2 justify-between">
          <B24Button
            :disabled="!stepper?.hasPrev"
            label="Prev"
            @click="stepper?.prev()"
          >
            <template #leading>
              <ArrowLeftLIcon class="text-(--ui-btn-color) size-(--ui-btn-icon-size)" />
            </template>
          </B24Button>

          <B24Button
            :disabled="!stepper?.hasNext"
            label="Next"
            @click="stepper?.next()"
          >
            <template #trailing>
              <ArrowRightLIcon class="text-(--ui-btn-color) size-(--ui-btn-icon-size)" />
            </template>
          </B24Button>
        </div>
      </div>
    </ExampleCard>
  </ExampleGrid>
</template>
