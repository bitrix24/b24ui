# No-op: chore(release): v4.11.0

**Upstream:** `f62aa143fc3a0e6e66c81fca715dae0c1cf5fec2` (nuxt/ui)
**Decision:** no-op — upstream's release bookkeeping

## Upstream change

Two files: `package.json` `version` to `4.11.0`, and 39 lines of generated
entries appended to `CHANGELOG.md`.

## b24ui

Nothing to take. This fork has its own release train — release-please raises the
version PR here, and `CHANGELOG.md` is generated from **our** conventional
commits, not upstream's. Copying either would state a version this package has
never published and credit changes it does not contain.

For the record, the fork's own numbering is unrelated: `main` is at `2.12.0`,
released today, which is the version carrying Splitter, ProgressGroup and
`experimental.componentDetection` here.

Same call as every previous upstream release commit in the ledger. Recorded
rather than skipped silently so the next porter does not re-derive it.
