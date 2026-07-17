import {
  FacebookEmbed,
  InstagramEmbed,
} from 'react-social-media-embed';
import type { SocialPost } from './posts';

export default function SocialEmbed({ post }: { post: SocialPost }) {
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
        />
      );
    }
    case 'facebook':
      if (post.embedUrl) {
        return (
          <iframe
            className="facebook-player"
            src={post.embedUrl}
            title={post.title}
            height={post.embedHeight ?? 634}
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        );
      }

      return <FacebookEmbed url={post.url} width="100%" placeholderImageUrl={post.thumbnail} />;
  }
}
