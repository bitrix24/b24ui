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
    linkLeadingIcon: 'shrink-0 size-4 -ms-1 rtl:-ms-0 rtl:-me-1',
    linkLeadingAvatar: 'shrink-0 -ms-1 rtl:-ms-0 rtl:-me-1',
    linkLeadingAvatarSize: '2xs',
    linkTrailing: 'inline-flex gap-1.5 items-center',
    linkTrailingBadge: 'shrink-0',
    linkTrailingBadgeSize: 'sm',
    linkTrailingIcon: 'text-base-600 size-4 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
    linkLabel: 'truncate',
    linkLabelWrapper: 'flex items-center items-center justify-between rtl:flex-row-reverse gap-1.5',
    linkLabelExternalIcon: 'inline-block h-6 w-3 align-top text-base-500 dark:text-base-700',
    childList: '',
    childItem: '',
    childLink: [
      'group',
      'size-full',
      'px-3 py-2',
      'rounded-2xs',
      'flex items-start gap-2',
      'text-start'
    ].join(' '),
    childLinkWrapper: 'flex flex-col items-start',
    childLinkIcon: 'size-5 shrink-0',
    childLinkLabel: 'font-semibold text-sm relative inline-flex',
    childLinkLabelExternalIcon: 'inline-block h-6 w-3 align-top text-base-500 dark:text-base-700',
    childLinkDescription: 'text-sm text-base-500 dark:text-base-700',
    separator: 'px-2 h-px bg-base-950/10 dark:bg-base-100/20',
    viewportWrapper: 'absolute top-full left-0 flex w-full',
    viewport: [
      'relative overflow-hidden',
      'w-full',
      'bg-white dark:bg-base-dark',
      'shadow-lg',
      'rounded-2xs',
      'ring ring-base-300 dark:ring-base-800',
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
    arrow: [
      'relative top-[50%] size-2.5 rotate-45',
      'border border-base-300 dark:border-base-800',
      'bg-white dark:bg-base-dark',
      'z-[1] rounded-3xs'
    ].join(' ')
  },
  variants: {
    // @todo add all ////
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
    // @todo add all ////
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
        childLink: [
          'bg-base-250/80 dark:bg-white/10',
          'text-base-950 dark:text-base-50',
          'font-semibold'
        ].join(' '),
        childLinkIcon: 'text-base-950 dark:text-base-50'
      },
      false: {
        link: 'text-base-900 dark:text-base-200',
        linkLeadingIcon: 'text-base-500 dark:text-base-700',
        childLink: [
          'hover:bg-base-250/80 dark:hover:bg-white/10',
          'text-base-500 dark:text-base-700',
          'hover:text-base-950 dark:hover:dark:text-base-50',
          'transition-colors'
        ].join(' '),
        childLinkIcon: [
          'text-base-500 dark:text-base-700',
          'group-hover:text-base-950 dark:group-hover:text-base-50',
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
        link: ['after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-[7px] after:rounded-full', 'after:transition-colors']
      }
    },
    // endregion ////
    // region pill ////
    {
      disabled: false,
      active: false,
      variant: 'pill',
      class: {
        link: [
          'transition-colors before:transition-colors'
        ].join(' '),
        linkLeadingIcon: [
          'group-hover:text-base-900 dark:group-hover:text-base-200',
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
        link: 'before:rounded-md data-[state=open]:text-base-950 dark:data-[state=open]:text-base-50',
        linkLeadingIcon: 'group-data-[state=open]:text-base-950 dark:group-data-[state=open]:text-base-50'
      }
    },
    {
      disabled: false,
      variant: 'pill',
      highlight: true,
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:before:rounded-md data-[state=open]:before:bg-base-250/80 dark:data-[state=open]:before:bg-white/10'
      }
    },
    {
      disabled: false,
      variant: 'pill',
      highlight: false,
      active: false,
      orientation: 'horizontal',
      class: {
        link: 'data-[state=open]:before:bg-base-250/80 dark:data-[state=open]:before:bg-white/10'
      }
    },


    // @todo add all ////
    {
      color: 'default',
      variant: 'pill',
      active: true,
      class: {
        linkLeadingIcon: 'text-white dark:text-white group-data-[state=open]:text-white dark:group-data-[state=open]:text-white',
        linkLabel: [
          'font-semibold',
          'text-white dark:text-white'
        ].join(' '),
        linkLabelWrapper: [
          'px-3',
          '-ms-3 rtl:-me-3 rtl:ms-0',
          'leading-[1.563rem]',
          'bg-base-800 dark:bg-white/35',
          'rounded-2xl'
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
          'font-semibold',
          'text-white dark:text-white'
        ].join(' '),
        linkLabelWrapper: [
          'px-3',
          '-ms-3 rtl:-me-3 rtl:ms-0',
          'leading-[1.563rem]',
          'bg-base-800 dark:bg-white/35',
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
          'hover:before:bg-base-250/80 dark:hover:before:bg-white/10',
          'before:transition-colors'
        ]
      }
    },
    // endregion ////
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
          'group-hover:text-base-950 dark:group-hover:text-base-50',
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
        link: 'data-[state=open]:text-base-950 dark:data-[state=open]:text-base-50',
        linkLeadingIcon: 'group-data-[state=open]:text-base-950 dark:group-data-[state=open]:text-base-50'
      }
    },
    // @todo add all ////
    {
      color: 'default',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-base-950 dark:text-base-50',
        linkLeadingIcon: 'text-base-95 group-data-[state=open]:text-base-50'
      }
    },
    // endregion ////
    // region highlight.Color ////
    // @todo add all ////
    {
      highlightColor: 'default',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-base-500'
      }
    },
    // endregion ////
    // region collapsed ////
    {
      orientation: 'vertical',
      collapsed: false,
      class: {
        childList: '',
        childItem: '[&>*]:ps-[44px] rtl:[&>*]:pe-[44px]'
      }
    },
    {
      orientation: 'vertical',
      collapsed: true,
      class: {
        link: 'px-1.5'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    color: 'default',
    highlightColor: 'default',
    variant: 'pill'
  }
}
