/**
 * Link
 * A wrapper with extra props.
 * ---
 */
import type { ModuleOptions } from '../module'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: Required<ModuleOptions>) => ({
  base: 'cursor-pointer focus-visible:outline-info-text',
  variants: {
    active: {
      true: 'text-blue-700 dark:text-blue-300 hover:not-disabled:not-aria-disabled:underline underline-offset-2',
      false: [
        'text-base-900',
        'dark:text-base-300',
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
        'text-base-900 dark:text-base-300 ',
        'dark:border-b-base-300',
        'hover:not-disabled:not-aria-disabled:no-underline',
        'hover:text-blue-700 hover:not-disabled:not-aria-disabled:text-blue-700 hover:border-b-blue-700',
        'dark:hover:text-blue-300 dark:hover:not-disabled:not-aria-disabled:text-blue-300 dark:hover:border-b-blue-300',
        'focus-visible:outline-base-700'
      ].join(' ')
    }
  },
  compoundVariants: [
    {
      active: false,
      disabled: false,
      class: [
        'hover:text-blue-700',
        'dark:hover:text-blue-300',
        'hover:underline',
        'transition-colors'
      ].join(' ')
    }
  ]
})
