import { z } from 'zod'
import { queryCollection } from '@nuxt/content/server'
import { withTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Search Components by Category',
  description: 'Searches components by category or text filter',
  inputSchema: {
    category: z.string().optional().describe('Filter components by category'),
    search: z.string().optional().describe('Search term to filter components by name or description')
  },
  cache: '30m',
  async handler({ category, search }) {
    const event = useEvent()

    let query = queryCollection(event, 'docs')
      .where('path', 'LIKE', '/docs/components/%')
      .where('extension', '=', 'md')
      .select('id', 'title', 'description', 'path', 'category', 'links')

    if (category) {
      query = query.where('category', '=', category)
    }

    const components = await query.all()
    const config = useRuntimeConfig()

    let results = components.map(component => ({
      name: component.path.split('/').pop(),
      title: component.title,
      description: component.description,
      category: component.category,
      path: `${config.public.baseUrl}${withTrailingSlash(component.path)}`,
      url: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(component.path)}`,
      links: component.links
    }))

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase()
      results = results.filter(component =>
        component.name?.toLowerCase().includes(searchLower)
        || component.title?.toLowerCase().includes(searchLower)
        || component.description?.toLowerCase().includes(searchLower)
      )
    }

    return jsonResult({
      components: results.sort((a, b) => (a.name || '').localeCompare(b.name || '')),
      total: results.length,
      filters: { category, search }
    })
  }
})
