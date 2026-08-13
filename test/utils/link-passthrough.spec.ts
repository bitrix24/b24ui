import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { linkKeys } from '../../src/runtime/utils/link-keys'

/**
 * `OWN_LINK_KEYS` in `docs/server/utils/componentMeta.ts` is a *derived* list:
 * it is `linkKeys` minus the `LinkPropsKeys` union in
 * `src/runtime/components/Link.vue`, plus `active`, which Button documents as
 * its own prop alongside `activeColor`. Its complement is what the docs split
 * into the "Props inherited from the Link component" group, so a key on the
 * wrong side files a Button prop under Link, or buries a Link prop in Button's
 * own surface.
 *
 * Three files have to agree and none of them import the others' list: adding a
 * prop to `LinkPropsKeys` without touching `OWN_LINK_KEYS` moves a prop between
 * the groups with nothing to say so, and the docs still build.
 *
 * `componentMeta.ts` is read as text rather than imported: it pulls in
 * `docs/.nuxt/b24ui`, which only exists after the docs app has been prepared,
 * and this spec has no business depending on that.
 */

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf-8')

/** The `OWN_LINK_KEYS = [...] as const` literal, as written. */
const ownLinkKeys = (() => {
  const block = read('docs/server/utils/componentMeta.ts')
    .match(/export const OWN_LINK_KEYS = \[([^\]]+)\] as const/)?.[1]
  return block ? [...block.matchAll(/'([^']+)'/g)].map(match => match[1]!) : []
})()

/** The `LinkPropsKeys` union in `Link.vue`, as written. */
const linkPropsKeys = (() => {
  const line = read('src/runtime/components/Link.vue')
    .match(/export type LinkPropsKeys = (.+)$/m)?.[1]
  return line ? [...line.matchAll(/'([^']+)'/g)].map(match => match[1]!) : []
})()

/** Documented in `OWN_LINK_KEYS`' own jsDoc as the one deliberate addition. */
const DELIBERATE_ADDITIONS = ['active']

describe('Link passthrough partition', () => {
  it('reads all three lists', () => {
    // Two of these are parsed out of source text; an empty parse would make
    // every comparison below pass on nothing.
    expect(linkKeys.length).toBeGreaterThan(30)
    expect(ownLinkKeys.length).toBeGreaterThan(10)
    expect(linkPropsKeys.length).toBeGreaterThan(20)
  })

  it('derives `OWN_LINK_KEYS` from `linkKeys` and `LinkPropsKeys`', () => {
    const expected = [
      ...linkKeys.filter(key => !linkPropsKeys.includes(key)),
      ...DELIBERATE_ADDITIONS
    ].sort()

    // Sorted arrays so the failure names the key that moved, not two lengths.
    expect([...ownLinkKeys].sort()).toEqual(expected)
  })

  it('keeps `OWN_LINK_KEYS` sorted, so a new entry lands where a reader looks', () => {
    expect(ownLinkKeys).toEqual([...ownLinkKeys].sort())
  })

  it('names only keys that exist in `linkKeys`', () => {
    // A typo here silently leaves the key in the inherited group forever.
    expect(ownLinkKeys.filter(key => !(linkKeys as readonly string[]).includes(key))).toEqual([])
  })

  it('leaves `to` and `href` on the inherited side, which is what triggers the split', () => {
    // `hasLinkPassthrough` keys off both being present; if either were claimed
    // as an own prop the grouping would still run but read as if Button
    // defined the link surface itself.
    expect(ownLinkKeys).not.toContain('to')
    expect(ownLinkKeys).not.toContain('href')
  })

  it('re-exports `linkKeys` from `link.ts`, which is where the runtime reads it', () => {
    // The list was extracted so the docs server could import it without pulling
    // in `@vueuse/core` and `ohash`; `link.ts` keeps the original entry point.
    expect(read('src/runtime/utils/link.ts')).toMatch(/export \{ linkKeys \}/)
  })
})
