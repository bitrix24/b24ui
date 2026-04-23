<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { withTrailingSlash, joinURL } from 'ufo' // withoutTrailingSlash
import { kebabCase } from 'scule'
import { useColorMode } from '#b24ui/composables/color-mode/useColorMode'
import DesignIcon from '@bitrix24/b24icons-vue/outline/DesignIcon'
import FavoriteIcon from '@bitrix24/b24icons-vue/outline/FavoriteIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'
import MoreMIcon from '@bitrix24/b24icons-vue/outline/MoreMIcon'
import NuxtIcon from '@bitrix24/b24icons-vue/file-type/NuxtIcon'
import DemonstrationOnIcon from '@bitrix24/b24icons-vue/outline/DemonstrationOnIcon'
import Bitrix24Icon from '@bitrix24/b24icons-vue/common-service/Bitrix24Icon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'

// const isDev = import.meta.dev

const route = useRoute()
const { framework } = useFrameworks()
const pageUrl = route.path
const config = useRuntimeConfig()
const appConfig = useAppConfig()

definePageMeta({
  layout: 'docs'
})

// @memo this for NUXT.UI.docs
const { open, messages } = useChat()
const isOpen = computed(() => open.value)
// @memo this for docus
const { isEnabled } = useAssistant()
// const { isEnabled, open, isOpen } = useAssistant()

const { data: page } = await useAsyncData(kebabCase(pageUrl), () => queryCollection('docs').path(pageUrl).first())
if (!page.value) {
  throw createError({ status: 404, statusText: 'Page not found', fatal: true })
}

// Update the framework if the page has different one
watch(page, () => {
  if (page.value?.framework && page.value?.framework !== framework.value) {
    framework.value = page.value?.framework as string
  }
}, { immediate: true })

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { findSurround, findBreadcrumb } = useNavigation(navigation!)

const breadcrumb = computed(() => findBreadcrumb(page.value?.path as string))
const surround = computed(() => findSurround(page.value?.path as string))

if (!import.meta.prerender) {
  // Redirect to the correct framework version if the page is not the current framework
  watch(framework, () => {
    const route = useRoute()
    const pagePath = withTrailingSlash(page.value?.path)
    if (pagePath === route.path && page.value?.framework && page.value?.framework !== framework.value) {
      /** @memo this path */
      if (route.path.endsWith(`/${page.value?.framework}/`)) {
        navigateTo(`${route.path.split('/').slice(0, -2).join('/')}/${framework.value}/`)
      } else {
        navigateTo(`/docs/getting-started/`)
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

// if (pageUrl.startsWith('/docs/components/')) {
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

const today = new Date().toISOString().split('T')[0]

// Pre-render the markdown path + add it to alternate links
const path = computed(() => pageUrl.replace(/\/$/, ''))
prerenderRoutes([joinURL(`${config.public.baseUrl}/raw`, `${path.value}.md`)])
useHead({
  link: [
    {
      rel: 'alternate',
      // @memo we use redirect in `docs/modules/md-rewrite.ts`
      // href: joinURL(config.public.siteUrl, `${config.public.baseUrl}/raw`, `${path.value}.md`),
      // @memo But at GitHub Pages we use /raw
      // href: joinURL(config.public.siteUrl, `${config.public.baseUrl}`, `${path.value}.md`),
      href: joinURL(config.public.siteUrl, `${config.public.baseUrl}/raw`, `${path.value}.md`),
      type: 'text/markdown'
    }
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'dateModified': today,
      'proficiencyLevel': 'Beginner',
      'dependencies': 'Vue 3, Nuxt (optional)',
      'headline': `${prefix}${title} ${suffix}`.trim(),
      'description': description,
      'url': joinURL(config.public.siteUrl, config.public.baseUrl, path.value + '/'),
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': joinURL(config.public.siteUrl, config.public.baseUrl, path.value + '/')
      },
      'breadcrumb': {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': {
              '@id': `${config.public.siteUrl}${config.public.baseUrl}/`
            }
          },
          ...(breadcrumb.value?.map((item, index) => ({
            '@type': 'ListItem',
            'position': index + 2,
            'name': item.label,
            'item': {
              '@id': item.to ? joinURL(config.public.siteUrl, config.public.baseUrl, String(item.to) + '/') : undefined
            }
          })) || []),
          {
            '@type': 'ListItem',
            'position': (breadcrumb.value?.length || 0) + 2,
            'name': `${prefix}${title} ${suffix}`.trim(),
            'item': {
              '@id': joinURL(config.public.siteUrl, config.public.baseUrl, path.value + '/')
            }
          }
        ]
      },
      'author': { '@type': 'Organization', 'name': 'Bitrix24' },
      'publisher': {
        '@type': 'Organization',
        'name': 'Bitrix24',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://bitrix24.github.io/b24ui/avatar/b24-logo.jpg',
          'width': 460,
          'height': 460
        }
      }
    }).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
  }]
})

const communityLinks = computed(() => [
  {
    icon: DesignIcon,
    label: 'Edit this page',
    to: `${config.public.gitUrl}/edit/main/docs/content/${page?.value?.stem}.md`,
    target: '_blank'
  },
  {
    icon: FavoriteIcon,
    label: 'Star on GitHub',
    to: config.public.gitUrl,
    target: '_blank'
  }
])

const iconFromIconName = (iconName?: string) => {
  if (!iconName) {
    return undefined
  }

  switch (iconName) {
    case 'Bitrix24Icon': return Bitrix24Icon
    case 'GitHubIcon': return GitHubIcon
    case 'NuxtIcon': return NuxtIcon
    case 'DemonstrationOnIcon': return DemonstrationOnIcon
  }

  return undefined
}

const explainIcon = computed(() => appConfig.bxAssistant?.icons?.explain || AiStarsIcon)

const showExplainWithAi = computed(() => {
  return isEnabled.value && appConfig.bxAssistant?.explainWithAi !== false
})

const colorMode = useColorMode()
const isDark = computed(() => {
  return colorMode.value === 'dark'
})
const isMounted = ref(false)
const cardColorContext = computed(() => {
  if (import.meta.server || !isMounted.value) {
    return 'light'
  }
  return isDark.value ? 'dark' : 'light'
})

onMounted(() => {
  isMounted.value = true
})

// @todo fix this
// @see docs/app/components/PageHeaderLinks.vue:16
// const aiPrompt = computed(() => `I'm looking at this Bitrix24 UI documentation: ${page.value?.path}\nHelp me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`)
const aiPrompt = ref('Read this documentation page and summarize it. I want to ask questions about it.')

function makeExplain() {
  // @memo this for NUXT.UI.docs
  messages.value = [
    ...messages.value,
    {
      id: String(Date.now()),
      role: 'user',
      parts: [{ type: 'text', text: aiPrompt.value }]
    }
  ]
  open.value = true

  // @memo this for docus
  // openAIChat(aiPrompt.value, true)
}
</script>

<template>
  <B24Page
    v-if="page"
    :b24ui="{
      root: 'lg:gap-2.5 lg:py-3',
      center: `flex flex-col lg:gap-4 ${open ? 'lg:col-span-10' : ''}`,
      right: `order-first lg:order-last lg:top-[0px] ${open ? 'lg:hidden' : 'lg:col-span-2'}`
    }"
  >
    <PageHeader>
      <template #title>
        {{ page.title }}

        <B24Badge
          v-if="page.navigation?.badge"
          :label="page.navigation?.badge"
          size="lg"
          class="align-middle"
        />
      </template>

      <template #description>
        <MDC
          v-if="page.description"
          :value="page.description"
          unwrap="p"
          :cache-key="`${kebabCase(pageUrl)}-description`"
        />
      </template>
      <template #head-links>
        <B24Button
          v-if="showExplainWithAi"
          :icon="explainIcon"
          label="Explain with AI"
          color="air-selection"
          size="sm"
          @click="makeExplain"
        />

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
          :target="link.to?.startsWith('http') ? '_blank' : undefined"
          v-bind="link"
          :icon="iconFromIconName(link?.iconName)"
          size="md"
          :b24ui="{ baseLine: 'gap-1.5' }"
        >
          <template v-if="link.avatar" #leading>
            <B24Avatar v-bind="link.avatar" loading="lazy" size="2xs" :alt="`${link.label} avatar`" :b24ui="{ image: 'w-4.5 h-3' }" />
          </template>
        </B24Button>
      </template>
    </PageHeader>

    <B24PageBody class="mt-0">
      <B24Card
        v-if="page"
        as="main"
        :class="cardColorContext"
        :b24ui="{
          root: 'rounded-none lg:rounded-(--ui-border-radius-md)',
          body: 'p-3'
        }"
      >
        <ContentRenderer v-if="page.body" :value="page" />

        <B24Separator v-if="surround?.filter(Boolean).length" class="my-4" />

        <B24ContentSurround :surround="(surround as any)" />
      </B24Card>
    </B24PageBody>

    <template v-if="page?.body?.toc?.links?.length && !isOpen" #right>
      <B24ContentToc
        :links="page.body.toc.links"
        class="sticky top-(--b24ui-header-height) px-3 py-3 pb-0 lg:p-4 lg:top-(--b24ui-header-height) scrollbar-thin scrollbar-transparent bg-(--ui-color-accent-soft-element-violet)/60 dark:bg-(--ui-color-copilot-bg-content-3)/40 lg:bg-transparent dark:lg:bg-transparent backdrop-blur-md lg:ms-0 overflow-y-auto max-h-[calc(100vh-var(--b24ui-header-height))] lg:col-span-2 order-first lg:order-last z-2"
      />
    </template>
  </B24Page>
</template>
