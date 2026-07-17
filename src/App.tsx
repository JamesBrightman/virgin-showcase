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
    <main>
      <header className="hero">
        <h1>Virgin Atlantic social wall</h1>
        <p className="intro">
          An internal view of selected Virgin Atlantic and related social content. Click a post to load its live embed.
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
        <label className="month-filter">
          <span>Month</span>
          <input type="month" value={month} onChange={(event) => selectMonth(event.target.value)} />
        </label>
      </div>

      <section className="wall" aria-live="polite">
        {visiblePosts.map((post) => (
          <SocialCard key={post.id} post={post} />
        ))}
      </section>
      {visiblePosts.length === 0 && <p className="empty-state">No posts match this filter.</p>}
    </main>
  );
}
