# Port: feat(Modal/Slideover): support `unmountOnHide` prop (#6626)

**Upstream:** `4deb61b91cc22ec1bbda80faa35f13a267c8ad1d` (nuxt/ui)
**Decision:** no-op
**Combined into:** the PR #6626 marker bookkeeping PR (with `54125f3f`).

## Upstream change
Empty commit — the `.patch` has no diff (header + "Closes #5839 / #3605" only).
A marker/squash artifact of PR #6626.

## b24ui decision — no-op
The actual `unmountOnHide` feature (Modal/Slideover forwarding + `DialogPortal`
`:force-mount`, docs, SSR tests) landed in `1ea8a98f` ("chore(deps): update
reka-ui", b24ui PR #214). This commit carries no changes, so there is nothing
to port.

No file change — bookkeeping only.
