import { queryCollection } from '@nuxt/content/server'
import { withTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'List Documentation Pages',
  description: 'Lists all documentation pages',
  cache: '1h',
  async handler() {
    const event = useEvent()

    const pages = await queryCollection(event, 'docs').all()

    const config = useRuntimeConfig()

    return jsonResult(pages.map(page => ({
      title: page.title,
      description: page.description,
      path: `${config.public.baseUrl}${withTrailingSlash(page.path)}`,
      url: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(page.path)}`
    })))
  }
})
