/**
 * InputMenu
 * An autocomplete input with real-time suggestions.
 * ---
 * @link /api_d7/bitrix/ui/entity_selector/tag_selector/index.php
 * @link /api_d7/bitrix/ui/select/index.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/select..
 *
 * @todo add scroll/ Wait `ComboboxScrollUpButton` like `SelectScrollUpButton`
 * @todo change empty template
 */
import { defuFn } from 'defu'
import input from './input'
import colorDropDownItem from './tools/color-drop-down-item'

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
  return defuFn({
    slots: {
      base: [
        'py-0 w-full border-0 focus:outline-none',
        'disabled:cursor-not-allowed disabled:bg-base-30/37 disabled:resize-none disabled:text-base-500',
        'dark:disabled:bg-base-900/37 dark:disabled:text-base-800',
        'appearance-none transition duration-300 ease-linear',
        'ring ring-inset ring-base-300',
        'dark:ring-base-800',
        'text-base-master bg-white placeholder:text-base-400 hover:text-base-900 focus:text-base-900 active:text-base-900',
        'dark:text-base-150 dark:bg-transparent dark:placeholder:text-base-300 dark:hover:text-base-350 dark:focus:text-base-350 dark:active:text-base-350',
        'font-b24-primary font-regular text-md leading-none',
        'align-middle',
        // 'text-ellipsis whitespace-nowrap',
        'transition-colors'
      ].join(' '),
      trailing: 'group absolute inset-y-0 end-0 flex items-center disabled:cursor-not-allowed disabled:opacity-75',
      arrow: 'fill-base-master/10 dark:fill-base-100/20',
      content: [
        'w-(--reka-combobox-trigger-width)',
        // 'max-h-60',
        // 'h-(--reka-popper-available-height)',
        'bg-white dark:bg-base-dark',
        'shadow-md rounded-2xs ring ring-base-300 dark:ring-base-800',
        'overflow-hidden',
        'data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in]',
        'origin-(--reka-combobox-content-transform-origin)',
        'pointer-events-auto'
      ].join(' '),
      viewport: 'divide-y divide-base-master/10 dark:divide-base-100/20 scroll-py-1',
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
        'shrink-0 text-base-500 dark:text-base-700',
        'group-data-highlighted:not-data-disabled:text-base-master dark:group-data-highlighted:not-data-disabled:text-base-150',
        'group-data-[state=checked]:text-base-master dark:group-data-[state=checked]:text-base-150',
        'transition-colors'
      ].join(' '),
      itemLeadingAvatar: 'shrink-0',
      itemLeadingAvatarSize: '',
      itemLeadingChip: 'shrink-0',
      itemLeadingChipSize: '',
      itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
      itemTrailingIcon: 'shrink-0',
      itemLabel: 'truncate',
      tagsItem: [
        'px-2 rounded-2xs font-b24-secondary font-normal leading-normal',
        'inline-flex items-center gap-1',
        'ring ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75',

        'text-blue-700 bg-blue-250 ring-blue-250',
        'dark:text-blue-700 dark:bg-blue-300 dark:ring-blue-300'

        // 'ring-base-200 bg-red-100 text-base-master',
        // 'dark:ring-base-800 dark:bg-base-900 dark:text-base-150'
      ].join(' '),
      tagsItemText: 'truncate',
      tagsItemDelete: [
        'cursor-pointer hover:rounded-full',
        'inline-flex items-center rounded-md disabled:pointer-events-none',
        'text-base-500 hover:text-base-master hover:bg-blue-300',
        'dark:text-base-500 dark:text-base-700 dark:hover:text-base-master dark:hover:bg-blue-400',
        'transition-colors'
      ].join(' '),
      tagsItemDeleteIcon: '',
      tagsInput: ''
    },
    variants: {
      addNew: {
        true: {
          group: 'p-0 isolate -m-px',
          item: [
            'before:rounded-none',
            'text-base-master dark:text-base-150 before:bg-blue-200 dark:before:bg-blue-800',
            'data-highlighted:text-base-900 dark:data-highlighted:text-base-200 data-highlighted:before:bg-blue-200 dark:data-highlighted:before:bg-blue-800',
            'data-[state=checked]:text-base-900 dark:data-[state=checked]:text-base-200 data-[state=checked]:before:bg-blue-200 dark:data-[state=checked]:before:bg-blue-800'
          ].join(' '),
          itemLabel: 'flex flex-row flex-nowrap items-center justify-start gap-2',
          itemLeadingIcon: [
            'size-5 rounded-full',
            'text-white dark:text-base-150 bg-blue-500 dark:bg-blue-600',
            'group-data-highlighted:text-white dark:group-data-highlighted:text-base-150 group-data-highlighted:bg-blue-500 dark:group-data-highlighted:bg-blue-600',
            'group-data-[state=checked]:text-white dark:group-data-[state=checked]:text-base-150 group-data-[state=checked]:bg-blue-500 dark:group-data-[state=checked]:bg-blue-600'
          ].join(' ')
        }
      },
      multiple: {
        true: {
          root: 'flex-wrap',
          base: [
            'py-1.5 ps-1.5 pe-[39px]'
          ].join(' '),
          tagsInput: [
            'w-2/5 border-0 bg-transparent ps-1.5 pe-3 py-0',
            'placeholder:text-base-400 dark:placeholder:text-base-300',
            'focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
            'focus:ring-0 focus-visible:ring-0'
          ].join(' ')
        },
        false: {
          base: [
            'px-3',
            'placeholder:text-base-400 dark:placeholder:text-base-300',
            'focus:outline-none disabled:cursor-not-allowed disabled:opacity-75'
          ].join(' ')
        }
      },
      size: {
        xs: defuFn(
          defSize,
          {
            tagsItem: [
              'text-5xs',
              'h-[14px] gap-0.5'
            ].join(' '),
            tagsItemDeleteIcon: 'size-sm'
          }
        ),
        sm: defuFn(
          defSize,
          {
            tagsItem: [
              'text-5xs',
              'h-[14px] gap-0.5'
            ].join(' '),
            tagsItemDeleteIcon: 'size-3'
          }
        ),
        md: defuFn(
          defSize,
          {
            tagsItem: [
              'text-md',
              'h-[31px] gap-1'
            ].join(' '),
            tagsItemDeleteIcon: 'size-3.5'
          }
        ),
        lg: defuFn(
          defSize,
          {
            tagsItem: [
              'text-md',
              'h-[31px] gap-1'
            ].join(' '),
            tagsItemDeleteIcon: 'size-3.5'
          }
        )
      },
      ...colorDropDownItem
    },
    compoundVariants: [
      // region Color ////
      {
        color: 'default',
        multiple: true,
        class: 'has-focus-visible:ring-1 has-focus-visible:ring-base-900 dark:has-focus-visible:ring-base-700'
      },
      {
        color: 'danger',
        multiple: true,
        class: 'has-focus-visible:ring-1 has-focus-visible:ring-red-500 dark:has-focus-visible:ring-red-600'
      },
      {
        color: 'success',
        multiple: true,
        class: 'has-focus-visible:ring-1 has-focus-visible:ring-green-500 dark:has-focus-visible:ring-green-600'
      },
      {
        color: 'warning',
        multiple: true,
        class: 'has-focus-visible:ring-1 has-focus-visible:ring-orange-500 dark:has-focus-visible:ring-orange-600'
      },
      {
        color: 'primary',
        multiple: true,
        class: 'has-focus-visible:ring-1 has-focus-visible:ring-blue-500 dark:has-focus-visible:ring-blue-600'
      },
      {
        color: 'secondary',
        multiple: true,
        class: 'has-focus-visible:ring-1 has-focus-visible:ring-cyan-500 dark:has-focus-visible:ring-cyan-600'
      },
      {
        color: 'collab',
        multiple: true,
        class: 'has-focus-visible:ring-1 has-focus-visible:ring-collab-500 dark:has-focus-visible:ring-collab-600'
      },
      {
        color: 'ai',
        multiple: true,
        class: 'has-focus-visible:ring-1 has-focus-visible:ring-ai-500 dark:has-focus-visible:ring-ai-600'
      },
      // endregion ////
      // region Size ////
      {
        size: 'xs',
        multiple: true,
        class: 'min-h-xl2 h-auto'
      },
      {
        size: 'sm',
        multiple: true,
        class: 'min-h-8 h-auto'
      },
      {
        size: 'md',
        multiple: true,
        class: 'min-h-10 h-auto'
      },
      {
        size: 'lg',
        multiple: true,
        class: 'min-h-12 h-auto'
      }
      // endregion ////
    ]
  }, input)
}
