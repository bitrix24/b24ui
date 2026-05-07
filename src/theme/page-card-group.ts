/**
 * PageCardGroup
 * A selectable group of PageCard items. Supports single (radio) and multi (checkbox) selection,
 * optional grouping by category, responsive grid layout, and a corner badge for the selected state.
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
    item: 'relative cursor-pointer flex',
    card: 'flex-1',
    iconWrap: 'inline-flex items-center justify-center size-12 rounded-full bg-(--ui-color-design-tinted-a1-bg) shrink-0',
    icon: 'size-6 text-(--ui-color-design-tinted-a1-content-icon)',
    badge: 'absolute -top-2 -end-2 z-10',
    badgeIcon: 'rounded-full',
    badgeIconSize: 'md'
  },
  variants: {
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
    columns: '3' as const
  }
}
