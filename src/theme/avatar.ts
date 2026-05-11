/**
 * Avatar
 * An img element with fallback and Nuxt Image support.
 * ---
 * @see bitrix/js/im/v2/component/elements/dist/registry.bundle.min.css
 */
export default {
  slots: {
    root: [
      'air-secondary-accent',
      'inline-flex items-center justify-center shrink-0',
      'select-none',
      'rounded-full',
      'align-middle',
      'bg-(--b24ui-background)', // bg-(--ui-color-base-8)
      'ring ring-(--b24ui-border-color)' // ring-(--ui-color-base-7)
      // 'overflow-hidden'
    ].join(' '),
    image: 'h-full w-full rounded-[inherit] object-cover',
    fallback: 'font-(--ui-font-weight-medium) text-(--b24ui-color) truncate', //  text-(--ui-color-design-plain-content-icon-secondary)
    icon: 'text-(--b24ui-icon) shrink-0' // text-(--ui-color-design-plain-content-icon-secondary)
  },
  variants: {
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
      'air-boost': { root: 'style-filled-boost' }
    },
    size: {
      '3xs': {
        root: 'size-2.5 text-4xs font-(--ui-font-weight-regular)',
        icon: 'size-2.5'
      },
      '2xs': {
        root: 'size-5 text-(length:--ui-font-size-4xs)/(--ui-font-line-height-reset) font-(--ui-font-weight-regular)',
        icon: 'size-4.5'
      },
      'xs': {
        root: 'size-6 text-(length:--ui-font-size-3xs)/(--ui-font-line-height-reset) font-(--ui-font-weight-regular)',
        icon: 'size-5.5'
      },
      'sm': {
        root: 'size-7 text-(length:--ui-font-size-xs)/(--ui-font-line-height-reset)',
        icon: 'size-6.5'
      },
      'md': {
        root: 'size-8 text-(length:--ui-font-size-sm)/(--ui-font-line-height-reset)',
        icon: 'size-7'
      },
      'lg': {
        root: 'size-10.5 text-(length:--ui-font-size-2xl)/(--ui-font-line-height-reset)',
        icon: 'size-9.5'
      },
      'xl': {
        root: 'ring-2 size-12 text-(length:--ui-font-size-2xl)/(--ui-font-line-height-reset)',
        icon: 'size-11'
      },
      '2xl': {
        root: 'ring-2 size-15 text-(length:--ui-font-size-5xl)/(--ui-font-line-height-reset)',
        icon: 'size-14'
      },
      '3xl': {
        root: 'ring-2 size-23.5 text-8.5/(--ui-font-line-height-reset)',
        icon: 'size-22.5'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'air-secondary-no-accent'
  }
}
