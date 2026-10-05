import { z } from 'zod'
import { withoutTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Get Documentation Page',
  description: 'Returns the Markdown content of one documentation page by its URL path, as found in the `path` field of `b24-ui-search-documentation`. Pass `headings` to return only the named h2 sections and reduce response size. The result is the Markdown string only, headed by a short frontmatter (title, description, canonical URL). For a component, `b24-ui-get-component` returns the same content with metadata. A path with no page returns a "Page Not Found" Markdown stub rather than an error.',
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
    { path: '/b24ui/docs/getting-started/installation/nuxt/' }
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
