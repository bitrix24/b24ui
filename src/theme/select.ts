/**
 * Select
 * A select element to choose from a list of options.
 * ---
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/..
 */

/**
 * @todo font
 * @todo icon
 * @todo fix icons problems
 * @todo fix group - select - size
 */
import { defuFn } from 'defu'
import input from './input'
import { buttonGroupVariantWithRoot } from './button-group'

const defSize = {
  label: 'h-9 ps-2 pe-3 text-sm gap-2',
  item: 'h-9 ps-3 pe-3 text-sm gap-2',
  itemLeadingIcon: 'size-5',
  itemLeadingAvatarSize: '2xs',
  itemLeadingChip: 'size-3 not-group-data-reka-collection-item:ps-2.5',
  itemLeadingChipSize: 'sm',
  itemTrailingIcon: 'size-3',
  scrollUpDownButtonIcon: 'size-4',
  trailingIcon: 'size-lg2'
}

export default () => {
  return defuFn(
    {
      slots: {
        root: () => 'relative inline-flex items-center min-w-full w-full',
        base: () => [
          'relative inline-flex items-center group',
          'min-w-full w-full py-0 border-0 focus:outline-none',
          'cursor-pointer disabled:cursor-not-allowed',
          'disabled:bg-base-30/37 disabled:text-base-500',
          'dark:disabled:bg-base-900/37 dark:disabled:text-base-800',
          'appearance-none transition duration-300 ease-linear', // transition-colors
          'ring ring-inset ring-base-300',
          'dark:ring-base-800',
          'text-base-master bg-white hover:text-base-900 focus:text-base-900 active:text-base-900',
          'dark:text-base-150 dark:bg-transparent dark:hover:text-base-350 dark:focus:text-base-350 dark:active:text-base-350',
          'font-b24-primary font-regular text-sm',
          'align-middle',
          'text-ellipsis whitespace-nowrap'
        ],
        value: 'truncate pointer-events-none',
        placeholder: 'truncate text-base-400 dark:text-base-300',
        arrow: 'fill-base-master/10 dark:fill-base-100/20',
        content: [
          'max-h-60 w-[var(--reka-popper-anchor-width)]',
          'bg-white dark:bg-base-dark',
          'shadow-md rounded-2xs ring ring-base-300 dark:ring-base-800',
          'overflow-hidden',
          'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
          'pointer-events-auto'
        ],
        scrollUpDownButton: [
          'flex items-center justify-center h-[25px] cursor-default backdrop-blur',
          'text-base-800 bg-white',
          'dark:text-base-100 dark:bg-base-dark'
        ],
        scrollUpDownButtonIcon: '',
        viewport: 'divide-y divide-base-master/10 dark:divide-base-100/20 scroll-py-1',
        group: 'p-1 isolate',
        empty: 'py-2 text-center text-sm text-base-500 dark:text-base-600',
        label: [
          'flex items-center',
          'font-semibold text-base-900 dark:text-base-200'
        ],
        separator: '-mx-1 my-1 h-px bg-base-master/10 dark:bg-base-100/20',
        item: [
          'group relative w-full flex items-center select-none outline-none',
          'before:absolute before:z-[-1] before:inset-px before:rounded-2xs',
          'cursor-pointer',
          'data-disabled:cursor-not-allowed data-disabled:opacity-75',
          'text-base-master dark:text-base-150 data-highlighted:text-base-900 dark:data-highlighted:text-base-200 data-highlighted:before:bg-base-100/50 dark:data-highlighted:before:bg-base-900',
          'transition-colors before:transition-colors'
        ],
        itemLeadingIcon: [
          'shrink-0 text-base-500 dark:text-base-700 group-data-highlighted:text-base-master dark:group-data-highlighted:text-base-150',
          'transition-colors'
        ],
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
        }
      }
    },
    input
  )
}
