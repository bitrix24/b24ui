import { z } from 'zod'
import { kebabCase } from 'scule'
import { queryCollection } from '@nuxt/content/server'
import { normalizeComponentName } from '~~/server/utils/normalizeComponentName'
import { withTrailingSlash, withoutTrailingSlash } from 'ufo'

const sectionList = ['usage', 'examples', 'api', 'theme', 'changelog']
const sectionEnum = z.enum(sectionList)

export default defineMcpTool({
  title: 'Get Component',
  description: 'Retrieves Bitrix24 UI component documentation and details. Use the `sections` parameter to fetch only specific parts of the documentation to reduce response size.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    componentName: z.string().describe('The name of the component (PascalCase)'),
    sections: z.array(sectionEnum).optional().describe(`Specific sections to return: ${sectionList.join(', ')}. If omitted, returns full documentation.`)
  },
  inputExamples: [
    { componentName: 'Button', sections: ['usage', 'api'] },
    { componentName: 'B24Modal' },
    { componentName: 'Table', sections: ['examples'] }
  ],
  cache: '30m',
  async handler({ componentName, sections }) {
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
      throw createError({ status: 404, message: `Component '${componentName}' not found in documentation` })
    }

    const config = useRuntimeConfig()

    const fullDocumentation = await $fetch<string>(`/raw${withoutTrailingSlash(page.path)}.md`)

    let documentation = fullDocumentation

    // If sections are specified, extract only those sections
    if (sections && sections.length > 0) {
      documentation = extractSections(fullDocumentation, sections)
    }

    return {
      name: normalizedName,
      title: page.title,
      description: page.description,
      category: page.category,
      documentation,
      documentation_url: `${config.public.canonicalUrl}${config.public.baseUrl}${withTrailingSlash(page.path)}`,
      sections_returned: sections || ['full']
    }
  }
})
