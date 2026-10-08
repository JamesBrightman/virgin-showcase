import {
  InstagramEmbed,
} from 'react-social-media-embed';
import type { SocialPost } from './posts';

type SocialEmbedProps = {
  post: SocialPost;
  onLoad: () => void;
  facebookWidth?: number;
};

function facebookEmbedUrl(post: SocialPost, facebookWidth = 680) {
  if (post.embedUrl) return post.embedUrl;

  const isReel = post.url.includes('/reel/');
  const plugin = isReel ? 'video' : 'post';
  const params = new URLSearchParams({
    href: post.url,
    show_text: 'false',
    width: String(isReel ? 500 : facebookWidth),
  });

  return `https://www.facebook.com/plugins/${plugin}.php?${params}`;
}

export default function SocialEmbed({ post, onLoad, facebookWidth }: SocialEmbedProps) {
  switch (post.platform) {
    case 'instagram':
      return <InstagramEmbed url={post.url} width="100%" placeholderImageUrl={post.thumbnail} />;
    case 'tiktok': {
      const videoId = post.url.match(/\/video\/(\d+)/)?.[1];

      if (!videoId) {
        return null;
      }

      return (
        <iframe
          className="tiktok-player"
          src={`https://www.tiktok.com/player/v1/${videoId}?autoplay=0&controls=1&description=0&music_info=0&rel=0`}
          title={post.title}
          allow="fullscreen"
          allowFullScreen
          onLoad={onLoad}
        />
      );
    }
    case 'facebook':
      return (
        <iframe
          className="facebook-player"
          src={facebookEmbedUrl(post, facebookWidth)}
          title={post.title}
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          onLoad={onLoad}
        />
      );
  }
}
