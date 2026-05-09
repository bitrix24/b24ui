import { describe, it, expect } from 'vitest'
import { h, Fragment } from 'vue'
import { getSlotPromptText } from '../../src/runtime/utils'

describe('getSlotPromptText', () => {
  it('returns empty string for non-array input', () => {
    expect(getSlotPromptText(undefined)).toBe('')
    expect(getSlotPromptText(null)).toBe('')
  })

  it('extracts plain text from a single text node', () => {
    const nodes = [{ type: Symbol('Text'), children: 'Hello world' }]
    expect(getSlotPromptText(nodes)).toBe('Hello world')
  })

  it('inserts a paragraph break between <p> blocks', () => {
    const nodes = [
      h('p', null, 'First paragraph.'),
      h('p', null, 'Second paragraph.')
    ]
    expect(getSlotPromptText(nodes).trim()).toBe('First paragraph.\n\nSecond paragraph.')
  })

  it('preserves bullet structure for unordered lists', () => {
    const nodes = [
      h('p', null, 'Intro:'),
      h('ul', null, [
        h('li', null, 'First item'),
        h('li', null, 'Second item')
      ])
    ]
    expect(getSlotPromptText(nodes).trim()).toBe('Intro:\n\n- First item\n- Second item')
  })

  it('preserves inline code with backticks', () => {
    const nodes = [
      h('p', null, ['Use the ', h('code', null, 'b24-ui-nuxt'), ' skill.'])
    ]
    expect(getSlotPromptText(nodes).trim()).toBe('Use the `b24-ui-nuxt` skill.')
  })

  it('preserves links as markdown', () => {
    const nodes = [
      h('p', null, [
        'See ',
        h('a', { href: 'https://example.com' }, 'docs'),
        ' for details.'
      ])
    ]
    expect(getSlotPromptText(nodes).trim()).toBe('See [docs](https://example.com) for details.')
  })

  it('treats <br> as a single newline', () => {
    const nodes = [
      h('p', null, ['Line 1', h('br'), 'Line 2'])
    ]
    expect(getSlotPromptText(nodes).trim()).toBe('Line 1\nLine 2')
  })

  it('collapses 3+ consecutive newlines into a paragraph break', () => {
    const nodes = [
      h('blockquote', null, h('p', null, 'Quoted.')),
      h('p', null, 'Next.')
    ]
    expect(getSlotPromptText(nodes).trim()).toBe('Quoted.\n\nNext.')
  })

  it('walks Fragment children', () => {
    const nodes = [
      h(Fragment, null, [
        h('p', null, 'A'),
        h('p', null, 'B')
      ])
    ]
    expect(getSlotPromptText(nodes).trim()).toBe('A\n\nB')
  })

  it('handles a realistic prompt with paragraphs and a list', () => {
    const nodes = [
      h('p', null, ['Lean on the ', h('code', null, 'b24-ui-nuxt'), ' skill.']),
      h('p', null, 'Before writing any code:'),
      h('ul', null, [
        h('li', null, 'Which entity?'),
        h('li', null, 'What trigger?')
      ]),
      h('p', null, 'Then assemble the popover.')
    ]
    expect(getSlotPromptText(nodes).trim()).toBe(
      'Lean on the `b24-ui-nuxt` skill.\n\n'
      + 'Before writing any code:\n\n'
      + '- Which entity?\n'
      + '- What trigger?\n\n'
      + 'Then assemble the popover.'
    )
  })
})
