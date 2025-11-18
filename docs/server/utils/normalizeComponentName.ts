/**
 * Normalizes component names by removing Bitrix24 UI prefixes
 *
 * @param componentName - The component name to normalize
 * @returns The normalized component name without B24/v24- prefixes
 *
 * @example
 * normalizeComponentName('B24Button') // 'Button'
 * normalizeComponentName('B24User') // 'User'
 * normalizeComponentName('b24-button') // 'button'
 * normalizeComponentName('b24-user') // 'user'
 * normalizeComponentName('Button') // 'Button'
 * normalizeComponentName('User') // 'User'
 */
export function normalizeComponentName(componentName: string): string {
  let normalizedName = componentName

  // Check if starts with 'B24' followed by an uppercase letter (indicating PascalCase)
  if (normalizedName.startsWith('B24') && normalizedName.length > 1 && normalizedName[1] === normalizedName[1]?.toUpperCase()) {
    normalizedName = normalizedName.slice(3)

    // Handle b24-button -> button, b24-user -> user (kebab-case with b24- prefix)
  } else if (normalizedName.toLowerCase().startsWith('b24-')) {
    normalizedName = normalizedName.slice(4)
  }

  return normalizedName
}
