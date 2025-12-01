import { queryCollection } from '@nuxt/content/server'

export default defineMcpTool({
  title: 'List Components',
  description: 'Lists all available Bitrix24 UI components with their categories and basic information',
  cache: '1h',
  async handler() {
    const event = useEvent()
    const components = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/components/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description', 'category')
      .all()

    return jsonResult(components)
  }
})
