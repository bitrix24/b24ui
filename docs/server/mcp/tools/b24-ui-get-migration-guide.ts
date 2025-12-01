import { z } from 'zod'
import { queryCollection } from '@nuxt/content/server'
import { withTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Get Migration Guide',
  description: 'Retrieves version-specific migration guides and upgrade instructions',
  inputSchema: {
    version: z.enum(['v2']).describe('The migration version (e.g., v2)')
  },
  cache: '30m',
  async handler({ version }) {
    const event = useEvent()

    const page = await queryCollection(event, 'docs')
      .where('path', 'LIKE', `%/migration/${version}`)
      .where('extension', '=', 'md')
      .select('id', 'title', 'description', 'path', 'body')
      .first()

    if (!page) {
      return errorResult(`Migration guide for '${version}' not found`)
    }

    const documentation = await $fetch<string>(`/raw${page.path}.md`)
    const config = useRuntimeConfig()

    return jsonResult({
      version,
      title: page.title,
      description: page.description,
      path: `${config.public.baseUrl}${withTrailingSlash(page.path)}`,
      documentation,
      url: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(page.path)}`
    })
  }
})
