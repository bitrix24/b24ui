import type { ContentNavigationItem } from '@nuxt/content'
import type { IconComponent } from '#b24ui/types'

type MapContentNavigationItemOptions = { labelAttribute?: string, deep?: number }

/**
 * Turns one `@nuxt/content` navigation entry into the item shape b24ui's
 * navigation components take, recursing into `children`.
 *
 * @param item The content navigation entry.
 * @param options Depth limits and per-item overrides.
 * @param currentDepth Recursion depth; callers pass nothing.
 */
export function mapContentNavigationItem(item: ContentNavigationItem, options?: MapContentNavigationItemOptions, currentDepth: number = 0) {
  const navMap = {
    [options?.labelAttribute || 'title']: 'label',
    path: 'to'
  }

  const link = Object.keys(item).reduce((link, key) => {
    if (item[key]) {
      const mappedKey: string = navMap[key as keyof typeof navMap] || key
      link[mappedKey] = item[key]
    }
    return link
    // @memo add type && icon
  }, {} as Omit<ContentNavigationItem, 'title' | 'path'> & { label?: string, to?: string, type?: string, icon?: IconComponent })

  const shouldRecurse = typeof options?.deep === 'undefined' || currentDepth < options.deep
  if (shouldRecurse && Array.isArray(item.children)) {
    link.children = item.children.map(child =>
      mapContentNavigationItem(child, options, currentDepth + 1)
    )
  } else {
    link.children = []
  }

  return link
}

/**
 * `mapContentNavigationItem` over a whole tree — what a docs sidebar binds to.
 */
export function mapContentNavigation(navigation: ContentNavigationItem[], options?: MapContentNavigationItemOptions) {
  return navigation.map(item => mapContentNavigationItem(item, options))
}
