# Port: chore(deps): migrate AI SDK to v7 (#6636)

**Upstream:** `dfbbfeb5a9ab3cbaf9582ba3393cceb1584baa5e` (nuxt/ui)
**Decision:** skip (deferred — tracked for a deliberate AI-SDK-v7 adoption pass)

## Upstream change
Major AI SDK migration:
- deps: `ai` `^6`→`^7`, `@ai-sdk/anthropic` `^3`→`^4`, `@ai-sdk/gateway`
  `^3`→`^4`, `@ai-sdk/mcp` `^1`→`^2`, `@ai-sdk/vue` `^3`→`^4` (root + docs +
  playground manifests + lockfile); root `package.json` marks `ai` an optional
  peer (`^6 || ^7`).
- docs/playground **client**: migrate every chat example + `Chat.vue` +
  playground chat/sidebar pages from the `new Chat({...})` class (`@ai-sdk/vue`)
  to the `useChat()` composable (`messages`/`status`/`error` become refs;
  `sendMessage`/`regenerate`/`stop`; `input`/`handleSubmit` removed).
- docs/playground **server**: rewrite `ai.post.ts`/`chat.post.ts`/
  `completion.post.ts` to the v7 streaming API — `system`→`instructions`,
  `stepCountIs`→`isStepCount`, `.toUIMessageStreamResponse()`→
  `toUIMessageStream()` + `createUIMessageStreamResponse()`,
  `.toTextStreamResponse()`→`createTextStreamResponse()`, `onFinish`→`onEnd`,
  model ids bumped (`claude-sonnet-4.6`→`claude-sonnet-5`).
- docs prose (chat/editor/migration guide) + the `skills/nuxt-ui` chat layout
  reference updated to match. **No `src/runtime` component change** upstream.

## b24ui decision — skip / defer
This is a **major**-version dependency migration, not a mechanical port, and it
touches b24ui surfaces upstream does not:

- **b24ui runtime uses `ai`.** `src/runtime/components/{ChatMessages,ChatMessage,
  ChatPromptSubmit}.vue` and `src/runtime/utils/ai.ts` import from `ai`. Upstream
  changed no `src/runtime` file (its runtime was already v7-safe), but b24ui
  adopting `ai@7` requires verifying b24ui's runtime still typechecks against the
  v7 type surface (`UIMessage`, `ChatStatus`, etc.) — which the upstream diff
  gives no guidance on.
- **b24ui-only `bx-assistant` module.** `docs/modules/bx-assistant/`
  (`AssistantPanel.vue`, `runtime/server/api/search.ts`,
  `runtime/composables/useAssistant.ts`) is a b24ui fork addition that uses
  `@ai-sdk/vue` + `streamText` with **no upstream counterpart** — it would need a
  hand-authored, independently-tested migration to the v7 API.
- b24ui keeps its own curated `ai`/`@ai-sdk` pins across root/docs/demo/nuxt (see
  the cd52459 §2 port); a v7 jump must be mirrored and lockfile-regenerated with
  the runtime + custom module verified end-to-end.

Deferring is consistent with prior maintainer deferrals of non-mechanical,
b24ui-divergent work (#220 InputRating, #194 Calendar). b24ui stays on `ai@6`
for now; the v7 adoption should be a deliberate, separately-tested pass that
migrates the runtime types **and** the `bx-assistant` module, not a diff replay.
(Also noted: verbatim upstream `.patch` fetch is currently egress-blocked, so a
faithful large-file replay isn't cleanly available this session.)

No `src`/manifest change — bookkeeping only; ledger `decision: skip`, cursor
advances. Tracked for a future AI-SDK-v7 migration task.
