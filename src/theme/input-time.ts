/**
 * InputTime
 * A time selection input field.
 * ---
 */
import { defuFn } from 'defu'
import input from './input'
import { fieldGroupVariant } from './field-group'

export default () => {
  return defuFn({
    slots: {
      root: () => undefined,
      base: () => [
        'group',
        'relative',
        'inline-flex items-center',
        'select-none',
        'transition-colors',
        'style-blurred-bg-input'
      ].join(' '),
      segment: [
        'rounded',
        'text-center',
        'outline-hidden',
        'text-(--ui-color-base-1)',
        'data-placeholder:text-(--ui-color-design-plain-na-content-secondary)',
        'hover:text-(--ui-color-base-1)',
        'focus:text-(--ui-color-base-1)',
        'active:text-(--ui-color-base-1)',
        'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
        'align-middle',
        'data-[segment=literal]:text-(--ui-color-base-6)',
        'data-invalid:text-(--ui-color-accent-main-alert)',
        'data-disabled:cursor-not-allowed',
        'data-disabled:pointer-events-none',
        'data-disabled:select-none',
        'data-disabled:opacity-30',
        'data-disabled:resize-none',
        'transition-colors',
        'focus:bg-(--ui-color-bg-content-secondary)'
      ].join(' ')
    },
    variants: {
      ...fieldGroupVariant,
      size: {
        xss: {
          base: (prev: string) => [prev, 'gap-0.20', 'px-1'].join(' '),
          segment: 'not-data-[segment=literal]:w-6'
        },
        xs: {
          base: (prev: string) => [prev, 'gap-0.25', 'px-2'].join(' '),
          segment: 'not-data-[segment=literal]:w-6'
        },
        sm: {
          base: (prev: string) => [prev, 'gap-0.5', 'px-2'].join(' '),
          segment: 'not-data-[segment=literal]:w-6'
        },
        md: {
          base: (prev: string) => [prev, 'gap-0.5', 'px-3'].join(' '),
          segment: 'not-data-[segment=literal]:w-7'
        },
        lg: {
          base: (prev: string) => [prev, 'gap-0.75', 'px-3'].join(' '),
          segment: 'not-data-[segment=literal]:w-7'
        },
        xl: {
          base: (prev: string) => [prev, 'gap-0.75', 'px-3'].join(' '),
          segment: 'not-data-[segment=literal]:w-8'
        }
      }
    },
    compoundVariants: [
    ]
  }, input)
}
