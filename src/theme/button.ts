import type { ModuleOptions } from '../module'
import { buttonGroupVariant } from './button-group'

export default (options: Required<ModuleOptions>) => ({
  slots: {
    base: ['cursor-pointer rounded-md font-medium inline-flex items-center focus:outline-hidden disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75', 'transition-colors'],
    label: 'truncate',
    leadingIcon: 'shrink-0',
    leadingAvatar: 'shrink-0',
    leadingAvatarSize: '',
    trailingIcon: 'shrink-0'
  },
  variants: {
    ...buttonGroupVariant,
    size: {
      xs: {
        base: 'px-2 py-1 text-xs gap-1',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4'
      },
      sm: {
        base: 'px-2.5 py-1.5 text-xs gap-1.5',
        leadingIcon: 'size-4',
        leadingAvatarSize: '3xs',
        trailingIcon: 'size-4'
      },
      md: {
        base: 'px-2.5 py-1.5 text-sm gap-1.5',
        leadingIcon: 'size-10',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-10'
      },
      lg: {
        base: 'px-3 py-2 text-sm gap-2',
        leadingIcon: 'size-15',
        leadingAvatarSize: '2xs',
        trailingIcon: 'size-15'
      }
    },
    block: {
      true: {
        base: 'w-full justify-center',
        leadingAvatarSize: 'xs',
        trailingIcon: 'ms-auto'
      }
    },
    square: {
      true: ''
    },
    leading: {
      true: ''
    },
    trailing: {
      true: ''
    },
    loading: {
      true: ''
    }
  },
  compoundVariants: [],
  defaultVariants: {
    size: 'md'
  }
})
