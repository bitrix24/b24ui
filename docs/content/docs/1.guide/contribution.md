---
title: Contribution Guide
description: 'A detailed guide on how to contribute to Bitrix24 UI, including insights on project structure, development workflow, and best practices.'
outline: deep
---

# Contribution Guide
The goal of this project is to provide components identical to Bitrix24 to enhance the user experience and simplify the development of applications for Bitrix24.

We have chosen [Nuxt UI v3](https://ui3.nuxt.dev/) as the foundation.

We are just beginning our journey, and there is still much work ahead in writing and testing. But we have already taken the first step. Join us!

We welcome your contributions in the form of bug reports, pull requests, and feedback to make this library even better.

::: danger Attention
Before reporting a bug or requesting a feature, make sure that you have read through our [documentation](https://bitrix24.github.io/b24ui/) and existing [issues](https://github.com/bitrix24/b24ui/issues?q=is%3Aissue%20is%3Aopen%20sort%3Aupdated-desc%20label%3Av3).
:::

## Project Structure

Here's an overview of the key directories and files in the Bitrix24 UI project structure:

### Documentation

The documentation lives in the `docs` folder as a `vitepress`. See the [Getting Started](https://vitepress.dev/guide/getting-started) for details on how it works.

### Module

The module code resides in the `src` folder. Here's a breakdown of its structure:

```bash
├── plugins/
├── runtime/
│   ├── components/        # Where all the components are located
│   │   ├── Advice.vue
│   │   ├── Alert.vue
│   │   └── ...
│   ├── composables/
│   ├── locale/
│   ├── plugins/
│   ├── types/
│   ├── utils/
│   └── vue/
│       ├── components/
│       └── plugins/
├── theme/                 # This where the theme for each component is located
│   ├── Advice.ts          # Theme for Advice component
│   ├── alert.ts
│   └── ...
└── module.ts
```

## CLI

To make development easier, we've created a CLI that you can use to generate components and locales. You can access it using the `bitrix24-ui make` command.

First, you need to link the CLI to your global environment:

```sh
npm link
```

### Components

You can create new components using the following command:

```sh
bitrix24-ui make component <name> [options]
```

Available options:

- `--primitive` Create a primitive component
- `--pro` Create a pro component
- `--prose` Create a prose component (requires `--pro`)
- `--content` Create a content component (requires `--pro`)
- `--template` Only generate specific template (available templates: `playground`, `docs`, `test`, `theme`, `component`)

Example:

```sh
# Create a basic component
bitrix24-ui make component my-component

# Create a pro component
bitrix24-ui make component page-section --pro

# Create a pro prose component
bitrix24-ui make component heading --pro --prose

# Create a pro content component
bitrix24-ui make component block --pro --content

# Generate only documentation template
bitrix24-ui make component my-component --template=docs
```

::: info
When creating a new component, the CLI will automatically generate all the necessary files like the component itself, theme, tests, and documentation.
:::

### Locales

You can create new locales using the following command:

```sh
bitrix24-ui make locale --code <code> --name <name>
```

::: tip
Learn more about **i18n** in the documentation^ [Nuxt](/docs/guide/i18n-nuxt/#locale) or [Vue](/docs/guide/i18n-vue/#locale) app.
:::

## Submit a Pull Request (PR)

Before you start, check if there's an existing issue describing the problem or feature request you're working on. If there is, please leave a comment on the issue to let us know you're working on it.

If there isn't, open a new issue to discuss the problem or feature.

### Local Development

To begin local development, follow these steps:

#### 1.Clone the `@bitrix24/b24ui-nuxt` repository to your local machine

```sh
git clone https://github.com/bitrix24/b24ui.git
```

#### 2.Enable [Corepack](https://github.com/nodejs/corepack)

```sh
corepack enable
```

#### 3.Install dependencies

```sh
pnpm install
```

#### 4.Generate type stubs

```sh
pnpm run dev:prepare
```

#### 5.Start development

- To work on the **documentation** located in the `docs` folder, run:

```sh
pnpm run docs:dev
```

- To test the Nuxt components using the **playground**, run:

```sh
pnpm run dev
```

- To test the Vue components using the **playground**, run:

```sh
pnpm run dev:vue
```

::: info
If you're working on implementing a new component, check the [CLI](#cli) section to kickstart the process.
:::

### IDE Setup

We recommend using VSCode alongside the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). You can enable auto-fix and formatting when saving your code. Here's how:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true
  }
}
```

::: warning
Since ESLint is already configured to format the code, there's no need for duplicating functionality with **Prettier**. If you have it installed in your editor, we recommend disabling it to avoid conflicts.
:::

### Linting

You can use the `lint` command to check for linting errors:

```sh
pnpm run lint # check for linting errors
pnpm run lint:fix # fix linting errors
```

### Type Checking

We use TypeScript for type checking. You can use the `typecheck` command to check for type errors:

```sh
pnpm run typecheck
```

### Testing

Before submitting a PR, ensure that you run the tests for both `nuxt` and `vue`:

```sh
pnpm run test # for Nuxt
pnpm run test:vue # for Vue
```

::: tip
If you have to update the snapshots, press `u` when running the tests. Or run `pnpm run test:save`
:::

### Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages, which allows a changelog to be auto-generated based on the commits. Please read the [guide](https://www.conventionalcommits.org/en/v1.0.0/#summary) through if you aren't familiar with it already.

- Use `fix` and `feat` for code changes that affect functionality or logic
- Use `docs` for documentation changes and `chore` for maintenance tasks

### Making a Pull Request

- Follow along the [instructions](https://github.com/bitrix24/b24ui/blob/main/.github/PULL_REQUEST_TEMPLATE.md?plain=1) provided when creating a PR

- Ensure your PR's title adheres to the [Conventional Commits](https://www.conventionalcommits.org/) since it will be used once the code is merged.

- Multiple commits are fine; no need to rebase or force push. We'll use `Squash and Merge` when merging.

- Ensure `lint`, `typecheck` and `tests` work before submitting the PR. Avoid making unrelated changes.

We'll review it promptly. If assigned to a maintainer, they'll review it carefully. Ignore the red text; it's for tracking purposes.

Thanks
