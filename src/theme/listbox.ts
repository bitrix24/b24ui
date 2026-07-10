/**
 * Listbox
 * A selectable list component with search, virtualization, and rich item rendering capabilities.
 * ---
 */

export default {
  slots: {
    root: [
      'flex flex-col min-h-0 min-w-0',
      'ring ring-inset ring-(--ui-color-design-outline-stroke)',
      'rounded-lg overflow-hidden',
      `outline-(--b24ui-border-color) has-focus-visible:outline-3 has-focus-visible:ring-(--b24ui-border-color)`
    ].join(' '),
    input: 'border-b border-(--ui-color-design-outline-stroke) has-focus-visible:border-(--b24ui-border-color)',
    content: 'relative overflow-y-auto flex-1 max-h-60 scroll-py-1 focus:outline-none',
    group: 'isolate',
    label: [
      'w-full min-w-[195px] h-(--popup-window-delimiter-section-height)',
      'px-4.5 mt-(--menu-item-block-stack-space)',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      'text-start',
      'text-(length:--ui-size-sm)',
      'text-legend',
      'font-(--ui-font-weight-normal)',
      'after:ms-[10px] after:block after:flex-1 after:min-w-[15px] after:h-px after:bg-(--ui-color-divider-vibrant-default)'
    ].join(' '),
    separator: 'my-2 mx-4.5 h-[1px] bg-(--ui-color-divider-vibrant-default)',
    empty: [
      'py-2',
      'select-none outline-none whitespace-nowrap',
      'text-center',
      'text-(length:--popup-window-delimiter-font-size)/(--ui-font-line-height-lg)',
      'text-legend',
      'font-(--ui-font-weight-normal)'
    ].join(' '),
    loading: 'flex items-center justify-center text-muted',
    loadingIcon: 'shrink-0',
    item: [
      'group relative',
      'w-full flex items-start',
      'select-none outline-none',
      'before:absolute before:z-[-1] before:inset-0',
      'data-disabled:cursor-not-allowed data-disabled:opacity-75',
      'text-default',
      'data-highlighted:not-data-disabled:text-label',
      'data-[state=checked]:text-label',
      'data-highlighted:not-data-disabled:before:bg-(--ui-color-base-black-fixed)/3 dark:data-highlighted:not-data-disabled:before:bg-(--ui-color-base-black-fixed)',
      'transition-colors before:transition-colors'
    ].join(' '),
    itemLeadingIcon: 'size-[25px] shrink-0 text-(--ui-color-base-5)',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemLeadingChip: 'shrink-0',
    itemLeadingChipSize: '',
    itemWrapper: 'flex-1 flex flex-col min-w-0',
    itemLabel: 'truncate',
    itemDescription: 'truncate -mt-[6px] text-description text-(length:--ui-font-size-sm)',
    itemTrailing: 'ml-auto rtl:ml-0 rtl:mr-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0 text-(--ui-color-accent-main-primary)'
  },
  variants: {
    size: {
      xss: {
        label: 'p-1 text-[10px]/3 gap-1',
        empty: 'py-3 text-[10px]',
        loading: 'py-3',
        loadingIcon: 'size-2',
        item: 'p-1 text-[10px] gap-1',
        itemLeadingIcon: 'size-3 mt-0.5',
        itemLeadingAvatar: 'size-3 mt-0.5',
        itemLeadingAvatarSize: '3xs', // @memo this wrong
        itemLeadingChip: 'size-3 mt-0.5',
        itemLeadingChipSize: '2xs',
        itemTrailingIcon: 'size-3 mt-0.5'
      },
      xs: {
        label: 'p-1 text-[10px]/3 gap-1',
        empty: 'py-3 text-[12px]',
        loading: 'py-3',
        loadingIcon: 'size-[12px]',
        item: 'p-1 text-[12px] gap-1',
        itemLeadingIcon: 'size-4 mt-0.5',
        itemLeadingAvatar: 'size-4 mt-0.5',
        itemLeadingAvatarSize: '3xs', // @memo this wrong
        itemLeadingChip: 'size-3 mt-0.5',
        itemLeadingChipSize: 'sm',
        itemTrailingIcon: 'size-4 mt-0.5'
      },
      sm: {
        label: 'p-1.5 text-[10px]/3 gap-1.5',
        empty: 'py-4 text-[14px]',
        loading: 'py-4',
        loadingIcon: 'size-4',
        item: 'p-1.5 text-[14px] gap-1.5',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatar: 'size-5',
        itemLeadingAvatarSize: '3xs', // @memo this wrong
        itemLeadingChip: 'size-4 mt-1',
        itemLeadingChipSize: 'sm',
        itemTrailingIcon: 'size-5'
      },
      md: {
        label: 'px-4.5 py-1.5 text-xs gap-1.5',
        empty: 'py-6 text-4',
        loading: 'py-6',
        loadingIcon: 'size-6',
        item: 'px-4.5 py-1.5 text-4 gap-1.5',
        itemLeadingIcon: 'size-6',
        itemLeadingAvatar: 'size-6',
        itemLeadingAvatarSize: '2xs', // @memo this wrong
        itemLeadingChip: 'size-5 mt-1',
        itemLeadingChipSize: 'md',
        itemTrailingIcon: 'size-6'
      },
      lg: {
        label: 'p-2 text-xs gap-2',
        empty: 'py-7 text-4',
        loading: 'py-7',
        loadingIcon: 'size-8',
        item: 'p-2 text-4 gap-2',
        itemLeadingIcon: 'size-7',
        itemLeadingAvatar: 'size-7',
        itemLeadingAvatarSize: '2xs', // @memo this wrong
        itemLeadingChip: 'size-5 mt-1',
        itemLeadingChipSize: 'md',
        itemTrailingIcon: 'size-6'
      },
      xl: {
        label: 'p-2 text-4 gap-2',
        empty: 'py-8 text-6',
        loading: 'py-8',
        loadingIcon: 'size-10',
        item: 'p-2 text-6 gap-2',
        itemLeadingIcon: 'size-7',
        itemLeadingAvatar: 'size-7',
        itemLeadingAvatarSize: 'xs', // @memo this wrong
        itemLeadingChip: 'size-6',
        itemLeadingChipSize: 'lg',
        itemTrailingIcon: 'size-6',
        itemDescription: 'text-4'
      }
    },
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' }
    },
    virtualize: {
      true: {
        content: 'p-1 isolate'
      },
      false: {
        content: 'divide-y divide-(--ui-color-divider-default)'
      }
    },
    disabled: {
      true: {
        root: 'cursor-not-allowed opacity-30'
      }
    },
    highlight: { true: 'ring ring-inset ring-(--b24ui-border-color)' }
  },
  compoundVariants: [],
  defaultVariants: {
    color: 'air-primary',
    size: 'md'
  }
}
