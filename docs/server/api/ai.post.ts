// @memo we not use jsonSchema
import { streamText, convertToModelMessages, smoothStream, stepCountIs, jsonSchema } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'
import { z } from 'zod'
import { tools as mcpToolDefinitions } from '#nuxt-mcp-toolkit/tools.mjs'

/**
 * @docs https://ai-sdk.dev/providers/ai-sdk-providers/deepseek
 * @memo sync with: docs/content/docs/2.components/chat.md:297
 */

const maxStepCount = 5

function mcpToolsToAiTools() {
  const aiTools: Record<string, { description: string, inputSchema: ReturnType<typeof jsonSchema>, execute: (args: any) => Promise<any> }> = {}

  for (const def of mcpToolDefinitions as any[]) {
    const filename = def._meta?.filename as string | undefined
    const name = def.name || (filename
      ? filename.replace(/\.(ts|js|mts|mjs)$/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[_\s]+/g, '-').toLowerCase()
      : null)
    if (!name) continue

    const schema = def.inputSchema
      ? z.toJSONSchema(z.object(def.inputSchema)) as Record<string, unknown>
      : { type: 'object' as const, properties: {} }

    aiTools[name] = {
      description: def.description || '',
      inputSchema: jsonSchema(schema),
      execute: async (args: any) => {
        try {
          return await def.handler(args, {})
        } catch (error: any) {
          return { error: error.statusCode ? `[${error.statusCode}] ${error.message}` : error.message || String(error) }
        }
      }
    }
  }

  return aiTools
}

export default defineEventHandler(async (event) => {
  const { messages, framework, currentPage } = (await readBody<{ messages?: any, framework?: string, currentPage?: string }>(event)) || {}

  if (!messages || !Array.isArray(messages)) {
    throw createError({ status: 400, message: 'Invalid or missing messages array.' })
  }

  const mcpTools = mcpToolsToAiTools()

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  const abortController = new AbortController()
  event.node.req.on('close', () => abortController.abort())

  const system = `You are a helpful assistant for Bitrix24 UI, a UI library for Nuxt and Vue. Use your knowledge base tools to search for relevant information before answering questions.

The user is using **${framework === 'vue' ? 'Vue' : 'Nuxt'}**. Tailor your answers accordingly — ${framework === 'vue' ? 'use the Vite plugin setup, Vue Router, and vite.config.ts instead of Nuxt-specific features like modules or app.config.ts. IMPORTANT: The Vite plugin auto-imports components and Bitrix24 UI composables, but Vue core APIs and VueUse must be explicitly imported — always include these in code examples (e.g. `import { ref, computed } from \'vue\'`).' : 'use Nuxt modules, auto-imports, app.config.ts, and other Nuxt-specific features. Nuxt auto-imports Vue APIs (ref, computed, etc.), composables, and components — do not include these imports in code examples.'}
${currentPage ? `\nThe user is currently viewing the documentation page at \`${currentPage}\`. Use this context to provide more relevant answers (e.g. read that page first if the question seems related), but don't limit yourself to that page if the question is broader or unrelated.\n` : ''}
Guidelines:
- For documentation questions, ALWAYS use tools to search for information. Never rely on pre-trained knowledge for Bitrix24 UI APIs, props, or usage.
— When users ask you to apply a theme change in real time (e.g., "make it blue," "create a Sakura theme," "change the font"), tell them that the library style matches the Bitrix24 style and suggest using standard properties (color, variant).
- If a question is unrelated to Bitrix24 UI (e.g. general coding, off-topic), briefly answer if you can, but don't waste tool calls searching docs for it.
- If no relevant information is found after searching, respond with "Sorry, I couldn't find information about that in the documentation."
- Be concise and direct in your responses.

**FORMATTING RULES (CRITICAL):**
- ABSOLUTELY NO MARKDOWN HEADINGS: Never use #, ##, ###, ####, #####, or ######
- NO underline-style headings with === or ---
- Use **bold text** for emphasis and section labels instead
- Examples:
  * Instead of "## Usage", write "**Usage:**" or just "Here's how to use it:"
  * Instead of "# Complete Guide", write "**Complete Guide**" or start directly with content
- Start all responses with content, never with a heading

- Reference specific component names, props, or APIs when applicable.
- If a question is ambiguous, ask for clarification rather than guessing.
- When multiple relevant items are found, list them clearly using bullet points.
- You have up to ${maxStepCount} tool calls to find the answer, so be strategic: start broad, then get specific if needed.
- Format responses in a conversational way, not as documentation sections.
    `

  return streamText({
    // @todo fix me deepseek-reasoner | deepseek-chat
    model: deepseek('deepseek-reasoner'),
    maxOutputTokens: 8000, // 10000 | 8100
    abortSignal: abortController.signal,
    providerOptions: {},
    system,
    messages: await convertToModelMessages(messages),
    experimental_transform: smoothStream(),
    stopWhen: stepCountIs(maxStepCount),
    tools: {
      ...mcpTools
    },
    onError: (error) => {
      console.error('streamText error:', error)
    }
  }).toUIMessageStreamResponse()
})
