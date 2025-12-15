import { streamText, convertToModelMessages, stepCountIs } from 'ai'
import { createDeepSeek } from '@ai-sdk/deepseek'

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const deepseek = createDeepSeek({
    apiKey: process.env.DEEPSEEK_API_KEY ?? ''
  })

  return streamText({
    model: deepseek('deepseek-reasoner'),
    maxOutputTokens: 1000,
    system: `You are a helpful assistant for Bitrix24 UI, a UI library for Nuxt and Vue.`,
    messages: convertToModelMessages(messages),
    stopWhen: stepCountIs(6),
    providerOptions: {
      openai: {
        reasoningEffort: 'low',
        reasoningSummary: 'detailed'
      }
    }
  }).toUIMessageStreamResponse()
})
