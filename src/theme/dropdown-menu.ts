/**
 * DropdownMenu
 * A menu to display actions when clicking on an element.
 * ---
 * @link /api_d7/bitrix/ui/buttons/button.php
 * @see bitrix/js/ui/buttons/src/button/
 * @see src/theme/dropdown-menu.ts
 * @todo add Badge
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
      'relative',
      'isolate',
      'px-0 py-(--menu-popup-padding)',
      'pointer-events-auto'
    ].join(' '),
    viewport: [
      'relative',
      'w-[240px] max-h-[60vh]',
      'overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-transparent'
    ].join(' '),
    arrow: 'fill-(--popup-window-background-color)', // for content bottom|top::start -> ml-[12px]
    group: 'grid', // p-1 isolate
    label: [
      'w-full min-w-[195px] h-[36px]',
      'px-[25px] mt-(--menu-item-block-stack-space)',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      'text-start',
      'text-(length:--menu-popup-item-font-size)',
      'text-(--menu-popup-item-color)',
      'opacity-70'
    ].join(' '),
    separator: 'mx-0 my-0 h-px bg-(--ui-color-divider-vibrant-default)',
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
      'transition-colors'
    ].join(' '),
    itemLeadingIcon: [
      'shrink-0',
      'size-[18px]',
      'text-(--ui-color-design-plain-content-icon-secondary)',
      'group-data-highlighted:text-(--ui-color-accent-main-primary)',
      'group-data-[state=checked]:text-(--ui-color-accent-main-primary)',
      'transition-colors'
    ].join(' '),
    itemLeadingAvatar: 'shrink-0 size-[16px] mx-px', // @memo 18-2px
    itemLeadingAvatarSize: '2xs', // @memo this wrong
    itemTrailing: 'ml-auto rtl:ml-0 rtl:mr-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0 size-[20px] text-(--ui-color-design-plain-content-icon-secondary)',
    itemTrailingKbds: 'shrink-0 hidden lg:inline-flex items-center gap-0.5',
    itemTrailingKbdsSize: 'md',
    itemLabel: 'truncate ms-[2px] -mt-px',
    itemLabelExternalIcon: 'inline-block size-[16px] text-(--ui-color-design-plain-content-icon-secondary)'
  },
  variants: {
    color: {
      'air-primary': { item: 'style-filled' },
      'air-primary-success': { item: 'style-filled-success' },
      'air-primary-alert': { item: 'style-filled-alert' },
      'air-primary-copilot': { item: 'style-filled-copilot' },
      'air-primary-warning': { item: 'style-filled-warning' },
      // @deprecate ////
      'default': { item: 'style-old-default' },
      'danger': { item: 'style-old-danger' },
      'success': { item: 'style-old-success' },
      'warning': { item: 'style-old-warning' },
      'primary': { item: 'style-old-primary' },
      'secondary': { item: 'style-old-secondary' },
      'collab': { item: 'style-old-collab' },
      'ai': { item: 'style-old-ai' }
    },
    active: {
      true: {
        item: [
          'text-(--ui-color-accent-main-primary)',
          'hover:text-(--ui-color-accent-main-primary)'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--ui-color-accent-main-primary)',
          'hover:text-(--ui-color-accent-main-primary)',
          'group-data-[state=open]:text-(--ui-color-accent-main-primary)'
        ].join(' ')
      },
      false: {}
    },
    loading: {
      true: {
        itemLeadingIcon: 'animate-spin'
      }
    }
  },
  compoundVariants: [
    {
      color: ['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-primary-warning'],
      active: false,
      class: {
        item: [
          'text-(--b24ui-background) data-highlighted:text-(--b24ui-background-hover) data-[state=open]:text-(--b24ui-background-hover)'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--b24ui-background) group-data-highlighted:text-(--b24ui-background-hover) group-data-[state=open]:text-(--b24ui-background-hover)'
        ].join(' ')
      }
    },
    {
      color: ['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-primary-warning'],
      active: true,
      class: {
        item: [
          'text-(--b24ui-background-active)'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--b24ui-background-active) group-data-[state=open]:text-(--b24ui-background-active)'
        ].join(' ')
      }
    },
    {
      color: 'default',
      active: false,
      class: ''
    },
    {
      color: 'default',
      active: true,
      class: ''
    },
    {
      color: ['danger', 'success', 'warning', 'primary', 'secondary', 'collab', 'ai'],
      active: false,
      class: {
        item: [
          'text-(--b24ui-background-active) data-highlighted:text-(--b24ui-background-hover) data-[state=open]:text-(--b24ui-background-hover)'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--b24ui-icon) group-data-highlighted:text-(--b24ui-icon) group-data-[state=open]:text-(--b24ui-icon)'
        ].join(' ')
      }
    },
    {
      color: ['danger', 'success', 'warning', 'primary', 'secondary', 'collab', 'ai'],
      active: true,
      class: {
        item: [
          'text-(--b24ui-background-active)'
        ].join(' '),
        itemLeadingIcon: [
          'text-(--b24ui-background-active) group-data-[state=open]:text-(--b24ui-background-active)'
        ].join(' ')
      }
    }
  ],
  defaultVariants: {}
}
