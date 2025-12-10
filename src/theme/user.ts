/**
 * User
 * A component to display user details, including their name, bio, and profile picture.
 * ---
 */

export default {
  slots: {
    root: 'relative group/user',
    wrapper: '',
    name: 'font-(--ui-font-weight-medium)',
    description: 'text-(--b24ui-typography-description-color)',
    avatar: 'shrink-0'
  },
  variants: {
    orientation: {
      horizontal: {
        root: 'flex items-center'
      },
      vertical: {
        root: 'flex flex-col'
      }
    },
    to: {
      true: {
        name: [
          'text-(--b24ui-typography-label-color) peer-hover:text-(--ui-color-design-selection-content)',
          'peer-focus-visible:text-(--ui-color-design-selection-content)',
          'transition-colors'
        ].join(' '),
        description: [
          'peer-hover:text-(--ui-color-design-selection-content)',
          'peer-focus-visible:text-(--ui-color-design-selection-content)',
          'transition-colors'
        ].join(' '),
        avatar: 'transform transition-transform duration-200 group-hover/user:scale-115 group-has-focus-visible/user:scale-115'
      },
      false: {
        name: 'text-(--b24ui-typography-label-color)',
        description: ''
      }
    },
    size: {
      '3xs': {
        root: 'gap-1',
        wrapper: 'flex items-center gap-1',
        name: 'text-(length:--ui-font-size-xs)',
        description: 'text-(length:--ui-font-size-xs)'
      },
      '2xs': {
        root: 'gap-1.5',
        wrapper: 'flex items-center gap-1.5',
        name: 'text-(length:--ui-font-size-xs)',
        description: 'text-(length:--ui-font-size-xs)'
      },
      'xs': {
        root: 'gap-1.5',
        wrapper: 'flex items-center gap-1.5',
        name: 'text-(length:--ui-font-size-xs)',
        description: 'text-(length:--ui-font-size-xs)'
      },
      'sm': {
        root: 'gap-2',
        name: 'text-(length:--ui-font-size-xs)',
        description: 'text-(length:--ui-font-size-xs)'
      },
      'md': {
        root: 'gap-2',
        name: 'text-(length:--ui-font-size-sm)',
        description: 'text-(length:--ui-font-size-xs)'
      },
      'lg': {
        root: 'gap-2.5',
        name: 'text-(length:--ui-font-size-sm)',
        description: 'text-(length:--ui-font-size-sm)'
      },
      'xl': {
        root: 'gap-2.5',
        name: 'text-(length:--ui-font-size-md)',
        description: 'text-(length:--ui-font-size-sm)'
      },
      '2xl': {
        root: 'gap-3',
        name: 'text-(length:--ui-font-size-md)',
        description: 'text-(length:--ui-font-size-md)'
      },
      '3xl': {
        root: 'gap-3',
        name: 'text-(length:--ui-font-size-lg)',
        description: 'text-(length:--ui-font-size-md)'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
