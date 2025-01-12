/**
 * Toast
 * A succinct message to provide information or feedback to the user.
 * --
 */

/**
 * @todo color
 * @todo dark mode
 * @todo font
 * @todo variant like b24
 * @todo add to app
 * @todo add to form demo
 */
export default {
  slots: {
    root: 'relative group overflow-hidden bg-[var(--ui-bg)] shadow-lg rounded-[calc(var(--ui-radius)*2)] ring ring-[var(--ui-border)] p-4 flex gap-2.5 focus:outline-none',
    wrapper: 'w-0 flex-1 flex flex-col gap-1',
    title: 'text-sm font-medium text-[var(--ui-text-highlighted)]',
    description: 'text-sm text-[var(--ui-text-muted)]',
    icon: 'shrink-0 size-5',
    avatar: 'shrink-0',
    avatarSize: '2xl',
    actions: 'flex gap-1.5 shrink-0',
    progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1]',
    close: 'p-0.5'
  },
  variants: {
    color: {
      default: {
        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ui-border-inverted)]',
        icon: 'text-[var(--ui-text-highlighted)]',
        progress: 'bg-[var(--ui-bg-inverted)]'
      },
      danger: '',
      success: '',
      warning: '',
      primary: '',
      secondary: '',
      collab: '',
      ai: ''
    },
    multiline: {
      true: {
        root: 'items-start',
        actions: 'items-start mt-1'
      },
      false: {
        root: 'items-center',
        actions: 'items-center'
      }
    }
  },
  defaultVariants: {
    color: 'primary'
  }
}
