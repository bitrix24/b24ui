import { z } from 'zod'
import { queryCollection } from '@nuxt/content/server'
import { withTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Get Migration Guide',
  description: 'Retrieves version-specific migration guides and upgrade instructions',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    version: z.enum(['v2']).describe('The migration version (e.g., v2)')
  },
  inputExamples: [
    { version: 'v2' }
  ],
  cache: '30m',
  async handler({ version }) {
    const event = useEvent()
    const config = useRuntimeConfig()

    const page = await queryCollection(event, 'docs')
      .where('path', 'LIKE', `%/migration/${version}`)
      .where('extension', '=', 'md')
      .select('title', 'description', 'path')
      .first()

    if (!page) {
      throw createError({ status: 404, message: `Migration guide for '${version}' not found` })
    }

    const documentation = await $fetch<string>(`/raw${page.path}.md`)

    return {
      version,
      title: page.title,
      description: page.description,
      path: `${config.public.baseUrl}${withTrailingSlash(page.path)}`,
      documentation,
      url: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(page.path)}`
    }
  }
})
