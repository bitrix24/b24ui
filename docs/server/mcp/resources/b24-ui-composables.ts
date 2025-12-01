import { queryCollection } from '@nuxt/content/server'

export default defineMcpResource({
  title: 'Bitrix24 UI Composables',
  uri: 'resource://bitrix24-ui/composables',
  description: 'Complete list of available Bitrix24 UI v2 composables with metadata and categorie',
  cache: '1h',
  async handler(uri: URL) {
    const event = useEvent()

    const composables = await queryCollection(event, 'docs')
      .where('path', 'LIKE', '%/composables/%')
      .where('extension', '=', 'md')
      .select('path', 'title', 'description')
      .all()

    return {
      contents: [{
        uri: uri.toString(),
        mimeType: 'application/json',
        text: JSON.stringify(composables, null, 2)
      }]
    }
  }
})
