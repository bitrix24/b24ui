/**
 * DropdownMenu
 * A menu to display actions when clicking on an element.
 * ---
 * @memo not use size - md
 * @see src/theme/context-menu.ts
 * @see src/theme/editor-suggestion-menu.ts
 */

export default {
  slots: {
    content: [
      'base-mode',
      'bg-(--ui-color-bg-content-primary)',
      'shadow-(--popup-window-box-shadow)',
      'rounded-(--ui-border-radius-xl) will-change-[opacity]',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'origin-(--reka-dropdown-menu-content-transform-origin)',
      'font-[family-name:var(--ui-font-family-primary)]',
      'relative',
      'isolate',
      'px-0 py-(--menu-popup-padding) bitrix-mobile:py-0!',
      'pointer-events-auto'
    ].join(' '),
    input: 'border-b border-default w-full',
    empty: 'text-center text-description p-2.5 text-sm',
    viewport: [
      'relative',
      'w-full max-h-[40vh] min-w-48',
      'overflow-x-hidden overflow-y-auto scrollbar-thin'
    ].join(' '),
    arrow: 'fill-(--ui-color-bg-content-primary)',
    group: 'grid',
    label: [
      'w-full h-(--popup-window-delimiter-section-height)',
      'bitrix-mobile:h-[27px]',
      'px-4.5 mt-(--menu-item-block-stack-space)',
      'bitrix-mobile:pe-0 bitrix-mobile:mt-0 bitrix-mobile:-mb-[12px]',
      'flex flex-row rtl:flex-row-reverse items-center',
      'select-none outline-none whitespace-nowrap',
      'text-start',
      'text-(length:--ui-size-sm)',
      'text-(--ui-color-base-3)',
      'bitrix-mobile:[&_[data-slot="itemLabel"]]:text-(--ui-color-base-5)',
      'font-(--ui-font-weight-normal)',
      'after:ms-[10px] after:block after:flex-1 after:min-w-[15px] after:h-px after:bg-(--ui-color-divider-vibrant-default)'
    ].join(' '),
    separator: [
      'bg-(--ui-color-divider-vibrant-default)',
      'my-2 mx-4.5 h-px',
      'bitrix-mobile:my-0 bitrix-mobile:mx-0 bitrix-mobile:h-1.5'
    ].join(' '),
    item: [
      'group',
      'w-full h-[36px]',
      'bitrix-mobile:h-[42px]',
      'px-4.5 pe-2 mt-(--menu-item-block-stack-space)',
      'bitrix-mobile:mt-0',
      'relative',
      'flex flex-row rtl:flex-row-reverse items-center gap-2',
      'select-none outline-none whitespace-nowrap',
      'cursor-pointer',
      'data-disabled:cursor-not-allowed data-disabled:opacity-30',
      'text-start',
      'text-(length:--ui-font-size-md)',
      'text-(--ui-color-base-1)',
      'hover:text-(--ui-color-base-1)',
      'data-highlighted:text-(--ui-color-base-1)',
      'data-[state=open]:text-(--ui-color-base-1)',
      'hover:bg-(--ui-color-divider-optical-1-alt)',
      'data-highlighted:bg-(--ui-color-divider-optical-1-alt)',
      'data-[state=open]:bg-(--ui-color-divider-optical-1-alt)',
      'bitrix-mobile:data-[state=open]:bg-(--ui-color-bg-state-hover-default)',
      'transition-colors',
      'bitrix-mobile:[[data-slot="item"]+&]:border-t',
      'bitrix-mobile:border-t-(--ui-color-divider-vibrant-default)',
      'bitrix-mobile:data-highlighted:bg-(--ui-color-bg-state-hover-default)'
    ].join(' '),
    itemLeadingIcon: [
      'shrink-0',
      'size-[25px]',
      'text-(--ui-color-base-5)',
      'group-data-highlighted:text-(--ui-color-accent-main-primary)',
      'group-data-[state=open]:text-(--ui-color-accent-main-primary)',
      'group-data-[state=checked]:text-(--ui-color-accent-main-primary)',
      'transition-colors'
    ].join(' '),
    itemLeadingAvatar: 'shrink-0 size-[16px] me-2', // @memo 18-2px
    itemLeadingAvatarSize: '2xs', // @memo this wrong
    itemTrailing: 'ml-auto rtl:ml-0 rtl:mr-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0 size-[25px] text-(--ui-color-accent-main-primary)',
    itemTrailingKbds: 'shrink-0 hidden lg:inline-flex items-center gap-0.5',
    itemTrailingKbdsSize: 'md',
    itemWrapper: 'flex-1 flex flex-col text-start min-w-0',
    itemLabel: [
      'max-w-60 truncate -mt-px',
      'group-data-[state=checked]:text-(--ui-color-accent-main-primary)'
    ].join(' '),
    itemDescription: 'max-w-60 truncate -mt-[6px] text-(--b24ui-typography-description-color) text-(length:--ui-font-size-sm)',
    itemLabelExternalIcon: 'inline-block size-[25px] text-(--ui-color-base-5)'
  },
  variants: {
    color: {
      'air-primary': { item: 'style-filled' },
      'air-primary-success': { item: 'style-filled-success' },
      'air-primary-alert': { item: 'style-filled-alert' },
      'air-primary-copilot': { item: 'style-filled-copilot' },
      'air-primary-warning': { item: 'style-filled-warning' },
      /* @deprecate This rule is deprecated and will be removed in version 3.0.0 */
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
    /* @deprecate This rule is deprecated and will be removed in version 3.0.0 */
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
    /* @deprecate This rule is deprecated and will be removed in version 3.0.0 */
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
