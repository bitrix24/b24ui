/**
 * Calendar
 * A calendar component for selecting single dates, multiple dates or date ranges.
 * ---
 * @todo compare with b24.ui.calendar
 * @todo `mx-auto` - replace `flex-1 min-w-0`
 */

const daySizes = {
  xs: 'size-7',
  sm: 'size-7',
  md: 'size-8',
  lg: 'size-9 text-(length:--ui-font-size-lg)'
}

const pickerSizes = {
  xs: 'h-7 px-2',
  sm: 'h-7 px-2',
  md: 'h-8 px-3',
  lg: 'h-9 px-4 text-md'
}

export default {
  slots: {
    root: [
      'font-[family-name:var(--ui-font-family-primary)]'
    ].join(' '),
    header: 'flex items-center justify-between',
    body: 'flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0',
    heading: [
      'flex-1 min-w-0',
      'text-center'
    ].join(' '),
    headingLabel: 'text-legend font-(--ui-font-weight-semi-bold) block truncate p-1.5',
    grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
    gridRow: 'grid',
    gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
    gridBody: 'grid',
    headCell: [
      'font-(--ui-font-weight-normal)',
      'text-(--ui-color-design-plain-na-content-secondary)' // text-base-500
    ].join(' '),
    headCellWeek: 'text-(--ui-color-design-plain-na-content-secondary)',
    cell: 'relative text-center cursor-pointer aria-disabled:cursor-not-allowed',
    cellTrigger: [
      'm-0.5 relative',
      'flex items-center justify-center',
      'whitespace-nowrap',
      'focus-visible:ring-2 focus:outline-none',
      'text-label',
      'data-[disabled]:text-(--ui-color-design-plain-na-content-secondary) data-disabled:opacity-30',
      'data-unavailable:text-(--ui-color-design-plain-na-content-secondary)',
      'data-selected:text-(--b24ui-color)',
      'focus-visible:ring-(--b24ui-background-hover)',
      'data-selected:focus-visible:ring-(--b24ui-background-hover)',
      'data-selected:bg-(--b24ui-background)',
      'data-today:not-data-selected:text-(--b24ui-background)',
      'data-highlighted:bg-(--b24ui-background)',
      'data-highlighted:text-(--b24ui-color)',
      'hover:not-data-[disabled]:not-data-[selected]:bg-(--b24ui-background)',
      'hover:not-data-[disabled]:not-data-[selected]:text-(--b24ui-color)',
      'data-unavailable:line-through',
      'data-unavailable:pointer-events-none',
      'data-today:font-(--ui-font-weight-semi-bold)',
      'transition'
    ].join(' '),
    cellWeek: [
      'relative',
      'text-center',
      'text-(--ui-color-design-plain-na-content-secondary)'
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
    size: {
      xs: {
        headingLabel: 'text-(length:--ui-font-size-md)',
        cell: 'text-(length:--ui-font-size-sm)',
        cellWeek: 'text-(length:--ui-font-size-4xs)',
        headCell: 'text-(length:--ui-font-size-4xs)',
        headCellWeek: 'text-(length:--ui-font-size-4xs)',
        body: 'space-y-2 pt-2'
      },
      sm: {
        headingLabel: 'text-(length:--ui-font-size-md)',
        headCell: 'text-(length:--ui-font-size-3xs)',
        headCellWeek: 'text-(length:--ui-font-size-3xs)',
        cellWeek: 'text-(length:--ui-font-size-3xs)',
        cell: 'text-(length:--ui-font-size-sm)'
      },
      md: {
        headingLabel: 'text-(length:--ui-font-size-lg)',
        headCell: 'text-(length:--ui-font-size-xs)',
        headCellWeek: 'text-(length:--ui-font-size-xs)',
        cellWeek: 'text-(length:--ui-font-size-xs)',
        cell: 'text-(length:--ui-font-size-md)'
      },
      lg: {
        headingLabel: 'text-(length:--ui-font-size-2xl)',
        headCell: 'text-(length:--ui-font-size-xs)',
        headCellWeek: 'text-(length:--ui-font-size-xs)',
        cellWeek: 'text-(length:--ui-font-size-xs)',
        cell: 'text-(length:--ui-font-size-lg)'
      }
    },
    view: {
      day: {
        gridRow: 'grid-cols-7 place-items-center',
        cellTrigger: 'rounded-full data-outside-view:text-(--ui-color-design-plain-na-content-secondary)'
      },
      month: {
        gridRow: 'grid-cols-4',
        cellTrigger: 'rounded-md'
      },
      year: {
        gridRow: 'grid-cols-4',
        cellTrigger: 'rounded-md'
      }
    },
    weekNumbers: {
      true: '' // {
      // gridRow: 'grid-cols-8',
      // gridWeekDaysRow: 'grid-cols-8 [&>*:first-child]:col-start-2'
      // }
    }
  },
  compoundVariants: [
    ...Object.entries(daySizes).map(([size, cellTrigger]) => ({
      size,
      view: 'day',
      class: { cellTrigger }
    })),
    ...Object.entries(pickerSizes).map(([size, cellTrigger]) => ({
      size,
      view: ['month', 'year'],
      class: { cellTrigger }
    })),
    {
      view: 'day',
      weekNumbers: true,
      class: {
        gridRow: 'grid-cols-8',
        gridWeekDaysRow: 'grid-cols-8 [&>*:first-child]:col-start-2'
      }
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'air-primary',
    view: 'day'
  }
}
