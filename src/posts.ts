export type Platform = 'instagram' | 'tiktok' | 'facebook';

export type SocialPost = {
  id: string;
  platform: Platform;
  url: string;
  title: string;
  summary: string;
  aspectRatio: `${number} / ${number}`;
  thumbnail?: string;
  embedUrl?: string;
  embedHeight?: number;
};

// Add optional, compressed thumbnails under public/thumbs for the lightest
// initial load, then set thumbnail to a path such as /thumbs/post.webp.
export const posts: SocialPost[] = [
  {
    id: 'virgin-atlantic-tiktok',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@virginatlantic/video/7660474926704381206?_r=1&_t=ZN-97t3a5BJKic',
    title: "London meets Korea's favourite Grandma",
    summary: "From Seoul to Shoreditch, @korea_grandma and friends are swapping their home turf for London's streets and sightseeing before opening the doors to Heart + Seoul.",
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/virgin-atlantic-tiktok.jpg',
  },
  {
    id: 'virgin-atlantic-instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/reel/Da0ncS4uJIj/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    title: 'Cleared for kick-off',
    summary: 'Our Heathrow team gained a few new team mates with expert luggage handling and slick footwork for celebration worthy checkin. Atlanta is calling, whether you are stateside or cheering from home: come on England.',
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/virgin-atlantic-instagram.jpg',
  },
  {
    id: 'virgin-atlantic-sugababes-tiktok',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@virginatlantic/video/7644299197696445718?_r=1&_t=ZN-97t3a5BJKic',
    title: 'Sugababes live at 35,000 ft',
    summary: 'Relive Sugababes live somewhere between London and New York. Round Round at cruising altitude, powered by Starlink Wi-Fi.',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/virgin-atlantic-sugababes-tiktok.jpg',
  },
  {
    id: 'pestxterminators-tiktok',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@pestxterminators/video/7660069462686649608?_r=1&_t=ZN-97t3a5BJKic',
    title: 'How mice get inside',
    summary: 'Tiny gaps around pipes, foundations, and doors can be enough for mice to move in. Finding how they got in helps stop the problem returning.',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/pestxterminators-tiktok.jpg',
  },
  {
    id: 'virgin-atlantic-journey-instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DarvE1uOPL3/',
    title: 'The journey continues',
    summary: 'One step closer. Wilbur and Orville are enjoying the ride a little longer. After all, a pinch of confidence never hurt anyone.',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/virgin-atlantic-journey-instagram.jpg',
  },
  {
    id: 'joby-aviation-instagram',
    platform: 'instagram',
    url: 'https://www.instagram.com/p/DavMERHlgum/?img_index=1',
    title: 'A warm London welcome',
    summary: 'Three days beside Tower Bridge, thousands of visitors, and a full-scale model of Joby’s electric air taxi meeting the city with Virgin Atlantic.',
    aspectRatio: '1 / 1',
    thumbnail: '/thumbs/joby-aviation-instagram.jpg',
  },
  {
    id: 'virgin-atlantic-facebook',
    platform: 'facebook',
    url: 'https://www.facebook.com/reel/1031454582805143/',
    title: 'Here’s your sign to say yes',
    summary: 'To the trip. To dinner that turns into hours. To seeing Santan Dave and Stormzy at 70. And to the people who make every journey unforgettable.',
    aspectRatio: '9 / 16',
    thumbnail: '/thumbs/virgin-atlantic-facebook.jpg',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1031454582805143%2F&show_text=true&width=500',
    embedHeight: 634,
  },
  {
    id: 'virgin-atlantic-afternoon-tea-facebook',
    platform: 'facebook',
    url: 'https://www.facebook.com/virginatlantic/posts/pfbid0v9vywk15vzucGvLjvEMyiAuN2QMaF8J2LfDkAkx6jT8KgsXwEmCPKzY3n62B1ziel',
    title: 'Afternoon tea at 35,000 ft',
    summary: 'Had your strawberries and cream fix? Now it’s time for afternoon tea at 35,000 ft. Because Centre Court isn’t the only place serving iconic views.',
    aspectRatio: '4 / 5',
    thumbnail: '/thumbs/virgin-atlantic-afternoon-tea-facebook.jpg',
  },
];
