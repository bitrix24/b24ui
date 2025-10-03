/**
 * Link
 * A wrapper with extra props.
 * ---
 * @see /bitrix/templates/bitrix24/src/css/typography.css
 * @see /bitrix/js/ui/entity-editor/entity-editor.css
 */
import type { ModuleOptions } from '../module'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: Required<ModuleOptions>) => ({
  base: [
    'cursor-pointer',
    // 'focus-visible:outline-info-text' // fix
    'focus-visible:outline-(--ui-color-accent-main-primary)',
    'focus-visible:outline-1 focus-visible:rounded-[4px]',
    'text-start'
  ].join(' '),
  variants: {
    active: {
      true: [
        'text-(--ui-color-accent-main-primary) outline-(--ui-color-accent-main-primary)',
        'hover:not-disabled:not-aria-disabled:underline underline-offset-2'
      ].join(' '),
      false: [
        'text-(--ui-color-design-selection-content)',
        'underline-offset-2'
      ].join(' ')
    },
    disabled: {
      true: 'cursor-not-allowed opacity-75'
    },
    isAction: {
      true: [
        'text-nowrap',
        'text-(length:--ui-font-size-sm) h-auto py-0 font-(--ui-font-weight-normal) rounded-none',
        'border border-x-0 border-t-0 border-dashed',
        'text-(--ui-color-design-outline-a1-content) border-b-(--ui-color-design-outline-a1-content)',
        'hover:not-disabled:not-aria-disabled:no-underline',
        'hover:text(--ui-color-accent-soft-element-red) hover:not-disabled:not-aria-disabled:text-(--ui-color-accent-soft-element-red) hover:border-b-(--ui-color-accent-soft-element-red)',
        'focus-visible:outline-(--ui-color-accent-soft-element-red)'
      ].join(' ')
    }
  },
  compoundVariants: [
    {
      active: false,
      disabled: false,
      class: [
        'hover:text-(--ui-color-accent-main-primary-alt-2)',
        'hover:underline'
      ].join(' ')
    }
  ]
})
