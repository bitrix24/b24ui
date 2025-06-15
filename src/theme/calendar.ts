/**
 * Calendar
 * A calendar component for selecting single dates, multiple dates or date ranges.
 * ---
 * @todo compare with b24.ui.calendar
 */

export default {
  slots: {
    root: 'font-b24-system w-full',
    header: 'flex items-center justify-between',
    body: 'flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0',
    heading: 'text-center font-semibold truncate mx-auto',
    grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
    gridRow: 'grid grid-cols-7 place-items-center',
    gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
    gridBody: 'grid',
    headCell: 'font-normal text-base-500 dark:text-base-500',
    cell: 'relative text-center cursor-pointer aria-disabled:cursor-not-allowed',
    cellTrigger: [
      'm-0.5 relative',
      'flex items-center justify-center',
      'rounded-full whitespace-nowrap',
      'focus-visible:ring-2 focus:outline-none',
      'data-disabled:text-base-500 dark:data-disabled:text-base-600',
      'data-unavailable:text-base-500 dark:data-unavailable:text-base-600',
      'data-outside-view:text-base-500 dark:data-outside-view:text-base-600',
      'data-[selected]:text-white dark:data-[selected]:text-base-100',
      'data-unavailable:line-through',
      'data-unavailable:pointer-events-none',
      'data-today:font-semibold',
      'transition'
    ].join(' ')
  },
  variants: {
    color: {
      default: {
        cellTrigger: [
          'focus-visible:ring-base-300 data-[selected]:bg-base-500 data-today:not-data-[selected]:text-blue-500 data-[highlighted]:bg-base-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-base-500/20',
          'dark:focus-visible:ring-base-800 dark:data-[selected]:bg-base-800 dark:data-today:not-data-[selected]:text-blue-600 dark:data-[highlighted]:bg-base-800/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-base-800/20'
        ].join(' ')
      },
      danger: {
        cellTrigger: [
          'focus-visible:ring-red-300 data-[selected]:bg-red-500 data-today:not-data-[selected]:text-red-500 data-[highlighted]:bg-red-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-red-500/20',
          'dark:focus-visible:ring-red-800 dark:data-[selected]:bg-red-500 dark:data-today:not-data-[selected]:text-red-600 dark:data-[highlighted]:bg-red-500/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-red-500/20'
        ].join(' ')
      },
      success: {
        cellTrigger: [
          'focus-visible:ring-green-300 data-[selected]:bg-green-500 data-today:not-data-[selected]:text-green-500 data-[highlighted]:bg-green-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-green-500/20',
          'dark:focus-visible:ring-green-800 dark:data-[selected]:bg-green-500 dark:data-today:not-data-[selected]:text-green-600 dark:data-[highlighted]:bg-green-500/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-green-500/20'
        ].join(' ')
      },
      warning: {
        cellTrigger: [
          'focus-visible:ring-orange-300 data-[selected]:bg-orange-500 data-today:not-data-[selected]:text-orange-500 data-[highlighted]:bg-orange-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-orange-500/20',
          'dark:focus-visible:ring-orange-800 dark:data-[selected]:bg-orange-500 dark:data-today:not-data-[selected]:text-orange-600 dark:data-[highlighted]:bg-orange-500/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-orange-500/20'
        ].join(' ')
      },
      primary: {
        cellTrigger: [
          'focus-visible:ring-blue-300 data-[selected]:bg-blue-500 data-today:not-data-[selected]:text-blue-500 data-[highlighted]:bg-blue-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-blue-500/20',
          'dark:focus-visible:ring-blue-800 dark:data-[selected]:bg-blue-500 dark:data-today:not-data-[selected]:text-blue-600 dark:data-[highlighted]:bg-blue-500/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-blue-500/20'
        ].join(' ')
      },
      secondary: {
        cellTrigger: [
          'focus-visible:ring-cyan-300 data-[selected]:bg-cyan-500 data-today:not-data-[selected]:text-cyan-500 data-[highlighted]:bg-cyan-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-cyan-500/20',
          'dark:focus-visible:ring-cyan-800 dark:data-[selected]:bg-cyan-500 dark:data-today:not-data-[selected]:text-cyan-600 dark:data-[highlighted]:bg-cyan-500/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-cyan-500/20'
        ].join(' ')
      },
      collab: {
        cellTrigger: [
          'focus-visible:ring-collab-300 data-[selected]:bg-collab-500 data-today:not-data-[selected]:text-collab-500 data-[highlighted]:bg-collab-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-collab-500/20',
          'dark:focus-visible:ring-collab-800 dark:data-[selected]:bg-collab-500 dark:data-today:not-data-[selected]:text-collab-600 dark:data-[highlighted]:bg-collab-500/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-collab-500/20'
        ].join(' ')
      },
      ai: {
        cellTrigger: [
          'focus-visible:ring-ai-300 data-[selected]:bg-ai-500 data-today:not-data-[selected]:text-ai-500 data-[highlighted]:bg-ai-500/20 hover:not-data-[disabled]:not-data-[selected]:bg-ai-500/20',
          'dark:focus-visible:ring-ai-800 dark:data-[selected]:bg-ai-500 dark:data-today:not-data-[selected]:text-ai-600 dark:data-[highlighted]:bg-ai-500/20 dark:hover:not-data-[disabled]:not-data-[selected]:bg-ai-500/20'
        ].join(' ')
      }
    },
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
    color: 'primary'
  }
}
