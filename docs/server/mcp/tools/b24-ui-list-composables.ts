import { queryCollection } from '@nuxt/content/server'

// title: '',
export default defineMcpTool({
  title: 'List Composables',
  description: 'Lists all available Bitrix24 UI composables with their categories and basic information',
  cache: '1h',
  async handler() {
    const event = useEvent()
    const composables = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/composables/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    return jsonResult(composables)
  }
})
