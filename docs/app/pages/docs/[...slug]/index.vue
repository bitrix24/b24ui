<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { kebabCase } from 'scule'
import DesignIcon from '@bitrix24/b24icons-vue/outline/DesignIcon'
import FavoriteIcon from '@bitrix24/b24icons-vue/outline/FavoriteIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import NuxtIcon from '@bitrix24/b24icons-vue/file-type/NuxtIcon'
import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'

const route = useRoute()
const { framework } = useFrameworks()

definePageMeta({
  layout: false
})

const { data: page } = await useAsyncData(kebabCase(route.path), () => queryCollection('docs').path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// Update the framework if the page has different one
watch(page, () => {
  if (page.value?.framework && page.value?.framework !== framework.value) {
    framework.value = page.value?.framework as string
  }
}, { immediate: true })

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { findSurround } = useNavigation(navigation!)

// const breadcrumb = computed(() => findBreadcrumb(page.value?.path as string))
const surround = computed(() => findSurround(page.value?.path as string))

if (!import.meta.prerender) {
  // Redirect to the correct framework version if the page is not the current framework
  watch(framework, () => {
    if (page.value?.framework && page.value?.framework !== framework.value) {
      /**
       * @memo this path
       */
      if (route.path.endsWith(`/${page.value?.framework}/`)) {
        navigateTo(`${route.path.split('/').slice(0, -1).join('/')}/${framework.value}/`)
      } else {
        navigateTo(`/docs/guide/getting-started/`)
      }
    }
  })
}

const title = page.value?.seo?.title ? page.value.seo.title : page.value?.navigation?.title ? page.value.navigation.title : page.value?.title
const prefix = page.value?.path.includes('components/') || page.value?.path.includes('composables/') ? 'Vue ' : ''
const suffix = page.value?.path.includes('components/') ? 'Component ' : page.value?.path.includes('composables/') ? 'Composable ' : ''
const description = page.value?.seo?.description ? page.value.seo.description : page.value?.description

useSeoMeta({
  titleTemplate: `${prefix}%s ${suffix}- Bitrix24 UI ${page.value?.framework === 'vue' ? ' for Vue' : ''}`,
  title,
  ogTitle: `${prefix}${title} ${suffix}- Bitrix24 UI ${page.value?.framework === 'vue' ? ' for Vue' : ''}`,
  description,
  ogDescription: description
})

// if (route.path.startsWith('/docs/components/')) {
//   defineOgImageComponent('OgImageComponent', {
//     title: page.value.title,
//     description: page.value.description,
//     component: (route.params.slug as string[]).pop() as string
//   })
// } else {
//   defineOgImageComponent('Docs', {
//     title: page.value.title,
//     description: page.value.description,
//     headline: breadcrumb.value?.[breadcrumb.value.length - 1]?.label || 'Bitrix24 UI',
//     framework: page.value?.framework
//   })
// }

const communityLinks = computed(() => [
  {
    icon: DesignIcon,
    label: 'Edit this page',
    to: `https://github.com/bitrix24/b24ui/edit/main/docs/content/${page?.value?.stem}.md`,
    target: '_blank'
  },
  {
    icon: FavoriteIcon,
    label: 'Star on GitHub',
    to: `https://github.com/bitrix24/b24ui`,
    target: '_blank'
  }
])

const iconFromIconName = (iconName?: string) => {
  if (!iconName) {
    return undefined
  }

  switch (iconName) {
    case 'GitHubIcon': return GitHubIcon
    case 'NuxtIcon': return NuxtIcon
    case 'DemonstrationOnIcon': return DemonstrationOnIcon
  }

  return undefined
}
</script>

<template>
  <NuxtLayout name="docs">
    <template #header>
      <template v-if="page">
        <PageHeader :title="page.title">
          <template #description>
            <MDC
              v-if="page.description"
              :value="page.description"
              unwrap="p"
              :cache-key="`${kebabCase(route.path)}-description`"
            />
          </template>
          <template #head-links>
            <PageHeaderLinks />
            <B24DropdownMenu
              class="hidden sm:flex"
              :items="communityLinks"
              :content="{ side: 'bottom', align: 'end', sideOffset: 4 }"
            >
              <B24Button size="sm" :icon="MoreMIcon" color="air-secondary-accent" />
            </B24DropdownMenu>
          </template>
          <template #links>
            <B24Button
              v-for="link in page.links"
              :key="link.label"
              :target="link.to.startsWith('http') ? '_blank' : undefined"
              v-bind="link"
              :icon="iconFromIconName(link?.iconName)"
              size="md"
              :b24ui="{ leadingIcon: 'mr-[5px]' }"
            >
              <template v-if="link.avatar" #leading>
                <B24Avatar
                  v-bind="link.avatar"
                  size="2xs"
                  :alt="`${link.label}`"
                  :b24ui="{
                    root: 'mr-[5px]',
                    image: 'w-[18px] h-[12px]'
                  }"
                />
              </template>
            </B24Button>
          </template>
        </PageHeader>
      </template>
    </template>
    <template #right>
      <B24Card
        variant="outline-no-accent"
        class="lg:mt-[22px] lg:sticky lg:top-(--topbar-height) rounded-none lg:rounded-(--ui-border-radius-md) backdrop-blur-md"
        :b24ui="{ body: 'px-[22px] py-0 sm:px-[22px] sm:py-0 pt-[12px] sm:pt-[12px] lg:py-[15px]' }"
      >
        <B24ContentToc
          v-if="page?.body?.toc?.links?.length"
          :links="page.body.toc.links"
          class="p-0 lg:overflow-y-auto scrollbar-thin scrollbar-transparent lg:h-[calc(100vh-var(--topbar-height)-22px-22px)]"
        />
      </B24Card>
    </template>

    <template v-if="page">
      <ContentRenderer v-if="page.body" :value="page" />
      <B24Separator v-if="surround?.filter(Boolean).length" class="my-4" />

      <B24ContentSurround :surround="(surround as any)" />
    </template>
  </NuxtLayout>
</template>
