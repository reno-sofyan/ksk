import imageManifest from '@/generated/image-manifest.json';

export function withBase(assetPath) {
  const normalizedBase = import.meta.env.BASE_URL || '/';
  const normalizedPath = assetPath.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
}

export function imageUrl(fileName) {
  return withBase(`images/${encodeURIComponent(fileName)}`);
}

export function resolveLocalImageEntry(src) {
  if (!src) {
    return null;
  }

  const cleanSrc = decodeURIComponent(src.split('?')[0]);
  const match = cleanSrc.match(/(?:^|\/)images\/(.+)$/);
  const fileName = match?.[1];

  if (!fileName) {
    return null;
  }

  return imageManifest[fileName] ? { fileName, entry: imageManifest[fileName] } : null;
}
