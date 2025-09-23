/**
 * ColorPicker
 * ---
 * @todo add demo
 * @todo add docs
 */

export default {
  slots: {
    root: 'data-[disabled]:opacity-30',
    picker: 'flex gap-4',
    selector: 'rounded-(--ui-border-radius-md) touch-none',
    selectorBackground: 'w-full h-full relative rounded-(--ui-border-radius-md)',
    selectorThumb: '-translate-y-1/2 -translate-x-1/2 absolute size-4 ring-2 ring-(--ui-color-base-white-fixed) rounded-full cursor-pointer data-[disabled]:cursor-not-allowed',
    track: 'w-[8px] relative rounded-(--ui-border-radius-md) touch-none',
    trackThumb: 'absolute transform -translate-y-1/2 -translate-x-[4px] rtl:translate-x-[4px] size-4 rounded-full ring-2 ring-(--ui-color-base-white-fixed) cursor-pointer data-[disabled]:cursor-not-allowed'
  },
  variants: {
    size: {
      xs: {
        selector: 'w-[152px] h-[152px]',
        track: 'h-[152px]'
      },
      sm: {
        selector: 'w-[160px] h-[160px]',
        track: 'h-[160px]'
      },
      md: {
        selector: 'w-[168px] h-[168px]',
        track: 'h-[168px]'
      },
      lg: {
        selector: 'w-[176px] h-[176px]',
        track: 'h-[176px]'
      }
    }
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'md'
  }
}
