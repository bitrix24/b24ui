/**
 * Advice
 * A couple of lines of text and an avatar
 * --
 * @link /api_d7/bitrix/ui/ui_advice.php
 * @see bitrix/js/ui/advice/src
 */

/**
 * @todo add tests
 * @todo add docs
 * @todo dark mode
 * @todo test slot def | descr and href
 * @todo test slot leading
 * @todo add props (up / down arrow and etc)
 */
export default {
  slots: {
    root: 'mt-3 flex items-end',
    description: [
      'relative grow',
      'w-9/12 py-3 px-md2 ml-2',
      'rounded-[23px]',
      'font-b24-secondary text-md leading-md font-normal',
      'border-1',
      'border-blue-500 bg-white text-base-950',
      'dark:border-blue-300 dark:bg-white/10 dark:text-base-500',
      'before:content-[\'\'] before:block before:absolute',
      'before:w-[14px] before:h-[12px]',
      'before:bg-no-repeat before:bg-center',
      'bg-[url(\'data:image/svg+xml,%3Csvg width=\'14\' height=\'12\' viewBox=\'0 0 14 12\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M11.3513 11.1621C11.3492 11.1591 11.3471 11.1562 11.3449 11.1532C8.41055 10.7202 3.75061 9.56187 0.411676 6.46663C-0.404067 5.71042 0.0889447 4.42611 1.14665 4.08179C3.50511 3.31403 5.56665 2.10552 7.2199 0.897773L7.23071 0.893616L8.27368 0.163147L10.7925 5.46165L13.8677 11.5454L11.3513 11.1621Z\' fill=\'white\'/%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M11.4909 10.1639C11.7603 10.2036 12.0018 10.3515 12.1597 10.5733C12.3534 10.8456 12.5531 11.1134 12.7585 11.3765L11.3513 11.1621C11.3492 11.1591 11.3471 11.1561 11.3449 11.1531C8.41055 10.7202 3.75061 9.56187 0.411676 6.46662C-0.404067 5.71041 0.0889447 4.4261 1.14665 4.08178C3.50511 3.31403 5.56665 2.10551 7.2199 0.897764L7.23071 0.893607L8.16412 0.239868C8.18419 0.40792 8.20611 0.57539 8.22987 0.742259C8.28188 1.1077 8.12836 1.47208 7.8305 1.6901C6.11459 2.94612 3.95168 4.2203 1.45619 5.03267C1.22829 5.10686 1.07777 5.27921 1.02492 5.43712C1.00004 5.51147 1.00122 5.56804 1.00948 5.60492C1.01647 5.63618 1.03368 5.67964 1.09152 5.73326C4.20493 8.61944 8.61693 9.73979 11.4909 10.1639Z\' fill=\'%2337C8F6\'/%3E%3C/svg%3E%0A\')]'
    ],
    leading: 'mr-1.5 ml-2',
    leadingIcon: 'shrink-0 size-[42px]',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: 'lg'
  },
  variants: {
    angle: {
      top: {
        root: 'items-start',
        leading: 'mt-0.5',
        description: [
          'before:-left-[8.2px] before:top-[8px]',
          'scale-100' // transform: scale(1, -1)
        ].join(' ')
      },
      bottom: {
        root: 'items-end',
        description: [
          'before:-left-[8.2px] before:bottom-[8px]'
        ].join(' ')
      }
    }
  },
  defaultVariants: {
    angle: 'bottom'
  }
}
