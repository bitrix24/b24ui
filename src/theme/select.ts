/**
 * Select
 * A select element to choose from a list of options.
 * ---
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/..
 */

/**
 * @todo props
 * @todo color
 * @todo dark
 * @todo font
 * @todo icon
 * @todo fix icons problems
 * @todo show scroll at drop-down list
 */
import { defuFn } from 'defu'
import input from './input'
import { buttonGroupVariant } from './button-group'

export default () => {
  return defuFn(
    {
      slots: {
        root: () => undefined,
        base: () => [
          'relative group inline-flex items-center',
          'w-full py-0 border-0 focus:outline-none',
          'cursor-pointer disabled:cursor-not-allowed',
          'disabled:bg-base-30/37 disabled:text-base-500',
          'dark:disabled:bg-base-900/37 dark:disabled:text-base-800',
          'appearance-none transition duration-300 ease-linear', // transition-colors
          // // // // //
          'ring ring-inset ring-base-300',
          'dark:ring-base-800',
          'text-base-master bg-white hover:text-base-900 focus:text-base-900 active:text-base-900',
          'dark:text-base-150 dark:bg-transparent dark:hover:text-base-350 dark:focus:text-base-350 dark:active:text-base-350',
          'font-b24-primary font-regular text-md leading-none',
          'align-middle',
          'text-ellipsis whitespace-nowrap'
        ],
        value: 'truncate pointer-events-none',
        placeholder: 'truncate text-base-400 dark:text-base-300',
        arrow: 'fill-base-master/10 dark:fill-base-100/20',
        content: 'max-h-60 w-[var(--reka-popper-anchor-width)] bg-[var(--ui-bg)] shadow-lg rounded-[calc(var(--ui-radius)*1.5)] ring ring-[var(--ui-border)] overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
        viewport: 'divide-y divide-base-master/10 dark:divide-base-100/20 scroll-py-1',
        group: 'p-1 isolate',
        empty: 'py-2 text-center text-sm text-[var(--ui-text-muted)]',
        label: 'font-semibold text-[var(--ui-text-highlighted)]',
        separator: '-mx-1 my-1 h-px bg-base-master/10 dark:bg-base-100/20',
        item: [
          'group relative w-full flex items-center select-none outline-none',
          'before:absolute before:z-[-1] before:inset-px before:rounded-[calc(var(--ui-radius)*1.5)]',
          'cursor-pointer',
          'data-disabled:cursor-not-allowed data-disabled:opacity-75',
          'text-[var(--ui-text)] data-highlighted:text-[var(--ui-text-highlighted)] data-highlighted:before:bg-[var(--ui-bg-elevated)]/50',
          'transition-colors before:transition-colors'
        ],
        itemLeadingIcon: [
          'shrink-0 text-[var(--ui-text-dimmed)] group-data-highlighted:text-[var(--ui-text)]',
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
        ...buttonGroupVariant,
        size: {
          xs: {
            label: 'p-1 text-[10px]/3 gap-1',
            item: 'p-1 text-xs gap-1',
            itemLeadingIcon: 'size-4',
            itemLeadingAvatarSize: '3xs',
            itemLeadingChip: 'size-4',
            itemLeadingChipSize: 'sm',
            itemTrailingIcon: 'size-4'
          },
          sm: {
            label: 'p-1.5 text-[10px]/3 gap-1.5',
            item: 'p-1.5 text-xs gap-1.5',
            itemLeadingIcon: 'size-4',
            itemLeadingAvatarSize: '3xs',
            itemLeadingChip: 'size-4',
            itemLeadingChipSize: 'sm',
            itemTrailingIcon: 'size-4'
          },
          md: {
            label: 'p-1.5 text-xs gap-1.5',
            item: 'p-1.5 text-sm gap-1.5',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemLeadingChip: 'size-5',
            itemLeadingChipSize: 'md',
            itemTrailingIcon: 'size-5'
          },
          lg: {
            label: 'p-2 text-xs gap-2',
            item: 'p-2 text-sm gap-2',
            itemLeadingIcon: 'size-5',
            itemLeadingAvatarSize: '2xs',
            itemLeadingChip: 'size-5',
            itemLeadingChipSize: 'md',
            itemTrailingIcon: 'size-5'
          }
        }
      }
    },
    input
  )
}
