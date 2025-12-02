import { createHighlighter } from 'shiki'
import type { HighlighterGeneric } from 'shiki'
import { createJavaScriptRegexEngine } from 'shiki/engine-javascript.mjs'

/**
 * @see https://github.com/nuxt-modules/mcp-toolkit/blob/main/apps/docs/app/composables/useHighlighter.ts
 */

let highlighter: HighlighterGeneric<any, any> | null = null
let promise: Promise<HighlighterGeneric<any, any>> | null = null

export const useHighlighter = async () => {
  if (!promise) {
    promise = createHighlighter({
      langs: ['bash', 'html', 'js', 'ts', 'typescript', 'diff', 'vue', 'json', 'yml', 'css', 'mdc', 'blade', 'edge', 'yaml', 'markdown'],
      themes: ['material-theme-palenight', 'material-theme-lighter'],
      engine: createJavaScriptRegexEngine()
    })
  }
  if (!highlighter) {
    highlighter = await promise
  }

  return highlighter
}
