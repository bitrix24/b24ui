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
      true: 'text-info-link',
      false: ['text-base-900 hover:not-disabled:not-aria-disabled:text-info-background-on', 'transition-colors']
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75'
    }
  }
})
