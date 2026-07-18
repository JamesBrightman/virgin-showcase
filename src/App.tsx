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

export default function App() {
  const [filter, setFilter] = useState<'all' | Platform>(filterFromUrl);
  const [month, setMonth] = useState(monthFromUrl);

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
        <a className="wordmark" href="https://www.virginatlantic.com/" target="_blank" rel="noreferrer">
          Virgin Atlantic
        </a>
        <span className="site-section">Social wall</span>
      </header>
      <main>
        <header className="hero">
          <p className="hero-kicker">Content overview</p>
          <h1>Virgin Atlantic<br />social wall</h1>
          <p className="intro">
            Internal view of selected Virgin Atlantic and related social content. Select a post to load its live embed.
          </p>
        </header>

      <div className="filter-bar">
        <nav className="filters" aria-label="Filter social posts">
          {filters.map((item) => (
            <button
              key={item.value}
              className={filter === item.value ? 'filter active' : 'filter'}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => selectFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="month-filter">
          <label className="month-field">
            <span className="month-field-label">Filter by month</span>
            <span className="month-field-control">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 2v3M17 2v3M3.5 9.5h17M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5Z" />
              </svg>
              <input type="month" value={month} onChange={(event) => selectMonth(event.target.value)} />
            </span>
          </label>
          {month && (
            <button className="clear-month" type="button" onClick={() => selectMonth('')}>
              Clear
            </button>
          )}
        </div>
      </div>

        <section className="wall" aria-live="polite">
          {visiblePosts.map((post) => (
            <SocialCard key={post.id} post={post} />
          ))}
        </section>
        {visiblePosts.length === 0 && <p className="empty-state">No posts match this filter.</p>}
      </main>
    </>
  );
}
