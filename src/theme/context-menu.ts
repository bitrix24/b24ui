/**
 * ContextMenu
 * A pop-up menu that appears upon right-clicking an element to present relevant actions.
 * ---
 * @todo add docs
 * @todo add color
 * @todo add demo
 */

export default {
  slots: {
    content: 'min-w-32 bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-context-menu-content-transform-origin) flex flex-col',
    viewport: 'relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1',
    group: 'p-1 isolate',
    label: 'w-full flex items-center font-semibold text-highlighted',
    separator: '-mx-1 my-1 h-px bg-border',
    item: 'group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75',
    itemLeadingIcon: 'shrink-0',
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0',
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0',
    itemTrailingKbdsSize: '',
    itemLabel: 'truncate',
    itemLabelExternalIcon: 'inline-block size-3 align-top text-dimmed'
  },
  variants: {
    color: {
      neutral: ''
    },
    active: {
      true: {
        item: 'text-highlighted before:bg-elevated',
        itemLeadingIcon: 'text-default'
      },
      false: {
        item: [
          'text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50',
          'transition-colors before:transition-colors'
        ].join(' '),
        itemLeadingIcon: [
          'text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default',
          'transition-colors'
        ].join(' ')
      }
    },
    loading: {
      true: {
        itemLeadingIcon: 'animate-spin'
      }
    },
    size: {
      xs: {
        label: 'p-1 text-xs gap-1',
        item: 'p-1 text-xs gap-1',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemTrailingIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm'
      },
      sm: {
        label: 'p-1.5 text-xs gap-1.5',
        item: 'p-1.5 text-xs gap-1.5',
        itemLeadingIcon: 'size-4',
        itemLeadingAvatarSize: '3xs',
        itemTrailingIcon: 'size-4',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'sm'
      },
      md: {
        label: 'p-1.5 text-sm gap-1.5',
        item: 'p-1.5 text-sm gap-1.5',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-5',
        itemTrailingKbds: 'gap-0.5',
        itemTrailingKbdsSize: 'md'
      },
      lg: {
        label: 'p-2 text-sm gap-2',
        item: 'p-2 text-sm gap-2',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-5',
        itemTrailingKbds: 'gap-1',
        itemTrailingKbdsSize: 'md'
      },
      xl: {
        label: 'p-2 text-base gap-2',
        item: 'p-2 text-base gap-2',
        itemLeadingIcon: 'size-6',
        itemLeadingAvatarSize: 'xs',
        itemTrailingIcon: 'size-6',
        itemTrailingKbds: 'gap-1',
        itemTrailingKbdsSize: 'lg'
      }
    }
  },
  compoundVariants: [
    {
      color: 'dd',
      active: false,
      class: {
        item: 'text-dd data-highlighted:text-dd data-highlighted:before:bg-dd/10 data-[state=open]:before:bg-dd/10',
        itemLeadingIcon: 'text-dd/75 group-data-highlighted:text-dd group-data-[state=open]:text-dd'
      }
    },
    {
      color: 'dd',
      active: true,
      class: {
        item: 'text-dd before:bg-dd/10',
        itemLeadingIcon: 'text-dd'
      }
    }
  ],
  defaultVariants: {
    size: 'md'
  }
}
