<script setup lang="ts">
import { kebabCase } from 'scule'
import type { ContentNavigationItem } from '@nuxt/content'
import { mapContentNavigation } from '@bitrix24/b24ui-nuxt/utils/content'
import { findPageBreadcrumb } from '@nuxt/content/utils'
import DesignIcon from '@bitrix24/b24icons-vue/outline/DesignIcon'
import FavoriteIcon from '@bitrix24/b24icons-vue/outline/FavoriteIcon'
import GitHubIcon from '@bitrix24/b24icons-vue/social/GitHubIcon'

const route = useRoute()
const { framework } = useSharedData()

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

const { data: surround } = await useAsyncData(`${kebabCase(route.path)}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description']
  }).orWhere(group => group.where('framework', '=', framework.value).where('framework', 'IS NULL'))
}, {
  watch: [framework]
})

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const breadcrumb = computed(() => mapContentNavigation(findPageBreadcrumb(navigation?.value, page.value?.path, { indexAsChild: true })).map(({ icon, ...link }) => link))

if (!import.meta.prerender) {
  // Redirect to the correct framework version if the page is not the current framework
  watch(framework, () => {
    if (page.value?.framework && page.value?.framework !== framework.value) {
      if (route.path.endsWith(`/${page.value?.framework}`)) {
        navigateTo(`${route.path.split('/').slice(0, -1).join('/')}/${framework.value}`)
      } else {
        navigateTo(`/docs/guide/getting-started`)
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

if (route.path.startsWith('/docs/components/')) {
  defineOgImageComponent('OgImageComponent', {
    title: page.value.title,
    description: page.value.description,
    component: (route.params.slug as string[]).pop() as string
  })
} else {
  defineOgImageComponent('Docs', {
    title: page.value.title,
    description: page.value.description,
    headline: breadcrumb.value?.[breadcrumb.value.length - 1]?.label || 'Bitrix24 UI',
    framework: page.value?.framework
  })
}

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
          <template #links>
            <B24Button
              v-for="link in page.links"
              :key="link.label"
              :target="link.to.startsWith('http') ? '_blank' : undefined"
              v-bind="link"
              :icon="iconFromIconName(link?.iconName)"
              size="sm"
              :b24ui="{
                leadingIcon: 'mr-[5px]'
              }"
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
            <PageHeaderLinks />
          </template>
        </PageHeader>
      </template>
    </template>
    <div v-if="page" class="flex flex-row items-start justify-between gap-[12px]">
      <div>
        <ContentRenderer v-if="page.body" :value="page" />

        <B24Separator v-if="surround?.filter(Boolean).length" />

        <B24ContentSurround :surround="(surround as any)" />
      </div>

      <div v-if="page?.body?.toc?.links?.length">
        <B24ContentToc :links="page.body.toc.links" class="z-[2]">
          <template #bottom>
            <B24Separator type="dashed" />

            <B24PageLinks title="Community" :links="communityLinks" />
          </template>
        </B24ContentToc>
      </div>
    </div>
  </NuxtLayout>
</template>
