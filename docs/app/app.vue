<script setup lang="ts">
import { withTrailingSlash } from 'ufo'

const route = useRoute()
const appConfig = useAppConfig()
const config = useRuntimeConfig()

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs', ['framework', 'category', 'description', 'badge']))
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
  link: [
    { rel: 'canonical', href: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(route.path)}` }
  ],
  style: [],
  htmlAttrs: { lang: 'en', class: '' }
})

useServerSeoMeta({
  ogSiteName: 'Bitrix24 UI',
  twitterCard: 'summary_large_image'
})

const { rootNavigation, navigationByFramework } = useNavigation(navigation)
provide('navigation', rootNavigation)

const colorMode = useColorMode()

function toggleMode() {
  colorMode.preference = !(colorMode.value === 'dark') ? 'dark' : 'light'
}

defineShortcuts({
  shift_D: () => {
    toggleMode()
  }
})
</script>

<template>
  <B24App :toaster="appConfig.toaster">
    <NuxtLoadingIndicator color="var(--ui-color-design-filled-warning-bg)" :height="3" />
    <div :class="[route.path.startsWith('/docs/') && 'root']">
      <!-- template v-if="!route.path.startsWith('/examples')">
        <Banner />
      </template -->

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <template v-if="!route.path.startsWith('/examples')">
        <ClientOnly>
          <Search :files="files" :navigation="navigationByFramework" />
        </ClientOnly>
      </template>
    </div>
  </B24App>
</template>
