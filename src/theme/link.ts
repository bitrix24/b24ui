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
      true: 'text-blue-900 dark:text-blue-250',
      false: [
        'text-base-900 hover:not-disabled:not-aria-disabled:text-blue-700',
        'dark:text-base-300 dark:hover:not-disabled:not-aria-disabled:text-blue-300',
        'transition-colors'
      ]
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75'
    }
  }
})
