<script setup lang="ts">
import type { StepperItem } from '@bitrix24/b24ui-nuxt'
import { onMounted, ref } from 'vue'
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

const active = ref(0)

// Note: This is for demonstration purposes only. Don't do this at home.
onMounted(() => {
  setInterval(() => {
    active.value = (active.value + 1) % items.length
  }, 2000)
})
</script>

<template>
  <B24Stepper v-model="active" :items="items" class="w-full">
    <template #content="{ item }">
      <Placeholder class="aspect-video">
        This is the {{ item?.title }} step.
      </Placeholder>
    </template>
  </B24Stepper>
</template>
