/**
 * ButtonGroup
 * ---
 * @todo fix docs
 * @memo add size.xss && size.xl
 */
export const buttonGroupVariant = {
  buttonGroup: {
    horizontal: [
      'focus-visible:outline-none',
      'ring ring-inset ring-0 focus-visible:ring-2',
      'group-[.is-button-group]/items:not-only:first:rounded-e-none group-[.is-button-group]/items:not-only:last:rounded-s-none group-[.is-button-group]/items:not-last:not-first:rounded-none',
      'group-[.is-button-group]/items:not-only:first:border-e-0 group-[.is-button-group]/items:not-only:not-first:border-s-0',
      'focus-visible:z-[1]'
    ].join(' '),
    vertical: [
      'focus-visible:outline-none',
      'ring ring-inset ring-0 focus-visible:ring-2',
      'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none',
      'focus-visible:z-[1]'
    ].join(' ')
  },
  noSplit: {
    false: [
      'group-[.is-button-group]/items:not-only:not-first:after:content-[\'\'] group-[.is-button-group]/items:not-only:not-first:after:absolute',
      'group-[.is-button-group]/items:not-only:not-first:after:top-[7px] group-[.is-button-group]/items:not-only:not-first:after:bottom-[6px] group-[.is-button-group]/items:not-only:not-first:after:left-0 group-[.is-button-group]/items:not-only:not-first:after:w-px',
      'group-[.is-button-group]/items:not-only:not-first:after:bg-current/30'
    ].join(' ')
  }
}

export const buttonGroupVariantWithRoot = {
  buttonGroup: {
    horizontal: {
      root: 'group leading-none has-focus-visible:z-[1]',
      base: [
        'focus-visible:outline-none',
        'ring ring-inset ring-1 focus-visible:ring-2',
        'group-not-only:group-first:rounded-e-3xl group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none',
        'group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none',
        'group-not-only:group-first:border-e-0 group-not-only:group-not-first:border-s-0'
      ].join(' ')
    },
    vertical: {
      root: 'group has-focus-visible:z-[1]',
      base: [
        'focus-visible:outline-none',
        'ring ring-inset ring-1 focus-visible:ring-2',
        'group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none'
      ].join(' ')
    }
  },
  noSplit: {
    false: [
      'group-not-only:not-first:after:content-[\'\'] group-not-only:not-first:after:absolute',
      'group-not-only:not-first:after:top-[7px] group-not-only:not-first:after:bottom-[6px] group-not-only:not-first:after:left-0 group-not-only:not-first:after:w-px',
      'group-not-only:not-first:after:bg-current/30'
    ].join(' ')
  }
}

export default {
  base: 'relative',
  variants: {
    size: {
      xss: '',
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: ''
    },
    orientation: {
      horizontal: 'flex flex-row -space-x-px',
      vertical: 'flex flex-col -space-y-px'
    }
  }
}
