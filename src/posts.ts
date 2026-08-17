export type Platform = 'instagram' | 'tiktok' | 'facebook';

export type SocialPost = {
  id: string;
  platform: Platform;
  url: string;
  title: string;
  summary: string;
  publishedAt?: string;
  aspectRatio: `${number} / ${number}`;
  thumbnail?: string;
  embedUrl?: string;
  embedHeight?: number;
};

// Add compressed thumbnails under public/thumbs for the lightest initial load.
// The social-submission processor adds entries here after retrieving public metadata.
export const posts: SocialPost[] = [
  {
    id: 'tiktok-4b972fff1a',
    platform: 'tiktok',
    url: "https://www.tiktok.com/@virginatlantic/video/7673876436767296790",
    title: "If not now, when?",
    summary: "A holiday has a funny way of changing your answer: yes to the detour, long lunch, one more swim and one more song.",
    publishedAt: '2026-08-14',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/tiktok-4b972fff1a.jpg',
  },
  {
    id: 'tiktok-782690ac74',
    platform: 'tiktok',
    url: "https://www.tiktok.com/@virginatlantic/video/7669460938386361622",
    title: "Hear our Pride",
    summary: "Celebrating love with Brighton Pride and Delta, while championing a world where everyone can feel proud of who they are.",
    publishedAt: '2026-08-02',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/tiktok-782690ac74.jpg',
  },
  {
    id: 'tiktok-17f8b2db98',
    platform: 'tiktok',
    url: "https://www.tiktok.com/@virginatlantic/video/7661360951106473238",
    title: "A little pre-match warm-up.",
    summary: "A little pre-match warm-up. 🔴⚽ No footballs were harmed in the making of this video.",
    publishedAt: '2026-07-11',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/tiktok-17f8b2db98.jpg',
  },
  {
    id: 'tiktok-6a2645707b',
    platform: 'tiktok',
    url: "https://www.tiktok.com/@virginatlantic/video/7660977204276382998",
    title: "Seoul, served in Shoreditch.",
    summary: "Heart + Seoul brings the flavours, traditions and stories of one of the world’s most exciting cities to Shoreditch.",
    publishedAt: '2026-07-10',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/tiktok-6a2645707b.jpg',
  },
  {
    id: 'instagram-45fa6e4385',
    platform: 'instagram',
    url: "https://www.instagram.com/p/Db-PyPjOsDQ/",
    title: "If not now, when?",
    summary: "A holiday has a funny way of changing your answer: yes to the detour, long lunch, one more swim and one more song.",
    publishedAt: '2026-08-13',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-45fa6e4385.jpg',
  },
  {
    id: 'instagram-90733836d6',
    platform: 'instagram',
    url: "https://www.instagram.com/p/DIS6NcZI3io/",
    title: "See the world differently",
    summary: "The most unforgettable journeys open our eyes, change our rhythm and make the unfamiliar feel like home.",
    publishedAt: '2025-04-10',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-90733836d6.jpg',
  },
  {
    id: 'instagram-1485d452f5',
    platform: 'instagram',
    url: "https://www.instagram.com/p/C0RCqTesd2s/",
    title: "A world-first SAF flight",
    summary: "Virgin Atlantic flew across the Atlantic on 100% Sustainable Aviation Fuel, marking a world first.",
    publishedAt: '2023-11-30',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-1485d452f5.jpg',
  },
  {
    id: 'instagram-5f18f21603',
    platform: 'instagram',
    url: "https://www.instagram.com/p/Db3iNLJk5zh/?img_index=1",
    title: "Champagne Supernova",
    summary: "Celebrating 30 years of Manchester with G-VMAN: the city, its spirit and the journeys we’ve shared.",
    publishedAt: '2026-08-10',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-5f18f21603.jpg',
  },
  {
    id: 'instagram-f7cedfb678',
    platform: 'instagram',
    url: "https://www.instagram.com/p/Dbqn9KeCOEs/?img_index=1",
    title: "A cancelled flight.",
    summary: "A cancelled flight, stranded passengers and a handwritten sign offering seats for $39: the small idea that became Virgin Atlantic.",
    publishedAt: '2026-08-05',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-f7cedfb678.jpg',
  },
  {
    id: 'facebook-9037ad326e',
    platform: 'facebook',
    url: "https://www.facebook.com/watch/?v=1600192931740987",
    title: "If not now, when?",
    summary: "A holiday has a funny way of changing your answer: yes to the detour, long lunch, one more swim and one more song.",
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/facebook-9037ad326e.jpg',
  },
  {
    id: 'facebook-dc6485d2bb',
    platform: 'facebook',
    url: "https://www.facebook.com/virginatlantic/posts/pfbid02Q2Fq7h7C2S79LeLYTrZnTmj79CsT3CqNFdHW8Ft9XHmFGMS9xjLgEwBaBcQghp7Pl",
    title: "Champagne Supernova",
    summary: "Celebrating 30 years of Manchester with G-VMAN: the city, its spirit and the journeys we’ve shared.",
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/facebook-dc6485d2bb.jpg',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvirginatlantic%2Fposts%2Fpfbid02Q2Fq7h7C2S79LeLYTrZnTmj79CsT3CqNFdHW8Ft9XHmFGMS9xjLgEwBaBcQghp7Pl&show_text=true&width=500',
    embedHeight: 734,
  },
  {
    id: 'facebook-1b482bba87',
    platform: 'facebook',
    url: "https://www.facebook.com/virginatlantic/posts/pfbid0Xts9XWCAp16dDUEThs6sX4yDaSsm38NKmvXCHCzMg7EjrVk79SiUGQydQvwsSDpPl",
    title: "Hear our Pride",
    summary: "Celebrating love with Brighton Pride and Delta, while championing a world where everyone can feel proud of who they are.",
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/facebook-1b482bba87.jpg',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvirginatlantic%2Fposts%2Fpfbid0Xts9XWCAp16dDUEThs6sX4yDaSsm38NKmvXCHCzMg7EjrVk79SiUGQydQvwsSDpPl&show_text=true&width=500',
    embedHeight: 742,
  },
  {
    id: 'facebook-e3a5ddeac4',
    platform: 'facebook',
    url: "https://www.facebook.com/share/r/1BuqXSxptz/",
    title: "Skip the traffic",
    summary: "Together with Joby Aviation, we’re helping create a faster, more connected way to travel with electric air taxis.",
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/facebook-e3a5ddeac4.jpg',
  },
  {
    id: 'facebook-927eb462c2',
    platform: 'facebook',
    url: "https://www.facebook.com/virginatlantic/posts/pfbid0ua6JNchgCeQ6nmHvMst3ZqyQ8GAF9MpYTtAT6yyeAmmctB4DSAujjmm5Dfocb3rTl",
    title: "Happy birthday, Sir Richard",
    summary: "Celebrating our founder, Sir Richard Branson, and the A330neo Ruby Rebel taking on sea, skies and stars.",
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/facebook-927eb462c2.jpg',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvirginatlantic%2Fposts%2Fpfbid0ua6JNchgCeQ6nmHvMst3ZqyQ8GAF9MpYTtAT6yyeAmmctB4DSAujjmm5Dfocb3rTl&show_text=true&width=500',
    embedHeight: 651,
  },
  {
    id: 'tiktok-411e5679e9',
    platform: 'tiktok',
    url: "https://www.tiktok.com/@virginatlantic/video/7660474926704381206",
    title: "London meets Korea’s favourite Grandma",
    summary: "From Seoul to Shoreditch, Korea Grandma and friends bring the flavours, traditions and spirit of Seoul to London.",
    publishedAt: '2026-07-09',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/tiktok-411e5679e9.jpg',
  },
];
