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
  { code: 'en', name: 'English', file: 'en.json' },
  { code: 'de', name: 'Deutsch', file: 'de.json' },
  { code: 'la', name: 'Español', file: 'la.json' },
  { code: 'br', name: 'Português (Brasil)', file: 'br.json' },
  { code: 'fr', name: 'Français', file: 'fr.json' },
  { code: 'it', name: 'Italiano', file: 'it.json' },
  { code: 'pl', name: 'Polski', file: 'pl.json' },
  { code: 'ru', name: 'Русский', file: 'ru.json' },
  { code: 'ua', name: 'Українська', file: 'ua.json' },
  { code: 'tr', name: 'Türkçe', file: 'tr.json' },
  { code: 'sc', name: '中文（简体）', file: 'sc.json' },
  { code: 'tc', name: '中文（繁體）', file: 'tc.json' },
  { code: 'ja', name: '日本語', file: 'ja.json' },
  { code: 'vn', name: 'Tiếng Việt', file: 'vn.json' },
  { code: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
  { code: 'ms', name: 'Bahasa Melayu', file: 'ms.json' },
  { code: 'th', name: 'ภาษาไทย', file: 'th.json' },
  { code: 'ar', name: 'عربي', file: 'ar.json' },
  { code: 'kz', name: 'Қазақша', file: 'kz.json' }
]
