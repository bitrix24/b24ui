/**
 * Prose/Code
 * Show code
 *
 * @see src/theme/badge.ts
 */

export default {
  slots: {
    base: [
      'px-1.5 py-0.5',
      'font-[family-name:var(--ui-font-family-system-mono)] font-(--ui-font-weight-medium)',
      'text-(length:--ui-font-size-sm)/[normal]',
      'rounded-(--ui-border-radius-md)',
      'inline-block',
      'ring ring-inset',
      'text-(--b24ui-color) bg-(--b24ui-background) ring-(--b24ui-border-color)',
      'dark:text-(--ui-color-design-tinted-na-content) dark:bg-(--ui-color-design-tinted-na-bg) dark:ring-(--ui-color-design-outline-na-stroke)'
    ].join(' ')
  },
  variants: {
    color: {
      'air-primary': { base: 'style-filled' },
      'air-primary-success': { base: 'style-filled-success' },
      'air-primary-alert': { base: 'style-filled-alert' },
      'air-primary-copilot': { base: 'style-filled-copilot' },
      'air-primary-warning': { base: 'style-filled-warning' },
      'air-secondary': { base: 'style-filled-black' }, //  dark:style-tinted-no-accent-1
      'air-tertiary': { base: 'style-outline-no-accent' },
      // @deprecate ////
      'default': { base: 'style-old-default' },
      'danger': { base: 'style-old-danger' },
      'success': { base: 'style-old-success' },
      'warning': { base: 'style-old-warning' },
      'primary': { base: 'style-old-primary' },
      'secondary': { base: 'style-old-secondary' },
      'collab': { base: 'style-old-collab' },
      'ai': { base: 'style-old-ai' }
    }
  },
  defaultVariants: {
    color: 'air-secondary'
  }
}
