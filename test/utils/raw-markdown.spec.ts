import { describe, it, expect } from 'vitest'
import { stringify } from 'minimark/stringify'
import { pipeTable, fencedBlock } from '../../docs/server/utils/markdown'

/**
 * `/raw/**.md` is what this library serves to agents, and what
 * `skills/b24-ui-nuxt/references/components.md` links to. It is produced by
 * `minimark/stringify` in its `markdown/html` format, which has two gaps:
 * no pipe-table handler, so a `table` node comes out as HTML; and a `pre`
 * handler that always opens a three-backtick fence, which code carrying
 * fences of its own breaks out of.
 *
 * Both gaps were measured on the stringifier itself before this was written,
 * and both were present in the shipped output — 28 content files carry
 * markdown tables and 7 write four-backtick fences.
 *
 * The assertions run against the real `stringify`, not against a description
 * of it. That matters: the defect lives in the dependency, so a test that only
 * checked our builders' return values would keep passing if minimark changed
 * under us and the workaround became wrong.
 */

const doc = (children: any[]) => ({ type: 'minimark' as const, value: children })
const render = (children: any[]) => stringify(doc(children) as any, { format: 'markdown/html' })

const table = (rows: any[][]) => [
  'table',
  {},
  ['thead', {}, ['tr', {}, ...rows[0]!.map(c => ['th', {}, c])]],
  ['tbody', {}, ...rows.slice(1).map(r => ['tr', {}, ...r.map(c => ['td', {}, c])])]
]

describe('raw markdown served to agents', () => {
  describe('the stringifier gaps this works around', () => {
    it('writes a table as HTML on its own', () => {
      // The premise. If this ever fails, minimark grew a table handler and the
      // `pipeTable` pass in transformMDC.ts is dead weight rather than a fix.
      expect(render([table([['Prop'], ['color']])])).toContain('<table>')
    })

    it('breaks out of a code block holding its own fences', () => {
      const code = 'before\n```\ninside\n```\nafter\n'
      const out = render([['pre', { code, language: 'md' }]])

      // Four fence lines where the block should have two: the inner pair closes
      // and reopens it, so `inside` is prose and `after` is a second block.
      expect(out.match(/^```/gm)?.length).toBe(4)
    })
  })

  describe('pipeTable', () => {
    it('renders a GFM table with a header separator', () => {
      expect(pipeTable(table([['Name', 'Type'], ['color', 'string']]))).toBe(
        '| Name | Type |\n| --- | --- |\n| color | string |'
      )
    })

    it('escapes pipes inside a code span so the cell survives', () => {
      // `Ref<T> | undefined` is a real prop type in the Table docs, and an
      // unescaped pipe there splits one cell into two and shifts the whole row.
      const rendered = pipeTable(table([['Type'], [['code', {}, 'Ref<T> | undefined']]]))

      expect(rendered).toContain('`Ref<T> \\| undefined`')
      expect(rendered.split('\n').at(-1)!.match(/(?<!\\)\|/g)).toHaveLength(2)
    })

    it('keeps a link as a link', () => {
      // The reason the table pass runs after `processLinks` in transformMDC.ts:
      // once a cell is text, nothing rewrites the href inside it.
      expect(pipeTable(table([['Doc'], [['a', { href: 'https://example.com/x' }, 'x']]])))
        .toContain('[x](https://example.com/x)')
    })

    it('pads a short row rather than dropping its cells', () => {
      const rendered = pipeTable(table([['A', 'B'], ['only']]))

      expect(rendered.split('\n').at(-1)).toBe('| only |  |')
    })
  })

  describe('fencedBlock', () => {
    it('opens a fence longer than any run inside the code', () => {
      const out = fencedBlock('a\n```\nb\n```\nc', 'md')

      expect(out.startsWith('````md')).toBe(true)
      expect(out.endsWith('````')).toBe(true)
    })

    it('grows past a longer inner run too', () => {
      expect(fencedBlock('x\n`````\ny', 'ts').startsWith('``````ts')).toBe(true)
    })

    it('stays at three backticks when nothing inside needs more', () => {
      // The pass only replaces a `pre` whose code contains ```, so this is the
      // shape a caller reaching for it directly would get; widening every fence
      // would be a diff across every code block in the docs.
      expect(fencedBlock('const a = 1', 'ts').startsWith('```ts')).toBe(true)
    })

    it('carries the filename label the docs use', () => {
      expect(fencedBlock('a', 'ts', 'app.config.ts')).toContain('```ts [app.config.ts]')
    })
  })

  describe('the result, through the stringifier', () => {
    it('emits no HTML table once the node is replaced', () => {
      const rendered = pipeTable(table([['Name'], ['color']]))
      const out = render([['p', {}, rendered]])

      expect(out).not.toContain('<table>')
      expect(out).toContain('| Name |')
    })

    it('keeps a self-fencing block in one piece', () => {
      const code = 'before\n```\ninside\n```\nafter\n'
      const out = render([['p', {}, fencedBlock(code, 'md')]])

      // Two fence lines, not four: the outer pair is longer than the inner one.
      expect(out.match(/^````/gm)?.length).toBe(2)
      expect(out).toContain('inside')
    })
  })
})
