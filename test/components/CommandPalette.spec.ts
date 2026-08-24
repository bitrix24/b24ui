import { describe, it, expect, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { renderEach } from '../component-render'
import CommandPalette from '../../src/runtime/components/CommandPalette.vue'
import theme from '#build/b24ui/command-palette'
import SignIcon from '@bitrix24/b24icons-vue/main/SignIcon'
import Cross30Icon from '@bitrix24/b24icons-vue/actions/Cross30Icon'

describe('CommandPalette', () => {
  const sizes = Object.keys(theme.variants.size) as any

  const groups = [
    {
      id: 'actions',
      items: [{
        label: 'Add new file',
        suffix: 'Create a new file in the current directory or workspace.',
        icon: SignIcon,
        kbds: ['meta', 'N'],
        active: true
      },
      {
        label: 'Add new folder',
        suffix: 'Create a new folder in the current directory or workspace.',
        icon: Cross30Icon,
        kbds: ['meta', 'F']
      },
      {
        label: 'Add hashtag',
        suffix: 'Add a hashtag to the current item.',
        icon: SignIcon,
        kbds: ['meta', 'H'],
        disabled: true
      },
      {
        label: 'Add label',
        suffix: 'Add a label to the current item.',
        icon: Cross30Icon,
        kbds: ['meta', 'L'],
        slot: 'custom'
      }
      ]
    },
    {
      id: 'labels',
      label: 'Labels',
      items: [
        {
          label: 'bug',
          chip: {
            color: 'air-primary-alert' as const
          }
        },
        {
          label: 'feature',
          chip: {
            color: 'air-primary-success' as const
          }
        },
        {
          label: 'enhancement',
          chip: {
            color: 'air-secondary' as const
          }
        }
      ]
    },
    {
      id: 'users',
      label: 'Users',
      items: [{
        label: 'bitrix24',
        avatar: {
          src: 'https://github.com/bitrix24.png',
          alt: 'Some User'
        },
        to: 'https://github.com/bitrix24',
        target: '_blank'
      }]
    }
  ]

  const groupsWithDescription = [{
    id: 'actions',
    items: [{
      label: 'Create Project',
      description: 'Start a new project from scratch',
      icon: SignIcon,
      kbds: ['meta', 'N']
    }, {
      label: 'Open File',
      description: 'Browse and open an existing file',
      icon: Cross30Icon,
      kbds: ['meta', 'O']
    }, {
      label: 'Settings',
      description: 'Configure your preferences',
      icon: SignIcon,
      kbds: ['meta', ',']
    }]
  }, {
    id: 'recent',
    label: 'Recent Files',
    items: [{
      label: 'index.vue',
      description: '/src/pages/index.vue',
      icon: Cross30Icon
    }, {
      label: 'app.vue',
      description: '/app.vue',
      icon: SignIcon
    }]
  }]

  const groupsWithSlot = groups.map(g => g.id === 'users' ? { ...g, slot: 'users' } : g)

  const props = { groups }

  renderEach(CommandPalette, [
    // Props
    ['with groups', { props }],
    ['with groups with description', { props: { groups: groupsWithDescription } }],
    ['without groups', {}],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { ...props, size } }]),
    ['with modelValue', { props: { ...props, modelValue: groups[2]?.items[0] } }],
    ['with defaultValue', { props: { ...props, defaultValue: groups[2]?.items[0] } }],
    ['with searchTerm', { props: { ...props, searchTerm: 'f' } }],
    ['with searchTerm and preserveGroupOrder', { props: { ...props, searchTerm: 'f', preserveGroupOrder: true } }],
    ['with valueKey', { props: { ...props, valueKey: 'label', defaultValue: 'Add new file' } }],
    ['with by', { props: { ...props, by: 'label', defaultValue: groups[0]?.items[0] } }],
    ['with labelKey', { props: { ...props, labelKey: 'icon' } }],
    ['with descriptionKey', { props: { groups: groupsWithDescription, descriptionKey: 'label' } }],
    ['with placeholder', { props: { ...props, placeholder: 'Search...' } }],
    ['with disabled', { props: { ...props, disabled: true } }],
    ['with icon', { props: { ...props, icon: Cross30Icon } }],
    ['with trailingIcon', { props: { ...props, trailingIcon: SignIcon } }],
    ['with childrenIcon', { props: { ...props, childrenIcon: Cross30Icon } }],
    ['with loading', { props: { ...props, loading: true } }],
    /** @memo not use loadingIcon */
    // ['with loadingIcon', { props: { ...props, loading: true, loadingIcon: SignIcon } }],
    ['with selectedIcon', { props: { ...props, selectedIcon: Cross30Icon, modelValue: groups[2]?.items[0] } }],
    ['with close', { props: { ...props, close: true } }],
    ['with closeIcon', { props: { ...props, close: true, closeIcon: SignIcon } }],
    ['with virtualize', { props: { ...props, virtualize: true } }],
    ['without input', { props: { ...props, input: false } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'divide-(--ui-color-accent-main-success)' } }],
    ['with b24ui', { props: { ...props, b24ui: { input: '[&>input]:h-10' } } }],
    ['with item color', { props: { groups: [{ id: 'team', label: 'Team', items: [{ label: 'Engineer', avatar: { src: 'https://github.com/bitrix24.png' }, color: 'air-primary' as const }, { label: 'Designer', avatar: { src: 'https://github.com/bitrix24.png' }, color: 'air-primary-success' as const }] }] } }],
    // Slots
    // A `searchTerm` nothing matches, without which there is no empty state
    // and the slot never renders (#454). Inherited from upstream, whose case
    // omits it too.
    ['with empty slot', { props: { ...props, searchTerm: 'zzzznomatch' }, slots: { empty: () => 'Empty slot' } }],
    ['with item slot', { props, slots: { item: () => 'Item slot' } }],
    ['with item-leading slot', { props, slots: { 'item-leading': () => 'Item leading slot' } }],
    ['with item-label slot', { props, slots: { 'item-label': () => 'Item label slot' } }],
    ['with item-description slot', { props: { groups: groupsWithDescription }, slots: { 'item-description': () => 'Item description slot' } }],
    ['with item-trailing slot', { props, slots: { 'item-trailing': () => 'Item trailing slot' } }],
    ['with custom slot', { props, slots: { custom: () => 'Custom slot' } }],
    ['with group-label slot', { props, slots: { 'group-label': () => 'Group label slot' } }],
    ['with users-group-label slot', { props: { groups: groupsWithSlot }, slots: { 'users-group-label': () => 'Users group label slot' } }],
    ['with close slot', { props: { ...props, close: true }, slots: { close: () => 'Close slot' } }],
    ['with footer slot', { props, slots: { footer: () => 'Footer slot' } }]
  ])

  describe('item markup is never rendered as HTML', () => {
    // Three `v-html` bindings render an item's label, suffix and description,
    // and each is guarded by a `v-if` on the same `*Html` value. Two of them
    // used to carry a fallback — `v-html="item.labelHtml || get(item, labelKey)"`
    // — that would have put the raw field straight into `v-html`. It was dead
    // code, because a `v-if` and a `v-html` reading the same scalar can never
    // disagree, so removing it changes no rendered output and **no test here
    // fails against the old source**. What these cases pin down is the property
    // itself, in the two configurations a reader actually cares about:
    //
    //  - with no `*Html` set — the default, since the component does not enable
    //    Fuse's `includeMatches`, so `highlight()` returns undefined — the field
    //    goes through the `v-else` branch and Vue's `{{ }}` escaping. These also
    //    turn red if someone widens a `v-if` to admit the raw field, which is
    //    the realistic way the removed fallback would have come back to life.
    //  - with `*Html` set, exercising the `v-html` sink for real.
    //
    // Worth stating plainly, because the sink is not unconditionally guarded:
    // `processGroupItems` does `item.labelHtml ?? highlight(...)`, so a caller
    // that sets `labelHtml` itself skips `highlight()` entirely and owns the
    // escaping. `useContentSearch` is the in-house example, and it routes
    // everything through `sanitizeSnippet()`.
    const PAYLOAD = '<img src=x onerror="alert(1)">'

    it('escapes a raw label rather than parsing it', async () => {
      const wrapper = await mountSuspended(CommandPalette, {
        props: { groups: [{ id: 'g', items: [{ label: PAYLOAD }] }] } as any
      })

      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.html()).toContain('&lt;img')
    })

    it('escapes a raw suffix rather than parsing it', async () => {
      const wrapper = await mountSuspended(CommandPalette, {
        props: { groups: [{ id: 'g', items: [{ label: 'safe', suffix: PAYLOAD }] }] } as any
      })

      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.html()).toContain('&lt;img')
    })

    it('escapes a raw description rather than parsing it', async () => {
      const wrapper = await mountSuspended(CommandPalette, {
        props: { groups: [{ id: 'g', items: [{ label: 'safe', description: PAYLOAD }] }] } as any
      })

      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.html()).toContain('&lt;img')
    })

    // Shaped like `highlight()`/`sanitizeSnippet()` output rather than produced
    // by calling them — everything escaped, `<mark>` around the match. `<mark>`
    // must survive as markup, since rendering it is the entire reason these
    // bindings use `v-html`, while the payload next to it stays inert.
    const HIGHLIGHTED = '<mark>hit</mark>&lt;img src=x&gt;'

    it.each([
      ['labelHtml', { label: 'ignored', labelHtml: HIGHLIGHTED }],
      ['suffixHtml', { label: 'safe', suffixHtml: HIGHLIGHTED }],
      ['descriptionHtml', { label: 'safe', descriptionHtml: HIGHLIGHTED }]
    ])('keeps only `<mark>` live in %s', async (_field, item) => {
      const wrapper = await mountSuspended(CommandPalette, {
        props: { groups: [{ id: 'g', items: [item] }] } as any
      })

      expect(wrapper.find('mark').exists()).toBe(true)
      expect(wrapper.find('img').exists()).toBe(false)
    })
  })

  describe('highlighting through fuse', () => {
    // Everything above sets `labelHtml`/`suffixHtml`/`descriptionHtml` by hand,
    // which is exactly the path that skips `highlight()`. These mount the real
    // wiring instead: `processGroupItems` forwards
    // `fuse.fuseOptions.useTokenSearch` as the fifth argument, and Fuse only
    // populates `matches` when `includeMatches` is set — which this component
    // leaves to the caller, so no other case in this file reaches `highlight()`
    // at all.
    function paletteWith(label: string, searchTerm: string, useTokenSearch?: boolean, threshold = 0.1) {
      return mountSuspended(CommandPalette, {
        props: {
          groups: [{ id: 'g', items: [{ label }] }],
          searchTerm,
          fuse: { fuseOptions: { includeMatches: true, useTokenSearch, threshold, ignoreLocation: true } }
        } as any
      })
    }

    it('marks the match', async () => {
      const wrapper = await paletteWith('alpha beta', 'alpha')

      expect(wrapper.find('mark').exists()).toBe(true)
      expect(wrapper.find('mark').text()).toContain('alpha')
    })

    it('marks each word of a multi-word query only when token search is on', async () => {
      // Fuse returns the two words as separate regions, six and four characters
      // long. Off, the threshold is the whole query — ten — and neither reaches
      // it, so nothing is marked; on, it drops to the shortest word and both do.
      // An exact-match fixture would not show the difference: Fuse then returns
      // one region as long as the query, which clears either threshold.
      const off = await paletteWith('alpha xxxx beta', 'alpha beta', false, 0.4)
      const on = await paletteWith('alpha xxxx beta', 'alpha beta', true, 0.4)

      expect(off.find('mark').exists()).toBe(false)
      expect(on.find('mark').exists()).toBe(true)
    })

    it('never splits an emoji across the mark', async () => {
      // The end-to-end version of #362: real Fuse indices, real component, and
      // the replacement character must not appear in the rendered output.
      const wrapper = await paletteWith('deployment \u{1F600}\u{1F600} pipeline', 'zployment \u{1F600}')

      expect(wrapper.html()).not.toContain('�')
      expect(wrapper.find('mark').text()).not.toMatch(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/)
    })

    it('marks each field from its own match, not from whichever fuse returned first', async () => {
      // The component calls `highlight()` three times per item against one shared
      // `matches` array, and `forceKey`/`omitKeys` are what make each call pick
      // its own field. Every other item in this file has a `label` and nothing
      // else, so fuse returns a single match and the selection is trivially
      // right whatever those arguments do — deleting both guards used to leave
      // this whole file green.
      //
      // Here the term hits all three fields, so fuse returns three matches and a
      // mis-selection renders one field's text inside another's element.
      const wrapper = await mountSuspended(CommandPalette, {
        props: {
          groups: [{ id: 'g', items: [{ label: 'orbit alpha', suffix: 'orbit bravo', description: 'orbit charlie' }] }],
          searchTerm: 'orbit',
          fuse: { fuseOptions: { includeMatches: true, threshold: 0.1, ignoreLocation: true, keys: ['label', 'suffix', 'description'] } }
        } as any
      })

      const marks = wrapper.findAll('mark')

      expect(marks.length).toBeGreaterThan(1)

      // Each mark must sit inside the field it came from: the surrounding text
      // is what betrays a swap, since the marked word itself is the same in all
      // three.
      for (const field of ['alpha', 'bravo', 'charlie']) {
        const owner = marks.find(mark => mark.element.parentElement?.textContent?.includes(field))

        expect(owner, `no mark rendered beside "${field}"`).toBeDefined()
        expect(owner!.text()).toBe('orbit')
      }
    })
  })

  it('renders an `item-description` slot for an item that has no description', async () => {
    // The description span was gated on the item's own `description` field alone,
    // so a description supplied purely by a slot — a computed string, a badge,
    // an icon and text — never mounted and produced nothing, silently. The
    // sibling label branch already had the matching `!!slots[...]` term, which
    // is what made the omission look accidental rather than intended.
    const wrapper = await mountSuspended(CommandPalette, {
      props: { groups: [{ id: 'g', items: [{ label: 'no description field' }] }] } as any,
      slots: { 'item-description': () => 'Description from a slot' }
    })

    expect(wrapper.html()).toContain('Description from a slot')
  })

  it('hides the input icon when icon is false', async () => {
    // Use icon-less items so the only `data-slot="icon"` is the input's leading
    // icon (b24-icons render their own `data-slot="icon"`, so item icons would
    // otherwise also match).
    const iconProps = { groups: [{ id: 'users', items: [{ label: 'bitrix24' }] }] } as any
    const withIcon = await mountSuspended(CommandPalette, { props: iconProps })
    expect(withIcon.find('[data-slot="icon"]').exists()).toBe(true)

    const withoutIcon = await mountSuspended(CommandPalette, { props: { ...iconProps, icon: false } })
    expect(withoutIcon.find('[data-slot="icon"]').exists()).toBe(false)
  })

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(CommandPalette, {
      props: {
        groups,
        close: true,
        modelValue: [groups[2]?.items[0], groups[1]?.items[0]],
        multiple: true
      }
    })

    expect(await axe(wrapper.element, {
      rules: {
        // ARIA input fields must have an accessible name (aria-input-field-name)"
        // Fix any of the following:
        //   aria-label attribute does not exist or is empty
        //   aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty
        //   Element has no title attribute
        'aria-input-field-name': { enabled: false }
      }
    })).toHaveNoViolations()
  })

  // Results arriving after mount (e.g. `useLazyFetch({ server: false })`) must
  // re-highlight the first item without scrolling the whole page to a palette
  // that is below the fold and was never interacted with.
  it('re-highlights without scrolling the page when results arrive without focus', async () => {
    const scrollSpy = vi.fn()
    const original = window.HTMLElement.prototype.scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = scrollSpy

    try {
      const wrapper = await mountSuspended(CommandPalette, {
        props: { groups: [{ id: 'users', items: [] }], autofocus: false } as any,
        attachTo: document.body
      })
      await new Promise(resolve => setTimeout(resolve, 60))

      // Items arrive asynchronously while the palette is not focused
      await wrapper.setProps({
        groups: [{ id: 'users', items: Array.from({ length: 10 }, (_, i) => ({ label: `User ${i}` })) }]
      } as any)
      await new Promise(resolve => setTimeout(resolve, 60))

      // First item is highlighted for keyboard entry, but the page was not scrolled to it.
      expect(wrapper.find('[data-highlighted]').exists()).toBe(true)
      expect(scrollSpy).not.toHaveBeenCalled()

      // Once the palette has focus, a results change scrolls the highlight into view.
      ;(wrapper.find('input').element as HTMLInputElement).focus()
      await wrapper.setProps({
        groups: [{ id: 'users', items: Array.from({ length: 8 }, (_, i) => ({ label: `Person ${i}` })) }]
      } as any)
      await new Promise(resolve => setTimeout(resolve, 60))

      expect(scrollSpy).toHaveBeenCalled()
    } finally {
      window.HTMLElement.prototype.scrollIntoView = original
    }
  })
})
