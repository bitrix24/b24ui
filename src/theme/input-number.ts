/**
 * InputNumber
 * Input numerical values with a customizable range.
 * ---
 * @link /api_d7/bitrix/ui/forms/common.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/..
 * @see src/theme/input.ts
 * @todo fix docs
 */
import inputTheme from './input'
import { buttonGroupVariantWithRoot } from './button-group'

export default () => {
  const input = inputTheme

  return {
    slots: {
      root: 'isolate relative inline-flex items-center',
      base: [
        'w-full py-0 border-0 focus:outline-none',
        'disabled:cursor-not-allowed',
        'disabled:pointer-events-none',
        'disabled:opacity-30',
        'disabled:resize-none',
        'appearance-none transition duration-300 ease-linear', // transition-colors
        'ring ring-inset',
        'ring-(--ui-color-design-outline-stroke)',
        'text-(--ui-color-base-1)',
        'style-blurred-bg-input',
        'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
        'hover:text-(--ui-color-base-1)',
        'focus:text-(--ui-color-base-1)',
        'active:text-(--ui-color-base-1)',
        'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
        'align-middle',
        'text-ellipsis whitespace-nowrap',
        'focus-visible:ring-1',
        'focus-visible:ring-inset',
        'focus-visible:ring-(--b24ui-border-color)'
      ].join(' '),
      increment: 'absolute flex items-center',
      decrement: 'absolute flex items-center',
      tag: input.slots.tag
    },
    variants: {
      ...buttonGroupVariantWithRoot,
      size: {
        xss: 'px-2 h-[20px] gap-1 text-(length:--ui-font-size-4xs)/[normal]',
        xs: 'px-2 h-[24px] gap-1 text-(length:--ui-font-size-xs)/[normal]',
        sm: 'px-2.5 h-[28px] gap-1.5 text-(length:--ui-font-size-sm)/[normal]',
        md: 'px-2.5 h-[34px] gap-1.5 text-(length:--ui-font-size-lg)/[normal]',
        lg: 'px-3 h-[38px] gap-2 text-(length:--ui-font-size-lg)/[normal]',
        xl: 'px-3 h-[46px] gap-2 text-(length:--ui-font-size-2xl)/[normal]'
      },
      color: {
        'air-primary': { base: 'style-filled' },
        'air-primary-success': { base: 'style-filled-success' },
        'air-primary-alert': { base: 'style-filled-alert' },
        'air-primary-copilot': { base: 'style-filled-copilot' },
        'air-primary-warning': { base: 'style-filled-warning' },
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
      /**
       * @memo now get from Badge
       */
      // tagColor: {},
      rounded: {
        ...input.variants.rounded
      },
      noPadding: {
        ...input.variants.noPadding
      },
      noBorder: {
        ...input.variants.noBorder
      },
      underline: {
        ...input.variants.underline
      },
      disabled: {
        true: {
          increment: 'cursor-not-allowed',
          decrement: 'cursor-not-allowed'
        }
      },
      orientation: {
        horizontal: {
          base: 'text-center',
          increment: 'inset-y-0 end-0 py-0 pe-0 [&>button]:p-1',
          decrement: 'inset-y-0 start-0 py-0 ps-0 [&>button]:p-1'
        },
        vertical: {
          increment: 'top-1 end-0 pe-1 [&>button]:p-0',
          decrement: 'bottom-1 end-0 pe-1 [&>button]:p-0'
        }
      },
      highlight: {
        true: ''
      }
    },
    compoundVariants: [
      // region ring for focus and highlight ////
      // region color ////
      {
        noBorder: false,
        underline: false,
        class: ''
      },
      {
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset ring-(--b24ui-border-color)'
      },
      {
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-(--b24ui-border-color)'
      },
      {
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-(--b24ui-border-color)'
      },
      // endregion ////
      // endregion ////
      // region orientation && size ////
      // region horizontal.rounded ////
      {
        orientation: 'horizontal',
        rounded: true,
        class: {
          increment: '[&>button]:rounded-3xl',
          decrement: '[&>button]:rounded-3xl'
        }
      },
      // endregion ////
      // region horizontal ////
      {
        orientation: 'horizontal',
        size: 'xss',
        class: {
          base: 'px-[24px]',
          increment: '[&>button]:p-[2px] [&>button]:h-[24px] scale-70',
          decrement: '[&>button]:p-[2px] [&>button]:h-[24px] scale-70'
        }
      },
      {
        orientation: 'horizontal',
        size: 'xs',
        class: {
          base: 'px-[24px]',
          increment: '[&>button]:p-[2px] [&>button]:h-[24px] scale-70',
          decrement: '[&>button]:p-[2px] [&>button]:h-[24px] scale-70'
        }
      },
      {
        orientation: 'horizontal',
        size: 'sm',
        class: {
          base: 'px-[28px]',
          increment: '[&>button]:p-[2px] scale-70',
          decrement: '[&>button]:p-[2px] scale-70'
        }
      },
      {
        orientation: 'horizontal',
        size: 'md',
        class: {
          base: 'px-[30px]',
          increment: '[&>button]:p-[2px] scale-60',
          decrement: '[&>button]:p-[2px] scale-60'
        }
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        class: {
          base: 'px-[30px]',
          increment: '[&>button]:p-[2px] scale-60',
          decrement: '[&>button]:p-[2px] scale-60'
        }
      },
      {
        orientation: 'horizontal',
        size: 'xl',
        class: {
          base: 'px-[40px]',
          increment: '[&>button]:p-[4px] scale-60',
          decrement: '[&>button]:p-[4px] scale-60'
        }
      },
      // endregion ////
      // region vertical ////
      {
        orientation: 'vertical',
        size: 'xss',
        class: {
          base: 'pe-[24px]',
          increment: 'top-0 pe-0 [&>button]:h-[13px] scale-56',
          decrement: 'bottom-0 pe-0 [&>button]:h-[13px] scale-56'
        }
      },
      {
        orientation: 'vertical',
        size: 'xs',
        class: {
          base: 'pe-[24px]',
          increment: 'top-0 pe-0 [&>button]:h-[13px] scale-80',
          decrement: 'bottom-0 pe-0 [&>button]:h-[13px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'sm',
        class: {
          base: 'pe-[30px]',
          increment: 'top-0 pe-0 [&>button]:h-[15px] scale-80',
          decrement: 'bottom-0 pe-0 [&>button]:h-[15px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'md',
        class: {
          base: 'pe-[34px]',
          increment: 'top-0 pe-0 [&>button]:h-[18px] scale-80',
          decrement: 'bottom-0 pe-0 [&>button]:h-[18px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: {
          base: 'pe-[38px]',
          increment: '[&>button]:h-[16px] scale-80',
          decrement: '[&>button]:h-[16px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'xl',
        class: {
          base: 'pe-[38px]',
          increment: '[&>button]:h-[20px] scale-80',
          decrement: '[&>button]:h-[20px] scale-80'
        }
      }
      // endregion ////
      // endregion ////
    ],
    defaultVariants: {
      color: 'air-primary',
      size: 'md'
    }
  }
}
