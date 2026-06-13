/**
 * ChatMessage
 * A chat message component with icon, avatar, and action buttons.
 * ---
 */

export default {
  slots: {
    root: 'group/message relative w-full',
    header: 'flex mb-1.5',
    container: 'relative flex items-start',
    body: 'min-w-0',
    leading: 'inline-flex items-center justify-center min-h-6',
    leadingIcon: 'shrink-0 text-(--ui-color-design-plain-content-icon-secondary)',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    files: 'flex items-center gap-1.5',
    content: [
      'relative text-pretty wrap-break-word *:first:mt-0 *:last:mb-0',
      'bg-[var(--b24ui-background,var(--b24ui-default-background))]',
      'border-[color:var(--b24ui-border-color,var(--b24ui-default-border-color))]',
      'border-[length:var(--b24ui-border-width,var(--b24ui-default-border-width))]',
      'text-[color:var(--b24ui-color,var(--b24ui-default-color))]'
    ].join(' '),
    actions: [
      '[@media(hover:hover)]:opacity-0 group-hover/message:opacity-100 absolute bottom-0 flex items-center',
      'transition-opacity'
    ].join(' ')
  },
  variants: {
    variant: {
      message: {
        content: [
          '[--b24ui-default-background:#dff6c1]',
          '[--b24ui-default-border-color:#dff6c1]',
          '[--b24ui-default-border-width:var(--ui-design-tinted-success-stroke-weight)]',
          '[--b24ui-default-color:var(--ui-color-palette-black-base)]',
          'dark:[--b24ui-default-background:var(--ui-color-design-tinted-success-bg)]',
          'dark:[--b24ui-default-border-color:var(--ui-color-design-tinted-success-stroke)]',
          'dark:[--b24ui-default-color:var(--ui-color-design-tinted-success-content)]'
        ].join(' ')
      },
      event: {
        content: [
          '[--b24ui-default-background:#ffffff7d]',
          '[--b24ui-default-border-color:var(--ui-color-design-outline-na-stroke)]',
          '[--b24ui-default-border-width:var(--ui-design-outline-na-stroke-weight)]',
          '[--b24ui-default-color:var(--ui-color-palette-black-base)]'
        ].join(' ')
      },
      system: {
        content: [
          '[--b24ui-default-background:#f7f3fd]',
          '[--b24ui-default-border-color::#f7f3fd]',
          '[--b24ui-default-border-width:0]',
          '[--b24ui-default-color:var(--ui-color-palette-black-base)]',
          'dark:[--b24ui-default-background:var(--ui-color-accent-soft-violet-2)]',
          'dark:[--b24ui-default-border-color:var(--ui-color-accent-soft-violet-2)]',
          'dark:[--b24ui-default-color:var(--ui-color-copilot-accent-less-2)]'
        ].join(' ')
      }
    },
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' },
      'air-primary-no-accent': { root: 'style-filled-no-accent' },
      'air-secondary': { root: 'style-tinted' },
      'air-secondary-alert': { root: 'style-tinted-alert' },
      'air-secondary-accent': { root: 'style-outline' },
      'air-secondary-accent-1': { root: 'style-outline-accent-1' },
      'air-secondary-accent-2': { root: 'style-outline-accent-2' },
      'air-secondary-no-accent': { root: 'style-outline-no-accent' },
      'air-tertiary': { root: 'style-plain' },
      'air-tertiary-accent': { root: 'style-plain-accent' },
      'air-tertiary-no-accent': { root: 'style-plain-no-accent' },
      'air-selection': { root: 'style-selection' },
      'air-boost': {
        header: 'style-filled-boost',
        files: 'style-filled-boost',
        content: 'style-filled-boost'
      }
    },
    side: {
      left: {},
      right: {
        container: 'justify-end ms-auto max-w-[75%]',
        header: 'justify-end',
        actions: 'right-0'
      }
    },
    leading: {
      true: ''
    },
    actions: {
      true: ''
    },
    compact: {
      true: {
        root: 'scroll-mt-3',
        container: 'gap-1.5 pb-3',
        content: 'space-y-2',
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs'
      },
      false: {
        root: 'scroll-mt-4 sm:scroll-mt-6',
        container: 'gap-3 pb-8',
        content: 'space-y-4',
        leadingIcon: 'size-8',
        leadingAvatarSize: 'md'
      }
    }
  },
  compoundVariants: [
    {
      compact: true,
      actions: true,
      class: {
        container: 'pb-8'
      }
    },
    {
      variant: ['message', 'event', 'system'],
      compact: false,
      class: {
        content: 'px-3 py-2 rounded-md min-h-10.5',
        leading: 'mt-2'
      }
    },
    {
      variant: ['message', 'event', 'system'],
      compact: true,
      class: {
        content: 'px-3 py-2 rounded-sm min-h-8',
        leading: 'mt-1'
      }
    },
    {
      variant: 'system',
      side: 'left',
      class: {
        content: 'w-full'
      }
    }
  ],
  defaultVariants: {
    side: 'left',
    variant: 'message'
  }
}
