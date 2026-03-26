<script setup lang="ts">
const { isBitrixMobile, screen } = useDevice()
</script>

<template>
  <div>
    <p v-if="isBitrixMobile">
      📱 You are using the Bitrix24 mobile app on a small screen.
    </p>
    <p v-else-if="screen.isMobile">
      👋 Regular web browser on a small screen.
    </p>
    <p v-else-if="!isBitrixMobile && (!screen.isMobile)">
      💻 Regular web browser on a desktop.
    </p>
    <p v-else>
      🌐 Other combination.
    </p>
  </div>
</template>
