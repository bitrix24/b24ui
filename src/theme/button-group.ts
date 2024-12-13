export const buttonGroupVariant = {
  buttonGroup: {
    horizontal: [
      'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none',
      'not-only:first:border-e-0 not-only:not-first:border-s-0'
    ].join(' '),
    vertical: 'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none'
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
      base: 'group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none'
    },
    vertical: {
      root: 'group',
      base: 'group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none'
    }
  }
}

export default {
  base: 'relative',
  variants: {
    size: {
      '2xs': '',
      'xs': '',
      'sm': '',
      'md': '',
      'lg': ''
    },
    orientation: {
      horizontal: 'inline-flex -space-x-px',
      vertical: 'flex flex-col -space-y-px'
    }
  }
}
