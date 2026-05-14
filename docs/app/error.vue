<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const route = useRoute()
const { style, link } = useTheme()

const { data: navigation } = await useFetch('/api/navigation.json')

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link,
  style
})

useSeoMeta({
  titleTemplate: '%s - Bitrix24 UI',
  title: props.error.status
})

if (import.meta.server) {
  useSeoMeta({
    ogSiteName: 'Bitrix24 UI',
    twitterCard: 'summary_large_image'
  })
}
const { rootNavigation } = useNavigation(navigation!)

provide('navigation', rootNavigation)
</script>

<template>
  <B24App>
    <NuxtLoadingIndicator color="var(--ui-color-accent-main-primary)" :height="2" />

    <div class="flex">
      <div class="flex-1 min-w-0" :class="[route.path.startsWith('/docs/') && 'root']">
        <!-- <Banner /> -->

        <Header />

        <B24Error :error="error" :b24ui="{ root: 'min-h-[calc(100vh-var(--topbar-height)-var(--topbar-height))]' }" />

        <Footer />
      </div>
    </div>
  </B24App>
</template>
