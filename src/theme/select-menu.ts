/**
 * SelectMenu
 * An advanced searchable select element.
 * ---
 */
import { defuFn } from 'defu'
import select from './select'

export default () => {
  return defuFn({
    slots: {
      input: 'border-b border-(--ui-color-divider-vibrant-default)',
      focusScope: 'flex flex-col min-h-0',
      viewport: [
        'relative',
        'scroll-py-1',
        'w-[240px] max-h-[40vh]',
        'overflow-x-hidden overflow-y-auto scrollbar-thin'
      ].join(' '),
      content: (content: string) => [
        content,
        'origin-(--reka-combobox-content-transform-origin)'
      ],
      trailingClear: 'p-0'
    },
    variants: {
      virtualize: {
        true: {
          viewport: 'p-1 isolate'
        },
        false: {
          viewport: ''
        }
      },
      addNew: {
        true: {
          group: '',
          item: [
            'text-(--b24ui-typography-legend-color)',
            'data-highlighted:not-data-disabled:text-(--b24ui-typography-label-color)',
            'data-[state=checked]:text-(--b24ui-typography-label-color)'
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
    },
    compoundVariants: (prev: Record<string, any>[]) => prev.map(item => ({
      ...item,
      class: typeof item.class === 'string' ? replaceFocus(item.class) : item.class
    }))
  }, select())
}

function replaceFocus(str: string): string {
  return str
    .replace(/focus:/g, 'focus-visible:')
}
