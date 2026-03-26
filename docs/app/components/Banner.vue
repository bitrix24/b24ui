<script setup lang="ts">
import MobileSelectedIcon from '@bitrix24/b24icons-vue/outline/MobileSelectedIcon'
</script>

<template>
  <B24Banner
    id="use-device-banner"
    title="useDevice: tailor content to Mobile, Desktop, or Web."
    to="/docs/composables/use-device/"
    :icon="MobileSelectedIcon"
    close
    color="air-primary"
    class="light"
  />
</template>
