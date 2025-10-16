/**
 * PageCard
 * A pre-styled card component featuring a title, description, and optional link.
 * ---
 * @todo add colors
 * @see src/theme/card.ts
 */

export default {
  slots: {
    root: 'relative flex rounded-lg',
    container: 'relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 p-4 sm:p-6',
    wrapper: 'flex flex-col flex-1 items-start',
    header: 'mb-4',
    body: 'flex-1',
    footer: 'pt-4 mt-auto',
    leading: 'inline-flex items-center mb-2.5',
    leadingIcon: 'size-5 shrink-0',
    title: 'text-2xl text-pretty font-(--ui-font-weight-semibold)',
    description: 'text-lg text-pretty'
  },
  variants: {
    orientation: {
      horizontal: { container: 'lg:grid-cols-2 lg:items-center' },
      vertical: { container: '' }
    },
    reverse: {
      true: { wrapper: 'lg:order-last' }
    },
    variant: {
      'filled': {
        root: [
          'bg-(--ui-color-design-filled-bg)',
          'border border-(--ui-color-design-filled-stroke) border-(length:--ui-design-filled-stroke-weight)',
          'text-(--ui-color-design-filled-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-filled-content-icon)',
        title: 'text-(--ui-color-design-filled-content)',
        description: 'text-(--ui-color-design-filled-content-secondary)'
      },
      'filled-success': {
        root: [
          'bg-(--ui-color-design-filled-success-bg)',
          'border border-(--ui-color-design-filled-success-stroke) border-(length:--ui-design-filled-success-stroke-weight)',
          'text-(--ui-color-design-filled-success-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-filled-success-content-icon)',
        title: 'text-(--ui-color-design-filled-success-content)',
        description: 'text-(--ui-color-design-filled-success-content)'
      },
      // @todo
      'filled-alert': {
        root: [
          'bg-(--ui-color-design-filled-alert-bg)',
          'border border-(--ui-color-design-filled-alert-stroke) border-(length:--ui-design-filled-alert-stroke-weight)',
          'text-(--ui-color-design-filled-alert-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-filled-alert-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-filled-alert-content-divider) border-t-1'
      },
      'filled-warning': {
        root: [
          'bg-(--ui-color-design-filled-warning-bg)',
          'border border-(--ui-color-design-filled-warning-stroke) border-(length:--ui-design-filled-warning-stroke-weight)',
          'text-(--ui-color-design-filled-warning-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-filled-warning-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-filled-warning-content-divider) border-t-1'
      },
      'filled-copilot': {
        root: [
          'bg-(--ui-color-design-filled-copilot-bg)',
          'border border-(--ui-color-design-filled-copilot-stroke) border-(length:--ui-design-filled-copilot-stroke-weight)',
          'text-(--ui-color-design-filled-copilot-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-filled-copilot-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-filled-copilot-content-divider) border-t-1'
      },
      'filled-no-accent': {
        root: [
          'bg-(--ui-color-design-filled-na-bg)',
          'border border-(--ui-color-design-filled-na-stroke) border-(length:--ui-design-filled-na-stroke-weight)',
          'text-(--ui-color-design-filled-na-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-filled-na-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-filled-na-content-divider) border-t-1'
      },
      'filled-black': {
        root: [
          'bg-(--ui-color-design-filled-black-bg)',
          'border border-(--ui-color-design-filled-black-stroke) border-(length:--ui-design-filled-black-stroke-weight)',
          'text-(--ui-color-design-filled-black-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-filled-black-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-filled-black-content-divider) border-t-1'
      },
      'tinted': {
        root: [
          'bg-(--ui-color-design-tinted-bg)',
          'border border-(--ui-color-design-tinted-stroke) border-(length:--ui-design-tinted-stroke-weight)',
          'text-(--ui-color-design-tinted-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-tinted-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-tinted-content-divider) border-t-1'
      },
      'tinted-alt': {
        root: [
          'bg-(--ui-color-design-tinted-bg-alt)',
          'border border-(--ui-color-design-tinted-stroke) border-(length:--ui-design-tinted-stroke-weight)',
          'text-(--ui-color-design-tinted-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-tinted-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-tinted-content-divider) border-t-1'
      },
      'tinted-accent-1': {
        root: [
          'bg-(--ui-color-design-tinted-a1-bg)',
          'border border-(--ui-color-design-tinted-a1-stroke) border-(length:--ui-design-tinted-a1-stroke-weight)',
          'text-(--ui-color-design-tinted-a1-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-tinted-a1-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-tinted-a1-content-divider) border-t-1'
      },
      'tinted-success': {
        root: [
          'bg-(--ui-color-design-tinted-success-bg)',
          'border border-(--ui-color-design-tinted-success-stroke) border-(length:--ui-design-tinted-success-stroke-weight)',
          'text-(--ui-color-design-tinted-success-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-tinted-success-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-tinted-success-content-divider) border-t-1'
      },
      'tinted-alert': {
        root: [
          'bg-(--ui-color-design-tinted-alert-bg)',
          'border border-(--ui-color-design-tinted-alert-stroke) border-(length:--ui-design-tinted-alert-stroke-weight)',
          'text-(--ui-color-design-tinted-alert-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-tinted-alert-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-tinted-alert-content-divider) border-t-1'
      },
      'tinted-warning': {
        root: [
          'bg-(--ui-color-design-tinted-warning-bg)',
          'border border-(--ui-color-design-tinted-warning-stroke) border-(length:--ui-design-tinted-warning-stroke-weight)',
          'text-(--ui-color-design-tinted-warning-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-tinted-warning-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-tinted-warning-content-divider) border-t-1'
      },
      'tinted-no-accent': {
        root: [
          'bg-(--ui-color-design-tinted-na-bg)',
          'border border-(--ui-color-design-tinted-na-stroke) border-(length:--ui-design-tinted-na-stroke-weight)',
          'text-(--ui-color-design-tinted-na-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-tinted-na-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-tinted-na-content-divider) border-t-1'
      },
      'outline': {
        root: [
          'bg-(--ui-color-design-outline-bg)',
          'border border-(--ui-color-design-outline-stroke) border-(length:--ui-design-outline-stroke-weight)',
          'text-(--ui-color-design-outline-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-content-divider) border-t-1'
      },
      'outline-alt': {
        root: [
          'bg-(--ui-color-design-outline-bg-alt)',
          'border border-(--ui-color-design-outline-content-divider) border-(length:--ui-design-outline-stroke-weight-alt)',
          'text-(--ui-color-design-outline-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-content-divider) border-t-1'
      },
      'outline-accent': {
        root: [
          'bg-(--ui-color-design-outline-a1-bg)',
          'border border-(--ui-color-design-outline-a1-stroke) border-(length:--ui-design-outline-a1-stroke-weight)',
          'text-(--ui-color-design-outline-a1-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-a1-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-a1-content-divider) border-t-1'
      },
      'outline-accent-2': {
        root: [
          'bg-(--ui-color-design-outline-a2-bg)',
          'border border-(--ui-color-design-outline-a2-stroke) border-(length:--ui-design-outline-a2-stroke-weight)',
          'text-(--ui-color-design-outline-a2-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-a2-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-a2-content-divider) border-t-1'
      },
      'outline-success': {
        root: [
          'bg-(--ui-color-design-outline-success-bg)',
          'border border-(--ui-color-design-outline-success-stroke) border-(length:--ui-design-outline-success-stroke-weight)',
          'text-(--ui-color-design-outline-success-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-success-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-success-content-divider) border-t-1'
      },
      'outline-alert': {
        root: [
          'bg-(--ui-color-design-outline-alert-bg)',
          'border border-(--ui-color-design-outline-alert-stroke) border-(length:--ui-design-outline-alert-stroke-weight)',
          'text-(--ui-color-design-outline-alert-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-alert-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-alert-content-divider) border-t-1'
      },
      'outline-warning': {
        root: [
          'bg-(--ui-color-design-outline-warning-bg)',
          'border border-(--ui-color-design-outline-warning-stroke) border-(length:--ui-design-outline-warning-stroke-weight)',
          'text-(--ui-color-design-outline-warning-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-warning-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-warning-content-divider) border-t-1'
      },
      'outline-copilot': {
        root: [
          'bg-(--ui-color-design-outline-copilot-bg)',
          'border border-(--ui-color-design-outline-copilot-stroke) border-(length:--ui-design-outline-copilot-stroke-weight)',
          'text-(--ui-color-design-outline-copilot-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-copilot-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-copilot-content-divider) border-t-1'
      },
      'outline-no-accent': {
        root: [
          'bg-(--ui-color-design-outline-na-bg)',
          'border border-(--ui-color-design-outline-na-stroke) border-(length:--ui-design-outline-na-stroke-weight)',
          'text-(--ui-color-design-outline-na-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-outline-na-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-outline-na-content-divider) border-t-1'
      },
      'plain': {
        root: [
          'bg-(--ui-color-design-plain-bg)',
          'border border-(--ui-color-design-plain-stroke) border-(length:--ui-design-plain-stroke-weight)',
          'text-(--ui-color-design-plain-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-plain-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-plain-content-divider) border-t-1'
      },
      'plain-accent': {
        root: [
          'bg-(--ui-color-design-plain-a-bg)',
          'border border-(--ui-color-design-plain-a-stroke) border-(length:--ui-design-plain-a-stroke-weight)',
          'text-(--ui-color-design-plain-a-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-plain-a-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-plain-a-content-divider) border-t-1'
      },
      'plain-no-accent': {
        root: [
          'bg-(--ui-color-design-plain-na-bg)',
          'border border-(--ui-color-design-plain-na-stroke) border-(length:--ui-design-plain-na-stroke-weight)',
          'text-(--ui-color-design-plain-na-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-plain-na-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-plain-na-content-divider) border-t-1'
      },
      'selection': {
        root: [
          'bg-(--ui-color-design-selection-bg)',
          'border border-(--ui-color-design-selection-stroke) border-(length:--ui-design-selection-stroke-weight)',
          'text-(--ui-color-design-selection-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-selection-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-selection-content-divider) border-t-1'
      }
    },
    to: {
      true: {
        root: 'transition'
      }
    },
    title: {
      true: {
        description: 'mt-1'
      }
    },
    highlight: {
      true: { root: 'ring-2' }
    },
    highlightColor: {
      'air-primary': '',
      'air-primary-success': '',
      'air-primary-alert': '',
      'air-primary-copilot': '',
      'air-primary-warning': ''
    }
  },
  compoundVariants: [
    // region variant & to ////
    // @todo
    {
      variant: 'solid',
      to: true,
      class: {
        root: 'hover:bg-inverted/90'
      }
    },
    {
      variant: 'outline',
      to: true,
      class: {
        root: 'hover:bg-elevated/50'
      }
    },
    {
      variant: 'soft',
      to: true,
      class: {
        root: 'hover:bg-elevated'
      }
    },
    {
      variant: 'subtle',
      to: true,
      class: {
        root: 'hover:bg-elevated'
      }
    },
    {
      variant: 'subtle',
      to: true,
      highlight: false,
      class: {
        root: 'hover:ring-accented'
      }
    },
    {
      variant: 'ghost',
      to: true,
      class: {
        root: 'hover:bg-elevated/50'
      }
    },
    // endregion ////
    // region highlight ////
    {
      highlightColor: 'air-primary',
      highlight: true,
      class: { root: 'ring-(--ui-color-design-filled-stroke)' }
    },
    {
      highlightColor: 'air-primary-success',
      highlight: true,
      class: { root: 'ring-(--ui-color-design-filled-success-stroke)' }
    },
    {
      highlightColor: 'air-primary-alert',
      highlight: true,
      class: { root: 'ring-(--ui-color-design-filled-alert-stroke)' }
    },
    {
      highlightColor: 'air-primary-copilot',
      highlight: true,
      class: { root: 'ring-(--ui-color-design-filled-copilot-stroke)' }
    },
    {
      highlightColor: 'air-primary-warning',
      highlight: true,
      class: { root: 'ring-(--ui-color-design-filled-warning-stroke)' }
    },
    // endregion ////
    // region to ////
    {
      to: true,
      class: {
        root: 'has-focus-visible:ring-2 has-focus-visible:ring-primary'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    variant: 'outline',
    highlightColor: 'air-primary'
  }
}
