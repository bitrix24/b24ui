/**
 * InputNumber
 * Input numerical values with a customizable range.
 * ---
 * @link /api_d7/bitrix/ui/forms/common.php
 * @link /api_d7/bitrix/ui/forms/fields_types.php
 * @see bitrix/js/ui/..
 * @see src/theme/input.ts
 */
import inputTheme from './input'
import { buttonGroupVariantWithRoot } from './button-group'

export default () => {
  const input = inputTheme

  return {
    slots: {
      root: 'isolate relative inline-flex items-center',
      base: [
        'w-full py-0 border-0 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
        'placeholder:text-base-400',
        'dark:placeholder:text-base-300',
        'appearance-none transition duration-300 ease-linear', // transition-colors
        'ring ring-inset ring-base-300',
        'dark:ring-base-800',
        'text-base-master bg-white placeholder:text-base-400 hover:text-base-900 focus:text-base-900 active:text-base-900',
        'dark:text-base-150 dark:bg-transparent dark:placeholder:text-base-300 dark:hover:text-base-350 dark:focus:text-base-350 dark:active:text-base-350',
        'font-b24-primary font-regular text-md leading-none',
        'align-middle',
        'text-ellipsis whitespace-nowrap'
      ].join(' '),
      increment: 'absolute flex items-center',
      decrement: 'absolute flex items-center',
      tag: input.slots.tag
    },
    variants: {
      ...buttonGroupVariantWithRoot,
      size: {
        xs: 'px-2 h-xl2 gap-1',
        sm: 'px-2.5 h-8 gap-1.5',
        md: 'px-2.5 h-10 gap-1.5',
        lg: 'px-3 h-12 gap-2'
      },
      color: {
        default: '',
        danger: '',
        success: '',
        warning: '',
        primary: '',
        secondary: '',
        collab: '',
        ai: ''
      },
      tagColor: {
        ...input.variants.tagColor
      },
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
          increment: 'opacity-75 cursor-not-allowed',
          decrement: 'opacity-75 cursor-not-allowed'
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
      // region default ////
      {
        color: 'default',
        noBorder: false,
        underline: false,
        class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-base-900 dark:focus-visible:ring-base-350'
      },
      {
        color: 'default',
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset ring-base-900 dark:ring-base-350'
      },
      {
        color: 'default',
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-base-900 dark:focus-visible:border-b-base-350'
      },
      {
        color: 'default',
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-base-900 dark:border-b-base-350'
      },
      // endregion ////
      // region danger ////
      {
        color: 'danger',
        noBorder: false,
        underline: false,
        class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-red-500 dark:focus-visible:ring-red-600'
      },
      {
        color: 'danger',
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset  ring-red-500 dark:ring-red-600'
      },
      {
        color: 'danger',
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-b-red-500 dark:focus-visible:border-b-red-600'
      },
      {
        color: 'danger',
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-red-500 dark:border-b-red-600'
      },
      // endregion ////
      // region success ////
      {
        color: 'success',
        noBorder: false,
        underline: false,
        class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-green-500 dark:focus-visible:ring-green-600'
      },
      {
        color: 'success',
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset  ring-green-500 dark:ring-green-600'
      },
      {
        color: 'success',
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-b-green-500 dark:focus-visible:border-b-green-600'
      },
      {
        color: 'success',
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-green-500 dark:border-b-green-600'
      },
      // endregion ////
      // region warning ////
      {
        color: 'warning',
        noBorder: false,
        underline: false,
        class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-orange-500 dark:focus-visible:ring-orange-600'
      },
      {
        color: 'warning',
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset  ring-orange-500 dark:ring-orange-600'
      },
      {
        color: 'warning',
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-b-orange-500 dark:focus-visible:border-b-orange-600'
      },
      {
        color: 'warning',
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-orange-500 dark:border-b-orange-600'
      },
      // endregion ////
      // region primary ////
      {
        color: 'primary',
        noBorder: false,
        underline: false,
        class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-blue-500 dark:focus-visible:ring-blue-600'
      },
      {
        color: 'primary',
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset  ring-blue-500 dark:ring-blue-600'
      },
      {
        color: 'primary',
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-b-blue-500 dark:focus-visible:border-b-blue-600'
      },
      {
        color: 'primary',
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-blue-500 dark:border-b-blue-600'
      },
      // endregion ////
      // region secondary ////
      {
        color: 'secondary',
        noBorder: false,
        underline: false,
        class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-600'
      },
      {
        color: 'secondary',
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset  ring-cyan-500 dark:ring-cyan-600'
      },
      {
        color: 'secondary',
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-b-cyan-500 dark:focus-visible:border-b-cyan-600'
      },
      {
        color: 'secondary',
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-cyan-500 dark:border-b-cyan-600'
      },
      // endregion ////
      // region collab ////
      {
        color: 'collab',
        noBorder: false,
        underline: false,
        class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-collab-500 dark:focus-visible:ring-collab-600'
      },
      {
        color: 'collab',
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset  ring-collab-500 dark:ring-collab-600'
      },
      {
        color: 'collab',
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-b-collab-500 dark:focus-visible:border-b-collab-600'
      },
      {
        color: 'collab',
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-collab-500 dark:border-b-collab-600'
      },
      // endregion ////
      // region ai ////
      {
        color: 'ai',
        noBorder: false,
        underline: false,
        class: 'focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ai-500 dark:focus-visible:ring-ai-600'
      },
      {
        color: 'ai',
        highlight: true,
        noBorder: false,
        underline: false,
        class: 'ring ring-inset  ring-ai-500 dark:ring-ai-600'
      },
      {
        color: 'ai',
        noBorder: false,
        underline: true,
        class: 'focus-visible:border-b-ai-500 dark:focus-visible:border-b-ai-600'
      },
      {
        color: 'ai',
        highlight: true,
        noBorder: false,
        underline: true,
        class: 'border-b-ai-500 dark:border-b-ai-600'
      },
      // endregion ////
      // endregion ////
      // region orientation && size ////
      // region horizontal ////
      {
        orientation: 'horizontal',
        rounded: true,
        class: {
          increment: '[&>button]:rounded-3xl',
          decrement: '[&>button]:rounded-3xl'
        }
      },
      {
        orientation: 'horizontal',
        size: 'xs',
        class: {
          base: 'px-[1.3rem]',
          increment: '[&>button]:h-[24px] scale-80',
          decrement: '[&>button]:h-[24px] scale-80'
        }
      },
      {
        orientation: 'horizontal',
        size: 'sm',
        class: {
          base: 'px-[2.1rem]',
          increment: 'scale-80',
          decrement: 'scale-80'
        }
      },
      {
        orientation: 'horizontal',
        size: 'md',
        class: {
          base: 'px-[2.45rem]',
          increment: '[&>button]:p-1.5 scale-80',
          decrement: '[&>button]:p-1.5 scale-80'
        }
      },
      {
        orientation: 'horizontal',
        size: 'lg',
        class: {
          base: 'px-[2.95rem]',
          increment: 'pe-1 [&>button]:p-1.5 [&>button]:h-[42px] scale-95',
          decrement: 'ps-1 [&>button]:p-1.5 [&>button]:h-[42px] scale-95'
        }
      },
      // endregion ////
      // region vertical ////
      {
        orientation: 'vertical',
        size: 'xs',
        class: {
          base: 'pe-7',
          increment: 'top-0 pe-0 [&>button]:h-[13px]',
          decrement: 'bottom-0 pe-0 [&>button]:h-[13px]'
        }
      },
      {
        orientation: 'vertical',
        size: 'sm',
        class: {
          base: 'pe-8',
          increment: '[&>button]:h-[13px] scale-80',
          decrement: '[&>button]:h-[13px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'md',
        class: {
          base: 'pe-9',
          increment: '[&>button]:h-[19px] scale-80',
          decrement: '[&>button]:h-[19px] scale-80'
        }
      },
      {
        orientation: 'vertical',
        size: 'lg',
        class: {
          base: 'pe-9',
          increment: '[&>button]:h-[22px] scale-80',
          decrement: '[&>button]:h-[22px] scale-80'
        }
      }
      // endregion ////
      // endregion ////
    ],
    defaultVariants: {
      size: 'md',
      color: 'primary',
      tagColor: 'primary'
    }
  }
}
