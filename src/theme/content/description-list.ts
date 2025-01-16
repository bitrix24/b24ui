/**
 * DescriptionList
 * For cases where you need to convert data from one row of a table into a separate table to make the page look more complete.
 * ---
 */
export default {
  slots: {
    root: 'w-full shrink-0', // ????
    legend: 'font-semibold text-black dark:text-base-150',
    text: 'text-base-500 dark:text-base-400',
    container: 'grid grid-cols-1 sm:grid-cols-[min(50%,theme(spacing.80))_auto]',
    labelWrapper: [
      'col-start-1 border-t border-base-950/5 text-base-500 first:border-none sm:border-t sm:border-base-950/5 dark:border-white/5 dark:text-base-400 sm:dark:border-white/5',
      'flex flex-nowrap flex-row items-center justify-start gap-1.5'
    ].join(' '),
    icon: 'shrink-0 size-6 text-base-500 dark:text-base-400',
    avatar: 'shrink-0',
    avatarSize: '',
    label: '',
    descriptionWrapper: 'text-base-950 sm:border-t sm:border-base-950/5 dark:text-white dark:sm:border-white/5 sm:[&:nth-child(2)]:border-none',
    description: 'text-base-900 dark:text-base-150',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    footer: 'border-t border-base-950/5 dark:border-white/5'
  },
  variants: {
    size: {
      sm: {
        legend: 'text-md',
        text: 'mt-1 max-w-2/3 text-sm',
        container: 'mt-2.5 text-md',
        labelWrapper: 'pt-3 sm:py-3',
        avatarSize: 'xs',
        label: '',
        descriptionWrapper: 'pb-3 pt-1 sm:py-3',
        description: '',
        footer: 'mt-2 p-2'
      },
      md: {
        legend: 'text-xl',
        text: 'mt-2 max-w-2/3 text-lg leading-5',
        container: 'mt-3 text-lg',
        labelWrapper: 'pt-3 sm:py-3',
        avatarSize: 'xs',
        label: '',
        descriptionWrapper: 'pb-3 pt-1 sm:py-3',
        description: '',
        footer: 'mt-4 p-4'
      }
    },
    multiline: {
      true: {
        descriptionWrapper: '',
        actions: 'items-start mt-2.5'
      },
      false: {
        descriptionWrapper: 'w-full flex flex-row items-center justify-between gap-4',
        actions: 'items-center'
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'md'
  }
}
