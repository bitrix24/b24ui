import { withoutTrailingSlash, withTrailingSlash } from 'ufo'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

export function useCanonical(markdownAlternate?: MaybeRefOrGetter<string | undefined>) {
  const route = useRoute()
  // const site = useSiteConfig()
  const config = useRuntimeConfig()

  useHead({
    link: computed(() => {
      const url = withoutTrailingSlash(`${config.public.canonicalUrl}${config.public.baseUrl}`)
      const path = route.path === '/' ? '' : route.path.replace(/\/$/, '')

      const links: Array<{ rel: string, href: string, type?: string }> = [
        { rel: 'canonical', href: `${url}${withTrailingSlash(path)}` }
      ]

      const md = toValue(markdownAlternate)
      if (md) {
        const href = md.startsWith('http') ? md : `${url}${md.startsWith('/') ? md : `/${md}`}`
        links.push({ rel: 'alternate', type: 'text/markdown', href })
      }

      return links
    })
  })
}
