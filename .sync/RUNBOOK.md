# Sync pipeline — Runbook

Quick incident playbook for the nuxt/ui → b24ui sync. See [`PLAN.md`](./PLAN.md) for the design.

| Symptom | Diagnosis | Fix |
|---|---|---|
| Dispatcher does nothing | `sync_enabled: false` in [`nuxt-ui.json`](./nuxt-ui.json) (kill-switch) | Set `sync_enabled: true` and commit. |
| Dispatcher does nothing, switch is on | An open `nuxt-sync` PR already exists (gate: one at a time) | Review/merge or close the open PR. |
| Two PRs opened at once | `concurrency` group missing/misconfigured | Ensure `concurrency: { group: sync-pipeline, cancel-in-progress: false }` on both dispatcher and porter. |
| Cursor not advancing after merge | `sync-on-merge.yml` failed, or PR was **closed without merge** | Re-run the merge workflow; remember closing ≠ merging. Manually set `cursor`/`processed[sha]` if needed. |
| Duplicate PR for an already-merged SHA | `sync-on-merge` failed to write the ledger | Idempotency: dispatcher skips `processed[sha]`. Add the SHA to `processed` manually, close the dup. |
| Porter fails: `branch already exists` | Previous run left `sync/nuxt-<sha>` | Delete the stale branch; porter should recreate. |
| Dispatcher errors: cursor SHA missing | Upstream force-pushed `v4` | `git cat-file -e <cursor>` fails → pick the nearest surviving ancestor on `v4`, update `cursor`, open a tracking issue. |
| PR has `security-review-required` | A new `v-html`/`innerHTML` was introduced | Human security review before merge; confirm sanitization (see [`PORTING.md`](./PORTING.md) §5). |
| Gates fail on `typecheck`/`lint`/`test` | Imperfect port | Fix on the `sync/*` branch; do not merge red. |
| API budget exhausted | Too many Claude runs | Verify the pre-filter is skipping `src/`-untouched commits without invoking Claude; flip kill-switch if needed. |
