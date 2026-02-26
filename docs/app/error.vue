<script setup lang="ts">
import type { NuxtError } from '#app'
import { useColorMode } from '#imports'

const props = defineProps<{
  error: NuxtError
}>()

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework']))

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [],
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

<template>
  <B24App>
    <NuxtLoadingIndicator color="var(--ui-color-accent-main-primary)" :height="2" />

    <div :class="[route.path.startsWith('/docs/') && 'root']">
      <Header />

      <B24Error
        :error="error"
        :class="cardColorContext"
      />

      <Footer />
    </div>
  </B24App>
</template>
