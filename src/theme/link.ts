import type { ModuleOptions } from '../module'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: Required<ModuleOptions>) => ({
  base: 'cursor-pointer focus-visible:outline-primary-link',
  variants: {
    active: {
      true: 'text-primary-link',
      false: ['text-base-500 hover:text-primary-link', 'transition-colors']
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75 hover:text-base-500'
    }
  }
})
