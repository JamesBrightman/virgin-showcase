# Virgin Showcase

An internal, lightweight wall for reviewing selected Virgin Atlantic and related social posts.

Each card starts as a local thumbnail. The live platform embed is requested only when a visitor opens a card, keeping the initial page small and fast.

## Live site

[View the Virgin Showcase](https://jamesbrightman.github.io/virgin-showcase/)

## Run locally

```bash
npm install
npm run dev -- --port 3000
```

Build the production site with:

```bash
npm run build
```

## Add content

Invited GitHub collaborators should use the repository's **Add social post** issue form. The automation accepts a public TikTok, Instagram, or Facebook URL; it fetches public metadata and a thumbnail, then opens a reviewable pull request.

Only repository owners, members, and collaborators can trigger this automation. Other submissions are closed automatically.

Posts can also be added directly to `src/posts.ts` when needed, with a platform, public URL, title, description, aspect ratio, and local thumbnail path.

Store thumbnails in `public/thumbs/` and reference them with a root-relative path:

```ts
thumbnail: '/thumbs/my-post.jpg'
```

For most Facebook posts, use the public post URL. Some Facebook Reels require a plugin embed URL; supply it through the optional `embedUrl` field when needed.

The issue form includes an optional Facebook iframe field for these cases.

## Filtering

Platform filters are shareable:

- `?platform=instagram`
- `?platform=tiktok`
- `?platform=facebook`

## Notes

- Only public, embeddable posts can be displayed.
- Platform embeds can be affected by visitor consent, privacy settings, ad blockers, or platform-side changes.
- TikTok uses its dedicated player for a cleaner embedded experience; Instagram and standard Facebook posts use `react-social-media-embed`.
- Preview metadata and thumbnails are deliberately stored locally, avoiding platform requests on the initial page load.
