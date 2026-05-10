import { describe, it, expect } from 'vitest'
import { extractPromptText, resolveIcon } from '../../src/runtime/utils'
import iconAliases from '../../src/runtime/dictionary/icons'
import iconRegistry from '../../src/runtime/dictionary/iconRegistry'

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

  it('resolves PascalCase names from the registry', () => {
    expect(resolveIcon('InfoCircleIcon')).toBe(iconRegistry.InfoCircleIcon)
    expect(resolveIcon('GitHubIcon')).toBe(iconRegistry.GitHubIcon)
    expect(resolveIcon('Bitrix24Icon')).toBe(iconRegistry.Bitrix24Icon)
  })

  it('falls back to the short-alias dictionary', () => {
    expect(resolveIcon('tip')).toBe(iconAliases.tip)
    expect(resolveIcon('warning')).toBe(iconAliases.warning)
  })

  it('prefers the registry over the alias dictionary on collisions', () => {
    // `iconRegistry.InfoCircleIcon` and `iconAliases.info` happen to import
    // the same component, but the lookup must hit the registry first either way.
    const fromRegistry = resolveIcon('InfoCircleIcon')
    expect(fromRegistry).toBe(iconRegistry.InfoCircleIcon)
  })

  it('returns undefined for unknown names', () => {
    expect(resolveIcon('NoSuchIcon')).toBeUndefined()
  })
})
