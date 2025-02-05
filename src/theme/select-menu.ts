/**
 * SelectMenu
 * An advanced searchable select element.
 * ---
 * @link /api_d7/bitrix/ui/select/index.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/select..
 *
 * @todo add scroll/ Wait `ComboboxScrollUpButton` like `SelectScrollUpButton`
 * @todo change empty template
 */
import { defu } from 'defu'
import select from './select'

export default () => {
  return defu({
    slots: {
      input: 'border-b border-base-300 dark:dark:border-base-800'
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
      }
    }
  }, select())
}
