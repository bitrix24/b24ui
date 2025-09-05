<script setup lang="ts">
import VPLayout from 'vitepress/dist/client/theme-default/Layout.vue'
import PromoExample from '../../../../examples/index/Promo_v1.vue'
</script>

<template>
  <B24App>
    <VPLayout>
      <template #home-hero-image>
        <PromoExample />
      </template>
    </VPLayout>
  </B24App>
</template>
