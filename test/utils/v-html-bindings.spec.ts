import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import { describe, it, expect, beforeAll } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * `v-html` writes its expression into the DOM without escaping, so every one of
 * them is a place where a mistake becomes stored XSS. There are exactly three
 * in the runtime, all in `CommandPalette`, and two of them used to end in a
 * fallback to the raw field:
 *
 *     v-html="item.labelHtml || get(item, props.labelKey as string)"
 *
 * That was dead code — the `v-if` on the same element tests the same scalar, so
 * the right-hand side could never be evaluated — which is exactly why it
 * survived a port and two years of review. It also means no render test can
 * catch its return: removing it changes no output, so nothing goes red either
 * way. A static check is the only thing that can, so this is that check.
 *
 * Deliberately also pins the *set* of bindings. A new `v-html` anywhere in the
 * runtime is a decision worth making on purpose, not one that arrives inside an
 * unrelated diff.
 */
const runtimeDir = join(process.cwd(), 'src', 'runtime')

/** Every `v-html`/`v-text` style binding, as `file -> expression`. */
async function collectVHtmlBindings() {
  const files = await glob('**/*.vue', { cwd: runtimeDir })
  const found: Array<{ file: string, expression: string }> = []

  for (const file of files.sort()) {
    const source = await readFile(join(runtimeDir, file), 'utf8')
    for (const match of source.matchAll(/v-html\s*=\s*"([^"]*)"|v-html\s*=\s*'([^']*)'/g)) {
      found.push({ file, expression: (match[1] ?? match[2] ?? '').trim() })
    }
  }

  return found
}

describe('v-html bindings in the runtime', () => {
  let bindings: Array<{ file: string, expression: string }>

  beforeAll(async () => {
    bindings = await collectVHtmlBindings()
    // Every assertion below passes vacuously on an empty scan, so prove the
    // source tree was actually found before trusting any of them.
    expect(bindings.length).toBeGreaterThan(0)
  })

  it('are only the three CommandPalette item bindings', () => {
    expect(bindings.map(({ file, expression }) => `${file}: ${expression}`)).toEqual([
      'components/CommandPalette.vue: item.labelHtml',
      'components/CommandPalette.vue: item.suffixHtml',
      'components/CommandPalette.vue: item.descriptionHtml'
    ])
  })

  it('never fall back to another value', () => {
    // `||` and `??` are how a raw, unescaped field gets in: the guarded
    // expression is fine, the thing after the operator is not.
    const withFallback = bindings.filter(({ expression }) => /\|\||\?\?/.test(expression))

    expect(withFallback).toEqual([])
  })
})
