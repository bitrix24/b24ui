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
import { buttonGroupVariantWithRoot } from './button-group'
// import colorDropDownItem from './tools/color-drop-down-item'

// @todo fix this
const defSize = {
  label: 'h-9 ps-2 pe-3 text-sm gap-2',
  item: 'h-9 ps-3 pe-3 text-sm gap-2',
  itemLeadingIcon: 'size-5',
  itemLeadingAvatarSize: '2xs',
  itemLeadingChip: 'size-3 not-group-data-reka-collection-item:ps-2.5',
  itemLeadingChipSize: 'sm',
  itemTrailingIcon: 'size-3',
  trailingIcon: 'size-lg2'
}

export default () => {
  return defuFn(
    {
      slots: {
        root: () => 'isolate relative inline-flex items-center', // @memo remove ? w-full
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
        // @todo fix this
        arrow: 'fill-base-master/10',
        // @todo fix this
        content: [
          'w-(--reka-select-trigger-width)',
          // 'max-h-60',
          'min-w-fit',
          // 'h-(--reka-popper-available-height)',
          'bg-white',
          'shadow-md rounded-2xs ring ring-base-300',
          'overflow-hidden',
          'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
          'origin-(--reka-select-content-transform-origin)',
          'flex flex-col',
          'pointer-events-auto'
        ].join(' '),
        // @todo fix this
        viewport: [
          'relative',
          'divide-y divide-base-master/10',
          'scroll-py-1',
          'overflow-y-auto',
          'flex-1'
        ].join(' '),
        group: 'p-1 isolate',
        // @todo fix this
        empty: 'py-2 text-center text-sm text-base-500',
        // @todo fix this
        label: [
          'flex items-center',
          'font-semibold text-base-900'
        ].join(' '),
        // @todo fix this
        separator: '-mx-1 my-1 h-px bg-base-master/10',
        // @todo fix this
        item: [
          'group',
          'w-full',
          'relative',
          'flex items-center',
          'select-none outline-none',
          'cursor-pointer',
          'before:absolute before:z-[-1] before:inset-px before:rounded-2xs',
          'data-disabled:cursor-not-allowed data-disabled:opacity-75',
          'text-base-master',
          'data-highlighted:not-data-disabled:text-base-900 data-highlighted:not-data-disabled:before:bg-base-100/50',
          'data-[state=checked]:text-base-900 data-[state=checked]:before:bg-base-100/50',
          'transition-colors',
          // from dropdown-menu
          'text-(--menu-popup-item-color) hover:text-(--menu-popup-item-color-hover)',
          'data-highlighted:text-(--menu-popup-item-color-hover)',
          // 'data-[state=open]:text-(--menu-popup-item-color-hover)',
          'hover:bg-(--menu-popup-item-bg-color-hover)',
          'data-highlighted:bg-(--menu-popup-item-bg-color-hover)',
          // 'data-[state=open]:bg-(--menu-popup-item-bg-color-hover)',
          // from list colors for dropdown
          ''
        ].join(' '),
        // @todo fix this
        itemLeadingIcon: [
          'shrink-0',
          'size-[18px]',
          'text-(--ui-color-design-plain-content-icon-secondary)',
          'group-data-highlighted:not-data-disabled:text-(--ui-color-accent-main-primary)',
          // 'group-data-[state=open]:text-(--ui-color-accent-main-primary)',
          'group-data-[state=checked]:text-(--ui-color-accent-main-primary)',
          'transition-colors'
        ].join(' '),
        itemLeadingAvatar: 'shrink-0',
        itemLeadingAvatarSize: '',
        itemLeadingChip: 'shrink-0',
        itemLeadingChipSize: '',
        itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
        itemTrailingIcon: 'shrink-0',
        itemLabel: 'truncate'
      },
      variants: {
        ...buttonGroupVariantWithRoot,
        size: {
          xss: defSize,
          xs: defSize,
          sm: defSize,
          md: defSize,
          lg: defSize,
          xl: defSize
        }
        // ...colorDropDownItem
      },
      compoundVariants: [
        // from dropdown-menu
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
      ]
    },
    input
  )
}
