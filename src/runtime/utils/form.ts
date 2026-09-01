import { toRaw } from 'vue'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import type { Struct } from 'superstruct'
import type { FormSchema, ValidateReturnSchema } from '../types/form'
import { assertNoPrototypeKeys, isPrototypeKey, ownContainer } from './prototype-guard'

/**
 * Whether a schema is superstruct's, detected by shape — superstruct exports
 * no brand to check.
 */
export function isSuperStructSchema(schema: any): schema is Struct<any, any> {
  return (
    'schema' in schema
    && typeof schema.coercer === 'function'
    && typeof schema.validator === 'function'
    && typeof schema.refiner === 'function'
  )
}

/**
 * Whether a schema implements Standard Schema, which Zod, Valibot, Yup, Joi
 * and Arktype all do — the one check that covers every validator `Form`
 * supports except superstruct.
 */
export function isStandardSchema(schema: any): schema is StandardSchemaV1 {
  return '~standard' in schema
}

/**
 * Runs a Standard Schema over the form state and flattens its issues into the
 * `{ name, message }` pairs `Form` renders, joining each issue's path with
 * dots so it matches a `FormField`'s `name`.
 */
export async function validateStandardSchema(
  state: any,
  schema: StandardSchemaV1
): Promise<ValidateReturnSchema<typeof state>> {
  const result = await schema['~standard'].validate(state)

  if (result.issues) {
    return {
      errors: result.issues?.map(issue => ({
        name: issue.path?.map(item => typeof item === 'object' ? item.key : item).join('.') || '',
        message: issue.message
      })) || [],
      result: null
    }
  }

  return {
    errors: null,
    result: result.value
  }
}

async function validateSuperstructSchema(state: any, schema: Struct<any, any>): Promise<ValidateReturnSchema<typeof state>> {
  const [err, result] = schema.validate(state)
  if (err) {
    const errors = err.failures().map(error => ({
      message: error.message,
      name: error.path.join('.')
    }))

    return {
      errors,
      result: null
    }
  }

  return {
    errors: null,
    result
  }
}

/**
 * Validates the form state with whichever library the schema came from.
 *
 * @throws {Error} if the schema is neither Standard Schema nor superstruct.
 */
export function validateSchema<T extends object>(state: T, _schema: FormSchema<T>): Promise<ValidateReturnSchema<typeof state>> {
  // Schemas stored in reactive state reach us as Vue proxies. Zod 4.5 resolves
  // `~standard` through a lazy getter that captures the proxy as `this`, then
  // reads its non-configurable `_zod` internals through it, which violates the
  // proxy invariant and throws.
  const schema = toRaw(_schema)

  if (isStandardSchema(schema)) {
    return validateStandardSchema(state, schema)
  } else if (isSuperStructSchema(schema)) {
    return validateSuperstructSchema(state, schema)
  } else {
    throw new Error('Form validation failed: Unsupported form schema')
  }
}

/**
 * Reads a dotted `path` out of the form state — the read half of the same
 * traversal `setAtPath` writes with.
 *
 * Prototype-safe on the same terms as `get()` in `utils/index.ts`: an
 * inherited key is refused, a field the form owns and happens to have named
 * `constructor` still reads. No `path` returns `data` unchanged, which is how
 * a `FormField` with no `name` reads the whole state.
 */
export function getAtPath<T extends object>(
  data: T,
  path?: string
) {
  if (!path) return data
  const value = path
    .split('.')
    .reduce(
      // Refuses an inherited prototype key for the same reason `get()` in
      // `utils/index.ts` does — a field the form owns and happens to have
      // named `constructor` still reads.
      (value, key) => (isPrototypeKey(key) && !(value !== null && value !== undefined && Object.hasOwn(value as object, key))
        ? undefined
        : (value as any)?.[key]),
      data as any
    )

  return value
}

/**
 * Writes `value` at a dotted `path` inside `data`, creating what is missing.
 *
 * Unlike `set()` in `utils/index.ts`, this one *is* called from inside the
 * library — `Form.vue` resolves nested validation results through it, with the
 * path coming from a field's `name`. See `utils/prototype-guard.ts`.
 *
 * @throws {TypeError} if any path segment names `__proto__`, `constructor` or
 * `prototype`.
 */
export function setAtPath<T extends object>(
  data: T,
  path: string,
  value: any
): T {
  if (!path) return Object.assign(data, value)
  if (!data) return data

  const keys = path.split('.')

  assertNoPrototypeKeys(keys, 'setAtPath()')

  let current = data as Record<string, any>

  // Navigate to the parent of the target property
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!
    // If the next key is a number, initialize as array
    const arrayHint = i + 1 < keys.length && !Number.isNaN(Number(keys[i + 1]))

    current = ownContainer(current, key, arrayHint)
  }

  // Set the final value
  const lastKey = keys[keys.length - 1]!
  current[lastKey] = value

  return data
}
