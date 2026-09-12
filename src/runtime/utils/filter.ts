import type { FilterFieldCondition, FilterOperator } from '../types/filter'

const KNOWN_OPERATORS: ReadonlySet<FilterOperator> = new Set<FilterOperator>([
  'eq',
  'neq',
  'gt',
  'gte',
  'lt',
  'lte',
  'between',
  'in',
  'contains',
  'startsWith',
  'filled',
  'empty'
])

export function isKnownOperator(op: unknown): op is FilterOperator {
  return typeof op === 'string' && KNOWN_OPERATORS.has(op as FilterOperator)
}

export function isFilledOp(c: FilterFieldCondition | null | undefined): c is { operator: 'filled' } {
  return !!c && c.operator === 'filled'
}

export function isEmptyOp(c: FilterFieldCondition | null | undefined): c is { operator: 'empty' } {
  return !!c && c.operator === 'empty'
}

export function isStateOp(c: FilterFieldCondition | null | undefined): c is { operator: 'filled' } | { operator: 'empty' } {
  return isFilledOp(c) || isEmptyOp(c)
}

export function isRangeOp(c: FilterFieldCondition | null | undefined): c is { operator: 'between', value: [unknown, unknown] } {
  return !!c && c.operator === 'between'
}

export function isInOp(c: FilterFieldCondition | null | undefined): c is { operator: 'in', value: unknown[] } {
  return !!c && c.operator === 'in'
}

/**
 * Default operators per field type — used when `FilterFieldConfig.supportedOperators` is not set.
 */
export function defaultOperatorsForType(type: string): FilterOperator[] {
  switch (type) {
    case 'string':
      return ['contains', 'eq', 'neq', 'startsWith']
    case 'number':
    case 'money':
      return ['eq', 'gt', 'gte', 'lt', 'lte', 'between']
    case 'date':
    case 'time':
      return ['eq', 'between']
    case 'select':
      return ['eq', 'neq']
    case 'multiselect':
      return ['in']
    case 'boolean':
      return ['eq']
    default:
      return ['eq']
  }
}
