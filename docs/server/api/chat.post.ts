import { streamText, convertToModelMessages } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = (await readBody<{ messages?: any }>(event)) || {}

  if (!messages || !Array.isArray(messages)) {
    throw createError({ status: 400, message: 'Invalid or missing messages array.' })
  }

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  return streamText({
    // @todo fix me deepseek-reasoner | deepseek-chat
    model: deepseek('deepseek-reasoner'),
    system: 'You are a helpful assistant for Bitrix24 UI, a UI library for Nuxt and Vue.',
    messages: await convertToModelMessages(messages),
    providerOptions: {
      openai: {
        reasoningEffort: 'low',
        reasoningSummary: 'detailed'
      }
    }
  }).toUIMessageStreamResponse()
})
