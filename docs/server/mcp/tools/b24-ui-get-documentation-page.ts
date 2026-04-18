import { z } from 'zod'
import { withoutTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Get Documentation Page',
  description: 'Retrieves documentation page content by URL path. Use the `sections` parameter to fetch only specific h2 sections to reduce response size.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    /** @memo fix `/b24ui` if you need */
    path: z.string().describe('The path to the content page (e.g., /b24ui/docs/components/button/)'),
    sections: z.array(z.string()).optional().describe('Specific h2 section titles to return (e.g., ["Usage", "API"]). If omitted, returns full documentation.')
  },
  inputExamples: [
    { path: '/b24ui/docs/components/button/', sections: ['Usage', 'API'] },
    { path: '/b24ui/docs/getting-started/installation/' }
  ],
  cache: '30m',
  async handler({ path, sections }) {
    let content
    try {
      const config = useRuntimeConfig()
      const fixPath = withoutTrailingSlash(path.replace(config.public.baseUrl, ''))

      content = await $fetch<string>(`/raw${fixPath}.md`)
    } catch {
      throw createError({ status: 404, message: `Documentation page not found at path: ${path}` })
    }

    // If sections are specified, extract only those sections
    if (sections && sections.length > 0) {
      content = extractSections(content, sections)
    }

    return content
  }
})
