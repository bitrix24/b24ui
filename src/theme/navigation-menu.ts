/**
 * NavigationMenu
 * A link list that can be arranged in horizontal or vertical orientation.
 * ---
 * @see sidebar-section.ts for orientation vertical
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
      'shadow-[0_15px_21px_rgba(83,92,105,.15)]',
      'h-(--reka-navigation-menu-viewport-height)',
      'transition-[width,height] duration-200 origin-[top_center]', // left
      // 'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]'
      'z-[1]'
    ].join(' '),
    content: 'absolute top-0 left-0 w-full',
    indicator: [
      'absolute',
      'motion-safe:data-[state=visible]:animate-[fade-in_100ms_ease-out] motion-safe:data-[state=hidden]:animate-[fade-out_100ms_ease-in]',
      'data-[state=hidden]:opacity-0',
      'bottom-0',
      'z-[2]',
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
    color: {
      default: {
        link: 'focus-visible:before:ring-base-300 dark:focus-visible:before:ring-base-800',
        childLink: 'focus-visible:outline-base-300 dark:focus-visible:outline-base-800'
      },
      danger: {
        link: 'focus-visible:before:ring-red-300 dark:focus-visible:before:ring-red-800',
        childLink: 'focus-visible:outline-red-300 dark:focus-visible:outline-red-800'
      },
      success: {
        link: 'focus-visible:before:ring-green-300 dark:focus-visible:before:ring-green-800',
        childLink: 'focus-visible:outline-green-300 dark:focus-visible:outline-green-800'
      },
      warning: {
        link: 'focus-visible:before:ring-orange-300 dark:focus-visible:before:ring-orange-800',
        childLink: 'focus-visible:outline-orange-300 dark:focus-visible:outline-orange-800'
      },
      primary: {
        link: 'focus-visible:before:ring-blue-300 dark:focus-visible:before:ring-blue-800',
        childLink: 'focus-visible:outline-blue-300 dark:focus-visible:outline-blue-800'
      },
      secondary: {
        link: 'focus-visible:before:ring-cyan-300 dark:focus-visible:before:ring-cyan-800',
        childLink: 'focus-visible:outline-cyan-300 dark:focus-visible:outline-cyan-800'
      },
      collab: {
        link: 'focus-visible:before:ring-collab-300 dark:focus-visible:before:ring-collab-800',
        childLink: 'focus-visible:outline-collab-300 dark:focus-visible:outline-collab-800'
      },
      ai: {
        link: 'focus-visible:before:ring-ai-300 dark:focus-visible:before:ring-ai-800',
        childLink: 'focus-visible:outline-ai-300 dark:focus-visible:outline-ai-800'
      }
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
        ].join(' '),
        viewport: [
          'rounded-md',
          'ring ring-base-300 dark:ring-base-800'
        ].join(' ')
      },
      link: ''
    },
    orientation: {
      horizontal: {
        root: 'items-center justify-between',
        list: 'flex items-center gap-x-1',
        item: 'py-2 empty:hidden',
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
        content: 'motion-safe:data-[motion=from-start]:animate-[enter-from-left_200ms_ease] motion-safe:data-[motion=from-end]:animate-[enter-from-right_200ms_ease] motion-safe:data-[motion=to-start]:animate-[exit-to-left_200ms_ease] motion-safe:data-[motion=to-end]:animate-[exit-to-right_200ms_ease]',
        childLinkLabelExternalIcon: [
          'h-4'
        ].join(' ')
      },
      vertical: {
        viewport: [
          'w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)',
          '[&:has(>[data-viewport=rtl])]:left-auto [&:has(>[data-viewport=rtl])]:-right-[calc(100%-var(--reka-navigation-menu-viewport-width))]'
        ].join(' '),
        content: '',
        childLinkLabel: [
          'text-md',
          'text-base-950 dark:text-base-50'
        ].join(' '),
        childLinkLabelExternalIcon: [
          'h-4'
        ].join(' ')
      }
    },
    active: {
      true: {
        childLink: [
          'bg-base-20 dark:bg-base-900',
          'text-base-950 dark:text-base-50',
          'font-semibold'
        ].join(' '),
        childLinkIcon: 'text-base-950 dark:text-base-200'
      },
      false: {
        link: 'text-base-900 dark:text-base-200',
        linkLeadingIcon: 'text-base-500 dark:text-base-700',
        childLink: [
          'hover:bg-base-20 dark:hover:bg-base-900',
          'text-base-500 dark:text-base-700',
          'hover:text-base-950 dark:hover:dark:text-base-200',
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
      disabled: true,
      orientation: 'horizontal',
      variant: 'pill',
      class: {
        link: [
          'hover:before:rounded-md'
        ].join(' ')
      }
    },
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
      color: 'default',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      class: {
        link: [
          'min-h-9',
          'before:rounded-md',
          'before:bg-base-800 dark:before:bg-white/35',
          'hover:before:bg-base-800 hover:dark:before:bg-white/35',
          'data-[state=open]:before:bg-base-800 dark:data-[state=open]:before:bg-white/35'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          'bg-inherit dark:bg-inherit',
          'rounded-none'
        ].join(' ')
      }
    },
    {
      color: 'danger',
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
          'bg-red-800 dark:bg-red-800',
          'rounded-2xl'
        ].join(' ')
      }
    },
    {
      color: 'danger',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      class: {
        link: [
          'min-h-9',
          'before:rounded-md',
          'before:bg-red-800 dark:before:bg-red-800',
          'hover:before:bg-red-800 hover:dark:before:bg-red-800',
          'data-[state=open]:before:bg-red-800 dark:data-[state=open]:before:bg-red-800'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          'bg-inherit dark:bg-inherit',
          'rounded-none'
        ].join(' ')
      }
    },
    {
      color: 'success',
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
          'bg-green-800 dark:bg-green-800',
          'rounded-2xl'
        ].join(' ')
      }
    },
    {
      color: 'success',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      class: {
        link: [
          'min-h-9',
          'before:rounded-md',
          'before:bg-green-800 dark:before:bg-green-800',
          'hover:before:bg-green-800 hover:dark:before:bg-green-800',
          'data-[state=open]:before:bg-green-800 dark:data-[state=open]:before:bg-green-800'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          'bg-inherit dark:bg-inherit',
          'rounded-none'
        ].join(' ')
      }
    },
    {
      color: 'warning',
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
          'bg-orange-800 dark:bg-orange-800',
          'rounded-2xl'
        ].join(' ')
      }
    },
    {
      color: 'warning',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      class: {
        link: [
          'min-h-9',
          'before:rounded-md',
          'before:bg-orange-800 dark:before:bg-orange-800',
          'hover:before:bg-orange-800 hover:dark:before:bg-orange-800',
          'data-[state=open]:before:bg-orange-800 dark:data-[state=open]:before:bg-orange-800'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          'bg-inherit dark:bg-inherit',
          'rounded-none'
        ].join(' ')
      }
    },
    {
      color: 'primary',
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
          'bg-blue-800 dark:bg-blue-800',
          'rounded-2xl'
        ].join(' ')
      }
    },
    {
      color: 'primary',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      class: {
        link: [
          'min-h-9',
          'before:rounded-md',
          'before:bg-blue-800 dark:before:bg-blue-800',
          'hover:before:bg-blue-800 hover:dark:before:bg-blue-800',
          'data-[state=open]:before:bg-blue-800 dark:data-[state=open]:before:bg-blue-800'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          'bg-inherit dark:bg-inherit',
          'rounded-none'
        ].join(' ')
      }
    },
    {
      color: 'secondary',
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
          'bg-cyan-800 dark:bg-cyan-800',
          'rounded-2xl'
        ].join(' ')
      }
    },
    {
      color: 'secondary',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      class: {
        link: [
          'min-h-9',
          'before:rounded-md',
          'before:bg-cyan-800 dark:before:bg-cyan-800',
          'hover:before:bg-cyan-800 hover:dark:before:bg-cyan-800',
          'data-[state=open]:before:bg-cyan-800 dark:data-[state=open]:before:bg-cyan-800'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          'bg-inherit dark:bg-inherit',
          'rounded-none'
        ].join(' ')
      }
    },
    {
      color: 'collab',
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
          'bg-collab-800 dark:bg-collab-800',
          'rounded-2xl'
        ].join(' ')
      }
    },
    {
      color: 'collab',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      class: {
        link: [
          'min-h-9',
          'before:rounded-md',
          'before:bg-collab-800 dark:before:bg-collab-800',
          'hover:before:bg-collab-800 hover:dark:before:bg-collab-800',
          'data-[state=open]:before:bg-collab-800 dark:data-[state=open]:before:bg-collab-800'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          'bg-inherit dark:bg-inherit',
          'rounded-none'
        ].join(' ')
      }
    },
    {
      color: 'ai',
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
          'bg-ai-800 dark:bg-ai-800',
          'rounded-2xl'
        ].join(' ')
      }
    },
    {
      color: 'ai',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      class: {
        link: [
          'min-h-9',
          'before:rounded-md',
          'before:bg-ai-800 dark:before:bg-ai-800',
          'hover:before:bg-ai-800 hover:dark:before:bg-ai-800',
          'data-[state=open]:before:bg-ai-800 dark:data-[state=open]:before:bg-ai-800'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          'bg-inherit dark:bg-inherit',
          'rounded-none'
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
      orientation: 'horizontal',
      active: true,
      highlight: false,
      class: {
        linkLabelWrapper: [
          'bg-inherit dark:bg-inherit'
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
        ].join(' ')
      }
    },
    {
      color: 'default',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-base-800 hover:dark:before:bg-white/35',
          'before:transition-colors'
        ].join(' ')
      }
    },
    {
      color: 'danger',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-red-800 hover:dark:before:bg-red-800',
          'before:transition-colors'
        ].join(' ')
      }
    },
    {
      color: 'success',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-green-800 hover:dark:before:bg-green-800',
          'before:transition-colors'
        ].join(' ')
      }
    },
    {
      color: 'warning',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-orange-800 hover:dark:before:bg-orange-800',
          'before:transition-colors'
        ].join(' ')
      }
    },
    {
      color: 'primary',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-blue-800 hover:dark:before:bg-blue-800',
          'before:transition-colors'
        ].join(' ')
      }
    },
    {
      color: 'secondary',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-cyan-800 hover:dark:before:bg-cyan-800',
          'before:transition-colors'
        ].join(' ')
      }
    },
    {
      color: 'collab',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-collab-800 hover:dark:before:bg-collab-800',
          'before:transition-colors'
        ].join(' ')
      }
    },
    {
      color: 'ai',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      class: {
        link: [
          'hover:before:bg-ai-800 hover:dark:before:bg-ai-800',
          'before:transition-colors'
        ].join(' ')
      }
    },
    // endregion ////
    // region link ////
    {
      orientation: 'horizontal',
      variant: 'link',
      class: {
        viewportWrapper: [
          'top-[calc(100%+0.4rem)]' // perspective-[2000px]
        ].join(' '),
        viewport: [
          'rounded-b-md',
          '[&:has(>[data-viewport=ltr])]:rounded-tr-md [&:has(>[data-viewport=rtl])]:rounded-tl-md',
          'clip-path-viewport-wrapper'
        ].join(' '),
        link: [
          'before:inset-x-[0px] before:-inset-y-[6px] before:h-[70px]',
          'before:rounded-t-md'
        ].join(' ')
      }
    },
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
      variant: 'link',
      orientation: 'horizontal',
      class: {
        link: [
          'data-[state=open]:before:shadow-[0_6px_21px_rgba(83,92,105,.15)]',
          'data-[state=open]:before:bg-white dark:data-[state=open]:before:bg-base-dark'
        ].join(' ')
      }
    },
    {
      disabled: false,
      active: false,
      variant: 'link',
      orientation: 'horizontal',
      class: {
        link: [
          'data-[state=open]:text-base-950 dark:data-[state=open]:text-base-50'
        ].join(' '),
        linkLeadingIcon: 'group-data-[state=open]:text-base-950 dark:group-data-[state=open]:text-base-50'
      }
    },
    {
      color: 'default',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-base-950 dark:text-base-50',
        linkLeadingIcon: 'text-base-950 group-data-[state=open]:text-base-950 dark:text-base-50 dark:group-data-[state=open]:text-base-50'
      }
    },
    {
      color: 'danger',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-red-800 dark:text-red-600',
        linkLeadingIcon: 'text-red-800 group-data-[state=open]:text-red-600 dark:text-red-600 dark:group-data-[state=open]:text-red-600'
      }
    },
    {
      color: 'success',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-green-800 dark:text-green-600',
        linkLeadingIcon: 'text-green-800 group-data-[state=open]:text-green-600 dark:text-green-600 dark:group-data-[state=open]:text-green-600'
      }
    },
    {
      color: 'warning',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-orange-800 dark:text-orange-600',
        linkLeadingIcon: 'text-orange-800 group-data-[state=open]:text-orange-600 dark:text-orange-600 dark:group-data-[state=open]:text-orange-600'
      }
    },
    {
      color: 'primary',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-blue-850 dark:text-blue-600',
        linkLeadingIcon: 'text-blue-850 group-data-[state=open]:text-blue-600 dark:text-blue-600 dark:group-data-[state=open]:text-blue-600'
      }
    },
    {
      color: 'secondary',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-cyan-800 dark:text-cyan-600',
        linkLeadingIcon: 'text-cyan-800 group-data-[state=open]:text-cyan-600 dark:text-cyan-600 dark:group-data-[state=open]:text-cyan-600'
      }
    },
    {
      color: 'collab',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-collab-800 dark:text-collab-600',
        linkLeadingIcon: 'text-collab-800 group-data-[state=open]:text-collab-600 dark:text-collab-600 dark:group-data-[state=open]:text-collab-600'
      }
    },
    {
      color: 'ai',
      variant: 'link',
      active: true,
      class: {
        link: 'font-semibold text-ai-800 dark:text-ai-600',
        linkLeadingIcon: 'text-ai-800 group-data-[state=open]:text-ai-600 dark:text-ai-600 dark:group-data-[state=open]:text-ai-600'
      }
    },
    // endregion ////
    // region highlight.Color ////
    {
      orientation: 'vertical',
      highlightColor: 'default',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-base-500'
      }
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      highlightColor: 'default',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-base-500'
      }
    },
    {
      orientation: 'vertical',
      highlightColor: 'danger',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-red-500 dark:after:bg-red-600'
      }
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      highlightColor: 'danger',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-red-500 dark:after:bg-red-600'
      }
    },
    {
      orientation: 'vertical',
      highlightColor: 'success',
      highlight: true,
      level: true,
      active: true,
      class: { link: 'after:bg-green-500 dark:after:bg-green-600' }
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      highlightColor: 'success',
      highlight: true,
      level: true,
      active: true,
      class: { link: 'after:bg-green-500 dark:after:bg-green-600' }
    },
    {
      orientation: 'vertical',
      highlightColor: 'warning',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-orange-500 dark:after:bg-orange-600'
      }
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      highlightColor: 'warning',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-orange-500 dark:after:bg-orange-600'
      }
    },
    {
      orientation: 'vertical',
      highlightColor: 'primary',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-blue-500 dark:after:bg-blue-600'
      }
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      highlightColor: 'primary',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-blue-850 dark:after:bg-blue-600'
      }
    },
    {
      orientation: 'vertical',
      highlightColor: 'secondary',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-cyan-500 dark:after:bg-cyan-600'
      }
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      highlightColor: 'secondary',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-cyan-500 dark:after:bg-cyan-600'
      }
    },
    {
      orientation: 'vertical',
      highlightColor: 'collab',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-collab-500 dark:after:bg-collab-600'
      }
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      highlightColor: 'collab',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-collab-500 dark:after:bg-collab-600'
      }
    },
    {
      orientation: 'vertical',
      highlightColor: 'ai',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-ai-500 dark:after:bg-ai-600'
      }
    },
    {
      orientation: 'horizontal',
      variant: 'link',
      highlightColor: 'ai',
      highlight: true,
      level: true,
      active: true,
      class: {
        link: 'after:bg-ai-500 dark:after:bg-ai-600'
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
    contentOrientation: 'vertical',
    variant: 'link'
  }
}
