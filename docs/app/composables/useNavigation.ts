import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@bitrix24/b24ui-nuxt'
import { findPageChildren, findPageBreadcrumb } from '@nuxt/content/utils'
import { mapContentNavigation } from '@bitrix24/b24ui-nuxt/utils/content'
import { withTrailingSlash } from 'ufo' // withoutTrailingSlash
import ALetterIcon from '@bitrix24/b24icons-vue/outline/ALetterIcon'
import LayersIcon from '@bitrix24/b24icons-vue/outline/LayersIcon'
import ItemIcon from '@bitrix24/b24icons-vue/crm/ItemIcon'
import FormIcon from '@bitrix24/b24icons-vue/crm/FormIcon'
import BulletedListIcon from '@bitrix24/b24icons-vue/outline/BulletedListIcon'
import LinkIcon from '@bitrix24/b24icons-vue/outline/LinkIcon'
import OpenChatIcon from '@bitrix24/b24icons-vue/outline/OpenChatIcon'
import PageIcon from '@bitrix24/b24icons-vue/button/PageIcon'
import TaskListIcon from '@bitrix24/b24icons-vue/outline/TaskListIcon'
import CodeIcon from '@bitrix24/b24icons-vue/common-service/CodeIcon'
import AiStarsIcon from '@bitrix24/b24icons-vue/outline/AiStarsIcon'
import BrushIcon from '@bitrix24/b24icons-vue/actions/BrushIcon'
import EarthLanguageIcon from '@bitrix24/b24icons-vue/main/EarthLanguageIcon'
import EditPencilIcon from '@bitrix24/b24icons-vue/main/EditPencilIcon'

const categories = {
  'components': [
    {
      id: 'layout',
      title: 'Layout',
      icon: LayersIcon
    },
    {
      id: 'element',
      title: 'Element',
      icon: ItemIcon
    },
    {
      id: 'form',
      title: 'Form',
      icon: FormIcon
    },
    {
      id: 'data',
      title: 'Data',
      icon: BulletedListIcon
    },
    {
      id: 'navigation',
      title: 'Navigation',
      icon: LinkIcon
    },
    {
      id: 'overlay',
      title: 'Overlay',
      icon: OpenChatIcon
    },
    {
      id: 'page',
      title: 'Page',
      icon: PageIcon
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: CodeIcon
    },
    {
      id: 'chat',
      title: 'AI Chat',
      icon: AiStarsIcon
    },
    {
      id: 'editor',
      title: 'Editor',
      icon: EditPencilIcon
    },
    {
      id: 'content',
      title: 'Content',
      framework: 'nuxt',
      icon: TaskListIcon
    },
    {
      id: 'color-mode',
      title: 'Color Mode',
      icon: BrushIcon
    },
    {
      id: 'i18n',
      title: 'i18n',
      icon: EarthLanguageIcon
    }
  ],
  'typography': [
    {
      id: 'components',
      title: 'Components',
      icon: ALetterIcon
    }
  ],
  'getting-started': [
    {
      id: 'theme',
      title: 'Theme',
      icon: undefined
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: undefined
    },
    {
      id: 'aiTools',
      title: 'AI Tools',
      icon: undefined
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
      ?.map(item => ({ ...item, children: item.children?.map(child => ({ ...child, path: withTrailingSlash(child.path), icon: undefined })) }))
    const withoutChildren = uncategorized.filter(item => !item.children?.length)

    if (withoutChildren.length) {
      groups.push({
        title: 'Overview',
        type: 'trigger' as const,
        /** @memo this path */
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
        icon: category?.icon,
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
    // @memo Visibility control
    b24ui: {
      childItem: [item.framework && `${item.framework}-only`].filter(Boolean).join(' ')
    },
    children: item.children?.length ? item.children?.flatMap(child => processNavigationItem(child)) : undefined
  }
}

export const useNavigation = (navigation: Ref<ContentNavigationItem[] | undefined>) => {
  const { framework } = useFrameworks()

  const rootNavigation = computed(() =>
    navigation.value?.[0]?.children?.map(item => processNavigationItem(item)) as ContentNavigationItem[]
  )

  const navigationByFramework = computed(() =>
    rootNavigation.value?.map(item => filterChildrenByFramework(item, framework.value)).map((item) => {
      return {
        ...item,
        path: withTrailingSlash(item.path),
        children: (item?.children || []).map((child) => {
          return { ...child, path: withTrailingSlash(child.path) }
        })
      }
    })
  )

  const navigationByCategory = computed(() => {
    const route = useRoute()

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
      // @memo: while remove filterChildrenByFramework -> ?.flatMap(item => item?.children) ?? []
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

  const navigationMenuByCategory = computed(() => {
    const route = useRoute()

    const data = mapContentNavigation(
      navigationByCategory?.value ?? []
    )?.map((item) => {
      return {
        ...item,
        open: true,
        children: [
          ...(((item?.children || []) as (NavigationMenuItem & { description?: string })[]).map(link => ({ ...link, to: withTrailingSlash(link.to as string), active: withTrailingSlash(link.to as string) === route.path })))
        ]
      }
    })

    const result = []
    for (const row of data) {
      result.push({
        ...row,
        type: 'label' as const,
        open: undefined,
        description: undefined,
        children: undefined
      })

      for (const child of row.children) {
        result.push({
          ...child,
          icon: row?.icon
        })
      }
    }

    return result
  })

  return {
    rootNavigation,
    navigationByCategory,
    navigationMenuByCategory,
    navigationByFramework,
    findSurround,
    findBreadcrumb
  }
}
