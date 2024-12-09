/**
 * Avatar
 * An img element with fallback and Nuxt Image support.
 * ---
 * @see bitrix/js/ui/avatar
 * @see bitrix/js/im/v2/component/elements/dist/registry.bundle.min.css
 * @todo carry out stylization
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
        root: 'size-5 text-4xs font-regular' // 14px; font-size ?
      },
      'xs': {
        root: 'size-6 text-3xs font-regular' // 18px; font-size ?
      },
      'sm': {
        root: 'size-7 text-xs' // 22px; font-size ?
      },
      'md': {
        root: 'size-8 text-sm' // 32px; font-size - --ui-font-size-sm 13px
      },
      'lg': {
        root: 'size-[42px] text-2xl' // 42px; font-size - --ui-font-size-2xl, 18px
      },
      'xl': {
        root: 'size-12 text-2xl' // 48px; font-size - --ui-font-size-2xl, 18px
      },
      '2xl': {
        root: 'size-[60px] text-5xl' // 60px; font-size - --ui-font-size-5xl, 28px
      },
      '3xl': {
        root: 'size-[94px] text-[34px]' // 94px; font-size - 34px
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
