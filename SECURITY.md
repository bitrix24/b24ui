# Security Policy

## Reporting a vulnerability

**Please do not open a public issue.**

Report it privately through GitHub:
[**Security → Report a vulnerability**](https://github.com/bitrix24/b24ui/security/advisories/new).
The thread there is visible only to you and the maintainers until a fix is
released, and it is where the advisory and any CVE are published from
afterwards.

You need a GitHub account, and your username is visible to the maintainers —
private, not anonymous. What is private is the report: nothing about it reaches
the public repository until we publish it together.

Useful to include, in rough order of how much they help:

- what an attacker can do with it, and to whom;
- steps to reproduce, or a proof of concept;
- the version of `@bitrix24/b24ui-nuxt` you saw it in;
- whether it also reproduces in [Nuxt UI](https://github.com/nuxt/ui). This
  library is a fork, and a vulnerability inherited from upstream has to be
  reported there too — we will coordinate rather than leave it to you.

We will acknowledge the report, investigate, and agree a disclosure timeline
with you.

This is a small project and there is no on-call rotation behind that sentence,
so here is the number rather than "a reasonable window": **if you have heard
nothing after 90 days, consider yourself free to disclose.** You should not
have to guess how long to wait, and silence from us is not a reason for you to
stay silent indefinitely.

## What counts as a vulnerability here

This is a UI component library. It renders in the browser, inside applications
that hold a Bitrix24 portal's credentials, so the interesting failures are the
ones that cross that boundary:

- **Markup that escapes escaping.** A prop, slot or `items` value that reaches
  the DOM unescaped is script execution in a page holding a portal session.

  `CommandPalette`'s `labelHtml`, `suffixHtml` and `descriptionHtml` are the
  exception: they render with `v-html` on purpose, their JSDoc says so, and
  sanitising what you put in them is the caller's job. Unescaped output from
  any *other* prop is a defect here.
- **A `to` that becomes a `javascript:` URL**, or any link prop that can be
  steered somewhere the author did not intend.
- **A secret reaching somewhere it should not** — a webhook path or an OAuth
  token surfacing in rendered output, in an error message, or in a value the
  component copies to the clipboard. A webhook URL is full access to a portal.
- **Prototype pollution** through the dotted-path helpers — `get` and `set` on
  `./utils`, `getAtPath` and `setAtPath` on `./utils/form`. All four share one
  guard and the guard is tested, so a way around it is worth reporting.
- **A dependency advisory that this package actually reaches.** Not every
  advisory in the tree is exploitable through this library; if you can show a
  path from our API to it, that is the part worth writing down.

Things that are worth an ordinary issue rather than a security report: styling
bugs, accessibility defects, a component that crashes on bad input without
leaking anything, and advisories in dev-only dependencies that never ship.

## Supported versions

| Version | Supported |
|---|---|
| 2.x | ✅ |
| 1.x and 0.x | ❌ |

Fixes go to the latest published `2.x` and are released from `main`. There is
no long-term-support branch: if you are on an older `2.x`, upgrading within the
major is the fix.

Node `^20.19.0 || >=22.12.0`, as `package.json` declares. A report against a
Node version outside that range is still welcome, but the fix may be "upgrade
Node".
