export default function optimizeImage(url: string, width?: number) {
  if (!url.includes('image-devlog.juntae.kim')) return url;
  if (url.includes('.svg')) return url;

  // Cloudfront
  let replaced = url.replace(
    'http://image-devlog.juntae.kim',
    'https://image-devlog.juntae.kim',
  );

  if (!width) {
    return replaced;
  }

  return replaced.concat(`?w=${width}`);
}
