import { z } from 'zod'
import { queryCollection } from '@nuxt/content/server'

export default defineMcpTool({
  title: 'List Templates',
  description: 'Lists all available Bitrix24 UI templates with optional framework filtering',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    framework: z.string().optional().describe('Filter templates by framework (e.g., "nuxt", "vue")')
  },
  inputExamples: [
    { framework: 'nuxt' },
    {}
  ],
  cache: '1h',
  async handler({ framework }) {
    const event = useEvent()

    const templatesCollectionItems = await queryCollection(event, 'templates').first()

    const templateListing = templatesCollectionItems?.items || []

    const normalizedFramework = framework?.toLowerCase()
    const filteredTemplates = normalizedFramework
      ? templateListing.filter(
          (template: { framework?: string }) =>
            template.framework?.toLowerCase() === normalizedFramework
        )
      : templateListing

    return {
      templates: filteredTemplates,
      total: filteredTemplates.length
    }
  }
})
