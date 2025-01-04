/**
 * Countdown
 * Countdown with options control.
 * ---
 * @link https://github.com/fengyuanchen/vue-countdown
 * @link /api_d7/bitrix/ui/ui_countdown.php
 * @see bitrix/js/ui/countdown/src
 */

/**
 * @todo add tests
 * @todo add docs
 */
export default {
  slots: {
    base: [
      'relative flex flex-row flex-nowrap items-center justify-between',
      'text-base-500 dark:text-base-600'
    ],
    label: '',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    circleBase: '-scale-x-100 absolute inset-x-0 inset-y-0',
    circleGroup: 'fill-none stroke-none',
    circleElement: 'stroke-transparent stroke-1',
    circlePath: [
      'stroke-[7px] rotate-90 origin-center stroke-current transition-all duration-1000 ease-linear'
    ]
  },
  variants: {
    size: {
      xs: {
        base: 'gap-0.5 text-5xs leading-none',
        leadingIcon: 'size-sm',
        leadingAvatarSize: '3xs'
      },
      sm: {
        base: 'gap-1 text-4xs leading-none',
        leadingIcon: 'size-sm2',
        leadingAvatarSize: '3xs'
      },
      md: {
        base: 'gap-1 text-md leading-none',
        leadingIcon: 'size-[16px]',
        leadingAvatarSize: '3xs'
      },
      lg: {
        base: 'gap-1 text-lg leading-none',
        leadingIcon: 'size-[22px]',
        leadingAvatarSize: '2xs'
      },
      xl: {
        base: 'gap-1 text-xl leading-none',
        leadingIcon: 'size-[26px]',
        leadingAvatarSize: 'xs'
      }
    },
    leading: {
      true: ''
    },
    useCircle: {
      true: {
        base: 'justify-center',
        circleBase: 'size-full'
      }
    }
  },
  compoundVariants: [
    {
      size: 'xs',
      useCircle: true,
      class: 'text-7xs leading-normal p-0.5'
    },
    {
      size: 'sm',
      useCircle: true,
      class: 'text-6xs leading-normal p-1.5'
    },
    {
      size: 'md',
      useCircle: true,
      class: 'text-3xs leading-normal p-1.5'
    },
    {
      size: 'lg',
      useCircle: true,
      class: 'text-xs leading-normal p-1.5 pb-2'
    },
    {
      size: 'xl',
      useCircle: true,
      class: 'text-sm leading-normal p-2 pb-2.5'
    }
  ],
  defaultVariants: {
    size: 'md'
  }
}
