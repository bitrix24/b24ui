<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { withoutTrailingSlash } from 'ufo'
import { sleepAction } from '~/utils/sleep'

const route = useRoute()
const appConfig = useAppConfig()

// const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework', 'category', 'description', 'badge']))
// const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
//   server: false
// })
// const searchLinks = useSearchLinks()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'canonical', href: `https://bitrix24.github.io/b24ui${withoutTrailingSlash(route.path)}` }
  ],
  style: [],
  htmlAttrs: {
    lang: 'en'
  }
  // bodyAttrs: {
  //   class: `edge-dark`
  // }
})

useServerSeoMeta({
  ogSiteName: 'Bitrix24 UI',
  twitterCard: 'summary_large_image'
})

// // const { frameworks } = useFrameworks()
// const { rootNavigation } = useNavigation(navigation)
// // const { links } = useSearch()
//
// provide('navigation', rootNavigation)

const pageStore = usePageStore()
const navigationData = ref<ContentNavigationItem[]>([])
const isLoading = ref(true)
onMounted(async () => {
  // const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework', 'category', 'description', 'badge']))
  // const { rootNavigation: rootNavigationData } = useNavigation(navigation)
  navigationData.value = await queryCollectionNavigation('docs', ['framework', 'category', 'description', 'badge'])
  const { rootNavigation: rootNavigationData } = useNavigation(navigationData)
  pageStore.navigation = rootNavigationData.value
  await sleepAction(600)
  // await sleepAction(10006000)
  isLoading.value = false
})
</script>

<template>
  <B24App :toaster="appConfig.toaster">
    <NuxtLoadingIndicator color="var(--ui-color-design-filled-warning-bg)" :height="3" />
    <B24Card
      v-if="isLoading"
      variant="filled-no-accent"
      :b24ui="{
        root: 'rounded-none'
      }"
    >
      <template #header>
        <div class="flex flex-row items-center justify-between gap-2 ">
          <B24Skeleton accent="less" class="h-8 w-1/6 rounded" />
          <B24Skeleton accent="less" class="h-8 w-4/6 rounded" />
        </div>
      </template>

      <div class="flex flex-row items-start justify-between gap-2 ">
        <B24Skeleton accent="less" class="h-[calc(100vh-63px-32px)] w-0 sm:w-1/6 rounded" />
        <div class="w-full sm:w-4/6">
          <div class="flex flex-row items-center justify-between gap-[8px] mb-2">
            <B24Skeleton accent="less" class="h-[52px] w-full rounded" />
          </div>
          <div class="flex flex-row items-center justify-between gap-2 ">
            <B24Skeleton accent="less" class="h-[calc(100vh-63px-32px-52px-8px)] w-full rounded" />
          </div>
        </div>
        <div class="w-0 sm:w-1/6">
          <B24Skeleton accent="less" class="h-[calc(100vh-63px-32px)] w-full rounded" />
        </div>
      </div>
    </B24Card>
    <div v-show="!isLoading" :class="[route.path.startsWith('/docs/') && 'root']">
      <template v-if="!route.path.startsWith('/examples')">
        <Banner />
      </template>

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </B24App>
</template>
