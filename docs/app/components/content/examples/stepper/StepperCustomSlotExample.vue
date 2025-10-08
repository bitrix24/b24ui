<script setup lang="ts">
import type { StepperItem } from '@bitrix24/b24ui-nuxt'
import LocationIcon from '@bitrix24/b24icons-vue/outline/LocationIcon'
import DeliveryIcon from '@bitrix24/b24icons-vue/outline/DeliveryIcon'

const items: StepperItem[] = [
  {
    title: 'Address',
    description: 'Add your address here',
    icon: LocationIcon,
    slot: 'address'
  }, {
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: DeliveryIcon,
    slot: 'shipping'
  }, {
    title: 'Checkout',
    description: 'Confirm your order',
    slot: 'checkout'
  }
]
</script>

<template>
  <B24Stepper :items="items" class="w-full">
    <template #address>
      <Placeholder class="h-[200px]">
        Address
      </Placeholder>
    </template>

    <template #shipping>
      <Placeholder class="h-[200px]">
        Shipping
      </Placeholder>
    </template>

    <template #checkout>
      <Placeholder class="h-[200px]">
        Checkout
      </Placeholder>
    </template>
  </B24Stepper>
</template>
