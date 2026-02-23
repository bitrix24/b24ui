/**
 * PageHeader
 * A responsive page header.
 * ---
 */
export default {
  slots: {
    root: 'relative border-b border-(--ui-color-divider-default) py-8',
    container: '',
    wrapper: 'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4',
    headline: 'mb-2.5 text-(length:--ui-font-size-sm) font-(--ui-font-weight-semi-bold) text-(--ui-color-accent-main-primary) flex items-center gap-1.5',
    title: 'text-(length:--ui-font-size-3xl) sm:text-(length:--ui-font-size-4xl) text-pretty font-(--ui-font-weight-bold) text-(--b24ui-typography-label-color)',
    description: 'text-(length:--ui-font-size-lg) text-pretty text-(--b24ui-typography-description-color)',
    links: 'flex flex-wrap items-center gap-1.5'
  },
  variants: {
    title: {
      true: {
        description: 'mt-4'
      }
    }
  }
}
