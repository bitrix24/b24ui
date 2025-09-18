<script setup lang="ts">
const route = useRoute()
const colorMode = useColorMode()

const name = route.params.slug?.[0]

if (route.query.theme) {
  colorMode.preference = route.query.theme === 'light' ? 'light' : 'dark'
}

// const width = computed(() => route.query.width && Number.parseInt(route.query.width as string) > 0 ? `${Number.parseInt(route.query.width as string) - 2}px` : '864px')
</script>

<template>
  <div class="example flex flex-col items-center h-screen">
    <component :is="name" v-bind="route.query" />
  </div>
</template>
