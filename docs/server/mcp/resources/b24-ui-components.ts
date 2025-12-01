import { queryCollection } from '@nuxt/content/server'

export default defineMcpResource({
  title: 'Bitrix24 UI Components',
  uri: 'resource://bitrix24-ui/components',
  description: 'Complete list of available Bitrix24 UI v2 components with metadata and categories',
  cache: '1h',
  async handler(uri: URL) {
    const event = useEvent()

    const components = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/components/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description', 'category')
      .all()

    return {
      contents: [{
        uri: uri.toString(),
        mimeType: 'application/json',
        text: JSON.stringify(components, null, 2)
      }]
    }
  }
})
