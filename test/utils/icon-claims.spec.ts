import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { glob } from 'tinyglobby'

/**
 * Every `icons.<key>` a component's jsDoc promises must actually be reachable
 * from that component.
 *
 * These promises are load-bearing: `@defaultValue icons.close` is what tells a
 * consumer the icon is overridable through `dictionary/icons.ts`, and it is
 * what a porter reads when an upstream commit changes that key. Three of them
 * were false — `Badge` documented `icons.close` while rendering a hardcoded
 * `actions/Cross20Icon`, `Button` documented a component name as if it were a
 * key, and `ChatTool` documented `icons.loading` for a prop that defaults to
 * `specialized/SpinnerIcon`. Nothing failed, because a comment cannot.
 *
 * Reachability, not locality: `DropdownMenu` legitimately documents
 * `@defaultValue icons.check` for a prop it forwards to
 * `DropdownMenuContent.vue`, which is where the dictionary is read. So a claim
 * counts as honoured if the key is used in the component itself or in any
 * component it renders.
 */

const componentsDir = resolve(process.cwd(), 'src/runtime/components')

const files = await glob('**/*.vue', { cwd: componentsDir })

/**
 * Keyed by path, not by basename: eight components have a same-named twin under
 * `prose/` (`Badge`, `Card`, `Accordion`, `Table`, `Collapsible`, `Kbd`,
 * `FieldGroup`, `Tabs`). Keying by basename silently drops one of each pair,
 * and a check that skips half its input still passes.
 */
const sources = new Map(files.map(file => [file, readFileSync(resolve(componentsDir, file), 'utf-8')]))

/** Basename -> every source with that name, for resolving a `<B24Foo` tag. */
const byName = new Map<string, string[]>()
for (const [file, source] of sources) {
  const name = file.split('/').pop()!.replace('.vue', '')
  byName.set(name, [...(byName.get(name) ?? []), source])
}

/** Splits a SFC into its comment lines and everything else. */
function partition(source: string) {
  const comments: string[] = []
  const code: string[] = []
  for (const line of source.split('\n')) {
    ;(line.trim().startsWith('*') || line.trim().startsWith('//') ? comments : code).push(line)
  }
  return { comments: comments.join('\n'), code: code.join('\n') }
}

/**
 * `icons.<key>` written in prose. `icons.ts` is excluded because
 * `prose/Prompt.vue` refers to the dictionary *file* — a filename, not a key.
 */
const claimed = (comments: string) =>
  new Set([...comments.matchAll(/\bicons\.(\w+)/g)].map(match => match[1]!).filter(key => key !== 'ts'))

const used = (code: string) => new Set([...code.matchAll(/\bicons\.(\w+)/g)].map(match => match[1]!))

/** Child components this one renders, as `<B24Foo` / `<Foo` tag names. */
const rendered = (code: string) =>
  new Set([...code.matchAll(/<(?:B24)?([A-Z]\w+)/g)].map(match => match[1]!))

describe('icon claims in component jsDoc', () => {
  it('finds the components to check', () => {
    // Every assertion below passes vacuously on an empty glob.
    expect(sources.size).toBeGreaterThan(50)
  })

  it('finds jsDoc claims to check', () => {
    const total = [...sources.values()].reduce((sum, source) => sum + claimed(partition(source).comments).size, 0)
    expect(total).toBeGreaterThan(10)
  })

  it('honours every `icons.<key>` its jsDoc promises', () => {
    const broken: string[] = []

    for (const [file, source] of sources) {
      const { comments, code } = partition(source)
      const promises = claimed(comments)
      if (!promises.size) continue

      // The component itself, plus anything it renders — one hop is enough for
      // the forwarding pattern and keeps this from becoming a graph walk.
      const reachable = new Set(used(code))
      for (const child of rendered(code)) {
        for (const childSource of byName.get(child) ?? []) {
          for (const key of used(partition(childSource).code)) reachable.add(key)
        }
      }

      for (const key of [...promises].sort()) {
        if (!reachable.has(key)) broken.push(`${file}: jsDoc promises icons.${key}, nothing reachable uses it`)
      }
    }

    // Named rather than counted — the failure has to say which promise is empty.
    expect(broken.sort()).toEqual([])
  })
})
