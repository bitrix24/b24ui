export const buttonGroupVariant = {
  buttonGroup: {
    horizontal: [
      'focus-visible:outline-none',
      'ring ring-inset ring-0 focus-visible:ring-2',
      'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none',
      'not-only:first:border-e-0 not-only:not-first:border-s-0'
    ].join(' '),
    vertical: [
      'focus-visible:outline-none',
      'ring ring-inset ring-0 focus-visible:ring-2',
      'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none'
    ].join(' ')
  },
  noSplit: {
    false: [
      'not-only:not-first:after:content-[\'\'] not-only:not-first:after:absolute',
      'not-only:not-first:after:top-[7px] not-only:not-first:after:bottom-[6px] not-only:not-first:after:left-0 not-only:not-first:after:w-px',
      'not-only:not-first:after:bg-current/30'
    ].join(' ')
  }
}

export const buttonGroupVariantWithRoot = {
  buttonGroup: {
    horizontal: {
      root: 'group',
      base: [
        'focus-visible:outline-none',
        'ring ring-inset ring-1 focus-visible:ring-2',
        'group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none',
        'group-not-only:group-first:border-e-0 group-not-only:group-not-first:border-s-0'
      ].join(' ')
    },
    vertical: {
      root: 'group',
      base: [
        'focus-visible:outline-none',
        'ring ring-inset ring-1 focus-visible:ring-2',
        'group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none'
      ].join(' ')
    }
  },
  noSplit: {
    false: [
      'not-only:not-first:after:content-[\'\'] not-only:not-first:after:absolute',
      'not-only:not-first:after:top-[7px] not-only:not-first:after:bottom-[6px] not-only:not-first:after:left-0 not-only:not-first:after:w-px',
      'not-only:not-first:after:bg-current/30'
    ].join(' ')
  }
}

export default {
  base: 'relative',
  variants: {
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: ''
    },
    orientation: {
      horizontal: 'inline-flex -space-x-px',
      vertical: 'flex flex-col -space-y-px'
    }
  }
}
