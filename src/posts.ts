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
    summary: "If not now, when? ✈️ A holiday has a funny way of changing your answer. Suddenly, it’s yes to the detour. Yes to the long lunch. Yes to one more swim, one more song, and one more move you’d never dare at home. Virgin Atlantic Holidays makes room for more of that, with handpicked ",
    publishedAt: '2026-08-14',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/tiktok-4b972fff1a.jpg',
  },
  {
    id: 'tiktok-782690ac74',
    platform: 'tiktok',
    url: "https://www.tiktok.com/@virginatlantic/video/7669460938386361622",
    title: "Hear our Pride ✨ Celebrating all things love this weekend @brightonprideofficial together with o",
    summary: "Hear our Pride ✨ Celebrating all things love this weekend @brightonprideofficial together with our friends @delta. We’ve been a supporter of the LGBTQIA+ community since the beginning, championing diversity and enabling our people and customers to feel proud of who they are, whil",
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
    summary: "Seoul, served in Shoreditch. 🇰🇷 Heart + Seoul has arrived, bringing the flavours, traditions and stories behind one of the world's most exciting cities to London for two days only with @Korea_grandma 🫰 If you've ever wondered what makes Seoul so special, consider this your fir",
    publishedAt: '2026-07-10',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/tiktok-6a2645707b.jpg',
  },
  {
    id: 'instagram-45fa6e4385',
    platform: 'instagram',
    url: "https://www.instagram.com/p/Db-PyPjOsDQ/",
    title: "If not now, when?",
    summary: "932 likes, 49 comments - virginatlantic on August 13, 2026: \"If not now, when? ✈️ A holiday has a funny way of changing your answer. Suddenly, it’s yes to the detour. Yes to the long lunch. Yes to one more swim, one more song, and one more move you’d never dare at home. Virgin At",
    publishedAt: '2026-08-13',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-45fa6e4385.jpg',
  },
  {
    id: 'instagram-90733836d6',
    platform: 'instagram',
    url: "https://www.instagram.com/p/DIS6NcZI3io/",
    title: "It’s not just where you go - it’s how you see it ✈️ The most unforgettable journeys aren’t alway",
    summary: "4,322 likes, 576 comments - virginatlantic on April 10, 2025: \"It’s not just where you go - it’s how you see it ✈️ The most unforgettable journeys aren’t always the ones we plan. They’re the ones that open our eyes. Change our rhythm. Make the unfamiliar feel like home. So where ",
    publishedAt: '2025-04-10',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-90733836d6.jpg',
  },
  {
    id: 'instagram-1485d452f5',
    platform: 'instagram',
    url: "https://www.instagram.com/p/C0RCqTesd2s/",
    title: "On the 28th November 2023, Virgin Atlantic achieved a world first by flying across the Atlantic ",
    summary: "7,680 likes, 499 comments - virginatlantic on November 30, 2023: \"On the 28th November 2023, Virgin Atlantic achieved a world first by flying across the Atlantic on 100% Sustainable Aviation Fuel*. Follow @holly_branson‘s journey on board as she talks through her experience, and ",
    publishedAt: '2023-11-30',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-1485d452f5.jpg',
  },
  {
    id: 'instagram-5f18f21603',
    platform: 'instagram',
    url: "https://www.instagram.com/p/Db3iNLJk5zh/?img_index=1",
    title: "Raise a glass to Champagne Supernova 🥂 Paying tribute to 30 years of calling Manchester our hom",
    summary: "4,759 likes, 52 comments - virginatlantic on August 10, 2026: \"Raise a glass to Champagne Supernova 🥂 Paying tribute to 30 years of calling Manchester our home in the North, G-VMAN celebrates the city, its spirit and the journeys we've shared. Three decades on, we're still doing",
    publishedAt: '2026-08-10',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-5f18f21603.jpg',
  },
  {
    id: 'instagram-f7cedfb678',
    platform: 'instagram',
    url: "https://www.instagram.com/p/Dbqn9KeCOEs/?img_index=1",
    title: "A cancelled flight.",
    summary: "1,582 likes, 36 comments - virgin on August 5, 2026: \"A cancelled flight. Stranded passengers. A handwritten sign offering seats for $39. That small idea became @virginatlantic ✈️\".",
    publishedAt: '2026-08-05',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/instagram-f7cedfb678.jpg',
  },
  {
    id: 'facebook-9037ad326e',
    platform: 'facebook',
    url: "https://www.facebook.com/watch/?v=1600192931740987",
    title: "10K views · 93 reactions | If not now, when?",
    summary: "If not now, when? ✈️ A holiday has a funny way of changing your answer. Suddenly, it’s yes to the detour. Yes to the long lunch. Yes to one more swim, one more song, and one more move you’d never...",
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/facebook-9037ad326e.jpg',
  },
  {
    id: 'facebook-dc6485d2bb',
    platform: 'facebook',
    url: "https://www.facebook.com/virginatlantic/posts/pfbid02Q2Fq7h7C2S79LeLYTrZnTmj79CsT3CqNFdHW8Ft9XHmFGMS9xjLgEwBaBcQghp7Pl",
    title: "Virgin Atlantic",
    summary: "Raise a glass to Champagne Supernova 🥂 Paying tribute to 30 years of calling Manchester our home in the North, G-VMAN celebrates the city, its spirit and the journeys we've shared. Three decades...",
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/facebook-dc6485d2bb.jpg',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvirginatlantic%2Fposts%2Fpfbid02Q2Fq7h7C2S79LeLYTrZnTmj79CsT3CqNFdHW8Ft9XHmFGMS9xjLgEwBaBcQghp7Pl&show_text=true&width=500',
    embedHeight: 734,
  },
  {
    id: 'facebook-1b482bba87',
    platform: 'facebook',
    url: "https://www.facebook.com/virginatlantic/posts/pfbid0Xts9XWCAp16dDUEThs6sX4yDaSsm38NKmvXCHCzMg7EjrVk79SiUGQydQvwsSDpPl",
    title: "Virgin Atlantic",
    summary: "Hear our Pride ✨ Celebrating all things love this weekend BrightonPrideOfficial together with our friends Delta Air Lines. We’ve been a supporter of the LGBTQIA+ community since the beginning,...",
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/facebook-1b482bba87.jpg',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvirginatlantic%2Fposts%2Fpfbid0Xts9XWCAp16dDUEThs6sX4yDaSsm38NKmvXCHCzMg7EjrVk79SiUGQydQvwsSDpPl&show_text=true&width=500',
    embedHeight: 742,
  },
  {
    id: 'facebook-e3a5ddeac4',
    platform: 'facebook',
    url: "https://www.facebook.com/share/r/1BuqXSxptz/",
    title: "2.7K views · 298 reactions | Skip the traffic.",
    summary: "Skip the traffic. Take the sky 🚁 The way we travel is changing. Together with @jobyaviation, we’re taking the next step towards bringing electric air taxi services to the UK, helping create faster,...",
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/facebook-e3a5ddeac4.jpg',
  },
  {
    id: 'facebook-927eb462c2',
    platform: 'facebook',
    url: "https://www.facebook.com/virginatlantic/posts/pfbid0ua6JNchgCeQ6nmHvMst3ZqyQ8GAF9MpYTtAT6yyeAmmctB4DSAujjmm5Dfocb3rTl",
    title: "Virgin Atlantic",
    summary: "Wishing the happiest of birthdays to our founder, Sir @richardbranson 🎂 Another year around the sun, and still taking on the sea, skies and stars. Our A330neo Ruby Rebel, G-VSRB has been flying for...",
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/facebook-927eb462c2.jpg',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvirginatlantic%2Fposts%2Fpfbid0ua6JNchgCeQ6nmHvMst3ZqyQ8GAF9MpYTtAT6yyeAmmctB4DSAujjmm5Dfocb3rTl&show_text=true&width=500',
    embedHeight: 651,
  },
  {
    id: 'tiktok-411e5679e9',
    platform: 'tiktok',
    url: "https://www.tiktok.com/@virginatlantic/video/7660474926704381206",
    title: "London's about to meet Korea's favourite Grandma 🇰🇷 From Seoul to Shoreditch, @korea_grandma a",
    summary: "London's about to meet Korea's favourite Grandma 🇰🇷 From Seoul to Shoreditch, @korea_grandma and friends are swapping their home turf for London's streets and sightseeing before opening the doors to Heart + Seoul later this week. Bringing the flavours, traditions and spirit of ",
    publishedAt: '2026-07-09',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/tiktok-411e5679e9.jpg',
  },
];
