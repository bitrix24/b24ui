/**
 * Callout (Tip)
 * ---
 * @see Alert (m)
 */
export default {
  slots: {
    base: [
      'group',
      'relative',
      'block',
      'py-xs ps-sm pe-xs gap-2',
      'my-5 last:mb-0',
      'text-(length:--ui-font-size-md)/(--ui-font-line-height-3xs)',
      'text-(--b24ui-color)',
      'bg-(--b24ui-background)',
      'border-(--b24ui-border-color) border-(length:--b24ui-border-width)',
      'rounded-(--ui-border-radius-md)',
      // @memo use style-filled-black-inverted
      '[&_code]:text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
      '[&>div]:my-2.5',
      '[&_ul]:my-2.5 [&_ul]:ps-3 [&_ul]:marker:text-(--b24ui-color)',
      '[&_ol]:my-2.5 [&_ol]:ps-3 [&_ul]:marker:text-(--b24ui-color)',
      '[&>*]:last:!mb-0',
      '[&_li]:my-1.5 [&_li]:ps-1 [&_li]:text-(length:--ui-font-size-md)/(--ui-font-line-height-3xs) [&_li]:text-(--b24ui-color)',
      '[&_a]:underline',
      'transition-colors'
    ].join(' '),
    icon: [
      'shrink-0 size-5',
      'inline-block',
      'me-[6px]',
      'text-(--b24ui-icon)',
      'transition-colors'
    ].join(' '),
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
      true: 'border-dashed'
    }
  },
  compoundVariants: [
    {
      to: true,
      class: {
        base: 'hover:border-(--b24ui-border-color-hover) has-focus-visible:border-(--b24ui-border-color-hover)',
        externalIcon: 'group-hover:text-(--b24ui-icon)'
      }
    },
    {
      color: 'air-secondary-accent',
      class: {
        base: 'bg-(--b24ui-background)/20'
      }
    }
  ],
  defaultVariants: {
    color: 'air-primary'
  }
}
