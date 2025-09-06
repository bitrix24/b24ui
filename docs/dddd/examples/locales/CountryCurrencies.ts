export interface CurrencyLocale {
  code: string
  locale: string
  currencyCode: string
  country: string
}

const countryCurrencies: CurrencyLocale[] = [
  { code: 'en', locale: 'en-US', currencyCode: 'USD', country: 'United States' },
  { code: 'de', locale: 'de-DE', currencyCode: 'EUR', country: 'Germany' },
  { code: 'la', locale: 'es-419', currencyCode: 'USD', country: 'Latin America' },
  { code: 'br', locale: 'pt-BR', currencyCode: 'BRL', country: 'Brazil' },
  { code: 'fr', locale: 'fr-FR', currencyCode: 'EUR', country: 'France' },
  { code: 'it', locale: 'it-IT', currencyCode: 'EUR', country: 'Italy' },
  { code: 'pl', locale: 'pl-PL', currencyCode: 'PLN', country: 'Poland' },
  { code: 'ru', locale: 'ru-RU', currencyCode: 'RUB', country: 'Russia' },
  { code: 'ua', locale: 'uk-UA', currencyCode: 'UAH', country: 'Ukraine' },
  { code: 'tr', locale: 'tr-TR', currencyCode: 'TRY', country: 'Turkey' },
  { code: 'sc', locale: 'zh-CN', currencyCode: 'CNY', country: 'China (Simplified Chinese)' },
  { code: 'tc', locale: 'zh-TW', currencyCode: 'TWD', country: 'Taiwan (Traditional Chinese)' },
  { code: 'ja', locale: 'ja-JP', currencyCode: 'JPY', country: 'Japan' },
  { code: 'vn', locale: 'vi-VN', currencyCode: 'VND', country: 'Vietnam' },
  { code: 'id', locale: 'id-ID', currencyCode: 'IDR', country: 'Indonesia' },
  { code: 'ms', locale: 'ms-MY', currencyCode: 'MYR', country: 'Malaysia' },
  { code: 'th', locale: 'th-TH', currencyCode: 'THB', country: 'Thailand' },
  { code: 'ar', locale: 'ar-SA', currencyCode: 'SAR', country: 'Saudi Arabia' }
]

export default countryCurrencies
