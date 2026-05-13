/**
 * PageCardGroup
 * A selectable group of PageCard items. Supports single (radio) and multi (checkbox) selection,
 * optional grouping by category, responsive grid layout, and a corner badge for the selected state.
 *
 * The leading visual of every card is rendered by the inner `B24PageCard`:
 *  - If the item has a plain `icon` field — it wins, rendered as-is (legacy path).
 *  - Otherwise the inner card renders a `B24Avatar` (group `avatar` prop merged with the item's
 *    `avatar` field). Avatar size is driven by `leadingAvatarSize` (a value, not a CSS class)
 *    which the size variant forwards into `PageCard`'s `b24ui` slot.
 *
 * The `card*` slots are forwarded to the inner `B24PageCard` via its `b24ui` prop and override
 * PageCard's own slot classes — this is what produces the icon-on-the-left layout (PageCard
 * defaults to a vertical wrapper).
 * ---
 * @see src/theme/page-card.ts
 * @see src/theme/avatar.ts
 */
export default {
  slots: {
    root: 'flex flex-col gap-8',
    fieldset: 'flex flex-col gap-8 border-0 p-0 m-0 min-w-0',
    legend: 'text-(length:--ui-font-size-2xl)/[normal] font-(--ui-font-weight-semi-bold) mb-2',
    group: 'flex flex-col gap-4',
    categoryLabel: 'text-(length:--ui-font-size-base)/[normal] font-(--ui-font-weight-medium) text-(--ui-color-design-outline-content-secondary)',
    grid: 'grid gap-4',
    item: 'relative flex cursor-pointer transition-shadow duration-200 rounded-lg [&:not([data-disabled])]:hover:shadow-(--ui-shadow-bottom-l) data-[disabled]:cursor-not-allowed',
    card: 'flex-1',
    // overrides forwarded to inner `B24PageCard` via its `b24ui` prop
    cardContainer: '',
    cardWrapper: 'flex flex-row items-center',
    cardLeading: 'mb-0 shrink-0',
    cardBody: 'flex-1 min-w-0',
    cardTitle: '',
    cardDescription: '',
    leadingIcon: '',
    leadingAvatar: '',
    // Avatar size **value** (not a class). Size variant supplies it — keep base empty
    // so `b24ui.leadingAvatarSize()` returns the variant value verbatim (e.g. `lg`),
    // not the concatenated `'lg lg'` which would miss the Avatar size variant lookup.
    leadingAvatarSize: '',
    badge: 'absolute -top-2 -end-2 z-10',
    badgeIcon: 'rounded-full'
  },
  variants: {
    size: {
      sm: {
        cardWrapper: 'gap-2.5',
        cardTitle: 'text-(length:--ui-font-size-base)/[normal]',
        cardDescription: 'text-(length:--ui-font-size-sm)/[normal]',
        leadingIcon: 'size-7 shrink-0',
        leadingAvatarSize: 'sm'
      },
      md: {
        cardWrapper: 'gap-3',
        cardTitle: 'text-(length:--ui-font-size-lg)/[normal]',
        cardDescription: 'text-(length:--ui-font-size-base)/[normal]',
        leadingIcon: 'size-8 shrink-0',
        leadingAvatarSize: 'md'
      },
      lg: {
        cardWrapper: 'gap-4',
        cardTitle: 'text-(length:--ui-font-size-xl)/[normal]',
        cardDescription: 'text-(length:--ui-font-size-base)/[normal]',
        leadingIcon: 'size-10 shrink-0',
        leadingAvatarSize: 'lg'
      }
    },
    columns: {
      1: { grid: 'grid-cols-1' },
      2: { grid: 'grid-cols-1 sm:grid-cols-2' },
      3: { grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' },
      4: { grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' }
    },
    disabled: {
      true: { root: 'opacity-30 pointer-events-none' }
    }
  },
  defaultVariants: {
    size: 'md' as const,
    columns: '3' as const
  }
}
