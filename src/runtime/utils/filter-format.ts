import type {
  FilterFieldConfig,
  FilterFieldCondition,
  FilterLocale,
  FilterDateValue,
  FilterFieldOption
} from '../types/filter'

function formatDateValue(value: FilterDateValue | undefined, locale: FilterLocale): string {
  if (!value) return ''
  switch (value.kind) {
    case 'any': return locale.datePresets.any
    case 'preset': return locale.datePresets[value.preset] ?? value.preset
    case 'exact': return value.date
    case 'range': return `${value.from} – ${value.to}`
    case 'relative': return `${value.days} ${locale.datePresets.relative}`
  }
}

function formatOptionValue(field: FilterFieldConfig, value: unknown): string {
  const opt = field.options?.find((o: FilterFieldOption) => o.value === value)
  return opt?.label ?? String(value)
}

function formatScalar(field: FilterFieldConfig, value: unknown, locale: FilterLocale): string {
  if (value == null) return ''
  if (field.type === 'date') return formatDateValue(value as FilterDateValue, locale)
  if (field.type === 'boolean') {
    return value ? locale.boolean.yes : locale.boolean.no
  }
  if (field.type === 'select') return formatOptionValue(field, value)
  if (field.type === 'money' && typeof value === 'object' && value !== null && 'amount' in value) {
    const v = value as { amount: number, currency?: string }
    return `${v.amount}${v.currency ? ' ' + v.currency : ''}`
  }
  return String(value)
}

/**
 * Render a human-readable label for a condition.
 * Used in FilterBar chips and a few other display surfaces.
 */
export function conditionLabel(
  field: FilterFieldConfig,
  condition: FilterFieldCondition,
  locale: FilterLocale
): string {
  switch (condition.operator) {
    case 'filled':
      return `${field.label}: ${locale.actions.fieldFilled}`
    case 'empty':
      return `${field.label}: ${locale.actions.fieldEmpty}`
    case 'between': {
      const [from, to] = condition.value
      return `${field.label}: ${formatScalar(field, from, locale)} – ${formatScalar(field, to, locale)}`
    }
    case 'in': {
      const parts = condition.value.map(v => formatScalar(field, v, locale))
      return `${field.label}: ${parts.join(', ')}`
    }
    case 'eq':
      return `${field.label}: ${formatScalar(field, condition.value, locale)}`
    case 'neq':
      return `${field.label} ≠ ${formatScalar(field, condition.value, locale)}`
    case 'gt':
      return `${field.label} > ${formatScalar(field, condition.value, locale)}`
    case 'gte':
      return `${field.label} ≥ ${formatScalar(field, condition.value, locale)}`
    case 'lt':
      return `${field.label} < ${formatScalar(field, condition.value, locale)}`
    case 'lte':
      return `${field.label} ≤ ${formatScalar(field, condition.value, locale)}`
    case 'contains':
      return `${field.label}: «${formatScalar(field, condition.value, locale)}»`
    case 'startsWith':
      return `${field.label}: ${formatScalar(field, condition.value, locale)}…`
  }
}
