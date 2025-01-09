/**
 * Advice
 * A couple of lines of text and an avatar
 * --
 * @link /api_d7/bitrix/ui/ui_advice.php
 * @see bitrix/js/ui/advice/src
 */

/**
 * @todo add actions from alerts
 */
export default {
  slots: {
    root: 'flex items-end',
    descriptionWrapper: [
      'relative'
    ],
    descriptionBorder: [
      'fill-blue-500 dark:fill-blue-300'
    ],
    descriptionBg: [
      'fill-white dark:fill-base-900'
    ],
    descriptionAngle: [
      'absolute',
      'w-[14px] h-[12px]'
    ],
    description: [
      'grow',
      'w-9/12 py-3 px-md2 ms-2',
      'rounded-[23px]',
      'font-b24-secondary text-md leading-md font-normal',
      'border-1',
      'border-blue-500 bg-white text-base-950',
      'dark:border-blue-300 dark:bg-base-900 dark:text-base-200'
    ],
    leading: 'me-1.5 ms-2',
    leadingIcon: 'shrink-0 size-[42px]',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: 'lg'
  },
  variants: {
    angle: {
      top: {
        root: 'items-start',
        leading: 'mt-0.5',
        descriptionAngle: [
          'start-[0.8px] top-[9px]',
          'scale-x-100 -scale-y-100',
          'rtl:-scale-x-100'
        ].join(' ')
      },
      bottom: {
        root: 'items-end',
        descriptionAngle: [
          'start-[0.8px] bottom-[9px]',
          'rtl:-scale-x-100'
        ].join(' ')
      }
    }
  },
  defaultVariants: {
    angle: 'bottom'
  }
}
