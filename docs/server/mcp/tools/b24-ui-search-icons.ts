import { z } from 'zod'
// import { queryCollection } from '@nuxt/content/server'
// import { withTrailingSlash } from 'ufo'

// @todo make search from b24Icons
export default defineMcpTool({
  title: 'Search Icons',
  description: 'Search for icons across Iconify collections. Returns matching icon names in the `i-{prefix}-{name}` format used by Nuxt UI. Default collection is `lucide`.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true
  },
  inputSchema: {
    query: z.string().describe('Search query (e.g., "arrow", "home", "settings")'),
    limit: z.number().min(1).max(999).optional().describe('Maximum number of results (default: 64)')
  },
  inputExamples: [
    { query: 'home' },
    { query: 'arrow', limit: 10 }
  ],
  cache: '1h',
  async handler({ query, limit }) {
    return {
      icons: [],
      total: 0,
      limit,
      query
    }

    // const params = new URLSearchParams({ query })
    // if (limit) params.set('limit', String(limit))
    //
    // const data = await $fetch<{ icons: string[], total: number }>(`https://api.iconify.design/search?${params}`)
    //
    // return {
    //   icons: data.icons.map((icon) => {
    //     const [iconPrefix, ...nameParts] = icon.split(':')
    //     const name = nameParts.join(':')
    //     return {
    //       name: `i-${iconPrefix}-${name}`,
    //       preview: `https://api.iconify.design/${iconPrefix}/${name}.svg`
    //     }
    //   }),
    //   total: data.total,
    //   query
    // }
  }
})
