/**
 * ChatMessage
 * A chat message component with icon, avatar, and action buttons.
 * ---
 */

export default {
  slots: {
    root: 'group/message relative w-full',
    container: 'relative flex items-start',
    leading: 'inline-flex items-center justify-center min-h-6',
    leadingIcon: 'shrink-0 text-(--ui-color-design-plain-content-icon-secondary)',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    content: 'relative text-pretty min-w-0 *:first:mt-0 *:last:mb-0',
    actions: [
      'opacity-0 group-hover/message:opacity-100 absolute bottom-0 flex items-center',
      'transition-opacity'
    ].join(' ')
  },
  variants: {
    variant: {
      message: {
        content: 'bg-(--ui-color-design-outline-bg) border-(--ui-color-design-outline-stroke) border-(length:--ui-design-outline-stroke-weight-alt) text-(--ui-color-design-outline-content-secondary)'
      },
      event: {
        content: 'bg-(--ui-color-design-tinted-na-bg) border-(--ui-color-design-tinted-na-stroke) border-(length:--ui-design-tinted-na-stroke-weight) text-(--ui-color-design-tinted-na-content)'
      },
      system: {
        content: 'bg-(--ui-color-copilot-bg-content-1) border-(--ui-color-design-outline-copilot-stroke) text-(--ui-color-design-outline-copilot-content)'
      }
    },
    side: {
      left: {
        container: 'rtl:justify-end'
      },
      right: {
        container: 'ltr:justify-end ms-auto max-w-[85%]'
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
        leadingIcon: 'size-5',
        leadingAvatarSize: '2xs'
      },
      false: {
        root: 'scroll-mt-4 sm:scroll-mt-6',
        container: 'gap-3 pb-8',
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
      leading: true,
      compact: false,
      side: 'left',
      class: {
        actions: 'left-11'
      }
    },
    {
      leading: true,
      compact: true,
      side: 'left',
      class: {
        actions: 'left-6.5'
      }
    },
    {
      variant: ['message', 'event', 'system'],
      compact: false,
      class: {
        content: 'ps-[14px] pe-[10px] py-[8px] rounded-md min-h-[42px]',
        leading: 'mt-2'
      }
    },
    {
      variant: ['message', 'event', 'system'],
      compact: true,
      class: {
        content: 'ps-[14px] pe-[10px] py-[8px] rounded-sm min-h-[32px]',
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
    variant: 'message'
  }
}
