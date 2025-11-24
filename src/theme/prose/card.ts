/**
 * ProseCard
 * ---
 */

export default {
  slots: {
    base: [
      'group',
      'relative block',
      'my-5 p-4 sm:p-6',
      'text-(--b24ui-color)',
      'border border-(--ui-color-design-tinted-na-stroke)',
      'bg-(--b24ui-background)',
      'rounded-md',
      'transition-colors'
    ].join(' '),
    icon: 'size-6 mb-2 block text-(--b24ui-icon)',
    title: 'text-(--b24ui-color) font-semibold',
    description: 'text-[15px] text-(--b24ui-color) [&_p]:text-(--b24ui-color) *:first:mt-0 *:last:mb-0 *:my-1',
    externalIcon: [
      'size-4',
      'align-top',
      'absolute',
      'right-2 top-2',
      'pointer-events-none',
      'text-(--b24ui-split-divider-color)',
      'transition-colors'
    ].join(' ')
  },
  variants: {
    color: {
      'air-primary': { base: 'style-filled' },
      'air-primary-success': { base: 'style-filled-success' },
      'air-primary-alert': { base: 'style-filled-alert' },
      'air-primary-copilot': { base: 'style-filled-copilot' },
      'air-primary-warning': { base: 'style-filled-warning' },
      'air-secondary': { base: 'style-tinted' },
      'air-secondary-alert': { base: 'style-tinted-alert' },
      'air-secondary-accent': { base: 'style-tinted-no-accent-1' },
      'air-secondary-accent-1': { base: 'style-outline-accent-1' },
      'air-secondary-accent-2': { base: 'style-outline-accent-2' },
      'air-secondary-no-accent': { base: 'style-outline' },
      'air-tertiary': { base: 'style-outline-no-accent' }
    },
    to: {
      true: ''
    },
    title: {
      true: {
        description: 'mt-1'
      }
    }
  },
  compoundVariants: [
    {
      to: true,
      class: {
        base: 'hover:bg-(--ui-color-bg-content-secondary) hover:border-(--b24ui-border-color-hover)',
        title: 'group-hover:text-(--b24ui-border-color)',
        description: 'group-hover:text-(--b24ui-border-color) [&_p]:group-hover:text-(--b24ui-border-color)',
        externalIcon: 'group-hover:text-(--b24ui-icon)'
      }
    },
    {
      to: true,
      color: [
        'air-secondary',
        'air-secondary-alert',
        'air-secondary-accent',
        'air-secondary-accent-1',
        'air-secondary-accent-2',
        'air-secondary-no-accent',
        'air-tertiary'
      ],
      class: {
        base: 'hover:bg-(--ui-color-bg-content-secondary) hover:border-(--b24ui-border-color-hover)',
        title: 'group-hover:text-(--b24ui-color)',
        description: 'group-hover:text-(--b24ui-color) [&_p]:group-hover:text-(--b24ui-color)',
        externalIcon: 'group-hover:text-(--b24ui-icon)'
      }
    }
  ],
  defaultVariants: {
    color: 'air-primary'
  }
}
