/**
 * NavigationMenu
 * A link list that can be arranged in horizontal or vertical orientation.
 * ---
 * @see sidebar-section.ts for orientation vertical
 *
 * @todo: docs
 * @todo: test
 * @todo: playground
 * @todo: demo
 * @todo: color
 * @todo: rtl
 */

export default {
  slots: {
    root: 'relative flex [&>div]:min-w-0 font-b24-secondary',
    list: 'isolate min-w-0',
    label: [
      'w-full min-h-6',
      'flex items-center rtl:flex-row-reverse gap-1.5',
      'font-medium text-xs/6',
      'text-base-500 dark:text-base-400',
      'ps-2xl pe-xs rtl:ps-xs rtl:pe-2xl'
    ].join(' '),
    item: 'min-w-0',
    link: [
      'group relative',
      'cursor-pointer',
      'w-full',
      'flex items-center gap-1.5',
      'font-normal text-lg leading-9 min-h-9',
      'before:absolute before:z-[-1]',
      'focus:outline-none focus-visible:before:rounded-md focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2'
    ].join(' '),
    linkLeadingIcon: 'shrink-0 size-5',
    linkLeadingAvatar: 'shrink-0',
    linkLeadingAvatarSize: '2xs',
    linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
    linkTrailingBadge: 'shrink-0',
    linkTrailingBadgeSize: 'sm',
    linkTrailingIcon: 'text-base-600 size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
    linkLabel: 'truncate',
    linkLabelExternalIcon: 'inline-block h-6 w-3 align-top text-base-500 dark:text-base-700',
    childList: '',
    childItem: '',
    childLink: [
      'group',
      'size-full',
      'px-3 py-2',
      // 'rounded-md',
      'flex items-start gap-2',
      'text-start'
    ].join(' '),
    childLinkWrapper: 'flex flex-col items-start',
    childLinkIcon: 'size-5 shrink-0',
    childLinkLabel: 'font-semibold text-sm relative inline-flex',
    childLinkLabelExternalIcon: 'inline-block h-6 w-3 align-top text-base-500 dark:text-base-700',
    childLinkDescription: 'text-sm text-(--ui-text-muted)',
    separator: 'px-2 h-px bg-(--ui-border)',
    viewportWrapper: 'absolute top-full left-0 flex w-full',
    viewport: [
      'relative overflow-hidden',
      'w-full',
      'bg-(--ui-bg)',
      'shadow-lg',
      'rounded-md',
      'ring ring-(--ui-border)',
      'h-(--reka-navigation-menu-viewport-height)',
      'transition-[width,height,left] duration-200 origin-[top_center]',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]'
    ].join(' '),
    content: 'absolute top-0 left-0 w-full',
    indicator: [
      'absolute',
      'motion-safe:data-[state=visible]:animate-[fade-in_100ms_ease-out] motion-safe:data-[state=hidden]:animate-[fade-out_100ms_ease-in]',
      'data-[state=hidden]:opacity-0',
      'bottom-0',
      'z-[1]',
      'w-(--reka-navigation-menu-indicator-size)',
      'h-2.5',
      'translate-x-(--reka-navigation-menu-indicator-position)',
      'flex items-end justify-center',
      'overflow-hidden',
      'transition-[translate,width] duration-200'
    ].join(' '),
    arrow: 'relative top-[50%] size-2.5 rotate-45 border border-(--ui-border) bg-(--ui-bg) z-[1] rounded-md'
  },
  variants: {
    color: {
      default: {
        link: 'focus-visible:before:ring-base-300 dark:focus-visible:before:ring-base-800',
        childLink: 'focus-visible:outline-base-300 dark:focus-visible:outline-base-800'
      },
      danger: '',
      success: '',
      warning: '',
      primary: '',
      secondary: '',
      collab: '',
      ai: ''
    },
    highlightColor: {
      default: '',
      danger: '',
      success: '',
      warning: '',
      primary: '',
      secondary: '',
      collab: '',
      ai: ''
    },
    variant: {
      pill: {
        link: [
          'hover:before:bg-base-250/80 dark:hover:before:bg-white/10'
        ].join(' ')
      },
      link: ''
    },
    orientation: {
      horizontal: {
        root: 'items-center justify-between',
        list: 'flex items-center',
        item: 'py-2',
        link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0',
        childList: 'grid p-2'
      },
      vertical: {
        root: 'flex-col w-full',
        link: [
          'ps-2xl pe-xs rtl:ps-xs rtl:pe-2xl',
          'flex-row rtl:flex-row-reverse',
          'before:inset-y-px before:inset-x-0'
        ].join(' ')
      }
    },
    contentOrientation: {
      horizontal: {
        viewport: '',
        viewportWrapper: 'justify-center',
        content: 'motion-safe:data-[motion=from-start]:animate-[enter-from-left_200ms_ease] motion-safe:data-[motion=from-end]:animate-[enter-from-right_200ms_ease] motion-safe:data-[motion=to-start]:animate-[exit-to-left_200ms_ease] motion-safe:data-[motion=to-end]:animate-[exit-to-right_200ms_ease]'
      },
      vertical: {
        viewport: 'sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)',
        content: ''
      }
    },
    active: {
      true: {
        childLink: 'bg-(--ui-bg-elevated) text-(--ui-text-highlighted)',
        childLinkIcon: 'text-(--ui-text)'
      },
      false: {
        link: 'text-base-900 dark:text-base-200',
        linkLeadingIcon: 'text-base-500 dark:text-base-700',
        childLink: [
          'hover:bg-(--ui-bg-elevated)/50 text-(--ui-text) hover:text-(--ui-text-highlighted)',
          'transition-colors'
        ].join(' '),
        childLinkIcon: [
          'text-base-500 dark:text-base-700',
          'group-hover:text-(--ui-text)',
          'transition-colors'
        ].join(' ')
      }
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-75'
      }
    },
    highlight: {
      true: ''
    },
    level: {
      true: ''
    },
    collapsed: {
      true: ''
    }
  },
  compoundVariants: [
    // region horizontal ////
    {
      orientation: 'horizontal',
      contentOrientation: 'horizontal',
      class: {
        childList: 'grid-cols-2 gap-2'
      }
    },
    {
      orientation: 'horizontal',
      contentOrientation: 'vertical',
      class: {
        childList: 'gap-1',
        content: 'w-60'
      }
    },
    {
      orientation: 'horizontal',
      highlight: true,
      class: {
        link: ['after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full', 'after:transition-colors']
      }
    },
    // endregion ////
    // region vertical ////
    {
      orientation: 'vertical',
      highlight: true,
      level: true,
      class: {
        link: ['after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full', 'after:transition-colors']
      }
    },
    // endregion ////
    // region disabled ////
    {
      disabled: false,
      active: false,
      variant: 'pill',
      class: {
        link: [
          'transition-colors before:transition-colors'
        ].join(' '),
        linkLeadingIcon: [
          'group-hover:text-(--ui-text)',
          'transition-colors'
        ].join(' ')
      }
    },
    {
      disabled: false,
      active: false,
      variant: 'pill',
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:text-(--ui-text-highlighted)',
        linkLeadingIcon: 'group-data-[state=open]:text-(--ui-text)'
      }
    },
    {
      disabled: false,
      variant: 'pill',
      highlight: true,
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:before:bg-(--ui-bg-elevated)/50'
      }
    },
    {
      disabled: false,
      variant: 'pill',
      highlight: false,
      active: false,
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:before:bg-(--ui-bg-elevated)/50'
      }
    },
    // endregion ////
    {
      color: 'default',
      variant: 'pill',
      active: true,
      class: {
        // link: 'text-(--ui-text-highlighted)',
        linkLeadingIcon: 'text-(--ui-text-highlighted) group-data-[state=open]:text-(--ui-text-highlighted)',
        linkLabel: [
          'text-white dark:text-white',
          'bg-base-800 dark:bg-white/35'
        ].join(' ')
      }
    },
    {
      variant: 'pill',
      active: true,
      highlight: false,
      class: {
        link: [
          'leading-9'
        ].join(' '),
        linkLabel: [
          'px-3',
          '-ms-3 me-3 rtl:-me-3 rtl:ms-3',
          'font-semibold leading-[1.563rem]',
          'text-white dark:text-white',
          'bg-base-800 dark:bg-white/35', // (--ui-bg-elevated)
          'rounded-2xl'
        ].join(' ')
      }
    },
    {
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-(--ui-bg-elevated)/50',
          'before:transition-colors'
        ]
      }
    },
    // region link ////
    {
      disabled: false,
      active: false,
      variant: 'link',
      class: {
        link: [
          'hover:text-base-950 dark:hover:text-base-50',
          'transition-colors'
        ].join(' '),
        linkLeadingIcon: [
          'group-hover:text-(--ui-text)',
          'transition-colors'
        ].join(' ')
      }
    },
    {
      disabled: false,
      active: false,
      variant: 'link',
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:text-(--ui-text-highlighted)',
        linkLeadingIcon: 'group-data-[state=open]:text-(--ui-text)'
      }
    },
    {
      color: 'default',
      variant: 'link',
      active: true,
      class: {
        link: 'text-(--ui-text-highlighted)',
        linkLeadingIcon: 'text-(--ui-text-highlighted) group-data-[state=open]:text-(--ui-text-highlighted)'
      }
    },
    // endregion ////
    {
      highlightColor: 'default',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-(--ui-bg-inverted)'
      }
    },
    {
      orientation: 'vertical',
      collapsed: false,
      class: {
        childList: 'v-1',
        childItem: 'v-2 [&>a]:ps-[44px]'
      }
    },
    {
      orientation: 'vertical',
      collapsed: true,
      class: {
        link: 'px-1.5'
      }
    }
  ],
  defaultVariants: {
    color: 'default',
    highlightColor: 'default',
    variant: 'pill'
  }
}
