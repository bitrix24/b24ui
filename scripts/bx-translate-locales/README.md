# bx-translate-locales

Internal tool that auto-translates UI locale files using Claude Code.

It reads the English source locale, calls the `/bx-translate-locales` Claude Code skill once per target language, validates the output, and writes the result back to the `.ts` locale files. ESLint then normalises code style.

---

## How it works

```
make.py
  │
  ├─ parse  src/runtime/dictionary/i18n.ts      → list of all locales
  ├─ parse  src/runtime/locale/<source>.ts      → source messages dict
  │
  └─ for each target locale (in parallel):
       │
       ├─ write  scripts/bx-translate-locales/.temp/translate-<code>.json
       │         (payload: source messages + typography rules + chat context)
       │
       ├─ call   claude -p /bx-translate-locales <temp-file>
       │         (skill: reads temp file → translates → returns raw JSON)
       │
       ├─ validate  all source keys present in translation
       ├─ write     src/runtime/locale/<target>.ts  (atomic)
       └─ cleanup   temp file

  └─ eslint --fix  src/runtime/locale/
```

The skill (`skills/bx-translate-locales/SKILL.md`) is a Claude Code slash command with `allowed-tools: Read` — it can only read the temp file, nothing else.

---

## Requirements

- Python 3.11+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) CLI (`claude` on PATH, logged in)
- pnpm (for ESLint post-processing — `pnpm exec eslint`)

---

## Usage

```bash
# Translate all active locales from English (default)
python scripts/bx-translate-locales/make.py

# Translate from a different source locale
python scripts/bx-translate-locales/make.py ru
```

No dependencies to install — the script uses only the Python standard library.

---

## Configuration

### Environment variables

| Variable | Default | Description |
|---|---|---|
| `BX_TRANSLATE_WORKERS` | `5` | Max locales translated in parallel |
| `BX_TRANSLATE_TIMEOUT` | `120` | Seconds before a Claude subprocess is killed |
| `BX_TRANSLATE_RETRIES` | `2` | Retry attempts on transient Claude errors |

```bash
# Example: slower machine, more retries
BX_TRANSLATE_WORKERS=2 BX_TRANSLATE_TIMEOUT=180 BX_TRANSLATE_RETRIES=3 \
  python scripts/bx-translate-locales/make.py
```

### Skipping a locale

Add the filename to `IGNORED_FILES` in `make.py`:

```python
IGNORED_FILES: set[str] = {
    "de.ts",   # already translated manually
    "fr.ts",   # in review
    # "ru.ts", # commented out = will be translated
}
```

### Enabling a locale that was skipped

Comment out its line in `IGNORED_FILES` and re-run the script.

### Adding a completely new locale

1. Add an entry to `src/runtime/dictionary/i18n.ts`:
   ```ts
   { code: 'pl', name: 'Polski', file: 'pl.ts' }
   ```
2. Run the script — it will create `src/runtime/locale/pl.ts` automatically.

For RTL locales (`ar`, `he`, `fa`, `ur`) the script adds `dir: 'rtl'` to the generated file automatically.

---

## File layout

```
scripts/bx-translate-locales/
├── make.py                  # main script
├── README.md                # this file
├── translate.log.jsonl      # error log (created on first error)
└── .temp/                   # temp payload files (auto-cleaned after each run)

skills/bx-translate-locales/
└── SKILL.md                 # Claude Code skill — the translation prompt

src/runtime/locale/
├── en.ts                    # source (read-only for this script)
├── ru.ts
├── pl.ts
└── ...                      # generated / updated by this script
```

---

## Payload format

Each Claude invocation receives a JSON file like this:

```json
{
  "source_locale": "en",
  "target_locale": "pl",
  "target_name": "Polski",
  "source_messages": {
    "alert": { "close": "Close" },
    "chatPrompt": { "placeholder": "Enter your message here…" }
  },
  "chat_context_keys": ["chatPrompt", "chatReasoning"],
  "typography_rules": "Use ellipsis `…` (not `...`)."
}
```

The skill returns:

```json
{
  "translations": {
    "alert": { "close": "Zamknij" },
    "chatPrompt": { "placeholder": "Wpisz wiadomość…" }
  }
}
```

The script validates that every key path from `source_messages` is present in `translations` before writing the file. A locale with missing keys raises an error and is not written to disk.

---

## Translation quality

The skill translates for a polished software UI, not word-for-word. A few things it handles automatically:

- **Placeholders** (`{duration}`, `{count}`, `{label}`) are preserved verbatim.
- **ICU plural expressions** (`{count, plural, one {# item} other {# items}}`) — the ICU structure is kept; only the human-readable text inside each clause is translated.
- **HTML tags** inside strings are preserved.
- **Brand names** (`Bitrix24`, `AI`, `CRM`) are never translated.
- **Chat-context keys** (those starting with `chat` or listed in `chat_context_keys`) get extra instructions: the AI is the actor, so "Thinking…" becomes "Размышляет…" rather than "Думаю…".
- **Typography** is locale-specific: em-dash for `ru`/`ua`/`kz`, Arabic punctuation for `ar`, fullwidth punctuation for `ja`/`sc`/`tc`, non-breaking space before `:!?;` for `fr`, noun capitalisation for `de`, etc.

---

## Error handling

Errors per locale are printed to stdout and appended to `translate.log.jsonl` (one JSON object per line). The script continues with remaining locales and exits with a summary.

A failed locale leaves the existing `.ts` file on disk untouched (writes are atomic).

On transient Claude errors the script retries with exponential back-off: 5 s → 10 s → … up to `BX_TRANSLATE_RETRIES` times.

---

## Troubleshooting

**`claude: command not found`**
Install and log in to Claude Code: https://docs.anthropic.com/en/docs/claude-code/overview

**`No contentLocales entries found in i18n.ts`**
The regex parser expects entries in the form `{ code: '…', name: '…', file: '…' }`. Check that `src/runtime/dictionary/i18n.ts` follows this format.

**`Translation is missing N key(s): …`**
The model dropped some keys. Increase `BX_TRANSLATE_TIMEOUT` or `BX_TRANSLATE_RETRIES` and re-run. If it happens consistently for a specific locale, check the source file for unusual string patterns.

**`claude exited 1` / permission errors**
The skill uses `--dangerously-skip-permissions` to run unattended. Make sure your Claude Code session is authenticated (`claude auth`).

**ESLint warnings after a run**
These are style warnings, not errors. The generated files are valid TypeScript. You can tighten or relax the ESLint config independently of this script.
