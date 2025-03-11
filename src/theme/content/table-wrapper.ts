/**
 * Content/TableWrapper
 * Wrapper for displaying a html table
 * ---
 * @link https://v5.daisyui.com/components/table/
 * @see bitrix/js/ui/advice/src
 */

const variantTable = '[&>table]'
// const variantHead = '[&>table>thead]'
const variantHeadTr = '[&>table>thead>tr]'
// const variantBody = '[&>table>tbody]'
const variantBodyTr = '[&>table>tbody>tr]'
const variantFoot = '[&>table>tfoot]'
const variantFootTr = '[&>table>tfoot>tr]'

/*
const variantsHeadBodyFoot = [
  variantHead,
  variantBody,
  variantFoot
]
*/
const variantsTr = [
  variantHeadTr,
  variantBodyTr,
  variantFootTr
]

const variantsTdTh = [
  '[&>table>thead>tr>td]',
  '[&>table>thead>tr>th]',
  '[&>table>tbody>tr>td]',
  '[&>table>tbody>tr>th]',
  '[&>table>tfoot>tr>td]',
  '[&>table>tfoot>tr>th]'
]

export default {
  slots: {
    base: [
      `font-b24-primary ${variantTable}:text-md ${variantTable}:relative ${variantTable}:w-full ${variantTable}:text-left ${variantTable}:rtl:text-right`,
      `${variantTable}:text-base-900 dark:${variantTable}:text-base-200`,
      ...(variantsTdTh.map(variant => `${variant}:align-middle`)),
      ...(variantsTdTh
        .filter(variant => !variant.includes('tbody>tr>td'))
        .map(variant => `${variant}:whitespace-nowrap  ${variant}:text-md ${variant}:font-normal`)),
      `${variantHeadTr}:border-base-300 dark:${variantHeadTr}:border-base-800`,
      `${variantBodyTr}:border-base-master/10 dark:${variantBodyTr}:border-base-100/20`,
      `${variantFoot}:border-base-300 dark:${variantFoot}:border-base-800`,
      `${variantHeadTr}:border-b ${variantBodyTr.replace('>tr]', '>tr:not(:last-child)]')}:border-b`,
      `${variantFoot}:border-t`
    ].join(' ')
  },
  variants: {
    size: {
      xs: [
        ...(variantsTdTh.map(variant => `${variant}:text-xs ${variant}:px-2 ${variant}:py-1`))
      ].join(' '),
      sm: [
        ...(variantsTdTh.map(variant => `${variant}:text-sm ${variant}:px-3 ${variant}:py-2`))
      ].join(' '),
      md: [
        ...(variantsTdTh.map(variant => `${variant}:text-md ${variant}:px-4 ${variant}:py-3.5`))
      ].join(' '),
      lg: [
        ...(variantsTdTh.map(variant => `${variant}:text-lg ${variant}:px-5 ${variant}:py-4`))
      ].join(' ')
    },
    rounded: {
      true: 'rounded-md',
      false: ''
    },
    zebra: {
      true: [
        ...(variantsTr
          .filter(variant => variant === variantBodyTr)
          .map(variant => `${variant}:even:bg-base-30 ${variant}:even:[&>td]:bg-base-30 ${variant}:even:[&>th]:bg-base-30 dark:${variant}:even:bg-base-dark dark:${variant}:even:[&>td]:bg-base-dark dark:${variant}:even:[&>th]:bg-base-dark`))
      ].join(' ')
    },
    pinRows: {
      true: [
        ...(variantsTr
          .filter(variant => variant !== variantBodyTr)
          .map(variant => `${variant}:sticky ${variant}:${variant === variantHeadTr ? 'top-0' : 'bottom-0'} ${variant}:z-1 ${variant}:bg-white dark:${variant}:bg-base-dark ${variant}:${variant === variantHeadTr ? 'shadow-bottom-sm' : 'shadow-top-sm'}`))
      ].join(' ')
    },
    pinCols: {
      true: [
        ...(variantsTr
          .map((row) => {
            const variant = row.replace('>tr]', '>tr>th]')
            return `${variant}:sticky ${variant}:right-0 ${variant}:left-0 ${variant}:bg-base-20 dark:${variant}:bg-base-dark`
          }))
      ].join(' ')
    },
    rowHover: {
      true: `${variantBodyTr}:hover:bg-base-40 ${variantBodyTr}:hover:[&>td]:bg-base-40 ${variantBodyTr}:hover:[&>th]:bg-base-40 dark:${variantBodyTr}:hover:bg-base-900 dark:${variantBodyTr}:hover:[&>td]:bg-base-900 dark:${variantBodyTr}:hover:[&>th]:bg-base-900`
    },
    bordered: {
      true: 'border border-base-master/10 dark:border-base-800'
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
