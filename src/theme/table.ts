/**
 * Table
 * Like b24.grid
 * A responsive data table component.
 * ---
 * @todo add docs
 * @todo add color
 * @todo add animation
 * @todo add demo
 */

export default {
  slots: {
    root: 'relative overflow-auto',
    base: [
      'min-w-full overflow-clip',
      'font-[family-name:var(--ui-font-family-primary)]'
    ].join(' '),
    caption: 'sr-only',
    thead: 'relative',
    tbody: [
      'divide-y divide-(--ui-color-design-tinted-na-stroke)',
      '[&>tr]:data-[selectable=true]:hover:bg-elevated/50',
      '[&>tr]:data-[selectable=true]:focus-visible:outline-primary'
    ].join(' '),
    tfoot: 'relative',
    tr: 'data-[selected=true]:bg-elevated/50',
    th: [
      'px-4 py-3.5',
      'text-(length:--ui-font-size-md)/(--ui-font-line-height-md)',
      'text-(--b24ui-typography-label-color)',
      'whitespace-nowrap',
      'text-left rtl:text-right',
      'font-(--ui-font-weight-normal)',
      '[&:has([role=checkbox])]:pe-0',
      'align-middle'
    ].join(' '),
    td: [
      'p-4',
      'text-(length:--ui-font-size-md)/(--ui-font-line-height-md)',
      'text-(--b24ui-typography-label-color)',
      'whitespace-nowrap',
      'font-(--ui-font-weight-normal)',
      '[&:has([role=checkbox])]:pe-0',
      'align-middle'
    ].join(' '),
    separator: [
      'absolute z-[1] left-0',
      'w-full h-px',
      'bg-(--ui-color-design-tinted-na-stroke)'
    ].join(' '),
    empty: [
      'py-6',
      'text-center',
      'text-(length:--ui-font-size-sm)',
      'text-(--b24ui-typography-description-color)'
    ].join(' '),
    loading: 'py-6 text-center'
  },
  variants: {
    pinned: {
      true: {
        th: [
          'sticky',
          'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-base-5)',
          'data-[pinned=left]:left-0',
          'data-[pinned=right]:right-0'
        ].join(' '), // bg-default/75
        td: [
          'sticky',
          'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-base-5)',
          'data-[pinned=left]:left-0',
          'data-[pinned=right]:right-0'
        ].join(' ') // bg-default/75
      }
    },
    sticky: {
      true: {
        thead: [
          'sticky',
          'top-0 inset-x-0',
          'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-base-5)',
          'z-[1] backdrop-blur'
        ].join(' '), // bg-default/75
        tfoot: [
          'sticky',
          'bottom-0 inset-x-0',
          'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-base-5)',
          'z-[1] backdrop-blur'
        ].join(' ') // bg-default/75
      },
      header: {
        thead: [
          'sticky',
          'top-0 inset-x-0',
          'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-base-5)',
          'z-[1] backdrop-blur'
        ].join(' ') // bg-default/75
      },
      footer: {
        tfoot: [
          'sticky',
          'bottom-0 inset-x-0',
          'bg-(--ui-color-base-white-fixed) dark:bg-(--ui-color-base-5)',
          'z-[1] backdrop-blur'
        ].join(' ') // bg-default/75
      }
    },
    loading: {
      true: {
        thead: [
          'after:absolute',
          'after:z-[1]',
          'after:h-px',
          'after:bg-(--b24ui-background)'
        ].join(' ')
      }
    },
    loadingAnimation: {
      'loading': '',
      'carousel': '',
      'carousel-inverse': '',
      'swing': '',
      'elastic': ''
    },
    loadingColor: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' }
    }
  },
  compoundVariants: [
    // region animation ////
    {
      loading: true,
      loadingAnimation: 'loading',
      class: {
        thead: 'after:animate-[progressbar-loading_2s_infinite]'
      }
    },
    {
      loading: true,
      loadingAnimation: 'carousel',
      class: {
        thead: 'after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]'
      }
    },
    {
      loading: true,
      loadingAnimation: 'carousel-inverse',
      class: {
        thead: 'after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]'
      }
    },
    {
      loading: true,
      loadingAnimation: 'swing',
      class: {
        thead: 'after:animate-[swing_2s_ease-in-out_infinite]'
      }
    },
    {
      loading: true,
      loadingAnimation: 'elastic',
      class: {
        thead: 'after:animate-[elastic_2s_ease-in-out_infinite]'
      }
    }
    // endregion ////
  ],
  defaultVariants: {
    loadingColor: 'air-primary',
    loadingAnimation: 'loading'
  }
}
