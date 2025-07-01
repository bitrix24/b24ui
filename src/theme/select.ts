/**
 * Select
 * A select element to choose from a list of options.
 * ---
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/..
 */

import { defuFn } from 'defu'
import input from './input'
import { buttonGroupVariantWithRoot } from './button-group'
import colorDropDownItem from './tools/color-drop-down-item'

const defSize = {
  label: 'h-9 ps-2 pe-3 text-sm gap-2',
  item: 'h-9 ps-3 pe-3 text-sm gap-2',
  itemLeadingIcon: 'size-5',
  itemLeadingAvatarSize: '2xs',
  itemLeadingChip: 'size-3 not-group-data-reka-collection-item:ps-2.5',
  itemLeadingChipSize: 'sm',
  itemTrailingIcon: 'size-3',
  // scrollUpDownButtonIcon: 'size-4',
  trailingIcon: 'size-lg2'
}

export default () => {
  return defuFn(
    {
      slots: {
        root: () => 'isolate relative inline-flex items-center w-full',
        base: () => [
          'px-3',
          'relative inline-flex items-center group',
          'py-0 border-0 focus:outline-none',
          'cursor-pointer disabled:cursor-not-allowed',
          'disabled:bg-base-30/37 disabled:text-base-500',
          'dark:disabled:bg-base-900/37 dark:disabled:text-base-800',
          'appearance-none transition duration-300 ease-linear', // transition-colors
          'ring ring-inset ring-base-300',
          'dark:ring-base-800',
          'text-base-master bg-white hover:text-base-900 focus:text-base-900 active:text-base-900',
          'dark:text-base-150 dark:bg-transparent dark:hover:text-base-350 dark:focus:text-base-350 dark:active:text-base-350',
          'font-b24-primary font-regular text-sm leading-tight',
          'align-middle',
          'text-ellipsis whitespace-nowrap'
        ].join(' '),
        value: 'truncate pointer-events-none',
        placeholder: 'truncate text-base-400 dark:text-base-300',
        arrow: 'fill-base-master/10 dark:fill-base-100/20',
        content: [
          'w-(--reka-select-trigger-width)',
          // 'max-h-60',
          'min-w-fit',
          // 'h-(--reka-popper-available-height)',
          'bg-white dark:bg-base-dark',
          'shadow-md rounded-2xs ring ring-base-300 dark:ring-base-800',
          'overflow-hidden',
          'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
          'origin-(--reka-select-content-transform-origin)',
          'flex flex-col',
          'pointer-events-auto'
        ].join(' '),
        // scrollUpDownButton: [
        //  'flex items-center justify-center h-[25px] cursor-default backdrop-blur',
        //  'text-base-800 bg-white',
        //  'dark:text-base-100 dark:bg-base-dark'
        // ].join(' '),
        // scrollUpDownButtonIcon: '',
        viewport: [
          'relative',
          'divide-y divide-base-master/10 dark:divide-base-100/20',
          'scroll-py-1',
          'overflow-y-auto',
          'flex-1'
        ].join(' '),
        group: 'p-1 isolate',
        empty: 'py-2 text-center text-sm text-base-500 dark:text-base-600',
        label: [
          'flex items-center',
          'font-semibold text-base-900 dark:text-base-200'
        ].join(' '),
        separator: '-mx-1 my-1 h-px bg-base-master/10 dark:bg-base-100/20',
        item: [
          'group relative w-full flex items-center select-none outline-none',
          'before:absolute before:z-[-1] before:inset-px before:rounded-2xs',
          'cursor-pointer',
          'data-disabled:cursor-not-allowed data-disabled:opacity-75',
          'text-base-master dark:text-base-150',
          'data-highlighted:not-data-disabled:text-base-900 dark:data-highlighted:not-data-disabled:text-base-200 data-highlighted:not-data-disabled:before:bg-base-100/50 dark:data-highlighted:not-data-disabled:before:bg-base-900',
          'data-[state=checked]:text-base-900 dark:data-[state=checked]:text-base-200 data-[state=checked]:before:bg-base-100/50 dark:data-[state=checked]:before:bg-base-900',
          'transition-colors before:transition-colors'
        ].join(' '),
        itemLeadingIcon: [
          'shrink-0 transition-colors',
          'text-base-500 dark:text-base-700',
          'group-data-highlighted:not-data-disabled:text-base-master dark:group-data-highlighted:not-data-disabled:text-base-150',
          'group-data-[state=checked]:text-base-master dark:group-data-[state=checked]:text-base-150'
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
          xs: defSize,
          sm: defSize,
          md: defSize,
          lg: defSize
        },
        ...colorDropDownItem
      }
    },
    input
  )
}
