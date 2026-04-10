/**
 * ChatTool
 * An expandable section that indicates whether an AI tool has been called and its execution state.
 * ---
 * @todo: make refactor for `--leftmenu-group-stroke`
 * @todo: make ChatTool.variant.card === NavigationMenu.orientation.vertical.item
 * A link
 */

export default {
  slots: {
    root: '',
    trigger: [
      'group',
      'w-full min-w-0',
      'flex items-center gap-1.5',
      'text-muted',
      'text-sm',
      'disabled:cursor-default',
      'disabled:hover:text-muted',
      'hover:text-default',
      'focus-visible:outline-offset-2 focus-visible:outline-primary',
      'transition-colors'
    ].join(' '),
    leading: 'relative shrink-0 size-5',
    leadingIcon: 'shrink-0 size-5',
    chevronIcon: 'shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
    label: 'truncate',
    suffix: 'text-dimmed ms-1',
    trailingIcon: 'size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
    content: 'motion-safe:data-[state=open]:animate-[collapsible-down_200ms_ease-out] motion-safe:data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden',
    body: 'text-sm text-dimmed whitespace-pre-wrap'
  },
  variants: {
    variant: {
      inline: {
        body: 'pt-2'
      },
      card: {
        root: 'light:[--leftmenu-group-stroke:var(--ui-color-base-30)] rounded-md ring ring-(--leftmenu-group-stroke) overflow-hidden',
        trigger: 'px-2 py-1',
        trailingIcon: 'ms-auto',
        body: 'border-t border-(--leftmenu-group-stroke) p-2 max-h-[200px] overflow-y-auto'
      }
    },
    chevron: {
      leading: {
        leadingIcon: 'group-hover:opacity-0'
      },
      trailing: ''
    },
    useWait: {
      true: ''
    },
    useClock: {
      true: ''
    },
    loading: {
      // @memo: we use icons with animation.
      true: {}
    },
    alone: {
      false: {
        leadingIcon: [
          'absolute inset-0 group-data-[state=open]:opacity-0',
          'transition-opacity duration-200'
        ].join(' '),
        chevronIcon: [
          'absolute inset-0 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100',
          'transition-[rotate,opacity] duration-200'
        ].join(' ')
      }
    }
  },
  compoundVariants: [
    {
      loading: true,
      useWait: false,
      useClock: false,
      class: {
        leadingIcon: 'm-0.5 size-4 animate-spin stroke-2'
      }
    }
  ],
  defaultVariants: {
    variant: 'inline'
  }
}
