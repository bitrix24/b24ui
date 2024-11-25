import type { ModuleOptions } from '../module'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: Required<ModuleOptions>) => ({
  base: 'focus-visible:outline-[var(--ui-primary)]',
  variants: {
    active: {
      true: 'text-[var(--ui-primary)]',
      false: ['text-[var(--ui-text-muted)] hover:text-[var(--ui-text)]', 'transition-colors']
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75'
    }
  }
})
