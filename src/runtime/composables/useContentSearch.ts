import { ref } from 'vue'
import type { ContentNavigationItem } from '@nuxt/content'
import { createSharedComposable } from '@vueuse/core'
// import { useAppConfig } from '#imports'
import icons from '../dictionary/icons'
import type { ContentSearchFile, ContentSearchItem } from '../components/content/ContentSearch.vue'
import type { IconComponent } from '../types'

function _useContentSearch() {
  const open = ref(false)
  // const appConfig = useAppConfig()

  /**
   * Map a file to a ContentSearchItem
   */
  function mapFile(
    file: ContentSearchFile,
    link: ContentNavigationItem,
    parent?: ContentNavigationItem
  ): ContentSearchItem {
    const prefix = [...new Set([parent?.title, ...file.titles].filter(Boolean))]

    return {
      prefix: prefix?.length ? (prefix.join(' > ') + ' >') : undefined,
      label: file.id === link.path ? link.title : file.title,
      suffix: file.content.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      to: file.id,
      icon: (link.icon || parent?.icon || (file.level > 1 ? icons.hash : icons.file)) as IconComponent,
      level: file.level
    }
  }

  /**
   * Map navigation items to ContentSearchItems
   */
  function mapNavigationItems(
    children: ContentNavigationItem[],
    files: ContentSearchFile[],
    parent?: ContentNavigationItem
  ): ContentSearchItem[] {
    return children.flatMap((link) => {
      if (link.children?.length) {
        return mapNavigationItems(link.children, files, link)
      }

      return files
        ?.filter(file => file.id === link.path || file.id.startsWith(`${link.path}#`))
        ?.map(file => mapFile(file, link, parent)) || []
    })
  }

  /**
   * Post-filter function to filter only first level items when no query
   */
  function postFilter(query: string, items: ContentSearchItem[]): ContentSearchItem[] {
    if (!query) {
      return items?.filter(item => item.level === 1)
    }
    return items
  }

  return {
    open,
    mapFile,
    mapNavigationItems,
    postFilter
  }
}

export const useContentSearch = /* @__PURE__ */ createSharedComposable(_useContentSearch)
