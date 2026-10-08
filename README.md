# Desyne

Accessible React components built on [React Aria](https://react-aria.adobe.com/),
styled with Tailwind CSS v4 and [shadcn/ui](https://ui.shadcn.com) tokens, and installed
as source you own through the shadcn CLI.

- **Docs:** [desyne.dev](https://desyne.dev)
- **Pro blocks & templates:** [pro.desyne.dev](https://pro.desyne.dev) (separately licensed, not in this repo)

## Install a component

Desyne is a [shadcn registry](https://ui.shadcn.com/docs/registry) served at
`https://desyne.dev/r/{name}.json`.

```bash
npx shadcn@latest add https://desyne.dev/r/button.json
```

Or add the `@desyne` namespace to your `components.json`:

```json
{
  "registries": {
    "@desyne": "https://desyne.dev/r/{name}.json"
  }
}
```

```bash
npx shadcn@latest add @desyne/button @desyne/dialog
```

See [Installation](https://desyne.dev/docs/installation) and
[CLI & registry](https://desyne.dev/docs/cli) for details.

## Repository

| Path | What it is |
| --- | --- |
| `packages/ui` | Components, `lib/*`, theme CSS, free blocks and registry metadata (`src/registry.ts`) |
| `apps/docs` | The docs site (Next.js + Fumadocs); also serves the registry at `/r/*.json` |
| `scripts/build-registry.ts` | Generates `registry.json` from `packages/ui/src/registry.ts` |

## Local development

Requires [Bun](https://bun.sh) 1.4+.

```bash
bun install
bun run registry:build   # registry.json → apps/docs/public/r
bun dev                  # docs on http://localhost:3000
bun run lint             # Biome
bun run typecheck
```

See [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

### Deploying the docs

The docs deploy to Vercel with Root Directory `apps/docs`; `apps/docs/vercel.json`
sets the install command (`bun install`) and build command
(`cd ../.. && bun run registry:build && cd apps/docs && bun run build`).

## Acknowledgements

- **[React Aria Components](https://react-aria.adobe.com/)** by Adobe — every interactive
  component is built on its primitives.
- **[shadcn/ui](https://ui.shadcn.com)** by shadcn — the copy-the-source model, the CLI
  and registry format, and the token names.
- **[Intent UI](https://intentui.com)** by Irsyad A. Panjaitan — showed what a polished,
  React Aria–based take on the shadcn approach can look like.

## License

[MIT](LICENSE) © 2026 Maithra Digital Pvt. Ltd. Desyne Pro blocks and templates are
licensed separately.
