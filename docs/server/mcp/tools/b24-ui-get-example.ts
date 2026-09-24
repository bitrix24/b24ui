import { z } from 'zod'
import { camelCase } from 'scule'

export default defineMcpTool({
  title: 'Get Example',
  description: 'Retrieves the source code of a UI example. Returns the code as a string only, without metadata. Use `b24-ui-list-examples` to find the exact example name.',
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false
  },
  inputSchema: {
    exampleName: z.string().describe('The name of the example (PascalCase)')
  },
  inputExamples: [
    { exampleName: 'TabsExample' },
    { exampleName: 'AccordionBodySlotExample' }
  ],
  cache: '30m',
  async handler({ exampleName }) {
    try {
      // Examples are prerendered under their camelCase name. The dynamic route
      // pascalCases whatever it is given, so any case works in dev — but this
      // docs site deploys as a static build, where only the prerendered
      // filenames exist and anything else is a hard 404.
      const result = await $fetch<{ code: string }>(`/api/component-example/${camelCase(exampleName)}.json`)
      return result.code
    } catch (error: unknown) {
      const err = error as { status?: number, response?: { status?: number } }
      const status = err?.status ?? err?.response?.status
      if (status === 404) {
        throw createError({ status: 404, message: `Example '${exampleName}' not found. Use the b24-ui-list-examples tool to see all available examples.` })
      }
      throw error
    }
  }
})
