<script setup lang="ts">
import type { NuxtError } from '#app'

useHead({
  bodyAttrs: {
    // 'dark' | 'light' | 'edge-dark' | 'edge-light'
    class: `edge-dark`
  }
})

const props = defineProps<{
  error: NuxtError
}>()

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework']))

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Bitrix24 UI',
  title: String(props.error.statusCode)
})

useServerSeoMeta({
  ogSiteName: 'Bitrix24 UI',
  twitterCard: 'summary_large_image'
})

const { rootNavigation } = useNavigation(navigation)
// const links = useSearch()

provide('navigation', rootNavigation)
</script>

<template>
  <B24App>
    <NuxtLoadingIndicator color="var(--ui-color-accent-main-primary)" :height="2" />

    <B24SidebarLayout :use-light-content="false" :class="[route.path.startsWith('/docs/') && 'root']">
      <template #navbar>
        <Header show-logo-all-time />
      </template>

      <B24Error
        :error="error"
        :b24ui="{
          root: 'mt-[22px] light min-h-[calc(100vh-200px)] bg-(--ui-color-design-outline-na-bg) h-[calc(100vh-200px)] p-[12px] rounded-[24px]'
        }"
      />
      <template #content-bottom>
        <Footer />
      </template>
    </B24SidebarLayout>
  </B24App>
</template>
