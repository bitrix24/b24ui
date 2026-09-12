# Telegram Release Post

Rules for preparing the community release announcement in Telegram. The final message is handed to a maintainer, who pastes it manually into the channel — the agent never posts anything itself.

## 0. Output format

- The message is returned as **ready-to-paste text**. The agent does NOT post it, does NOT add "click here" links, and does NOT wrap it with meta-commentary ("here is the message", "let me know if…").
- Markup must be **Telegram-friendly when pasted manually**: emoji section markers, `` `inline` `` code, fenced code blocks, `**bold**`. **No** `#` markdown headings and **no** HTML — they do not render when copied from a markdown source.
- Everything must fit in a **single copy block**. No commentary inside the block.

## 1. Language and tone

- Language — **Russian**.
- Body tone — professional and to the point. **No jokes in the prose.**
- Humor is allowed **only inside code** (comments, `label` / `placeholder` / variable names): light, on the "developer / Bitrix24 / CRM / deadlines / production" spectrum. Never about people or roles, never about AI, never negative about Bitrix24, never about competitors.
- Bitrix24 is always framed positively — it does not "crash", does not "lag".

## 2. Focus and framing

- **Practice-first**: describe what the developer can now DO, not how the refactor works under the hood.
- The header carries the version; the first line is the one-sentence value of the release.
- **Do not spotlight breaking changes.** Frame them as a new possibility ("now available / now works"), no "migration" section.
- **Skip experimental or non-mass features.** If something is raw or explicitly marked "later" by the maintainer — drop it.
- Source of truth for content is the version section in `CHANGELOG.md`: **curate and translate, do not copy verbatim**. Internal `chore` / CI / test-only items do not belong in the message.

## 3. Structure

1. `🚀 **b24ui X.Y.Z**` plus a one-line summary.
2. **4–6 numbered "feature → example" blocks**: 1–2 sentences (what it enables) plus a short Vue snippet.
3. `Ещё в релизе:` — one paragraph about important fixes / security / SPA / SSR / CSP (no code). Omit if nothing critical shipped.
4. `Под капотом:` — one line naming the major dependency version bumps (Nuxt, Vite, reka-ui, Tiptap) plus one memorable detail (migration, `-N packages`, dropped stack). Omit if the release is dependency-quiet.
5. Install command:
   ```bash
   pnpm add @bitrix24/b24ui-nuxt@latest
   ```
6. `📋 Полный список изменений — CHANGELOG` (link to `/blob/main/CHANGELOG.md`).
7. AI hint block (see §5).

## 4. Code in examples (hard requirements)

- **Only real components, props, slots and events.** Verify against the outgoing version's `CHANGELOG.md` and against `src/runtime/components/*.vue` / `docs/content/docs/**`. If in doubt, do not show it.
- Components are prefixed with **`B24`** (`<B24InputRating>`, `<B24Listbox>`).
- **Do not invent props.** The only exception is a deliberately-fake "don't do this" example, and only with an explicit comment saying so.
- Vue examples **must pass the project's typecheck**: before delivery, drop them into a temporary file (e.g. `playgrounds/nuxt/app/pages/_release-check.vue`), run `pnpm typecheck`, then remove the file.
- **Architectural truth:** b24ui applications live **inside an iframe** on Bitrix24. Native CRM entity cards are opened by the parent SDK, **not** by `<B24Modal>`. `B24Modal` / `B24Slideover` are only for the app's own UI (settings, filters, wizards, previews, custom forms).
- **Scenarios come from a real product app:** task statuses, priorities, ratings, dashboards, assistant chat, settings, filters. Never "opening a CRM deal card via a modal".
- Placeholders for data are neutral — no real portals or tokens.
- A snippet may carry a **playground link** — `Открыть в [песочнице](https://bitrix24.github.io/b24ui/play/#<hash>)` on the line after the code block. The hash is produced by the playground itself (**Share**), never hand-built. Confirm it holds the same snippet that is shown above it, or leave the link out. The hash is fflate zlib inside base64 (`docs/app/utils/playground.ts`), so `atob` alone prints binary — inflate it:
  ```bash
  python3 -c "import base64,zlib,sys;print(zlib.decompress(base64.b64decode(sys.argv[1])).decode())" '<hash>'
  ```

## 5. AI hint block

- End the message with a ready-to-use **prompt** encoded in **base64** (trivial to decode) — the reader pastes the decoded line into their assistant and it loads both the release notes and the docs on its own.
- The prompt is a single sentence and carries **two links**: the release notes for the shipped version, and `llms.txt`. Template — substitute the version in both places:

  ```
  Study the @bitrix24/b24ui-nuxt X.Y.Z release notes at https://github.com/bitrix24/b24ui/releases/tag/vX.Y.Z and use the Bitrix24 UI documentation from https://bitrix24.github.io/b24ui/llms.txt to apply the new features in my project.
  ```

- The package name is **`@bitrix24/b24ui-nuxt`** — that is what is published and what the post's own `pnpm add` line installs. `@bitrix24/b24ui` does not exist on the registry.
- The release-notes link is **pinned to the tag**, not `blob/main/CHANGELOG.md` — this holds for the `📋 Полный список изменений` line in the body too. An old post must keep pointing at its own release, not at whatever shipped since.
- It is written in **English** — it is a prompt, not body copy — and it is **re-encoded for every release**, because the version is inside it. There is deliberately no literal to copy from this file.
- Formatting is minimal — **no** "decode this and forward it" instructions. Just `atob`:
  ```
  🔐 Для вашего ИИ — atob:
  ```
  ```js
  atob('<base64 of the prompt above>')
  ```
- Verify the round-trip before delivery: `node -e "console.log(atob(process.argv[1]))" '<string>'` must print the prompt, and both links in it must open.

## 6. Emoji vocabulary (consistency across releases)

| Section / topic | Emoji |
|---|---|
| Header / sign-off | 🚀 |
| Rating / feedback components | ⭐ |
| Lists / selection | 📋 |
| Calendar / dates | 📅 |
| Chat / AI / assistant | 🤖 💬 |
| Editor / text | ✍️ |
| Empty / loading | ⏳ |
| Bug fixes header | 🐛 |
| Perf | ⚡ |
| Under the hood / deps | 🛠 |
| Cleanup / dropped | 🧹 |
| Install / npm | 📦 |
| Changelog / link | 📋 |
| AI base64 block | 🔐 |

## 7. Anti-patterns (do NOT do this)

- ❌ Open native CRM cards via `<B24Modal>` — those are the parent SDK's job in the iframe.
- ❌ 💜 in the sign-off — the only sign-off emoji is `🚀`.
- ❌ Marketing/promo examples like `analytics.track('user-escaped-pricing')`.
- ❌ Made-up props, events, or slots.
- ❌ A flat CHANGELOG dump — the message should **tell a story**, not enumerate everything.
- ❌ More than 6 headline features.
- ❌ English body copy (identifiers and code are fine).
- ❌ Jokes in the prose, jokes about AI, jokes about roles (lead/junior), anything negative about Bitrix24.
- ❌ "Migration" / "breaking" / "experimental" sections — do not spotlight.
- ❌ Internal details: PR numbers, CI, model ids, session URLs.

## 8. Final template

````
🚀 **b24ui X.Y.Z** — <one-line summary>.

1. **<emoji> `<Feature1>`** — <what it enables, 1–2 lines>.
```vue
<Snippet1 />
```

2. **<emoji> `<Feature2>`** — <what it enables>.
```vue
<Snippet2 />
```

3. **<emoji> `<Feature3>`** — <what it enables>.
```vue
<Snippet3 />
```

4. **<emoji> `<Feature4>`** — <what it enables>.
```vue
<Snippet4 />
```

Ещё в релизе: <one paragraph on important fixes / SPA / SSR / CSP / a11y — only if any>.

🛠 Под капотом: **Nuxt X.Y.Z**, **Vite vN**, **reka-ui vX.Y.Z**, **Tiptap X.Y** <+ one memorable detail>.

```bash
pnpm add @bitrix24/b24ui-nuxt@latest
```

📋 Полный список изменений — [CHANGELOG](https://github.com/bitrix24/b24ui/releases/tag/vX.Y.Z).

🔐 Для вашего ИИ — atob:
```js
atob('<base64 of the section 5 prompt, carrying this version>')
```
````

## 9. Pre-delivery checklist

- [ ] All referenced components / props / slots exist (cross-checked against the outgoing `CHANGELOG.md` and `src/runtime/components/`)
- [ ] All Vue snippets pass `pnpm typecheck` — zero errors
- [ ] Every playground link came from **Share**, and inflating its hash yields the snippet printed above it
- [ ] No `<B24Modal>` opening native CRM cards
- [ ] Version and `pnpm add` command match the shipped release
- [ ] No jokes in the prose; humor lives only in code; no roles / AI / competitors
- [ ] Breaking changes framed softly; experimental features excluded
- [ ] No internal details (PR numbers, CI, session URLs)
- [ ] Base64 string decodes to the section 5 prompt, carries the shipped version, and both links in it open (`CHANGELOG.md`, `https://bitrix24.github.io/b24ui/llms.txt`)
- [ ] Sign-off emoji is `🚀`, not `💜`
- [ ] The message is self-contained and pastes as a single chunk
- [ ] No more than 6 headline features
- [ ] No `#` headings or HTML anywhere in the body
