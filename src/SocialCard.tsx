import { lazy, Suspense, useEffect, useRef, useState } from 'react';
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
  const [embedReady, setEmbedReady] = useState(false);
  const embedKind = post.platform === 'facebook' && post.url.includes('/reel/') ? 'facebook-reel' : post.platform;
  const [facebookWidth, setFacebookWidth] = useState(() => Math.min(680, window.innerWidth - 48));

  useEffect(() => {
    if (!active || embedReady) return;

    // Third-party embeds do not all surface their iframe load event. Keep the
    // preview visible while they initialise, then avoid trapping the user
    // behind a permanent loading layer if a provider omits that event.
    const fallbackTimer = window.setTimeout(() => setEmbedReady(true), 6000);
    return () => window.clearTimeout(fallbackTimer);
  }, [active, embedReady]);

  useEffect(() => {
    if (!active) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(false);
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [active]);

  useEffect(() => {
    const updateFacebookWidth = () => setFacebookWidth(Math.min(680, window.innerWidth - 48));
    window.addEventListener('resize', updateFacebookWidth);
    return () => window.removeEventListener('resize', updateFacebookWidth);
  }, []);

  const activateEmbed = () => {
    setEmbedReady(false);
    setActive(true);
  };

  return (
    <article className={`card card-${post.platform}${active ? ' is-embedded' : ''}`}>
      <button
        className="preview"
        type="button"
        onClick={activateEmbed}
        aria-label={`Load ${platformLabel[post.platform]} embed: ${post.title}`}
        aria-hidden={active}
        tabIndex={active ? -1 : undefined}
      >
        <div className="poster" style={{ aspectRatio: post.aspectRatio }}>
          <PosterVisual post={post} />
        </div>
        <span className="card-copy">
          <span className="card-meta">
            <span className="platform" aria-label={platformLabel[post.platform]}>
              <img src={publicAsset(`/icons/${post.platform}.svg`)} alt="" />
            </span>
          </span>
          <TruncatedCopy className="card-title" text={post.title} />
          <TruncatedCopy className="summary" text={post.summary} />
        </span>
      </button>
      {active && (
        <div className="embed-stage" role="dialog" aria-modal="true" aria-label={`${platformLabel[post.platform]} embed`} onClick={() => setActive(false)}>
          <div className={`embed-panel embed-panel-${embedKind}`} onClick={(event) => event.stopPropagation()}>
            <Suspense fallback={null}>
              <div className="embed-content" onLoadCapture={() => setEmbedReady(true)}>
                <SocialEmbed post={post} onLoad={() => setEmbedReady(true)} facebookWidth={facebookWidth} />
              </div>
            </Suspense>
            {!embedReady && <EmbedLoader post={post} />}
            <button className="close-embed" type="button" onClick={() => setActive(false)} aria-label="Close live embed">×</button>
          </div>
        </div>
      )}
    </article>
  );
}

function TruncatedCopy({ className, text }: { className: string; text: string }) {
  const copyRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = copyRef.current;
    if (!element) return;

    const updateTruncation = () => {
      setIsTruncated(element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1);
    };

    updateTruncation();
    const observer = new ResizeObserver(updateTruncation);
    observer.observe(element);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span
      ref={copyRef}
      className={`${className}${isTruncated ? ' is-truncated' : ''}`}
      title={isTruncated ? text : undefined}
    >
      {text}
    </span>
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
    <div className="embed-loader" role="status">
      <PosterVisual post={post} />
      <span className="embed-loader-overlay">
        <span className="embed-spinner" aria-hidden="true" />
        Loading {platformLabel[post.platform]}...
      </span>
    </div>
  );
}
