/**
 * DropdownMenu
 * A menu to display actions when clicking on an element.
 * ---
 * @link /api_d7/bitrix/ui/buttons/button.php
 * @see bitrix/js/ui/buttons/src/button/
 */

export default {
  slots: {
    content: [
      'min-w-32',
      'bg-white dark:bg-base-dark',
      'shadow-lg rounded-2xs ring ring-base-300 dark:ring-base-800',
      'overflow-hidden',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'origin-(--reka-dropdown-menu-content-transform-origin)',
      'flex flex-col',
      'pointer-events-auto'
    ].join(' '),
    viewport: [
      'relative',
      'divide-y divide-base-master/10 dark:divide-base-100/20',
      'scroll-py-1',
      'overflow-y-auto',
      'flex-1'
    ].join(' '),
    arrow: 'fill-base-master/10 dark:fill-base-100/20',
    group: 'p-1 isolate',
    label: [
      'w-full flex items-center',
      'font-semibold text-base-900 dark:text-base-200'
    ].join(' '),
    separator: '-mx-1 my-1 h-px bg-base-master/10 dark:bg-base-100/20',
    item: [
      'group relative w-full flex items-center select-none outline-none',
      'before:absolute before:z-[-1] before:inset-px before:rounded-2xs',
      'cursor-pointer',
      'data-disabled:cursor-not-allowed data-disabled:opacity-75',
      'text-base-master dark:text-base-150',
      'data-highlighted:text-base-900 dark:data-highlighted:text-base-200 data-highlighted:before:bg-base-100/50 dark:data-highlighted:before:bg-base-900',
      // 'data-[state=checked]:text-base-900 dark:data-[state=checked]:text-base-200 data-[state=checked]:before:bg-base-100/50 dark:data-[state=checked]:before:bg-base-900',
      'transition-colors before:transition-colors'
    ].join(' '),
    itemLeadingIcon: [
      'shrink-0 text-base-500 dark:text-base-700',
      'group-data-highlighted:text-base-master dark:group-data-highlighted:text-base-150',
      'group-data-[state=checked]:text-base-master dark:group-data-[state=checked]:text-base-150',
      'transition-colors'
    ].join(' '),
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: '',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0',
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0',
    itemTrailingKbdsSize: '',
    itemLabel: 'truncate',
    itemLabelExternalIcon: 'inline-block size-3 align-top text-base-500 dark:text-base-700'
  },
  variants: {
    color: {
      default: '',
      danger: '',
      success: '',
      warning: '',
      primary: '',
      secondary: '',
      collab: '',
      ai: ''
    },
    active: {
      false: {
        item: [
          'text-base-master data-highlighted:text-base-900 data-highlighted:before:bg-base-100/50 data-[state=open]:text-base-900 data-[state=open]:before:bg-base-100/50',
          'dark:text-base-150 dark:data-highlighted:text-base-200 dark:data-highlighted:before:bg-base-900 dark:data-[state=open]:text-base-200 dark:data-[state=open]:before:bg-base-900',
          'transition-colors before:transition-colors'
        ].join(' '),
        itemLeadingIcon: [
          'text-base-500 group-data-highlighted:text-base-master group-data-[state=open]:text-base-master',
          'dark:text-base-700 dark:group-data-highlighted:text-base-150 dark:group-data-[state=open]:text-base-150',
          'transition-colors'
        ].join(' ')
      },
      true: {
        item: [
          'text-base-900 before:bg-base-100/50',
          'dark:text-base-200 dark:before:bg-base-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-base-master group-data-[state=open]:text-base-master',
          'dark:text-base-700'
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
        label: 'h-9 ps-2 pe-3 text-sm gap-2',
        item: 'h-9 ps-3 pe-3 text-sm gap-2',
        itemLeadingIcon: 'size-5',
        itemLeadingAvatarSize: '2xs',
        itemTrailingIcon: 'size-3',
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
      }
    }
  },
  compoundVariants: [
    {
      color: 'default',
      active: false,
      class: {
        item: [
          'text-base-master data-highlighted:text-base-900 data-highlighted:before:bg-base-100/50 data-[state=open]:text-base-900 data-[state=open]:before:bg-base-100/50',
          'dark:text-base-150 dark:data-highlighted:text-base-200 dark:data-highlighted:before:bg-base-900 dark:data-[state=open]:text-base-200 dark:data-[state=open]:before:bg-base-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-base-500 group-data-highlighted:text-base-master group-data-[state=open]:text-base-master',
          'dark:text-base-700 dark:group-data-highlighted:text-base-150 dark:group-data-[state=open]:text-base-150'
        ].join(' ')
      }
    },
    {
      color: 'default',
      active: true,
      class: {
        item: [
          'text-base-900 before:bg-base-100/50',
          'dark:text-base-200 dark:before:bg-base-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-base-master group-data-[state=open]:text-base-master',
          'dark:text-base-700'
        ].join(' ')
      }
    },
    {
      color: 'danger',
      active: false,
      class: {
        item: [
          'text-red-950 data-highlighted:text-red-900 data-highlighted:before:bg-red-100 data-[state=open]:text-red-900 data-[state=open]:before:bg-red-100',
          'dark:text-red-150 dark:data-highlighted:text-red-200 dark:data-highlighted:before:bg-red-900 dark:data-[state=open]:text-red-200 dark:data-[state=open]:before:bg-red-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-red-500 group-data-highlighted:text-red-900 group-data-[state=open]:text-red-900',
          'dark:text-red-700 dark:group-data-highlighted:text-red-150 dark:group-data-[state=open]:text-red-150'
        ].join(' ')
      }
    },
    {
      color: 'danger',
      active: true,
      class: {
        item: [
          'text-red-900 before:bg-red-100',
          'dark:text-red-200 dark:before:bg-red-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-red-900 group-data-[state=open]:text-red-900',
          'dark:text-red-700'
        ].join(' ')
      }
    },
    {
      color: 'success',
      active: false,
      class: {
        item: [
          'text-green-950 data-highlighted:text-green-900 data-highlighted:before:bg-green-100 data-[state=open]:text-green-900 data-[state=open]:before:bg-green-100',
          'dark:text-green-150 dark:data-highlighted:text-green-200 dark:data-highlighted:before:bg-green-900 dark:data-[state=open]:text-green-200 dark:data-[state=open]:before:bg-green-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-green-500 group-data-highlighted:text-green-900 group-data-[state=open]:text-green-900',
          'dark:text-green-700 dark:group-data-highlighted:text-green-150 dark:group-data-[state=open]:text-green-150'
        ].join(' ')
      }
    },
    {
      color: 'success',
      active: true,
      class: {
        item: [
          'text-green-900 before:bg-green-100',
          'dark:text-green-200 dark:before:bg-green-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-green-900 group-data-[state=open]:text-green-900',
          'dark:text-green-700'
        ].join(' ')
      }
    },
    {
      color: 'warning',
      active: false,
      class: {
        item: [
          'text-orange-950 data-highlighted:text-orange-900 data-highlighted:before:bg-orange-100 data-[state=open]:text-orange-900 data-[state=open]:before:bg-orange-100',
          'dark:text-orange-150 dark:data-highlighted:text-orange-200 dark:data-highlighted:before:bg-orange-900 dark:data-[state=open]:text-orange-200 dark:data-[state=open]:before:bg-orange-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-orange-500 group-data-highlighted:text-orange-900 group-data-[state=open]:text-orange-900',
          'dark:text-orange-700 dark:group-data-highlighted:text-orange-150 dark:group-data-[state=open]:text-orange-150'
        ].join(' ')
      }
    },
    {
      color: 'warning',
      active: true,
      class: {
        item: [
          'text-orange-900 before:bg-orange-100',
          'dark:text-orange-200 dark:before:bg-orange-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-orange-900 group-data-[state=open]:text-orange-900',
          'dark:text-orange-700'
        ].join(' ')
      }
    },
    {
      color: 'primary',
      active: false,
      class: {
        item: [
          'text-blue-950 data-highlighted:text-blue-900 data-highlighted:before:bg-blue-100 data-[state=open]:text-blue-900 data-[state=open]:before:bg-blue-100',
          'dark:text-blue-150 dark:data-highlighted:text-blue-200 dark:data-highlighted:before:bg-blue-900 dark:data-[state=open]:text-blue-200 dark:data-[state=open]:before:bg-blue-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-blue-500 group-data-highlighted:text-blue-900 group-data-[state=open]:text-blue-900',
          'dark:text-blue-700 dark:group-data-highlighted:text-blue-150 dark:group-data-[state=open]:text-blue-150'
        ].join(' ')
      }
    },
    {
      color: 'primary',
      active: true,
      class: {
        item: [
          'text-blue-900 before:bg-blue-100',
          'dark:text-blue-200 dark:before:bg-blue-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-blue-900 group-data-[state=open]:text-blue-900',
          'dark:text-blue-700'
        ].join(' ')
      }
    },
    {
      color: 'secondary',
      active: false,
      class: {
        item: [
          'text-cyan-950 data-highlighted:text-cyan-900 data-highlighted:before:bg-cyan-100/50 data-[state=open]:text-cyan-900 data-[state=open]:before:bg-cyan-100/50',
          'dark:text-cyan-150 dark:data-highlighted:text-cyan-200 dark:data-highlighted:before:bg-cyan-900 dark:data-[state=open]:text-cyan-200 dark:data-[state=open]:before:bg-cyan-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-cyan-500 group-data-highlighted:text-cyan-900 group-data-[state=open]:text-cyan-900',
          'dark:text-cyan-700 dark:group-data-highlighted:text-cyan-150 dark:group-data-[state=open]:text-cyan-150'
        ].join(' ')
      }
    },
    {
      color: 'secondary',
      active: true,
      class: {
        item: [
          'text-cyan-900 before:bg-cyan-100/50',
          'dark:text-cyan-200 dark:before:bg-cyan-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-cyan-900 group-data-[state=open]:text-cyan-900',
          'dark:text-cyan-700'
        ].join(' ')
      }
    },
    {
      color: 'collab',
      active: false,
      class: {
        item: [
          'text-collab-900 data-highlighted:text-collab-900 data-highlighted:before:bg-collab-100 data-[state=open]:text-collab-900 data-[state=open]:before:bg-collab-100',
          'dark:text-collab-150 dark:data-highlighted:text-collab-200 dark:data-highlighted:before:bg-collab-900 dark:data-[state=open]:text-collab-200 dark:data-[state=open]:before:bg-collab-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-collab-600 group-data-highlighted:text-collab-900 group-data-[state=open]:text-collab-900',
          'dark:text-collab-700 dark:group-data-highlighted:text-collab-150 dark:group-data-[state=open]:text-collab-150'
        ].join(' ')
      }
    },
    {
      color: 'collab',
      active: true,
      class: {
        item: [
          'text-collab-900 before:bg-collab-100',
          'dark:text-collab-200 dark:before:bg-collab-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-collab-900 group-data-[state=open]:text-collab-900',
          'dark:text-collab-700'
        ].join(' ')
      }
    },
    {
      color: 'ai',
      active: false,
      class: {
        item: [
          'text-ai-950 data-highlighted:text-ai-900 data-highlighted:before:bg-ai-100/50 data-[state=open]:text-ai-900 data-[state=open]:before:bg-ai-100/50',
          'dark:text-ai-150 dark:data-highlighted:text-ai-200 dark:data-highlighted:before:bg-ai-900 dark:data-[state=open]:text-ai-200 dark:data-[state=open]:before:bg-ai-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-ai-500 group-data-highlighted:text-ai-900 group-data-[state=open]:text-ai-900',
          'dark:text-ai-700 dark:group-data-highlighted:text-ai-150 dark:group-data-[state=open]:text-ai-150'
        ].join(' ')
      }
    },
    {
      color: 'ai',
      active: true,
      class: {
        item: [
          'text-ai-900 before:bg-ai-100/50',
          'dark:text-ai-200 dark:before:bg-ai-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-ai-900 group-data-[state=open]:text-ai-900',
          'dark:text-ai-700'
        ].join(' ')
      }
    }
  ],
  defaultVariants: {
    size: 'md'
  }
}
