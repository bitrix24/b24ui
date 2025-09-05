/**
 * Badge
 * A short text to represent a status or a category.
 * ---
 * @link /api_d7/bitrix/ui/labels/index.php
 * @see src/runtime/air-design-tokens/components/badge-counter.css
 * @see bitrix/js/ui/label/
 * @see bitrix/js/ui/cnt/
 * @todo fix docs
 * @memo add size.xss && size.xl
 */
import { fieldGroupVariant } from './field-group'

export default {
  slots: {
    base: [
      'ui-label__scope --air',
      'select-none',
      'font-[family-name:var(--ui-font-family-secondary)]',
      'font-(--ui-label-font-weight)',
      'text-(length:--ui-label-font-size)/normal',
      'inline-flex items-center',
      'transition-all duration-200 ease-linear',
      'px-(--ui-label-inline-space)',
      'text-(--b24ui-color)',
      'bg-(--b24ui-background)',
      'border-(--b24ui-border-color) border-(length:--b24ui-border-width)'
    ].join(' '),
    wrapper: 'h-(--ui-label-height) inline-flex items-center',
    label: 'max-w-full whitespace-nowrap text-ellipsis decoration-from-font',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0 cursor-pointer hover:rounded-(--ui-border-radius-circle) hover:bg-current/20'
  },
  variants: {
    ...fieldGroupVariant,
    useLink: {
      true: {
        base: 'cursor-pointer',
        wrapper: 'group',
        label: 'group-hover:underline group-hover:decoration-dashed'
      }
    },
    useClose: {
      true: 'pe-2xs',
      false: ''
    },
    leading: {
      true: 'ps-1',
      false: ''
    },
    color: {
      'air-primary': { base: 'style-filled' },
      'air-primary-success': { base: 'style-filled-success' },
      'air-primary-alert': { base: 'style-filled-alert' },
      'air-primary-copilot': { base: 'style-filled-copilot' },
      'air-primary-warning': { base: 'style-filled-warning' },
      'air-secondary': { base: 'style-tinted' },
      'air-secondary-alert': { base: 'style-tinted-alert' },
      'air-secondary-accent': { base: 'style-outline' },
      'air-secondary-accent-1': { base: 'style-outline-accent-1' },
      'air-secondary-accent-2': { base: 'style-outline-accent-2' },
      'air-tertiary': { base: 'style-outline-no-accent' },
      'air-selection': { base: 'style-selection' },
      // @deprecate ////
      'default': { base: 'style-old-default' },
      'danger': { base: 'style-old-danger' },
      'success': { base: 'style-old-success' },
      'warning': { base: 'style-old-warning' },
      'primary': { base: 'style-old-primary' },
      'secondary': { base: 'style-old-secondary' },
      'collab': { base: 'style-old-collab' },
      'ai': { base: 'style-old-ai' }
    },
    size: {
      xss: {
        base: 'ui-label-xss gap-0.5',
        wrapper: 'gap-0.5',
        label: 'underline-offset-1',
        leadingIcon: 'size-[12px]',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-[12px]'
      },
      xs: {
        base: 'ui-label-xs gap-0.5',
        wrapper: 'gap-0.5',
        label: 'underline-offset-1',
        leadingIcon: 'size-[12px]',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-[12px]'
      },
      sm: {
        base: 'ui-label-sm gap-1',
        wrapper: 'gap-1',
        label: 'underline-offset-1',
        leadingIcon: 'size-[14px]',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-[14px]'
      },
      md: {
        base: 'ui-label-md gap-1',
        wrapper: 'gap-1',
        label: 'underline-offset-1',
        leadingIcon: 'size-[15px]',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-[15px]'
      },
      lg: {
        base: 'ui-label-lg gap-1',
        wrapper: 'gap-1',
        label: '',
        leadingIcon: 'size-[22px]',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-[22px]'
      },
      xl: {
        base: 'ui-label-xl gap-1',
        wrapper: 'gap-1',
        label: '',
        leadingIcon: 'size-[22px]',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-[22px]'
      }
    },
    square: {
      true: {
        base: 'rounded-[calc(var(--ui-label-height)_/_4)] ',
        wrapper: 'w-(--ui-label-height)',
        label: 'overflow-hidden'
      },
      false: {
        base: 'rounded-[calc(var(--ui-label-height)_/_2)]'
      }
    },
    inverted: {
      true: {
        base: 'border-(--b24ui-color)'
      },
      false: ''
    }
  },
  compoundVariants: [
    // region color ////
    {
      inverted: true,
      color: 'air-primary',
      class: {
        base: 'style-filled-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-success',
      class: {
        base: 'style-filled-success-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-alert',
      class: {
        base: 'style-filled-alert-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-copilot',
      class: {
        base: 'style-filled-copilot-inverted'
      }
    },
    {
      inverted: true,
      color: 'air-primary-warning',
      class: {
        base: 'style-filled-warning-inverted'
      }
    },
    // endregion ////
    // region square ////
    {
      size: 'xss',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'px-[2px] gap-0',
        leadingIcon: 'size-[6px]'
      }
    },
    {
      size: 'xs',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'px-[2px] gap-0',
        leadingIcon: 'size-[10px]'
      }
    },
    {
      size: 'sm',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-[1px] gap-0',
        leadingIcon: 'size-[16px]'
      }
    },
    {
      size: 'md',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-[1px] gap-0',
        leadingIcon: 'size-[18px]'
      }
    },
    {
      size: 'lg',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-[1px] gap-0',
        leadingIcon: 'size-[23px]'
      }
    },
    {
      size: 'xl',
      square: true,
      class: {
        base: 'p-0 ps-0 pe-0',
        wrapper: 'p-[1px] gap-0',
        leadingIcon: 'size-[28px]'
      }
    },
    // endregion ////
    // region fieldGroup ////
    {
      fieldGroup: ['horizontal', 'vertical'],
      size: ['xl', 'lg', 'md'],
      class: 'rounded-(--ui-border-radius-md)'
    },
    {
      fieldGroup: ['horizontal', 'vertical'],
      size: 'sm',
      class: 'rounded-(--ui-border-radius-sm)'
    },
    {
      fieldGroup: ['horizontal', 'vertical'],
      size: 'xs',
      class: 'rounded-(--ui-border-radius-xs)'
    },
    {
      fieldGroup: ['horizontal', 'vertical'],
      size: 'xss',
      class: 'rounded-[5px]'
    }
    // endregion ////
  ],
  defaultVariants: {
    color: 'air-primary',
    size: 'md',
    square: false,
    inverted: false
  }
}
