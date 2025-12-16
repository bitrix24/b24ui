<script setup lang="ts">
import PlayLIcon from '@bitrix24/b24icons-vue/outline/PlayLIcon'
/**
 * @see https://github.com/nuxt-modules/mcp-toolkit/blob/main/apps/docs/app/components/AppHeaderCTA.vue
 */
const route = useRoute()
</script>

<template>
  <div class="hidden lg:block">
    <B24Button
      v-if="route.path === '/'"
      to="/docs/getting-started/installation/"
      label="Get Started"
      color="air-tertiary-no-accent"
      :icon="PlayLIcon"
      size="sm"
    />
    <AiChat v-else />
  </div>
</template>
