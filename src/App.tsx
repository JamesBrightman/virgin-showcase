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

export default function App() {
  const [filter, setFilter] = useState<'all' | Platform>(filterFromUrl);

  useEffect(() => {
    const updateFilter = () => setFilter(filterFromUrl());

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

  const visiblePosts = useMemo(
    () => (filter === 'all' ? posts : posts.filter((post) => post.platform === filter)),
    [filter],
  );

  return (
    <main>
      <header className="hero">
        <h1>Virgin Atlantic social wall</h1>
        <p className="intro">
          An internal view of selected Virgin Atlantic and related social content. Click a post to load its live embed.
        </p>
      </header>

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

      <section className="wall" aria-live="polite">
        {visiblePosts.map((post) => (
          <SocialCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
