/**
 * Chip
 * As a source we will choose `counter` and `labels`
 * ---
 * @link https://dev.1c-bitrix.ru/api_d7/bitrix/ui/labels/index.php
 * @see bitrix/js/ui/cnt/src/cnt-color.js
 * @see bitrix/js/ui/cnt/ui.cnt.css
 * @see bitrix/js/ui/label/src/label-color.js
 * @see bitrix/js/ui/label/src/style.css
 * @todo add animation >> demo >> https://github.com/nuxt/ui/blob/v3/docs/app/components/content/examples/chip/ChipShowExample.vue
 */

import type { ModuleOptions } from '../module'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'relative inline-flex items-center justify-center shrink-0',
    base: 'rounded-sm ring ring-white dark:ring-base-900 flex items-center justify-center p-1 text-white text-3xs font-semibold font-b24-secondary whitespace-nowrap'
  },
  variants: {
    color: {
      default: 'bg-base-500 dark:bg-base-800',
      danger: 'bg-red-500 dark:bg-red-800',
      success: 'bg-green-500 dark:bg-green-800',
      warning: 'bg-orange-500 dark:bg-orange-800',
      primary: 'bg-blue-500 dark:bg-blue-800',
      secondary: 'bg-accent-aqua dark:bg-accent-turquoise',
      ai: 'bg-[#e7d8fa] dark:bg-copilot-dark',
      link: 'bg-[#b0b4bb] dark:bg-base-800'
    },
    size: {
      '3xs': 'h-2xs min-w-2xs text-[0px] text-transparent',
      '2xs': 'h-2xs2 min-w-2xs2 text-[0px] text-transparent',
      'xs': 'h-xs2 min-w-xs2 text-[0px] text-transparent',
      'sm': 'h-sm min-w-sm text-4xs font-regular',
      'md': 'h-md min-w-md',
      'lg': 'h-lg min-w-lg rounded-md'
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
      class: '-translate-y-1/2 translate-x-1/2 transform'
    },
    {
      position: 'bottom-right',
      inset: false,
      class: 'translate-y-1/2 translate-x-1/2 transform'
    },
    {
      position: 'top-left',
      inset: false,
      class: '-translate-y-1/2 -translate-x-1/2 transform'
    },
    {
      position: 'bottom-left',
      inset: false,
      class: 'translate-y-1/2 -translate-x-1/2 transform'
    },
    // inset: md | lg ////
    {
      position: 'top-right',
      size: ['md', 'lg'],
      inset: true,
      class: '-translate-y-1/3 translate-x-1/3 transform'
    },
    {
      position: 'bottom-right',
      size: ['md', 'lg'],
      inset: true,
      class: 'translate-y-1/3 translate-x-1/3 transform'
    },
    {
      position: 'top-left',
      size: ['md', 'lg'],
      inset: true,
      class: '-translate-y-1/3 -translate-x-1/3 transform'
    },
    {
      position: 'bottom-left',
      size: ['md', 'lg'],
      inset: true,
      class: 'translate-y-1/3 -translate-x-1/3 transform'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'danger',
    position: 'top-right'
  }
})
