import React from 'react';
import { resolveLocalImageEntry, withBase } from '@/lib/assets.js';

const ResponsiveImage = ({
  src,
  alt,
  sizes = '100vw',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  className,
  width,
  height,
  ...props
}) => {
  const localImage = resolveLocalImageEntry(src);

  if (!localImage) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        width={width}
        height={height}
        {...props}
      />
    );
  }

  const fallbackVariant = localImage.entry.variants[localImage.entry.variants.length - 1];
  const srcSet = localImage.entry.variants
    .map((variant) => `${withBase(variant.path)} ${variant.width}w`)
    .join(', ');

  return (
    <img
      src={withBase(fallbackVariant.path)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      className={className}
      width={width || localImage.entry.width}
      height={height || localImage.entry.height}
      {...props}
    />
  );
};

export default ResponsiveImage;
