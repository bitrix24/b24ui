/**
 * Chip
 * As a source we will choose `counter` and `labels`
 * ---
 * @link /api_d7/bitrix/ui/labels/index.php
 * @see bitrix/js/ui/cnt/src/cnt-color.js
 * @see bitrix/js/ui/cnt/ui.cnt.css
 * @see bitrix/js/ui/label/src/label-color.js
 * @see bitrix/js/ui/label/src/style.css
 * @todo add animation >> demo >> https://github.com/nuxt/ui/blob/v3/docs/app/components/content/examples/chip/ChipShowExample.vue
 */

export default {
  slots: {
    root: 'relative inline-flex items-center justify-center shrink-0',
    base: 'select-none rounded-sm ring ring-white dark:ring-base-700 flex items-center justify-center p-1 text-white leading-none font-semibold font-b24-secondary whitespace-nowrap'
  },
  variants: {
    color: {
      default: 'bg-base-500 dark:bg-base-900 dark:text-base-100',
      danger: 'bg-red-500 dark:bg-red-600 dark:text-red-250',
      success: 'bg-green-500 dark:bg-green-600 dark:text-green-250',
      warning: 'bg-orange-500 dark:bg-orange-600 dark:text-orange-250',
      primary: 'bg-blue-500 dark:bg-blue-600 dark:text-blue-250',
      secondary: 'bg-accent-aqua dark:bg-accent-turquoise',
      ai: 'bg-ai-500 dark:bg-ai-800 dark:text-ai-250',
      link: 'bg-base-900/85 text-white dark:bg-white/85 dark:text-base-900'
    },
    size: {
      '3xs': 'h-2xs min-w-2xs text-[0px] text-transparent',
      '2xs': 'h-2xs2 min-w-2xs2 text-[0px] text-transparent',
      'xs': 'h-xs2 min-w-xs2 text-[0px] text-transparent',
      'sm': 'h-sm min-w-sm text-4xs font-regular',
      'md': 'h-md min-w-md text-3xs',
      'lg': 'h-lg min-w-lg rounded-md text-xs',
      'xl': 'h-lg min-w-lg rounded-md text-xs',
      '2xl': 'h-lg min-w-lg rounded-md text-xs',
      '3xl': 'h-lg min-w-lg rounded-md text-xs'
    },
    position: {
      'top-right': 'top-0 right-0',
      'bottom-right': 'bottom-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-left': 'bottom-0 left-0'
    },
    inset: {
      false: ''
    },
    standalone: {
      false: 'absolute'
    }
  },
  compoundVariants: [
    // not inset ////
    {
      position: 'top-right',
      inset: false,
      standalone: false,
      class: '-translate-y-1/2 translate-x-1/2 transform'
    },
    {
      position: 'bottom-right',
      inset: false,
      standalone: false,
      class: 'translate-y-1/2 translate-x-1/2 transform'
    },
    {
      position: 'top-left',
      inset: false,
      standalone: false,
      class: '-translate-y-1/2 -translate-x-1/2 transform'
    },
    {
      position: 'bottom-left',
      inset: false,
      standalone: false,
      class: 'translate-y-1/2 -translate-x-1/2 transform'
    },
    // inset: md | lg ////
    {
      position: 'top-right',
      size: ['md', 'lg', 'xl', '2xl'],
      inset: true,
      standalone: false,
      class: '-translate-y-1/3 translate-x-1/3 transform'
    },
    {
      position: 'top-right',
      size: ['3xl'],
      inset: true,
      standalone: false,
      class: '-translate-y-1/5 translate-x-1/5 transform'
    },
    {
      position: 'bottom-right',
      size: ['md', 'lg', 'xl', '2xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-1/3 translate-x-1/3 transform'
    },
    {
      position: 'bottom-right',
      size: ['3xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-1/5 translate-x-1/5 transform'
    },
    {
      position: 'top-left',
      size: ['md', 'lg', 'xl', '2xl'],
      inset: true,
      standalone: false,
      class: '-translate-y-1/3 -translate-x-1/3 transform'
    },
    {
      position: 'top-left',
      size: ['3xl'],
      inset: true,
      standalone: false,
      class: '-translate-y-1/5 -translate-x-1/5 transform'
    },
    {
      position: 'bottom-left',
      size: ['md', 'lg', 'xl', '2xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-1/3 -translate-x-1/3 transform'
    },
    {
      position: 'bottom-left',
      size: ['3xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-1/5 -translate-x-1/5 transform'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'danger',
    position: 'top-right'
  }
}
