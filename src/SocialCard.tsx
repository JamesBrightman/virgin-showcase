import { lazy, Suspense, useState } from 'react';
import type { SocialPost } from './posts';

// Splits the embed library into a separate chunk. It is not downloaded until
// the first card is activated.
const SocialEmbed = lazy(() => import('./SocialEmbed'));

const platformLabel = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
} as const;

function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export function SocialCard({ post }: { post: SocialPost }) {
  const [active, setActive] = useState(false);

  return (
    <article className={`card card-${post.platform}${active ? ' is-embedded' : ''}`}>
      {active ? (
        <div className="embed-stage">
          <Suspense fallback={<EmbedLoader post={post} />}>
            <SocialEmbed post={post} />
          </Suspense>
        </div>
      ) : (
        <button
          className="preview"
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Load ${platformLabel[post.platform]} embed: ${post.title}`}
          >
          <div className="poster" style={{ aspectRatio: post.aspectRatio }}>
            <PosterVisual post={post} />
          </div>
          <span className="card-copy">
            <span className="platform" aria-label={platformLabel[post.platform]}>
              <img src={publicAsset(`/icons/${post.platform}.svg`)} alt="" />
            </span>
            <strong>{post.title}</strong>
            <span className="summary">{post.summary}</span>
          </span>
        </button>
      )}
    </article>
  );
}

function PosterVisual({ post }: { post: SocialPost }) {
  return post.thumbnail ? (
    <img src={publicAsset(post.thumbnail)} alt="" loading="lazy" decoding="async" />
  ) : (
    <div className="generated-poster" aria-hidden="true">
      <span>{platformLabel[post.platform]}</span>
    </div>
  );
}

function EmbedLoader({ post }: { post: SocialPost }) {
  return (
    <div className="embed-loader" style={{ aspectRatio: post.aspectRatio }} role="status">
      <PosterVisual post={post} />
      <span className="embed-loader-overlay">
        <span className="embed-spinner" aria-hidden="true" />
        Loading {platformLabel[post.platform]}...
      </span>
    </div>
  );
}
