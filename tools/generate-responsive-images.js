#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, 'public', 'images');
const outputDir = path.join(sourceDir, 'optimized');
const manifestPath = path.join(projectRoot, 'src', 'generated', 'image-manifest.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const preferredWidths = [480, 768, 1200, 1600, 1920];

function ensureDir(dirPath) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function readSipsValue(filePath, propertyName) {
  const output = execFileSync(
    'sips',
    ['-g', propertyName, filePath],
    { encoding: 'utf8' }
  );

  const match = output.match(new RegExp(`${propertyName}:\\s+(.+)$`, 'm'));
  return match?.[1]?.trim() || '';
}

function toSlug(fileName) {
  return fileName
    .replace(path.extname(fileName), '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getOutputFormat(extension, hasAlpha) {
  if (extension === '.png' && hasAlpha) {
    return 'png';
  }

  if (extension === '.webp') {
    return 'jpeg';
  }

  return extension === '.png' ? 'jpeg' : 'jpeg';
}

function getVariantDimensions(width, height, maxDimension) {
  if (width >= height) {
    const scaledHeight = Math.round((height * maxDimension) / width);
    return { width: maxDimension, height: scaledHeight };
  }

  const scaledWidth = Math.round((width * maxDimension) / height);
  return { width: scaledWidth, height: maxDimension };
}

function buildVariant(inputPath, outputPath, format, maxDimension) {
  const args = ['-s', 'format', format];

  if (format === 'jpeg') {
    args.push('-s', 'formatOptions', '68');
  }

  args.push('-Z', String(maxDimension), inputPath, '--out', outputPath);
  execFileSync('sips', args, { stdio: 'ignore' });
}

function main() {
  ensureDir(path.dirname(manifestPath));
  rmSync(outputDir, { recursive: true, force: true });
  ensureDir(outputDir);

  const manifest = {};
  const files = readdirSync(sourceDir)
    .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((left, right) => left.localeCompare(right));

  for (const fileName of files) {
    const inputPath = path.join(sourceDir, fileName);
    const extension = path.extname(fileName).toLowerCase();
    const width = Number(readSipsValue(inputPath, 'pixelWidth'));
    const height = Number(readSipsValue(inputPath, 'pixelHeight'));
    const hasAlpha = readSipsValue(inputPath, 'hasAlpha') === 'yes';
    const format = getOutputFormat(extension, hasAlpha);
    const outputExtension = format === 'png' ? 'png' : 'jpg';
    const slug = toSlug(fileName);
    const variantDir = path.join(outputDir, slug);

    ensureDir(variantDir);

    const widths = preferredWidths
      .filter((size) => size < Math.max(width, height))
      .concat([Math.min(Math.max(width, height), 1920)])
      .filter((size, index, list) => list.indexOf(size) === index)
      .sort((left, right) => left - right);

    const variants = widths.map((size) => {
      const outputFileName = `${size}.${outputExtension}`;
      const outputPath = path.join(variantDir, outputFileName);
      const dimensions = getVariantDimensions(width, height, size);

      buildVariant(inputPath, outputPath, format, size);

      return {
        width: dimensions.width,
        height: dimensions.height,
        path: `images/optimized/${slug}/${outputFileName}`,
        format: outputExtension
      };
    });

    manifest[fileName] = {
      width,
      height,
      slug,
      format: outputExtension,
      variants
    };
  }

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

main();
