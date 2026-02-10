/**
 * CommandPalette
 * A searchable command palette powered by Fuse.js for fast, fuzzy text search.
 * ---
 *
 * @todo fix size
 */

export default {
  slots: {
    root: [
      'flex flex-col',
      'min-h-0 min-w-0',
      'divide-y divide-(--ui-color-design-tinted-na-stroke)'
    ].join(' '),
    input: '',
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
      'text-center',
      'text-(--b24ui-typography-description-color)'
    ].join(' '),
    label: 'text-(--b24ui-typography-label-color)',
    item: [
      'group',
      'relative',
      'w-full',
      'flex items-center',
      'select-none',
      'outline-none',
      'before:absolute',
      'before:z-[-1]',
      'before:inset-px',
      'before:rounded-(--ui-border-radius-sm)',
      'data-disabled:cursor-not-allowed',
      'data-disabled:opacity-30'
    ].join(' '),
    itemLeadingIcon: 'shrink-0',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemLeadingChip: 'shrink-0',
    itemLeadingChipSize: '',
    itemTrailing: 'ms-auto inline-flex items-center',
    itemTrailingIcon: 'shrink-0 text-(--ui-color-accent-main-primary)',
    itemTrailingHighlightedIcon: [
      'shrink-0',
      'text-(--b24ui-typography-label-color)',
      'hidden',
      'group-data-highlighted:inline-flex'
    ].join(' '),
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0',
    itemTrailingKbdsSize: '',
    itemWrapper: 'flex-1 flex flex-col text-start min-w-0 overflow-hidden',
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
    size: {
      xss: {
        input: 'ps-[20px] pe-[20px]', // [&>input]:h-10
        empty: 'py-3 text-(length:--ui-font-size-4xs)',
        label: 'p-1 text-[10px]/3 gap-1',
        item: 'p-1 text-(length:--ui-font-size-4xs) gap-1',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemLeadingChip: 'size-4',
        itemLeadingChipSize: 'sm',
        itemTrailing: 'gap-1',
        itemTrailingIcon: 'size-4',
        itemTrailingHighlightedIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm'
      },
      xs: {
        input: 'ps-[22px] pe-[22px]', // [&>input]:h-10
        empty: 'py-3 text-(length:--ui-font-size-xs)',
        label: 'p-1 text-[10px]/3 gap-1',
        item: 'p-1 text-(length:--ui-font-size-xs) gap-1',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemLeadingChip: 'size-4',
        itemLeadingChipSize: 'sm',
        itemTrailing: 'gap-1',
        itemTrailingIcon: 'size-4',
        itemTrailingHighlightedIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm'
      },
      sm: {
        input: 'ps-[28px] pe-[28px]', // [&>input]:h-11
        empty: 'py-4 text-(length:--ui-font-size-sm)',
        label: 'p-1.5 text-[10px]/3 gap-1.5',
        item: 'p-1.5 text-(length:--ui-font-size-sm) gap-1.5',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemLeadingChip: 'size-4',
        itemLeadingChipSize: 'sm',
        itemTrailing: 'gap-1.5',
        itemTrailingIcon: 'size-4',
        itemTrailingHighlightedIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm'
      },
      md: {
        input: 'ps-[40px] pe-[44px]', // [&>input]:h-12
        empty: 'py-6 text-(length:--ui-font-size-sm)',
        label: 'p-[6px] text-(length:--ui-font-size-xs) gap-[6px]',
        item: 'p-[6px] text-(length:--ui-font-size-md) gap-[6px]',
        itemLeadingIcon: 'size-[20px]',
        itemLeadingAvatarSize: '2xs',
        itemLeadingChip: 'size-[20px]',
        itemLeadingChipSize: 'md',
        itemTrailing: 'gap-[6px]',
        itemTrailingIcon: 'size-[20px]',
        itemTrailingHighlightedIcon: 'size-[20px]',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'md'
      },
      lg: {
        input: 'ps-[40px] pe-[44px]', // [&>input]:h-13
        empty: 'py-7 :text-(length:--ui-font-size-sm)',
        label: 'p-2 text-(length:--ui-font-size-lg) gap-2',
        item: 'p-2 text-(length:--ui-font-size-lg) gap-2',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemLeadingChip: 'size-5',
        itemLeadingChipSize: 'md',
        itemTrailing: 'gap-2',
        itemTrailingIcon: 'size-5',
        itemTrailingHighlightedIcon: 'size-5',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'md'
      },
      xl: {
        input: 'ps-[40px] pe-[44px]', // [&>input]:h-14
        empty: 'py-8 text-(length:--ui-font-size-lg)',
        label: 'p-2 text-(length:--ui-font-size-2xl) gap-2',
        item: 'p-2 text-(length:--ui-font-size-2xl) gap-2',
        itemLeadingIcon: 'size-6',
        itemLeadingAvatarSize: 'xs',
        itemLeadingChip: 'size-6',
        itemLeadingChipSize: 'lg',
        itemTrailing: 'gap-2',
        itemTrailingIcon: 'size-6',
        itemTrailingHighlightedIcon: 'size-6',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'lg'
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
  },
  defaultVariants: {
    size: 'md'
  }
}
