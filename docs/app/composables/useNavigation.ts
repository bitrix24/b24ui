import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import { findPageChildren, findPageBreadcrumb } from '@nuxt/content/utils'
import { mapContentNavigation } from '@bitrix24/b24ui-nuxt/utils/content'
import { withTrailingSlash } from 'ufo' // withoutTrailingSlash

const categories = {
  components: [
    {
      id: 'layout',
      title: 'Layout'
    },
    {
      id: 'element',
      title: 'Element'
    },
    {
      id: 'form',
      title: 'Form'
    },
    {
      id: 'data',
      title: 'Data'
    },
    {
      id: 'navigation',
      title: 'Navigation'
    },
    {
      id: 'overlay',
      title: 'Overlay'
    },
    {
      id: 'page',
      title: 'Page'
    },
    {
      id: 'content',
      title: 'Content',
      framework: 'nuxt'
    },
    {
      id: 'dashboard',
      title: 'Dashboard'
    },
    {
      id: 'chat',
      title: 'AI Chat'
    },
    {
      id: 'color-mode',
      title: 'Color Mode'
    },
    {
      id: 'i18n',
      title: 'i18n'
    }],
  typography: [
    {
      id: 'components',
      title: 'Components'
    }
  ]
}

function groupChildrenByCategory(items: ContentNavigationItem[], slug: string): ContentNavigationItem[] {
  if (!items.length) {
    return []
  }

  const groups: ContentNavigationItem[] = []

  const categorized: Record<string, ContentNavigationItem[]> = {}
  const uncategorized: ContentNavigationItem[] = []

  // Remove icons while grouping
  for (const item of items) {
    item.path = withTrailingSlash(item.path)
    if (item.category) {
      categorized[item.category as string] = categorized[item.category as string] || []
      categorized[item.category as string]?.push(item)
    } else {
      uncategorized.push(item)
    }
  }

  if (uncategorized.length) {
    const withChildren = uncategorized.filter(item => item.children?.length)
      ?.map(item => ({ ...item, children: item.children?.map(child => ({ ...child, icon: undefined })) }))
    const withoutChildren = uncategorized.filter(item => !item.children?.length)

    if (withoutChildren.length) {
      groups.push({
        title: 'Overview',
        type: 'trigger' as const,
        /**
         * @memo this path
         */
        path: `/docs/${slug}/`,
        children: withoutChildren?.map(item => ({ ...item, icon: undefined }))
      })
    }

    groups.push(...withChildren)
  }

  for (const category of categories[slug as keyof typeof categories] || []) {
    if (categorized[category.id]?.length) {
      groups.push({
        title: category.title,
        type: 'trigger' as const,
        /**
         * @memo this path
         */
        path: `/docs/${slug}/`,
        class: 'framework' in category ? [`${category.framework}-only`] : undefined,
        children: categorized[category.id]
      })
    }
  }

  return groups
}

function resolveNavigationIcon(item: ContentNavigationItem) {
  return item
  // let icon = item.icon
  // if (item.path.startsWith('/docs/components')) {
  //   icon = 'i-lucide-square-code'
  // }
  // if (item.path.startsWith('/docs/composables')) {
  //   icon = 'i-lucide-square-function'
  // }
  // if (item.path.startsWith('/docs/typography')) {
  //   icon = 'i-lucide-square-pilcrow'
  // }

  // return {
  //   ...item,
  //   icon
  // }
}

function filterChildrenByFramework(item: ContentNavigationItem, framework: string): ContentNavigationItem {
  const filteredChildren = item.children?.filter((child) => {
    if (child.path.startsWith('/docs/components')) {
      return true
    }

    if (child.framework && child.framework !== framework) {
      return false
    }
    return true
  })?.map(child => filterChildrenByFramework(resolveNavigationIcon(child), framework))

  return {
    ...item,
    children: filteredChildren?.length ? filteredChildren : undefined
  }
}

function processNavigationItem(item: ContentNavigationItem, parent?: ContentNavigationItem): ContentNavigationItem | ContentNavigationItem[] {
  if (item.shadow) {
    return item.children?.flatMap(child => processNavigationItem(child, item)) || []
  }

  return {
    ...item,
    title: parent?.title ? parent.title : item.title,
    badge: parent?.badge || item.badge,
    class: [item.framework && `${item.framework}-only`].filter(Boolean),
    children: item.children?.length ? item.children?.flatMap(child => processNavigationItem(child)) : undefined
  }
}

export const useNavigation = (navigation: Ref<ContentNavigationItem[] | undefined>) => {
  const { framework } = useFrameworks()
  const route = useRoute()

  const rootNavigation = computed(() =>
    navigation.value?.[0]?.children?.map(item => processNavigationItem(item)) as ContentNavigationItem[]
  )

  const navigationByFramework = computed(() =>
    rootNavigation.value?.map(item => filterChildrenByFramework(item, framework.value))
  )

  const navigationByCategory = computed(() => {
    // const route = useRoute()

    const slug = route.params.slug?.[0] as string
    const children = findPageChildren(navigation?.value, `/docs/${slug}`, { indexAsChild: true })

    return groupChildrenByCategory(children, slug)
  })

  /**
   * @memo this path
   */
  function findSurround(path: string): [ContentNavigationItem | undefined, ContentNavigationItem | undefined] {
    const pathFormatted = withTrailingSlash(path)
    const flattenNavigation = navigationByCategory.value
      ?.flatMap(item => filterChildrenByFramework(item, framework.value)?.children) ?? []

    const index = flattenNavigation.findIndex(item => item?.path === pathFormatted)
    if (index === -1) {
      return [undefined, undefined]
    }

    const surround: [ContentNavigationItem | undefined, ContentNavigationItem | undefined] = [flattenNavigation[index - 1], flattenNavigation[index + 1]]
    if (surround[0]) {
      surround[0].path = withTrailingSlash(surround[0].path)
    }
    if (surround[1]) {
      surround[1].path = withTrailingSlash(surround[1].path)
    }

    return surround
  }

  function findBreadcrumb(path: string) {
    const breadcrumb = findPageBreadcrumb(navigation?.value, path, { indexAsChild: true })

    return mapContentNavigation(breadcrumb).map(({ icon, ...link }) => link)
  }

  const navigationMenuByCategory = computed(() => mapContentNavigation(
    navigationByCategory?.value ?? []
  )?.map(item => ({
    ...item,
    open: true,
    children: [
      ...(((item?.children || []) as NavigationMenuItem[]).map(link => ({ ...link, active: link.to === route.path })))
    ]
  })))

  return {
    rootNavigation,
    navigationByCategory,
    navigationMenuByCategory,
    navigationByFramework,
    findSurround,
    findBreadcrumb
  }
}
