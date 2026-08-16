import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useContentSearch } from '../../src/runtime/composables/useContentSearch'
import CommandPalette from '../../src/runtime/components/CommandPalette.vue'
import type { ContentSearchFile, ContentSearchResult } from '../../src/runtime/components/content/ContentSearch.vue'

describe('useContentSearch', () => {
  // Angle brackets are ordinary in indexed documentation — generics, JSX, XML,
  // shell redirection, comparison operators. This composable used to escape
  // them by hand before handing the text to `CommandPalette` (#406).
  const GENERICS = 'Array<string> and Map<K, V>'
  const ESCAPED = 'Array&lt;string&gt; and Map&lt;K, V&gt;'

  describe('escaping is left to the sink', () => {
    it('maps a file without escaping its content', () => {
      const { mapFile } = useContentSearch()
      const file: ContentSearchFile = { id: '/docs#x', title: 'X', titles: [], level: 2, content: GENERICS }

      const item = mapFile(file, { path: '/docs', title: 'Docs' } as any)

      expect(item.suffix).toBe(GENERICS)
      expect(item.suffix).not.toBe(ESCAPED)
    })

    it('maps a search result without escaping its content', () => {
      const { mapSearchResults } = useContentSearch()
      const result: ContentSearchResult = { id: '/docs#y', title: 'Y', titles: [], level: 2, content: GENERICS }

      const [item] = mapSearchResults([result], [])

      expect(item!.description).toBe(GENERICS)
      expect(item!.description).not.toBe(ESCAPED)
    })
  })

  describe('what the reader ends up seeing', () => {
    // The reason the manual escaping was wrong rather than merely redundant:
    // `CommandPalette` renders these two fields through `{{ }}`, which builds a
    // text node, and a text node never decodes entities. A pre-escaped `&lt;`
    // arrived as those four characters on screen. The `v-html` sibling is no
    // better — `highlight()` escapes again, and `v-html` decodes one level back
    // to the same wrong thing.
    // Rendered from what `mapFile` actually produces, not from a hand-built
    // item. Constructing the item here instead would leave the composable
    // untouched, so re-adding the escaping would sail past these.
    async function paletteFor(content: string) {
      const { mapFile } = useContentSearch()
      const file: ContentSearchFile = { id: '/docs#x', title: 'X', titles: [], level: 2, content }
      const item = mapFile(file, { path: '/docs', title: 'Docs' } as any)

      return mountSuspended(CommandPalette, {
        props: { groups: [{ id: 'g', items: [item] }] } as any
      })
    }

    it('shows the angle brackets the author wrote', async () => {
      const wrapper = await paletteFor(GENERICS)

      expect(wrapper.text()).toContain(GENERICS)
      expect(wrapper.text()).not.toContain('&lt;')
    })

    it('still renders an injected tag as text, since the sink is what escapes', async () => {
      // Removing the manual escaping removes a *second* escape, not the only
      // one. This is the assertion that says so.
      const wrapper = await paletteFor('<img src=x onerror=alert(1)>')

      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.html()).toContain('&lt;img')
      expect(wrapper.html()).not.toContain('<img')
    })
  })
})
