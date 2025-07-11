/**
 * Link
 * A wrapper with extra props.
 * ---
 * @see /bitrix/templates/bitrix24/src/css/typography.css
 * @see /bitrix/js/ui/entity-editor/entity-editor.css
 */
import type { ModuleOptions } from '../module'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: Required<ModuleOptions>) => ({
  base: [
    'cursor-pointer',
    // 'focus-visible:outline-info-text' // fix
    'focus-visible:outline-(--ui-color-base-4)',
    'focus:outline-none focus-visible:rounded-(--menu-item-border-radius) focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-(--ui-color-base-4)'
  ].join(' '),
  variants: {
    active: {
      true: [
        // 'text-blue-700 dark:text-blue-300 hover:not-disabled:not-aria-disabled:underline underline-offset-2' // fix
        'text-(--ui-color-design-selection-content) outline-(--ui-color-design-selection-content)',
        'hover:not-disabled:not-aria-disabled:underline underline-offset-2'
      ].join(' '),
      false: [
        // 'text-base-900 dark:text-base-300', // fix
        'text-(--ui-color-accent-main-link)',
        '',
        'underline-offset-2'
      ].join(' ')
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75'
    },
    isAction: {
      true: [
        'text-nowrap',
        'text-sm h-auto py-0 font-normal rounded-none',
        'border border-x-0 border-t-0 border-dashed border-b-base-900',
        // 'text-base-900 dark:text-base-300', // fix
        'text-[#80868e]',
        'hover:not-disabled:not-aria-disabled:no-underline',
        // 'hover:text-blue-700 hover:not-disabled:not-aria-disabled:text-blue-700 hover:border-b-blue-700', // fix
        // 'dark:hover:text-blue-300 dark:hover:not-disabled:not-aria-disabled:text-blue-300 dark:hover:border-b-blue-300', // fix
        'hover:text-(--ui-color-base-1) hover:not-disabled:not-aria-disabled:text-(--ui-color-base-1) hover:border-b-(--ui-color-base-1)',
        // 'focus-visible:outline-base-700' // fix
        'focus-visible:outline-(--ui-color-base-4)'
      ].join(' ')
    }
  },
  compoundVariants: [
    {
      active: false,
      disabled: false,
      class: [
        // 'hover:text-blue-700 dark:hover:text-blue-300', // fix
        'hover:text-(--ui-color-design-selection-content)',
        'hover:underline'
      ].join(' ')
    }
  ]
})
