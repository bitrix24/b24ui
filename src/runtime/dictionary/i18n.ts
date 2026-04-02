/** Represents the structure of a content locale object */
interface ContentLocale {
  /** Language code (ISO 639-1) */
  code: string
  /** Display name of the language */
  name: string
  /** Corresponding JSON filename in the locales directory */
  file: string
}

/** List of supported content locales */
export const contentLocales: ContentLocale[] = [
  { code: 'en', name: 'English', file: 'en.ts' },
  { code: 'de', name: 'Deutsch', file: 'de.ts' },
  { code: 'la', name: 'Español', file: 'la.ts' },
  { code: 'br', name: 'Português (Brasil)', file: 'br.ts' },
  { code: 'fr', name: 'Français', file: 'fr.ts' },
  { code: 'it', name: 'Italiano', file: 'it.ts' },
  { code: 'pl', name: 'Polski', file: 'pl.ts' },
  { code: 'ru', name: 'Русский', file: 'ru.ts' },
  { code: 'ua', name: 'Українська', file: 'ua.ts' },
  { code: 'tr', name: 'Türkçe', file: 'tr.ts' },
  { code: 'sc', name: '中文（简体）', file: 'sc.ts' },
  { code: 'tc', name: '中文（繁體）', file: 'tc.ts' },
  { code: 'ja', name: '日本語', file: 'ja.ts' },
  { code: 'vn', name: 'Tiếng Việt', file: 'vn.ts' },
  { code: 'id', name: 'Bahasa Indonesia', file: 'id.ts' },
  { code: 'ms', name: 'Bahasa Melayu', file: 'ms.ts' },
  { code: 'th', name: 'ภาษาไทย', file: 'th.ts' },
  { code: 'in', name: 'भारतीय', file: 'in.ts' },
  { code: 'ar', name: 'عربي', file: 'ar.ts' },
  { code: 'kz', name: 'Қазақша', file: 'kz.ts' }
]
