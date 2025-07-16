/**
 * NavigationMenu
 * A link list that can be arranged in horizontal or vertical orientation.
 * ---
 * @see sidebar-section.ts for orientation vertical
 *
 * @memo remove contentOrientation
 * @memo remove highlight
 * @memo remove highlightColor
 * @memo remove arrow indicator
 * @memo remove color
 * @memo remove variant (link) -> use variant.pill
 *
 * @todo improve docs
 * @todo add docs props.hint
 */

export default {
  slots: {
    root: 'relative flex [&>div]:min-w-0 font-b24-secondary',
    list: 'isolate min-w-0',
    label: [
      'w-full h-[22px] overflow-hidden',
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
      'flex items-center gap-[2px]',
      'font-normal text-lg',
      'focus:outline-none focus-visible:rounded-(--menu-item-border-radius) focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-(--ui-color-base-4)',
      'rounded-(--menu-item-border-radius)',
      'text-(--menu-item-color)',
      'bg-(--menu-item-background)',
      'hover:bg-(--menu-item-background-hover) data-[state=open]:bg-(--menu-item-background-hover)',
      'border-0'
    ].join(' '),
    linkLeadingIcon: 'shrink-0 size-[26px]',
    linkLeadingAvatar: 'shrink-0',
    linkLeadingAvatarSize: 'xs',
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
    linkTrailing: 'group inline-flex mt-[2px] items-center   ',
    linkTrailingIcon: [
      'text-(--ui-color-design-plain-na-content-icon)',
      'size-[14px]',
      'shrink-0'
    ].join(' '),
    linkLabel: 'truncate -mt-px',
    linkLabelWrapper: 'flex items-center justify-between rtl:flex-row-reverse',
    linkLabelExternalIcon: 'inline-block size-4 text-(--ui-color-design-plain-content-icon-secondary)',
    childList: 'isolate',
    childLabel: [
      'text-xs text-highlighted'
    ].join(' '),
    childItem: 'h-[36px]',
    childLink: [
      'group relative',
      'size-full',
      'flex flex-row rtl:flex-row-reverse items-center transition-colors',
      'text-start'
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
    childLinkLabel: 'truncate ms-[2px] -mt-px',
    childLinkLabelExternalIcon: 'inline-block size-4 text-(--ui-color-design-plain-content-icon-secondary)',
    separator: 'h-px bg-(--leftmenu-bg-divider) my-[16px]',
    viewportWrapper: 'absolute top-[53px] left-0 flex w-full',
    viewport: [
      'relative overflow-hidden',
      'w-full',
      'light --ui-context-content-light',
      'bg-(--popup-window-background-color)', // 'bg-(--ui-color-base-white-fixed)/94',
      'shadow-(--popup-window-box-shadow)',
      'h-(--reka-navigation-menu-viewport-height)',
      'w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)',
      'rounded-(--popup-window-border-radius) will-change-[opacity]',
      '[&:has(>[data-viewport=rtl])]:left-auto [&:has(>[data-viewport=rtl])]:-right-[calc(100%-var(--reka-navigation-menu-viewport-width))]',
      'transition-[width,height] duration-200 origin-[top_center]', // left
      // @memo see components/popup.css
      // 'border border-(--popup-window-border)'
      'z-[1]'
    ].join(' '),
    content: ''
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'relative h-full items-center justify-between',
        list: 'flex items-center gap-x-1 h-full',
        item: 'empty:hidden',
        link: [
          'menu-item-horizontal',
          'h-[32px] min-h-[32px]',
          'px-[10px]',
          'border border-(--menu-item-background) hover:border-(--ui-color-design-plain-na-focused-stroke) data-[state=open]:bg-(--ui-color-design-plain-na-focused-stroke)'
        ].join(' '),
        linkLeadingBadge: '-top-[6px] -right-[14px] -translate-x-1/2',
        linkLabelWrapper: 'gap-[4px]',
        childList: 'grid px-0 py-(--menu-popup-padding)',
        childLink: [
          'px-[25px]', // @memo 10 + 15
          'min-w-[195px]',
          'whitespace-nowrap',
          'font-(family-name:--ui-font-family-primary)',
          'text-(length:--menu-popup-item-font-size)',
          'text-(--menu-popup-item-color) hover:text-(--menu-popup-item-color-hover)',
          'hover:bg-(--menu-popup-item-bg-color-hover)'
        ].join(' '),
        childLinkLabel: '',
        content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-transparent'
      },
      vertical: {
        root: 'flex-col w-full ps-(--menu-items-block-padding-x) rtl:pe-(--menu-items-block-padding-x)',
        list: 'flex flex-col',
        link: [
          'menu-item-vertical',
          'h-[38px] min-h-[38px]',
          'p-[6px]',
          'mt-(--menu-item-block-stack-space)',
          'flex-row rtl:flex-row-reverse'
        ].join(' '),
        linkLeadingBadge: '-top-[4px] left-[24px] -translate-x-1/2',
        linkLabelWrapper: 'relative',
        childLabel: 'px-1.5 py-0.5',
        childLink: 'p-1.5 gap-1.5'
      }
    },
    active: {
      true: {
        childLink: [
          'text-(--ui-color-accent-main-primary) hover:text-(--ui-color-accent-main-primary)' // [#0075ff]
        ].join(' '),
        childLinkIcon: 'text-(--ui-color-accent-main-primary)'
      },
      false: {
        linkLeadingIcon: 'text-(--ui-color-design-plain-content-icon-secondary)',
        childLinkIcon: [
          'text-(--ui-color-design-plain-content-icon-secondary)',
          'group-hover:text-(--ui-color-accent-main-primary)'
        ].join(' ')
      }
    },
    disabled: {
      true: {
        link: 'cursor-not-allowed opacity-75'
      }
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
      class: {
        childList: '',
        content: 'w-60'
      }
    },
    {
      orientation: 'vertical',
      collapsed: false,
      class: {
        childList: '',
        childItem: '',
        content: 'motion-safe:data-[state=open]:animate-[collapsible-down_200ms_ease-out] motion-safe:data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden',
        linkLabel: 'ms-[9px]'
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
    // {
    //   orientation: 'horizontal',
    //   class: {
    //     link: ['after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full', 'after:transition-colors']
    //   }
    // },
    // endregion ////
    // region vertical ////
    // {
    //   orientation: 'vertical',
    //   level: true,
    //   class: {
    //     link: ['after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-[7px] after:rounded-full', 'after:transition-colors']
    //   }
    // },
    // endregion ////
    // region pill ////
    {
      disabled: false,
      active: false,
      class: {
        link: 'transition-colors',
        linkLeadingIcon: 'group-hover:text-(--ui-color-design-selection-content-icon)'
      }
    },
    {
      active: true,
      class: {
        link: [
          'leading-9',
          'text-(--menu-item-color-active)',
          'bg-(--menu-item-background-active)'
        ].join(' ')
      }
    },
    {
      active: true,
      orientation: 'horizontal',
      class: {
        link: 'menu-item-horizontal-active border-(--menu-item-border)'
      }
    },
    {
      active: true,
      orientation: 'vertical',
      class: {
        link: 'menu-item-vertical-active'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
  }
}
