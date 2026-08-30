import { describe, it, expect, expectTypeOf } from 'vitest'
import type { LinkProps } from '../../src/runtime/components/Link.vue'
import type { PageLink } from '../../src/runtime/components/PageLinks.vue'
import type { FooterColumnLink } from '../../src/runtime/components/FooterColumns.vue'
import type { ContentSearchLink } from '../../src/runtime/components/content/ContentSearch.vue'
import Button from '../../src/runtime/components/Button.vue'
import Link from '../../src/runtime/components/Link.vue'
import { linkKeys } from '../../src/runtime/utils/link-keys'

/**
 * Written out rather than using `toHaveProperty`, whose result on a type with
 * an index signature is not what it reads as.
 */
type HasIsAction<T> = 'isAction' extends keyof T ? true : false

/**
 * `isAction` belongs to `Link` alone.
 *
 * It restyles a link as Bitrix24's dashed "action" text, and `src/theme/link.ts`
 * is the only theme implementing it. It is deliberately absent from `linkKeys`,
 * so `pickLinkProps` never forwards it — which meant every type spreading
 * `LinkProps` advertised a prop a consumer could pass, that TypeScript
 * accepted, that Vue registered, and that changed nothing on screen. `Button`
 * carried it as a real runtime prop: 45 declared props, one of them dead.
 *
 * What can and cannot be asserted here, because it is not uniform:
 *
 *   - `ButtonProps`, `PageLink`, `FooterColumnLink` and `ContentSearchLink` have
 *     no index signature, so removing it from their `Omit` genuinely removes it.
 *   - `BreadcrumbItem`, `DropdownMenuItem`, `NavigationMenuItem`,
 *     `ContextMenuItem` and `CommandPaletteItem` each declare
 *     `[key: string]: any` so an item can carry arbitrary attributes. `keyof`
 *     therefore includes `string`, and no `Omit` can make `isAction` unassignable
 *     on them. Their `Omit` is a statement of intent that the compiler cannot
 *     enforce, which is why they are not asserted below — a test that cannot
 *     fail is worse than none.
 *
 * The two halves are also caught by different commands: the `expect` assertions
 * fail under `vitest run`, the `expectTypeOf` ones are erased at runtime and
 * only `vue-tsc` — `pnpm run typecheck` — checks them.
 */
describe('isAction is not inherited by components that cannot honour it', () => {
  it('Link keeps it, as a runtime prop and in its type', () => {
    expect(Object.keys((Link as any).props)).toContain('isAction')
    expectTypeOf<HasIsAction<LinkProps>>().toEqualTypeOf<true>()
  })

  it('is not forwarded, which is why nothing downstream could honour it', () => {
    expect(linkKeys).not.toContain('isAction')
  })

  it('Button no longer declares it at runtime', () => {
    expect(Object.keys((Button as any).props)).not.toContain('isAction')
  })

  it('the link-shaped item types that can be held to it do not declare it', () => {
    expectTypeOf<HasIsAction<PageLink>>().toEqualTypeOf<false>()
    expectTypeOf<HasIsAction<FooterColumnLink>>().toEqualTypeOf<false>()
    expectTypeOf<HasIsAction<ContentSearchLink>>().toEqualTypeOf<false>()
  })
})
