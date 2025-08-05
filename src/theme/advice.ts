/**
 * Advice
 * A couple of lines of text and an avatar
 * ---
 * @link /api_d7/bitrix/ui/ui_advice.php
 * @see bitrix/js/ui/advice/src
 * @todo add actions from alerts
 */
export default {
  slots: {
    root: [
      'context-light',
      'air-secondary-accent-1',
      'flex items-end'
    ].join(' '),
    descriptionWrapper: 'relative',
    descriptionBorder: [
      'fill-(--b24ui-border-color)',
    ].join(' '),
    descriptionBg: [
      'fill-(--b24ui-background)',
      'context-dark:fill-(--ui-color-base-6)'
    ].join(' '),
    descriptionAngle: [
      'absolute',
      'w-[14px] h-[12px]'
    ].join(' '),
    description: [
      'grow',
      'w-11/12 py-3 px-md2 ms-2',
      'rounded-[23px]',
      'font-[family-name:var(--ui-font-family-secondary)] text-(length:--ui-font-size-md)/(--ui-font-line-height-md) font-(--ui-font-weight-normal)',
      'border-1',
      'border-(--b24ui-border-color) bg-(--b24ui-background) text-(--b24ui-color)',
      'context-dark:bg-(--ui-color-base-6)'
    ].join(' '),
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
