// @ts-expect-error - no types available
import components from '#component-example/nitro'

export default defineMcpResource({
  title: 'Bitrix24 UI Examples',
  uri: 'resource://bitrix24-ui/examples',
  description: 'Complete list of available Bitrix24 UI example code and demonstrations',
  cache: '1h',
  handler(uri: URL) {
    const examples = Object.entries<{ pascalName: string }>(components).map(([_key, value]) => {
      return value.pascalName
    })

    return {
      contents: [{
        uri: uri.toString(),
        mimeType: 'application/json',
        text: JSON.stringify(examples, null, 2)
      }]
    }
  }
})
