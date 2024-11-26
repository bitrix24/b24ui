import type { ModuleOptions } from '../module'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: Required<ModuleOptions>) => ({
  base: 'focus-visible:outline-primary-link',
  variants: {
    active: {
      true: 'text-primary-link',
      false: ['text-base-500 hover:text-base-700', 'transition-colors']
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75'
    }
  }
})
