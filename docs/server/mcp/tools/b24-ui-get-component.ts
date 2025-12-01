import { z } from 'zod'
import { kebabCase } from 'scule'
import { queryCollection } from '@nuxt/content/server'
import { normalizeComponentName } from '~~/server/utils/normalizeComponentName'
import { withTrailingSlash, withoutTrailingSlash } from 'ufo'

export default defineMcpTool({
  title: 'Get Component',
  description: 'Retrieves Bitrix24 UI component documentation and details',
  inputSchema: {
    componentName: z.string().describe('The name of the component (PascalCase)')
  },
  cache: '30m',
  async handler({ componentName }) {
    const event = useEvent()

    // Normalize component name by removing "B24" or "b24-" prefix if present
    const normalizedName = normalizeComponentName(componentName)

    // Convert to kebab-case for path lookup
    const kebabName = kebabCase(normalizedName)

    // Get component documentation using queryCollection
    const page = await queryCollection(event, 'docs')
      .where('path', 'LIKE', `%/components/${kebabName}`)
      .where('extension', '=', 'md')
      .select('id', 'title', 'description', 'path', 'category', 'links')
      .first()

    if (!page) {
      return errorResult(`Component '${componentName}' not found in documentation`)
    }

    const documentation = await $fetch<string>(`/raw${withoutTrailingSlash(page.path)}.md`)

    const config = useRuntimeConfig()

    return jsonResult({
      name: normalizedName,
      title: page.title,
      description: page.description,
      category: page.category,
      documentation,
      documentation_url: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(page.path)}`
    })
  }
})
