import { describe, it, expect } from 'vitest'
import { extractPromptText, get, resolveIcon, set } from '../../src/runtime/utils'
import icons from '../../src/runtime/dictionary/icons'

function el(html: string): HTMLElement {
  const div = document.createElement('div')
  div.innerHTML = html
  return div
}

describe('extractPromptText', () => {
  it('returns empty string for null/undefined', () => {
    expect(extractPromptText(null)).toBe('')
    expect(extractPromptText(undefined)).toBe('')
  })

  it('extracts plain text from a single text node', () => {
    expect(extractPromptText(el('Hello world'))).toBe('Hello world')
  })

  it('inserts a paragraph break between <p> blocks', () => {
    expect(extractPromptText(el('<p>First paragraph.</p><p>Second paragraph.</p>')))
      .toBe('First paragraph.\n\nSecond paragraph.')
  })

  it('preserves bullet structure for unordered lists', () => {
    expect(extractPromptText(el('<p>Intro:</p><ul><li>First item</li><li>Second item</li></ul>')))
      .toBe('Intro:\n\n- First item\n- Second item')
  })

  it('preserves inline code with backticks', () => {
    expect(extractPromptText(el('<p>Use the <code>b24-ui-nuxt</code> skill.</p>')))
      .toBe('Use the `b24-ui-nuxt` skill.')
  })

  it('preserves links as markdown', () => {
    expect(extractPromptText(el('<p>See <a href="https://example.com">docs</a> for details.</p>')))
      .toBe('See [docs](https://example.com) for details.')
  })

  it('treats <br> as a single newline', () => {
    expect(extractPromptText(el('<p>Line 1<br>Line 2</p>')))
      .toBe('Line 1\nLine 2')
  })

  it('collapses runaway newlines from nested blocks', () => {
    expect(extractPromptText(el('<blockquote><p>Quoted.</p></blockquote><p>Next.</p>')))
      .toBe('Quoted.\n\nNext.')
  })

  it('handles a realistic prompt with paragraphs and a list', () => {
    const root = el(`
      <p>Lean on the <code>b24-ui-nuxt</code> skill.</p>
      <p>Before writing any code:</p>
      <ul>
        <li>Which entity?</li>
        <li>What trigger?</li>
      </ul>
      <p>Then assemble the popover.</p>
    `)
    expect(extractPromptText(root)).toBe(
      'Lean on the `b24-ui-nuxt` skill.\n\n'
      + 'Before writing any code:\n\n'
      + '- Which entity?\n'
      + '- What trigger?\n\n'
      + 'Then assemble the popover.'
    )
  })

  it('walks through prose-style wrapper components rendered as plain tags', () => {
    const root = el('<div data-slot="base"><p data-slot="base">A</p><ul data-slot="base"><li data-slot="base">B</li></ul></div>')
    expect(extractPromptText(root)).toBe('A\n\n- B')
  })

  it('reads from a hidden host element', () => {
    const host = el('<p>One.</p><p>Two.</p>')
    host.hidden = true
    expect(extractPromptText(host)).toBe('One.\n\nTwo.')
  })
})

describe('resolveIcon', () => {
  it('returns undefined for empty input', () => {
    expect(resolveIcon()).toBeUndefined()
    expect(resolveIcon(null)).toBeUndefined()
    expect(resolveIcon('')).toBeUndefined()
  })

  it('resolves PascalCase names exposed to markdown authors', () => {
    expect(resolveIcon('InfoCircleIcon')).toBe(icons.InfoCircleIcon)
    expect(resolveIcon('GitHubIcon')).toBe(icons.GitHubIcon)
    expect(resolveIcon('Bitrix24Icon')).toBe(icons.Bitrix24Icon)
  })

  it('resolves short camelCase aliases', () => {
    expect(resolveIcon('tip')).toBe(icons.tip)
    expect(resolveIcon('warning')).toBe(icons.warning)
  })

  it('returns undefined for unknown names', () => {
    expect(resolveIcon('NoSuchIcon')).toBeUndefined()
  })
})

/**
 * `get()` and `set()` are on the public `./utils` entry, so a consumer can hand
 * them a path this repository never chose. Nothing in `src/` calls `set()` at
 * all, and every `get()` path the components pass is a `labelKey` / `valueKey`
 * written by the application author — so these are not tests of a live
 * in-library exploit, they are the guard on an exported primitive.
 *
 * Three ways the old implementation wrote through to a shared prototype, all
 * covered below. The third is the one a denylist misses: `acc[key] ===
 * undefined` consulted the prototype chain, so an inherited member was walked
 * into rather than shadowed, and `set({}, 'toString.x', 1)` landed on
 * `Object.prototype.toString` without the path containing a reserved word.
 */
describe('get', () => {
  const source = { a: { b: { c: 'value' } }, list: [{ id: 1 }, { id: 2 }], zero: 0, empty: '' }

  it('reads a dotted path', () => {
    expect(get(source, 'a.b.c')).toBe('value')
  })

  it('reads an array path', () => {
    expect(get(source, ['a', 'b', 'c'])).toBe('value')
  })

  it('indexes into arrays through numeric segments', () => {
    expect(get(source, 'list.1.id')).toBe(2)
  })

  it('returns falsy values rather than the default', () => {
    expect(get(source, 'zero', 'fallback')).toBe(0)
    expect(get(source, 'empty', 'fallback')).toBe('')
  })

  it('returns the default for a missing path', () => {
    expect(get(source, 'a.b.missing', 'fallback')).toBe('fallback')
  })

  it('returns the default when the object is undefined', () => {
    expect(get(undefined, 'a.b', 'fallback')).toBe('fallback')
  })

  it('stops at a null segment instead of throwing', () => {
    expect(get({ a: null }, 'a.b.c', 'fallback')).toBe('fallback')
  })

  it.each(['__proto__', 'constructor', 'prototype'])('refuses to follow %s', (key) => {
    expect(get({}, key, 'fallback')).toBe('fallback')
    expect(get({}, `${key}.polluted`, 'fallback')).toBe('fallback')
  })

  it('still reads a legitimate key that shadows an inherited one', () => {
    expect(get({ toString: 'mine' }, 'toString')).toBe('mine')
  })
})

describe('set', () => {
  it('writes at a dotted path, creating what is missing', () => {
    const target: Record<string, any> = {}
    set(target, 'a.b.c', 'value')
    expect(target).toEqual({ a: { b: { c: 'value' } } })
  })

  it('writes at an array path', () => {
    const target: Record<string, any> = {}
    set(target, ['a', 'b'], 'value')
    expect(target).toEqual({ a: { b: 'value' } })
  })

  it('overwrites an existing value without disturbing its siblings', () => {
    const target: Record<string, any> = { a: { b: 'old', keep: 'kept' } }
    set(target, 'a.b', 'new')
    expect(target).toEqual({ a: { b: 'new', keep: 'kept' } })
  })

  it('descends into an existing own key rather than replacing it', () => {
    const target: Record<string, any> = { a: { existing: 1 } }
    set(target, 'a.added', 2)
    expect(target.a).toEqual({ existing: 1, added: 2 })
  })

  it('creates through an own key that is explicitly undefined', () => {
    const target: Record<string, any> = { a: undefined }
    set(target, 'a.b', 'value')
    expect(target).toEqual({ a: { b: 'value' } })
  })

  it.each(['__proto__', 'constructor', 'prototype'])('throws on %s anywhere in the path', (key) => {
    expect(() => set({}, `${key}.polluted`, 'yes')).toThrow(TypeError)
    expect(() => set({}, `a.${key}.polluted`, 'yes')).toThrow(TypeError)
    expect(() => set({}, ['a', key, 'polluted'], 'yes')).toThrow(TypeError)
  })

  it('leaves Object.prototype untouched after a rejected write', () => {
    expect(() => set({}, '__proto__.polluted', 'yes')).toThrow(TypeError)

    expect(({} as Record<string, any>).polluted).toBeUndefined()
    expect(Object.prototype).not.toHaveProperty('polluted')
  })

  it('shadows an inherited member instead of writing onto the shared intrinsic', () => {
    const target: Record<string, any> = {}
    set(target, 'toString.nested', 'yes')

    // The write must have landed on `target`'s own fresh object...
    expect(target.toString).toEqual({ nested: 'yes' })
    // ...and not on the function every object in the process shares.
    expect(Object.prototype.toString).not.toHaveProperty('nested')
  })

  it.each(['valueOf', 'hasOwnProperty', 'isPrototypeOf'])('shadows the inherited %s the same way', (key) => {
    const target: Record<string, any> = {}
    set(target, `${key}.nested`, 'yes')

    expect(target[key]).toEqual({ nested: 'yes' })
    expect((Object.prototype as Record<string, any>)[key]).not.toHaveProperty('nested')
  })
})
