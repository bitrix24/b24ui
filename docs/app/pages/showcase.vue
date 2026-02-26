<script setup lang="ts">
import { useColorMode } from '#imports'

const { data: page } = await useAsyncData('showcase', () => queryCollection('showcase').first())
if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '%s - Bitrix24 UI',
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Bitrix24 UI`,
  ogDescription: page.value.description
})

const colorMode = useColorMode()
const isDark = computed(() => {
  return colorMode.value === 'dark'
})
const isMounted = ref(false)
const cardColorContext = computed(() => {
  if (import.meta.server || !isMounted.value) {
    return 'edge-dark'
  }
  return isDark.value ? 'dark' : 'edge-dark'
})

onMounted(() => {
  isMounted.value = true
})
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <B24DashboardPanel
    id="showcase"
    :b24ui="{
      body: 'items-stretch justify-between scrollbar-transparent'
    }"
  >
    <template #header>
      <Header />
    </template>

    <template #body>
      <B24Card
        v-if="page"
        as="main"
        class="min-h-[calc(100%-100px)]"
        :class="cardColorContext"
        :b24ui="{
          body: 'min-h-[300px] h-auto lg:pt-[12px] flex flex-col items-center justify-between'
        }"
      >
        <B24Alert
          color="air-primary-warning"
          title="We are still updating this page"
          description="Some data may be missing here — we will complete it shortly."
        />
      </B24Card>

      <Footer />
    </template>
  </B24DashboardPanel>
</template>
