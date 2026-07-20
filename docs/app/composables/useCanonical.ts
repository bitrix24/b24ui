import type { Link } from '@unhead/vue'
import { withoutTrailingSlash, withTrailingSlash, joinURL } from 'ufo'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

export function useCanonical(markdownAlternate?: MaybeRefOrGetter<string | undefined>) {
  const route = useRoute()
  // const site = useSiteConfig()
  const config = useRuntimeConfig()

  useHead({
    link: computed(() => {
      const siteUrl = withoutTrailingSlash(`${config.public.canonicalUrl}${config.public.baseUrl}`)
      const pathNormal = withTrailingSlash(route.path)

      // const url = withoutTrailingSlash(`${config.public.canonicalUrl}${config.public.baseUrl}`)
      // const path = route.path === '/' ? '' : route.path.replace(/\/$/, '')

      const links: Link[] = [
        { rel: 'canonical', href: joinURL(siteUrl, pathNormal) }
      ]

      const md = toValue(markdownAlternate)
      if (md) {
        links.push({ rel: 'alternate', type: 'text/markdown', href: joinURL(siteUrl, md) })
      }

      return links
    })
  })
}
