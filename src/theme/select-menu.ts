/**
 * SelectMenu
 * An advanced searchable select element.
 * ---
 * @link /api_d7/bitrix/ui/select/index.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/select..
 *
 * @todo change empty template
 */
import { defuFn } from 'defu'
import select from './select'

export default () => {
  return defuFn({
    slots: {
      input: 'border-b border-(--popup-window-delimiter-bg-color)',
      focusScope: 'flex flex-col min-h-0',
      content: (content: string) => [
        content,
        'origin-(--reka-combobox-content-transform-origin) ' // w-(--reka-combobox-trigger-width)
      ]
    },
    variants: {
      addNew: {
        true: {
          group: '', // p-0 isolate -m-px
          item: [
            'text-(--menu-popup-item-color)',
            'data-highlighted:not-data-disabled:text-(--menu-popup-item-color-hover)',
            'data-[state=checked]:text-(--menu-popup-item-color-hover)'
          ].join(' '),
          itemLabel: 'flex flex-row flex-nowrap items-center justify-start gap-2',
          itemLeadingIcon: [
            'size-[20px] rounded-full',
            'text-(--ui-color-base-white-fixed)',
            'bg-(--ui-color-design-selection-content-icon-secondary)',
            'group-data-highlighted:not-data-disabled:text-(--ui-color-base-white-fixed)',
            'group-data-highlighted:not-data-disabled:bg-(--ui-color-design-selection-content-icon)',
            'group-data-[state=checked]:text-(--ui-color-base-white-fixed)',
            'group-data-[state=checked]:bg-(--ui-color-design-selection-content-icon)'
          ].join(' ')
        }
      }
    }
  }, select())
}
