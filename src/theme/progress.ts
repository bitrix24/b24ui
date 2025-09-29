/**
 * Progress
 * An indicator showing the progress of a task.
 * ---
 * @link /api_d7/bitrix/ui/progressbar/common.php
 * @see /bitrix/js/ui/progressbar/
 * @see Table.loadingAnimation
 */

export default {
  slots: {
    root: 'gap-2',
    base: [
      'relative overflow-hidden',
      'rounded-(--ui-border-radius-pill)',
      'bg-(--ui-color-base-5)'
    ],
    indicator: [
      'rounded-(--ui-border-radius-pill)',
      'size-full',
      'transition-transform duration-200 ease-out',
      'bg-(--b24ui-background)'
    ].join(' '),
    status: [
      'flex justify-end',
      'text-(--b24ui-typography-legend-color)', // text-base-500
      'transition-[width] duration-200'
    ].join(' '),
    steps: [
      'grid items-end',
      'text-(--b24ui-typography-legend-color)'
    ].join(' '),
    step: 'truncate text-end row-start-1 col-start-1 transition-opacity'
  },
  variants: {
    animation: {
      'loading': '',
      'carousel': '',
      'carousel-inverse': '',
      'swing': '',
      'elastic': ''
    },
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' },
      'air-secondary': { root: 'style-tinted' },
      // @deprecate ////
      'default': { root: 'style-old-default' },
      'danger': { root: 'style-old-danger' },
      'success': { root: 'style-old-success' },
      'warning': { root: 'style-old-warning' },
      'primary': { root: 'style-old-primary' },
      'secondary': { root: 'style-old-secondary' },
      'collab': { root: 'style-old-collab' },
      'ai': { root: 'style-old-ai' }
    },
    size: {
      xs: {
        status: 'text-(length:--ui-font-size-xs)/(--ui-font-line-height-sm)',
        steps: 'text-(length:--ui-font-size-xs)/(--ui-font-line-height-sm)'
      },
      sm: {
        status: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        steps: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)'
      },
      md: {
        status: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        steps: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)'
      },
      lg: {
        status: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)',
        steps: 'text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm)'
      }
    },
    step: {
      active: {
        step: 'opacity-100'
      },
      first: {
        step: 'opacity-100 text-(--b24ui-typography-legend-color)'
      },
      other: {
        step: 'opacity-0'
      },
      last: {
        step: ''
      }
    },
    orientation: {
      horizontal: {
        root: 'w-full flex flex-col',
        base: 'w-full',
        status: 'flex-row'
      },
      vertical: {
        root: 'h-full flex flex-row-reverse',
        base: 'h-full',
        status: 'flex-col min-w-[32px]'
      }
    },
    inverted: {
      true: {
        status: 'self-end'
      }
    }
  },
  compoundVariants: [
    // region base ////
    {
      inverted: true,
      orientation: 'horizontal',
      class: {
        step: 'text-start',
        status: 'flex-row-reverse'
      }
    },
    {
      inverted: true,
      orientation: 'vertical',
      class: {
        steps: 'items-start',
        status: 'flex-col-reverse'
      }
    },
    // endregion ////
    // region horizontal ////
    {
      orientation: 'horizontal',
      size: 'xs',
      class: 'h-[2px]'
    },
    {
      orientation: 'horizontal',
      size: 'sm',
      class: 'h-[4px]'
    },
    {
      orientation: 'horizontal',
      size: 'md',
      class: 'h-[8px]'
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      class: 'h-[12px]'
    },
    // endregion ////
    // region vertical ////
    {
      orientation: 'vertical',
      size: 'xs',
      class: 'w-[2px]'
    },
    {
      orientation: 'vertical',
      size: 'sm',
      class: 'w-[4px]'
    },
    {
      orientation: 'vertical',
      size: 'md',
      class: 'w-[8px]'
    },
    {
      orientation: 'vertical',
      size: 'lg',
      class: 'w-[12px]'
    },
    // endregion ////
    // region animation ////
    {
      orientation: 'horizontal',
      animation: 'carousel',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[carousel_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-rtl_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'carousel',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[carousel-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal',
      animation: 'carousel-inverse',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[carousel-inverse_2s_ease-in-out_infinite] data-[state=indeterminate]:rtl:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'carousel-inverse',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[carousel-inverse-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal',
      animation: 'swing',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[swing_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'swing',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[swing-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal',
      animation: 'elastic',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[elastic_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'elastic',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[elastic-vertical_2s_ease-in-out_infinite]'
      }
    },
    {
      orientation: 'horizontal',
      animation: 'loading',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[progressbar-loading_2s_infinite]'
      }
    },
    {
      orientation: 'vertical',
      animation: 'loading',
      class: {
        indicator: 'data-[state=indeterminate]:animate-[progressbar-loading-vertical_2s_infinite]'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    color: 'air-primary',
    animation: 'loading',
    size: 'md'
  }
}
