<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const route = useRoute()
const { style, link } = useTheme()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework']))

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link,
  style,
  htmlAttrs: { lang: 'en' }
})

useSeoMeta({
  titleTemplate: '%s - Bitrix24 UI',
  title: props.error.status
})

useServerSeoMeta({
  ogSiteName: 'Bitrix24 UI',
  twitterCard: 'summary_large_image'
})

const { rootNavigation } = useNavigation(navigation)

provide('navigation', rootNavigation)
</script>

<template>
  <B24App>
    <NuxtLoadingIndicator color="var(--ui-color-accent-main-primary)" :height="2" />

    <div :class="[route.path.startsWith('/docs/') && 'root']">
      <!-- <Banner /> -->

      <Header />

      <B24Error
        :error="error"
        :b24ui="{
          root: 'min-h-[calc(100vh-var(--topbar-height)-var(--topbar-height))]'
        }"
      />

      <Footer />
    </div>
  </B24App>
</template>
