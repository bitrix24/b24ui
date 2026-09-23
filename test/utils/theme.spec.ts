import { describe, it, expect } from 'vitest'
import { applyDefaultVariants, applyUnstyled } from '../../src/utils/theme'
import fieldGroup from '../../src/theme/field-group'

describe('applyUnstyled', () => {
  const theme = () => ({
    slots: {
      base: 'inline-flex rounded-md',
      label: 'truncate'
    },
    variants: {
      color: {
        primary: 'bg-primary text-inverted',
        neutral: { base: 'bg-inverted', label: 'text-default' }
      },
      size: {
        md: { base: 'px-2.5 text-sm' }
      }
    },
    compoundVariants: [
      { color: 'primary', variant: 'solid', class: 'bg-primary' },
      { size: 'md', class: { base: 'gap-1.5' } }
    ],
    defaultVariants: {
      color: 'primary',
      size: 'md'
    }
  })

  it('blanks a top-level base', () => {
    // Single-element components (e.g. Kbd, Badge, Link) have no `slots`, their
    // theme is a top-level `base` string or array.
    const stringBase = { base: 'inline-flex items-center rounded-md' }
    expect(applyUnstyled(stringBase, true)).toEqual({ base: '' })
    expect(stringBase.base).toBe('inline-flex items-center rounded-md')

    expect(applyUnstyled({ base: ['flex', 'transition-colors'] }, true)).toEqual({ base: '' })
  })

  it('does not mutate the input theme', () => {
    // Object-shaped themes are shared module exports: blanking in place would
    // blank every later read within the same process.
    const input = theme()
    const snapshot = JSON.parse(JSON.stringify(input))

    const result = applyUnstyled(input, true)

    expect(result).not.toBe(input)
    expect(input).toEqual(snapshot)
  })

  it('returns the theme untouched when unstyled is falsy', () => {
    const input = theme()
    expect(applyUnstyled(input, false)).toBe(input)
    expect(applyUnstyled(input, undefined)).toBe(input)
    expect(input).toEqual(theme())
  })

  it('blanks every slot class but keeps the slot keys', () => {
    const result = applyUnstyled(theme(), true)
    expect(result.slots).toEqual({ base: '', label: '' })
  })

  it('blanks variant classes in both string and slot-object forms', () => {
    const result = applyUnstyled(theme(), true)
    expect(result.variants.color.primary).toBe('')
    expect(result.variants.color.neutral).toEqual({ base: '', label: '' })
    expect(result.variants.size.md).toEqual({ base: '' })
  })

  it('blanks compoundVariants classes but keeps the selectors', () => {
    const result = applyUnstyled(theme(), true)
    expect(result.compoundVariants).toEqual([
      { color: 'primary', variant: 'solid', class: '' },
      { size: 'md', class: { base: '' } }
    ])
  })

  it('preserves defaultVariants and variant keys so props still validate', () => {
    const result = applyUnstyled(theme(), true)
    expect(result.defaultVariants).toEqual({ color: 'primary', size: 'md' })
    expect(Object.keys(result.variants)).toEqual(['color', 'size'])
    expect(Object.keys(result.variants.color)).toEqual(['primary', 'neutral'])
  })
})

describe('applyDefaultVariants', () => {
  // `applyDefaultVariants` mutates the object it is given, and the themes are
  // shared module exports — clone before every call.
  const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))

  it('rewrites a size default the module option was meant to reach', () => {
    const result = applyDefaultVariants(clone(fieldGroup), { size: 'lg' })
    expect(result.defaultVariants.size).toBe('lg')
  })

  it('does nothing to a theme that declares no defaultVariants', () => {
    // The guard is `result.defaultVariants?.size === 'md'`: a theme without the
    // block is skipped outright, which is why `fieldGroup` had to grow one for
    // `ui.theme.defaultVariants.size` to apply to it at all.
    const sizedButUndeclared = { base: 'relative', variants: { size: { sm: '', md: '', lg: '' } } }
    expect(applyDefaultVariants(clone(sizedButUndeclared), { size: 'lg' })).toEqual(sizedButUndeclared)
  })

  it('leaves a non-canonical default alone', () => {
    // Only the library-wide defaults (`md`, `air-primary`) are treated as
    // "unset"; a theme that deliberately pins another value keeps it.
    const pinned = { variants: { size: { sm: '', xl: '' } }, defaultVariants: { size: 'xl', color: 'air-secondary' } }
    const result = applyDefaultVariants(clone(pinned), { size: 'sm', color: 'air-primary' })
    expect(result.defaultVariants).toEqual({ size: 'xl', color: 'air-secondary' })
  })
})
