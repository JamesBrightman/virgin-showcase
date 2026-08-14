import { useEffect, useMemo, useState } from 'react';
import type { Platform } from './posts';
import { posts } from './posts';
import { SocialCard } from './SocialCard';

const filters: Array<{ label: string; value: 'all' | Platform }> = [
  { label: 'All', value: 'all' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'Facebook', value: 'facebook' },
];

function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

function filterFromUrl(): 'all' | Platform {
  const platform = new URLSearchParams(window.location.search).get('platform');

  return platform === 'instagram' || platform === 'tiktok' || platform === 'facebook'
    ? platform
    : 'all';
}

function monthFromUrl() {
  const month = new URLSearchParams(window.location.search).get('month');
  return month && /^\d{4}-\d{2}$/.test(month) ? month : '';
}

function TechnicalPage() {
  return (
    <main className="technical-page">
      <header className="technical-hero">
        <p className="technical-kicker">Technical guide</p>
        <h1>Managing social wall content</h1>
        <p>Use the social-post submission form for the normal review workflow. It creates a pull request, so every addition can be checked before publishing.</p>
      </header>

      <section className="technical-section" aria-labelledby="submit-content">
        <h2 id="submit-content">Add a post</h2>
        <ol className="technical-steps">
          <li>Open the repository’s <strong>Add social post</strong> issue form.</li>
          <li>Paste a public TikTok, Instagram, or Facebook post URL and select its platform.</li>
          <li>Add the published date if known. For a Facebook Reel that will not embed, include its Facebook iframe code.</li>
          <li>Review the generated pull request: title, summary, thumbnail, date, and live embed.</li>
          <li>Merge the pull request to publish it on the wall.</li>
        </ol>
      </section>

      <section className="technical-section" aria-labelledby="direct-content">
        <h2 id="direct-content">Direct edits</h2>
        <p>Posts are stored in <code>src/posts.ts</code>; thumbnails live in <code>public/thumbs/</code>. Add a root-relative thumbnail path, for example <code>/thumbs/my-post.jpg</code>.</p>
        <p>Keep each post’s platform, public URL, title, summary, date, aspect ratio, and thumbnail up to date. Only public, embeddable posts should be added.</p>
        <div className="code-example" aria-label="Example posts.ts entry">
          <div className="code-example-header">
            <span><i /> <i /> <i /> posts.ts</span>
            <span>TypeScript</span>
          </div>
          <pre>{`  {
    id: 'virgin-atlantic-example',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/example/',
    title: 'Post title',
    summary: 'A short description of the post.',
    publishedAt: '2026-08-14',
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/my-post.jpg',
  },`}</pre>
        </div>
      </section>

      <footer className="technical-footer">
        <p>Built with love by <a href="https://github.com/JamesBrightman" target="_blank" rel="noreferrer">James Brightman</a></p>
        <a className="github-link" href="https://github.com/JamesBrightman/virgin-showcase" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.15-1.11-1.46-1.11-1.46-.91-.61.07-.6.07-.6 1 .07 1.54 1.03 1.54 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.61 9.61 0 0 1 12 6.8c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.91.68 1.84v2.79c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
          View on GitHub
        </a>
      </footer>
    </main>
  );
}

export default function App() {
  const [filter, setFilter] = useState<'all' | Platform>(filterFromUrl);
  const [month, setMonth] = useState(monthFromUrl);
  const basePath = import.meta.env.BASE_URL;
  const technicalPath = `${basePath.replace(/\/$/, '')}/technical`;
  const isTechnicalPage = window.location.pathname === technicalPath;

  useEffect(() => {
    const updateFilter = () => {
      setFilter(filterFromUrl());
      setMonth(monthFromUrl());
    };

    window.addEventListener('popstate', updateFilter);
    return () => window.removeEventListener('popstate', updateFilter);
  }, []);

  const selectFilter = (nextFilter: 'all' | Platform) => {
    const url = new URL(window.location.href);

    if (nextFilter === 'all') {
      url.searchParams.delete('platform');
    } else {
      url.searchParams.set('platform', nextFilter);
    }

    window.history.pushState({}, '', url);
    setFilter(nextFilter);
  };

  const selectMonth = (nextMonth: string) => {
    const url = new URL(window.location.href);

    if (nextMonth) {
      url.searchParams.set('month', nextMonth);
    } else {
      url.searchParams.delete('month');
    }

    window.history.pushState({}, '', url);
    setMonth(nextMonth);
  };

  const visiblePosts = useMemo(
    () => posts.filter((post) => (
      (filter === 'all' || post.platform === filter)
      && (!month || post.publishedAt?.startsWith(month))
    )),
    [filter, month],
  );

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href={basePath} aria-label="Social wall home">
          <img src={publicAsset('/virgin-atlantic-logo.svg')} alt="Virgin Atlantic" />
        </a>
        <a className="technical-link" href={technicalPath} aria-label="Technical guide">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10.3 2.8h3.4l.6 2.2c.5.2 1 .4 1.4.8l2.2-.6 1.7 2.9-1.6 1.6c.1.5.1 1.1 0 1.6l1.6 1.6-1.7 2.9-2.2-.6c-.4.3-.9.6-1.4.8l-.6 2.2h-3.4l-.6-2.2c-.5-.2-1-.4-1.4-.8l-2.2.6-1.7-2.9 1.6-1.6a6.9 6.9 0 0 1 0-1.6L4.1 8.1l1.7-2.9 2.2.6c.4-.3.9-.6 1.4-.8l.9-2.2Z" />
            <circle cx="12" cy="10.5" r="2.5" />
          </svg>
        </a>
      </header>
      {isTechnicalPage ? <TechnicalPage /> : <><section className="social-search" aria-label="Filter social posts">
        <div className="social-search-content">
          <nav className="filters" aria-label="Filter by social platform">
            {filters.map((item) => (
              <button
                key={item.value}
                className={filter === item.value ? 'filter active' : 'filter'}
                type="button"
                aria-pressed={filter === item.value}
                onClick={() => selectFilter(item.value)}
              >
                {item.value === 'all' ? (
                  <svg className="filter-icon all-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4" y="4" width="6" height="6" rx="1" />
                    <rect x="14" y="4" width="6" height="6" rx="1" />
                    <rect x="4" y="14" width="6" height="6" rx="1" />
                    <rect x="14" y="14" width="6" height="6" rx="1" />
                  </svg>
                ) : (
                  <img className="filter-icon" src={publicAsset(`/icons/${item.value}.svg`)} alt="" />
                )}
                {item.label}
              </button>
            ))}
          </nav>
          <div className="month-search-panel">
            <label className="month-field">
              <span className="month-field-label">Filter by month</span>
              <span className="month-field-control">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 2v3M17 2v3M3.5 9.5h17M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5Z" />
                </svg>
                <input
                  type="month"
                  value={month}
                  aria-label="Filter posts by month"
                  onChange={(event) => selectMonth(event.target.value)}
                />
              </span>
            </label>
            {month && (
              <button className="clear-month" type="button" onClick={() => selectMonth('')}>
                Clear
              </button>
            )}
          </div>
        </div>
      </section>
      <main>
        <section className="wall" aria-live="polite">
          {visiblePosts.map((post) => (
            <SocialCard key={post.id} post={post} />
          ))}
        </section>
        {visiblePosts.length === 0 && <p className="empty-state">No posts match this filter.</p>}
      </main>
      </>}
    </>
  );
}
