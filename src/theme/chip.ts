/**
 * Chip
 * As a source we will choose `counter` and `labels`
 * ---
 * @link /api_d7/bitrix/ui/labels/index.php
 * @see src/runtime/air-design-tokens/components/badge-counter.css
 * @see bitrix/js/ui/cnt/src/cnt-color.js
 * @see bitrix/js/ui/cnt/ui.cnt.css
 * @see bitrix/js/ui/label/src/label-color.js
 * @see bitrix/js/ui/label/src/style.css
 * @todo add animation >> demo >> https://github.com/nuxt/ui/blob/v3/docs/app/components/content/examples/chip/ChipShowExample.vue
 */

export default {
  slots: {
    root: [
      'relative shrink-0 isolate',
      'inline-flex items-center justify-center'
    ].join(' '),
    base: [
      'ui-counter__scope --air',
      'font-[family-name:var(--ui-font-family-primary)]',
      'font-(--ui-font-weight-medium)',
      'select-none',
      'relative',
      'min-w-(--ui-counter-size) h-(--ui-counter-size)',
      'py-0 px-(--ui-counter-inline-space)',
      'inline-flex items-center justify-center',
      'bg-(--b24ui-background)',
      'rounded-(--ui-counter-current-size)',
      'ring-(length:--b24ui-border-width) ring-(--b24ui-border-color)',
      'text-center align-middle',
      'text-(length:--ui-counter-font-size) text-(--b24ui-color)',
      'leading-(--ui-counter-current-size)',
      'overflow-hidden',
      'z-1'
      // fix
      // 'rounded-sm',
      // 'flex items-center justify-center',
      // 'p-1',
      // 'bg-(--b24ui-background-hover)',
      // 'text-(--b24ui-color)',
      // 'text-(length:--ui-counter-font-size)',
      // 'whitespace-nowrap'
    ].join(' '),
    trailingIcon: [
      'size-(--ui-counter-size)',
      'text-inherit',
      'text-(length:--ui-counter-symbol-font-size)',
      'opacity-96',
      'tracking-(--ui-letter-spacing-xl)',
      'me-(--ui-counter-symbol-compensation) empty:me-[0]'
    ].join(' ')
  },
  variants: {
    color: {
      'air-primary': { base: 'style-filled' },
      'air-primary-success': { base: 'style-filled-success' },
      'air-primary-alert': { base: 'style-filled-alert' },
      'air-primary-copilot': { base: 'style-filled-copilot' },
      'air-primary-warning': { base: 'style-filled-warning' },
      'air-secondary': { base: 'style-tinted-no-accent-1' },
      'air-secondary-accent': { base: 'style-filled-no-accent' },
      'air-secondary-accent-1': { base: 'style-filled-no-accent-inverted context-edge-dark:text-(--ui-color-g-content-grey-2)' },
      'air-secondary-no-accent': { base: 'style-outline-no-accent' },
      // @deprecate ////
      'default': { base: 'style-old-default' },
      'danger': { base: 'style-old-danger' },
      'success': { base: 'style-old-success' },
      'warning': { base: 'style-old-warning' },
      'primary': { base: 'style-old-primary' },
      'secondary': { base: 'style-old-secondary' },
      'collab': { base: 'style-old-collab' },
      'ai': { base: 'style-old-ai' }
    },
    size: {
      'sm': 'ui-counter-sm font-(--ui-font-weight-regular)',
      'md': 'ui-counter-md',
      'lg': 'ui-counter-lg'
    },
    position: {
      'top-right': 'top-0 right-0',
      'bottom-right': 'bottom-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-left': 'bottom-0 left-0'
    },
    inverted: {
      true: '',
      false: ''
    },
    inset: {
      false: ''
    },
    standalone: {
      true: '',
      false: 'absolute'
    },
    hideZero: {
      true: {
        base: 'data-[value=0]:hidden'
      }
    },
    oneDigit: {
      true: {
        base: 'px-0'
      }
    }
  },
  compoundVariants: [
    // region position ////
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
    },
    // endregion ////
    // region color ////
    {
      inverted: true,
      color: 'air-primary',
      class: {
        base: 'style-filled-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-success',
      class: {
        base: 'style-filled-success-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-alert',
      class: {
        base: 'style-filled-alert-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-copilot',
      class: {
        base: 'style-filled-copilot-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-warning',
      class: {
        base: 'style-filled-warning-inverted'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    size: 'sm',
    color: 'air-primary-alert',
    position: 'top-right'
  }
}
