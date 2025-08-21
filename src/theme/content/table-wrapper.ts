/**
 * Content/TableWrapper
 * Wrapper for displaying a html table
 * ---
 * @link https://v5.daisyui.com/components/table/
 * @see bitrix/js/ui/advice/src
 */

export default {
  slots: {
    base: [
      'font-[family-name:var(--ui-font-family-primary)] [&>table]:text-(length:--ui-font-size-md)/(--ui-font-line-height-md) [&>table]:relative [&>table]:w-full [&>table]:text-left [&>table]:rtl:text-right',
      '[&>table]:text-(--b24ui-typography-label-color)',
      //
      '[&>table>thead>tr>td]:align-middle',
      '[&>table>thead>tr>th]:align-middle',
      '[&>table>tbody>tr>td]:align-middle',
      '[&>table>tbody>tr>th]:align-middle',
      '[&>table>tfoot>tr>td]:align-middle',
      '[&>table>tfoot>tr>th]:align-middle',
      //
      '[&>table>thead>tr>td]:whitespace-nowrap [&>table>thead>tr>td]:text-(length:--ui-font-size-md) [&>table>thead>tr>td]:font-(--ui-font-weight-normal)',
      '[&>table>thead>tr>th]:whitespace-nowrap [&>table>thead>tr>th]:text-(length:--ui-font-size-md) [&>table>thead>tr>th]:font-(--ui-font-weight-normal)',
      // '[&>table>tbody>tr>td]:whitespace-nowrap [&>table>tbody>tr>td]:text-(length:--ui-font-size-md) [&>table>tbody>tr>td]:font-(--ui-font-weight-normal)',
      '[&>table>tbody>tr>th]:whitespace-nowrap [&>table>tbody>tr>th]:text-(length:--ui-font-size-md) [&>table>tbody>tr>th]:font-(--ui-font-weight-normal)',
      '[&>table>tfoot>tr>td]:whitespace-nowrap [&>table>tfoot>tr>td]:text-(length:--ui-font-size-md) [&>table>tfoot>tr>td]:font-(--ui-font-weight-normal)',
      '[&>table>tfoot>tr>th]:whitespace-nowrap [&>table>tfoot>tr>th]:text-(length:--ui-font-size-md) [&>table>tfoot>tr>th]:font-(--ui-font-weight-normal)',
      //
      '[&>table>thead>tr]:border-(--ui-color-divider-vibrant-accent-more)',
      '[&>table>tbody>tr]:border-(--ui-color-divider-vibrant-default)',
      '[&>table>tfoot]:border-(--ui-color-divider-vibrant-default)',
      `[&>table>thead>tr]:border-b [&>table>tbody>tr:not(:last-child)]:border-b`,
      '[&>table>tfoot]:border-t'
    ].join(' ')
  },
  variants: {
    size: {
      xs: [
        '[&>table>thead>tr>td]:text-(length:--ui-font-size-xs)/(--ui-font-line-height-2xs) [&>table>thead>tr>td]:px-2 [&>table>thead>tr>td]:py-1',
        '[&>table>thead>tr>th]:text-(length:--ui-font-size-xs)/(--ui-font-line-height-2xs) [&>table>thead>tr>th]:px-2 [&>table>thead>tr>th]:py-1',
        '[&>table>tbody>tr>td]:text-(length:--ui-font-size-xs)/(--ui-font-line-height-2xs) [&>table>tbody>tr>td]:px-2 [&>table>tbody>tr>td]:py-1',
        '[&>table>tbody>tr>th]:text-(length:--ui-font-size-xs)/(--ui-font-line-height-2xs) [&>table>tbody>tr>th]:px-2 [&>table>tbody>tr>th]:py-1',
        '[&>table>tfoot>tr>td]:text-(length:--ui-font-size-xs)/(--ui-font-line-height-2xs) [&>table>tfoot>tr>th]:px-2 [&>table>tfoot>tr>th]:py-1',
        '[&>table>tfoot>tr>th]:text-(length:--ui-font-size-xs)/(--ui-font-line-height-2xs) [&>table>tfoot>tr>th]:px-2 [&>table>tfoot>tr>th]:py-1'
      ].join(' '),
      sm: [
        '[&>table>thead>tr>td]:text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm) [&>table>thead>tr>td]:px-3 [&>table>thead>tr>td]:py-2',
        '[&>table>thead>tr>th]:text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm) [&>table>thead>tr>th]:px-3 [&>table>thead>tr>th]:py-2',
        '[&>table>tbody>tr>td]:text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm) [&>table>tbody>tr>td]:px-3 [&>table>tbody>tr>td]:py-2',
        '[&>table>tbody>tr>th]:text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm) [&>table>tbody>tr>th]:px-3 [&>table>tbody>tr>th]:py-2',
        '[&>table>tfoot>tr>td]:text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm) [&>table>tfoot>tr>th]:px-3 [&>table>tfoot>tr>th]:py-2',
        '[&>table>tfoot>tr>th]:text-(length:--ui-font-size-sm)/(--ui-font-line-height-sm) [&>table>tfoot>tr>th]:px-3 [&>table>tfoot>tr>th]:py-2'
      ].join(' '),
      md: [
        '[&>table>thead>tr>td]:text-(length:--ui-font-size-md)/(--ui-font-line-height-md) [&>table>thead>tr>td]:px-4 [&>table>thead>tr>td]:py-3.5',
        '[&>table>thead>tr>th]:text-(length:--ui-font-size-md)/(--ui-font-line-height-md) [&>table>thead>tr>th]:px-4 [&>table>thead>tr>th]:py-3.5',
        '[&>table>tbody>tr>td]:text-(length:--ui-font-size-md)/(--ui-font-line-height-md) [&>table>tbody>tr>td]:px-4 [&>table>tbody>tr>td]:py-3.5',
        '[&>table>tbody>tr>th]:text-(length:--ui-font-size-md)/(--ui-font-line-height-md) [&>table>tbody>tr>th]:px-4 [&>table>tbody>tr>th]:py-3.5',
        '[&>table>tfoot>tr>td]:text-(length:--ui-font-size-md)/(--ui-font-line-height-md) [&>table>tfoot>tr>th]:px-4 [&>table>tfoot>tr>th]:py-3.5',
        '[&>table>tfoot>tr>th]:text-(length:--ui-font-size-md)/(--ui-font-line-height-md) [&>table>tfoot>tr>th]:px-4 [&>table>tfoot>tr>th]:py-3.5'
      ].join(' '),
      lg: [
        '[&>table>thead>tr>td]:text-(length:--ui-font-size-lg)/(--ui-font-line-height-lg) [&>table>thead>tr>td]:px-5 [&>table>thead>tr>td]:py-4',
        '[&>table>thead>tr>th]:text-(length:--ui-font-size-lg)/(--ui-font-line-height-lg) [&>table>thead>tr>th]:px-5 [&>table>thead>tr>th]:py-4',
        '[&>table>tbody>tr>td]:text-(length:--ui-font-size-lg)/(--ui-font-line-height-lg) [&>table>tbody>tr>td]:px-5 [&>table>tbody>tr>td]:py-4',
        '[&>table>tbody>tr>th]:text-(length:--ui-font-size-lg)/(--ui-font-line-height-lg) [&>table>tbody>tr>th]:px-5 [&>table>tbody>tr>th]:py-4',
        '[&>table>tfoot>tr>td]:text-(length:--ui-font-size-lg)/(--ui-font-line-height-lg) [&>table>tfoot>tr>th]:px-5 [&>table>tfoot>tr>th]:py-4',
        '[&>table>tfoot>tr>th]:text-(length:--ui-font-size-lg)/(--ui-font-line-height-lg) [&>table>tfoot>tr>th]:px-5 [&>table>tfoot>tr>th]:py-4'
      ].join(' ')
    },
    rounded: {
      true: 'rounded-(--ui-border-radius-md)',
      false: ''
    },
    zebra: {
      true: [
        '[&>table>tbody>tr]:even:bg-(--ui-color-base-8) [&>table>tbody>tr]:even:[&>td]:bg-(--ui-color-base-8) [&>table>tbody>tr]:even:[&>th]:bg-(--ui-color-base-8)',
        'light:[&>table>tbody>tr]:even:bg-(--ui-color-base-6) light:[&>table>tbody>tr]:even:[&>td]:bg-(--ui-color-base-6) light:[&>table>tbody>tr]:even:[&>th]:bg-(--ui-color-base-6)'
      ].join(' ')
    },
    pinRows: {
      true: [
        '[&>table>thead>tr]:sticky [&>table>thead>tr]:top-0      [&>table>thead>tr]:z-1 dark:[&>table>thead>tr]:bg-(--ui-color-base-5) [&>table>thead>tr]:bg-(--ui-color-base-white-fixed) [&>table>thead>tr]:text-(--ui-color-g-content-grey-1) [&>table>thead>tr]:shadow-bottom-sm',
        // '[&>table>tbody>tr]:sticky [&>table>tbody>tr]:bottom-0 [&>table>tbody>tr]:z-1 dark:[&>table>tbody>tr]:bg-(--ui-color-base-5) [&>table>tbody>tr]:bg-(--ui-color-base-white-fixed) [&>table>tbody>tr]:text-(--ui-color-g-content-grey-1) [&>table>tbody>tr]:shadow-top-sm',
        '[&>table>tfoot>tr]:sticky [&>table>tfoot>tr]:bottom-0   [&>table>tfoot>tr]:z-1 dark:[&>table>tfoot>tr]:bg-(--ui-color-base-5) [&>table>tfoot>tr]:bg-(--ui-color-base-white-fixed) [&>table>tfoot>tr]:text-(--ui-color-g-content-grey-1) [&>table>tfoot>tr]:shadow-top-sm'
      ].join(' ')
    },
    pinCols: {
      true: [
        '[&>table>thead>tr>th]:sticky [&>table>thead>tr>th]:right-0 [&>table>thead>tr>th]:left-0 dark:[&>table>thead>tr>th]:bg-(--ui-color-base-5) [&>table>thead>tr>th]:bg-(--ui-color-base-white-fixed) [&>table>thead>tr>th]:text-(--ui-color-g-content-grey-1)',
        '[&>table>tbody>tr>th]:sticky [&>table>tbody>tr>th]:right-0 [&>table>tbody>tr>th]:left-0 dark:[&>table>tbody>tr>th]:bg-(--ui-color-base-5) [&>table>tbody>tr>th]:bg-(--ui-color-base-white-fixed) [&>table>tbody>tr>th]:text-(--ui-color-g-content-grey-1)',
        '[&>table>tfoot>tr>th]:sticky [&>table>tfoot>tr>th]:right-0 [&>table>tfoot>tr>th]:left-0 dark:[&>table>tfoot>tr>th]:bg-(--ui-color-base-5) [&>table>tfoot>tr>th]:bg-(--ui-color-base-white-fixed) [&>table>tfoot>tr>th]:text-(--ui-color-g-content-grey-1)'
      ].join(' ')
    },
    rowHover: {
      true: [
        '[&>table>tbody>tr]:hover:bg-(--ui-color-base-8) [&>table>tbody>tr]:hover:[&>td]:bg-(--ui-color-base-8) [&>table>tbody>tr]:hover:[&>th]:bg-(--ui-color-base-8)',
        'light:[&>table>tbody>tr]:hover:bg-(--ui-color-base-6) light:[&>table>tbody>tr]:hover:[&>td]:bg-(--ui-color-base-6) light:[&>table>tbody>tr]:hover:[&>th]:bg-(--ui-color-base-6)'
      ].join(' ')
    },
    bordered: {
      true: 'border border-(--ui-color-divider-vibrant-default)'
    },
    scrollbarThin: {
      true: 'scrollbar-thin'
    }
  },
  defaultVariants: {
    size: 'md',
    scrollbarThin: true
  }
}
