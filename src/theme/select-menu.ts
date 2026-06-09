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
      focusScope: 'flex flex-col min-h-0 flex-1',
      viewport: [
        'relative',
        'scroll-py-1',
        'w-60 flex-1',
        'overflow-x-hidden overflow-y-auto scrollbar-thin'
      ].join(' '),
      content: (content: string) => [
        content,
        'flex flex-col',
        // single height cap on content (focusScope+viewport scroll via flex-1); 100vh fallback keeps it valid if reka doesn't set the var
        'max-h-[min(40rem,var(--reka-combobox-content-available-height,100vh))]',
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
            'text-legend',
            'data-highlighted:not-data-disabled:text-label',
            'data-[state=checked]:text-label'
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
