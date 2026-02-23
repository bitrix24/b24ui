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
import { fieldGroupVariantWithRoot } from './field-group'

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
        'text-(--ui-color-base-1)',
        'style-blurred-bg-input',
        'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
        'hover:text-(--ui-color-base-1)',
        'focus:text-(--ui-color-base-1)',
        'active:text-(--ui-color-base-1)',
        'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
        'align-middle',
        'text-ellipsis whitespace-nowrap'
      ].join(' '),
      increment: 'absolute flex items-center',
      decrement: 'absolute flex items-center',
      tag: input.slots.tag
    },
    variants: {
      ...fieldGroupVariantWithRoot,
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
      },
      fixed: {
        false: ''
      },
      increment: {
        false: ''
      },
      decrement: {
        false: ''
      }
    },
    compoundVariants: [
      // region ring for focus and highlight ////
      {
        highlight: false,
        noBorder: false,
        underline: false,
        class: {
          base: [
            'ring ring-inset',
            'ring-(--ui-color-design-outline-stroke)',
            'focus-visible:ring-1',
            'focus-visible:ring-inset',
            'focus-visible:ring-(--b24ui-border-color)',
            'hover:ring-1 hover:ring-inset hover:ring-(--b24ui-border-color)',
            'data-[state=open]:ring-1 data-[state=open]:ring-inset data-[state=open]:ring-(--b24ui-border-color)'
          ].join(' ')
        }
      },
      {
        highlight: true,
        noBorder: false,
        underline: false,
        class: {
          base: [
            'ring ring-inset',
            'ring-(--b24ui-border-color)',
            'focus-visible:ring-1',
            'focus-visible:ring-inset',
            'focus-visible:ring-(--b24ui-border-color)',
            'hover:ring-1 hover:ring-inset hover:ring-(--b24ui-border-color)',
            'data-[state=open]:ring-1 data-[state=open]:ring-inset data-[state=open]:ring-(--b24ui-border-color)'
          ].join(' ')
        }
      },
      {
        noBorder: false,
        underline: true,
        class: {
          base: [
            'focus-visible:border-(--b24ui-border-color)'
          ].join(' ')
        }
      },
      {
        highlight: true,
        noBorder: false,
        underline: true,
        class: {
          base: [
            'ring-0',
            'border-b-(--b24ui-border-color)'
          ].join(' ')
        }
      },
      {
        highlight: true,
        noBorder: true,
        underline: false,
        class: {
          base: [
            'ring-0'
          ].join(' ')
        }
      },
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
      // region orientation:horizontal ////
      {
        orientation: 'horizontal',
        decrement: false,
        class: {
          base: 'text-start'
        }
      },
      {
        orientation: 'horizontal',
        size: 'xss',
        class: {
          increment: '[&>button]:p-[2px] [&>button]:h-[24px] scale-70',
          decrement: '[&>button]:p-[2px] [&>button]:h-[24px] scale-70'
        }
      },
      {
        orientation: 'horizontal',
        size: 'xs',
        class: {
          increment: '[&>button]:p-[2px] [&>button]:h-[24px] scale-70',
          decrement: '[&>button]:p-[2px] [&>button]:h-[24px] scale-70'
        }
      },
      {
        orientation: 'horizontal',
        size: 'sm',
        class: {
          increment: '[&>button]:p-[2px] scale-70',
          decrement: '[&>button]:p-[2px] scale-70'
        }
      },
      {
        orientation: 'horizontal',
        size: 'md',
        class: {
          increment: '[&>button]:p-[2px] scale-60',
          decrement: '[&>button]:p-[2px] scale-60'
        }
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        class: {
          increment: '[&>button]:p-[2px] scale-60',
          decrement: '[&>button]:p-[2px] scale-60'
        }
      },
      {
        orientation: 'horizontal',
        size: 'xl',
        class: {
          increment: '[&>button]:p-[4px] scale-60',
          decrement: '[&>button]:p-[4px] scale-60'
        }
      },
      // endregion ////
      // region orientation:vertical ////
      {
        orientation: 'vertical',
        size: 'xss',
        class: {
          increment: 'top-0 pe-0 [&>button]:h-[13px] scale-56',
          decrement: 'bottom-0 pe-0 [&>button]:h-[13px] scale-56'
        }
      },
      {
        orientation: 'vertical',
        size: 'xs',
        class: {
          increment: 'top-0 pe-0 [&>button]:h-[13px] scale-80',
          decrement: 'bottom-0 pe-0 [&>button]:h-[13px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'sm',
        class: {
          increment: 'top-0 pe-0 [&>button]:h-[15px] scale-80',
          decrement: 'bottom-0 pe-0 [&>button]:h-[15px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'md',
        class: {
          increment: 'top-0 pe-0 [&>button]:h-[18px] scale-80',
          decrement: 'bottom-0 pe-0 [&>button]:h-[18px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: {
          increment: '[&>button]:h-[16px] scale-80',
          decrement: '[&>button]:h-[16px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'xl',
        class: {
          increment: '[&>button]:h-[20px] scale-80',
          decrement: '[&>button]:h-[20px] scale-80'
        }
      },
      // endregion ////
      // region decrement:true ////
      {
        decrement: true,
        size: 'xss',
        class: {
          base: 'ps-[24px]'
        }
      },
      {
        decrement: true,
        size: 'xs',
        class: {
          base: 'ps-[24px]'
        }
      },
      {
        decrement: true,
        size: 'sm',
        class: {
          base: 'ps-[28px]'
        }
      },
      {
        decrement: true,
        size: 'md',
        class: {
          base: 'ps-[30px]'
        }
      },
      {
        decrement: true,
        size: 'lg',
        class: {
          base: 'ps-[30px]'
        }
      },
      {
        decrement: true,
        size: 'xl',
        class: {
          base: 'ps-[40px]'
        }
      },
      // endregion ////
      // region increment:true ////
      {
        increment: true,
        size: 'xss',
        class: {
          base: 'pe-[24px]'
        }
      },
      {
        increment: true,
        size: 'xs',
        class: {
          base: 'pe-[24px]'
        }
      },
      {
        increment: true,
        size: 'sm',
        class: {
          base: 'pe-[30px]',
          increment: 'top-0 pe-0 [&>button]:h-[15px] scale-80',
          decrement: 'bottom-0 pe-0 [&>button]:h-[15px] scale-80'
        }
      },
      {
        increment: true,
        size: 'md',
        class: {
          base: 'pe-[34px]'
        }
      },
      {
        increment: true,
        size: 'lg',
        class: {
          base: 'pe-[38px]'
        }
      },
      {
        increment: true,
        size: 'xl',
        class: {
          base: 'pe-[38px]'
        }
      },
      // endregion ////
      // endregion ////
      // region fieldGroup ////
      {
        fieldGroup: ['horizontal', 'vertical'],
        size: ['xl', 'lg', 'md'],
        rounded: false,
        class: 'rounded-(--ui-border-radius-md)'
      },
      {
        fieldGroup: ['horizontal', 'vertical'],
        size: 'sm',
        rounded: false,
        class: 'rounded-(--ui-border-radius-sm)'
      },
      {
        fieldGroup: ['horizontal', 'vertical'],
        size: 'xs',
        rounded: false,
        class: 'rounded-(--ui-border-radius-xs)'
      },
      {
        fieldGroup: ['horizontal', 'vertical'],
        size: 'xss',
        rounded: false,
        class: 'rounded-[5px]'
      },
      // endregion ////
      // region fixed ////
      {
        fixed: false,
        size: 'xss',
        class: 'md:text-(length:--ui-font-size-4xs)/[normal]'
      },
      {
        fixed: false,
        size: 'xs',
        class: 'md:text-(length:--ui-font-size-xs)/[normal]'
      },
      {
        fixed: false,
        size: 'sm',
        class: 'md:text-(length:--ui-font-size-sm)/[normal]'
      },
      {
        fixed: false,
        size: 'md',
        class: 'md:text-(length:--ui-font-size-lg)/[normal]'
      },
      {
        fixed: false,
        size: 'lg',
        class: 'md:text-(length:--ui-font-size-lg)/[normal]'
      }
      // endregion ////
    ],
    defaultVariants: {
      color: 'air-primary',
      size: 'md'
    }
  }
}
