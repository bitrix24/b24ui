/**
 * NavigationMenu
 * A link list that can be arranged in horizontal or vertical orientation.
 * ---
 * @see sidebar-section.ts for orientation vertical
 *
 * @todo add docs props.hint
 * @todo remove props.variant.link
 * @todo remove props.arrow
 */

// @todo remove this
// arrow: [
//   'relative top-[50%] size-2.5 rotate-45',
//   'border border-base-300 dark:border-base-800',
//   'bg-white dark:bg-base-dark',
//   'z-[1] rounded-3xs'
// ].join(' ')

// background-color: var(--popup-window-background-color, #fff);
// --- box-shadow: var(--popup-window-box-shadow, 0 7px 21px rgba(83, 92, 105, .12), 0 -1px 6px 0 rgba(83, 92, 105, .06));
// padding: 10px;
// font: 13px var(--ui-font-family-primary, var(--ui-font-family-helvetica));
// -webkit-box-sizing: border-box;
// box-sizing: border-box;
// display: flex ;
// flex-direction: column;
// justify-content: stretch;

// --- border-radius: var(--popup-window-border-radius);
// --- border: var(--popup-window-border, none);
// --- will-change: opacity;

export default {
  slots: {
    // root: 'relative flex [&>div]:min-w-0 font-b24-secondary', // fix
    root: 'relative flex [&>div]:min-w-0 font-b24-secondary',
    list: 'isolate min-w-0',
    label: [
      // 'w-full min-h-6', // fix
      'w-full h-[22px] overflow-hidden',
      // 'flex items-center rtl:flex-row-reverse gap-1.5', // fix
      // 'flex items-center rtl:flex-row-reverse',
      // 'font-medium text-xs/6',  // fix
      // 'text-base-500 dark:text-base-400', // fix
      // 'ps-2xl pe-xs rtl:ps-xs rtl:pe-2xl' // fix
      'opacity-70 text-(length:--ui-font-size-sm)'
    ].join(' '),
    item: 'min-w-0',
    link: [
      'min-w-[38px] max-w-full',
      'p-0',
      'm-0',

      'group relative',
      'cursor-pointer',
      'w-full',
      // 'font-normal text-lg leading-9 min-h-9', // fix
      'flex items-center gap-[2px]',
      // 'before:absolute before:z-[-1]', // fix
      // 'focus:outline-none focus-visible:before:rounded-md focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2' // fix
      'font-normal text-lg',
      'focus:outline-none focus-visible:rounded-(--menu-item-border-radius) focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-(--ui-color-base-4)',
      'rounded-(--menu-item-border-radius)',
      'text-(--menu-item-color)',
      'bg-(--menu-item-background)',
      'hover:bg-(--menu-item-background-hover) data-[state=open]:bg-(--menu-item-background-hover)',
      'border-0'
    ].join(' '),
    // linkLeadingIcon: 'shrink-0 size-4 -ms-1 rtl:-ms-0 rtl:-me-1', // fix
    linkLeadingIcon: 'shrink-0 size-[26px]',
    linkLeadingAvatar: 'shrink-0 -ms-1 rtl:-ms-0 rtl:-me-1',
    linkLeadingAvatarSize: '2xs',
    linkLeadingHint: [
      'inline-flex m-0 absolute -top-[5px] left-[8px]',
      'text-(length:--ui-font-size-4xs)',
      'leading-[8px]',
      'font-semibold',
      'text-(--ui-color-design-plain-na-content)',
      'uppercase',
      'ml-px'
    ].join(' '),
    linkLeadingBadge: 'inline-flex m-0 absolute',
    linkLeadingBadgeSize: 'sm',
    // linkTrailing: 'group inline-flex gap-1.5 items-center', //fix
    linkTrailing: 'group inline-flex mt-[4px] items-center',
    // linkTrailingBadge: 'shrink-0',  // fix
    // linkTrailingBadgeSize: 'sm', // fix
    // linkTrailingIcon: 'text-base-600 size-4 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200', // fix
    linkTrailingIcon: [
      'text-(--ui-color-design-plain-na-content-icon)',
      'size-[14px]',
      'shrink-0'
    ].join(' '),
    linkLabel: 'truncate',
    // linkLabelWrapper: 'flex items-center justify-between rtl:flex-row-reverse gap-1.5', // fix
    linkLabelWrapper: 'flex items-center justify-between rtl:flex-row-reverse',
    linkLabelExternalIcon: 'inline-block h-6 w-3 align-top text-base-500 dark:text-base-700',
    childList: 'isolate',
    childLabel: [
      'text-xs text-highlighted'
      // 'text-base-500 dark:text-base-400' // fix
    ].join(' '),
    childItem: 'h-[36px]',
    childLink: [
      'group relative',
      'size-full',
      // 'rounded-2xs',
      // 'flex items-start text-start text-sm', // fix
      'flex flex-row rtl:flex-row-reverse items-center gap-[2px] transition-colors',
      'text-start'
      // 'before:absolute before:z-[-1] before:rounded-2xs', // fix
      // 'focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2' fix
    ].join(' '),
    childLinkWrapper: 'min-w-0 flex-1 flex flex-row items-center justify-start gap-0.5',
    childLinkIcon: 'size-[18px] shrink-0',
    childLinkHint: [
      'inline-flex m-0 absolute -top-[2px] left-[24px]',
      'text-(length:--ui-font-size-4xs)',
      'leading-[8px]',
      'font-semibold',
      'text-(--ui-color-design-plain-na-content)',
      'uppercase',
      'ml-px'
    ].join(' '),
    childLinkBadge: 'inline-flex m-0',
    childLinkBadgeSize: 'sm',
    childLinkLabel: 'truncate',
    childLinkLabelExternalIcon: 'inline-block h-6 w-3 align-top text-base-500 dark:text-base-700',
    // childLinkDescription: 'text-base-500 dark:text-base-700', // fix -> remove
    separator: 'px-2 h-px bg-base-950/10 dark:bg-base-100/20',
    // viewportWrapper: 'absolute top-full left-0 flex w-full', // fix
    viewportWrapper: 'absolute top-[53px] left-0 flex w-full',
    viewport: [
      'relative overflow-hidden',
      'w-full',
      'light --ui-context-content-light',
      // 11
      'bg-(--popup-window-background-color)', // 'bg-(--ui-color-base-white-fixed)/94',
      'shadow-(--popup-window-box-shadow)',
      'h-(--reka-navigation-menu-viewport-height)',
      'transition-[width,height] duration-200 origin-[top_center]', // left
      // 'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]'
      'z-[1]'
    ].join(' '),
    content: '',
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
        // link: 'focus-visible:before:ring-base-300 dark:focus-visible:before:ring-base-800', // fix
        link: '',
        // childLink: 'focus-visible:before:ring-base-300 dark:focus-visible:before:ring-base-800' // fix
        childLink: ''
      }
      // @todo uncoment
      /*
      danger: {
        link: 'focus-visible:before:ring-red-300 dark:focus-visible:before:ring-red-800',
        childLink: 'focus-visible:before:ring-red-300 dark:focus-visible:before:ring-red-800'
      },
      success: {
        link: 'focus-visible:before:ring-green-300 dark:focus-visible:before:ring-green-800',
        childLink: 'focus-visible:before:ring-green-300 dark:focus-visible:before:ring-green-800'
      },
      warning: {
        link: 'focus-visible:before:ring-orange-300 dark:focus-visible:before:ring-orange-800',
        childLink: 'focus-visible:before:ring-orange-300 dark:focus-visible:before:ring-orange-800'
      },
      primary: {
        link: 'focus-visible:before:ring-blue-300 dark:focus-visible:before:ring-blue-800',
        childLink: 'focus-visible:before:ring-blue-300 dark:focus-visible:before:ring-blue-800'
      },
      secondary: {
        link: 'focus-visible:before:ring-cyan-300 dark:focus-visible:before:ring-cyan-800',
        childLink: 'focus-visible:before:ring-cyan-300 dark:focus-visible:before:ring-cyan-800'
      },
      collab: {
        link: 'focus-visible:before:ring-collab-300 dark:focus-visible:before:ring-collab-800',
        childLink: 'focus-visible:before:ring-collab-300 dark:focus-visible:before:ring-collab-800'
      },
      ai: {
        link: 'focus-visible:before:ring-ai-300 dark:focus-visible:before:ring-ai-800',
        childLink: 'focus-visible:before:ring-ai-300 dark:focus-visible:before:ring-ai-800'
      }.
      */
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
          // 'hover:before:bg-base-250/80 dark:hover:before:bg-white/10', // fix
          ''
        ].join(' '),
        // 11
        viewport: [
          'rounded-(--popup-window-border-radius) will-change-[opacity]',
          // 'border border-(--popup-window-border)' // @memo see components/popup.css
        ].join(' ')
      },
      link: ''
    },
    orientation: {
      horizontal: {
        root: 'relative h-full items-center justify-between',
        list: 'flex items-center gap-x-1 h-full',
        item: 'empty:hidden',
        // link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0', // fix
        link: [
          'menu-item-horizontal',
          'h-[32px] min-h-[32px]',
          'px-[10px]',
          'border border-(--menu-item-background) hover:border-(--ui-color-design-plain-na-focused-stroke) data-[state=open]:bg-(--ui-color-design-plain-na-focused-stroke)'
        ].join(' '),
        linkLeadingBadge: '-top-[6px] -right-[14px] -translate-x-1/2',
        linkLabelWrapper: 'gap-[4px]',
        childList: 'grid px-0 py-(--menu-popup-padding)',
        // childLink: 'px-3 py-2 gap-2 before:inset-x-px before:inset-y-0', // fix
        childLink: [
          'px-[25px]', // @memo 10 + 15
          'min-w-[195px]',
          'whitespace-nowrap',
          'font-(family-name:--ui-font-family-primary)',
          'text-(length:--menu-popup-item-font-size)',
          'text-(--menu-popup-item-color) hover:text-(--menu-popup-item-color-hover)',
          'hover:bg-(--menu-popup-item-bg-color-hover)'
        ].join(' '),
        // childLinkLabel: 'font-medium', // fix
        childLinkLabel: '',
        content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto'
      },
      vertical: {
        root: 'flex-col w-full ps-(--menu-items-block-padding-x) rtl:pe-(--menu-items-block-padding-x)',
        list: 'flex flex-col', // fix
        link: [
          'menu-item-vertical',
          'h-[38px] min-h-[38px]',
          // 'ps-2xl pe-xs rtl:ps-xs rtl:pe-2xl', // fix
          'p-[6px]',
          'mt-(--menu-item-block-stack-space)',
          'flex-row rtl:flex-row-reverse'
          // 'before:inset-y-px before:inset-x-0' // fix
        ].join(' '),
        linkLeadingBadge: 'top-[3px] left-[27px] -translate-x-1/2',
        linkLabelWrapper: 'gap-[9px]',
        childLabel: 'px-1.5 py-0.5',
        // childLink: 'p-1.5 gap-1.5 before:inset-y-px before:inset-x-0' // fix
        childLink: 'p-1.5 gap-1.5'
      }
    },
    contentOrientation: {
      // horizontal: {
      //   // viewport: '',
      //   viewportWrapper: 'justify-center',
      //   content: 'motion-safe:data-[motion=from-start]:animate-[enter-from-left_200ms_ease] motion-safe:data-[motion=from-end]:animate-[enter-from-right_200ms_ease] motion-safe:data-[motion=to-start]:animate-[exit-to-left_200ms_ease] motion-safe:data-[motion=to-end]:animate-[exit-to-right_200ms_ease]',
      //   childLinkLabelExternalIcon: [
      //     'h-4'
      //   ].join(' ')
      // },
      vertical: {
        viewport: [
          'w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)',
          '[&:has(>[data-viewport=rtl])]:left-auto [&:has(>[data-viewport=rtl])]:-right-[calc(100%-var(--reka-navigation-menu-viewport-width))]'
        ].join(' '),
        // content: '',
        childLinkLabel: [
          // 'text-md', // fix
          // 'text-base-950 dark:text-base-50' // fix
        ].join(' '),
        childLinkLabelExternalIcon: [
          'size-4'
        ].join(' ')
      }
    },
    active: {
      true: {
        childLink: [
          // 'before:bg-base-20 dark:before:bg-base-900',  // fix
          // 'text-base-950 dark:text-base-50',  // fix
          'text-(--ui-color-accent-main-primary) hover:text-(--ui-color-accent-main-primary)' // [#0075ff]
          // 'font-semibold'  // fix
        ].join(' '),
        // childLinkIcon: 'text-base-950 dark:text-base-200' // fix
        childLinkIcon: 'text-(--ui-color-accent-main-primary)'
      },
      false: {
        // link: 'text-base-900 dark:text-base-200', // fix
        // linkLeadingIcon: 'text-base-500 dark:text-base-700', // fix
        linkLeadingIcon: 'text-(--ui-color-design-plain-content-icon-secondary)',
        childLink: [
          // 'hover:before:bg-base-20 dark:hover:before:bg-base-900', // fix
          // 'text-base-500', // fix
          // 'hover:text-base-950 dark:hover:text-base-200', // fix
          // 'hover:text-base-950', // fover
          // 'transition-colors before:transition-colors' // fix
          ''
        ].join(' '),
        childLinkIcon: [
          'text-base-500 dark:text-base-700',
          // 'group-hover:text-base-950 dark:group-hover:text-base-50', // fix
          'group-hover:text-(--ui-color-accent-main-primary)'
          // 'transition-colors' // fix
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
        // childList: 'gap-1', // fix
        childList: '',
        content: 'w-60'
      }
    },
    {
      orientation: 'vertical',
      collapsed: false,
      class: {
        childList: '',
        childItem: '[&>*]:ps-[44px] rtl:[&>*]:pe-[44px]',
        content: 'motion-safe:data-[state=open]:animate-[collapsible-down_200ms_ease-out] motion-safe:data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden'
      }
    },
    {
      orientation: 'vertical',
      collapsed: true,
      class: {
        link: 'px-1.5',
        content: 'rounded-sm min-h-6 p-1'
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
          // 'hover:before:rounded-md' // fix
        ].join(' ')
      }
    },
    {
      disabled: false,
      active: false,
      variant: 'pill',
      class: {
        link: [
          // 'transition-colors before:transition-colors' fix
          'transition-colors'
        ].join(' '),
        // linkLeadingIcon: [
        //   'group-hover:text-base-900 dark:group-hover:text-base-200',
        //   'transition-colors'
        // ].join(' ') // fix
        linkLeadingIcon: [
          'group-hover:text-(--ui-color-design-selection-content-icon)'
        ].join(' ')
      }
    },
    {
      disabled: false,
      active: false,
      variant: 'pill',
      orientation: 'horizontal',
      class: {
        // link: 'before:rounded-md data-[state=open]:text-base-950 dark:data-[state=open]:text-base-50', // fix
        link: 'test-0101', // @todo remove
        // linkLeadingIcon: 'group-data-[state=open]:text-base-950 dark:group-data-[state=open]:text-base-50' // fix
        linkLeadingIcon: 'test-0101' // @todo remove
      }
    },
    {
      disabled: false,
      variant: 'pill',
      highlight: true,
      orientation: 'horizontal',
      class: {
        // link: 'data-[state=open]:before:rounded-md data-[state=open]:before:bg-base-250/80 dark:data-[state=open]:before:bg-white/10' // fix
        link: 'test-0102' // @todo remove
      }
    },
    {
      disabled: false,
      variant: 'pill',
      highlight: false,
      active: false,
      orientation: 'horizontal',
      class: {
        // link: 'data-[state=open]:before:bg-base-250/80 dark:data-[state=open]:before:bg-white/10' // fix
        link: 'test-0103' // @todo remove
      }
    },
    {
      color: 'default',
      variant: 'pill',
      active: true,
      class: {
        // linkLeadingIcon: 'text-white dark:text-white group-data-[state=open]:text-white dark:group-data-[state=open]:text-white', // fix
        linkLabel: [
          // 'font-semibold', // fix
          // 'text-white dark:text-white' // fix
        ].join(' '),
        linkLabelWrapper: [
          // 'px-3', // fix
          // '-ms-3 rtl:-me-3 rtl:ms-0', // fix
          // 'leading-[1.563rem]' // fix
          // 'bg-base-800 dark:bg-white/35', // fix
          // 'rounded-2xl' // fix
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
          // 'min-h-9', // fix
          // 'before:rounded-md', // fix
          // 'before:bg-base-800 dark:before:bg-white/35', // fix
          // 'hover:before:bg-base-800 dark:hover:before:bg-white/35', // fix
          // 'hover:bg-base-800 dark:before:bg-white/35', // fix
          // 'data-[state=open]:before:bg-base-800 dark:data-[state=open]:before:bg-white/35' // fix
        ].join(' '),
        linkLabelWrapper: [
          // 'min-h-9', // fix
          // 'bg-inherit dark:bg-inherit', // fix
          // 'rounded-none' fix
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
          'hover:before:bg-red-800 dark:hover:before:bg-red-800',
          'data-[state=open]:before:bg-red-800 dark:data-[state=open]:before:bg-red-800'
        ].join(' '),
        linkLabelWrapper: [
          'min-h-9',
          // 'bg-inherit dark:bg-inherit', // fix
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
          'hover:before:bg-green-800 dark:hover:before:bg-green-800',
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
          'hover:before:bg-orange-800 dark:hover:before:bg-orange-800',
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
          'hover:before:bg-blue-800 dark:hover:before:bg-blue-800',
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
          'hover:before:bg-cyan-800 dark:hover:before:bg-cyan-800',
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
          'hover:before:bg-collab-800 dark:hover:before:bg-collab-800',
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
          'hover:before:bg-ai-800 dark:hover:before:bg-ai-800',
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
          'leading-9',
          'text-(--menu-item-color-active)',
          'bg-(--menu-item-background-active)'
        ].join(' '),
        linkLabel: [
          // 'font-semibold', // fix
          // 'text-white dark:text-white' // fix
        ].join(' '),
        linkLabelWrapper: [
          // 'px-3', // fix
          // '-ms-3 rtl:-me-3 rtl:ms-0', // fix
          // 'leading-[1.563rem]', // fix
          // 'bg-base-800 dark:bg-white/35', // fix
          // 'rounded-2xl' // fix
        ].join(' ')
      }
    },
    {
      variant: 'pill',
      active: true,
      highlight: false,
      orientation: 'horizontal',
      class: {
        link: [
          'menu-item-horizontal-active border-(--menu-item-border)'
        ].join(' ')
      }
    },
    {
      variant: 'pill',
      active: true,
      highlight: false,
      orientation: 'vertical',
      class: {
        link: [
          'menu-item-vertical-active'
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
          // 'bg-inherit dark:bg-inherit' // fix
        ].join(' ')
      }
    },
    {
      variant: 'pill',
      active: true,
      highlight: true,
      disabled: false,
      class: {
        link: [
          // 'hover:before:bg-base-250/80 dark:hover:before:bg-white/10',  // fix
          // 'before:transition-colors' // fix
        ].join(' ')
      }
    },
    {
      color: 'default',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      disabled: false,
      class: {
        link: [
          // 'hover:before:bg-base-800 dark:hover:before:bg-white/35',  // fix
          // 'before:transition-colors'  // fix
        ].join(' ')
      }
    },
    {
      color: 'danger',
      orientation: 'horizontal',
      variant: 'pill',
      active: true,
      highlight: true,
      disabled: false,
      class: {
        link: [
          'hover:before:bg-red-800 dark:hover:before:bg-red-800',
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
      disabled: false,
      class: {
        link: [
          'hover:before:bg-green-800 dark:hover:before:bg-green-800',
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
      disabled: false,
      class: {
        link: [
          'hover:before:bg-orange-800 dark:hover:before:bg-orange-800',
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
      disabled: false,
      class: {
        link: [
          'hover:before:bg-blue-800 dark:hover:before:bg-blue-800',
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
      disabled: false,
      class: {
        link: [
          'hover:before:bg-cyan-800 dark:hover:before:bg-cyan-800',
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
      disabled: false,
      class: {
        link: [
          'hover:before:bg-collab-800 dark:hover:before:bg-collab-800',
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
      disabled: false,
      class: {
        link: [
          // 'hover:before:bg-ai-800 dark:hover:before:bg-ai-800', // fix
          // 'before:transition-colors' // fix
        ].join(' ')
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
