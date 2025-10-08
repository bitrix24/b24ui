<script setup lang="ts">
import type { StepperItem } from '@bitrix24/b24ui-nuxt'
import ArrowLeftLIcon from '@bitrix24/b24icons-vue/outline/ArrowLeftLIcon'
import ArrowRightLIcon from '@bitrix24/b24icons-vue/outline/ArrowRightLIcon'
import LocationIcon from '@bitrix24/b24icons-vue/outline/LocationIcon'
import DeliveryIcon from '@bitrix24/b24icons-vue/outline/DeliveryIcon'

const items: StepperItem[] = [
  {
    title: 'Address',
    description: 'Add your address here',
    icon: LocationIcon
  }, {
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: DeliveryIcon
  }, {
    title: 'Checkout',
    description: 'Confirm your order'
  }
]

const stepper = useTemplateRef('stepper')
</script>

<template>
  <div class="w-full">
    <B24Stepper ref="stepper" :items="items">
      <template #content="{ item }">
        <Placeholder class="h-[200px]">
          {{ item.title }}
        </Placeholder>
      </template>
    </B24Stepper>

    <div class="flex gap-2 justify-between mt-4">
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
</template>
