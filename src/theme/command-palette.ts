/**
 * CommandPalette
 * A searchable command palette powered by Fuse.js for fast, fuzzy text search.
 * ---
 */

export default {
  slots: {
    root: [
      'flex flex-col',
      'min-h-0 min-w-0',
      'divide-y divide-(--ui-color-design-tinted-na-stroke)'
    ].join(' '),
    input: 'ps-[40px] pe-[44px]',
    close: '',
    back: 'p-0',
    content: 'relative overflow-hidden flex flex-col',
    footer: 'p-1',
    viewport: [
      'relative',
      'scroll-py-1',
      'overflow-y-auto',
      'scrollbar-thin',
      'flex-1',
      'focus:outline-none'
    ].join(' '),
    group: 'p-1 isolate',
    empty: [
      'py-6',
      'text-center',
      'text-(length:--ui-font-size-sm)',
      'text-(--b24ui-typography-description-color)'
    ].join(' '),
    label: [
      'p-[6px]',
      'text-(length:--ui-font-size-xs)',
      'text-(--b24ui-typography-label-color)'
    ].join(' '),
    item: [
      'group',
      'relative',
      'w-full',
      'flex items-center gap-[6px]',
      'p-[6px]',
      'text-(length:--ui-font-size-sm)',
      'select-none',
      'outline-none',
      'before:absolute',
      'before:z-[-1]',
      'before:inset-px',
      'before:rounded-(--ui-border-radius-sm)',
      'data-disabled:cursor-not-allowed',
      'data-disabled:opacity-30'
    ].join(' '),
    itemLeadingIcon: 'shrink-0 size-[20px]',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '2xs',
    itemLeadingChip: 'shrink-0 size-[20px]',
    itemLeadingChipSize: 'md',
    itemTrailing: 'ms-auto inline-flex gap-[6px] items-center',
    itemTrailingIcon: 'shrink-0 size-[20px]',
    itemTrailingHighlightedIcon: [
      'shrink-0 size-[20px]',
      'text-(--b24ui-typography-label-color)',
      'hidden',
      'group-data-highlighted:inline-flex'
    ].join(' '),
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0 gap-0.5',
    itemTrailingKbdsSize: 'md',
    itemWrapper: 'flex-1 flex flex-col items-start min-w-0 overflow-hidden',
    itemLabel: 'truncate space-x-1 text-(--b24ui-typography-label-color)',
    itemDescription: 'truncate -mt-[6px] text-(--b24ui-typography-description-color) text-(length:--ui-font-size-sm)',
    itemLabelBase: 'text-(--b24ui-typography-label-color) [&>mark]:text-(--ui-color-black-base) [&>mark]:bg-(--ui-color-collab-accent-less-1)',
    itemLabelPrefix: 'text-(--b24ui-typography-legend-color)',
    itemLabelSuffix: 'truncate text-(--b24ui-typography-description-color) [&>mark]:text-(--ui-color-black-base) [&>mark]:bg-(--ui-color-collab-accent-less-1)'
  },
  variants: {
    virtualize: {
      true: {
        viewport: 'p-1 isolate'
      },
      false: {
        viewport: '' // divide-y divide-(--ui-color-design-tinted-na-stroke)
      }
    },
    active: {
      true: {
        item: 'text-(--b24ui-typography-label-color) before:bg-(--ui-color-base-8)',
        itemLeadingIcon: 'text-(--b24ui-typography-legend-color)'
      },
      false: {
        item: [
          'text-(--b24ui-typography-legend-color)',
          'data-highlighted:not-data-disabled:text-(--b24ui-typography-legend-color)',
          'data-highlighted:not-data-disabled:before:bg-(--ui-color-bg-content-secondary)',
          'transition-colors before:transition-colors'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--b24ui-typography-legend-color)',
          'group-data-highlighted:not-group-data-disabled:text-(--b24ui-typography-legend-color)',
          'transition-colors'
        ].join(' ')
      }
    },
    loading: {
      true: {
        itemLeadingIcon: 'animate-spin'
      }
    }
  }
}
