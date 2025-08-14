/**
 * Calendar
 * A calendar component for selecting single dates, multiple dates or date ranges.
 * ---
 * @todo compare with b24.ui.calendar
 */

export default {
  slots: {
    root: [
      'font-[family-name:var(--ui-font-family-primary)]',
      'w-full'
    ].join(' '),
    header: 'flex items-center justify-between',
    body: 'flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0',
    heading: [
      'mx-auto',
      'text-center',
      'font-(--ui-font-weight-semibold)',
      'truncate'
    ].join(' '),
    grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
    gridRow: 'grid grid-cols-7 place-items-center',
    gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
    gridBody: 'grid',
    headCell: [
      'font-(--ui-font-weight-normal)',
      'text-(--b24ui-typography-label-color)' // text-base-500
    ].join(' '),
    cell: 'relative text-center cursor-pointer aria-disabled:cursor-not-allowed',
    cellTrigger: [
      'm-0.5 relative',
      'flex items-center justify-center',
      'rounded-full whitespace-nowrap',
      'focus-visible:ring-2 focus:outline-none',
      'data-disabled:text-(--b24ui-typography-label-color)',
      'data-unavailable:text-(--b24ui-typography-label-color)',
      'data-outside-view:text-(--b24ui-typography-label-color)',
      'data-[selected]:text-(--b24ui-color)', // data-[selected]:text-white
      'focus-visible:ring-(--b24ui-background-hover) data-[selected]:bg-(--b24ui-background) data-today:not-data-[selected]:text-(--b24ui-background) data-[highlighted]:bg-(--b24ui-background) hover:not-data-[disabled]:not-data-[selected]:bg-(--b24ui-background) hover:not-data-[disabled]:not-data-[selected]:text-(--b24ui-color)',
      'data-unavailable:line-through',
      'data-unavailable:pointer-events-none',
      'data-today:font-(--ui-font-weight-semibold)',
      'transition'
    ].join(' ')
  },
  variants: {
    color: {
      'air-primary': { root: 'style-filled' },
      'air-primary-success': { root: 'style-filled-success' },
      'air-primary-alert': { root: 'style-filled-alert' },
      'air-primary-copilot': { root: 'style-filled-copilot' },
      'air-primary-warning': { root: 'style-filled-warning' },
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
    // color: {
    //   default: {
    //     cellTrigger: [
    //       'focus-visible:ring-base-300 data-[selected]:bg-base-500 data-today:not-data-[selected]:text-blue-500 data-[highlighted]:bg-base-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-base-500/20',
    //       'dark:focus-visible:ring-base-800 dark:data-[selected]:bg-base-800 dark:data-today:not-data-[selected]:text-blue-600 dark:data-[highlighted]:bg-base-800/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-base-800/20'
    //     ].join(' ')
    //   },
    // },
    size: {
      xs: {
        heading: 'text-md',
        cell: 'text-sm',
        headCell: 'text-[10px]',
        cellTrigger: 'size-7',
        body: 'space-y-2 pt-2'
      },
      sm: {
        heading: 'text-md',
        headCell: 'text-sm',
        cell: 'text-sm',
        cellTrigger: 'size-7'
      },
      md: {
        heading: 'text-lg',
        headCell: 'text-md',
        cell: 'text-md',
        cellTrigger: 'size-8'
      },
      lg: {
        heading: 'text-2xl',
        headCell: 'text-lg',
        cell: 'text-lg',
        cellTrigger: 'size-9 text-lg'
      }
    }
  },
  defaultVariants: {
    size: 'md',
    color: 'air-primary'
  }
}
