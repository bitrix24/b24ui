import { z } from 'zod'
import { withoutTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Get Documentation Page',
  description: 'Retrieves documentation page content by URL path',
  inputSchema: {
    /** @memo fix `/b24ui` if you need */
    path: z.string().describe('The path to the content page (e.g., /b24ui/docs/components/button/)')
  },
  cache: '30m',
  async handler({ path }) {
    try {
      const config = useRuntimeConfig()

      const fixPath = withoutTrailingSlash(path.replace(config.public.baseUrl, ''))

      const result = await $fetch<string>(`/raw${fixPath}.md`)
      return {
        content: [{ type: 'text' as const, text: result }]
      }
    } catch (error) {
      return errorResult(`Failed to fetch documentation page: ${error}`)
    }
  }
})
