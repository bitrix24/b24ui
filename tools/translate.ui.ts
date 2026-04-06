/**
 * Translate src/locales
 * @see https://platform.deepseek.com/usage
 *
 * @todo move to cli or in .claude/*
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline/promises'
import OpenAI from 'openai'
import { config } from 'dotenv'
import { contentLocales } from '../src/runtime/dictionary/i18n'

config({ path: '.env', quiet: true })

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const EXCLUDED_WORDS = ['AI', 'CRM', 'Bitrix24']
const CONTENT_PATH = './src/runtime/locale'

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
})

async function translateText(
  text: string,
  targetText: string,
  sourceLang: string,
  targetLang: string
) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{
        role: 'user',
        content: `Your task is to localize language phrases (the \`message\` field) from ${sourceLang} to ${targetLang}.
Take the \`name\`, \`code\`, \`locale\`, and \`dir\` fields from this code (destination file):
\`\`\`ts
${targetText}
\`\`\`

Take all language phrases from the \`message\` field in this code (source file):
\`\`\`ts
${text}
\`\`\`

Important:
- The source data may contain new blocks. These need to be translated and inserted into the final data.
- Import block \`import ...\` save from destination file
- Declaration block save from destination file \`export default defineLocale<Messages>({\`
- Keep all placeholders, such as {0} and {name}, unchanged.
- Do not translate: ${EXCLUDED_WORDS.join(', ')}.
- Never add explanations.
- Return only the result of the work, without explanations or unnecessary quotes.`
      }],
      temperature: 1.3
    })

    if (null === completion) {
      return ''
    }
    return (((completion.choices[0] || {})?.message || {}).content || '')
      .replace(/```json/g, '')
      .replace(/```ts/g, '')
      .replace(/```/g, '')
      .trim()
  } catch (error) {
    console.error('Translation error:', (error instanceof Error) ? error?.message : error)
    return text
  }
}

async function main() {
  try {
    // Getting a list of languages
    const files = await fs.readdir(CONTENT_PATH)
    const locales = files
      .filter(f => f.endsWith('.ts'))
      .filter(f => !f.endsWith('index.ts'))
      .map(f => f.replace('.ts', ''))

    if (locales.length < 2) {
      throw new Error('Need at least 2 locale files')
    }

    // Select source language
    console.log('Available locales:', locales.join(', '))
    const sourceLang = await rl.question('Enter source locale: ')
    if (!locales.includes(sourceLang)) {
      throw new Error(`Main locale ${sourceLang} not found`)
    }

    // Loading the main language
    const mainPath = path.join(CONTENT_PATH, `${sourceLang}.ts`)
    const mainData = await fs.readFile(mainPath, 'utf-8')

    const localeInfo: Record<string, {
      code: string
      name: string
      file: string
    }> = {}
    contentLocales.forEach((row) => {
      localeInfo[row.code] = row
    })

    // Processing other languages
    for (const locale of locales.filter(l => l !== sourceLang)) {
      const localePath = path.join(CONTENT_PATH, `${locale}.ts`)
      const targetData = await fs.readFile(localePath, 'utf-8')

      console.log(`Translating [${localeInfo[sourceLang]?.name || '??'} (${localeInfo[sourceLang]?.code || sourceLang})] to [${localeInfo[locale]?.name || '??'} (${localeInfo[locale]?.code || locale})] ...`)

      // Translation and update
      const translated = await translateText(
        mainData,
        targetData,
        `${localeInfo[sourceLang]?.name || '??'} (${localeInfo[sourceLang]?.code || sourceLang})`,
        `${localeInfo[locale]?.name || '??'} (${localeInfo[locale]?.code || locale})`
      )
      // Saving the updated file
      await fs.writeFile(localePath, translated + '\n')
      console.log(`✅  Successfully updated ${localePath}\n`)
    }
  } catch (error) {
    console.error('Error:', (error instanceof Error) ? error?.message : error)
  } finally {
    rl.close()
  }
}

main()
