import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'
import { streamText, convertToModelMessages, stepCountIs, smoothStream } from 'ai'
import { experimental_createMCPClient } from '@ai-sdk/mcp'
import { createDeepSeek } from '@ai-sdk/deepseek'

/**
 * @docs https://ai-sdk.dev/providers/ai-sdk-providers/deepseek
 * @memo sync with: docs/content/docs/2.components/chat.md:297
 */

const maxStepCount = 6

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  if (!messages || !Array.isArray(messages)) {
    throw createError({ status: 400, message: 'Invalid or missing messages array.' })
  }

  const config = useRuntimeConfig()
  let httpClient
  let mcpTools
  try {
    const mcpUrl = import.meta.dev
      ? new URL(`${config.public.baseUrl}/mcp/`, getRequestURL(event).origin)
      : new URL(`${config.public.siteUrl}${config.public.baseUrl}/mcp/`)
    const httpTransport = new StreamableHTTPClientTransport(mcpUrl)
    httpClient = await experimental_createMCPClient({
      transport: httpTransport
    })
    mcpTools = await httpClient.tools()
  } catch (error) {
    console.error('MCP client error:', error)

    throw createError({
      status: 503,
      message: 'Unable to connect to the documentation service. Please try again later.'
    })
  }

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  const system = `You are a helpful assistant for Bitrix24 UI, a UI library for Nuxt and Vue. Use your knowledge base tools to search for relevant information before answering questions.

Guidelines:
- For documentation questions, ALWAYS use tools to search for information. Never rely on pre-trained knowledge for Bitrix24 UI APIs, props, or usage.
- For theme customization, use your own judgment on aesthetics, color theory, and design — no need to search docs for that. Be decisive: pick colors/fonts/radius confidently and apply them. Don't deliberate or second-guess — commit to a direction.
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
    // @todo fix me 10000 | 8100
    maxOutputTokens: 10000,
    providerOptions: {},
    system,
    messages: await convertToModelMessages(messages),
    experimental_transform: smoothStream(),
    stopWhen: stepCountIs(maxStepCount),
    tools: {
      ...mcpTools
    },
    onFinish: () => {
      event.waitUntil(httpClient?.close())
    },
    onError: (error) => {
      console.error('streamText error:', error)

      event.waitUntil(httpClient?.close())
    }
  }).toUIMessageStreamResponse()
})
