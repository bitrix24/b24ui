/**
 * InputTag
 * ---
 * @see InputMenu.multiple
 */
import { defuFn } from 'defu'
import input from './input'

export default () => {
  return defuFn({
    slots: {
      root: (prev: string) => [prev, 'flex-wrap'],
      base: [
        'border-0 focus:outline-none',
        'disabled:cursor-not-allowed',
        'disabled:pointer-events-none',
        'disabled:select-none',
        'disabled:opacity-30',
        'disabled:resize-none',
        'appearance-none transition duration-300 ease-linear transition-colors', // transition-colors
        'text-(--ui-color-base-1)',
        'style-blurred-bg-input',
        'hover:text-(--ui-color-base-1)',
        'focus:text-(--ui-color-base-1)',
        'active:text-(--ui-color-base-1)',
        'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
        'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
        'align-middle',
        'pe-[39px]'
      ].join(' '),
      item: [
        'ps-[13px] pe-[6px]',
        'rounded-(--ui-border-radius-xs)',
        'h-(--main-ui-square-item-height)',
        'leading-(--main-ui-square-item-height)',
        'font-[family-name:var(--ui-font-family-primary)] font-(--ui-font-weight-regular)',
        'inline-flex items-center gap-1',
        'data-disabled:cursor-not-allowed data-disabled:opacity-30',
        'data-disabled:pointer-events-none',
        'data-disabled:select-none',
        'text-(--ui-color-design-tinted-content)',
        'bg-(--ui-color-design-tinted-bg-alt)'
      ].join(' '),
      itemText: [
        'truncate max-w-[180px]'
      ].join(' '),
      itemDelete: [
        'cursor-pointer',
        'inline-flex items-center',
        'disabled:pointer-events-none',
        'disabled:select-none',
        'text-(--b24ui-icon-color-secondary)',
        'hover:text-(--b24ui-icon-color-secondary-hover)',
        'transition-none'
      ].join(' '),
      itemDeleteIcon: 'shrink-0',
      input: [
        'flex-1',
        'border-0',
        'bg-transparent',
        'ps-[6px] pe-[0px] py-0',
        'placeholder:text-(--ui-color-design-plain-na-content-secondary)',
        'focus:outline-none',
        'disabled:cursor-not-allowed',
        'disabled:pointer-events-none',
        'disabled:select-none',
        'disabled:opacity-30',
        'focus:ring-0',
        'focus-visible:ring-0'
      ].join(' ')
    },
    variants: {
      size: {
        xss: {
          base: [
            '[--main-ui-square-item-height:12px] gap-1 text-(length:--ui-font-size-4xs)/[normal]',
            'min-h-[20px] h-auto py-[2px] ps-[4px]'
          ].join(' '),
          leading: 'px-1',
          trailing: 'px-1',
          leadingIcon: 'size-[12px]',
          trailingIcon: 'size-[12px]',
          input: 'text-(length:--ui-font-size-4xs)/[normal]',
          item: [
            'text-(length:--ui-font-size-5xs)/(--main-ui-square-item-height)',
            'gap-0.5'
          ].join(' '),
          itemDeleteIcon: 'size-[10px]'
        },
        xs: {
          base: [
            '[--main-ui-square-item-height:16px] gap-1 text-(length:--ui-font-size-xs)/[normal]',
            'min-h-[24px] h-auto py-[2px] ps-[4px]'
          ].join(' '),
          leading: 'px-1',
          trailing: 'px-1',
          leadingIcon: 'size-[14px]',
          trailingIcon: 'size-[14px]',
          input: 'text-(length:--ui-font-size-xs)/[normal]',
          item: [
            'text-(length:--ui-font-size-5xs)/(--main-ui-square-item-height)',
            'gap-0.5'
          ].join(' '),
          itemDeleteIcon: 'size-[10px]'
        },
        sm: {
          base: [
            '[--main-ui-square-item-height:20px] gap-1.5 text-(length:--ui-font-size-sm)/[normal]',
            'min-h-[28px] h-auto py-[4px] ps-[4px]'
          ].join(' '),
          leading: 'px-1.5',
          trailing: 'px-1.5',
          leadingIcon: 'size-[16px]',
          trailingIcon: 'size-[16px]',
          input: 'text-(length:--ui-font-size-sm)/[normal]',
          item: [
            'text-(length:--ui-font-size-5xs)/(--main-ui-square-item-height)',
            'gap-0.5'
          ].join(' '),
          itemDeleteIcon: 'size-[12px]'
        },
        md: {
          base: [
            '[--main-ui-square-item-height:24px] gap-1.5 text-(length:--ui-font-size-lg)/[normal]',
            'min-h-[34px] h-auto py-[4px] ps-[4px]'
          ].join(' '),
          leading: 'px-2',
          trailing: 'px-2',
          leadingIcon: 'size-[18px]',
          trailingIcon: 'size-[18px]',
          input: 'text-(length:--ui-font-size-lg)/[normal]',
          item: [
            'text-(length:--ui-font-size-sm)/(--main-ui-square-item-height)',
            'gap-[4px]'
          ].join(' '),
          itemDeleteIcon: 'size-[18px]'
        },
        lg: {
          base: [
            '[--main-ui-square-item-height:28px] gap-2 text-(length:--ui-font-size-lg)/[normal]',
            'min-h-[38px] h-auto py-[4px] ps-[4px]'
          ].join(' '),
          leading: 'px-2',
          trailing: 'px-2',
          leadingIcon: 'size-[22px]',
          trailingIcon: 'size-[22px]',
          input: 'text-(length:--ui-font-size-lg)/[normal]',
          item: [
            'text-(length:--ui-font-size-md)/(--main-ui-square-item-height)',
            'gap-1'
          ].join(' '),
          itemDeleteIcon: 'size-[22px]'
        },
        xl: {
          base: [
            '[--main-ui-square-item-height:32px] gap-2 text-(length:--ui-font-size-2xl)/[normal]',
            'min-h-[46px] h-auto py-[6px] ps-[6px]'
          ].join(' '),
          leading: 'px-2',
          trailing: 'px-2',
          leadingIcon: 'size-[22px]',
          trailingIcon: 'size-[22px]',
          input: 'text-(length:--ui-font-size-2xl)/[normal]',
          item: [
            'text-(length:--ui-font-size-xl)/(--main-ui-square-item-height)',
            'gap-1'
          ].join(' '),
          itemDeleteIcon: 'size-[22px]'
        }
      },
      variant: (prev: Record<string, string>) => Object.fromEntries(
        Object.entries(prev).map(([key, value]) => [key, replaceFocus(value)])
      )
    },
    compoundVariants: (prev: Record<string, any>[]) => prev.map(item => ({
      ...item,
      class: typeof item.class === 'string'
        ? replaceFocus(item.class)
        : typeof item.class === 'object'
          ? Object.fromEntries(Object.entries(item.class).map(([key, value]) => [key, typeof value === 'string' ? replaceFocus(value) : value]))
          : item.class
    }))
  }, input)
}

function replaceFocus(str: string): string {
  return str
    .replace(/focus:/g, 'has-focus:')
    .replace(/focus-visible:/g, 'has-focus-visible:')
}
