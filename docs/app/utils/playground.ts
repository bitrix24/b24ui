import { zlibSync, strToU8, strFromU8 } from 'fflate'

/**
 * Serializes Vue SFC code into a bitrix24.github.io/b24ui/play URL.
 * Uses the same encoding format as @vue/repl (fflate zlib + base64).
 */
export function getPlaygroundUrl(code: string): string {
  const files = JSON.stringify({ 'App.vue': code })
  const buffer = strToU8(files)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return `https://bitrix24.github.io/b24ui/play/#${btoa(binary)}`
}
