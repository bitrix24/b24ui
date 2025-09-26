/**
 * Select
 * A select element to choose from a list of options.
 * ---
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/..
 * @todo fix docs
 */

import { defuFn } from 'defu'
import input from './input'
import { fieldGroupVariantWithRoot } from './field-group'

export default () => {
  return defuFn(
    {
      slots: {
        root: () => 'isolate relative inline-flex items-center', // @todo !!! ? w-full need
        base: () => [
          'relative inline-flex items-center group',
          'px-3',
          'w-full py-0 border-0 focus:outline-none',
          'cursor-pointer',
          'disabled:cursor-not-allowed',
          'disabled:pointer-events-none',
          'disabled:opacity-30',
          'disabled:resize-none',
          'appearance-none transition duration-300 ease-linear', // transition-colors
          'ring ring-inset',
          'ring-(--ui-color-design-outline-stroke)',
          'text-(--ui-color-base-1)',
          'style-blurred-bg-input',
          'hover:text-(--ui-color-base-1)',
          'focus:text-(--ui-color-base-1)',
          'active:text-(--ui-color-base-1)',
          'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
          'align-middle',
          'text-ellipsis whitespace-nowrap',
          'focus-visible:ring-1',
          'focus-visible:ring-inset',
          'focus-visible:ring-(--b24ui-border-color)'
        ].join(' '),
        value: 'truncate pointer-events-none',
        placeholder: 'truncate text-(--ui-color-design-plain-na-content-secondary)',
        content: [
          'light',
          // w-(--reka-combobox-trigger-width)
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
          'w-[240px] max-h-[40vh]',
          'overflow-x-hidden overflow-y-auto scrollbar-thin' // scrollbar-transparent
        ].join(' '),
        arrow: 'fill-(--popup-window-background-color)', // for content bottom|top::start -> ml-[12px]
        group: 'grid',
        empty: [
          'h-(--popup-window-delimiter-section-height)',
          'mt-(--menu-item-block-stack-space)',
          'py-[8px]',
          'select-none outline-none whitespace-nowrap',
          'text-center',
          'text-(length:--popup-window-delimiter-font-size)/(--ui-font-line-height-lg)',
          'text-(--popup-window-delimiter-text-color)',
          'font-(--popup-window-delimiter-font-weight)'
        ].join(' '),
        label: [
          'w-full min-w-[195px] h-(--popup-window-delimiter-section-height)',
          'px-[18px] mt-(--menu-item-block-stack-space)',
          'flex flex-row rtl:flex-row-reverse items-center',
          'select-none outline-none whitespace-nowrap',
          'text-start',
          'text-(length:--popup-window-delimiter-font-size)',
          'text-(--popup-window-delimiter-text-color)',
          'font-(--popup-window-delimiter-font-weight)',
          'after:ms-[10px] after:block after:flex-1 after:min-w-[15px] after:h-px after:bg-(--popup-window-delimiter-bg-color)'
        ].join(' '),
        separator: 'my-[8px] mx-[18px] h-[1px] bg-(--popup-window-delimiter-bg-color)',
        item: [
          'group',
          'w-full min-w-[195px] h-[36px]',
          'px-[18px] mt-(--menu-item-block-stack-space)',
          'relative',
          'flex flex-row rtl:flex-row-reverse items-center',
          'select-none outline-none whitespace-nowrap',
          'cursor-pointer',
          'data-disabled:cursor-not-allowed data-disabled:opacity-30',
          'text-start',
          'text-(length:--menu-popup-item-font-size)',
          'text-(--menu-popup-item-color) hover:text-(--menu-popup-item-color-hover)',
          'data-highlighted:not-data-disabled:text-(--menu-popup-item-color-hover)',
          'data-[state=open]:text-(--menu-popup-item-color-hover)',
          'data-[state=checked]:text-(--menu-popup-item-color-hover)',
          'hover:bg-(--menu-popup-item-bg-color-hover)',
          'data-highlighted:bg-(--menu-popup-item-bg-color-hover)',
          'data-[state=open]:bg-(--menu-popup-item-bg-color-hover)',
          'transition-colors'
        ].join(' '),
        itemLeadingIcon: [
          'shrink-0',
          'size-[18px]',
          'text-(--ui-color-design-plain-content-icon-secondary)',
          'group-data-highlighted:not-data-disabled:text-(--ui-color-accent-main-primary)',
          'group-data-[state=open]:text-(--ui-color-accent-main-primary)',
          'group-data-[state=checked]:text-(--ui-color-accent-main-primary)',
          'transition-colors'
        ].join(' '),
        itemLeadingAvatar: 'shrink-0 size-[16px] mx-px', // @memo 18-2px
        itemLeadingAvatarSize: '2xs', // @memo this wrong
        itemLeadingChip: 'shrink-0 size-[16px] mx-px',
        itemLeadingChipSize: 'sm',
        itemTrailing: 'ml-auto rtl:ml-0 rtl:mr-auto inline-flex gap-1.5 items-center',
        itemTrailingIcon: 'shrink-0 size-[24px] text-(--ui-color-design-plain-content-icon-secondary)',
        itemLabel: [
          'truncate ms-[2px] -mt-px',
          'group-data-[state=checked]:text-(--ui-color-accent-main-primary)'
        ].join(' ')
      },
      variants: {
        ...fieldGroupVariantWithRoot,
        size: {
          xss: {
            base: 'h-[20px] gap-1 text-(length:--ui-font-size-4xs)/[normal]',
            leading: 'px-1',
            trailing: 'px-1',
            leadingIcon: 'size-[12px]',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-[12px]'
          },
          xs: {
            base: 'h-[24px] gap-1 text-(length:--ui-font-size-xs)/[normal]',
            leading: 'px-1',
            trailing: 'px-1',
            leadingIcon: 'size-[14px]',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-[14px]'
          },
          sm: {
            base: 'h-[28px] gap-1.5 text-(length:--ui-font-size-sm)/[normal]',
            leading: 'px-1.5',
            trailing: 'px-1.5',
            leadingIcon: 'size-[16px]',
            leadingAvatar: 'size-[16px]',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-[16px]'
          },
          md: {
            base: 'h-[34px] gap-1.5 text-(length:--ui-font-size-lg)/[normal]',
            leading: 'px-2',
            trailing: 'px-2',
            leadingIcon: 'size-[18px]',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-[18px]'
          },
          lg: {
            base: 'h-[38px] gap-2 text-(length:--ui-font-size-lg)/[normal]',
            leading: 'px-2',
            trailing: 'px-2',
            leadingIcon: 'size-[22px]',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-[22px]'
          },
          xl: {
            base: 'h-[46px] gap-2 text-(length:--ui-font-size-2xl)/[normal]',
            leading: 'px-2',
            trailing: 'px-2',
            leadingIcon: 'size-[22px]',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-[22px]'
          }
        },
        colorItem: {
          'air-primary': { item: 'style-filled' },
          'air-primary-success': { item: 'style-filled-success' },
          'air-primary-alert': { item: 'style-filled-alert' },
          'air-primary-copilot': { item: 'style-filled-copilot' },
          'air-primary-warning': { item: 'style-filled-warning' },
          'default': { item: 'style-old-default' },
          'danger': { item: 'style-old-danger' },
          'success': { item: 'style-old-success' },
          'warning': { item: 'style-old-warning' },
          'primary': { item: 'style-old-primary' },
          'secondary': { item: 'style-old-secondary' },
          'collab': { item: 'style-old-collab' },
          'ai': { item: 'style-old-ai' }
        }
      },
      compoundVariants: (prev: Record<string, any>[]) => {
        return [
          // from dropdown-menu
          {
            colorItem: ['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-primary-warning'],
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
            colorItem: ['air-primary', 'air-primary-success', 'air-primary-alert', 'air-primary-copilot', 'air-primary-warning'],
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
            colorItem: 'default',
            active: false,
            class: ''
          },
          {
            colorItem: 'default',
            active: true,
            class: ''
          },
          {
            colorItem: ['danger', 'success', 'warning', 'primary', 'secondary', 'collab', 'ai'],
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
            colorItem: ['danger', 'success', 'warning', 'primary', 'secondary', 'collab', 'ai'],
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
          ...prev.map(item => ({
            ...item,
            class: typeof item.class === 'string' ? replaceFocus(item.class) : item.class
          }))
        ]
      }
    },
    input
  )
}

function replaceFocus(str: string): string {
  return str
    .replace(/focus-visible:/g, 'focus:')
}
