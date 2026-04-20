import { z } from 'zod'
import { withoutTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Get Documentation Page',
  description: 'Retrieves documentation page content by URL path. Use the `headings` parameter to fetch only specific h2 sections to reduce response size.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    /** @memo fix `/b24ui` if you need */
    path: z.string().describe('The path to the content page (e.g., /b24ui/docs/components/button/)'),
    headings: z.array(z.string()).optional().describe('Specific h2 heading titles to extract (e.g., ["Usage", "API"]). If omitted, returns full page.')
  },
  inputExamples: [
    { path: '/b24ui/docs/components/button/', headings: ['Usage', 'API'] },
    { path: '/b24ui/docs/getting-started/installation/' }
  ],
  cache: '30m',
  async handler({ path, headings }) {
    let content
    const config = useRuntimeConfig()
    const fixPath = withoutTrailingSlash(path.replace(config.public.baseUrl, ''))

    try {
      content = await $fetch<string>(`/raw${fixPath}.md`)
    } catch {
      throw createError({ status: 404, message: `Documentation page not found at path: ${path}` })
    }

    if (headings && headings.length > 0) {
      content = extractSections(content, headings)
    }

    return content
  }
})
