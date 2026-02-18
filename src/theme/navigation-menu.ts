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
 */

export default {
  slots: {
    root: 'relative flex [&>div]:min-w-0 font-[family-name:var(--ui-font-family-secondary)]',
    list: 'isolate min-w-0',
    label: [
      'w-full h-[22px] overflow-hidden mt-[10px]',
      'opacity-70 text-(length:--ui-font-size-sm)'
    ].join(' '),
    item: 'min-w-0',
    link: [
      'min-w-[38px] w-full max-w-full', // max-w-[212px]
      'p-0',
      'm-0',
      'group relative',
      'cursor-pointer',
      'flex items-center gap-[2px]',
      'font-(--ui-font-weight-normal) text-(length:--ui-font-size-lg)',
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
    linkLeadingChipSize: 'sm',
    linkLeadingHint: [
      'inline-flex m-0 absolute -top-[5px] left-[8px]',
      'text-(length:--ui-font-size-4xs)',
      'leading-[8px]',
      'font-semibold',
      'text-(--b24ui-typography-description-color)',
      'uppercase',
      'ml-px'
    ].join(' '),
    linkLeadingBadge: 'inline-flex m-0 absolute',
    linkLeadingBadgeSize: 'xs',
    linkTrailing: 'group inline-flex mt-[2px] items-center',
    linkTrailingIcon: [
      'text-(--ui-color-design-plain-na-content-icon)',
      'shrink-0'
    ].join(' '),
    linkLabel: 'truncate', // @memo remove -mt-px
    linkLabelWrapper: 'flex items-center justify-between rtl:flex-row-reverse',
    linkLabelExternalIcon: 'inline-block size-[16px] text-(--ui-color-design-plain-content-icon-secondary)',
    childList: 'isolate',
    childLabel: '',
    childItem: 'h-[36px] mt-(--menu-item-block-stack-space)',
    childLink: [
      'group relative',
      'size-full',
      'flex flex-row rtl:flex-row-reverse items-center transition-colors',
      'text-start'
    ].join(' '),
    childLinkWrapper: 'min-w-0 flex-1 flex flex-row items-center justify-start rtl:justify-end gap-0.5',
    childLinkIcon: 'size-[18px] shrink-0',
    childLinkHint: [
      'inline-flex m-0 absolute -top-[2px] left-[24px]',
      'text-(length:--ui-font-size-4xs)',
      'leading-[8px]',
      'font-semibold',
      'text-(--b24ui-typography-description-color)',
      'uppercase',
      'ml-px'
    ].join(' '),
    childLinkBadge: 'inline-flex m-0',
    childLinkBadgeSize: 'xs',
    childLinkLabel: 'truncate ms-[2px] -mt-px',
    childLinkLabelExternalIcon: 'inline-block size-4 text-(--ui-color-design-plain-content-icon-secondary)',
    separator: 'h-px bg-(--leftmenu-bg-divider) my-[16px]',
    popoverWrapper: 'px-0 py-(--menu-popup-padding)',
    viewportWrapper: 'absolute top-[53px] left-0 flex w-full',
    viewport: [
      'relative overflow-hidden',
      'w-full',
      'base-mode',
      'bg-(--ui-color-bg-content-primary)',
      'shadow-(--popup-window-box-shadow)',
      'h-(--reka-navigation-menu-viewport-height)',
      'w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)',
      'rounded-(--ui-border-radius-xl) will-change-[opacity]',
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
        linkTrailingIcon: 'size-[16px]',
        linkLeadingBadge: '-top-[6px] -right-[14px] -translate-x-1/2',
        linkLabelWrapper: 'gap-[4px] truncate',
        childList: 'grid px-0 py-(--menu-popup-padding)',
        childLink: [
          'px-[18px]', // @memo 10 + 15 = 25 != 18px
          'min-w-[195px]',
          'whitespace-nowrap',
          'font-[family-name:var(--ui-font-family-primary)]',
          'text-(length:--ui-font-size-md)',
          'text-(--b24ui-typography-legend-color) hover:text-(--b24ui-typography-label-color)',
          'hover:bg-(--ui-color-divider-optical-1-alt)'
        ].join(' '),
        childLinkLabel: '',
        content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-transparent'
      },
      vertical: {
        root: 'flex-col w-full ps-(--menu-items-block-padding-x) rtl:pe-(--menu-items-block-padding-x)',
        list: 'flex flex-col',
        item: [
          'mt-(--menu-item-block-stack-space)',
          'data-[state=open]:rounded-(--menu-item-border-radius) data-[state=open]:border-(length:--leftmenu-group-stroke-weight) data-[state=open]:border-(--leftmenu-group-stroke)'
        ].join(' '),
        link: [
          'menu-item-vertical',
          'overflow-hidden',
          'h-[38px] min-h-[38px]',
          'p-[6px]',
          'flex-row rtl:flex-row-reverse justify-between',
          'data-[state=open]:text-(length:--ui-font-size-sm) data-[state=open]:opacity-70'
        ].join(' '),
        linkLeadingIcon: '', // group-data-[state=open]:size-[22px]
        linkTrailingIcon: 'size-[20px] group-data-[state=open]:rotate-180 transition-transform duration-200',
        linkLeadingBadge: '-top-[4px] left-[24px] -translate-x-1/2',
        linkLabelWrapper: 'relative h-[22px]',
        childList: '',
        childLink: [
          'px-[18px]', // @memo 10 + 15 = 25 != 18
          'min-w-[195px]',
          'whitespace-nowrap',
          'font-[family-name:var(--ui-font-family-primary)]',
          'text-(length:--ui-font-size-md)',
          'text-(--b24ui-typography-legend-color) hover:text-(--b24ui-typography-label-color)',
          'hover:bg-(--ui-color-divider-optical-1-alt)'
        ].join(' '),
        // @memo 10 + 15 = 25 != 18
        childLabel: [
          'w-full min-w-[195px] h-(--popup-window-delimiter-section-height)',
          'px-[18px] mt-(--menu-item-block-stack-space)',
          'flex flex-row rtl:flex-row-reverse items-center',
          'select-none outline-none whitespace-nowrap',
          'text-start',
          'text-(length:--ui-size-sm)',
          'text-(--b24ui-typography-legend-color)',
          'font-(--ui-font-weight-normal)',
          'after:ms-[10px] after:block after:flex-1 after:min-w-[15px] after:h-px after:bg-(--ui-color-divider-vibrant-default)'
        ].join(' ')
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
        content: 'w-[240px]'
      }
    },
    {
      orientation: 'vertical',
      collapsed: false,
      class: {
        item: 'data-[state=open]:bg-(--leftmenu-group-bg)',
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
        childList: 'grid px-0 py-(--menu-popup-padding)',
        linkLabel: 'hidden',
        linkTrailing: 'hidden'
      }
    },
    {
      orientation: 'vertical',
      collapsed: false,
      class: {
        link: 'collapsed data-[state=open]:-mt-(--leftmenu-group-stroke-weight) data-[state=open]:-mx-(--leftmenu-group-stroke-weight)'
      }
    },
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
