import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const allowedHosts = new Set([
  'tiktok.com', 'www.tiktok.com',
  'instagram.com', 'www.instagram.com',
  'facebook.com', 'www.facebook.com', 'm.facebook.com', 'l.facebook.com',
]);

const root = process.cwd();
const postsPath = path.join(root, 'src', 'posts.ts');
const thumbsPath = path.join(root, 'public', 'thumbs');
const userAgent = 'Mozilla/5.0 (compatible; VirginShowcaseBot/1.0)';

function formValue(label) {
  const body = process.env.ISSUE_BODY ?? '';
  const pattern = new RegExp(`### ${label}\\r?\\n\\r?\\n([\\s\\S]*?)(?=\\r?\\n### |$)`);
  return (body.match(pattern)?.[1] ?? '').trim();
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number.parseInt(code, 10)));
}

function cleanText(value, limit = 280) {
  return decodeHtml(value).replace(/\s+/g, ' ').trim().slice(0, limit);
}

function titleFromText(value) {
  const unquoted = value.replace(/^[^:]+:\s*["']?/, '').replace(/["']$/, '');
  return cleanText(unquoted.split(/(?<=[.!?])\s/)[0], 96) || 'Social post';
}

function platformFromUrl(url, selectedPlatform) {
  if (selectedPlatform !== 'Auto detect') {
    const selected = selectedPlatform.toLowerCase();
    if (selected === 'tiktok' || selected === 'instagram' || selected === 'facebook') return selected;
    throw new Error('Select a supported platform.');
  }
  const host = new URL(url).hostname.replace(/^www\./, '');
  if (host.endsWith('tiktok.com')) return 'tiktok';
  if (host.endsWith('instagram.com')) return 'instagram';
  if (host.endsWith('facebook.com')) return 'facebook';
  throw new Error('Use a TikTok, Instagram, or Facebook public URL.');
}

function validUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname)) {
    throw new Error('The URL must use an approved public social-media host.');
  }
  return url;
}

function validImageUrl(value) {
  const url = new URL(value);
  const hostname = url.hostname.toLowerCase();
  const approved = url.protocol === 'https:' && (
    hostname.endsWith('.tiktokcdn.com') || hostname.endsWith('.muscdn.com') ||
    hostname.endsWith('.cdninstagram.com') || hostname.endsWith('.fbcdn.net')
  );
  if (!approved) throw new Error('The platform returned an unapproved preview-image host.');
  return url;
}

async function fetchPublic(url) {
  let current = validUrl(url);
  for (let redirectCount = 0; redirectCount < 5; redirectCount += 1) {
    const response = await fetch(current, { headers: { 'user-agent': userAgent }, redirect: 'manual' });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) throw new Error('The platform returned an invalid redirect.');
      current = validUrl(new URL(location, current).toString());
      continue;
    }
    if (!response.ok) throw new Error(`The platform returned HTTP ${response.status}.`);
    return { response, url: current.toString() };
  }
  throw new Error('Too many platform redirects.');
}

function metaValue(html, property) {
  const tags = html.match(/<meta\s+[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const propertyMatch = tag.match(/(?:property|name)=["']([^"']+)["']/i)?.[1];
    const contentMatch = tag.match(/content=["']([^"']*)["']/i)?.[1];
    if (propertyMatch === property && contentMatch) return decodeHtml(contentMatch);
  }
  return '';
}

function iframeSource(embedCode) {
  return embedCode.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1] ?? '';
}

async function metadataFor(platform, sourceUrl) {
  if (platform === 'tiktok') {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(sourceUrl)}`;
    const { response } = await fetchPublic(oembedUrl);
    const oembed = await response.json();
    const { response: pageResponse } = await fetchPublic(sourceUrl);
    const page = await pageResponse.text();
    const description = cleanText(page.match(/"desc":"([^"]+)"/)?.[1] ?? oembed.title ?? '');
    return { title: titleFromText(description), summary: description, thumbnailUrl: oembed.thumbnail_url, aspectRatio: '9 / 16' };
  }

  const { response, url } = await fetchPublic(sourceUrl);
  const page = await response.text();
  const description = cleanText(metaValue(page, 'og:description'));
  const ogTitle = cleanText(metaValue(page, 'og:title'));
  const thumbnailUrl = metaValue(page, 'og:image');
  if (!thumbnailUrl) throw new Error('The platform did not expose a public preview image.');
  const aspectRatio = platform === 'instagram'
    ? (url.includes('/reel/') ? '4 / 5' : '1 / 1')
    : (url.includes('/reel/') ? '9 / 16' : '4 / 5');
  return { title: titleFromText(ogTitle || description), summary: description || ogTitle, thumbnailUrl, aspectRatio };
}

async function downloadThumbnail(url, id) {
  let imageUrl = validImageUrl(url);
  let response;
  for (let redirectCount = 0; redirectCount < 5; redirectCount += 1) {
    response = await fetch(imageUrl, { headers: { 'user-agent': userAgent }, redirect: 'manual' });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location');
      if (!location) throw new Error('The preview image returned an invalid redirect.');
      imageUrl = validImageUrl(new URL(location, imageUrl).toString());
      continue;
    }
    break;
  }
  if (!response?.ok) throw new Error(`The preview image returned HTTP ${response?.status ?? 'an unknown error'}.`);
  const type = response.headers.get('content-type') ?? '';
  if (!type.startsWith('image/')) throw new Error('The preview URL did not return an image.');
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > 10 * 1024 * 1024) throw new Error('The preview image is too large.');
  await mkdir(thumbsPath, { recursive: true });
  const extension = type.includes('webp') ? 'webp' : type.includes('png') ? 'png' : 'jpg';
  const filename = `${id}.${extension}`;
  await writeFile(path.join(thumbsPath, filename), bytes);
  return `/thumbs/${filename}`;
}

const sourceUrl = formValue('Post URL');
const selectedPlatform = formValue('Platform');
const facebookEmbedCode = formValue('Facebook embed code (optional)');
if (!sourceUrl) throw new Error('A post URL is required.');

const platform = platformFromUrl(sourceUrl, selectedPlatform);
const metadata = await metadataFor(platform, sourceUrl);
const id = `${platform}-${createHash('sha256').update(sourceUrl).digest('hex').slice(0, 10)}`;
const thumbnail = await downloadThumbnail(metadata.thumbnailUrl, id);
const embedUrl = platform === 'facebook' ? iframeSource(facebookEmbedCode) : '';
const postsFile = await readFile(postsPath, 'utf8');

if (postsFile.includes(`id: '${id}'`)) throw new Error('This post has already been added.');

const postSource = `  {\n    id: '${id}',\n    platform: '${platform}',\n    url: ${JSON.stringify(sourceUrl)},\n    title: ${JSON.stringify(metadata.title)},\n    summary: ${JSON.stringify(metadata.summary)},\n    aspectRatio: '${metadata.aspectRatio}',\n    thumbnail: '${thumbnail}',${embedUrl ? `\n    embedUrl: ${JSON.stringify(embedUrl)},` : ''}\n  },\n`;

const marker = '];\n';
const position = postsFile.lastIndexOf(marker);
if (position === -1) throw new Error('Could not update the post list.');
await writeFile(postsPath, `${postsFile.slice(0, position)}${postSource}${postsFile.slice(position)}`);
