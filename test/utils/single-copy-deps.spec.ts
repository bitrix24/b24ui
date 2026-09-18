import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'

/**
 * Some packages break by being installed twice rather than by being the wrong
 * version, and nothing in the ordinary gate can see it: two copies typecheck,
 * two copies build, and two copies pass every component test. The failure shows
 * up as an `instanceof` that is false across a boundary, or as tooling reading a
 * different module instance than the one the runtime registered.
 *
 * `pnpm-workspace.yaml` carries a pin for each of these with the reason written
 * above it. This is the other half: the pins say how to keep one copy, and this
 * says what "one copy" means, so a pin that stops being load-bearing can be
 * removed against evidence instead of being kept out of superstition — and so
 * removing one cannot quietly give the duplicate back.
 *
 * `@nuxtjs/mdc` is here because its override was removed once the pnpm catalog
 * made it redundant. The override existed because two copies mean
 * `nuxt-component-meta` reads different components than the ones the module
 * registers; that failure mode did not go away, only the need to force the
 * resolution by hand did.
 */
const lockfile = readFileSync(resolve(process.cwd(), 'pnpm-lock.yaml'), 'utf-8')

/** Every version the lockfile resolves for a package, from its top-level keys. */
function resolvedVersions(name: string): string[] {
  // Top-level `packages:` / `snapshots:` keys, which are `name@version` with an
  // optional peer suffix. Quoted when the name is scoped.
  const pattern = new RegExp(`^ {2}'?${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}@(\\d[^'(:]*)`, 'gm')
  return [...new Set([...lockfile.matchAll(pattern)].map(match => match[1]!))].sort()
}

describe('packages that must resolve to a single copy', () => {
  it('reads a lockfile worth checking against', () => {
    // Every assertion below is vacuous against an empty or unparsed read.
    expect(lockfile.length).toBeGreaterThan(100_000)
    expect(resolvedVersions('vue').length).toBeGreaterThan(0)
  })

  it.each([
    // Two copies make `nuxt-component-meta` read different components than the
    // ones the module registers. Held by the `@nuxt/content>@nuxtjs/mdc`
    // override until the pnpm catalog made every workspace member ask for the
    // same `@nuxt/content`, which the root's deliberately wide `^3.0.0` peer
    // then dedupes onto.
    ['@nuxtjs/mdc'],
    // ProseMirror state stops being `instanceof` across the boundary.
    ['prosemirror-view'],
    ['@tiptap/pm']
  ])('%s resolves to exactly one version', (name) => {
    expect(resolvedVersions(name)).toHaveLength(1)
  })
})
