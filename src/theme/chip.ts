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
    root: [
      '',
      'relative inline-flex items-center justify-center shrink-0'
    ].join(' '),
    base: [
      'context-light',
      'select-none',
      'rounded-sm',
      'flex items-center justify-center',
      'p-1',
      'bg-(--b24ui-background-hover)',
      'text-(--b24ui-color)',
      'leading-none font-semibold font-b24-secondary',
      'whitespace-nowrap'
    ].join(' ')
  },
  variants: {
    color: {
      'air-primary': { base: 'air-primary' },
      'air-primary-success': { base: 'air-primary-success' },
      'air-primary-alert': { base: 'air-primary-alert' },
      'air-primary-copilot': { base: 'air-primary-copilot' },
      'air-secondary': { base: 'air-secondary' },
      'air-secondary-alert': { base: 'air-secondary-alert' },
      // @deprecate ////
      'default': { base: 'old-style-default' },
      'danger': { base: 'old-style-danger' },
      'success': { base: 'old-style-success' },
      'warning': { base: 'old-style-warning' },
      'primary': { base: 'old-style-primary' },
      'secondary': { base: 'old-style-secondary' },
      'collab': { base: 'old-style-collab' },
      'ai': { base: 'old-style-ai' }
      // default: 'bg-base-500 dark:bg-base-900 dark:text-base-150',
      // danger: 'bg-red-500 dark:bg-red-600 dark:text-red-250',
      // success: 'bg-green-500 dark:bg-green-600 dark:text-green-250',
      // warning: 'bg-orange-500 dark:bg-orange-600 dark:text-orange-250',
      // primary: 'bg-blue-500 dark:bg-blue-600 dark:text-blue-250',
      // secondary: 'bg-cyan-350 dark:bg-cyan-500',
      // collab: 'bg-collab-500 dark:bg-collab-800 dark:text-collab-250',
      // ai: 'bg-ai-500 dark:bg-ai-800 dark:text-ai-250',
      // link: 'bg-base-900/85 text-white dark:bg-white/85 dark:text-base-900'
    },
    size: {
      '3xs': 'h-1 min-w-1 text-[0px] text-transparent p-0',
      '2xs': 'h-1.5 min-w-1.5 text-[0px] text-transparent p-0',
      'xs': 'h-xs2 min-w-xs2 text-[0px] text-transparent  p-0',
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
      true: '',
      false: 'ring ring-(--b24ui-border-color) absolute'
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
    // inset ////
    {
      position: 'top-right',
      size: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      inset: true,
      standalone: false,
      class: '-translate-y-1/3 translate-x-1/3 transform'
    },
    {
      position: 'top-right',
      size: ['2xs', '3xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-0 translate-x-0 transform'
    },
    {
      position: 'bottom-right',
      size: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-1/3 translate-x-1/3 transform'
    },
    {
      position: 'bottom-right',
      size: ['2xs', '3xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-0 translate-x-0 transform'
    },
    {
      position: 'top-left',
      size: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      inset: true,
      standalone: false,
      class: '-translate-y-1/3 -translate-x-1/3 transform'
    },
    {
      position: 'top-left',
      size: ['2xs', '3xl'],
      inset: true,
      standalone: false,
      class: '-translate-y-0 -translate-x-0 transform'
    },
    {
      position: 'bottom-left',
      size: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-1/3 -translate-x-1/3 transform'
    },
    {
      position: 'bottom-left',
      size: ['2xs', '3xl'],
      inset: true,
      standalone: false,
      class: 'translate-y-0 -translate-x-0 transform'
    }
  ],
  defaultVariants: {
    size: 'sm',
    color: 'air-primary-alert',
    position: 'top-right'
  }
}
