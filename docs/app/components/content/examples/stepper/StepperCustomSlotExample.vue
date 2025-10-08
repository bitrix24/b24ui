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
  <B24Stepper :items="items" class="w-full">
    <template #address>
      <Placeholder class="aspect-video">
        Address
      </Placeholder>
    </template>

    <template #shipping>
      <Placeholder class="aspect-video">
        Shipping
      </Placeholder>
    </template>

    <template #checkout>
      <Placeholder class="aspect-video">
        Checkout
      </Placeholder>
    </template>
  </B24Stepper>
</template>
