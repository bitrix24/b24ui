/**
 * Card
 * ---
 * @memo we use ui-color-design-*
 */
export default {
  slots: {
    root: [
      'overflow-hidden',
      'rounded-(--ui-border-radius-md)'
    ].join(' '),
    header: 'p-[24px] sm:px-[22px] sm:py-[15px]',
    body: 'p-[24px] sm:px-[22px] sm:py-[15px]',
    footer: 'p-[24px] sm:px-[22px] sm:py-[15px]'
  },
  variants: {
    variant: {
      'filled': {
        root: [
          'bg-(--ui-color-design-filled-bg)',
          'border border-(--ui-color-design-filled-stroke) border-(length:--ui-design-filled-stroke-weight)',
          'text-(--ui-color-design-filled-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-filled-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-filled-content-divider) border-t-1'
      },
      'filled-success': {
        root: [
          'bg-(--ui-color-design-filled-success-bg)',
          'border border-(--ui-color-design-filled-success-stroke) border-(length:--ui-design-filled-success-stroke-weight)',
          'text-(--ui-color-design-filled-success-content)'
        ].join(' '),
        header: 'border-b border-(--ui-color-design-filled-success-content-divider) border-b-1',
        footer: 'border-t border-(--ui-color-design-filled-success-content-divider) border-t-1'
      },
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
    }
  },
  defaultVariants: {
    variant: 'outline'
  }
}
