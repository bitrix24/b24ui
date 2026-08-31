import { describe, it, expect } from 'vitest'
import type { ContentNavigationItem } from '@nuxt/content'
import { mapContentNavigation, mapContentNavigationItem } from '../../src/runtime/utils/content'

/**
 * Turns `@nuxt/content`'s navigation tree into the item shape the navigation
 * components take — which is to say, it builds the sidebar of any docs site
 * built on this kit. Nothing exercised it before.
 *
 * The rename is the whole of it: `title` becomes `label` and `path` becomes
 * `to`, because that is what `NavigationMenu` and friends read. Get it wrong
 * and the sidebar renders a column of blank, unclickable rows.
 */
describe('mapContentNavigationItem', () => {
  const entry = (over: Partial<ContentNavigationItem> = {}) =>
    ({ title: 'Getting started', path: '/docs/start', ...over }) as ContentNavigationItem

  it('renames title to label and path to to', () => {
    expect(mapContentNavigationItem(entry())).toMatchObject({
      label: 'Getting started',
      to: '/docs/start'
    })
  })

  it('drops the original keys rather than carrying both', () => {
    const link = mapContentNavigationItem(entry())

    expect(link).not.toHaveProperty('title')
    expect(link).not.toHaveProperty('path')
  })

  it('carries every other key through untouched', () => {
    const link = mapContentNavigationItem(entry({ icon: 'i-lucide-home', badge: 'new' } as any))

    expect(link).toMatchObject({ icon: 'i-lucide-home', badge: 'new' })
  })

  it('takes the label from labelAttribute when one is given', () => {
    const link = mapContentNavigationItem(entry({ navTitle: 'Start here' } as any), { labelAttribute: 'navTitle' })

    // `title` is no longer the mapped key, so it stays under its own name.
    expect(link).toMatchObject({ label: 'Start here', title: 'Getting started' })
  })

  it('skips falsy values, so an empty title does not produce an empty label', () => {
    const link = mapContentNavigationItem(entry({ title: '' }))

    expect(link).not.toHaveProperty('label')
  })

  describe('children', () => {
    const nested = entry({
      children: [entry({ title: 'Install', path: '/docs/install', children: [entry({ title: 'CLI', path: '/docs/install/cli' })] })]
    })

    it('recurses, renaming at every level', () => {
      const link = mapContentNavigationItem(nested)

      expect(link.children?.[0]).toMatchObject({ label: 'Install', to: '/docs/install' })
      expect((link.children?.[0] as any).children[0]).toMatchObject({ label: 'CLI', to: '/docs/install/cli' })
    })

    it('always sets children, so a leaf is an empty array rather than absent', () => {
      expect(mapContentNavigationItem(entry()).children).toEqual([])
    })

    it('stops at the depth `deep` names', () => {
      const link = mapContentNavigationItem(nested, { deep: 1 })

      expect(link.children).toHaveLength(1)
      // Depth 1 is the last level walked; its own children are cut.
      expect(link.children?.[0]?.children).toEqual([])
    })

    it('flattens to a list of roots at deep: 0', () => {
      expect(mapContentNavigationItem(nested, { deep: 0 }).children).toEqual([])
    })
  })
})

describe('mapContentNavigation', () => {
  it('maps a whole tree and keeps its order', () => {
    const result = mapContentNavigation([
      { title: 'One', path: '/one' },
      { title: 'Two', path: '/two' }
    ] as ContentNavigationItem[])

    expect(result.map(item => item.label)).toEqual(['One', 'Two'])
    expect(result.map(item => item.to)).toEqual(['/one', '/two'])
  })

  it('passes its options down', () => {
    const result = mapContentNavigation(
      [{ navTitle: 'Renamed', title: 'Original', path: '/x' }] as unknown as ContentNavigationItem[],
      { labelAttribute: 'navTitle' }
    )

    expect(result[0]).toMatchObject({ label: 'Renamed' })
  })
})
