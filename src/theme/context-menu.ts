/**
 * ContextMenu
 * A pop-up menu that appears upon right-clicking an element to present relevant actions.
 * ---
 * @see src/theme/dropdown-menu.ts
 */

export default {
  slots: {
    content: [
      'base-mode',
      // single height cap on content: min(40vh ceiling, popper available-height); viewport scrolls via flex-1
      'flex flex-col',
      'max-h-[min(40vh,var(--reka-context-menu-content-available-height,40vh))]',
      'bg-(--ui-color-bg-content-primary)',
      'shadow-(--popup-window-box-shadow)',
      'rounded-(--ui-border-radius-xl) will-change-[opacity]',
      'motion-safe:data-[state=open]:animate-[scale-in_100ms_ease-out] motion-safe:data-[state=closed]:animate-[scale-out_100ms_ease-in]',
      'origin-(--reka-context-menu-content-transform-origin)',
      'font-[family-name:var(--ui-font-family-primary)]',
      'relative',
      'isolate',
      'px-0 py-(--menu-popup-padding) bitrix-mobile:py-0!',
      'pointer-events-auto'
    ].join(' '),
    viewport: [
      'relative',
      'w-full min-w-48 flex-1',
      'scroll-py-1',
      'overflow-x-hidden overflow-y-auto scrollbar-thin'
    ].join(' '),
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
      'after:ms-2 after:block after:flex-1 after:min-w-3 after:h-px after:bg-(--ui-color-divider-vibrant-default)'
    ].join(' '),
    separator: [
      'bg-(--ui-color-divider-vibrant-default)',
      'my-2 mx-4.5 h-px',
      'bitrix-mobile:my-0 bitrix-mobile:mx-0 bitrix-mobile:h-1.5'
    ].join(' '),
    item: [
      'group',
      'w-full h-9',
      'bitrix-mobile:h-10.5',
      'px-4.5 mt-(--menu-item-block-stack-space)',
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
      'hover:bg-(--ui-color-base-black-fixed)/3 dark:hover:bg-(--ui-color-base-black-fixed)',
      'active:bg-(--ui-color-base-black-fixed)/6 dark:active:bg-(--ui-color-base-black-fixed)',
      'data-highlighted:not-active:bg-(--ui-color-base-black-fixed)/3 dark:data-highlighted:not-active:bg-(--ui-color-base-black-fixed)',
      'data-[state=open]:bg-(--ui-color-base-black-fixed)/6 dark:data-[state=open]:bg-(--ui-color-base-black-fixed)',
      'bitrix-mobile:data-[state=open]:bg-(--ui-color-bg-state-hover-default)',
      'transition-colors',
      'bitrix-mobile:[[data-slot="item"]+&]:border-t',
      'bitrix-mobile:border-t-(--ui-color-divider-vibrant-default)',
      'bitrix-mobile:data-highlighted:bg-(--ui-color-bg-state-hover-default)'
    ].join(' '),
    itemLeadingIcon: 'size-[25px] shrink-0 text-(--ui-color-base-5)',
    itemLeadingAvatar: 'shrink-0 size-4 me-1',
    itemLeadingAvatarSize: '2xs', // @memo this wrong
    itemTrailing: 'ml-auto rtl:ml-0 rtl:mr-auto inline-flex gap-1.5 items-center',
    itemTrailingIcon: 'shrink-0 size-[25px] text-(--ui-color-base-5)',
    itemTrailingKbds: 'shrink-0 hidden lg:inline-flex items-center gap-0.5',
    itemWrapper: 'flex-1 flex flex-col text-start min-w-0',
    itemTrailingKbdsSize: 'md',
    itemLabel: 'max-w-60 truncate -mt-px',
    itemDescription: 'max-w-60 truncate -mt-[6px] text-description text-(length:--ui-font-size-sm)',
    itemLabelExternalIcon: 'inline-block size-[25px] text-(--ui-color-base-5)'
  },
  variants: {
    color: {
      'air-primary': { item: 'style-filled' },
      'air-primary-success': { item: 'style-filled-success' },
      'air-primary-alert': { item: 'style-filled-alert' },
      'air-primary-copilot': { item: 'style-filled-copilot' },
      'air-primary-warning': { item: 'style-filled-warning' }
    },
    active: {
      true: {
        item: '', // bg-(--ui-color-base-black-fixed)/3
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
          'text-(--b24ui-background)',
          'data-highlighted:text-(--b24ui-background-hover) data-[state=open]:text-(--b24ui-background-hover)'
        ].join(' '),
        itemLeadingIcon: 'text-(--b24ui-background)'
      }
    },
    {
      color: ['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-primary-warning'],
      active: true,
      class: {
        item: 'text-(--b24ui-background-active)',
        itemLeadingIcon: 'text-(--b24ui-background-active) group-data-[state=open]:text-(--b24ui-background-active)'
      }
    }
  ],
  defaultVariants: {}
}
