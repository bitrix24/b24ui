<script setup lang="ts">
import type { NuxtError } from '#app'
import { useColorMode } from '#imports'

const props = defineProps<{
  error: NuxtError
}>()

const route = useRoute()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework']))
const { data: files } = useLazyAsyncData(
  'search',
  async () => {
    const data = await queryCollectionSearchSections('docs', {
      ignoredTags: ['style']
    })

    return data.map((file) => {
      return {
        ...file,
        id: file.id.replace(/([^/])(#.*)?$/, (_, char, hash = '') => `${char}/${hash}`)
      }
    })
  },
  {
    server: false
  }
)

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
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

const { rootNavigation, navigationByFramework } = useNavigation(navigation)

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

    <B24SidebarLayout :use-light-content="false" :class="[route.path.startsWith('/docs/') && 'root']">
      <template #navbar>
        <Header show-logo-all-time />
      </template>

      <B24Error
        :error="error"
        :class="cardColorContext"
        :b24ui="{
          root: 'mt-[22px] min-h-[calc(100vh-200px)] bg-(--ui-color-design-outline-na-bg) h-[calc(100vh-200px)] p-[12px] rounded-[24px]'
        }"
      />
      <template #content-bottom>
        <Footer />
      </template>
    </B24SidebarLayout>

    <ClientOnly>
      <LazySearch :files="files" :navigation="navigationByFramework" />
    </ClientOnly>
  </B24App>
</template>
