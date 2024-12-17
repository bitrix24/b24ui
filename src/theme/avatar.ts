/**
 * Avatar
 * An img element with fallback and Nuxt Image support.
 * ---
 * @see bitrix/js/im/v2/component/elements/dist/registry.bundle.min.css
 */
export default {
  slots: {
    root: 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-base-100 dark:bg-base-900',
    image: 'h-full w-full rounded-[inherit] object-cover',
    fallback: 'font-medium text-base-500 dark:text-base-600 truncate',
    icon: 'text-base-500 shrink-0 dark:text-base-600'
  },
  variants: {
    size: {
      '2xs': {
        root: 'size-5 text-4xs font-regular',
        icon: 'size-5'
      },
      'xs': {
        root: 'size-6 text-3xs font-regular',
        icon: 'size-6'
      },
      'sm': {
        root: 'size-7 text-xs',
        icon: 'size-7'
      },
      'md': {
        root: 'size-8 text-sm',
        icon: 'size-8'
      },
      'lg': {
        root: 'size-[42px] text-2xl',
        icon: 'size-[42px]'
      },
      'xl': {
        root: 'size-12 text-2xl',
        icon: 'size-12'
      },
      '2xl': {
        root: 'size-[60px] text-5xl',
        icon: 'size-[60px]'
      },
      '3xl': {
        root: 'size-[94px] text-[34px]',
        icon: 'size-[94px]'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
