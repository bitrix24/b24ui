import { reactivePick } from '@vueuse/core'
import { isEqual, diff } from 'ohash/utils'
import type { LinkProps } from '../components/Link.vue'
import { linkKeys } from './link-keys'

/**
 * Re-exported from `./link-keys` so a consumer importing from `b24ui/utils`
 * finds it beside `pickLinkProps`, which is the function that consumes it.
 *
 * The list itself lives in its own module so a reader of the names does not
 * have to load `reactivePick` and `ohash` with them — which is why
 * `link-passthrough.spec.ts` imports `./link-keys` directly rather than going
 * through here.
 */
export { linkKeys }

/**
 * Splits the link-shaped props out of a component's own, so `Button`, `Badge`
 * and the rest can forward them to `Link` without listing them each time.
 *
 * Keyed on `linkKeys`, which is the single list those components share.
 */
export function pickLinkProps(link: LinkProps & { [key: string]: any }) {
  const keys = Object.keys(link)

  const ariaKeys = keys.filter(key => key.startsWith('aria-'))
  const dataKeys = keys.filter(key => key.startsWith('data-'))

  const propsToInclude = [
    ...linkKeys,
    ...ariaKeys,
    ...dataKeys
  ]

  return reactivePick(link, ...propsToInclude)
}

/**
 * Whether every key of `item2` matches the same key of `item1` — used to
 * decide active state for a link whose `to` is a route object: the current
 * route carries more than the link declares, and only what the link declares
 * should have to match.
 */
export function isPartiallyEqual(item1: any, item2: any) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === 'added') {
      filtered.add(q.key)
    }
    return filtered
  }, new Set<string>())

  const item1Filtered = Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key)))
  const item2Filtered = Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key)))

  return isEqual(item1Filtered, item2Filtered)
}
