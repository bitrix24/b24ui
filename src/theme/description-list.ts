/**
 * DescriptionList
 * For cases where you need to convert data from one row of a table into a separate table to make the page look more complete.
 * ---
 */
export default {
  slots: {
    root: 'w-full shrink-0',
    legend: [
      'font-(--ui-font-weight-semibold)',
      'text-(--b24ui-typography-label-color)'
    ].join(' '),
    text: 'text-(--b24ui-typography-description-color)',
    container: 'grid grid-cols-1 sm:grid-cols-[min(50%,theme(spacing.80))_auto]',
    labelWrapper: [
      'col-start-1 border-t first:border-none sm:border-t',
      'flex flex-nowrap flex-row items-center justify-start gap-1.5',
      'border-(--ui-color-divider-vibrant-default) sm:border-(--ui-color-divider-vibrant-default)',
      'text-(--b24ui-typography-description-color)'
    ].join(' '),
    icon: [
      'shrink-0',
      'size-6',
      'text-(--b24ui-typography-description-color)'
    ].join(' '),
    avatar: 'shrink-0',
    avatarSize: '',
    label: '',
    descriptionWrapper: [
      'sm:border-t sm:[&:nth-child(2)]:border-none',
      'sm:border-(--ui-color-divider-vibrant-default)',
      'text-(--b24ui-typography-label-color)'
    ].join(' '),
    description: '',
    actions: 'flex flex-wrap gap-1.5 shrink-0',
    footer: [
      'border-t',
      'border-(--ui-color-divider-vibrant-default)'
    ].join(' ')
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
    orientation: {
      horizontal: {
        descriptionWrapper: 'w-full flex flex-row items-center justify-between gap-4',
        actions: 'items-center'
      },
      vertical: {
        descriptionWrapper: '',
        actions: 'items-start mt-2.5'
      }
    },
    title: {
      true: {
        description: 'mt-1'
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'md'
  }
}
