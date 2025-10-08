<script setup lang="ts">
import type { StepperItem } from '@bitrix24/b24ui-nuxt'
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
</script>

<template>
  <B24Stepper ref="stepper" :items="items" class="w-full">
    <template #content="{ item }">
      <Placeholder class="aspect-video">
        This is the {{ item?.title }} step.
      </Placeholder>
    </template>
  </B24Stepper>
</template>
