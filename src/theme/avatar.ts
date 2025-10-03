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
      'bg-(--ui-color-base-8)',
      'ring ring-(--ui-color-base-7)'
      // 'overflow-hidden'
    ].join(' '),
    image: 'h-full w-full rounded-[inherit] object-cover',
    fallback: 'font-(--ui-font-weight-medium) text-(--ui-color-design-plain-content-icon-secondary) truncate',
    icon: 'text-(--ui-color-design-plain-content-icon-secondary) shrink-0'
  },
  variants: {
    size: {
      '3xs': {
        root: 'size-[10px] text-4xs font-(--ui-font-weight-regular)',
        icon: 'size-[10px]'
      },
      '2xs': {
        root: 'size-[20px] text-(length:--ui-font-size-4xs)/(--ui-font-line-height-reset) font-(--ui-font-weight-regular)',
        icon: 'size-[18px]'
      },
      'xs': {
        root: 'size-[24px] text-(length:--ui-font-size-3xs)/(--ui-font-line-height-reset) font-(--ui-font-weight-regular)',
        icon: 'size-[22px]'
      },
      'sm': {
        root: 'size-[28px] text-(length:--ui-font-size-xs)/(--ui-font-line-height-reset)',
        icon: 'size-[26px]'
      },
      'md': {
        root: 'size-[32px] text-(length:--ui-font-size-sm)/(--ui-font-line-height-reset)',
        icon: 'size-[28px]'
      },
      'lg': {
        root: 'size-[42px] text-(length:--ui-font-size-2xl)/(--ui-font-line-height-reset)',
        icon: 'size-[38px]'
      },
      'xl': {
        root: 'ring-2 size-[48px] text-(length:--ui-font-size-2xl)/(--ui-font-line-height-reset)',
        icon: 'size-[44px]'
      },
      '2xl': {
        root: 'ring-2 size-[60px] text-(length:--ui-font-size-5xl)/(--ui-font-line-height-reset)',
        icon: 'size-[56px]'
      },
      '3xl': {
        root: 'ring-2 size-[94px] text-[34px]/(--ui-font-line-height-reset)',
        icon: 'size-[90px]'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
