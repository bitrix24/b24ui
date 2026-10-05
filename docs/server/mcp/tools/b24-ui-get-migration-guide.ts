import { queryCollection } from '@nuxt/content/server'
import { withTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Get Migration Guide',
  description: 'Returns the full guide for migrating an application from the previous major version of Bitrix24 UI to this one, as Markdown with its title, description and URL. Takes no parameters and covers that single upgrade only. To read part of it, call `b24-ui-get-documentation-page` with `/docs/getting-started/migration` and a `headings` list.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  cache: '30m',
  async handler() {
    const event = useEvent()
    const config = useRuntimeConfig()

    const page = await queryCollection(event, 'docs')
      .where('path', '=', '/docs/getting-started/migration')
      .where('extension', '=', 'md')
      .select('title', 'description', 'path')
      .first()

    if (!page) {
      throw createError({ status: 404, message: 'Migration guide not found' })
    }

    const documentation = await $fetch<string>(`/raw${page.path}.md`)

    return {
      title: page.title,
      description: page.description,
      path: `${config.public.baseUrl}${withTrailingSlash(page.path)}`,
      documentation,
      url: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(page.path)}`
    }
  }
})
