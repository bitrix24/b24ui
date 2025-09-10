<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageChildren } from '@nuxt/content/utils'

useHead({
  bodyAttrs: {
    // 'dark' | 'light' | 'edge-dark' | 'edge-light'
    class: `edge-dark`
  }
})

const slots = defineSlots()

const route = useRoute()

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const categories = {
  'getting-started': [{
    id: 'integrations',
    title: 'Integrations'
  }],
  'components': [{
    id: 'layout',
    title: 'Layout'
  }, {
    id: 'element',
    title: 'Element'
  }, {
    id: 'form',
    title: 'Form'
  }, {
    id: 'data',
    title: 'Data'
  }, {
    id: 'navigation',
    title: 'Navigation'
  }, {
    id: 'overlay',
    title: 'Overlay'
  }, {
    id: 'page',
    title: 'Page'
  }, {
    id: 'content',
    title: 'Content',
    framework: 'nuxt'
  }, {
    id: 'dashboard',
    title: 'Dashboard'
  }, {
    id: 'chat',
    title: 'AI Chat'
  }, {
    id: 'color-mode',
    title: 'Color Mode'
  }, {
    id: 'i18n',
    title: 'i18n'
  }]
}

function groupChildrenByCategory(items: ContentNavigationItem[], slug: string): ContentNavigationItem[] {
  const childrenGroupedByCategory = items.reduce((acc, child) => {
    if (child.category) {
      acc[child.category as string] = [...(acc[child.category as string] || []), child]
    } else {
      acc.__overview = [...(acc.__overview || []), child]
    }
    return acc
  }, {} as Record<string, ContentNavigationItem[]>)

  const groups: ContentNavigationItem[] = categories[slug as keyof typeof categories]?.map(category => ({
    title: category.title,
    path: `/docs/${slug}`,
    class: 'framework' in category ? [`${category.framework}-only`] : undefined,
    children: childrenGroupedByCategory[category.id]
  }))?.filter(group => group.children?.length) || []

  if (childrenGroupedByCategory.__overview && childrenGroupedByCategory.__overview.length > 0) {
    groups.unshift({
      title: 'Overview',
      path: `/docs/${slug}`,
      children: childrenGroupedByCategory.__overview
    })
  }

  return groups
}

const children = computed(() => {
  const slug = route.params.slug?.[0] as string
  const children = findPageChildren(navigation?.value, `/docs/${slug}`, { indexAsChild: true })?.map(child => ({ ...child, icon: undefined }))

  return groupChildrenByCategory(children, slug)
})
</script>

<template>
  <B24SidebarLayout
    :use-light-content="true"
  >
    <template #sidebar>
      <B24SidebarHeader>
        <div class="h-full flex items-center relative my-0 ps-[25px] pe-xs rtl:pe-[25px]">
          <div class="flex flex-row flex-nowrap items-center justify-start gap-[6px]">
            <LogoWithVersion />
          </div>
        </div>
      </B24SidebarHeader>
      <B24SidebarBody>
        <!-- B24NavigationMenu
          :items="links"
          orientation="vertical"
        / -->
        <B24ContentNavigation
          :key="route.path"
          :navigation="children"
          variant="link"
          highlight
          :b24ui="{ linkTrailingBadge: 'font-semibold uppercase' }"
        />
      </B24SidebarBody>
      <B24SidebarFooter>
        <B24SidebarSection>
          <ExtLinks />
        </B24SidebarSection>
      </B24SidebarFooter>
    </template>
    <template #navbar>
      <Header />
    </template>

    <template v-if="slots['header']" #content-top>
      <slot name="header" />
    </template>

    <template v-if="slots['right']" #content-right>
      <slot name="right" />
    </template>

    <slot />

    <template #content-bottom>
      <Footer />
    </template>
  </B24SidebarLayout>
</template>
