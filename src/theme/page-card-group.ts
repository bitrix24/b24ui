/**
 * PageCardGroup
 * A selectable group of PageCard items. Supports single (radio) and multi (checkbox) selection,
 * optional grouping by category, responsive grid layout, and a corner badge for the selected state.
 *
 * The `card*` slots are forwarded to the inner `B24PageCard` via its `b24ui` prop and override
 * PageCard's own slot classes — this is what produces the icon-on-the-left layout (PageCard
 * defaults to a vertical wrapper).
 * ---
 * @see src/theme/page-card.ts
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
    iconWrap: 'inline-flex items-center justify-center rounded-full bg-(--ui-color-design-tinted-a1-bg) shrink-0',
    icon: 'text-(--ui-color-design-tinted-a1-content-icon)',
    badge: 'absolute -top-2 -end-2 z-10',
    badgeIcon: 'rounded-full'
  },
  variants: {
    size: {
      sm: {
        iconWrap: 'size-10',
        icon: 'size-5',
        cardWrapper: 'gap-2.5',
        cardTitle: 'text-(length:--ui-font-size-base)/[normal]',
        cardDescription: 'text-(length:--ui-font-size-sm)/[normal]'
      },
      md: {
        iconWrap: 'size-12',
        icon: 'size-6',
        cardWrapper: 'gap-3',
        cardTitle: 'text-(length:--ui-font-size-lg)/[normal]',
        cardDescription: 'text-(length:--ui-font-size-base)/[normal]'
      },
      lg: {
        iconWrap: 'size-14',
        icon: 'size-7',
        cardWrapper: 'gap-4',
        cardTitle: 'text-(length:--ui-font-size-xl)/[normal]',
        cardDescription: 'text-(length:--ui-font-size-base)/[normal]'
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
