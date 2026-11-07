# Yves Roulin's website

Next.js portfolio and statically generated blog, with a local Keystatic editor.
Use Node.js 24 or newer and pnpm 11 or newer.

## Run locally

```sh
pnpm install
pnpm dev
```

- Website: http://localhost:3000
- Blog: http://localhost:3000/blog
- Article editor: http://localhost:3000/keystatic

The editor runs on your computer and saves files directly into this repository.
It needs no CMS account, GitHub login, database, or internet connection to write
once dependencies are installed. Keep the development server on your own machine.

### Access from another computer

Local mode has no login. Anyone who can reach its API can change the article
files. The development command therefore binds to `127.0.0.1` only. Do not
expose it with `--hostname 0.0.0.0` or an unauthenticated reverse proxy.

For this machine, open an authenticated SSH tunnel from your computer:

```sh
ssh -N -L 127.0.0.1:3001:127.0.0.1:3000 alain024@claude.wyvern-caiman.ts.net
```

Then open http://localhost:3001/keystatic and keep the SSH session running.
SSH controls access. The browser treats localhost as a secure context, allowing
the Web Crypto API required by Keystatic. An HTTP Tailscale hostname or IP does
not qualify, even though Tailscale encrypts the network connection.

The production static export contains neither the editor nor its API. If a
hosted editor with a login is needed later, use Keystatic's GitHub mode or an
authenticated HTTPS access layer rather than exposing local mode.

## Write an article

1. Open `/keystatic`, select **Articles**, and create an article or edit the
   included **Getting started** draft.
2. Add a title, description, article date, and body. Tags and images are optional.
   Add a useful description for a cover image unless it is purely decorative.
3. Save your changes. Articles live in `content/posts/*.mdoc`, with metadata at
   the top and Markdoc content below. Images live in `public/images/blog/`.
4. Leave **Published** off while drafting. Drafts stay out of the blog index and
   article URLs, locally and in the production export.
5. To check the article before deploying, turn **Published** on, save, and open
   `/blog` locally. You can turn it off again to return to a draft.

The article date controls display and sort order, newest first. It does not
schedule publication. The **Published** checkbox controls visibility.

Draft files committed to a public repository can still be read on GitHub.
The draft setting only hides them from the website.

## Publish

Turn **Published** on and save, then run:

```sh
pnpm test
pnpm lint
pnpm build
git status
git add content/posts
git commit -m "Publish article"
git push
```

Also stage any new images in `public/images/blog`. Review the staged files
before committing. Article edits and deletions follow the same process.

The full lint command currently reports existing errors in
`components/lightning-tip.tsx` and `components/ui/floating-paths.tsx`.
The blog files pass lint independently.

`pnpm build` exports the website into `out/`. A Git push publishes the changes
only if your hosting is configured to build and deploy that branch automatically.
Otherwise, deploy `out/` yourself. No hosting integration is configured by this
repository. Build-time font downloads may require internet access.

## Route conventions

Public App Router files use `.site.tsx` or `.site.ts`, such as
`app/page.site.tsx` and `app/blog/[slug]/page.site.tsx`. Local editor routes use
`.local.tsx` or `.local.ts`. `next.config.ts` includes local routes only for
`next dev`, so neither the editor nor its filesystem API enters a production
build. Ordinary components and utilities keep their usual `.tsx`/`.ts` names.
Development uses `tsconfig.dev.json` so its editor route types stay separate
from the production route types checked with `tsconfig.json`.

The production site is static. `next start` is for server deployments and does
not serve this export. Use a static web server or your hosting provider for `out/`.
