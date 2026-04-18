// @ts-expect-error - no types available
import { listComponentExamples } from '#component-example/nitro'

export default defineMcpTool({
  title: 'List Examples',
  description: 'Lists all available UI examples and code demonstrations',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  cache: '1h',
  handler() {
    return listComponentExamples()
  }
})
