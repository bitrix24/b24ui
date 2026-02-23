/**
 * PageFeature
 *  A feature showcase component to present your app's main functionalities.
 * ---
 */
export default {
  slots: {
    root: 'relative rounded-sm',
    wrapper: '',
    leading: 'inline-flex items-center justify-center',
    leadingIcon: 'size-5 shrink-0 text-(--ui-color-accent-main-primary)',
    title: 'text-(length:--ui-font-size-md) text-pretty font-(--ui-font-weight-semi-bold) text-(--b24ui-typography-legend-color)',
    description: 'text-(length:--ui-font-size-sm) text-pretty text-(--b24ui-typography-description-color)'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex items-start gap-2.5',
        leading: 'p-0.5'
      },
      vertical: {
        leading: 'mb-2.5'
      }
    },
    to: {
      true: {
        root: 'has-focus-visible:ring-2 has-focus-visible:ring-(--ui-color-accent-soft-element-blue) transition'
      }
    },
    title: {
      true: {
        description: 'mt-1'
      }
    }
  }
}
