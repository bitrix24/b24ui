import { z } from 'zod'
import { queryCollection } from '@nuxt/content/server'
import { withTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Search Documentation',
  description: 'Search documentation pages by title, description, or section. With no params, lists all pages.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    search: z.string().optional().describe('Search term to filter pages by title or description'),
    section: z.string().optional().describe('Filter by documentation section (e.g., "getting-started", "components", "composables")')
  },
  inputExamples: [
    {},
    { section: 'getting-started' },
    { search: 'installation' },
    { search: 'color', section: 'getting-started' }
  ],
  cache: '30m',
  async handler({ search, section }) {
    const event = useEvent()
    const config = useRuntimeConfig()

    let query = queryCollection(event, 'docs')
      .select('title', 'description', 'path')

    if (section) {
      query = query.where('path', 'LIKE', `/docs/${section}/%`)
    }

    const pages = await query.all()

    let results = pages.map(page => ({
      title: page.title,
      description: page.description,
      path: `${config.public.baseUrl}${withTrailingSlash(page.path)}`,
      url: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(page.path)}`
    }))

    if (search) {
      const searchLower = search.toLowerCase()
      results = results.filter(page =>
        page.title?.toLowerCase().includes(searchLower)
        || page.description?.toLowerCase().includes(searchLower)
      )
    }

    return {
      pages: results.sort((a, b) => a.path.localeCompare(b.path)),
      total: results.length
    }
  }
})
