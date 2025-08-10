/**
 * DropdownMenu
 * A menu to display actions when clicking on an element.
 * ---
 * @link /api_d7/bitrix/ui/buttons/button.php
 * @see bitrix/js/ui/buttons/src/button/
 * @see src/theme/dropdown-menu.ts
 */

export default {
  slots: {
    content: [
      'context-light',
      'bg-(--popup-window-background-color)',
      'shadow-(--popup-window-box-shadow)',
      'rounded-(--popup-window-border-radius) will-change-[opacity]',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'origin-(--reka-dropdown-menu-content-transform-origin)',
      'font-[family-name:var(--ui-font-family-primary)]',
      //
      'relative overflow-hidden',
      // 'w-[240px] max-h-[60vh]',
      // 'overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-transparent',
      // 'scroll-py-1',
      'isolate',
      'px-0 py-(--menu-popup-padding)',
      'pointer-events-auto'
      // fix  'flex flex-col'
    ].join(' '),
    viewport: [
      'relative',
      // fix  'divide-y divide-base-master/10',
      // fix 'scroll-py-1',
      // 'size-full',
      'w-[240px] max-h-[60vh]',
      'overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-transparent'
      // fix 'flex-1'
    ].join(' '),
    arrow: 'fill-(--popup-window-background-color)', // for content bottom|top::start -> ml-[12px]
    group: 'grid', // p-1 isolate
    label: [
      'w-full min-w-[195px] h-[36px]',
      'px-[25px] mt-(--menu-item-block-stack-space)',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      // fix 'font-semibold text-base-900'
      'text-start',
      'text-(length:--menu-popup-item-font-size)',
      'text-(--menu-popup-item-color)',
      'opacity-70'
    ].join(' '),
    separator: '-mx-1 my-1 h-px bg-base-master/10',
    item: [
      'group',
      'w-full min-w-[195px] h-[36px]',
      'px-[25px] mt-(--menu-item-block-stack-space)',
      'relative',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      'cursor-pointer',
      'data-disabled:cursor-not-allowed data-disabled:opacity-75',
      'text-start',
      'text-(length:--menu-popup-item-font-size)',
      'text-(--menu-popup-item-color) hover:text-(--menu-popup-item-color-hover) data-highlighted:text-(--menu-popup-item-color-hover) data-[state=open]:text-(--menu-popup-item-color-hover)',
      'hover:bg-(--menu-popup-item-bg-color-hover) data-highlighted:bg-(--menu-popup-item-bg-color-hover) data-[state=open]:bg-(--menu-popup-item-bg-color-hover)',
      // fix 'data-highlighted:text-base-900',
      // 'data-[state=checked]:text-base-900 dark:data-[state=checked]:text-base-200',
      'transition-colors'
    ].join(' '),
    itemLeadingIcon: [
      'shrink-0 text-base-500',
      'group-data-highlighted:text-base-master',
      'group-data-[state=checked]:text-base-master',
      'transition-colors'
    ].join(' '),
    itemLeadingAvatar: 'shrink-0',
    itemLeadingAvatarSize: 'xs',
    itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0',
    itemTrailingKbds: 'hidden lg:inline-flex items-center shrink-0',
    itemTrailingKbdsSize: '',
    itemLabel: 'truncate ms-[2px] -mt-px',
    itemLabelExternalIcon: 'inline-block size-3 align-top text-base-500'
  },
  variants: {
    color: {
      'air-primary': { base: 'style-filled' },
      'air-primary-success': { base: 'style-filled-success' },
      'air-primary-alert': { base: 'style-filled-alert' },
      'air-primary-copilot': { base: 'style-filled-copilot' },
      'air-primary-warning': { base: 'style-filled-warning' },
      'air-secondary': { base: 'style-tinted-no-accent-1' },
      'air-secondary-accent': { base: 'style-filled-no-accent' },
      'air-secondary-accent-1': { base: 'style-filled-no-accent-inverted' },
      'air-secondary-no-accent': { base: 'style-outline-no-accent' },
      // @deprecate ////
      'default': '',
      'danger': '',
      'success': '',
      'warning': '',
      'primary': '',
      'secondary': '',
      'collab': '',
      'ai': ''
    },
    active: {
      false: {
        item: [
          // fix 'text-base-master',
          // 'data-highlighted:text-base-900',
          // 'data-[state=open]:text-base-900',
          'transition-colors'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--ui-color-design-plain-content-icon-secondary)',
          'group-data-highlighted:text-(--ui-color-accent-main-primary)',
          'group-data-[state=open]:text-(--ui-color-accent-main-primary)',
          'transition-colors'
        ].join(' ')
      },
      true: {
        item: [
          'text-(--ui-color-accent-main-primary) hover:text-(--ui-color-accent-main-primary)'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--ui-color-accent-main-primary) group-data-[state=open]:text-(--ui-color-accent-main-primary)'
          // fix 'text-base-master group-data-[state=open]:text-base-master'
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
        // label: 'h-9 ps-2 pe-3 text-sm gap-2',
        // item: 'h-9 ps-3 pe-3 text-sm gap-2',
        itemLeadingIcon: 'size-[18px]',
        // itemLeadingAvatarSize: 'xs',
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
          'text-base-master data-highlighted:text-base-900 data-[state=open]:text-base-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-base-500 group-data-highlighted:text-base-master group-data-[state=open]:text-base-master'
        ].join(' ')
      }
    },
    {
      color: 'default',
      active: true,
      class: {
        item: [
          'text-base-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-base-master group-data-[state=open]:text-base-master'
        ].join(' ')
      }
    },
    {
      color: 'danger',
      active: false,
      class: {
        item: [
          'text-red-950 data-highlighted:text-red-900 data-[state=open]:text-red-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-red-500 group-data-highlighted:text-red-900 group-data-[state=open]:text-red-900'
        ].join(' ')
      }
    },
    {
      color: 'danger',
      active: true,
      class: {
        item: [
          'text-red-900'
        ].join(' '),
        itemLeadingIcon: [
          'text-red-900 group-data-[state=open]:text-red-900'
        ].join(' ')
      }
    }
    // {
    //   color: 'success',
    //   active: false,
    //   class: {
    //     item: [
    //       'text-green-950 data-highlighted:text-green-900 data-highlighted:before:bg-green-100 data-[state=open]:text-green-900 data-[state=open]:before:bg-green-100'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-green-500 group-data-highlighted:text-green-900 group-data-[state=open]:text-green-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'success',
    //   active: true,
    //   class: {
    //     item: [
    //       'text-green-900 before:bg-green-100'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-green-900 group-data-[state=open]:text-green-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'warning',
    //   active: false,
    //   class: {
    //     item: [
    //       'text-orange-950 data-highlighted:text-orange-900 data-highlighted:before:bg-orange-100 data-[state=open]:text-orange-900 data-[state=open]:before:bg-orange-100'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-orange-500 group-data-highlighted:text-orange-900 group-data-[state=open]:text-orange-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'warning',
    //   active: true,
    //   class: {
    //     item: [
    //       'text-orange-900 before:bg-orange-100'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-orange-900 group-data-[state=open]:text-orange-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'primary',
    //   active: false,
    //   class: {
    //     item: [
    //       'text-blue-950 data-highlighted:text-blue-900 data-highlighted:before:bg-blue-100 data-[state=open]:text-blue-900 data-[state=open]:before:bg-blue-100'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-blue-500 group-data-highlighted:text-blue-900 group-data-[state=open]:text-blue-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'primary',
    //   active: true,
    //   class: {
    //     item: [
    //       'text-blue-900 before:bg-blue-100'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-blue-900 group-data-[state=open]:text-blue-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'secondary',
    //   active: false,
    //   class: {
    //     item: [
    //       'text-cyan-950 data-highlighted:text-cyan-900 data-highlighted:before:bg-cyan-100/50 data-[state=open]:text-cyan-900 data-[state=open]:before:bg-cyan-100/50'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-cyan-500 group-data-highlighted:text-cyan-900 group-data-[state=open]:text-cyan-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'secondary',
    //   active: true,
    //   class: {
    //     item: [
    //       'text-cyan-900 before:bg-cyan-100/50'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-cyan-900 group-data-[state=open]:text-cyan-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'collab',
    //   active: false,
    //   class: {
    //     item: [
    //       'text-collab-900 data-highlighted:text-collab-900 data-highlighted:before:bg-collab-100 data-[state=open]:text-collab-900 data-[state=open]:before:bg-collab-100'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-collab-600 group-data-highlighted:text-collab-900 group-data-[state=open]:text-collab-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'collab',
    //   active: true,
    //   class: {
    //     item: [
    //       'text-collab-900 before:bg-collab-100'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-collab-900 group-data-[state=open]:text-collab-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'ai',
    //   active: false,
    //   class: {
    //     item: [
    //       'text-ai-950 data-highlighted:text-ai-900 data-highlighted:before:bg-ai-100/50 data-[state=open]:text-ai-900 data-[state=open]:before:bg-ai-100/50'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-ai-500 group-data-highlighted:text-ai-900 group-data-[state=open]:text-ai-900'
    //     ].join(' ')
    //   }
    // },
    // {
    //   color: 'ai',
    //   active: true,
    //   class: {
    //     item: [
    //       'text-ai-900 before:bg-ai-100/50'
    //     ].join(' '),
    //     itemLeadingIcon: [
    //       'text-ai-900 group-data-[state=open]:text-ai-900'
    //     ].join(' ')
    //   }
    // }
  ],
  defaultVariants: {
    size: 'md'
  }
}
