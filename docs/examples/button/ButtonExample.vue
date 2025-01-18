<script setup lang="ts">
async function onClick() {
  return new Promise<void>(res => setTimeout(res, 1000))
}
</script>

<template>
  <span class="text-red-500">Button</span>
	https://github.com/vuejs/vitepress/pull/239/commits/d60e3bc18b95df51dac61b6d440b673d423fa094
  <B24Button type="button" loading-auto color="success" @click="onClick">
    Button
  </B24Button>
</template>
