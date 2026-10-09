import { defineMcpResource } from '@nuxtjs/mcp-toolkit/server'
// @ts-expect-error - no types available
import { listComponentExamples } from '#component-example/nitro'

export default defineMcpResource({
  title: 'Bitrix24 UI Examples',
  uri: 'resource://bitrix24-ui/examples',
  description: 'List of the available Bitrix24 UI example names. Names only, not code.',
  cache: '1h',
  handler(uri: URL) {
    return {
      contents: [{
        uri: uri.toString(),
        mimeType: 'application/json',
        text: JSON.stringify(listComponentExamples(), null, 2)
      }]
    }
  }
})
