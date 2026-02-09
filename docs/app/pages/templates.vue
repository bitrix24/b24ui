<script setup lang="ts">
import { useColorMode } from '#imports'

const { data: page } = await useAsyncData('templates', () => queryCollection('templates').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  titleTemplate: '%s - Bitrix24 UI',
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} - Bitrix24 UI`,
  ogDescription: page.value.description
})

// defineOgImageComponent('Docs')

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
  <B24SidebarLayout
    :use-light-content="false"
  >
    <template #navbar>
      <Header show-logo-all-time />
    </template>

    <B24Card
      v-if="page"
      as="main"
      class="mt-[22px]"
      :class="cardColorContext"
    >
      <div class="min-h-[300px] h-auto lg:h-[calc(100vh-200px)] lg:pt-[12px] flex flex-cols items-center justify-between">
        <B24Alert color="air-primary-warning" title="We are still updating this page" description="Some data may be missing here — we will complete it shortly." />
      </div>
    </B24Card>

    <template #content-bottom>
      <Footer />
    </template>
  </B24SidebarLayout>
</template>
