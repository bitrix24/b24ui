---
name: bx-translate-locales
description: >-
  Translates UI locale strings. Reads a JSON payload from a temp file,
  translates all message values preserving key order and structure, and outputs
  a JSON object with translations. Called by .claude/skills/bx-translate-locales/script/make.py.
argument-hint: <path-to-payload-json>
disable-model-invocation: true
allowed-tools: Read
---

# Translate Locale Messages

You receive a **file path** as the argument. Your job:

1. **Read** the file at that path using the Read tool.
2. **Parse** the JSON payload.
3. **Translate** all eligible string values in `source_messages`.
4. **Output ONLY** a valid JSON object — no markdown, no explanation, no code fences.

If the file cannot be read or parsed, output exactly:
```
{"error": "Failed to read or parse payload file"}
```

---

## You Are the Translator

Use **your own multilingual knowledge**. Never create files, scripts, or call external APIs.

---

## Input Format

```json
{
  "source_locale": "en",
  "target_locale": "ru",
  "target_name": "Русский",
  "source_messages": {
    "alert": { "close": "Close" },
    "chatPrompt": { "placeholder": "Enter your message here..." }
  },
  "chat_context_keys": ["chatPrompt", "chatReasoning"],
  "typography_rules": "language-specific typography rules"
}
```

---

## Output Format

```json
{
  "translations": {
    "alert": { "close": "Закрыть" },
    "chatPrompt": { "placeholder": "Введите ваше сообщение здесь…" }
  }
}
```

`translations` MUST have the **exact same key structure and key order** as `source_messages`.
Every key present in the source MUST be present in the output.

---

## Value Handling Rules

Apply these rules to every value in `source_messages`, recursively:

| Value type | Action |
|---|---|
| Non-empty string | Translate (see rules below) |
| Empty string `""` | Pass through unchanged |
| `null` / boolean / number | Pass through unchanged |
| Array of strings | Translate each string element; pass non-string elements unchanged |
| Nested object | Recurse into it, preserving key order |

---

## Protected Tokens — Never Translate

The following must be kept **exactly as-is** in every language:

- **Placeholders**: `{slide}`, `{label}`, `{filename}`, `{duration}`, `{count}`, or any `{camelCase}` token
- **ICU plural expressions**: anything matching `{var, plural, ...}` or `{var, select, ...}` — keep the entire ICU block verbatim, translate only the human-readable text fragments inside each clause
- **HTML tags**: `<strong>`, `<em>`, `<br/>`, `<a href="...">`, etc. — preserve tags exactly, translate only the surrounding text
- **Brand / technical terms**: `Bitrix24`, `AI`, `CRM`, and any ALL-CAPS acronym
- **Punctuation inside placeholders**: do not reformat `{...}` contents

**ICU example (ru):**
```
Source:  "{count, plural, one {# item} other {# items}}"
Output:  "{count, plural, one {# элемент} other {# элементов}}"
```

---

## Translation Quality

These are **UI strings for a web application**: button labels, tooltips, nav items, modal titles, form placeholders, status messages, notifications.

Translate for a **polished software interface**, not word-for-word:

- **Imperative mood for actions**: "Close" → `Закрыть` (not `Закрытие`)
- **Conventional software nouns**: "Search" placeholder → `Поиск` (not `Искать`); `搜索` (not `查找`)
- **Gender agreement**: "System" in a theme selector — agree with the implied noun ("тема" → `Системная`)
- **Concise**: UI space is limited; prefer shorter natural equivalents over literal ones
- **`...` → `…`** (ellipsis character) in ALL languages
- **`--` → `—`** (em-dash) for `ru`, `ua`, `kz`

### Semantic Context from Key Names

Use parent and sibling key names to resolve ambiguity. Examples:
- Parent `chatReasoning`, siblings `thinking` / `thought` / `thoughtFor` → `Thought` means "completed reasoning", not the noun "a thought"
- Parent `themeSelector`, sibling `dark` → `system` means "system theme"

---

## Typography Rules by Locale

Apply in addition to the general rules above:

| Locale(s) | Rules |
|---|---|
| `ru`, `ua` | Ellipsis `…`, em-dash `—`; adjectives agree in gender with the noun they modify |
| `kz` | Ellipsis `…`, em-dash `—` |
| `ar` | Arabic punctuation: `؟` `،` `؛`; text is RTL — do not reorder placeholders |
| `fr` | Non-breaking space (`\u202F` or `&nbsp;`) before `?` `!` `:` `;` |
| `sc`, `tc` | Fullwidth punctuation: `。，？！` |
| `ja` | Fullwidth punctuation: `。、？！`; no spaces between words |
| `de` | All nouns capitalized |
| `th` | No spaces between words |

---

## Chat Context (AI-Agent Strings)

A key is **chat context** if its name starts with `chat` (e.g., `chatPrompt`, `chatReasoning`) **or** if it is listed in `chat_context_keys`.

For chat-context strings, the AI is the actor:

| Pattern | Meaning | ru example |
|---|---|---|
| `Thinking…` | AI is currently reasoning (imperfective, 3rd person) | `Размышляет…` |
| `Thought` | AI has finished reasoning (perfective) | `Размышление завершено` |
| `Thought for {duration}` | Reasoning took this long | `Размышление заняло {duration}` |
| `Enter your message here...` | Placeholder for user input to the AI | natural AI-chat phrasing |

**Slavic aspect rules:**
- `thinking` — imperfective, present, 3rd person: `Думає` (ua), `Myśli` (pl)
- `thought` — perfective: `Подумав` (ua), `Pomyślał` (pl)

---

## Reference Translations

| Source (en) | ru | ar | sc | pl | ua | de | fr | es | it |
|---|---|---|---|---|---|---|---|---|---|
| `Close` | `Закрыть` | `إغلاق` | `关闭` | `Zamknij` | `Закрити` | `Schließen` | `Fermer` | `Cerrar` | `Chiudi` |
| `Search…` | `Поиск…` | `بحث…` | `搜索…` | `Szukaj…` | `Пошук…` | `Suchen…` | `Rechercher…` | `Buscar…` | `Cerca…` |
| `No matches found` | `Совпадений не найдено` | `لم يتم العثور على نتائج` | `未找到匹配项` | `Nie znaleziono pasujących wyników` | `Збігів не знайдено` | `Keine Übereinstimmungen gefunden` | `Aucun résultat trouvé` | `No se encontraron coincidencias` | `Nessun risultato trovato` |
| `Switch to dark mode` | `Переключить на тёмную тему` | `التبديل إلى الوضع الداكن` | `切换到深色模式` | `Przełącz na tryb ciemny` | `Перемкнути на темну тему` | `Zu Dunkelmodus wechseln` | `Passer au mode sombre` | `Cambiar a modo oscuro` | `Passa alla modalità scura` |
| `Thinking…` | `Размышляет…` | `يفكر…` | `思考中…` | `Myśli…` | `Думає…` | `Denkt…` | `Réfléchit…` | `Pensando…` | `Sta pensando…` |
| `Thought` | `Размышление завершено` | `تم التفكير` | `思考完成` | `Myślenie zakończone` | `Подумав` | `Gedankengang beendet` | `Réflexion terminée` | `Razonamiento completado` | `Ragionamento completato` |
| `Thought for {duration}` | `Размышление заняло {duration}` | `استغرق التفكير {duration}` | `思考用时 {duration}` | `Myślenie zajęło {duration}` | `Думав {duration}` | `Denkvorgang dauerte {duration}` | `Réflexion a pris {duration}` | `El razonamiento tardó {duration}` | `Il ragionamento ha impiegato {duration}` |

---

## Self-Check Before Output

Before outputting, verify:

1. Every key from `source_messages` is present in `translations` (including deeply nested keys)
2. Key order matches the source exactly
3. No protected tokens (`{...}`, HTML tags, brand names) were altered
4. Typography rules for `target_locale` were applied
5. Response is raw JSON only — no markdown fences, no commentary
