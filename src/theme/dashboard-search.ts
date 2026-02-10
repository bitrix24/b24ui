/**
 * DashboardSearch
 * A ready-to-use Command Palette component for your dashboard.
 * ---
 */

export default {
  slots: {
    modal: 'p-0 pt-0 pb-[10px]',
    input: ''
  },
  variants: {
    fullscreen: {
      false: {
        modal: 'sm:max-w-[768px] h-full sm:h-[436px]'
      }
    },
    size: {
      xss: {
        input: '[&>input]:text-(length:--ui-font-size-4xs)/[normal]'
      },
      xs: {
        input: '[&>input]:text-(length:--ui-font-size-xs)/[normal]'
      },
      sm: {
        input: '[&>input]:text-(length:--ui-font-size-sm)/[normal]'
      },
      md: {
        input: '[&>input]:text-(length:--ui-font-size-md)/[normal]'
      },
      lg: {
        input: '[&>input]:text-(length:--ui-font-size-lg)/[normal]'
      },
      xl: {
        input: '[&>input]:text-(length:--ui-font-size-2xl)/[normal]'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
}
