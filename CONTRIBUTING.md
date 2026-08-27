# Contributing to Bitrix24 UI

Thanks for being here. This file is deliberately short: it is a map, not a
guide. Everything it points at is written properly somewhere else, and this
page exists so GitHub can surface it — the "Contributing" link in the sidebar
and the banner on a new issue both look for a file with this name.

## Start here

| I want to… | Read |
|---|---|
| set up the repository and run it | [Contribution guide](https://bitrix24.github.io/b24ui/docs/getting-started/contribution/) |
| understand how the project is laid out | [`AGENTS.md`](AGENTS.md) |
| add or change a component | [Component structure](.github/contributing/component-structure.md) |
| change how something looks | [Theme structure](.github/contributing/theme-structure.md) |
| write or update tests | [Testing](.github/contributing/testing.md) |
| write documentation | [Documentation](.github/contributing/documentation.md) |
| understand how a release happens | [Releasing](.github/contributing/releasing.md) |

`AGENTS.md` is written for AI coding agents and is picked up automatically by
most of them. It is also the fastest orientation for a human — project layout,
commands, conventions, in one file.

## Reporting a bug

[Open a bug report.](https://github.com/bitrix24/b24ui/issues/new?template=bug-report.yml)

The form asks for a reproduction, and it asks because that is what decides
whether the report can be acted on. A component name and a description of what
looked wrong is usually not enough to tell a bug in this library from a bug in
the application using it — the shortest useful reproduction is a
[StackBlitz](https://stackblitz.com/) or a small repository someone can open
and see the problem in.

If you are not sure whether it is a bug in this library or in the application
around it, open the report anyway and say so — a report that names the
uncertainty is more useful than a question that never gets asked.

## Suggesting something

[Open a feature request.](https://github.com/bitrix24/b24ui/issues/new?template=feature-request.yml)

This library is a fork of [Nuxt UI](https://github.com/nuxt/ui), tracked and
ported deliberately rather than merged wholesale. If the thing you want exists
upstream, say so in the request — it changes the work from "design and build"
to "port and reconcile", which is a different and usually much shorter
conversation.

## Opening a pull request

Before you start on anything substantial, open an issue. It is not
bureaucracy: this repository carries divergences from upstream that are
recorded and intentional, and the fastest way to lose an afternoon is to fix
something that is deliberately the way it is.

Then:

- **Node** `^20.19.0 || >=22.12.0`, **pnpm** `11.20.0` (the version is pinned in
  `package.json`; `corepack enable` picks it up).
- Run `pnpm run dev:prepare` after installing. Nothing typechecks before it.
- `pnpm run lint`, `pnpm run typecheck` and `pnpm run test run` all have to
  pass locally. CI runs more than that: `pnpm run test:coverage` in place of
  the plain run, so a large new area arriving untested is red — see
  [Testing → Coverage](.github/contributing/testing.md#coverage) — plus
  `pnpm test:module` and `pnpm build`, both of which can fail on a branch where
  the three commands above are green.
- **The PR title is a [conventional commit](https://www.conventionalcommits.org/)**
  and it is load-bearing. The title of the squashed commit is what generates the
  changelog and decides the version bump, so a title that does not parse is
  dropped from the release notes silently. A CI check enforces the format.
- Snapshots are regenerated with `pnpm run test:update` — the whole suite, never
  a path. [Why.](.github/contributing/testing.md#snapshot-updates)

The pull request template asks for a linked issue and a description. Both are
read.

## Code of conduct

There is no formal one yet. Be decent to each other in the meantime — the
usual reading applies: assume good faith, argue with the work rather than the
person, and take the hint when someone asks you to drop it.

## Security

**Please do not open a public issue for a vulnerability.** Report it privately
through [Security → Report a vulnerability](https://github.com/bitrix24/b24ui/security/advisories/new).

[SECURITY.md](SECURITY.md) covers what to include, what counts as a
vulnerability in a component library, and which versions get fixes.
