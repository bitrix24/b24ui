import type { ModuleOptions } from '../module'

/**
 * @todo fix color && size
 * @param options
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: Required<ModuleOptions>) => ({
  slots: {
    root: 'relative inline-flex items-center justify-center shrink-0',
    base: 'rounded-full ring ring-white flex items-center justify-center text-white font-medium font-b24-secondary whitespace-nowrap'
  },
  variants: {
    color: {
      default: 'text-base-800 bg-base-200',
      danger: 'text-red-800 bg-red-400',
      success: 'text-green-800 bg-green-400',
      warning: 'text-base-800 bg-orange-600',
      primary: 'text-blue-700 bg-blue-400',
      secondary: 'text-base-800 bg-accent-aqua',
      ai: 'text-accent-lavender bg-[#e7d8fa]',
      link: 'text-base-800 bg-[#b0b4bb]'
    },
    size: {
      sm: 'h-[7px] min-w-[7px] text-[6px]', // --ui-label-height: 18px; << md2 18px
      md: 'h-[8px] min-w-[8px] text-[7px]', // --ui-label-height: var(--ui-size-lg) --ui-size-lg: 20px;
      lg: 'h-[9px] min-w-[9px] text-[8px]' // --ui-label-height: 25px; <<~ xl2 26 px
    },
    position: {
      'top-right': 'top-0 right-0',
      'bottom-right': 'bottom-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-left': 'bottom-0 left-0'
    },
    inset: {
      false: ''
    },
    standalone: {
      false: 'absolute'
    }
  },
  compoundVariants: [
    {
      position: 'top-right',
      inset: false,
      class: '-translate-y-1/2 translate-x-1/2 transform'
    },
    {
      position: 'bottom-right',
      inset: false,
      class: 'translate-y-1/2 translate-x-1/2 transform'
    },
    {
      position: 'top-left',
      inset: false,
      class: '-translate-y-1/2 -translate-x-1/2 transform'
    },
    {
      position: 'bottom-left',
      inset: false,
      class: 'translate-y-1/2 -translate-x-1/2 transform'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'success',
    position: 'top-right'
  }
})
