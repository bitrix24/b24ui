import { streamText, convertToModelMessages, stepCountIs } from 'ai'
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
    model: deepseek('deepseek-reasoner'),
    maxOutputTokens: 1000,
    system: `You are a helpful assistant. When answering questions, search the web for up-to-date information when relevant.`,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(2),
    tools: {},
    providerOptions: {
      openai: {
        reasoningEffort: 'low',
        reasoningSummary: 'detailed'
      }
    }
  }).toUIMessageStreamResponse()
})
