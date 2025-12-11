/**
 * PageCard
 * A pre-styled card component featuring a title, description, and optional link.
 * ---
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
    title: 'text-2xl text-pretty font-(--ui-font-weight-semi-bold)',
    description: 'text-lg text-pretty'
  },
  variants: {
    orientation: {
      horizontal: { container: 'lg:grid-cols-2 lg:items-center' },
      vertical: { container: '' }
    },
    reverse: {
      true: { wrapper: 'order-last' }
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
      'filled-alert': {
        root: [
          'bg-(--ui-color-design-filled-alert-bg)',
          'border border-(--ui-color-design-filled-alert-stroke) border-(length:--ui-design-filled-alert-stroke-weight)',
          'text-(--ui-color-design-filled-alert-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-filled-alert-content-icon)',
        title: 'text-(--ui-color-design-filled-alert-content)',
        description: 'text-(--ui-color-design-filled-alert-content-secondary)'
      },
      'filled-warning': {
        root: [
          'bg-(--ui-color-design-filled-warning-bg)',
          'border border-(--ui-color-design-filled-warning-stroke) border-(length:--ui-design-filled-warning-stroke-weight)',
          'text-(--ui-color-design-filled-warning-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-filled-warning-content-icon)',
        title: 'text-(--ui-color-design-filled-warning-content)',
        description: 'text-(--ui-color-design-filled-warning-content)'
      },
      'filled-copilot': {
        root: [
          'bg-(--ui-color-design-filled-copilot-bg)',
          'border border-(--ui-color-design-filled-copilot-stroke) border-(length:--ui-design-filled-copilot-stroke-weight)',
          'text-(--ui-color-design-filled-copilot-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-filled-copilot-content-icon)',
        title: 'text-(--ui-color-design-filled-copilot-content)',
        description: 'text-(--ui-color-design-filled-copilot-content)'
      },
      'filled-no-accent': {
        root: [
          'bg-(--ui-color-design-filled-na-bg)',
          'border border-(--ui-color-design-filled-na-stroke) border-(length:--ui-design-filled-na-stroke-weight)',
          'text-(--ui-color-design-filled-na-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-filled-na-content-icon)',
        title: 'text-(--ui-color-design-filled-na-content)',
        description: 'text-(--ui-color-design-filled-na-content)'
      },
      'filled-black': {
        root: [
          'bg-(--ui-color-design-filled-black-bg)',
          'border border-(--ui-color-design-filled-black-stroke) border-(length:--ui-design-filled-black-stroke-weight)',
          'text-(--ui-color-design-filled-black-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-filled-black-content-icon)',
        title: 'text-(--ui-color-design-filled-black-content)',
        description: 'text-(--ui-color-design-filled-black-content)'
      },
      'tinted': {
        root: [
          'bg-(--ui-color-design-tinted-bg)',
          'border border-(--ui-color-design-tinted-stroke) border-(length:--ui-design-tinted-stroke-weight)',
          'text-(--ui-color-design-tinted-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-tinted-content-icon)',
        title: 'text-(--ui-color-design-tinted-content)',
        description: 'text-(--ui-color-design-tinted-content)'
      },
      'tinted-alt': {
        root: [
          'bg-(--ui-color-design-tinted-bg-alt)',
          'border border-(--ui-color-design-tinted-stroke) border-(length:--ui-design-tinted-stroke-weight)',
          'text-(--ui-color-design-tinted-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-tinted-content-icon)',
        title: 'text-(--ui-color-design-tinted-content)',
        description: 'text-(--ui-color-design-tinted-content)'
      },
      'tinted-accent-1': {
        root: [
          'bg-(--ui-color-design-tinted-a1-bg)',
          'border border-(--ui-color-design-tinted-a1-stroke) border-(length:--ui-design-tinted-a1-stroke-weight)',
          'text-(--ui-color-design-tinted-a1-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-tinted-a1-content-icon)',
        title: 'text-(--ui-color-design-tinted-a1-content)',
        description: 'text-(--ui-color-design-tinted-a1-content)'
      },
      'tinted-success': {
        root: [
          'bg-(--ui-color-design-tinted-success-bg)',
          'border border-(--ui-color-design-tinted-success-stroke) border-(length:--ui-design-tinted-success-stroke-weight)',
          'text-(--ui-color-design-tinted-success-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-tinted-success-content-icon)',
        title: 'text-(--ui-color-design-tinted-success-content)',
        description: 'text-(--ui-color-design-tinted-success-content)'
      },
      'tinted-alert': {
        root: [
          'bg-(--ui-color-design-tinted-alert-bg)',
          'border border-(--ui-color-design-tinted-alert-stroke) border-(length:--ui-design-tinted-alert-stroke-weight)',
          'text-(--ui-color-design-tinted-alert-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-tinted-alert-content-icon)',
        title: 'text-(--ui-color-design-tinted-alert-content)',
        description: 'text-(--ui-color-design-tinted-alert-content)'
      },
      'tinted-warning': {
        root: [
          'bg-(--ui-color-design-tinted-warning-bg)',
          'border border-(--ui-color-design-tinted-warning-stroke) border-(length:--ui-design-tinted-warning-stroke-weight)',
          'text-(--ui-color-design-tinted-warning-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-tinted-warning-content-icon)',
        title: 'text-(--ui-color-design-tinted-warning-content)',
        description: 'text-(--ui-color-design-tinted-warning-content)'
      },
      'tinted-no-accent': {
        root: [
          'bg-(--ui-color-design-tinted-na-bg)',
          'border border-(--ui-color-design-tinted-na-stroke) border-(length:--ui-design-tinted-na-stroke-weight)',
          'text-(--ui-color-design-tinted-na-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-tinted-na-content-icon)',
        title: 'text-(--ui-color-design-tinted-na-content)',
        description: 'text-(--ui-color-design-tinted-na-content)'
      },
      'outline': {
        root: [
          'bg-(--ui-color-design-outline-bg)',
          'border border-(--ui-color-design-outline-stroke) border-(length:--ui-design-outline-stroke-weight)',
          'text-(--ui-color-design-outline-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-content-icon)',
        title: 'text-(--ui-color-design-outline-content)',
        description: 'text-(--ui-color-design-outline-content-secondary)'
      },
      'outline-alt': {
        root: [
          'bg-(--ui-color-design-outline-bg-alt)',
          'border border-(--ui-color-design-outline-content-divider) border-(length:--ui-design-outline-stroke-weight-alt)',
          'text-(--ui-color-design-outline-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-content-icon)',
        title: 'text-(--ui-color-design-outline-content)',
        description: 'text-(--ui-color-design-outline-content-secondary)'
      },
      'outline-accent': {
        root: [
          'bg-(--ui-color-design-outline-a1-bg)',
          'border border-(--ui-color-design-outline-a1-stroke) border-(length:--ui-design-outline-a1-stroke-weight)',
          'text-(--ui-color-design-outline-a1-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-a1-content-icon)',
        title: 'text-(--ui-color-design-outline-a1-content)',
        description: 'text-(--ui-color-design-outline-a1-content)'
      },
      'outline-accent-2': {
        root: [
          'bg-(--ui-color-design-outline-a2-bg)',
          'border border-(--ui-color-design-outline-a2-stroke) border-(length:--ui-design-outline-a2-stroke-weight)',
          'text-(--ui-color-design-outline-a2-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-a2-content-icon)',
        title: 'text-(--ui-color-design-outline-a2-content)',
        description: 'text-(--ui-color-design-outline-a2-content)'
      },
      'outline-success': {
        root: [
          'bg-(--ui-color-design-outline-success-bg)',
          'border border-(--ui-color-design-outline-success-stroke) border-(length:--ui-design-outline-success-stroke-weight)',
          'text-(--ui-color-design-outline-success-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-success-content-icon)',
        title: 'text-(--ui-color-design-outline-success-content)',
        description: 'text-(--ui-color-design-outline-success-content)'
      },
      'outline-alert': {
        root: [
          'bg-(--ui-color-design-outline-alert-bg)',
          'border border-(--ui-color-design-outline-alert-stroke) border-(length:--ui-design-outline-alert-stroke-weight)',
          'text-(--ui-color-design-outline-alert-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-alert-content-icon)',
        title: 'text-(--ui-color-design-outline-alert-content)',
        description: 'text-(--ui-color-design-outline-alert-content)'
      },
      'outline-warning': {
        root: [
          'bg-(--ui-color-design-outline-warning-bg)',
          'border border-(--ui-color-design-outline-warning-stroke) border-(length:--ui-design-outline-warning-stroke-weight)',
          'text-(--ui-color-design-outline-warning-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-warning-content-icon)',
        title: 'text-(--ui-color-design-outline-warning-content)',
        description: 'text-(--ui-color-design-outline-warning-content)'
      },
      'outline-copilot': {
        root: [
          'bg-(--ui-color-design-outline-copilot-bg)',
          'border border-(--ui-color-design-outline-copilot-stroke) border-(length:--ui-design-outline-copilot-stroke-weight)',
          'text-(--ui-color-design-outline-copilot-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-copilot-content-icon)',
        title: 'text-(--ui-color-design-outline-copilot-content)',
        description: 'text-(--ui-color-design-outline-copilot-content)'
      },
      'outline-no-accent': {
        root: [
          'bg-(--ui-color-design-outline-na-bg)',
          'border border-(--ui-color-design-outline-na-stroke) border-(length:--ui-design-outline-na-stroke-weight)',
          'text-(--ui-color-design-outline-na-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-outline-na-content-icon)',
        title: 'text-(--ui-color-design-outline-na-content)',
        description: 'text-(--ui-color-design-outline-na-content)'
      },
      'plain': {
        root: [
          'bg-(--ui-color-design-plain-bg)',
          'border border-(--ui-color-design-plain-stroke) border-(length:--ui-design-plain-stroke-weight)',
          'text-(--ui-color-design-plain-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-plain-content-icon)',
        title: 'text-(--ui-color-design-plain-content)',
        description: 'text-(--ui-color-design-plain-content)'
      },
      'plain-accent': {
        root: [
          'bg-(--ui-color-design-plain-a-bg)',
          'border border-(--ui-color-design-plain-a-stroke) border-(length:--ui-design-plain-a-stroke-weight)',
          'text-(--ui-color-design-plain-a-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-plain-a-content-icon)',
        title: 'text-(--ui-color-design-plain-a-content)',
        description: 'text-(--ui-color-design-plain-a-content)'
      },
      'plain-no-accent': {
        root: [
          'bg-(--ui-color-design-plain-na-bg)',
          'border border-(--ui-color-design-plain-na-stroke) border-(length:--ui-design-plain-na-stroke-weight)',
          'text-(--ui-color-design-plain-na-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-plain-na-content-icon)',
        title: 'text-(--ui-color-design-plain-na-content)',
        description: 'text-(--ui-color-design-plain-na-content)'
      },
      'selection': {
        root: [
          'bg-(--ui-color-design-selection-bg)',
          'border border-(--ui-color-design-selection-stroke) border-(length:--ui-design-selection-stroke-weight)',
          'text-(--ui-color-design-selection-content)'
        ].join(' '),
        leadingIcon: 'text-(--ui-color-design-selection-content-icon)',
        title: 'text-(--ui-color-design-selection-content)',
        description: 'text-(--ui-color-design-selection-content)'
      }
    },
    to: {
      true: {
        root: 'has-focus-visible:ring-2 has-focus-visible:ring-(--ui-color-design-filled-stroke) transition'
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
    {
      variant: 'filled',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-filled-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'filled-success',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-filled-success-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'filled-alert',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-filled-alert-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'filled-warning',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-filled-warning-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'filled-copilot',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-filled-copilot-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'filled-no-accent',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-filled-na-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'filled-black',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-filled-black-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'tinted',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-tinted-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'tinted-alt',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-tinted-bg-alt)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'tinted-accent-1',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-tinted-a1-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'tinted-success',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-tinted-success-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'tinted-alert',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-tinted-alert-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'tinted-warning',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-tinted-warning-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'tinted-no-accent',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-tinted-na-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline-alt',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-bg-alt)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline-accent',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-a1-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline-accent-2',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-a2-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline-success',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-success-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline-alert',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-alert-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline-warning',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-warning-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline-copilot',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-copilot-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'outline-no-accent',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-outline-na-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'plain',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-plain-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'plain-accent',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-plain-a-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'plain-no-accent',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-plain-na-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
      }
    },
    {
      variant: 'selection',
      to: true,
      class: {
        root: 'hover:bg-[color-mix(in_srgb,_var(--ui-color-design-selection-bg)_100%,_var(--ui-color-bg-state-hover-default-hex)_var(--ui-color-bg-state-hover-default-opacity))]'
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
    }
    // endregion ////
    // region to ////
    // endregion ////
  ],
  defaultVariants: {
    variant: 'outline',
    highlightColor: 'air-primary'
  }
}
